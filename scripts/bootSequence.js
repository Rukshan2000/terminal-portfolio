import { DOM, BOOT_MESSAGES } from './constants.js';

export function simulateBoot() {
  DOM.bootProgress.style.width = "0%";
  
  let messageIndex = 0;
  let progress = 0;
  
  const bootInterval = setInterval(() => {
    if (messageIndex < BOOT_MESSAGES.length) {
      const log = document.createElement('div');
      log.className = 'text-xs text-gray-400';
      log.innerHTML = `[<span class="text-blue-400">SYSTEM</span>] ${BOOT_MESSAGES[messageIndex]}`;
      DOM.bootLogs.appendChild(log);
      messageIndex++;
      
      progress = (messageIndex / BOOT_MESSAGES.length) * 100;
      DOM.bootProgress.style.width = `${progress}%`;
    } else {
      clearInterval(bootInterval);
      setTimeout(() => {
        DOM.bootSequence.style.display = 'none';
        updateSystemStats();
        setInterval(updateSystemStats, 3000);
      }, 500);
    }
  }, 400);
}

export function updateSystemStats() {
  const cpuUsage = Math.floor(Math.random() * 15) + 5;
  const ramUsed = (Math.random() * 2 + 1).toFixed(1);
  const processes = Math.floor(Math.random() * 50) + 100;
  
  // Get uptime
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  document.getElementById('cpu-usage').textContent = `${cpuUsage}%`;
  document.getElementById('ram-usage').textContent = `${ramUsed}GB/8GB`;
  document.getElementById('processes').textContent = processes;
  document.getElementById('uptime').textContent = `${hours}:${minutes}:${seconds}`;
}