console.log('client side javascript file is loaded')
//client side javascript 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//messageTwo.textContent = ''
//how to run a code when someone submit the form
//1st arg: name of the event we are trying to listen for
//2nd arg: callback function, that runs every time the event occur
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent= data.error
        }else{
            messageOne.textContent=data.address
            messageTwo.textContent=data.forecast
        }
    })
}) 


})