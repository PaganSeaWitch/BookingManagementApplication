const router = require('express').Router();
let Manager = require("../Models/manager.model");

router.route("/").get((req, res) => {
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
router.route("/:username").get((req, res) => {
    Manager.find(req.params.username)
        .then(manager => res.json(manager))
        .catch(err => res.status(400).json("Error: " + err));
});
//delete by username
router.route("/:username").delete((req, res) => {
    Manager.find(req.params.username).delete()
        .then(() => res.json("Manager deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:username").post((req, res) => {
    Manager.find(req.params.username).update()
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
