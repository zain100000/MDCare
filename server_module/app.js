const express = require("express");
const cors = require('cors');
require("dotenv").config();
require("./models/db");

// Route imports
const userRouter = require("./routes/user");
const schoolRouter = require("./routes/school");
const articleRouter = require("./routes/article");
const consultantRoutes = require("./routes/consultant");
const videoRoutes = require("./routes/video");
// const schoolRoutes = require('./routes/school');
// const articleRoutes = require('./routes/article');

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

app.use("/api/auth", userRouter);
app.use("/api/school", schoolRouter);
app.use("/api/article", articleRouter);
app.use("/api/consultant", consultantRoutes);
app.use("/api/video", videoRoutes);

// Register routes with proper prefixes
// app.use('/api/v1', userRouter); // Add `/api/v1` prefix for user routes
// app.use('/api/v1', schoolRoutes);
// app.use('/api/v1', consultantRoutes);
// app.use('/api/v1', articleRoutes);

// Test route
app.get("/test", (req, res) => {
  res.send("Hello world");
});

// Default route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to backend zone!" });
});

// Start the server
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
