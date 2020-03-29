const express = require('express');
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000


app.use(express.static('public'))

app.get('/restaurant',(req, res) => {
    res.sendFile(path.resolve('./public/restaurant.html'))
})


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))