const router = require('express').Router();
let Manager = require("../Models/manager.model");

router.route("/all").get((req, res) => {
    Manager.find()
        .then(managers => res.json(managers))
        .catch(err => res.status(400).json("Error: " + err))
});

router.route("/add").post((req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const hotel_ID = req.body.hotel_ID;
    const newManager = new Manager({ username, password, email, hotel_ID });
    console.log(newManager);

    newManager.save()
        .then(() => res.json(newManager))
        .catch(err => res.status(400).json("Error: " + err));
});

//get by username
router.route("/getByUsername/").get((req, res) => {
    console.log(req.params);
    Manager.findOne({ username: req.query.username })
        .then(manager => {
            manager.comparePassword(req.query.password)
                .then((isMatch) => {
                    if (isMatch == true) {
                        res.json(manager);

                    }
                    else res.status(400).json("Error: password did not match")
                })
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));

});

router.route("/getByEmail/:email").get((req, res) => {
    Manager.findOne({ email: req.params.email })
        .then(manager => {
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
router.route("/checkIfUsernameExists/:username").get((req, res) => {
    Manager.findOne({ username: req.params.username })
        .then((manager) => {
            if (manager != null) {
                res.json("yes")
            }
            else {
                res.json("no")
            }
        })
        .catch(err => res.status(400).json("Error: " + err))
})  

router.route("/update/").post((req, res) => {
    Manager.findOneAndUpdate({ username: req.params.oldUsername  })
        .then((manager) => {
            manager.username = req.body.username;
            manager.password = req.body.password;
            manager.email = req.body.email;
            manager.hotel_ID = req.body.hotel_ID;
            manager.save()
                .then(() => res.json(manager))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
})  

module.exports = router;
