console.log('Client side file done')

/*fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}) */

const weatherdata = document.querySelector('form')
const serch = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherdata.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = serch.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                console.log('we are in the console application for the application.')
                messageOne.textContent = data.location
                messageTwo.textContent = data.forcast
            }
        })
    })
})