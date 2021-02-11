const router = require('express').Router();
let Generic = require("../Models/generic.model");

router.route("/").get((req, res) => {
    Generic.find()
        .then(generics => res.json(generics))
        .catch(err => res.status(400).json("Error: " + err))
});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newGeneric = new Generic({ username, password });

    newGeneric.save()
        .then(() => res.json("Generic added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
