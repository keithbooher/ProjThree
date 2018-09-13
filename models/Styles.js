const mongoose = require("mongoose");
const Schema = mongoose.Schema; // same as ----> const Schema = mongoose.Schema;

const styleSchema = new Schema({
  UID: {
    type: String
  },
  border: {
    type: String,
    default: "solid"
  }
});

//creating model class

const Style = mongoose.model("styles", styleSchema);

module.exports = Style;
