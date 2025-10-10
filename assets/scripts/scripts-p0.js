const contentCenter = document.querySelector(".content-center");
const backgroundContainer = contentCenter.querySelector("#container");
const prevButton = document.getElementById("prev-portrait");
const nextButton = document.getElementById("next-portrait");
const portraitImages = [
	"Web/page00.jpg",
	"Web/page01.jpg",
	"Web/page02.jpg",
	"Web/page03.jpg",
	"Web/page04.jpg",
	"Web/page05.jpg",
	"Web/page06.jpg",
	"Web/page07.jpg",
];
const allPages = [
	"index.html",
	"1.html",
	"3.html",
	"5.html",
	"cover.html",
	"about.html",
];
const pageIndex = [0, 1, 3, 5, 7, 8];
const currentPage = window.location.pathname;
const nextPage = ["1.html"];
const prevPage = ["about.html"];

let currentImageIndex = 0;
const totalImages = portraitImages.length;

function updatePortraitBackground() {
	if (window.matchMedia("(orientation: portrait)").matches) {
		contentCenter.style.backgroundImage = `url('${portraitImages[currentImageIndex]}')`;
	}
}

// Initial background setup
updatePortraitBackground();

prevButton.addEventListener("click", () => {
	if (window.matchMedia("(orientation: portrait)").matches) {
		currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
		updatePortraitBackground();
	}
});

nextButton.addEventListener("click", () => {
	if (window.matchMedia("(orientation: portrait)").matches) {
		if (currentImageIndex === totalImages - 1) {
			// Navigate to the next page
			const currentPage = window.location.pathname;
			const pageNumberMatch = currentPage.match(/(\d+)\.html$/);
			if (pageNumberMatch && pageNumberMatch[1]) {
				const currentPageNumber = parseInt(pageNumberMatch[1], 10);
				const nextPageNumber = currentPageNumber + 1;
				window.location.href = `${nextPageNumber}.html`;
			} else {
				console.warn("Could not determine the next page number.");
				// Optionally, provide a fallback action if page number can't be parsed
			}
		} else {
			currentImageIndex = (currentImageIndex + 1) % totalImages;
			updatePortraitBackground();
		}
	}
});

// Listen for orientation changes to reset if needed (optional)
window.addEventListener("orientationchange", () => {
	updatePortraitBackground(); // Ensure the correct image is shown after orientation change
});
