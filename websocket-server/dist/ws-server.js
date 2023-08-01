"use strict";
const express = require('express');
const ws = require('ws');
const cors = require('cors');
const PORT = 4000;
const app = express();
app.use(cors());
const wss = new ws.Server({ noServer: true });
// WebSocket connection handling
wss.on('connection', (socket) => {
    console.log('WebSocket connected');
    // Event listener to handle messages received from the client
    socket.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            console.log('Message from client:', message);
            switch (message.type) {
                case 'join-room':
                    console.log(`client joined room : ${message.room}`);
                    break;
                default:
                    console.warn('Unknown message type:', message.type);
            }
        }
        catch (err) {
            console.error('error', err);
        }
    });
    socket.on('close', () => {
        console.log('WebSocket disconnected');
    });
});
const server = app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
});
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
        wss.emit('connection', socket, request);
    });
});
