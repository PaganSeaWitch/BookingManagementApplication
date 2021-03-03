const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const managerSchema = new Schema
({
    username:
    {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    hashedPassword:
    {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
	email:
	{
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 5
	},
	hotel_ID:
    {
        type: String,
        required: true
	},
},
{
    timestamps: true,
    });
managerSchema
    .virtual('password')
    // set methods
    .set(function (password) {
        this.hashedPassword = password;
    });

//Before the user is saved, hash the password using bcrypt
managerSchema.pre("save", function (next) {
    // store reference
    const manager = this;
    if (manager.hashedPassword === undefined) {
        return next();
    }
    //bcrypt method to generate a hash function
    bcrypt.genSalt(10, function (err, salt) {
        if (err) console.log(err);
        // hash the password using our new hash function (called salt)
        bcrypt.hash(manager.hashedPassword, salt, function (err, hash) {
            if (err) console.log(err);
            manager.password = hash;
            next();
        });
    });
});

//compare passwords
managerSchema.methods = {
    comparePassword: function (candidatePassword) {
        return bcrypt.compare(candidatePassword, this.hashedPassword);

    }
}
const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
