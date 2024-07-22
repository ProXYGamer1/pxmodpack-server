const WebSocket = require('ws');
const port = process.env.PORT || 8765;

const server = new WebSocket.Server({ port });

server.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            server.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log(`WebSocket server is running on port ${port}`);