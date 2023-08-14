const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

//get tours from json
//--------------
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
); //read data from api

const getAllTours =  (req, res) => {
    res.status(200).json({
      status: "success",
      data: {
        tours,
      },
    });
  }

  const getTour =  (req, res) => {
    console.log(res.params);

  
    const id = req.params.id * 1;
    if (id > tours.length) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid id",
      });
    }
  
    const tour = tours.find((el) => el.id === id);
  
    res.status(200).json({
      status: "success",
      data: {
        tours: tour,
      },
    });
  }
////////////////////////////////////////////////
  const createTour =  (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
  
    const newTour = Object.assign({ id: newId }, req.body);
  
    tours.push(newTour);
  
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(201).json({
          status: "success",
          data: {
            tour: newTour,
          },
        });
      }
    );
  }
  ////////////////////////////////////////////
  const deleteTour =  (req, res) => {
    if(req.params.id *1 > tours.length) {
        
        return res.status(404).json({
            status: "fail",
            message: "invalid id"
        })
    }
    res.status(204).json({
        status: "success",
        data: null
    })
  }
 ///////////////////////////////////////////////
  const updateTour = (req,res) => {
    if(res.params.id *1 > tours.length) {
        
        return res.status(404).json({
            status: "fail",
            message: "invalid id"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour: 'Update tou here'
        }
    })
  }
  ////////////////////////////////////////////


  //--route




app.route("/api/v1/tours")
.get(getAllTours)
.post(createTour)

app.route("/api/v1/tours/:id")
.get(getTour)
.delete(deleteTour)
.patch(updateTour)


////////////// Post
//////////////////////////////
//patch




const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("heloo");
});

app.listen(port, () => {
  console.log(`runing on port ${port}...`);
});
