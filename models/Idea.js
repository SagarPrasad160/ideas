const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please add a text field"],
  },
  username: {
    type: String,
  },
  tag: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Idea", IdeaSchema);
