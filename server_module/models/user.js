const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  superAdmin: {
    type: Boolean,
    default: false,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number], // Array of numbers: [longitude, latitude]
    },
  },

  resetPasswordToken: String, // Token for password reset
  resetPasswordExpires: Date, // Expiry time for the reset token
});

// Adding a unique index to the email field
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ location: "2dsphere" });

// Pre-save hook for hashing passwords
userSchema.pre("save", function (next) {
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

// Method for comparing passwords
userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing, cannot compare!");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password!", error.message);
  }
};

// Static method to check if an email is already in use
userSchema.statics.isThisEmailInUse = async function (email) {
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

module.exports = mongoose.model("User", userSchema);
