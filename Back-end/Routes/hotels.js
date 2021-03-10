const router = require('express').Router();
let hotelImport = require("../Models/hotel.model");
let Hotel = hotelImport.model
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

//Returns hotel by ID
router.route("/getHotelByID/:id").get((req, res) => {
    
    Hotel.findById(req.params.id)
        .then(hotel => { console.log(hotel); res.json(hotel) })
        .catch(err => res.status(400).json("Error: " + err))
})

router.route("/getRoomByID/:id").get((req, res) => {
	Room.findById(req.params.id)
		.then(room => { console.log(room); res.json(room) })
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
