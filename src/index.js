const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyUrl = 'http://localhost:3000/toys'
let allToys = []
let toyColl = document.querySelector('#toy-collection')
const likeBtn = document.querySelector('#like-button')
// YOUR CODE HERE

// getting all the toys
fetch(toyUrl) // => promise
  .then(function(promisedData){
     return promisedData.json() // this is promisedData turned into JSON
  })
  .then(function(parsedJSON) {
    allToys = parsedJSON
    toyColl.innerHTML = ""
    allToys.forEach(toy => showToys(toy))
  })

// adding a new toy
toyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let inpName = document.querySelector('#input-name').value
  let inpImage = document.querySelector('#input-image').value
  fetch(toyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": `${inpName}`,
      "image": `${inpImage}`,
      "likes": 0
    })
  })
    .then(function(promisedData){
      return promisedData.json()
    })
    .then(function(parsedJSON){
      newToy = parsedJSON
      allToys.push(newToy)
      allToys.forEach(showToys)
    })
})

// adding likes to a toy
toyColl.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.dataset.action === 'like'){
    let id = e.target.parentNode.dataset.id
    let toyLikes = e.target.previousElementSibling
    let likes = parseInt(toyLikes.innerText)
    ++likes
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "likes": likes
      })
    })
      .then(function(promisedData){
        return promisedData.json()
      })
      .then(function(parsedJSON){
        let updatedToy = parsedJSON
        toyLikes.innerText = `${updatedToy.likes} Likes`
        // need to get the html in order to update on the page
      })
  }
})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function showToys(toy) {
  toyColl.innerHTML += `
  <div class="card" data-id=${toy.id}>
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p> ${toy.likes} Likes </p>
    <button id="like-button" class="like-btn" data-action="like" >Like <3</button>
  </div>
  `}

// OR HERE!
