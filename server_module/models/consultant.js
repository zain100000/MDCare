const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const consultantSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  phone:{
    type:String,
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
  ratings: {
    type: [Number], 
    default: [], // Defaults to an empty array
  },
  bio: { type: String }, // Optional field for additional information
});

consultantSchema.index({ location: '2dsphere' });
consultantSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) return 0;

  const sum = this.ratings.reduce((acc, rating) => acc + rating, 0);
  return sum / this.ratings.length;
};
consultantSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  } else {
    next();
  }
});
consultantSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is missing, cannot compare!');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing password!', error.message);
  }
};
module.exports = mongoose.model('Consultant', consultantSchema);
