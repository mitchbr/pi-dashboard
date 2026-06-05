import app from './api/api'
import wss from './websocket/websocket'
import logger from './logger'

const port = 4000;

logger.log('Websocket running')

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
