const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

// Route imports
const userRouter = require("./routes/user");
const schoolRouter = require("./routes/school");
const articleRouter = require("./routes/article");
const consultantRoutes = require("./routes/consultant");
const videoRoutes = require("./routes/video");
const kidsRoutes = require("./routes/kidRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Register API routes
app.use("/api/auth", userRouter);
app.use("/api/school", schoolRouter);
app.use("/api/article", articleRouter);
app.use("/api/consultant", consultantRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/kid", kidsRoutes);
app.use("/api/chat", chatRoutes);

// Test route
app.get("/test", (req, res) => {
  res.send("Hello world");
});

// Default route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to backend zone!" });
});

// ✅ Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
