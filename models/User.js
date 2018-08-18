const mongoose = require('mongoose');
const { Schema } = mongoose; // same as ----> const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String
});


//creating model class
mongoose.model('users', userSchema);