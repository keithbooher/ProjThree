const mongoose = require("mongoose");
const Schema = mongoose.Schema; // same as ----> const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        unique: true
    },
    firstName: String,
    admin: {
        type: Boolean,
        default: false
    },
    stripeAccount: {
        type: String,
        default: " "
    },
    email: {
        type: String,
        default: " "
    },
    rating: [String],
    averageRating: { 
        type: Number,
        default: 5
    },
    img: {
        type: String,
        default: " "
    },
    pageViews: {
        type: Number,
        default: 0
    },
    aboutMe: {
        type: String,
        default: " "
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: "product"
      }],
    style: [{
      type: Schema.Types.ObjectId,
      ref: "style"
    }],
  

  googleId: {
    type: String,
    unique: true
  },
  firstName: String,
  admin: {
    type: Boolean,
    default: false
  },
  stripeAccount: {
    type: String,
    default: " "
  },
  email: {
    type: String,
    default: " "
  },
  rating: [String],
  averageRating: {
    type: Number,
    default: 5
  },
  img: {
    type: String,
    default: "https://artgutter.s3.amazonaws.com/1536724317740"
  },
  pageViews: {
    type: Number,
    default: 0
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "product"
    }
  ],
  style: [{
    type: Schema.Types.ObjectId,
    ref: "style"
  }],
});

//creating model class

const User = mongoose.model("users", userSchema);

module.exports = User;
