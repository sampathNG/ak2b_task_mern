const mongoose = require("mongoose");
const userSChema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});
const user = mongoose.model("User", userSChema);
module.exports = user;
