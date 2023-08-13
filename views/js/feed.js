const FeedphotoList = [
    { name: "user/myphoto_01.jpg", date: "2023-07-10", weather: "snow", title: "사진 제목", text: "사진에 대한 설명이 들어갑니다."},
    { name: "user/myphoto_02.jfif", date: "2022-01-22", weather: "snow", title: "사진~!", text: "나의 특별한 공간"},
    { name: "user/myphoto_03.jfif", date: "2022-04-17", weather: "windy", title: "제목", text: "여기에 설명이 들어갑니다"},
    { name: "user/myphoto_04.jfif", date: "2019-12-22", weather: "none", title: "이름", text: "오늘의 하루"},
    { name: "user/myphoto_05.jfif", date: "2002-05-02", weather: "none", title: "실험실", text: "인스타나 트위터를 눌러주세요"},
    { name: "user/myphoto_06.jfif", date: "2023-02-19", weather: "snow", title: "Photo List", text: "Hello there!"},
    { name: "user/myphoto_07.jfif", date: "2022-07-15", weather: "flower", title: "Hello", text: "myphoto info~!"},
];

const feedphotoContainer = document.getElementById("feedphoto");

FeedphotoList.forEach((photo, index) => {
  const imageElement = document.createElement("img");
  imageElement.src = photo.name;
  
  const spanElement = document.createElement("span");
  spanElement.style = `--i: ${index};`;
  spanElement.appendChild(imageElement);

  feedphotoContainer.appendChild(spanElement);

  spanElement.addEventListener("click", () => {
    updateInfo(photo.title, photo.text);
  });
});

function updateInfo(title, text) {
  const updateTitle = document.getElementById("updateTitle");
  const updateText = document.getElementById("updateText");

  updateTitle.innerText = title;
  updateText.innerText = text;
}

let isDragging = false;
let initialX;
let galleryRotation = 0;

document.addEventListener('mousedown', (e) => {
  isDragging = true;
  initialX = e.clientX;

  setTimeout(() => {
    const gallery = document.querySelector('.feed-photo');
    gallery.style.animation = 'rotateGallery 0s infinite linear';
  }, 100);
});

document.addEventListener('mouseup', () => {
  isDragging = false;

  setTimeout(() => {
    const gallery = document.querySelector('.feed-photo');
    gallery.style.animation = 'rotateGallery 25s infinite linear';
  }, 100);
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const currentX = e.clientX;
    const movementX = currentX - initialX;
    initialX = currentX;

    galleryRotation += movementX;
    const gallery = document.querySelector('.feed-photo');
    gallery.style.transform = `perspective(800px) rotateY(${galleryRotation}deg)`;
  }
});

const feedPhoto = document.getElementById("feedphoto");
const images = feedPhoto.getElementsByTagName("img");
const card = document.querySelector('.card');
const imgBox = card.querySelector('.imgBox');
const imgElements = imgBox.getElementsByTagName('img');

let isCardVisible = false;

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function (event) {
    const clickedImageSrc = event.target.src;
    const clickedImageIndex = Array.from(images).findIndex(img => img.src === clickedImageSrc);
    const selectedPhoto = FeedphotoList[clickedImageIndex];

    imgElements[0].src = clickedImageSrc;
    imgElements[1].src = clickedImageSrc;

    const details = card.querySelector('.details');
    const content = details.querySelector('.content');
    const clickedImageFilename = clickedImageSrc.substring(clickedImageSrc.lastIndexOf('/') + 1);
    content.querySelector('h2').innerHTML = `${clickedImageFilename}<br>${selectedPhoto?.date.replace(/-/g, '.')}`;

    if (selectedPhoto && selectedPhoto.weather === "snow") {
      toggleSnow(); 
    } else {
      clearInterval(intervalId); 
      removeSnowflakes(); 
      snowing = false; 
    }

    if (selectedPhoto && selectedPhoto.weather === "flower") {
      startAnimation(); 
    }

    if (selectedPhoto && selectedPhoto.weather === "windy") {
      createSurface(); 
    }

    if (!isCardVisible) {
      card.style.display = 'block';
      isCardVisible = true;
    } else {
      card.style.display = 'none';
      isCardVisible = false;
    }
  });
}

const prevButton = card.querySelector('.prev-button');

prevButton.addEventListener('click', function() {
  card.style.display = 'none';
  isCardVisible = false;
});

let followCount = 210;
let isFollowed = false;
const followButton = document.querySelector('.follow-button');
const followCountElement = document.querySelector('.follow-count');

followButton.addEventListener('click', function () {
  if (isFollowed) {
    followCount--;
  } else {
    followCount++;
  }

  isFollowed = !isFollowed;
  followCountElement.textContent = followCount;
  updateFollowButton();
});

function updateFollowButton() {
  if (isFollowed) {
    followButton.classList.add('followed');
    followButton.textContent = '팔로잉';
  } else {
    followButton.classList.remove('followed');
    followButton.textContent = '팔로우 +' + followCount;
  }
}

let likeCount = 0;
let isLiked = false;
const likeButton = document.querySelector('.like-button');
const likeCountElement = document.querySelector('.like-count');

function toggleLike() {
  if (isLiked) {
    likeCount--;
  } else {
    likeCount++;
  }

  isLiked = !isLiked;
  likeCountElement.textContent = likeCount;
  updateLikeButton();
}

function updateLikeButton() {
  if (isLiked) {
    likeButton.classList.add('liked');
    likeButton.querySelector('.like-text').textContent = 'Liked';
  } else {
    likeButton.classList.remove('liked');
    likeButton.querySelector('.like-text').textContent = 'Like';
  }
}

let snowing = false; 
let intervalId;

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.style.left = Math.random() * window.innerWidth + 'px';
  document.body.appendChild(snowflake);

  const animationDuration = Math.random() * 5 + 5;
  snowflake.style.animationDuration = `${animationDuration}s`;
}

function removeSnowflakes() {
  const snowflakes = document.querySelectorAll('.snowflake');
  snowflakes.forEach((snowflake) => snowflake.remove());
}

function toggleSnow() {
  snowing = !snowing;

  if (snowing) {
    intervalId = setInterval(createSnowflake, 500);
  } else {
    clearInterval(intervalId);
    removeSnowflakes();
    stopAnimation();
    removeSurface();
  }
}

let animationInterval; 
let isAnimationRunning = false;
let levfElements = []; 

function startAnimation() {
  document.addEventListener('mousemove', handleMouseMove);
  isAnimationRunning = true;
}

function handleMouseMove(e) {
  if (!isAnimationRunning) return;

  let body = document.querySelector('body');
  let levf = document.createElement('leaf');
  let x = e.offsetX;
  let y = e.offsetY;
  levf.style.left = x + 'px';
  levf.style.top = y + 'px';

  let size = Math.random() * 70;
  levf.style.width = size + 'px';
  levf.style.height = size + 'px';

  let transformValue = Math.random() * 360;
  levf.style.transform = 'rotate(' + transformValue + 'deg)';

  body.appendChild(levf);
  levfElements.push(levf);

  setTimeout(function() {
    levf.remove();
    levfElements.splice(levfElements.indexOf(levf), 1);
  }, 700);
}

function stopAnimation() {
  document.removeEventListener('mousemove', handleMouseMove);
  isAnimationRunning = false;

  for (let i = 0; i < levfElements.length; i++) {
    levfElements[i].remove();
  }
  levfElements = [];
}

function createSurface() {
  const surfaceDiv = document.createElement('div');
  surfaceDiv.classList.add('surface');

  document.body.appendChild(surfaceDiv);
}

function removeSurface() {
  const surfaceElement = document.querySelector('.surface');
  
  if (surfaceElement) {
    surfaceElement.remove();
  }
}

//feed.js 파일에서 post.js에서 내보낸 모듈을 가져와서 사용
//import { exampleList } from './post.js';

//function displayImageInfo() {
//  const exampleListContainer = document.getElementById("exampleListContainer");
//  exampleListContainer.innerHTML = "";
//
//  exampleList.forEach((imageInfo, index) => {
//      const listItem = document.createElement("div");
//      listItem.textContent = `
//          Name: ${imageInfo.name}
//          Date: ${imageInfo.date}
//          Weather: ${imageInfo.weather}
//          Title: ${imageInfo.title}
//          Text: ${imageInfo.text}
//      `;
//      listItem.classList.add("image-info");
//
//      exampleListContainer.appendChild(listItem);
//  });
//}
//
// 페이지 로드 시 이미지 리스트를 표시
//displayImageInfo();