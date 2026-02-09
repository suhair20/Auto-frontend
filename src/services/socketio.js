import { io } from 'socket.io-client'; // CLIENT SIDE SOCKET

const socket = io('https://auto-backend-jq5w.onrender.com'); // Connects to the backend server
export default socket;