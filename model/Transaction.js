const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema= new Schema({
  amount: String,
  category:String,
  vendor:String
})

const Transaction = mongoose.model("transaction", transactionSchema)

module.exports = Transaction


