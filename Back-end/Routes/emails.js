const router = require('express').Router();
const validator = require("email-validator");
router.route("/checkEmail/:email").get((req, res) => {
    console.log(req.params.email)
    const email = req.params.email;
    const check = validator.validate(email)
    if (check == true) {
        res.json("yes")
    }
    if (check == false) {
        res.json("no")
    }
});

module.exports = router;
