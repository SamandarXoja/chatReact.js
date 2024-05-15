import { io } from "socket.io-client";

const socket = io("https://chat-ubzo.onrender.com");

export default socket;