import express, { Request, Response } from 'express';
import WebSocket from 'ws';
import { getSystemDetails } from "./lib/systemStats";

const app = express();
const port = 4000;

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

app.get('/', (req: Request, res: Response) => {
  res.send('Getting details!');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
