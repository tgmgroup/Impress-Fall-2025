// var audioElements = document.querySelectorAll('audio');

function PlayAndShow(audioSound, textDiv, audioImage) {
	var myText = document.getElementById(textDiv);
	var myAudio = document.getElementById(audioSound);
	var myButton = document.getElementById(audioImage);

	/*audioElements.forEach(function(audio) {
        if (audio.id === audioSound) {
            // Play the selected audio
            audio.play();
        } else {
            // Mute all other audio elements
            audio.volume = 0;
            // Pause other audio elements (optional)
            audio.pause();
        }
    });*/

	if (myAudio.paused) {
		//myAudio.play();
		myText.style.display = "flex";
		myButton.src = "./assets/nav-images/stop-g55029e04a_1280.png";
		// myAudio.onended = ResetPlayAndShow(myAudio, myText, myButton);
		myAudio.addEventListener("ended", function () {
			myAudio.pause();
			myAudio.currentTime = 0;
			myText.style.display = "none";
			myButton.src = "./assets/nav-images/play-g79150a13d_1280.png";
		});
	} else {
		myAudio.pause();
		myAudio.currentTime = 0;
		myText.style.display = "none";
		myButton.src = "./assets/nav-images/play-g79150a13d_1280.png";
	}
}

function ResetPlayAndShow(audioSound, textDiv, audioImage) {
	// Pause all other audio elements
	var allAudioElements = document.querySelectorAll("audio");
	allAudioElements.forEach(function (audio) {
		if (audio.id !== audioSound) {
			audio.pause();
			audio.currentTime = 0;
		}
	});

	var myText = document.getElementById(textDiv);
	var myAudio = document.getElementById(audioSound);
	var myButton = document.getElementById(audioImage);

	myAudio.pause();
	myAudio.currentTime = 0;
	myAudio.style.display = "none"; // Hide the audio controls
	myText.style.display = "none";
	myButton.src = "./assets/nav-images/play-g79150a13d_1280.png";
}

function PlayAndShowWithNav(
	audioSound,
	textDiv,
	audioImage,
	navLeft,
	navRight
) {
	var myText = document.getElementById(textDiv);
	var myAudio = document.getElementById(audioSound);
	var myButton = document.getElementById(audioImage);
	var navLeftButton = document.getElementById(navLeft);
	var navRightButton = document.getElementById(navRight);

	/*audioElements.forEach(function(audio) {
        if (audio.id === audioSound) {
            // Play the selected audio
            audio.play();
        } else {
            // Mute all other audio elements
            audio.volume = 0;
            // Pause other audio elements (optional)
            audio.pause();
        }
    });*/

	if (myAudio.paused) {
		//myAudio.play();
		myText.style.display = "flex";
		myButton.src = "./assets/nav-images/stop-g55029e04a_1280.png";
		// myAudio.onended = ResetPlayAndShow(myAudio, myText, myButton);
		myAudio.addEventListener("ended", function () {
			myAudio.pause();
			myAudio.currentTime = 0;
			myText.style.display = "none";
			myButton.src = "./assets/nav-images/play-g79150a13d_1280.png";
		});
	} else {
		myAudio.pause();
		myAudio.currentTime = 0;
		myText.style.display = "none";
		myButton.src = "./assets/nav-images/play-g79150a13d_1280.png";
	}

	navLeftButton.style.visibility = "hidden";
	navRightButton.style.visibility = "hidden";
}

// ResetPlayAndShowWithNav function to reset audio, hide elements, and hide slide navigation
function ResetPlayAndShowWithNav(
	audioSound,
	textDiv,
	audioImage,
	navLeft,
	navRight
) {
	// Pause all other audio elements
	var allAudioElements = document.querySelectorAll("audio");
	allAudioElements.forEach(function (audio) {
		if (audio.id !== audioSound) {
			audio.pause();
			audio.currentTime = 0;
		}
	});

	var myText = document.getElementById(textDiv);
	var myAudio = document.getElementById(audioSound);
	var myButton = document.getElementById(audioImage);
	var navLeftButton = document.getElementById(navLeft);
	var navRightButton = document.getElementById(navRight);

	myAudio.pause();
	myAudio.currentTime = 0;
	myAudio.style.display = "none"; // Hide the audio controls
	myText.style.display = "none";
	myButton.src = "./assets/nav-images/play-g79150a13d_1280.png";
	navLeftButton.style.visibility = "visible";
	navRightButton.style.visibility = "visible";
}

function PlaySound(audioSound, audioImage) {
	// Pause all other audio elements
	var allAudioElements = document.querySelectorAll("audio");
	allAudioElements.forEach(function (audio) {
		if (audio.id !== audioSound) {
			audio.pause();
			audio.currentTime = 0;
		}
	});

	var myAudio = document.getElementById(audioSound);
	var myButton = document.getElementById(audioImage);

	if (myAudio.paused) {
		myAudio.play();
		myButton.src = "./assets/nav-images/stop-g55029e04a_1280.png";

		myAudio.addEventListener("ended", function () {
			myAudio.pause();
			myAudio.currentTime = 0;
			myButton.src = "./assets/nav-images/play-g79150a13d_1280.png";
		});
	} else {
		myAudio.pause();
		myAudio.currentTime = 0;
		myButton.src = "./assets/nav-images/play-g79150a13d_1280.png";
	}
}

function PlaySoundWithControls(audioSoundId, audioImageId) {
	// Define paths to your images for clarity and easier updates
	const playImageSrc = "./assets/nav-images/play-g79150a13d_1280.png";
	const stopImageSrc = "./assets/nav-images/stop-g55029e04a_1280.png"; // Assuming this is your stop/pause icon

	var myAudio = document.getElementById(audioSoundId);
	var myButton = document.getElementById(audioImageId);

	if (!myAudio) {
		console.error("Audio element not found:", audioSoundId);
		return;
	}
	// It's good practice to check for myButton too, though the original didn't explicitly
	if (!myButton) {
		console.warn("Audio button image element not found:", audioImageId);
		// If the button isn't found, the rest of the audio logic can proceed,
		// but image swapping will fail silently or error if not checked.
	}

	// Pause all other audio elements, hide their controls, and reset their states
	var allAudioElements = document.querySelectorAll("audio");
	allAudioElements.forEach(function (audio) {
		if (audio.id !== audioSoundId) {
			if (!audio.paused) {
				// If another audio was actually playing
				audio.pause();
				audio.currentTime = 0;
				// If you have a way to find the button associated with this 'audio' element,
				// you would reset its image source to playImageSrc here.
				// For example, if its button ID was audio.id.replace('audio', 'play'):
				// var otherButton = document.getElementById(audio.id.replace('audio', 'play'));
				// if (otherButton) otherButton.src = playImageSrc;
			}
			audio.style.display = "none"; // Hide controls for other audio elements
		}
	});

	if (myAudio.paused) {
		myAudio.style.display = "block"; // Or 'inline-block' depending on your layout needs
		myAudio.play();
		if (myButton) {
			myButton.src = stopImageSrc;
		}

		// Using onended to prevent multiple listeners on the same element
		myAudio.onended = function () {
			// myAudio.pause(); // Audio is already paused when 'ended' fires
			myAudio.currentTime = 0;
			if (myButton) {
				myButton.src = playImageSrc;
			}
			myAudio.style.display = "none"; // Hide controls when audio finishes
		};
	} else {
		myAudio.pause();
		// myAudio.currentTime = 0; // As per your original logic, reset time on manual pause, if commented out, does not reset time and will continue from last position
		if (myButton) {
			myButton.src = playImageSrc;
		}
		myAudio.style.display = "none"; // Hide controls when manually paused
	}

	// Optional: If you want to hide the player when explicitly paused before it ends
	// myAudio.style.display = "none";
	// If you hide on manual pause, you might not want to reset currentTime immediately
	// unless that's the desired behavior. For continuous play/pause, don't reset here.
	// myAudio.currentTime = 0; // Consider if you want this on manual pause
}

function PlayQuickSound(audioSound) {
	var myAudio = document.getElementById(audioSound);

	if (myAudio.paused) {
		myAudio.play();

		myAudio.addEventListener("ended", function () {
			myAudio.pause();
			myAudio.currentTime = 0;
		});
	} else {
		myAudio.pause();
		myAudio.currentTime = 0;
	}
}

function HideDiv(textDiv) {
	var myText = document.getElementById(textDiv);
	myText.style.display = "none";
}

function PlayAndShowGallery(audioSound, textDiv, audioImage) {
	//var myText = document.getElementById(textDiv);
	var myAudio = document.getElementById(audioSound);
	var myButton = document.getElementById(audioImage);

	myButton.style.visibility = "visible";

	myButton.src = "./assets/nav-images/stop-g55029e04a_1280.png";
	if (myAudio.paused) {
		myAudio.play();
		//myText.style.display = "flex";
		myButton.src = "./assets/nav-images/stop-g55029e04a_1280.png";
		// myAudio.onended = ResetPlayAndShow(myAudio, myText, myButton);
		myAudio.addEventListener("ended", function () {
			myAudio.pause();
			myAudio.currentTime = 0;
			//myText.style.display = "none";
			myButton.src = "./assets/nav-images/play-g79150a13d_1280.png";
		});
	} else {
		myAudio.pause();
		myAudio.currentTime = 0;
		//myText.style.display = "none";
		myButton.src = "./assets/nav-images/play-g79150a13d_1280.png";
	}
}

function ResetPlayAndShowGallery(audioSound, textDiv, audioImage) {
	//var myText = document.getElementById(textDiv);
	var myAudio = document.getElementById(audioSound);
	var myButton = document.getElementById(audioImage);

	myAudio.pause();
	myAudio.currentTime = 0;
	//myText.style.display = "none";
	myButton.style.visibility = "hidden";
	myButton.src = "./assets/nav-images/play-g79150a13d_1280.png";
}

function playHoverSoundOnClass(className) {
	const elements = document.getElementsByClassName(className);
	const hoverSound = new Audio("./audio/computerwav-14702A.mp3");

	Array.from(elements).forEach((element) => {
		element.addEventListener("mouseover", () => {
			hoverSound.play();
		});
	});

	// Optional: Pause the audio when the button is not hovered (optional)
	/* audioButton.addEventListener("mouseout", function() {
        audio.pause();
        audio.currentTime = 0; // Reset audio playback position
    });*/

	//Old Method
	/*function playClickSoundOnClass(className) {
        const elements = document.getElementsByClassName(className);
        const hoverSound = document.getElementById("click-sound");

        Array.from(elements).forEach(element => {
            element.addEventListener("click", () => {
                hoverSound.play();
            });
        });
    }*/
}

function toggleFullScreen() {
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen =
		docEl.requestFullscreen ||
		docEl.mozRequestFullScreen ||
		docEl.webkitRequestFullScreen ||
		docEl.msRequestFullscreen;
	var cancelFullScreen =
		doc.exitFullscreen ||
		doc.mozCancelFullScreen ||
		doc.webkitExitFullscreen ||
		doc.msExitFullscreen;

	if (
		!doc.fullscreenElement &&
		!doc.mozFullScreenElement &&
		!doc.webkitFullscreenElement &&
		!doc.msFullscreenElement
	) {
		requestFullScreen.call(docEl);
	} else {
		cancelFullScreen.call(doc);
	}
}

// Call a function to add hover and click sounds to buttons, passing the class name "clickable"
document.addEventListener("DOMContentLoaded", function () {
	playHoverSoundOnClass("clickable");
	// playClickSoundOnClass("clickable");

	// Use JavaScript to fetch and insert the menu HTML into the placeholder div.
	/*fetch('menu.html')
        .then(response => response.text())
        .then(data => {
        document.getElementById('menu-placeholder').innerHTML = data;
    });*/
});

// Get all elements with the "fullscreenLink" class
const fullscreenLinks = document.querySelectorAll(".fullscreenLink");

fullscreenLinks.forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault(); // Prevent the default link behavior

		// Get the URL from the href attribute of the clicked link
		const urlToOpen = link.getAttribute("href");

		// Check if the current page is in fullscreen mode
		if (document.fullscreenElement === null) {
			// If not in fullscreen, open the link normally
			window.location.href = urlToOpen;
		} else {
			// If in fullscreen, open the link in fullscreen
			const fullscreenElement = document.documentElement;

			fullscreenElement
				.requestFullscreen()
				.then(() => {
					window.location.href = urlToOpen;
				})
				.catch((error) => {
					console.error("Error entering fullscreen mode:", error);
				});
		}
	});
});

// Get all elements with the "fullscreenButton" class
const fullscreenButtons = document.querySelectorAll(".fullscreenButton");

fullscreenButtons.forEach((button) => {
	button.addEventListener("click", () => {
		// Get the URL from the data-url attribute of the clicked button
		// Old insecure method -- const urlToOpen = button.getAttribute("data-url");

		// New secure method -- using URL constructor to validate and parse the URL
		// Get the URL from the data-url attribute of the clicked button
		let urlToOpen = button.getAttribute("data-url");

		try {
			const parsedUrl = new URL(urlToOpen, window.location.origin); // Validate and parse the URL
			urlToOpen = parsedUrl.href; // Use the sanitized URL
		} catch (error) {
			console.error("Invalid URL in data-url attribute:", urlToOpen);
			return; // Exit the function if the URL is invalid
		}

		if (document.fullscreenElement === null) {
			window.location.href = urlToOpen;
		} else {
			const fullscreenElement = document.documentElement;

			fullscreenElement
				.requestFullscreen()
				.then(() => {
					window.location.href = urlToOpen;
				})
				.catch((error) => {
					console.error("Error entering fullscreen mode:", error);
				});
		}
	});
});
