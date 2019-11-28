console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
  talkToImagesApi();
});

function talkToImagesApi() {
  fetch('https://dog.ceo/api/breeds/image/random/4')
  .then(resp => resp.json())
  .then(json => getImages(json));
}

function getImages(json) {
  for (let i=0; i<json.message.length; i++) {
    const newImage = document.createElement('img');
    newImage.src = json.message[i];
    document.body.appendChild(newImage);
  }
}