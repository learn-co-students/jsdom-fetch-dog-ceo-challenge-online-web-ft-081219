const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

function getDogImage() {
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(json => {
    json.message.forEach(img => addImage(img))
  });
}

function addImage(imgUrl) {
  const container = document.querySelector('#dog-image-container');
  const newImage = document.createElement('img');
  newImage.src = imgUrl;
  container.appendChild(newImage);
}

getDogImage();