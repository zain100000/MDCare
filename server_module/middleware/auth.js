const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("decoded.tokem:", token);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    console.log("decoded.userId:", decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token. User not found." });
    }

    // Attach user details and role to the request
    req.user = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      isSuperAdmin: user.superAdmin || false, // Ensure default is false if field is missing
    };

    next();
  } catch (error) {
    const message =
      error.name === "JsonWebTokenError"
        ? "Invalid token."
        : error.name === "TokenExpiredError"
          ? "Token expired."
          : "Authorization error.";

    console.error("Authorization error:", error.message);
    res.status(401).json({ success: false, message });
  }
};
