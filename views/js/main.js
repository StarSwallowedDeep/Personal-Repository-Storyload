let dragging = false;
let startX, initialLeft;

document.addEventListener("mousedown", function (e) {
    const photoContainers = document.querySelectorAll(".photo-container");
    dragging = true;

    startX = e.clientX;

    for (let i = 0; i < photoContainers.length; i++) {
        const style = window.getComputedStyle(photoContainers[i]);
        photoContainers[i].initialLeft = parseFloat(style.left);
    }
});

document.addEventListener("mouseup", function () {
    dragging = false;
});

document.addEventListener("mousemove", function (e) {
    if (dragging) {
        const dx = e.clientX - startX;
        const photoContainers = document.querySelectorAll(".photo-container");

        for (let i = 0; i < photoContainers.length; i++) {
            const container = photoContainers[i];
            const newLeft = container.initialLeft + dx;
            const containerWidth = parseFloat(window.getComputedStyle(container).width);
            const screenWidth = window.innerWidth;

            if (newLeft < 0) {
                container.style.left = "0";
                startX = e.clientX;
            } else if (newLeft + containerWidth > screenWidth) {
                container.style.left = screenWidth - containerWidth + "px";
                startX = e.clientX;
            } else {
                container.style.left = newLeft + "px";
            }
        }
    }
});

setTimeout(function () {
    document.getElementById("delayedContent").style.display = "block";
    document.body.classList.add("loaded");

    const elements = document.querySelectorAll("#delayedContent .navbar__logo, #delayedContent .navbar__menu li, #delayedContent .navbar__icons li, #delayedContent .bottom-content div");
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, (index + 1) * 200);
    });

    const storyloadContainer = document.querySelector(".storyload-container");
    setTimeout(() => {
        storyloadContainer.style.opacity = "1";
        storyloadContainer.style.transform = "translateY(0)";
    }, elements.length * 250 );
});

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.body.classList.add("loaded");
        const photoContainers = document.querySelectorAll(".photo-container");
        
        photoContainers.forEach((container, index) => {
            setTimeout(function () {
                container.classList.add("fade-in");
            }, index * 200); 
        });
    }, 2500); 
});

$(document).ready(function() {
    let id = $('#id');
    let pw = $('#pw');
    let btn = $('#btn');

    setTimeout(function() {
        $('.login-wrapper').addClass('fade-in');
    }, 500);

    $(btn).on('click', function() {
        if ($(id).val() == "") {
            $(id).next('label').addClass('warning');
            setTimeout(function() {
                $('label').removeClass('warning')
            }, 1500);
        } else if ($(pw).val() == "") {
            $(pw).next('label').addClass('warning');
            setTimeout(function() {
                $('label').removeClass('warning')
            }, 1500);
        }
    });
});

function showLoginForm() {
    const delayedContent = document.getElementById("delayedContent");
    const loginFormWrapper = document.getElementById("loginFormWrapper");

    delayedContent.style.display = "none";
    loginFormWrapper.style.display = "block";
}

function showLoginForm() {
    var loginFormWrapper = document.getElementById('loginFormWrapper');

    loginFormWrapper.style.display = 'block';
    loginFormWrapper.classList.add('login-form-wrapper');
}

function showDelayedContent() {
    document.getElementById("delayedContent").style.display = "block";
    document.getElementById("loginFormWrapper").style.display = "none";
}