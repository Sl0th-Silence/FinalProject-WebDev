const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Brynn Landry
//User Model

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema, "users");
module.exports = User;
