const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

//get tours from json
//--------------
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
); //read data from api

app.get('/api/v1/tours', (req,res) => {
    res.status(200)
    .json({
        status: "success",
        data: {
            tours
        }
    })
})
app.get('/api/v1/tours/:id', (req,res) => {
      console.log(res.params)

      const id = req.params.id * 1
      const tour = tours.find(el => el.id === id)

     res.status(200).json({
        status: "success",
        data: {
            tours: tour
        }
     })
})

app.post('/api/v1/tours', (req,res) => {
  const newId = tours[tours.length -1].id + 1

  const newTour = Object.assign({id:newId}, req.body)
 
  tours.push(newTour)

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {

    res.status(201)
    .json({
        status: 'success',
        data: {
            tour:newTour
        }
    })
 
     
    

  })


} )


const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("heloo");
});

app.listen(port, () => {
  console.log(`runing on port ${port}...`);
});
