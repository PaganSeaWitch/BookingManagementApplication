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
        .then(() => res.json(newGeneric))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Generic.findById(req.params.id)
        .then(generic => res.json(generic))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Generic.findByIdAndDelete(req.params.id)
        .then(() => res.json("Generic deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Generic.findByIdAndUpdate(req.params.id)
        .then((generic) => {
            generic.username = req.body.username;
            generic.password = req.body.password;

            generic.save()
                .then(() => res.json("Generic updated."))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
})  

module.exports = router;
