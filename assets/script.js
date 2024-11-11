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
const closeRoadmapButton = document.getElementById('close-roadmap');
const PageBody = document.getElementById('page-body');
const FooterBody = document.getElementById('footer');
const pnnngm = document.getElementById('xyz-pp');

const roadmapData = {
    1: {
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla corrupti neque fuga id sit consequatur.",
        image: "assets/1.jpg",
        buttonText: "join the community",
        buttonLink: "https://example.com/1"
    },
    2: {
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla corrupti neque fuga id sit consequatur.",
        image: "assets/1.jpg",
        buttonText: "join the community",
        buttonLink: "https://example.com/2"
    },
    3: {
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla corrupti neque fuga id sit consequatur.",
        image: "assets/1.jpg",
        buttonText: "join the community",
        buttonLink: "https://example.com/3"
    },
    4: {
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla corrupti neque fuga id sit consequatur.",
        image: "assets/1.jpg",
        buttonText: "join the community",
        buttonLink: "https://example.com/4"
    }
};

function updateSlider() {
    const angle = currentSlide * -90;
    document.querySelector('.cube-slider').style.transform = `rotateY(${angle}deg)`;

    // پنهان کردن محتوای roadmap هنگام تغییر اسلاید
    roadmapContent.style.display = 'none';
    pnnngm.style.transform = 'none';


    const previousSlideIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    const previousSlideElement = slides[previousSlideIndex];
    const currentSlideElement = slides[currentSlide];

    // محو کردن محتوای قبلی با تاخیر 100 میلی‌ثانیه
    setTimeout(() => {
        previousSlideElement.querySelector('.xyz-content').style.opacity = '0';
        previousSlideElement.querySelector('.xyz-content').style.visibility = 'hidden';
    }, 1800);

    setTimeout(() => {
        // نمایش محتوای جدید با ترنزیشن
        currentSlideElement.querySelector('.xyz-content').style.visibility = 'visible';
        currentSlideElement.querySelector('.xyz-content').style.opacity = '1';
    }, 400);

    // تغییر رنگ roadmap بر اساس اسلایدهای فرد
    if ((currentSlide + 1) % 2 !== 0) {
        roadmapContent.style.backgroundColor = '#36373d';
    } else {
        roadmapContent.style.backgroundColor = ''; // رنگ پیش‌فرض یا رنگی که برای اسلایدهای زوج می‌خواهید
    }
}

function updateActiveSlide() {
    pageButtons.forEach((button, index) => {
        button.classList.toggle('active', index === currentSlide);
    });

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
        const slideNumber = parseInt(button.getAttribute('data-slide'));

        // پاکسازی محتوای قبلی در roadmapContent
        roadmapContent.innerHTML = '';

        // ایجاد دکمه بستن (ضربدر) فقط یکبار در ابتدای رودمپ‌ها
        const closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;'; // ضربدر
        closeButton.style.top = '10px';        
        closeButton.style.position = 'absolute';
        closeButton.style.left = '100px';
        closeButton.style.fontSize = '44px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.background = 'transparent';
        closeButton.style.color = '#fcfcfc';
        closeButton.style.border = 'none';
        closeButton.style.marginTop = '100px';
        pnnngm.style.marginTop = '50px';

        closeButton.addEventListener('click', () => {
            roadmapContent.style.display = 'none'; // مخفی کردن همه رودمپ‌ها
        });

        // اضافه کردن دکمه بستن به بالای رودمپ
        roadmapContent.appendChild(closeButton);

        // ایجاد سه اسلاید به صورت همزمان
        for (let i = 0; i < 3; i++) {
            const currentSlideNumber = slideNumber + i;
            const data = roadmapData[currentSlideNumber];

            // ساخت یک بخش جدید برای هر اسلاید
            const slideSection = document.createElement('div');
            slideSection.classList.add('slide-section');

            // اضافه کردن شماره اسلاید
            const slideTitle = document.createElement('h3');
            slideTitle.textContent = `Slide Roadmap ${currentSlideNumber}`;
            slideSection.appendChild(slideTitle);

            // اضافه کردن توضیحات
            const description = document.createElement('p');
            description.textContent = data.description;
            slideSection.appendChild(description);

            // اضافه کردن تصویر
            const image = document.createElement('img');
            image.src = data.image;
            image.alt = 'Roadmap Image';
            slideSection.appendChild(image);

            // اضافه کردن دکمه
            const button = document.createElement('a');
            button.textContent = data.buttonText;
            button.href = data.buttonLink;
            slideSection.appendChild(button);

            // اضافه کردن بخش به roadmapContent
            roadmapContent.appendChild(slideSection);
        }

        // نمایش بخش roadmapContent
        roadmapContent.style.display = 'block';
        roadmapContent.style.maxHeight = '1200px'; // افزایش ارتفاع برای نمایش سه اسلاید

        document.querySelector('.pagination').style.marginTop = '1200px';

        roadmapContent.scrollIntoView({ behavior: 'smooth' });
        PageBody.style.overflowY = 'scroll';
    });
});

closeRoadmapButton.addEventListener('click', () => {
    roadmapContent.style.maxHeight = '0';
    document.querySelector('.pagination').style.marginTop = '0';

    roadmapContent.style.display = 'none';
    closeRoadmapButton.style.display = 'none';
    PageBody.style.overflowY = 'scroll';
    pnnngm.style.transform = 'none';

});

updateActiveSlide();
