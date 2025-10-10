document.addEventListener('DOMContentLoaded', () => {
    const backgroundContainer = document.getElementById("page-content");
    const prevButton = document.getElementById("prev-portrait"); // Use consistent IDs
    const nextButton = document.getElementById("next-portrait");

    // --- Get Page-Specific Data ---
    const dataset = backgroundContainer.dataset;
    const currentPageNum = parseInt(dataset.pageNumber, 10); // Keep track if needed elsewhere
    const prevPageUrl = dataset.prevPage || ""; // Handle missing prev page (first page)
    const nextPageUrl = dataset.nextPage || ""; // Handle missing next page (last page)
    const landscapeBg = dataset.landscapeBg;
    const portraitImages = [
        dataset.portraitLeft,
        dataset.portraitRight
    ].filter(Boolean); // Create array, remove any empty strings if one is missing

    let currentPortraitIndex = 0; // 0 for left page, 1 for right page
    const totalPortraitImages = portraitImages.length;

    // --- Helper Functions ---

    function navigateTo(url) {
        if (url) {
            window.location.href = url;
        } else {
            console.warn("Navigation URL is missing.");
            // Optionally disable the button visually if no URL
        }
    }

    function updateDisplay() {
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;
        // Optional: Also check width for tablet-like devices that might be wide but portrait
        // const isNarrow = window.innerWidth < 768; // Example breakpoint
        // const shouldUsePortraitView = isPortrait || isNarrow;

        if (isPortrait && totalPortraitImages > 0) {
            // Portrait Mode: Show single page background
            console.log(`Portrait: Showing image index ${currentPortraitIndex}: ${portraitImages[currentPortraitIndex]}`);
            backgroundContainer.style.backgroundImage = `url('${portraitImages[currentPortraitIndex]}')`;
            // Ensure CSS handles layout changes (e.g., stacking elements)
            document.body.classList.add('is-portrait');
            document.body.classList.remove('is-landscape');
        }  else {
            // Landscape Mode: Show double-page spread background (or let CSS handle it)
             console.log(`Landscape: Showing image ${landscapeBg}`);
            if (landscapeBg) {
                 backgroundContainer.style.backgroundImage = `url('${landscapeBg}')`;
            } else {
                 backgroundContainer.style.backgroundImage = 'none'; // Or default
            }
             // Ensure CSS handles layout changes
            document.body.classList.add('is-landscape');
            document.body.classList.remove('is-portrait');
            // Reset portrait index when switching to landscape? Maybe not necessary.
        }

        // --- Button State (Optional but Recommended) ---
        // Disable buttons if there's no target page/image
        if (isPortrait) {
             prevButton.disabled = (currentPortraitIndex === 0 && !prevPageUrl);
             nextButton.disabled = (currentPortraitIndex === totalPortraitImages - 1 && !nextPageUrl);
        } else {
            prevButton.disabled = !prevPageUrl;
            nextButton.disabled = !nextPageUrl;
        }

    }

    // --- Event Listeners ---

    prevButton.addEventListener("click", () => {
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;
        // const isNarrow = window.innerWidth < 768;
        // const shouldUsePortraitView = isPortrait || isNarrow;

        if (isPortrait && totalPortraitImages > 0) {
            // Portrait Logic
            if (currentPortraitIndex > 0) {
                // Go to previous image (e.g., from right page to left page)
                currentPortraitIndex--;
                updateDisplay();
            } else {
                // Already on the first image, navigate to the previous HTML page
                navigateTo(prevPageUrl);
            }
        } else {
            // Landscape Logic: Navigate to the previous HTML page
            navigateTo(prevPageUrl);
        }
    });

    nextButton.addEventListener("click", () => {
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;
        // const isNarrow = window.innerWidth < 768;
        // const shouldUsePortraitView = isPortrait || isNarrow;

        if (isPortrait && totalPortraitImages > 0) {
            // Portrait Logic
            if (currentPortraitIndex < totalPortraitImages - 1) {
                // Go to next image (e.g., from left page to right page)
                currentPortraitIndex++;
                updateDisplay();
            } else {
                // Already on the last image, navigate to the next HTML page
                navigateTo(nextPageUrl);
            }
        } else {
            // Landscape Logic: Navigate to the next HTML page
            navigateTo(nextPageUrl);
        }
    });

    // Listen for orientation changes AND resize (covers more cases)
    window.addEventListener("orientationchange", updateDisplay);
    window.addEventListener("resize", updateDisplay);


    // --- Initial Setup ---
    updateDisplay(); // Set the correct initial view
});