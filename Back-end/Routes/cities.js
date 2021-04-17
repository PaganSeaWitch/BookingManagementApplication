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
	
	const cityName = req.body.name;
    const numLocs = req.body.numLocations;
	//const numRoo= req.body.numRooms;
	const total = req.body.totalPrice;
	var avg;
	if(req.body.totalPrice > 0 && req.body.numLocs > 0){
		 avg = req.body.totalPrice / req.body.numLocs;
	}
	else{
		 avg = 0;
	}
	
    const newCity = new City({ name: cityName, numLocations: numLocs, avgPrice: avg, totalPrice: total});
    newCity.save()
        .then(() => res.json(newCity))
        .catch(err => res.status(400).json("Error at Add City Backend: " + err));

	}
)

//Update city info
router.route("/updateCity").post((req, res) => {
	
    City.findOneAndUpdate({ cityName: req.body.name })
        .then((city) => {
          console.log("City Being Updated: " + req.body.name);
		  console.log("Information being updated: Total Price += " + req.body.totalPrice);
			city.numLocations = city.numLocations + req.body.numLocations;
			city.totalPrice = city.totalPrice + req.body.totalPrice;
			if(city.totalPrice > 0 && city.numLocations > 0){
				city.avgPrice = city.totalPrice / city.numLocations;
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
