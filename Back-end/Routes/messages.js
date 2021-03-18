// JavaScript source code
const router = require('express').Router();
let Message = require("../Models/message.model");

//Returns all messages
router.route("/all").get((req, res) => {
    Message.find()
        .then(message => res.json(message))
        .catch(err => res.status(400).json("Error: " + err))
})

//Returns all nonviewed messages
router.route("/allNonViewed").get((req, res) => {
    Message.find({ viewed: false, recipient_id : req.body.recipient_id})
        .then(message => res.json(message))
        .catch(err => res.status(400).json("Error: " + err))
})

router.route("/getByID/:id").get((req, res) => {
    Message.findById(req.params.id)
        .then(message => { res.json(message) })
        .catch(err => res.status(400).json("Error: " + err))
})


//Adds a message
router.route("/add").post((req, res) => {
    const subject = req.body.subject;
    const body = req.body.body;
    const recipient = req.body.recipient;
    const sender = req.body.sender;
    const recipient_id = req.body.recipient_id;
    const sender_id = req.body.sender_id;
    const viewed = false;
    const newMessage = new Message({ subject, body, recipient, sender, recipient_id, sender_id, viewed });

    newMessage.save()
        .then(() => res.json(newMessage))
        .catch(err => res.status(400).json("Error: " + err));

})

//Update message to viewed
router.route("/updateViewed/:message_id").post((req, res) => {
    Message.findByIdAndUpdate(req.params.message_id)
        .then((message) => {
            message.viewed = true;
            message.save()
                .then((message) => res.json(message))
                .catch(err => { res.status(400).json("Error: " + err); });
        })
        .catch(err => res.status(400).json("Error: " + err))
})


//Delete message by ID
router.route("/deleteByID/:message_id").delete((req, res) => {
    Message.findOneAndDelete({ _id: req.params.message_id })
        .then(() => res.json("message deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;