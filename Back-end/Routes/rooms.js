const router = require('express').Router();
let Room = require("../Models/room.model");

//Returns all rooms
router.route("/allRooms").get((req, res) => {
    Room.find()
        .then(room => res.json(room))
        .catch(err => res.status(400).json("Error: " + err))
})

router.route("/getRoomByID/:id").get((req, res) => {
    Room.findById(req.params.id)
        .then(room => { console.log(room); res.json(room) })
        .catch(err => res.status(400).json("Error: " + err))
})

//Adds a room
router.route("/addRoom").post((req, res) => {
    const roomNumber = req.body.roomNumber;
    const price = req.body.price;
    const beds = req.body.beds;
    const tags = req.body.tags;
    const booked_dates = req.body.bookedDates;
    const newRoom = new Room({ roomNumber, price, beds, tags, booked_dates });

    newRoom.save()
        .then(() => res.json(newRoom))
        .catch(err => res.status(400).json("Error: " + err));

})

//Update hotel rooms
router.route("/updateRoom").post((req, res) => {
    Hotel.findByIdAndUpdate(req.body.id)
        .then((room) => {
            room.roomNumber = req.body.roomNumber;
            room.price = req.body.price;
            room.beds = req.body.beds;
            room.dates = req.body.dates;
            room.tags = req.body.tags;
            room.save()
                .then(() => res.json(room))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
})  
//Delete room by roomID
router.route("/deleteByRoomID/:roomID").delete((req, res) => {
    Room.findOneAndDelete({ _id: req.params.roomID })
        .then(() => res.json("Room deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;