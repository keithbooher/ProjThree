const mongoose = require('mongoose');
const Schema = mongoose.Schema; // same as ----> const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    firstName: String,
    admin: {
        type: Boolean,
        default: false
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: "product"
      }]
});


//creating model class

const User = mongoose.model('users', userSchema);


module.exports = User;