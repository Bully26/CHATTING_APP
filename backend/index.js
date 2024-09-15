import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import store from "./store/store.js"

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:8080"
  }
});

// Handle a new client connection
let uid=0;
io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);
   
    // Listen for a custom event 'A'
    socket.on('user', (d) =>
    {
      console.log(`socket id:${socket.id} connect to room ${d}`);
      socket.join(d);
    });

    // Listen for 'message_server' event and emit to all clients
    socket.on('message_server', (msg) => {
      msg.id=uid;
      uid++;
      if (msg) 
        {
          socket.to(msg.user).emit('message_client', msg);
          socket.to(msg.recevier).emit('message_client', msg);
          console.log(`socket id:${socket.id} sent message to room ${msg.user} and ${msg.recevier}`);
        }
      
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
