// Slideshow 1
let slideIndex1 = 1;
showSlides1(slideIndex1);

function plusSlides1(n) {
    showSlides1(slideIndex1 += n);
}

function currentSlide1(n) {
    showSlides1(slideIndex1 = n);
}

function showSlides1(n) {
    const slides = document.getElementsByClassName("mySlides1");
    const thumbnails = document.getElementsByClassName("thumbnail1");

    if (n > slides.length) slideIndex1 = 1;
    if (n < 1) slideIndex1 = slides.length;

    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].className = thumbnails[i].className.replace(" active-thumbnail", "");
    }

    slides[slideIndex1 - 1].style.display = "flex";
    thumbnails[slideIndex1 - 1].className += " active-thumbnail";
}

// Slideshow 2
let slideIndex2 = 1;
showSlides2(slideIndex2);

function plusSlides2(n) {
    showSlides2(slideIndex2 += n);
}

function currentSlide2(n) {
    showSlides2(slideIndex2 = n);
}

function showSlides2(n) {
    const slides = document.getElementsByClassName("mySlides2");
    const thumbnails = document.getElementsByClassName("thumbnail2");

    if (n > slides.length) slideIndex2 = 1;
    if (n < 1) slideIndex2 = slides.length;

    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].className = thumbnails[i].className.replace(" active-thumbnail", "");
    }

    slides[slideIndex2 - 1].style.display = "flex";
    thumbnails[slideIndex2 - 1].className += " active-thumbnail";
}

document.addEventListener("DOMContentLoaded", () => {
    showSlides1(slideIndex1);
    showSlides2(slideIndex2);
});