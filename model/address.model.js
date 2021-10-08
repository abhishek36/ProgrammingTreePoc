const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const Address = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    temporaryAddress: {
        address: String,
        state: String,
        city: String,
        area: String,
        street: String,
        pincode: Number,
    },
    permanentAddress: {
        address: String,
        state: String,
        city: String,
        area: String,
        street: String,
        pincode: Number,
    },
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});



module.exports = mongoose.model("Address", Address);