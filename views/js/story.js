function returnToOriginalStyle() {
    const overlayContainer = document.querySelector('.overlay-container');

    overlayContainer.classList.add('animation-scaleOutAndIn');
    overlayContainer.style.opacity = '0';

    setTimeout(() => {
        overlayContainer.classList.remove('animation-scaleOutAndIn');
        overlayContainer.classList.add('hidden');
    }, 1000);
}

function applyAnimation() {
    const overlayContainer = document.querySelector('.overlay-container');

    overlayContainer.classList.remove('hidden');
    overlayContainer.style.opacity = '1';

    setTimeout(returnToOriginalStyle, 5000); 
}

window.addEventListener('load', applyAnimation);

setTimeout(function() {
    var logoutDiv = document.getElementById('logoutDiv');
    logoutDiv.style.display = 'block';

    setTimeout(function() {
        logoutDiv.style.opacity = 1;
    }, 50); 
}, 6500);

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const images = document.querySelectorAll(".photo-board img");

        images.forEach(function(img) {
            img.style.display = "block";
        });
    }, 7000);
});

const photoList = [
    { name: "user/myphoto_01.jpg", date: "2023-07-10" },
    { name: "user/myphoto_02.jfif", date: "2022-01-22" },
    { name: "user/myphoto_03.jfif", date: "2022-04-17" },
    { name: "user/myphoto_04.jfif", date: "2019-12-22" },
    { name: "user/myphoto_05.jfif", date: "2002-05-02" },
    { name: "user/myphoto_06.jfif", date: "2023-02-19" },
    { name: "user/myphoto_07.jfif", date: "2022-07-15" },
];

const photoBoardDiv = document.getElementById("photoBoard");

let prevX = 0;
let prevY = 40; 
const distanceBetweenImages = 300;
const maxPerRow = 5; 
let clickedImage = null;
let offset = { x: 0, y: 0 };

const photoInfo = document.createElement("div");
const updateText = document.getElementById("updateText");
const filenameText = document.getElementById("filenameText");
const boardMode = document.querySelector(".board-mode");
const screenMode = document.querySelector(".screen-mode");

photoInfo.classList.add("photo-information");
photoBoardDiv.appendChild(photoInfo);

photoList.forEach((photo, index) => {
    const imgElement = document.createElement("img");
    imgElement.src = photo.name;
    imgElement.classList.add("show-animation");
    imgElement.style.position = "absolute";
    imgElement.style.left = `${prevX}px`;
    imgElement.style.top = `${prevY}px`;

    prevX += distanceBetweenImages;

    const animationDuration = (index + 1) + 's';
    imgElement.style.animationDuration = animationDuration;

    if ((index + 1) % maxPerRow === 0) {
        prevX = 0;
        prevY += 300; 
    }

    imgElement.addEventListener("mouseenter", () => {
        updateText.textContent = photo.date;
        filenameText.textContent = photo.name;
        photoInfo.style.display = "block";
    });

    imgElement.addEventListener("mouseleave", () => {
        photoInfo.style.display = "none";
    });

    imgElement.addEventListener("mousedown", handleMouseDown);
    imgElement.addEventListener("mousemove", handleMouseMove);
    imgElement.addEventListener("mouseup", handleMouseUp);

    photoBoardDiv.appendChild(imgElement);
});

function handleMouseDown(event) {
    event.preventDefault();
    clickedImage = event.target;
    offset.x = event.clientX - clickedImage.offsetLeft;
    offset.y = event.clientY - clickedImage.offsetTop;

    rotateImage360();
}

let currentIndex = 0; 

function changeImageBackground() {
    const body = document.body;
    const imageUrl = `url('${photoList[currentIndex].name}')`; 
    body.style.background = imageUrl; 
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundPosition = 'center 200px';
    body.style.backgroundColor = '#dbdbdb';

    currentIndex++;

    if (currentIndex >= photoList.length) {
        currentIndex = 0; 
    }
}

function rotateImage360() {
    changeImageBackground();
}

imgElement.addEventListener("click", rotateImage360);

function handleMouseMove(event) {
    if (clickedImage) {
        clickedImage.style.left = event.clientX - offset.x + "px";
        clickedImage.style.top = event.clientY - offset.y + "px";
    }
}

function handleMouseUp() {
    clickedImage = null;
}

function resetImagesToOriginalPosition() {
    const images = document.querySelectorAll(".photo-board img");

    images.forEach((image, index) => {
        const originalLeft = (index % maxPerRow) * distanceBetweenImages;
        const originalTop = Math.floor(index / maxPerRow) * 300 + 40;
        const currentLeft = parseInt(image.style.left, 10);
        const currentTop = parseInt(image.style.top, 10);
        const deltaX = originalLeft - currentLeft;
        const deltaY = originalTop - currentTop;

        resetImagePosition(image, deltaX, deltaY);
    });
    boardMode.classList.add("selected");
    screenMode.classList.remove("selected");
}

photoList.forEach((photo) => {
    createImageElement(photo);
});

function resetImagePosition(image, deltaX, deltaY) {
    const start = performance.now();
    const duration = 500;

    function animateImage(timestamp) {
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        const translateX = deltaX * percentage;
        const translateY = deltaY * percentage;

        image.style.transform = `translate(${translateX}px, ${translateY}px)`;

        if (progress < duration) {
            requestAnimationFrame(animateImage);
        }
    }
    
    requestAnimationFrame(animateImage);
}

function ImagestoScreenMode() {
    const images = document.querySelectorAll(".photo-board img");
    const slideStep = 200; 
    let currentSlideIndex = 0; 

    function slideImages() {
        images.forEach((image, index) => {
            const adjustedIndex = index % maxPerRow;
            const newPosition = (adjustedIndex - currentSlideIndex) * slideStep;

            resetImagePosition(image, newPosition, 0);
        });
    }

    function handleScroll(event) {
        if (event.deltaY < 0) {
            currentSlideIndex++;
            if (currentSlideIndex >= maxPerRow) {
                currentSlideIndex = 0;
            }
        } else {
            currentSlideIndex--;
            if (currentSlideIndex < 0) {
                currentSlideIndex = maxPerRow - 1;
            }
        }
        
        slideImages();
    }

    window.addEventListener("wheel", handleScroll);
    slideImages();

    boardMode.classList.remove("selected");
    screenMode.classList.add("selected");
}

ImagestoScreenMode();