const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// --- DUAL-MODE THEME LOGIC ---

function setTheme(isDark) {
    if (isDark) {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌙'; // Update button icon to dark moon
    } else {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '☀️'; // Update button icon to light sun
    }
}

// 1. Initial Load: Check for saved preference or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    setTheme(prefersDark);
}

// 2. Event Listener: Handle the button click
themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = htmlElement.classList.contains('dark');
    setTheme(!isCurrentlyDark);
});


// --- CREATIVE CORNER MODAL LOGIC (Poetry Zoom) ---

const poemModal = document.getElementById('poem-modal');
const modalPoemTitle = document.getElementById('modal-poem-title');
const modalPoemContent = document.getElementById('modal-poem-content');

window.openPoemModal = function(title, content) {
    modalPoemTitle.textContent = title;
    // content uses <br> tags added in Jinja to preserve line breaks
    modalPoemContent.innerHTML = content;
    poemModal.classList.remove('hidden');
    poemModal.classList.add('flex');
}

window.closePoemModal = function() {
    poemModal.classList.remove('flex');
    poemModal.classList.add('hidden');
}

// --- PAINTING MODAL LOGIC (Zoomable Images) ---

const paintingModal = document.getElementById('painting-modal');
const modalPaintingImage = document.getElementById('modal-painting-image');
const modalPaintingCaption = document.getElementById('modal-painting-caption');

window.openPaintingModal = function(imageFileName, captionText) {
    // Construct the full URL using Flask's static path convention
    const imageUrl = `/static/img/${imageFileName}`; 
    
    modalPaintingImage.src = imageUrl;
    modalPaintingCaption.textContent = captionText;
    paintingModal.classList.remove('hidden');
    paintingModal.classList.add('flex');
}

window.closePaintingModal = function() {
    paintingModal.classList.remove('flex');
    paintingModal.classList.add('hidden');
}
// --- Insightify Project Carousel Logic ---
let currentSlide = 0;
let totalSlides = 5; // Must match the number of images

window.nextSlide = function() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

window.prevSlide = function() {
    // This handles wrapping from the first image back to the last
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.getElementById('insightify-carousel');
    if (carousel) {
        // Moves the carousel container by a multiple of 100% of its width
        const offset = -currentSlide * 100; 
        carousel.style.transform = `translateX(${offset}%)`;
    }
}