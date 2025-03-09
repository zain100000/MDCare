const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  specialties: { type: [String], default: [], required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
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
});
schoolSchema.index({ location: "2dsphere" });

schoolSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) return 0;

  const sum = this.ratings.reduce((acc, rating) => acc + rating, 0);
  return sum / this.ratings.length;
};
schoolSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  } else {
    next();
  }
});
schoolSchema.statics.isThisSchoolEmailInUse = async function (email) {
  if (!email) throw new Error("Invalid Email");
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log("Error inside isThisEmailInUse method:", error.message);
    return false;
  }
};
schoolSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing, cannot compare!");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password!", error.message);
  }
};
module.exports = mongoose.model("School", schoolSchema);
