const router = require('express').Router();
const validator = require("email-validator");
let AccountRecovery = require("../Models/account-recovery.model");
const nodemailer = require("nodemailer");
require('dotenv').config();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.KEY, // generated ethereal password
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
            const string = "Please Click on the following link to recover email : " + "http://localhost:3000/recoveryPage" + accountRecovery._id
            transporter.sendMail({
                from: '"Rendeview" <accountRecovery@rendeview.com>', // sender address
                to: accountRecovery.email, // list of receivers
                subject: "Account Recovery", // Subject line
                text: string, // plain text body
                html: `<p>${string}</p>`, // html body
            })
                .then(() => res.json("message sent"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
})

module.exports = router;
