const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const hotel  = require("../Models/hotel.model")
const Date = require("../Models/date.model")
const bookingSchema =
    new Schema({
        room_ID:
        {
		    type: [String],
			required: true
		},
        hotel:
        {
            type: hotel.schema,
            required: true
		},
        date_booked:
        {
            type: [Date],
            required: true
		},
	});

const userSchema = new Schema
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
        firstName:
        {
            type: String,
            required: true,
            unique: false,
            trim: true
        },
        lastName:
        {
            type: String,
            required: true,
            unique: false,
            trim: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 5
        },
        bookings:
        {
            type: [bookingSchema],
            required: false,
            unique: false
        },
    },
        {
            timestamps: true,
        });

userSchema
    .virtual('password')
    // set methods
    .set(function (password) {
        this.hashedPassword = password;
    });

//Before the user is saved, hash the password using bcrypt
userSchema.pre("save", function (next) {
    // store reference
    const user = this;
    if (user.hashedPassword === undefined) {
        return next();
    }
	//bcrypt method to generate a hash function
    bcrypt.genSalt(10, function (err, salt) {
        if (err) console.log(err);
        // hash the password using our new hash function (called salt)
        bcrypt.hash(user.hashedPassword, salt, function (err, hash) {
            if (err) console.log(err);
            user.password = hash;
            next();
        });
    });
});
     
//compare passwords
userSchema.methods = {
    comparePassword: function (candidatePassword) {
        return bcrypt.compare(candidatePassword, this.hashedPassword);
        
    }
}


const User = mongoose.model("User", userSchema);

module.exports = User;
