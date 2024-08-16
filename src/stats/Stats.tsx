import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import "./Stats.css";

function Stats() {
  //Public API that will echo messages sent to it back to the client
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
    [ReadyState.CONNECTING]: 'yellow',
    [ReadyState.OPEN]: 'green',
    [ReadyState.CLOSING]: 'yellow',
    [ReadyState.CLOSED]: 'red',
    [ReadyState.UNINSTANTIATED]: 'red',
  }[readyState];

  return (
    <>
      <div>
        <h1>Stats Page</h1>
        <p>Pi WebSocket Status <span className="dot" style={{backgroundColor: connectionStatus}}></span></p>
        <span>CPU Temp: {wsData.cpuTemp}</span>
        <span>CPU Usage: {Math.floor(wsData.cpuUsage)}</span>
        <span>Memory Total: {wsData.memoryUsage.total}</span>
        <span>Memory Free: {wsData.memoryUsage.free}</span>
        <span>Memory Used: {wsData.memoryUsage.used}</span>
      </div>
    </>
  )
}

export default Stats
