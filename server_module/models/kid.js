const mongoose = require('mongoose');

const kidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // Restricts to specific values
    required: true
  },
  speciality: {
    type: String, 
    required: true
  },
});

module.exports = mongoose.model('Kid', kidSchema);
