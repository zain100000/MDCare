const Chat = require("../models/consultantChat");
const { getIo } = require("../socket");

const { activeUsers } = require("../socketManager");

const saveMessage = async (req, res) => {
 
  const { senderId, receiverId, message } = req.body;

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
    console.error("❌ Error saving message:", error);
    res.status(500).json({ error: "Failed to save message", details: error.message });
  }
};


const mongoose = require('mongoose');

const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    //console.log('Received IDs:', senderId, receiverId);

    // Convert to ObjectId to match MongoDB format
    const senderObjectId = mongoose.Types.ObjectId.createFromHexString(senderId);
    const receiverObjectId = mongoose.Types.ObjectId.createFromHexString(receiverId);

    

    const messages = await Chat.find({
      $or: [
        { senderId: senderObjectId, receiverId: receiverObjectId },
        { senderId: receiverObjectId, receiverId: senderObjectId },
      ],
    }).sort({ timestamp: -1 });

    

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};

  
  module.exports = { saveMessage, getMessages };