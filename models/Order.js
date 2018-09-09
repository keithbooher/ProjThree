const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  img: String,
  userEmail: String,
  userName: String,
  artistEmail: String,
  city: String,
  country: String,
  address: String,
  state: String,
  zip: String,
  last4: String,
  dateOrdered: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
