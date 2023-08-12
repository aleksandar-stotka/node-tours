const express = require("express")

const app = express()

const port = 3000

app.get("/", (req,res) => {
    res
    .status(200)
    .json({message:"heloo from the server side",
    app: "Natures"})


})

app.post('/', (req,res) => {
    res.send("you can post this endpopint")

})

app.listen(port, () => {
    console.log(`runing on port ${3000}...`)
})