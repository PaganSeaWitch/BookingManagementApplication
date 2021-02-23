const router = require('express').Router();
let User = require("../Models/user.model");

router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err))
});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const bookings = req.body.bookings;
	
    const newUser = new User({ username, password, firstName, lastName, email, bookings});

    newUser.save()
        .then(() => res.json(newUser))
        .catch(err => res.status(400).json("Error: " + err));
});

/*router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
}); */

//Looks up user by username
router.route("/:username").get((req, res) => {
	User.find(req.params.username)
		.then(user => res.json(user))
		.catch(err => res.status(400).json("Error:: " + err));
});

//Deletes user by username
router.route("/:username").delete((req, res) => {
    User.find(req.params.username).delete()
        .then(() => res.json("User deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

//Updates user by username
router.route("/update/:username").post((req, res) => {
    User.find(req.params.username).update()
        .then((user) => {
            user.username = req.body.username;
            user.password = req.body.password;
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.email = req.body.email;
			user.bookings = req.body.bookings;
            user.save()
                .then(() => res.json("User updated."))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
})  

module.exports = router;
