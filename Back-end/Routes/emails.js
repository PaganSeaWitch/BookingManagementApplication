const router = require('express').Router();
const validator = require("email-validator");
let AccountRecovery = require("../Models/account-recovery.model");
const nodemailer = require("nodemailer");
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
    },
});

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

router.route("/AccountRecovery/Add").post((req, res) => {
    const email = req.params.email;
    const account_id = req.params.account_id;
    const accountType = req.params.accountType;
    const newAccountRecovery = new AccountRecovery({ email, account_id, accountType });
    console.log(newAccountRecovery);
    newAccountRecovery.save()
        .then(() => res.json(newAccountRecovery))
        .catch(err => res.status(400).json("Error: " + err));

});

router.route("/AccountRecovery/DeleteAllByEmail/:email").delete((req, res) => {
    AccountRecovery.deleteMany({ email: req.params.email })
        .then(() => res.json("accountRecoveryRequests deleted."))
        .catch(err => res.status(400).json("Error: " + err));

});

router.route("/AccountRecovery/SendEmailRecoveryRequest/:_id").post((req, res) =>{
    AccountRecovery.findById(req.params._id)
        .Then((accountRecovery) => {

        })
        .catch(err => res.status(400).json("Error: " + err));
})

module.exports = router;
