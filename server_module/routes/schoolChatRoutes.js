const express = require("express");
const router = express.Router();
const { saveMessage, getMessages } = require("../controllers/schoolChatController");



// Save a new message
router.post("/saveMessage", saveMessage);

// Get chat messages between two users
router.get("/getChat/:senderId/:receiverId", getMessages);

module.exports = router;
