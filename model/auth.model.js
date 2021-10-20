const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const Authentication = new Schema({
    name: String,
    mobile: String,
    password: String,
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ["User", "Admin"]
    },
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});



module.exports = mongoose.model("Authentication", Authentication);