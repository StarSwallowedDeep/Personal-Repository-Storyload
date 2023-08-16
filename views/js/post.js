const exampleList = [];

function openImagePicker() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = function (event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const imageElement = document.querySelector('.image');
                imageElement.src = e.target.result;
            }

            reader.readAsDataURL(selectedFile);

            const today = new Date().toISOString().split('T')[0];
            const newImageInfo = {
                name: selectedFile.name,
                date: today,
                weather: "",
                title: "",
                text: ""
            };
            exampleList.push(newImageInfo);
            currentIndex = exampleList.length - 1;

            const feedTitle = document.querySelector('.feed-title');
            feedTitle.textContent = "사진 제목";
            feedTitle.dataset.index = currentIndex;

            const feedDescription = document.querySelector('.feed-description');
            feedDescription.textContent = "사진에 대한 설명이 여기에 들어갑니다.";
            feedDescription.dataset.index = currentIndex;
        }
    };

    fileInput.click();
}

function editTitle(element) {
    const newTitle = prompt('사진 제목을 입력하세요:', element.textContent);

    if (newTitle !== null) {
        element.textContent = newTitle;
        const index = parseInt(element.dataset.index);
        exampleList[index].title = newTitle;
    }
}

function editDescription(element) {
    const newDescription = prompt('사진 설명을 입력하세요:', element.textContent);

    if (newDescription !== null) {
        element.textContent = newDescription;
        const index = parseInt(element.dataset.index);
        exampleList[index].text = newDescription;
    }
}

function showWeatherOptions() {
    const options = document.getElementById("weatherOptions");

    if (options.style.display === "none") {
        options.style.display = "block";
    } else {
        options.style.display = "none";
    }
}

function selectWeather(weather) {
    document.getElementById("result").innerHTML = "Selected weather: " + weather;
    document.getElementById("weatherOptions").style.display = "none";
    const index = parseInt(document.querySelector(".feed-title").dataset.index);
    exampleList[index].weather = weather;
}

function displayExampleList() {
    const exampleListContainer = document.getElementById("exampleListContainer");
    exampleListContainer.innerHTML = "";

    exampleList.forEach((imageInfo, index) => {
        const listItem = document.createElement("div");
        listItem.textContent = `
            Name: ${imageInfo.name}
            Date: ${imageInfo.date}
            Weather: ${imageInfo.weather}
            Title: ${imageInfo.title}
            Text: ${imageInfo.text}
        `;
        listItem.classList.add("image-info");

        exampleListContainer.appendChild(listItem);
    });
}

function postImage() {
    displayExampleList();
}

document.querySelector(".cloud-button.icon").addEventListener("click", showWeatherOptions);
document.querySelector(".post-button").addEventListener("click", postImage);
displayExampleList();

//post.js 파일에서 이미지 정보를 내보내는 모듈
//export const exampleList = [];