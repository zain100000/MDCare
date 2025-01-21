const express = require("express");
require("dotenv").config();
require("./models/db");

// Route imports
const userRouter = require("./routes/user");
const schoolRouter = require("./routes/school");
const articleRouter = require("./routes/article");
// const schoolRoutes = require('./routes/school');
const consultantRoutes = require("./routes/consultant");
// const articleRoutes = require('./routes/article');

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/school", schoolRouter);
app.use("/api/article", articleRouter);
app.use("/api/consultant", consultantRoutes);

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
