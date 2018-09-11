const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  img: String,
  email: String,
  artistName: String,
  description: String,
  quantity: Number,
  stripeAccount: String,
  associatedID: String,
  sold: {
    type: Boolean,
    default: false
  },
  platformFee: Number,
  datePosted: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
