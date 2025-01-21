const mongoose = require('mongoose');

const waitinglistconsultantSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  name: { type: String, required: true },
  expertise: { type: String, required: true }, // Field of expertise
  location: {
    type: {
      type: String, 
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // Array of numbers: [longitude, latitude]
      required: true,
    },
  },
 
  bio: { type: String }, // Optional field for additional information
});

waitinglistconsultantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('WaitingListConsultant', waitinglistconsultantSchema);
