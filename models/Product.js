const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, required: true },
  price: Number,
  img: String
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
