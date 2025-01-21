const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cloudinary = require("../helper/imageUpload");
const sendEmail = require("../helper/emailHelper"); // Email helper to send emails
const { sendWelcomeEmail } = require("../utils/nodeMailer");
const School = require("../models/school");
const Consultant = require("../models/consultant");
const consultant = require("../models/consultant");
// const sendEmail = () => {
//   sendWelcomeEmail
// }

// Create User
exports.createUser = async (req, res) => {
  try {
    const { fullname, email, password, superAdmin } = req.body; // Include superAdmin
    const isNewUser = await User.isThisEmailInUse(email);

    if (!isNewUser) {
      return res.status(400).json({
        success: false,
        message: "This email is already in use, try signing in.",
      });
    }

    const user = new User({ fullname, email, password, superAdmin }); // Pass superAdmin to the model
    await user.save();
    sendWelcomeEmail(user);

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

// User Sign In with SuperAdmin Check
exports.userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the given email!",
      });
    }

    // Check if the password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email or password does not match!",
      });
    }

    // Generate JWT token without expiration
    const token = jwt.sign(
      { userId: user._id, isSuperAdmin: user.superAdmin }, // Include superAdmin in the payload
      process.env.JWT_SECRET
    );

    // Prepare user info to send back
    const userInfo = {
      fullname: user.fullname,
      email: user.email,
      avatar: user.avatar || "",
      isSuperAdmin: user.superAdmin, // Return superAdmin status
    };

    res.json({ success: true, user: userInfo, token });
  } catch (error) {
    console.error("Error signing in:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

// Get User
exports.getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

// Get User By Id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the given ID!",
      });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the given email!",
      });
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    const resetURL = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;
    const message = `You are receiving this email because you requested a password reset. Click the link below to reset your password: \n\n ${resetURL}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email!",
    });
  } catch (error) {
    console.error("Error during forgot password:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, email } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token has not expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token!",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful!",
    });
  } catch (error) {
    console.error("Error during reset password:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

// Upload Profile
exports.uploadProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user._id}_profile`,
      width: 500,
      height: 500,
      crop: "fill",
    });

    user.avatar = result.secure_url;
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "Your profile has been updated!" });
  } catch (error) {
    console.error("Error uploading profile image:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

// Sign Out
exports.signOut = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization failed!" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }

    // Sign-out success response (no need to modify the database)
    res.json({ success: true, message: "Signed out successfully!" });
  } catch (error) {
    console.error("Error signing out:", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

exports.SearchSchool = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization failed!" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access!" });
  }

  const { name, longitude, latitude, maxDistance } = req.body;

  try {
    // Create a query object
    const query = {};

    // Search by school name (case-insensitive)
    if (name) {
      query.name = { $regex: name, $options: "i" }; // 'i' makes it case-insensitive
    }

    // Search by location (if latitude and longitude are provided)
    if (longitude && latitude) {
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)], // Ensure correct number format
          },
          $maxDistance: maxDistance ? parseInt(maxDistance) : 5000, // Default to 5000 meters if not provided
        },
      };
    }

    // Fetch schools based on the query
    const schools = await School.find(query);
    res.status(200).json(schools);
  } catch (error) {
    console.error("Error searching schools:", error.message);
    res.status(500).json({
      success: false,
      error: "An error occurred while searching for schools",
    });
  }
};

exports.SearchConsultant = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization failed!" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access!" });
  }

  const { name, longitude, latitude, maxDistance } = req.body;

  try {
    // Create a query object
    const query = {};

    // Search by school name (case-insensitive)
    if (name) {
      query.name = { $regex: name, $options: "i" }; // 'i' makes it case-insensitive
    }

    // Search by location (if latitude and longitude are provided)
    if (longitude && latitude) {
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)], // Ensure correct number format
          },
          $maxDistance: maxDistance ? parseInt(maxDistance) : 5000, // Default to 5000 meters if not provided
        },
      };
    }

    // Fetch schools based on the query
    const consultant = await Consultant.find(query);
    res.status(200).json({ success: true, consultant });
  } catch (error) {
    console.error("Error searching consultant:", error.message);
    res.status(500).json({
      success: false,
      error: "An error occurred while searching for consultant",
    });
  }
};

exports.updateLocation = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization failed!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { longitude, latitude } = req.body;

    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: "Longitude and Latitude are required!",
      });
    }

    const locationUpdate = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };

    await User.findByIdAndUpdate(
      decoded.userId,
      { location: locationUpdate },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Location updated successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
