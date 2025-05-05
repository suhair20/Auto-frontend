import { io } from 'socket.io-client'; // CLIENT SIDE SOCKET

const socket = io('http://localhost:5000'); // Connects to the backend server
export default socket;