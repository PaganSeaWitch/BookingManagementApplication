const router = require('express').Router();
let hotelImport = require("../Models/hotel.model");
let Hotel = hotelImport.model


//Returns all hotels
router.route("/allHotels").get((req, res) => {
    Hotel.find()
    .then(hotel => res.json(hotel))
    .catch(err => res.status(400).json("Error: " + err))
})


//Returns hotel by ID
router.route("/getHotelByID/:id").get((req, res) => {
    
    Hotel.findById(req.params.id)
        .then(hotel => { console.log(hotel); res.json(hotel) })
        .catch(err => res.status(400).json("Error: " + err))
})


//Adds a hotel
router.route("/addHotel").post((req, res) => {
    console.log("trying to add hotel")
    const hotelName = req.body.name;
    const streetAddress1 = req.body.location.streetAddress1;
    const streetAddress2 = req.body.location.streetAddress2;
    const city = req.body.location.city;
    const stateOrProvince = req.body.location.stateOrProvince;
    const country = req.body.location.country;
    const postalCode = req.body.location.postalCode;
    const rooms = req.body.rooms;
    
    const newHotel = new Hotel({ name: hotelName, location: { streetAddress1, streetAddress2, city, stateOrProvince, country, postalCode } , rooms: rooms });
    newHotel.save()
        .then(() => res.json(newHotel))
        .catch(err => res.status(400).json("Error: " + err));

})


//Update hotel info
router.route("/updateRoomForHotel").post((req, res) => {
    Hotel.findByIdAndUpdate(req.body.id)
        .then((hotel) => {
            hotel.rooms = hotel.rooms.push(req.body.roomId);
            hotel.save()
                .then(() => res.json(hotel))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
})  

//Update hotel info
router.route("/updateHotel").post((req, res) => {
    Hotel.findOneAndUpdate({ hotelID: req.body.id  })
        .then((hotel) => {
            hotel.name = req.body.name;
            hotel.location.streetAddress1 = req.body.location.streetAddress1;
            hotel.location.streetAddress2 = req.body.location.streetAddress2;
            hotel.location.city = req.body.location.city;
            hotel.location.stateOrProvince = req.body.location.stateOrProvince;
            hotel.location.country = req.body.location.country;
            hotel.location.postalCode = req.body.location.postalCode;
            hotel.rooms = req.body.rooms;
            hotel.save()
                .then(() => res.json(hotel))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
})  


//Delete hotel by hotelID
router.route("deleteByHotelID/:hotelID").delete((req, res) => {
    Hotel.findOneAndDelete({ hotelID: req.params.hotelID })
        .then(() => res.json("Hotel deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
