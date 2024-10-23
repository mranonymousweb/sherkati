let currentSlide = 0;
const slides = document.querySelectorAll('.xyz-slide');
const totalSlides = slides.length;
const leftNav = document.querySelector('.nav.left');
const rightNav = document.querySelector('.nav.right');
const pageButtons = document.querySelectorAll('.page-btn');
const openDrawers = document.querySelectorAll('.open-drawer');
const roadmapContent = document.getElementById('roadmap-content');
const roadmapSlideNumber = document.getElementById('roadmap-slide-number');
const roadmapDescription = document.getElementById('roadmap-description');
const roadmapImage = document.getElementById('roadmap-image');
const roadmapButton = document.getElementById('roadmap-button');
const closeRoadmapButton = document.getElementById('close-roadmap'); // دکمه بستن

// داده‌های مربوط به roadmap
const roadmapData = {
    1: {
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla corrupti neque fuga id sit consequatur.",
        image: "assets/1.jpg",
        buttonText: "join the community",
        buttonLink: "https://example.com/1"
    },
    2: {
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla corrupti neque fuga id sit consequatur.",
        image: "https://via.placeholder.com/300",
        buttonText: "join the community",
        buttonLink: "https://example.com/2"
    },
    3: {
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla corrupti neque fuga id sit consequatur.",
        image: "https://via.placeholder.com/300",
        buttonText: "join the community",
        buttonLink: "https://example.com/3"
    },
    4: {
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla corrupti neque fuga id sit consequatur.",
        image: "https://via.placeholder.com/300",
        buttonText: "join the community",
        buttonLink: "https://example.com/4"
    }
};

function updateSlider() {
    const angle = currentSlide * -90;
    document.querySelector('.cube-slider').style.transform = `rotateY(${angle}deg)`;

    // پنهان کردن محتوای roadmap هنگام تغییر اسلاید
    roadmapContent.style.display = 'none';

    // پنهان کردن محتویات اسلاید قبلی
    const previousSlideElement = slides[(currentSlide - 1 + totalSlides) % totalSlides];
    const currentSlideElement = slides[currentSlide];

    // محو کردن محتوای قبلی
    previousSlideElement.querySelector('.xyz-content').style.opacity = '0';
    previousSlideElement.querySelector('.xyz-content').style.visibility = 'hidden';
    setTimeout(() => {
        // پس از محو شدن، محتوای جدید را نشان دهید
        currentSlideElement.querySelector('.xyz-content').style.visibility = 'visible';
        currentSlideElement.querySelector('.xyz-content').style.opacity = '1';
    }, 1600);
}

function updateActiveSlide() {
    // بروزرسانی دکمه‌های صفحه
    pageButtons.forEach((button, index) => {
        button.classList.toggle('active', index === currentSlide);
    });

    // بروزرسانی کلاس active برای اسلایدها
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

leftNav.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateActiveSlide();
    updateSlider();
});

rightNav.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateActiveSlide();
    updateSlider();
});

pageButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentSlide = parseInt(button.getAttribute('data-slide')) - 1;
        updateActiveSlide();
        updateSlider();
    });
});

openDrawers.forEach(button => {
    button.addEventListener('click', () => {
        const slideNumber = button.getAttribute('data-slide');
        roadmapSlideNumber.textContent = slideNumber;

        // بارگذاری اطلاعات مربوط به اسلاید
        const data = roadmapData[slideNumber];
        roadmapDescription.textContent = data.description;
        roadmapImage.src = data.image;
        roadmapImage.style.display = 'block';
        roadmapButton.textContent = data.buttonText;
        roadmapButton.href = data.buttonLink; // لینک به دکمه
        roadmapButton.style.display = 'inline-block';

        // نمایش بخش roadmap-content
        roadmapContent.style.display = 'block';
        roadmapContent.style.maxHeight = '800px'; // تعیین حداکثر ارتفاع برای افکت کش

        // جابجایی pagination به سمت پایین
        document.querySelector('.pagination').style.marginTop = '400px';

        // اسکرول به پایین
        roadmapContent.scrollIntoView({ behavior: 'smooth' });
    });
});

// اضافه کردن رویداد کلیک برای دکمه بستن
closeRoadmapButton.addEventListener('click', () => {
    roadmapContent.style.maxHeight = '0'; // مخفی کردن رودمپ با افکت کش
    // بازگرداندن pagination به موقعیت قبلی
    document.querySelector('.pagination').style.marginTop = '0';

    // پنهان کردن roadmap بعد از افکت
    setTimeout(() => {
        roadmapContent.style.display = 'none'; // مخفی کردن رودمپ بعد از افکت
    }, 0); // مدت زمان افکت
});

// تنظیم دکمه فعال اولیه
updateActiveSlide(); // برای تنظیم دکمه‌های صفحه بر اساس اسلاید اولیه
