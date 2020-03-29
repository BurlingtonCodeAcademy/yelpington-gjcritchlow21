/*------Functions------*/
function capitalize(word) {
    let steralize = word.toString().trim().toLowerCase()
    let firstLetter = steralize[0].toUpperCase()
    let restOfWord = steralize.slice(1)
    return firstLetter + restOfWord
}

function titleize(sentence) {
    let wordArray = sentence.toLowerCase().split(' ')
    let newArray = wordArray.map(capitalize)
    return newArray.join(' ')
}

let restList = document.getElementById('restList')

/*----------Restaruant Map Location and Details--------*/
async function restaurantDetails() {
    fetch('./api/all.json')
        .then((res) => {
            return res.json()
        })
        .then((idList) => {
            idList.forEach((id) => {
                let cleanUp = id.split('-').join(' ')
                let name = titleize(cleanUp)
                restList.innerHTML += `<div class='linkContainer'> <a class='links' href='/restaurant?${id}'>${name}</a></div>`
                fetch(`./api/${id}.json`)
                    .then((res) => res.json())
                    .then((restInfo) => {
                        let address = restInfo.address
                        fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
                            .then((data) => {
                                return data.json()
                            })
                            .then((jsonObj) => {
                                let rests = jsonObj[0]
                                let lat = rests.lat
                                let lon = rests.lon
                                L.marker([lat, lon]).addTo(myMap).bindPopup(`<a href='/restaurant?${id}'>${name}</a>`)
                            })
                    })
            })
        })
}

restaurantDetails()

/*----------Map---------*/
let myMap = L.map('mapid').setView([44.4759, -73.2121], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)
