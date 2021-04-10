const router = require('express').Router();
let cityImport = require("../Models/city.model");
let City = cityImport.model




//Returns all cities
router.route("/allCities").get((req, res) => {
    City.find()
    .then(city => res.json(city))
    .catch(err => res.status(400).json("Error getting all cities in Cities router"))
})

//Gets city by name
router.route("/getCity").get((req, res) => {
	City.findOne({cityName: req.body.name})
	 .then(city => res.json(city))
    .catch(err => res.status(400).json("Error getting specific city in Cities router"))
})




//Adds a city
router.route("/addCity").post((req, res) => {
	console.log("Add City req body: " + req.body);
    console.log("Req.body.name : " + req.body.name);
	 console.log("Req.body.numLocations : " + req.body.numLocations);
	  console.log("Req.body.avg : " + req.body.totalPrice / req.body.numRooms);
	   console.log("Req.body.numRooms : " + req.body.numRooms);
	    console.log("Req.body.total : " + req.body.totalPrice);
	const cityName = req.body.name;
    const numLocs = req.body.numLocations;
	const numRoo= req.body.numRooms;
	const total = req.body.totalPrice;
	var avg;
	if(req.body.totalPrice != 0 && req.body.numRooms != 0){
		 avg = req.body.totalPrice / req.body.numRooms;
	}
	else{
		 avg = 0;
	}
	
    const newCity = new City({ name: cityName, numLocations: numLocs, avgPrice: avg, numRooms: numRoo, totalPrice: total});
    newCity.save()
        .then(() => res.json(newCity))
        .catch(err => res.status(400).json("Error at Add City Backend: " + err));

	}
)

//Update city info
router.route("/updateCity").post((req, res) => {
	console.log("Update City req body: " + req.body);
	  console.log("Req.body.name : " + req.body.name);
	 console.log("Req.body.numLocations : " + req.body.numLocations);
	  console.log("Req.body.avg : " + req.body.totalPrice / req.body.numRooms);
	   console.log("Req.body.numRooms : " + req.body.numRooms);
	    console.log("Req.body.total : " + req.body.totalPrice);
    City.findOneAndUpdate({ cityName: req.body.name })
        .then((city) => {
          
			city.numLocations = city.numLocations + req.body.numLocations;
			city.numRooms = city.numRooms + req.body.numRooms;
			city.totalPrice = city.totalPrice + req.body.totalPrice;
			if(city.totalPrice != 0 && city.numRooms != 0){
				city.avgPrice = totalPrice / numRooms;
			}
			
            
            city.save()
                .then(() => res.json(city))
                .catch(err => res.status(400).json("Error at Update City Backend: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
})  


//Delete hotel by hotelID
router.route("/deleteByCityID/:cityID").delete((req, res) => {
    City.findOneAndDelete({ _id: req.params.cityID })
        .then(() => res.json("City deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
