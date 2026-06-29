const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  role: String,
  content: String,
});

const ChatSchema = new mongoose.Schema({
  title: String,
  messages: [MessageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chat", ChatSchema);