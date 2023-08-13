
const express = require("express")
const fs = require('fs')

const app = express()

//get tours from json
//--------------
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))//read data from api

app.get('/api/v1/tours', (req,res) => {
    res.status(200)
    .json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
})


// get app




const port = 3000

app.get('/', (req,res) => {
    res.status(200).send("heloo")
})


app.listen(port, () => {
    console.log(`runing on port ${port}...`)
})