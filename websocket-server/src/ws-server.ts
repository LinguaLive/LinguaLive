const express = require('express');
const ws = require('ws');
const cors = require('cors');

const PORT = 4000;
const app = express();
app.use(cors());

const wss = new ws.Server({ noServer: true });

const clients = new Map();
const rooms:Record<string, string[]> = {}
// {'roomid': ['user', 'user2']}

// WebSocket connection
wss.on('connection', (socket:any) => {
  console.log('WebSocket connected');

  // Event listener to handle messages received from the client
  socket.on('message', (data: any) => {
    try {
      const message = JSON.parse(data);
      console.log('Message from client:', message);

      switch (message.type) {
        case 'create-room':
          console.log(`client created room : ${message.room}`)
          // create a new room
          rooms[message.room] = [];
          // add client to room
          clients.set(socket, message.room);
          socket.send(JSON.stringify({ type: 'room-created', room: message.room }));
          break;
        case 'join-room':
          // [] with the list of current participants
          const participants = rooms[message.room];
          participants.push(socket)
          clients.set(socket, message.room);
          
            socket.send(JSON.stringify({ type: 'room-joined', room: message.room }));
            console.log(`client joined room : ${message.room}`);
          break;
        default:
          console.warn('Unknown message type:', message.type);
      }
    } catch (err) {
      console.error('error', err);
    }
  });
  socket.on('close', () => {
    console.log('WebSocket disconnected');
    clients.delete(socket)
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});

server.on('upgrade', (request: Request, socket: any, head: any) => {
  wss.handleUpgrade(request, socket, head, (socket: any) => {
    wss.emit('connection', socket, request);
  });
});