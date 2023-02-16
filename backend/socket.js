let io;

module.exports = {
  init: (httpsServer) => {
    io = require("socket.io")(httpServer);
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Scoket.io not initialized");
    }
    return io;
  },
};
