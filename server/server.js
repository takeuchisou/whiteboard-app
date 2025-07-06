require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Whiteboard Server is running' });
});

let drawingData = [];
let rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
    
    if (rooms.has(roomId)) {
      socket.emit('drawing-history', rooms.get(roomId));
    } else {
      rooms.set(roomId, []);
    }
  });

  socket.on('drawing', (data) => {
    const { roomId, ...drawingInfo } = data;
    
    if (rooms.has(roomId)) {
      rooms.get(roomId).push(drawingInfo);
    }
    
    socket.to(roomId).emit('drawing', drawingInfo);
  });

  socket.on('clear-canvas', (roomId) => {
    if (rooms.has(roomId)) {
      rooms.set(roomId, []);
    }
    socket.to(roomId).emit('clear-canvas');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});