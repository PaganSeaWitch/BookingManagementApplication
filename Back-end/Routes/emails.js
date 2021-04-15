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
        user: process.env.EMAILUSER, // generated ethereal user
        pass: process.env.KEY, // generated ethereal password
    },
});

router.route("/checkEmail/:email").get((req, res) => {
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
    const email = req.body.email;
    const account_id = req.body.account_id;
    const accountType = req.body.accountType;
    const newAccountRecovery = new AccountRecovery({ email: email, account_id: account_id, accountType: accountType });
    newAccountRecovery.save()
        .then(() => res.json(newAccountRecovery))
        .catch(err => res.status(400).json("Error: " + err));

});

router.route("/AccountRecovery/getById/:id").get((req, res) => {
    console.log(req.params.id)
    AccountRecovery.findById(req.params.id)
        .then((account) => res.json(account))
        .catch(err => res.status(400).json("Error: " + err));

});

router.route("/AccountRecovery/DeleteAllByEmail/:email").delete((req, res) => {
    AccountRecovery.deleteMany({ email: req.params.email })
        .then(() => res.json("accountRecoveryRequests deleted."))
        .catch(err => res.status(400).json("Error: " + err));

});

router.route("/AccountRecovery/SendEmailRecoveryRequest/:id").post((req, res) => {
    console.log(process.env.USER)
    console.log(process.env.KEY)
    AccountRecovery.findById(req.params.id)
        .then((accountRecovery) => {
            const string = "Please Click on the following link to recover email : " + "https://www.rendezview.site/resetPassword/" + accountRecovery._id
            transporter.sendMail({
                from: "AcountRecovery@rendeview.com", // sender address
                to: accountRecovery.email, // list of receivers
                subject: "Account Recovery", // Subject line
                text: string, // plain text body
                html: `<p>${string}</p>`, // html body
            })
                .then(() => res.json("message sent"))
                .catch(err => { res.status(400).json("Error: " + process.env.EMAILUSER+ " " + process.env.KEY); console.log(err)});
        })
        .catch(err => res.status(400).json("Err: "+ process.env.USER + " " + process.env.KEY));
})

module.exports = router;
