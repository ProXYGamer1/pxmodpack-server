const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8765 });

server.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        //console.log('Received raw message:', message);

        try {
            // Пытаемся распарсить входящее сообщение как JSON
            const data = JSON.parse(message);
            //console.log('Received data:', data);

            // Выполняем нужные операции с данными

            // Отправляем данные всем клиентам
            server.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        } catch (error) {
            //console.error('Error parsing message:', error);
        }
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

//console.log('WebSocket server is running on ws://localhost:8765');