const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the property model. */
const tokenSchema = new Schema({

    token: { //This would be the brokers unique identifier.Only brokers would have this ID
        type: String,
        required: false,
    },

});

module.exports = mongoose.model("Token", tokenSchema);