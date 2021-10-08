const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const User = new Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    mobile: String,
    dob: String,
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"]
    },
    email: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});



module.exports = mongoose.model("User", User);