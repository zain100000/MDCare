const socketIo = require("socket.io");

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
    if (callerId) {
      users[callerId] = socket.id;
    }
    console.log(`User connected: ${callerId}, Socket ID: ${socket.id}`);

    // call event
    socket.on("call", ({ calleeId, rtcMessage, roomId }) => {
      if (users[calleeId]) {
        io.to(users[calleeId]).emit("newCall", {
          callerId,
          rtcMessage,
          roomId,
        });
      }
    });

    //answer call event
    socket.on("answerCall", ({ callerId, rtcMessage, roomId }) => {
      if (users[callerId]) {
        io.to(users[callerId]).emit("callAnswered", { rtcMessage, roomId });
      }
    });


    //ice event 
    socket.on("ICEcandidate", ({ calleeId, rtcMessage }) => {
      if (users[calleeId]) {
        io.to(users[calleeId]).emit("ICEcandidate", { rtcMessage });
      }
    });

    //end call event
    socket.on("endCall", ({ calleeId, roomId }) => {
      if (users[calleeId]) {
        io.to(users[calleeId]).emit("callEnded", { roomId });
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
