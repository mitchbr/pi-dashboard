import express, { type Request, type Response } from 'express';
import { execSync } from 'child_process';
import fs from 'fs';
import cors from 'cors';
import logger from '../logger';

const app = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Server running healthy' });
});

app.get('/deploy', async (req: Request, res: Response) => {
  const logs: Array<string> = [];
  try {
    const message = `Received deploy request for service: ${req.query.service}`;
    logs.push(message);
    logger.info(message);
    
    const options: Array<string> = [
      'groceries_v2',
      'stonelifting',
      'workout-journal'
    ];
    if (!req.query.service || !options.includes(req.query.service as string)) {
      const errorMsg = 'Invalid service specified';
      res.status(400).send({ message: errorMsg, logs });
      logger.error(errorMsg);
      return;
    }

    const output = await execSync(`(cd ../${req.query.service} &&  make deploy)`).toString();
    logs.push('Deployment output:');
    logs.push(...output.split('\n'));
    logger.info(`Deployment completed for service: ${req.query.service}`);
  } catch (error: object | any) {
    const errorMsg = `Deployment error: ${error.toString()}`;
    logs.push('Deployment error:');
    logs.push(...error.toString().split('\n'));
    logger.error(errorMsg);
    res.status(500).send({ message: 'Deployment failed', logs });
    return;
  }

  res.status(200).send({ message: 'Deployment complete', service: req.query.service, logs });
});

app.get('/logs', (req: Request, res: Response) => {
  try {
    const logFile = './logs/pi_dash_logs.log';
    
    if (!fs.existsSync(logFile)) {
      res.status(200).send({ message: 'No logs found', logs: [] });
      return;
    }

    const fileContent = fs.readFileSync(logFile, 'utf8');
    const lines = fileContent.split('\n').filter(line => line.trim());
    
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const recentLogs = lines
      .map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter((log): log is { message: string; timestamp: string; uuid: string } => {
        if (!log || !log.timestamp) return false;
        const logDate = new Date(log.timestamp);
        return logDate >= oneMonthAgo;
      });
    
    res.status(200).send({ message: 'Logs retrieved', count: recentLogs.length, logs: recentLogs });
  } catch (error: object | any) {
    logger.error(`Failed to fetch logs: ${error.toString()}`);
    res.status(500).send({ message: 'Failed to fetch logs', error: error.toString() });
  }
});

export default app;