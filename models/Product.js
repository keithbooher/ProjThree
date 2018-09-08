const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  img: String,
  email: String,
  stripeAccount: String,
  associatedID: String,
  platformFee: Number,
  datePosted: Date 
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
