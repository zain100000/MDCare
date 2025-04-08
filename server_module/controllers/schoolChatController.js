const Chat = require("../models/schoolChat");

const saveMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = new Chat({
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
    });

    const savedMessage = await newMessage.save();

    // 👇 Possible error spot
    if (!savedMessage) {
      throw new Error("Message not saved");
    }

    // ✅ Respond with saved message
    return res.status(201).json(savedMessage);
  } catch (err) {
    console.error("❌ Backend error saving message:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};

module.exports = { saveMessage, getMessages };
