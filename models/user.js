const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        // minlength: [4, "Username must be at least 3 characters long"],
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL",
    },
},
    { timestamps: true }
);
const User = mongoose.model('user', userSchema);

module.exports = User;