import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const LOG_DIR = './logs';
const LOG_FILE = path.join(LOG_DIR, 'pi_dash_logs.log');

// Ensure log directory exists
const ensureLogDirectory = () => {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
};

interface LogEntry {
  message: string;
  timestamp: string;
  uuid: string;
}

export class Logger {
  constructor() {
    ensureLogDirectory();
  }

  private formatLogEntry(entry: LogEntry): string {
    return JSON.stringify(entry);
  }

  log(message: string): void {
    const entry: LogEntry = {
      message,
      timestamp: new Date().toISOString(),
      uuid: uuidv4(),
    };

    const logLine = this.formatLogEntry(entry) + '\n';

    try {
      fs.appendFileSync(LOG_FILE, logLine, 'utf8');
    } catch (error) {
      console.error(`Failed to write to log file: ${error}`);
    }
  }

  error(message: string): void {
    const entry: LogEntry = {
      message: `[ERROR] ${message}`,
      timestamp: new Date().toISOString(),
      uuid: uuidv4(),
    };

    const logLine = this.formatLogEntry(entry) + '\n';

    try {
      fs.appendFileSync(LOG_FILE, logLine, 'utf8');
    } catch (error) {
      console.error(`Failed to write to log file: ${error}`);
    }
  }

  info(message: string): void {
    const entry: LogEntry = {
      message: `[INFO] ${message}`,
      timestamp: new Date().toISOString(),
      uuid: uuidv4(),
    };

    const logLine = this.formatLogEntry(entry) + '\n';

    try {
      fs.appendFileSync(LOG_FILE, logLine, 'utf8');
    } catch (error) {
      console.error(`Failed to write to log file: ${error}`);
    }
  }
}

export default new Logger();
