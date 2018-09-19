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
    default: "https://artgutter.s3.amazonaws.com/1537045224351"
  },
  pageViews: {
    type: Number,
    default: 0
  },
  aboutMe: {
    type: String,
    default: " "
  },
  following: [{ type: String, unique: true }],
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "product"
    }
  ],
  style: {
    borderStyle: {
      type: String,
      default: "none"
    },
    borderColor: {
      type: String,
      default: ""
    },
    borderColor2: {
      type: String,
      default: ""
    },
    borderWidth: {
      type: String,
      default: "0px"
    },
    borderRadius: {
      type: String,
      default: ""
    },
    borderAnimantion: {
      type: String,
      default: ""
    },
    fontColor: {
      type: String,
      default: "#ffffff"
    },
    fontFamily: {
      type: String,
      default: ""
    },
    cardBackground: {
      type: String,
      default: ""
    },
    pageLayout: {
      type: String,
      default: ""
    },
    pageBackground: {
      type: String,
      default: ""
    }
  }
});

//creating model class

const User = mongoose.model("users", userSchema);

module.exports = User;
