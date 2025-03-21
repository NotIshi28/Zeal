const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };

const userSchema = new Schema({
    fname: reqString,
    lname: reqString,
    email: reqString,
    password: reqString,
    notifications: {
        type: Array,
        required: true,
        default: []
    }
})

module.exports = mongoose.model("User", userSchema)