// socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Create a single instance

export default socket;
