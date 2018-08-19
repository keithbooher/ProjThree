const mongoose = require('mongoose');
const { Schema } = mongoose; // same as ----> const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 0}
});


//creating model class
mongoose.model('users', userSchema);