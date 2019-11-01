let addToy = false
console.log("hit me baby1")
document.addEventListener("DOMContentLoaded", ()=>{
  console.log("hit me baby2")
  const addBtn = document.querySelector('#new-toy-btn')
  const submit_button = document.getElementById('toySubmit')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {

  console.log("hit me baby3")

      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  toyForm.addEventListener('submit', (ev) => {
    ev.preventDefault()      
    createToyCard();
  console.log("ended")
  })


})

function createToy(text, image, id){
  return fetch("http://localhost:3000/toys", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      likes: 0,
      name: text,
      image: image
    })
  })
  .then(res => res.json())
 }
 function updateToy(text, image, likes, id){
console.log(id)
   return fetch("http://localhost:3000/toys/" + id, {
     method: 'PATCH', 
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json',
     },
     body: JSON.stringify({
       likes: likes,
       name: text,
       image: image
     })
   })
   .then(res => res.json())
  }


// }


function createToyCard(){

  let toyName = document.getElementById('toyName');
  let toyImage = document.getElementById('toyImage');
  //doFetch(toyImage.value);
  console.log("We hit this")
  toyCollection = document.getElementById('toy-collection');
  carddiv = document.createElement('div');
  cardh2 = document.createElement('h2')
  cardh2.textContent = toyName.value
  cardimg = document.createElement('img')
  cardimg.src = toyImage.value
  cardp = document.createElement('p')
  cardp.textContent = "0"
  cardbutton = document.createElement('button')
  cardbutton.textContent = "Like!"
  
  carddiv.append(cardh2, cardimg, cardp, cardbutton)
  toyCollection.appendChild(carddiv)

  createToy(toyName.value,toyImage.value)
  .then(newToy => {
    cardbutton.addEventListener('click', (ev) => {
      cardp.textContent = parseInt(cardp.textContent)+1
        
      updateToy(toyName, toyImage, cardp.textContent, newToy.id)
      .then(data => {
      })
    })
  })
}
