const mongoose = require("mongoose");
const { schema } = require("../../nodes_crud/models/user");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: string,
        require: true,
        unique: true,
    },
    redirectURL: {
        type: string,
        require: true,
    },
    // Array
    visitHistory: [{ timestamp: { type: Number } }],
},
    { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;