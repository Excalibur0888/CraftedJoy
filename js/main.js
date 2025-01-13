// Слайдер для галереи
const galleryTrack = document.querySelector('.gallery-track');
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryDots = document.querySelectorAll('.gallery-slider .slider-dot');
let galleryIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

function updateGallery() {
    const slideWidth = gallerySlides[0].offsetWidth + 32; // 32px - это gap между слайдами
    const offset = -(galleryIndex * slideWidth) + (window.innerWidth - slideWidth) / 2;
    galleryTrack.style.transform = `translateX(${offset}px)`;
    
    // Обновляем активный класс для слайдов
    const realIndex = (galleryIndex + gallerySlides.length) % gallerySlides.length;
    gallerySlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === realIndex);
    });

    // Обновляем точки навигации
    galleryDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === realIndex);
    });
}

// Обработчики для десктопа
document.querySelector('.gallery-slider .next')?.addEventListener('click', () => {
    galleryIndex = (galleryIndex + 1) % gallerySlides.length;
    updateGallery();
});

document.querySelector('.gallery-slider .prev')?.addEventListener('click', () => {
    galleryIndex = (galleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
    updateGallery();
});

// Обработчики для тач-устройств
function touchStart(event) {
    startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    isDragging = true;
    galleryTrack.style.transition = 'none';
}

function touchMove(event) {
    if (!isDragging) return;
    
    const currentX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    const diff = currentX - startX;
    const slideWidth = gallerySlides[0].offsetWidth + 32;
    const offset = -(galleryIndex * slideWidth) + (window.innerWidth - slideWidth) / 2;
    
    currentTranslate = offset + diff;
    galleryTrack.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    galleryTrack.style.transition = 'transform 0.5s ease';
    
    const slideWidth = gallerySlides[0].offsetWidth + 32;
    const diff = currentTranslate - prevTranslate;
    
    if (Math.abs(diff) > slideWidth / 3) {
        if (diff > 0) {
            galleryIndex = (galleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
        } else {
            galleryIndex = (galleryIndex + 1) % gallerySlides.length;
        }
    }
    
    updateGallery();
    prevTranslate = currentTranslate;
}

// Добавляем обработчики событий для тач-устройств
if (galleryTrack) {
    galleryTrack.addEventListener('touchstart', touchStart);
    galleryTrack.addEventListener('touchmove', touchMove);
    galleryTrack.addEventListener('touchend', touchEnd);

    // Добавляем обработчики событий для мыши
    galleryTrack.addEventListener('mousedown', touchStart);
    galleryTrack.addEventListener('mousemove', touchMove);
    galleryTrack.addEventListener('mouseup', touchEnd);
    galleryTrack.addEventListener('mouseleave', touchEnd);

    // Предотвращаем стандартное поведение перетаскивания
    galleryTrack.addEventListener('dragstart', (e) => e.preventDefault());
}

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    if (galleryTrack) {
        updateGallery();
    }
});

// Инициализация слайдера галереи
if (galleryTrack) {
    updateGallery();
}

// Слайдер для отзывов
const testimonialTrack = document.querySelector('.testimonials-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonials-slider .slider-dot');
let testimonialIndex = 0;

function updateTestimonials() {
    const realIndex = (testimonialIndex + testimonialSlides.length) % testimonialSlides.length;
    testimonialTrack.style.transform = `translateX(-${realIndex * 100}%)`;
    testimonialDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === realIndex);
    });
}

if (testimonialTrack) {
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            testimonialIndex = index;
            updateTestimonials();
        });
    });

    // Автоматическая прокрутка отзывов
    setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        updateTestimonials();
    }, 5000);
}

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анимация хедера при скролле
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Burger Menu
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navList = document.querySelector('.nav-list');
    const body = document.body;

    if (burger && navList) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navList.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navList.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Закрытие меню при клике вне меню
        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !navList.contains(e.target) && navList.classList.contains('active')) {
                burger.classList.remove('active');
                navList.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
}); 