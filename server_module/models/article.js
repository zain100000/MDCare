const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Article title
  content: { type: String, required: true }, // Main content
  author: { type: String, required: true }, // Author's name
  category: { type: String }, // Category of the article (optional)
  date: { type: Date, default: Date.now }, // Date of creation
});

module.exports = mongoose.model('Article', articleSchema);
