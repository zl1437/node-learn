const mongoose = require('../db');

const commentSchema = new mongoose.Schema({
  postId: mongoose.Schema.Types.ObjectId,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
