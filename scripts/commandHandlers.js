import { DOM } from './constants.js';
import { fileSystem } from './fileSystem.js';
import { currentPath, history, historyIndex, matrixMode, currentTheme } from './state.js';
import { toggleMatrixMode } from './matrixEffect.js';
import { changeTheme } from './themeManager.js';

export function showInOutput(text, className = '') {
  const element = document.createElement('div');
  element.className = className;
  element.innerHTML = text;
  DOM.output.appendChild(element);
  window.scrollTo(0, document.body.scrollHeight);
}

export function executeCommand(cmd) {
  const args = cmd.split(' ');
  const command = args[0].toLowerCase();
  
  // Add to history
  if (cmd.trim() !== '') {
    history.push(cmd);
    historyIndex = history.length;
  }
  
  showInOutput(`<span class="text-green-400">┌──(</span><span class="text-red-500">root💀rukshan</span><span class="text-green-400">)-[</span><span class="text-blue-400">${currentPath}</span><span class="text-green-400">]</span>
  <br><span class="text-green-400">└─# </span>${cmd}`, 'mb-2');
  
  switch (command) {
    case 'ls':
      handleLsCommand();
      break;
      
    case 'cat':
      handleCatCommand(args);
      break;
      
    case 'cd':
      handleCdCommand(args);
      break;
      
    case 'clear':
      DOM.output.innerHTML = '';
      break;
      
    case 'whoami':
      handleWhoamiCommand();
      break;
      
    case 'projects':
      handleProjectsCommand();
      break;
      
    case 'skills':
      handleSkillsCommand();
      break;
      
    case 'contact':
      handleContactCommand();
      break;
      
    case 'help':
      handleHelpCommand();
      break;
      
    case 'exit':
      handleExitCommand();
      break;
      
    case 'nmap':
      handleNmapCommand();
      break;
      
    case 'ifconfig':
      handleIfconfigCommand();
      break;
      
    case 'weather':
      DOM.weatherModal.classList.remove('hidden');
      showInOutput(`<span class="text-blue-400">Opening weather information...</span>`, 'mb-4');
      break;
      
    case 'music':
      DOM.musicModal.classList.remove('hidden');
      showInOutput(`<span class="text-green-400">Opening music player...</span>`, 'mb-4');
      break;
      
    case 'matrix':
      toggleMatrixMode();
      break;
      
    case 'theme':
      handleThemeCommand(args);
      break;
      
    default:
      handleUnknownCommand(command);
  }
}

// Individual command handlers
function handleLsCommand() {
  const dirPath = currentPath;
  if (fileSystem[dirPath]) {
    const files = Object.keys(fileSystem[dirPath]);
    showInOutput(`<div class="grid grid-cols-3 gap-2 text-blue-300">
      ${files.map(file => `<div><i class="fa fa-file-text mr-2"></i>${file}</div>`).join('')}
    </div>`, 'mb-4');
  } else {
    showInOutput('<span class="text-red-500">ls: Directory not found</span>', 'mb-4');
  }
}

function handleCatCommand(args) {
    if (args.length < 2) {
      showInOutput('<span class="text-red-500">cat: Missing filename</span>', 'mb-4');
      return;
    }
    const filename = args[1];
    const dir = fileSystem[currentPath];
    if (dir && dir[filename]) {
      showInOutput(`<pre class="whitespace-pre-wrap text-gray-200">${dir[filename]}</pre>`, 'mb-4 p-2 bg-gray-900 rounded');
    } else {
      showInOutput(`<span class="text-red-500">cat: ${filename}: No such file</span>`, 'mb-4');
    }
  }
  

function handleCdCommand(args) {
  if (args.length < 2) {
    showInOutput('<span class="text-yellow-400">No directory specified. Available: ~/portfolio</span>', 'mb-4');
    return;
  }
  const targetDir = args[1];
  if (targetDir === "~" || targetDir === "~/portfolio") {
    currentPath = "~/portfolio";
    DOM.currentDir.textContent = currentPath;
  } else {
    showInOutput(`<span class="text-red-500">cd: ${targetDir}: No such directory</span>`, 'mb-4');
  }
}


function handleWhoamiCommand() {
  showInOutput(`<div class="flex items-start mb-4">
    <div class="bg-gray-800 p-4 rounded w-full">
      <div class="text-white font-bold text-lg mb-2">Rukshan Tharindu</div>
      <div class="text-gray-300 mb-1">Associate Software Engineer @ BreadCrumbs-Innovations</div>
      <div class="text-gray-400 text-sm mb-2">Colombo, Sri Lanka 🇱🇰</div>
      <div class="text-gray-300 text-sm">
        5+ years building modern web applications with React, TypeScript and Firebase
      </div>
    </div>
  </div>`, '');
}

function handleProjectsCommand() {
  showInOutput(`<div class="text-cyan-400 mb-1 font-bold">PROJECT LIST:</div>`, '');
  Object.values(fileSystem["~/portfolio"]).forEach(file => {
    if (file.includes('[MAJOR PROJECTS]')) {
      const projects = file.split('\n\n').slice(1);
      projects.forEach(project => {
        const [name, ...details] = project.split('\n');
        if (name.trim()) {
          showInOutput(`<div class="mb-3 p-2 bg-gray-900 rounded">
            <div class="text-yellow-400 font-bold">${name}</div>
            ${details.map(line => `<div class="text-gray-300 text-sm">${line.trim()}</div>`).join('')}
          </div>`, '');
        }
      });
    }
  });
}

function handleSkillsCommand() {
  const content = fileSystem["~/portfolio"]["skills.txt"];
  showInOutput(`<pre class="whitespace-pre-wrap text-green-300">${content}</pre>`, 'mb-4 p-2 bg-gray-900 rounded');
  DOM.skillVisualModal.classList.remove('hidden');
}

function handleContactCommand() {
  const contactInfo = fileSystem["~/portfolio"]["contact.txt"];
  showInOutput(`<pre class="whitespace-pre-wrap text-blue-200">${contactInfo}</pre>`, 'mb-4 p-2 bg-gray-900 rounded');
}

function handleHelpCommand() {
  showInOutput(`<div class="text-cyan-400 mb-2 font-bold">AVAILABLE COMMANDS:</div>
  <div class="grid grid-cols-2 gap-1 text-sm">
    <div><span class="text-yellow-400">ls</span> - List available files</div>
    <div><span class="text-yellow-400">cat [filename]</span> - View file content</div>
    <div><span class="text-yellow-400">cd [directory]</span> - Change directory</div>
    <div><span class="text-yellow-400">whoami</span> - Display developer info</div>
    <div><span class="text-yellow-400">projects</span> - View project list</div>
    <div><span class="text-yellow-400">skills</span> - View technical skills</div>
    <div><span class="text-yellow-400">contact</span> - Show contact details</div>
    <div><span class="text-yellow-400">clear</span> - Clear terminal</div>
    <div><span class="text-yellow-400">help</span> - Show this help message</div>
    <div><span class="text-yellow-400">exit</span> - Close terminal</div>
    <div><span class="text-yellow-400">nmap</span> - Network scan simulation</div>
    <div><span class="text-yellow-400">ifconfig</span> - Network interface info</div>
    <div><span class="text-yellow-400">weather</span> - Show weather widget</div>
    <div><span class="text-yellow-400">music</span> - Show music player</div>
    <div><span class="text-yellow-400">matrix</span> - Toggle Matrix screensaver</div>
    <div><span class="text-yellow-400">theme [color]</span> - Change theme color</div>
  </div>`, 'mb-4');
}

function handleExitCommand() {
  showInOutput(`<span class="text-gray-400">Closing terminal session...</span>`, 'mb-2');
  setTimeout(() => {
    showInOutput(`<span class="text-red-500">Connection terminated.</span>`, 'mb-4');
  }, 1000);
}

function handleNmapCommand() {
  showInOutput(`<div class="text-green-400 font-bold">Starting Nmap 7.94 scan...</div>
  <pre class="text-sm text-gray-400">
Nmap scan report for portfolio.local (192.168.1.75)
Host is up (0.0032s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE      VERSION
22/tcp   open  ssh          OpenSSH 8.9p1
80/tcp   open  http         nginx 1.23.4
443/tcp  open  https        nginx 1.23.4
8080/tcp open  http-proxy   Node.js Express 4.18.2
  </pre>`, 'mb-4 p-2 bg-gray-900 rounded');
}

function handleIfconfigCommand() {
  showInOutput(`<pre class="text-sm text-gray-300">
eth0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500
  inet 192.168.1.75  netmask 255.255.255.0  broadcast 192.168.1.255
  inet6 fe80::215:5dff:fe32:845  prefixlen 64  scopeid 0x20
  ether 00:15:5d:32:08:45  txqueuelen 1000  (Ethernet)
  RX packets 95427  bytes 138259745 (131.8 MiB)
  RX errors 0  dropped 0  overruns 0  frame 0
  TX packets 25599  bytes 1766935 (1.6 MiB)
  TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlan0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500
  inet 10.0.0.123  netmask 255.255.255.0  broadcast 10.0.0.255
  inet6 fe80::9a4d:5eff:fe3b:d05  prefixlen 64  scopeid 0x20
  ether 98:4d:5e:3b:0d:05  txqueuelen 1000  (Ethernet)
  RX packets 1435  bytes 127583 (124.5 KiB)
  RX errors 0  dropped 0  overruns 0  frame 0
  TX packets 187  bytes 32845 (32.0 KiB)
  TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
  </pre>`, 'mb-4 p-2 bg-gray-900 rounded');
}

function handleThemeCommand(args) {
  if (args.length < 2) {
    showInOutput(`<span class="text-yellow-400">Current theme: ${currentTheme}. Usage: theme [color]</span>`, 'mb-4');
    return;
  }
  changeTheme(args[1].toLowerCase());
}

function handleUnknownCommand(command) {
  const dateTime = new Date().toISOString().replace('T', ' ').slice(0, 19);
  showInOutput(`<span class="text-red-500">Command not found: ${command}</span>
  <br><span class="text-gray-500">[${dateTime}] Use 'help' to see available commands</span>`, 'mb-4');
}