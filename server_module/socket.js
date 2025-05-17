const socketIo = require("socket.io");
const { sendFCMMessage } = require('./services/firebaseMessaging');
let io; // Declare io variable globally

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*", // Adjust this in production
      methods: ["GET", "POST"],
    },
  });
  let users = {};
  io.on("connection", (socket) => {
    const callerId = socket.handshake.query?.callerId;
    const fcmToken = socket.handshake.query?.fcmToken;
    if (callerId) {
      users[callerId] = {
        socketId: socket.id,
        fcmToken,
      };
    }
    console.log(`User connected: ${callerId}, Socket ID: ${socket.id}`);

    // call event
    socket.on("call", async ({ calleeId, rtcMessage, roomId }) => {
      if (users[calleeId]) {
        io.to(users[calleeId].socketId).emit("newCall", {
          callerId,
          rtcMessage,
          roomId,
        });
      }
      // Send push notification via FCM
      if (users[calleeId]?.fcmToken) {
        try {
          await sendFCMMessage(users[calleeId].fcmToken, {
            title: 'Incoming Call',
            body: `You have a call from ${callerId}`,
            callerId,
            roomId,
            type: 'call',
            rtcMessage: JSON.stringify(rtcMessage),
          });
          console.log('✅ FCM notification sent to:', calleeId);
        } catch (err) {
          console.error('❌ Error sending FCM notification:', err);
        }
      }
    });

    //answer call event
    socket.on("answerCall", ({ callerId, rtcMessage, roomId }) => {
      if (users[callerId]) {
        io.to(users[callerId].socketId).emit("callAnswered", { rtcMessage, roomId });
      }
    });


    //ice event 
    socket.on("ICEcandidate", ({ calleeId, rtcMessage }) => {
      if (users[calleeId]) {
        io.to(users[calleeId].socketId).emit("ICEcandidate", { rtcMessage });
      }

    });

    //end call event
    // socket.on("endCall", ({ calleeId, roomId }) => {
    //   if (users[calleeId]) {
    //     io.to(users[calleeId]).emit("callEnded", { roomId });
    //   }
    // });
    socket.on("endCall", ({ calleeId, roomId }) => {
      const callerSocketId = users[callerId]?.socketId;
      const calleeSocketId = users[calleeId]?.socketId;
      console.log(`Ending call for room: ${roomId}`);
      console.log(`Caller Socket ID: ${callerSocketId}`);
      console.log(`Callee Socket ID: ${calleeSocketId}`);

      if (calleeSocketId) {
        io.to(calleeSocketId).emit("callEnded", { roomId });
      }

      // Emit back to the caller too
      if (callerSocketId) {
        io.to(callerSocketId).emit("callEnded", { roomId });
      }
    });

    //
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${callerId}`);
      if (callerId) {
        delete users[callerId];
      }
    });
  });

  return io;
};

// Function to get io instance
const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized! Call initializeSocket first.");
  }
  return io;
};

module.exports = { initializeSocket, getIo };
