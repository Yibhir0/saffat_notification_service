const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the property model. */
const tokenSchema = new Schema({

	token: { type: String, required: true, unique: true },

});

module.exports = mongoose.model("Token", tokenSchema);
