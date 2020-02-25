console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function () {
    fetchImages();
    fetchBreeds();
    changeColor();
})


function fetchImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(resp => resp.json())
        .then(data => {
            data.message.forEach(url => {
                displayImg(url)
            });
        })
}

function displayImg(url) {
    const images = `<img src=${url} class="myImg" style="display: inline-block; height: 300px" >`
    const dogDiv = document.querySelector("#dog-image-container");
    dogDiv.innerHTML += images;
}

function fetchBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(resp => resp.json())
        .then(data => {
            for (const key in data.message) {
                const eachKey = data.message[key];
                eachKey.forEach(e => {
                    // console.log(e);
                    displayDogs(e);
                });
            }
        })
}

function displayDogs(e) {
    const dogList = document.getElementById("dog-breeds")
    let x = document.createElement("LI");
    x.setAttribute("id", "myList")
    let t = document.createTextNode(e);
    x.appendChild(t);
    dogList.appendChild(x);
}