const fs = require("fs")
const express = require("express")

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)) 


const app = express()

const port = 3000



app.listen(port, () => {
    console.log(`runing on port ${3000}...`)
})