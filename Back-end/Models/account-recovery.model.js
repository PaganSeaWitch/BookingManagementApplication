const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountRecoverySchema = new Schema
    ({
        email:
        {
            type: String,
            required:true
        },
        account_id:
        {
            type: String,
            required:true
        },
        acountType:
        {
            type: String,
            required:true
        }
    })

const AccountRecovery = mongoose.model("AccountRecovery", accountRecoverySchema);


module.exports = { AccountRecovery }
