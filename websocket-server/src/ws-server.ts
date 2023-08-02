const express = require('express');
const ws = require('ws');
const cors = require('cors');

const PORT = 4000;
const app = express();
app.use(cors());

const wss = new ws.Server({ noServer: true });

const clients = new Map();
const rooms: Record<string, string[]> = {}
let offers: object;
let answers: object = { type: 'answer', test: 'test' };
const iceCandidates: object[] = [];

// WebSocket connection
wss.on('connection', (socket:any) => {
  console.log('WebSocket connected');

  // Event listener to handle messages received from the client
  socket.on('message', (data: any) => {
    try {
      const message = JSON.parse(data);
      // console.log('Message from client:', message);

      switch (message.type) {
        case 'create-room':
          console.log(`client created room : ${message.room}`)
          // create a new room
          // rooms[message.room] = ;
          // add client to room
          clients.set(socket, message.room);
          socket.send(JSON.stringify({ type: 'room-created', room: message.room }));
          break;
        case 'join-room':
          const room = rooms[message.room]
          if (room) {
            // room.sockets.push(socket);
            socket.send(JSON.stringify({ type: 'room-joined', room: message.room }));
            console.log(`client joined room : ${message.room}`);
          }
          clients.set(socket, message.room);
          break;
        case 'new-offer':
          console.log('received offer');
          offers = message.offer;
          clients.set(socket, message.room);
          for (const [clientSocket, _] of clients.entries()) {
            if (clientSocket !== socket) {
              clientSocket.send({type:'offers', offers});
            }
            else console.log('false')
          }

          // if (answers) {
          //   for (const [clientSocket, _] of clients.entries()) {
          //     if (clientSocket !== socket) {
          //       clientSocket.send(JSON.stringify({type: 'answers', answers}))
          //     }
          //     else console.log('its me')
          //   }

          // } else {
          //   console.log('no answers yet');
          // }
          break;
        case 'new-answer':
          console.log('received answer');
          answers = message.answer;
          clients.set(socket, message.room);
          for (const [clientSocket, _] of clients.entries()) {
            if (clientSocket !== socket) {
              clientSocket.send(JSON.stringify({type: 'answers', answers}))
            }
            else console.log('its me')
          }
          // socket.send(JSON.stringify({type: 'answers', answers}))
          // if (offers) {
          //   // socket.send(JSON.stringify({ type: 'offers', offers }))
            
          //   // socket.send(JSON.stringify({type: 'ice-candidate', candidate:message.candidate}))
          // } else {
          //   console.log('no offers yet');
          // }
          break;
        case 'ice-candidate':
          console.log('received ice candidates');
          // iceCandidates.push(message.candidate);
          for (const [clientSocket, _] of clients.entries()) {
            if (clientSocket !== socket) {
              clientSocket.send(JSON.stringify({type: 'ice-candidate', candidate:message.candidate}))
            }
          }

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