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
    console.log("trying to add hotel")
	const cityName = req.body.name;
    const numLocs = req.body.numLocations;
	const avg = req.body.totalPrice / req.body.numRooms;
	const numRoo= req.body.numRooms;
	const total = req.body.totalPrice;
    const newCity = new City({ name: cityName, numLocations: numLocs, avgPrice: avg, numRooms: numRoo, totalPrice: total});
    newCity.save()
        .then(() => res.json(newCity))
        .catch(err => res.status(400).json("Error at Add City Backend: " + err));

	}
)

//Update city info
router.route("/updateCity").post((req, res) => {
    City.findOneAndUpdate({ cityName: req.body.name })
        .then((city) => {
            city.name = req.body.name;
			city.numLocations = city.numLocations + req.body.numLocations;
			city.numRooms = city.numRooms + req.body.numRooms;
			city.totalPrice = city.totalPrice + req.body.totalPrice;
			city.avgPrice = totalPrice / numRooms;
	
            
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
