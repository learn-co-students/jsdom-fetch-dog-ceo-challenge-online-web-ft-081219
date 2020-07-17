let breeds = []

document.addEventListener("DOMContentLoaded", () => {
    fetchDogs()
    fetchBreeds()
    changeLiColor()
    selectBreeds()
})

function fetchDogs(){
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(resp => resp.json())
        .then(obj => addDogs(obj.message))
}

function addDogs(urls){
    const dogContainer = document.getElementById("dog-image-container")
    urls.forEach(url => {
        const div = document.createElement('div')
        const image = document.createElement('img')
        image.setAttribute('src', url)
        image.setAttribute('alt', "dog image")
        div.appendChild(image)
        dogContainer.appendChild(div)
    })
}

function fetchBreeds(){
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(resp => resp.json())
        .then(obj => {
            getBreeds(obj.message)
            addBreeds()
        })
}

function getBreeds(breedObj){
    Object.keys(breedObj).forEach(k => {
        if (k === "austrailian") {
            // austrailian shepard ordered differently than all other data in the fetch request
            breeds.push(k + " " + breedObj[k])
        } else if (breedObj[k].length > 0) {
            breedObj[k].forEach(prefix => {
                breeds.push(prefix + " " + k)
            })
        } else {
            breeds.push(k)
        }
    })
}

function addBreeds(query = ""){
    const breedsList = document.getElementById('dog-breeds')
    breedsList.innerHTML = ""

    if (query === "") {
        breeds.forEach(b => {
            let li = document.createElement('li')
            li.innerText = b
            breedsList.appendChild(li)
        })
    } else {
        breeds.filter(breed => breed.startsWith(query)).forEach(b => {
            let li = document.createElement('li')
            li.innerText = b
            breedsList.appendChild(li)
        })
    }
    
}

function changeLiColor(){
    const ul = document.querySelector('ul')
    ul.addEventListener('click', (event) => {
        let el = event.target
        if (el.tagName === 'LI'){
            if (el.style.color === "") {
                el.style.color = 'green'
            } else if (el.style.color === 'green') {
                el.style.color = 'red'
            } else {
                el.style.color = ""
            }
        }
    })
}

function selectBreeds(){
    const dropdown = document.querySelector('#breed-dropdown');

    dropdown.addEventListener('change', (e) => {
        addBreeds(e.target.value)
    })
}