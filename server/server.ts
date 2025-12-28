import app from './api/api'
import wss from './websocket/websocket'

const port = 4000;

console.log('Websocket running', wss)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
