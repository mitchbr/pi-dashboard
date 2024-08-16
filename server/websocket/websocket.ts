import WebSocket from 'ws';
import { getSystemDetails } from "../lib/systemStats";

const wss = new WebSocket.Server({ port: 4001 });

wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');

  ws.on('message', async (message: string) => {
    console.log(`Received message: ${message}`);
    ws.send(`Server received your message: ${message}`);
  });

  setInterval(async function(){ 
    const systemDetails = await getSystemDetails();
    ws.send(JSON.stringify(systemDetails))
  }, 1000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

export default wss;