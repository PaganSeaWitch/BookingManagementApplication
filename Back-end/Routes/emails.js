const router = require('express').Router();
const emailCheck = require('email-check');

router.route("/checkEmail/:email").get((req, res) => {
    console.log(req.params.email)
    emailCheck({ email: req.params.email })
        .then(function (isReal) {
            if (isReal == true) {
                res.json("yes");
            }
            if (isReal == false) {
                res.json("no")
            }
        })
        .catch(function (err) {
            err => res.status(400).json("Error: " + err)
        });
});

module.exports = router;
