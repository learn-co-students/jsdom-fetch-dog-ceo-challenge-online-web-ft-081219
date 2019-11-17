console.log('%c HI', 'color: firebrick')
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
function fetchImages() {
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(json => renderImgs(json));
}

function renderImgs(json) {
  const imgContainer = document.getElementById('dog-image-container')
  json.message.forEach(img => {
    const i = document.createElement('img')
    i.src = img
    imgContainer.appendChild(i)
  })
}

function fetchBreeds() {
  fetch(breedUrl)
  .then(resp => resp.json())
  .then(json => {
    breeds = Object.keys(json.message)
    breeds.forEach(breed => addBreed(breed))
    addBreedSelectListener();
    })
}

document.addEventListener("DOMContentLoaded", function() {
  fetchImages()
  fetchBreeds()
})

function filterBreed(letter) {
  const ul = document.getElementById('dog-breeds')
  removeChildren(ul)
  
  breeds.forEach(breed => addBreed(breed));
}


function addBreed(breed) {
  const ul = document.getElementById('dog-breeds')
  const li = document.createElement('li')
  li.innerText = breed
  ul.appendChild(li)
  li.addEventListener('click', e => {
    e.target.style.color = 'red'
  })
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    filterBreed(event.target.value);
  });
}
