const socketIo = require('socket.io');

const port = process.env.PORT || 3000;

const io = socketIo(port, {
  cors: {
    origin: ['http://localhost:8000'],
  },
});

/* ======================= Socket Events ======================= */

io.on('connection', (socket) => {
  socket.on('send-message', (message) => {
    socket.broadcast.emit('receive-message', message);
  });
});

console.log(`Socket is now listening on port ${port}...`);
