const mongoose = require("mongoose");
const todoSChema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const todo = mongoose.model("Todo", todoSChema);
module.exports = todo;
