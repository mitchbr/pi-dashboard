import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import endpoint from '../endpoints.config';
import "../pages.css";
import "./Stats.css";

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

  const { lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setWsData(JSON.parse(lastMessage.data));
    }
  }, [lastMessage]);


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
        </div>
      </div>
    </>
  )
}

export default Stats
