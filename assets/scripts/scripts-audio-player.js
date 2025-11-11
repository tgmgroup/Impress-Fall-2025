// Get Audio Source URL
const playAudioElement = document.getElementById("playAudio"); // 1. Get the HTML element first

let srcUrl = "";

if (playAudioElement) {
	srcUrl = playAudioElement.src; // 2. Access the 'src' property of that element to get the string URL
} else {
	console.error("The audio element with ID 'playAudio' was not found.");
}

// Get other DOM elements
const playPauseBtn = document.getElementById("playPauseBtn");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const speedSlider = document.getElementById("speed");
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

let peaks = [];
let progressInterval;

// Initialize Howler
const sound = new Howl({
	src: [srcUrl],
	html5: true,
	onplay: updateProgress,
	onseek: updateProgress,
	onload: () => {
		durationEl.textContent = formatTime(sound.duration());
		if (peaks.length === 0) generateWaveform(srcUrl);
	},
});

// Format time helper
const formatTime = (secs) => {
	const m = Math.floor(secs / 60);
	const s = Math.floor(secs % 60)
		.toString()
		.padStart(2, "0");
	return `${m}:${s}`;
};

// Resize canvas
function resizeCanvas() {
	const rect = canvas.getBoundingClientRect();
	canvas.width = rect.width * window.devicePixelRatio * 0.8;
	canvas.height = rect.height * window.devicePixelRatio;
	ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	drawWaveform(0);
}

// Helper to reinitialize waveform once modal is visible
function showWaveformWhenVisible() {
	const rect = canvas.getBoundingClientRect();
	if (rect.width > 0 && rect.height > 0) {
		resizeCanvas();
		if (peaks.length === 0) generateWaveform(srcUrl);
	} else {
		// Retry until modal is visible
		requestAnimationFrame(showWaveformWhenVisible);
	}
}

window.addEventListener("resize", resizeCanvas);
showWaveformWhenVisible();
// resizeCanvas();

// Generate waveform from real audio data
async function generateWaveform(url) {
	const response = await fetch(url);
	const arrayBuffer = await response.arrayBuffer();
	const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

	const rawData = audioBuffer.getChannelData(0);
	const samples = 200; // fewer samples = smoother waveform
	const blockSize = Math.floor(rawData.length / samples);
	peaks = [];

	for (let i = 0; i < samples; i++) {
		let sum = 0;
		for (let j = 0; j < blockSize; j++) {
			sum += Math.abs(rawData[i * blockSize + j]);
		}
		peaks.push(sum / blockSize);
	}

	drawWaveform(0);
}

// Get CSS variables from stylesheet
function getCssVariable(name) {
	// We get the computed styles for the <html> element (the root)
	return getComputedStyle(document.documentElement)
		.getPropertyValue(name)
		.trim();
}

// Get colors for waveform
const FOREGROUND_COLOR = getCssVariable("--waveform-foreground");
const BACKGROUND_COLOR = getCssVariable("--waveform-background");


// Draw waveform
function drawWaveform(progress = 0) {

	const FOREGROUND_COLOR = getCssVariable("--waveform-foreground");
	const BACKGROUND_COLOR = getCssVariable("--waveform-background");
	const width = canvas.width / window.devicePixelRatio;
	const height = canvas.height / window.devicePixelRatio;
	ctx.clearRect(0, 0, width, height);

	const barWidth = width / peaks.length;
	const midY = height / 2;

	peaks.forEach((amp, i) => {
		const x = i * barWidth;
		const barHeight = amp * height * 0.9;
		const isPlayed = i / peaks.length < progress;
		ctx.fillStyle = isPlayed ? FOREGROUND_COLOR : BACKGROUND_COLOR;
		ctx.fillRect(x, midY - barHeight / 2, barWidth * 0.9, barHeight);
	});
}

// Play / Pause
playPauseBtn.addEventListener("click", () => {
	if (sound.playing()) {
		sound.pause();
		playPauseBtn.textContent = "▶️";
	} else {
		sound.play();
		playPauseBtn.textContent = "⏸";
	}
});

// Update progress
function updateProgress() {
	clearInterval(progressInterval);
	progressInterval = setInterval(() => {
		if (!sound.playing()) {
			clearInterval(progressInterval);
			return;
		}
		const seek = sound.seek();
		const dur = sound.duration();
		const progress = seek / dur;

		currentTimeEl.textContent = formatTime(seek);
		drawWaveform(progress);
	}, 200);
}

// Click to seek
canvas.addEventListener("click", (e) => {
	const rect = canvas.getBoundingClientRect();
	const clickX = e.clientX - rect.left;
	const progress = clickX / rect.width;
	sound.seek(progress * sound.duration());
	drawWaveform(progress);
});

// Volume and speed
volumeSlider.addEventListener("input", () =>
	sound.volume(parseFloat(volumeSlider.value))
);
speedSlider.addEventListener("input", () =>
	sound.rate(parseFloat(speedSlider.value))
);
