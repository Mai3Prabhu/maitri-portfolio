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


// ... (Keep the Dark/Light Mode Logic and the Painting Modal Logic above this) ...

// --- Poetry Dialogue Box Zoom (Modal) Logic ---
// We declare the variables ONCE here.
const poemModal = document.getElementById('poem-modal');
const modalPoemContent = document.getElementById('modal-poem-content');
const modalPoemTitle = document.getElementById('modal-poem-title'); // Must exist in base.html modal

// The function accepts the title and the content (which contains <br> tags)
window.openPoemModal = function(titleText, poemHtmlContent) {
    
    // 1. Set the Title
    if (modalPoemTitle) {
        modalPoemTitle.textContent = titleText;
    }

    // 2. Set the Content (HTML includes <br> tags from Jinja)
    if (modalPoemContent) {
        modalPoemContent.innerHTML = `
            <div class="whitespace-pre-wrap font-mono text-lg leading-relaxed text-gray-900 dark:text-gray-200">${poemHtmlContent}</div>
        `;
    }

    // 3. Show the Modal
    if (poemModal) {
        poemModal.classList.remove('hidden');
        poemModal.classList.add('flex');
    }
}

window.closePoemModal = function() {
    if (poemModal) {
        poemModal.classList.remove('flex');
        poemModal.classList.add('hidden');
    }
}
// ... (Keep the Creative Corner Carousel Logic after this) ...

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

// --- Creative Corner Carousel Logic ---
let currentCreativeCard = 1;
const totalCreativeCards = 3;
// No need for carouselContainer directly here, we query cards within the function

function updateCreativeCarousel() {
    const cards = document.querySelectorAll('.carousel-card');
    cards.forEach((card, index) => {
        const cardIndex = index + 1; // Card number (1 to 4)
        
        // Calculate the difference from the current active card
        let difference = cardIndex - currentCreativeCard;
        
        // Handle wrap-around logic for difference (e.g., card 4 is -1 from card 1)
        if (difference > totalCreativeCards / 2) {
            difference -= totalCreativeCards;
        } else if (difference < -totalCreativeCards / 2) {
            difference += totalCreativeCards;
        }

        // --- Core for the visible circular effect ---
        const absDifference = Math.abs(difference);

        // 1. Z-Index for Stacking: Active card highest, then decreasing for cards behind
        card.style.zIndex = totalCreativeCards - absDifference;
        
        // 2. Position and Scaling: Creates the stacked, circular, and receding effect
        // Adjust these values to control how much cards are offset and scaled
        const translateXValue = difference * 15; // Smaller horizontal spread (e.g., 15% instead of 100%)
        const translateYValue = absDifference * 20; // Slightly lower for cards further back
        const scaleValue = 1 - absDifference * 0.1; // Scale down by 10% per step back
        const opacityValue = 1 - absDifference * 0.2; // Opacity decrease by 20% per step back

        if (difference === 0) {
            // Active card: centered, full scale, full opacity
            card.style.transform = `translateX(0) translateY(0) scale(1)`;
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto'; // Make active card links clickable
        } else {
            // Inactive cards: offset, scaled down, reduced opacity, behind
            card.style.transform = `translateX(${translateXValue}%) translateY(${translateYValue}px) scale(${scaleValue})`;
            card.style.opacity = Math.max(0.4, opacityValue); // Ensure minimum opacity so they're always somewhat visible
            card.style.pointerEvents = 'none'; // Prevent clicking cards in the background
        }
    });
}

// Navigation Functions (Called by buttons in creative.html)
window.nextCreativeCard = function() {
    currentCreativeCard = (currentCreativeCard % totalCreativeCards) + 1;
    updateCreativeCarousel();
}

window.prevCreativeCard = function() {
    currentCreativeCard = (currentCreativeCard - 2 + totalCreativeCards) % totalCreativeCards + 1;
    updateCreativeCarousel();
}

// Initialize the carousel when the page loads
window.addEventListener('load', updateCreativeCarousel);

// --- Painting Grid Data Retrieval and Zoom ---
// Retrieves the data from the hidden element attribute and calls openModal.
window.showPaintingDetails = function(index) {
    const dataElement = document.getElementById('painting-data');
    if (dataElement) {
        // READS FROM THE DATA ATTRIBUTE (The most reliable method)
        const jsonString = dataElement.getAttribute('data-paintings');
        
        try {
            const paintingData = JSON.parse(jsonString);
            
            const data = paintingData[index];
            if (data) {
                const filename = data[0];
                const caption = data[1];
                
                openModal(filename, caption); 
            }
        } catch (e) {
            console.error("Error parsing painting data:", e);
        }
    }
}
