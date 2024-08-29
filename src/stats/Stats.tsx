import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import "../pages.css";
import "./Stats.css";

function Stats() {
  const socketUrl = 'ws://localhost:4001';
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
      <div className="page__body">
      <div className='page__body-content'>
          <h2>Raspberry Pi Stats</h2>
          <p>This page contains live statistics about the raspberry pi. This data is sent via a WebSocket using the node <code>systeminformation</code> package. 
          For now, this only has a few basic stats. However, data such as Docker container info and file storage are available and I hope to implement them soon.</p>
        </div>
        <div className='page__body-content'>
          <div className="page__body-content__grid">
            <div className='page__body-content__item'>
              <h4>Pi WebSocket Status </h4>
              <div className='connection-status'>
                <span className="dot" style={{backgroundColor: connectionStatus.color}}></span> <p>{connectionStatus.status}</p>
              </div>
            </div>
            <div className='page__body-content__item'>
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
            <div className='page__body-content__item'>
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
      </div>
    </>
  )
}

export default Stats
