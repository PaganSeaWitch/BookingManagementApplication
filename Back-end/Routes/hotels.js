const router = require('express').Router();
let Hotel = require("../Models/hotel.model");
let Room = require("../Models/room.model");

//Returns all hotels
router.route("/allHotels").get((req, res) => {
    Hotel.find()
    .then(hotel => res.json(hotel))
    .catch(err => res.status(400).json("Error: " + err))
})

//Returns all rooms
router.route("/allRooms").get((req, res) => {
    Room.find()
    .then(room => res.json(room))
    .catch(err => res.status(400).json("Error: " + err))
})


//Adds a hotel
router.route("/addHotel").post((req, res) => {
    const hotelID = req.body.hotelID;
    const streetAddress1 = req.body.streetAddress1;
    const streetAddress2 = req.body.streetAddress2;
    const city = req.body.city;
    const stateOrProvince = req.body.stateOrProvince;
    const country = req.body.country;
    const postalCode = req.body.postalCode;
    const numberofRooms = req.body.numberofRooms;

    const newHotel = new Hotel({ hotelID, streetAddress1 , streetAddress2, 
        city, stateOrProvince, country, postalCode, numberofRooms });

    newHotel.save()
    .then(() => res.json(newHotel))
    .catch(err => res.status(400).json("Error: " + err));

})


//Adds a room
router.route("/addRoom").post((req, res) => {
    const roomNumber = req.body.roomNumber;
    const price = req.body.price;
    const beds = req.body.beds;
    const booked = req.body.booked;

    const newRoom = new Room({roomNumber, price, beds, booked});

    newRoom.save()
    .then(() => res.json(newRoom))
    .catch(err => res.status(400).json("Error: " + err));


})


//Update hotel info
router.route("/updateHotel").post((req, res) => {
    Hotel.findOneAndUpdate({ hotelID: req.params.oldhotelID  })
        .then((hotel) => {
            hotel.hotelID = req.body.hotelID;
            hotel.streetAddress1 = req.body.streetAddress1;
            hotel.streetAddress2 = req.body.streetAddress2;
            hotel.city = req.body.city;
            hotel.stateOrProvince = req.body.stateOrProvince;
            hotel.country = req.body.country;
            hotel.postalCode = req.body.postalCode;
            hotel.numberofRooms = req.numberofRooms;
            hotel.save()
                .then(() => res.json(hotel))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
})  

//Update hotel rooms
//Come back
router.route("/updateRoom").post((req, res) => {
    Hotel.findOneAndUpdate({ booked: req.params.booked  })
        .then((room) => {
            room.roomNumber = req.body.roomNumber;
            room.price = req.body.price;
            room.beds = req.body.beds;
            room.booked = req.body.booked;

            room.save()
                .then(() => res.json(room))
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

//Delete room by room number
router.route("deleteByRoomNumber/:roomNumber").delete((req, res) => {
    Room.findOneAndDelete({ roomNumber: req.params.roomNumber })
        .then(() => res.json("Room deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
