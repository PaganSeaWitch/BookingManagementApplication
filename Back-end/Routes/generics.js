const router = require('express').Router();
let Generic = require("../Models/generic.model");

//this is a generic router
//its basic function is to do something
//based off the current URL
//so whenever the URL is ../generic/
//it will try to handle that request

router.route("/").get((req, res) => {
    //gets all generics in database
    Generic.find()
        .then(generics => res.json(generics))
        .catch(err => res.status(400).json("Error: " + err))
});

//a route to add new generics to the database
router.route("/add").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newGeneric = new Generic({ username, password });

    //creates a new generic then sends it to front end server
    newGeneric.save()
        .then(() => res.json(newGeneric))
        .catch(err => res.status(400).json("Error: " + err));
});

//a route to get a specific generic based on ID
router.route("/:id").get((req, res) => {
    //finds the generic and sends to front end server
    Generic.findById(req.params.id)
        .then(generic => res.json(generic))
        .catch(err => res.status(400).json("Error: " + err));
});

//a route to delete a specific generic based on ID
router.route("/:id").delete((req, res) => {

    //deletes the generic from the database, then sends confirmation back to front end server
    Generic.findByIdAndDelete(req.params.id)
        .then(() => res.json("Generic deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

//a route to update a specific generic based on ID
router.route("/update/:id").post((req, res) => {
    Generic.findByIdAndUpdate(req.params.id)
        .then((generic) => {
            generic.username = req.body.username;
            generic.password = req.body.password;

            //saves the generic in the database, then sends it back to the front end server
            generic.save()
                .then(() => res.json(generic))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
})  

module.exports = router;
