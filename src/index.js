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
  // iterate over json image urls
  // for each one create a new image, and append to body
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
  // format is an object with keys as basic breed name, and values to those keys that are each an array of adjectives appended to basic breed
  // if there are adjectives, add them to nameArray with adjective pushed in front of name
  // for all elements in nameArray, make them able to change color, and append them
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

    // reinirialize the UL on the page by adding everything inside holderArray
    for (let i=0; i<holderArray.length; i++){
      breedList.appendChild(holderArray[i]);
    }

    // reset holderArray
    holderArray.length=0;

    // iterate through children in UL - if doesn't match filter, push to holderArray
    // don't delete immediately - will affect the COUNT by [i]
    for (let i=0; i<breedList.childElementCount; i++) {
      let thisChild = breedList.children[i]
      if (!thisChild.innerText.startsWith(dropDown.value)) {
        holderArray.push(thisChild);
      }
    }

    // remove all children that are in the holderArray
    for (let i=0; i<holderArray.length; i++) {
      breedList.removeChild(holderArray[i]);
    }

  });
}