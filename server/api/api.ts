import express, { type Request, type Response } from 'express';
import { execSync } from 'child_process';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Server running healthy');
});

app.get('/deploy', async (req: Request, res: Response) => {
  const logs: Array<string> = [];
  try {
    logs.push(`Received deploy request for service: ${req.query.service}`);
    const options: Array<string> = [
      'groceries_v2',
      'stonelifting',
      'workout-journal'
    ];
    if (!req.query.service || !options.includes(req.query.service as string)) {
      res.status(400).send({ message: 'Invalid service specified', logs });
      return;
    }

    const output = await execSync(`(cd ../${req.query.service} &&  make deploy)`).toString();
    logs.push('Deployment output:');
    logs.push(...output.split('\n'));
  } catch (error: object | any) {
    logs.push('Deployment error:');
    logs.push(...error.toString().split('\n'));
    res.status(500).send({ message: 'Deployment failed', logs });
    return;
  }

  res.status(200).send({ message: 'Deployment complete', service: req.query.service, logs });
});


export default app;