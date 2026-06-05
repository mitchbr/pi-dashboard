import WebSocket from 'ws';
import { getSystemDetails } from "../lib/systemStats";
import logger from '../logger';

const wss = new WebSocket.Server({ port: 4001 });

wss.on('connection', (ws: WebSocket) => {
  logger.log('New client connected');

  ws.on('message', async (message: string) => {
    logger.log(`Received message: ${message}`);
    ws.send(`Server received your message: ${message}`);
  });

  setInterval(async function(){ 
    const systemDetails = await getSystemDetails();
    ws.send(JSON.stringify(systemDetails))
  }, 1000);

  ws.on('close', () => {
    logger.log('Client disconnected');
  });
});

export default wss;