const mongoose = require("mongoose");
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
    default: [],
  },
  balance: {
    type: Number,
    required: true,
    default: 0.0,
  },
});

module.exports = mongoose.model("User", userSchema);
