const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };

const transactionSchema = new Schema({
  sender: reqString,
  receiver: reqString,
  receiverName: reqString,
  category: reqString,
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
