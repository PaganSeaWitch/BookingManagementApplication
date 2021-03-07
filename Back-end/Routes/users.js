const router = require('express').Router();
let User = require("../Models/user.model");

router.route("/all").get((req, res) =>
{
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
router.route("/getByUsername/").get((req, res) => {
    console.log(req.params);
    User.findOne({ username: req.query.username })
        .then(user =>
        {
            user.comparePassword(req.query.password)
                .then((isMatch) => {
                    if (isMatch == true) {
                        res.json(user);

                    }
                    else res.status(400).json("Error: password did not match")
                })
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));

});

router.route("/getByEmail/:email").get((req, res) => {
    User.findOne({ email: req.params.email })
        .then(user => {
            res.json(user);
        })
        .catch(err => res.status(400).json("Error: " + err));

});


//Deletes user by username
router.route("/deleteByUsername/:username").delete((req, res) => {
    User.findOneAndDelete({ username: req.params.username })
        .then(() => res.json("User deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

//detele user by ID
router.route("/deleteById/:id").delete((req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json("User deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/updateBookings/").post((req, res) => {
    User.findOneAndUpdate({ username: req.body.username })
        .then((user) => {
            user.bookings = req.body.bookings;
            user.save()
                .then(() => res.json("bookings updated"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
})

//Updates user by username
router.route("/update/").post((req, res) => {
    User.findOneAndUpdate({ username: req.body.oldUsername })
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

router.route("/checkIfUsernameExists/:username").get((req, res) => {
    User.findOne({ username: req.params.username })
        .then((user) => {
            if (user != null) {
                res.json("yes")

            }
            else {
                res.json("no")
            }
        })
        .catch(err => res.status(400).json("Error: " + err))
})  

module.exports = router;
