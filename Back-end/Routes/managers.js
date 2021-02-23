const router = require('express').Router();
let Manager = require("../Models/manager.model");

router.route("/all").get((req, res) => {
    Manager.find()
        .then(managers => res.json(managers))
        .catch(err => res.status(400).json("Error: " + err))
});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
	const email = req.body.email;
	const hotels = req.body.hotels;

    const newManager = new Manager({ username, password, email, hotels});

    newManager.save()
        .then(() => res.json(newManager))
        .catch(err => res.status(400).json("Error: " + err));
});

//get by username
router.route("getByUsername/:username").get((req, res) => {

    Manager.findOne({ username: req.params.username })
        .then(manager =>
        {
            manager.comparePassword();
            res.json(manager);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

//delete by username
router.route("deleteByUsername/:username").delete((req, res) => {
    Manager.findOneAndDelete({ username: req.params.username })
        .then(() => res.json("Manager deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("deleteById/:id").delete((req, res) => {
    Manager.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json("Manager deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:username").post((req, res) => {
    Manager.findOneAndUpdate({ username: req.params.username })
        .then((manager) => {
            manager.username = req.body.username;
            manager.password = req.body.password;
			manager.email = req.body.email;
			manager.hotels = req.body.hotels;
			
            manager.save()
                .then(() => res.json("Manager updated."))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
})  

module.exports = router;
