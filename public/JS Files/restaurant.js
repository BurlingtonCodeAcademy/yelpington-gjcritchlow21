

let url = window.location.search
let urlArray = url.split('?')
let id = urlArray.pop()

let htmlName = document.getElementById('name')
let htmlNotes = document.getElementById('notes')
let htmlPhone = document.getElementById('phone')
let htmlAddress = document.getElementById('address')
let htmlHours = document.getElementById('hours')

async function restDetails() {
    let restSpecs = await fetch(`/api/${id}.json`)
        .then(res => res.json())
        .then((jsonObj) => {
            return jsonObj
        })

    htmlName.textContent = restSpecs.name
    htmlNotes.innerHTML = restSpecs.notes.join('<br/><br/>')
    htmlPhone.textContent = restSpecs.phone
    htmlAddress.textContent = restSpecs.address
    htmlHours.textContent = restSpecs.hours

    fetch(`https://nominatim.openstreetmap.org/search/?q=${restaurantDetails.address}&format=json`).then((data) => {
        return data.json()
    }).then((localeDetails) => {
        let info = localeDetails[0]
        let lat = info.lat
        let lon = info.lon
        myMap.setView([lat, lon], 18)
        L.marker([lat, lon]).addTo(myMap)
    })
}
restDetails()

let myMap = L.map('mapid').setView([44.4759, -73.2121], 15);
LL.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)