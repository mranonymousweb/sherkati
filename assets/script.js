let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
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
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla corrupti neque fuga id sit consequatur.",
        image: "https://via.placeholder.com/300",
        buttonText: "join the community",
        buttonLink: "https://example.com/2"
    },
    3: {
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla corrupti neque fuga id sit consequatur.",
        image: "https://via.placeholder.com/300",
        buttonText: "join the community",
        buttonLink: "https://example.com/3"
    },
    4: {
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla corrupti neque fuga id sit consequatur.",
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
}

leftNav.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

rightNav.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

pageButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentSlide = parseInt(button.getAttribute('data-slide')) - 1;
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
        // اسکرول به پایین
        roadmapContent.scrollIntoView({ behavior: 'smooth' });
    });
});

// اضافه کردن رویداد کلیک برای دکمه بستن
closeRoadmapButton.addEventListener('click', () => {
    roadmapContent.style.display = 'none'; // پنهان کردن roadmap
});
