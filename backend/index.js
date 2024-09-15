import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import store from "./store/store.js"


import mongoose from "mongoose"
import { Chat,Data} from './mongoose/Schema/user.js';


const mongoURI = 'mongodb://localhost:27017/mydatabase'; 

mongoose.connect(mongoURI, {
  useNewUrlParser: true,   
  useUnifiedTopology: true 
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Successfully connected to MongoDB');
});

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});




const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:8080"
  }
});

let uid=0;
io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);
   
    socket.on('user', (d) =>
    {
      console.log(`socket id:${socket.id} connect to room ${d}`);
      socket.join(d);
    });

    socket.on('message_server', async(msg) => {
      msg.id=uid;
      uid++;
      let a=msg.user;
      let b=msg.recevier;

      if(a>b){
        [a, b] = [b, a];
      }
      
      const id=a+b;
      let result=await Chat.findOne({chatroom_id:id});

      if(!result)
      {
        result= new Chat({
          chatroom_id:id,
          chat:[
            {
                message: msg.message,
                user: msg.user,
                recevier: msg.receiver
            }
          ]
        });
        await result.save();
      }else{
        result.chat.push(
          {
            message: msg.message,
            user: msg.user,
            recevier: msg.receiver
        }
        );
        await result.save();
      }

      

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
