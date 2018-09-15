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
        default: ""
    },
    pageViews: {
        type: Number,
        default: 0
    },
    aboutMe: {
        type: String,
        default: " "
    },
    following: [{type:String, unique: true}],
    product: [{
        type: Schema.Types.ObjectId,
        ref: "product"
      }],
    style: {
      border: {
        type: String,
        default: "dashed"
      }
    }
  


});

//creating model class

const User = mongoose.model("users", userSchema);

module.exports = User;
