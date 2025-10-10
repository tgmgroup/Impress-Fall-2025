
// --- Slideshow Logic (with Auto-Advance and ID Targeting) ---
// [NO CHANGES HERE - Keep the original slideshow logic]
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides-container');
const prevButton = document.getElementById('prev-slide');
const nextButton = document.getElementById('next-slide');
const slideTriggers = document.querySelectorAll('.slide-nav-trigger');
let currentSlideIndex = 0;
let slideIntervalId = null;
const SLIDE_INTERVAL_DELAY = 5000; // 5 seconds

function findSlideIndexById(targetId) {
    let foundIndex = -1;
    slides.forEach((slide, index) => {
        if (slide.id === targetId) { foundIndex = index; }
    });
    return foundIndex;
}

function showSlide(index) {
    if (slides.length === 0) return;
    const validIndex = (index % slides.length + slides.length) % slides.length;
    currentSlideIndex = validIndex;
    slides.forEach(slide => { slide.classList.remove('active'); });
    if (slides[validIndex]) {
        slides[validIndex].classList.add('active');
    } else { console.error(`Slide at index ${validIndex} not found.`); }
}

function showSlideById(targetId) {
    const indexToShow = findSlideIndexById(targetId);
    if (indexToShow !== -1) { showSlide(indexToShow); }
    else { console.warn(`Slide with ID '${targetId}' not found.`); }
}

function nextSlide() { showSlide(currentSlideIndex + 1); }
function previousSlide() { showSlide(currentSlideIndex - 1); }
function stopSlideShow() { if (slideIntervalId) { clearInterval(slideIntervalId); slideIntervalId = null; } }
function startSlideShow() {
    stopSlideShow();
    if (slides.length > 1) { slideIntervalId = setInterval(nextSlide, SLIDE_INTERVAL_DELAY); }
}

// Event Listeners for Slider
if (nextButton) { nextButton.addEventListener('click', () => { stopSlideShow(); nextSlide(); startSlideShow(); }); }
else { console.warn("Next slide button ('#next-slide') not found."); }
if (prevButton) { prevButton.addEventListener('click', () => { stopSlideShow(); previousSlide(); startSlideShow(); }); }
else { console.warn("Previous slide button ('#prev-slide') not found."); }
if (slideTriggers.length > 0) {
    slideTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = trigger.getAttribute('data-target-slide');
            if (targetId) { stopSlideShow(); showSlideById(targetId); startSlideShow(); }
            else { console.warn("Slide trigger missing 'data-target-slide'.", trigger); }
        });
    });
} else { console.warn("No slide trigger elements found with class '.slide-nav-trigger'."); }
if (slidesContainer) {
    slidesContainer.addEventListener('mouseenter', () => { if (slideIntervalId) stopSlideShow(); });
    slidesContainer.addEventListener('mouseleave', startSlideShow);
} else { console.warn("Slides container ('.slides-container') not found for hover effect."); }
// --- End Slideshow Logic ---


// Start the slideshow automatically (if elements exist)
if (slides.length > 0 && prevButton && nextButton) {
    startSlideShow();
} else { console.warn("Slideshow auto-start skipped: Slides or buttons not found."); }