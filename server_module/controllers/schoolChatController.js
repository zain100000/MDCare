const Chat = require("../models/schoolChat");

const saveMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;  // Destructuring inside Controller

  try {
    const newMessage = new Chat({ senderId, receiverId, message });
    const savedMessage = await newMessage.save();
    const io = getIo();
        if (io) {
          io.emit("newMessage", savedMessage); // ✅ Emit event to all clients
        } else {
          console.error("❌ io is not defined!");
        }
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to save message" });
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