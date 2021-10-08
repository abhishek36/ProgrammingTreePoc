const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const Document = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    avatar: String,
    sign: String,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});



module.exports = mongoose.model("Document", Document);