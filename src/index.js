console.log('%c HI', 'color: firebrick')
    //challenge 1
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

function getDog() {
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(data => {
            data.message.forEach(img => addDog(img));
        });
}

function addDog(imgUrl) {
    const image = document.querySelector('#dog-image-container');
    const newDog = document.createElement('img');
    newDog.src = imgUrl;
    image.appendChild(newDog);
}

getDog();

//challenge 2

//challenge 3

//challenge 4