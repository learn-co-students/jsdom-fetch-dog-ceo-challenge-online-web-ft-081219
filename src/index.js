console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
  talkToImagesApi();
  talkToBreedsApi();
  addFilter();
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

function talkToBreedsApi() {
  fetch('https://dog.ceo/api/breeds/list/all')
  .then(resp => resp.json())
  .then(json => getDogBreeds(json.message));
}

function getDogBreeds(json) {
  let nameArray = [];
  const breedList = document.getElementById('dog-breeds');
  for (const name in json) {
    if (json[name].length !== 0) {
      for (let i=0; i<json[name].length; i++) {
        nameArray.push(`${json[name][i]} ${name}`);
      }
    } else {
      nameArray.push(name)
    }
  }
  for (let i=0; i<nameArray.length; i++) {
    const newDogBreed = document.createElement('li');
    newDogBreed.innerText = nameArray[i];
    addColorChange(newDogBreed);
    breedList.appendChild(newDogBreed);
  }
}

function addColorChange(li) {
  li.addEventListener('click', function() {
    if (li.style.color==='red') {
      li.style.color = '';
    } else {
      li.style.color = 'red';
    }
  });
}

function addFilter() {
  const dropDown = document.getElementById('breed-dropdown');
  const breedList = document.getElementById('dog-breeds');
  const holderArray = [];
  dropDown.addEventListener('change', function() {

    for (let i=0; i<holderArray.length; i++){
      breedList.appendChild(holderArray[i]);
    }

    holderArray.length=0;

    for (let i=0; i<breedList.childElementCount; i++) {
      let thisChild = breedList.children[i]
      if (!thisChild.innerText.startsWith(dropDown.value)) {
        holderArray.push(thisChild);
      }
    }

    for (let i=0; i<holderArray.length; i++) {
      breedList.removeChild(holderArray[i]);
    }

  });
}