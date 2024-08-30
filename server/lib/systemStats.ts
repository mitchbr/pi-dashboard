/* 
  More systeminformation functions available here:
    https://github.com/sebhildebrandt/systeminformation
*/
import * as si from "systeminformation";

async function getCpuUsage() {
  const usage = await si.currentLoad();
  return usage.currentLoad;
}

async function getCpuTemp() {
  const temp = await si.cpuTemperature();
  return (temp.main !== null) ? temp.main : 0;
}

async function getMemoryUsage() {
  const mem = await si.mem();
  return {
    total: bytesToGB(mem.total),
    used: bytesToGB(mem.used),
    free: bytesToGB(mem.free)
  }
}

async function getDockerInfo() {
  const dockerInfo = await si.dockerInfo();
  return {
    containers: dockerInfo.containers,
    running: dockerInfo.containersRunning,
    paused: dockerInfo.containersPaused,
    stopped: dockerInfo.containersStopped
  }
}

function bytesToGB(bytes: number) {
  return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

export async function getSystemDetails() {
  const cpuUsage = await getCpuUsage();
  const memUsage = await getMemoryUsage();
  const cpuTemp = await getCpuTemp();
  const dockerInfo = await getDockerInfo();

  console.log(dockerInfo)

  return {
    cpuTemp,
    cpuUsage,
    memoryUsage: memUsage,
  };
}
