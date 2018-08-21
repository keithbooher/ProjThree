const mongoose = require('mongoose');
const { Schema } = mongoose; // same as ----> const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    firstName: String
});


//creating model class
mongoose.model('users', userSchema);