import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import endpoint from '../endpoints.config';
import "../pages.css";
import "./Stats.css";

interface LogEntry {
  message: string;
  timestamp: string;
  uuid: string;
}

function Stats() {
  const socketUrl = endpoint.wsUrl;
  const [wsData, setWsData] = useState({
    cpuTemp: 0,
    cpuUsage: 0,
    memoryUsage: {
      total: 0,
      used: 0,
      free: 0
    }
  })
  const [apiHealth, setApiHealth] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const { lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setWsData(JSON.parse(lastMessage.data));
    }
  }, [lastMessage]);

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await fetch(`${endpoint.apiUrl}/`);
        console.log('API health check response:', response);
        if (response.status === 200 || response.status === 304) {
          setApiHealth('healthy');
        } else {
          setApiHealth('down');
        }
      } catch (error) {
        setApiHealth('down');
      }
    };

    checkApiHealth();
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`${endpoint.apiUrl}/logs`);
        if (response.ok) {
          const data = await response.json();
          const sortedLogs = data.logs.sort((a: LogEntry, b: LogEntry) => {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          });
          setLogs(sortedLogs);
        }
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      }
    };

    fetchLogs();
  }, []);


  const connectionStatus = {
    [ReadyState.CONNECTING]: {status: 'Connecting', color: 'yellow'},
    [ReadyState.OPEN]: {status: 'Connected', color: 'green'},
    [ReadyState.CLOSING]: {status: 'Closing', color: 'yellow'},
    [ReadyState.CLOSED]: {status: 'Closed', color: 'red'},
    [ReadyState.UNINSTANTIATED]: {status: 'Uninstantiated', color: 'red'},
  }[readyState];

  return (
    <>
      <div className="page-body">
        <div className="page-grid stats-page-grid">
          <div className="grid-item grid-text stats-top-left">
          <h2>Raspberry Pi Stats</h2>
            <p>This page contains live statistics about the raspberry pi. This data is sent via a WebSocket using the node <code>systeminformation</code> package. 
            For now, this only has a few basic stats. However, data such as Docker container info and file storage are available and I hope to implement them soon.</p>
          </div>
          <div className="grid-item grid-text stats-top-center">
            <h4>Pi WebSocket Status </h4>
            <div className='connection-status'>
              <span className="dot" style={{backgroundColor: connectionStatus.color}}></span> <p>{connectionStatus.status}</p>
            </div>
            <h4>API Health</h4>
            <div className='connection-status'>
              <span className="dot" style={{backgroundColor: apiHealth === 'healthy' ? 'green' : 'red'}}></span>
              <p>{apiHealth === 'healthy' ? 'API is healthy' : 'API is down'}</p>
            </div>
          </div>
          <div className="grid-item stats-top-right">
            <img src="rasp_pi.jpg" alt='The Pi in its home on my desk'></img>
            <div className="overlay">
              <div className="overlay-text">The Pi in my office, currently hosting the site you're on</div>
            </div>
          </div>
          <div className="grid-item grid-text stats-bottom-left">
            <h4>CPU</h4>
            <div className='box-data'>
              <div className='stat'>
                <p>Temperature</p>
                <p>{wsData.cpuTemp}</p>
              </div>
              <div className='stat'>
                <p>Usage</p>
                <p>{Math.floor(wsData.cpuUsage)}</p>
              </div>
            </div>
          </div>
          <div className="grid-item grid-text stats-bottom-center">
            <h4>Memory</h4>
            <div className='box-data'>
              <div className='stat'>
                <p>Total</p>
                <p>{wsData.memoryUsage.total}</p>
              </div>
              <div className='stat'>
                <p>Free</p>
                <p>{wsData.memoryUsage.free}</p>
              </div>
              <div className='stat'>
                <p>Used</p>
                <p>{wsData.memoryUsage.used}</p>
              </div>
            </div>
          </div>
          <div className="grid-item grid-text" style={{ gridColumn: '1 / -1' }}>
            <h4>Recent Logs (Last Month)</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Timestamp</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Message</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>UUID</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length > 0 ? (
                    logs.map((log) => (
                      <tr key={log.uuid} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '8px' }}>{new Date(log.timestamp).toLocaleString()}</td>
                        <td style={{ padding: '8px' }}>{log.message}</td>
                        <td style={{ padding: '8px', fontSize: '0.85em', color: '#666' }}>{log.uuid}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} style={{ padding: '8px', textAlign: 'center' }}>No logs found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Stats
