const mongoose = require("mongoose");
// const { schema } = require("");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    // Array
    visitHistory: [{ timestamp: { type: Number, required: true }, },],
},
    { timestamps: true }
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;



