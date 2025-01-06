// server.js
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on("connection", (ws) => {
  // Add the new client to the clients array
  clients.push(ws);

  // When a message is received from a client (user)
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    // Broadcast the message to all connected clients (admins)
    clients.forEach((client) => {
      if (client !== ws) {
        client.send(message); // Send message to all admins
      }
    });
  });

  // Remove the client when they disconnect
  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
