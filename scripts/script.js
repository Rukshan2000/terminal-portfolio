const input = document.getElementById('commandInput');
const output = document.getElementById('output');
const currentDir = document.getElementById('currentDir');
const weatherModal = document.getElementById('weatherModal');
const musicModal = document.getElementById('musicModal');
const skillVisualModal = document.getElementById('skillVisualModal');
const matrixBackground = document.getElementById('matrix-background');
const bootLogs = document.getElementById('boot-logs');
const bootProgress = document.getElementById('boot-progress');
const bootSequence = document.getElementById('bootSequence');
const systemStats = document.getElementById('system-stats');

let currentPath = "~/portfolio";

// Terminal history
let history = [];
let historyIndex = -1;

// Terminal state
let matrixMode = false;
let currentTheme = "green";

// File system
const fileSystem = {
  "~/portfolio": {
    "about.txt": `[PERSONAL INFO]
Name: Rukshan Tharindu
Role: Senior Frontend Developer
Location: Colombo, Sri Lanka 🇱🇰
Experience: 5+ years in web development

[BACKGROUND]
I specialize in building modern web applications with a focus on performance and user experience. 
My journey began with vanilla JavaScript and jQuery, but I quickly transitioned to React and have
been exploring the ecosystem ever since.

I'm passionate about creating tools that solve real problems while maintaining clean, maintainable code.
Currently working at AtmoTechnologies where I lead frontend development for enterprise applications.

[EDUCATION]
- B.Sc. Computer Science (2018) - University of Colon
- Certified AWS Solutions Architect
- React Advanced Certification`,

    "skills.txt": `[TECHNICAL SKILLS]
├── Frontend
│   ├── React/Next.js (Advanced)
│   ├── TypeScript (Advanced)
│   ├── Tailwind CSS (Advanced)
│   ├── Redux/Context API (Advanced)
│   ├── React Query (Intermediate)
│   └── Vue.js (Basic)
├── Backend
│   ├── Node.js/Express (Intermediate)
│   ├── Firebase (Advanced)
│   └── RESTful API Design (Advanced)
├── Database
│   ├── MongoDB (Intermediate)
│   ├── Firestore (Advanced)
│   └── MySQL (Basic)
├── DevOps
│   ├── Docker (Intermediate)
│   ├── CI/CD Pipelines (Basic)
│   └── AWS (Intermediate)
└── Tools
├── Git/GitHub (Advanced)
├── Figma (Intermediate)
├── Jira (Advanced)
└── Webpack/Vite (Intermediate)`,

    "projects.txt": `[MAJOR PROJECTS]

1. AtmoHRM 📊
Role: Lead Frontend Developer
Stack: React, TypeScript, Tailwind CSS, Firebase
Description: A comprehensive HR management system handling employee 
records, payroll, leave management, and performance evaluations.
Features: Real-time updates, PDF reporting, role-based access control

2. PosMaster 💸
Role: Full Stack Developer
Stack: Next.js, Firebase, Electron
Description: Point of sale system with inventory management, sales 
analytics, and AI-powered sales predictions.
Features: Offline support, barcode scanning, receipt printing

3. BookingBuddy 📅
Role: Frontend Developer
Stack: React Native, Redux, Node.js
Description: A mobile app for scheduling and managing appointments 
across multiple service providers.
Features: Push notifications, in-app payments, calendar sync

4. SinhalaFM 📻
Role: Solo Developer
Stack: React, Tailwind, Electron
Description: A desktop application for streaming Sinhala radio stations
with recording capabilities.
Features: Station favorites, scheduled recording, custom equalizer

5. ChatBridge 💬
Role: Lead Developer
Stack: React, Socket.IO, MongoDB
Description: Real-time messaging platform with channels, direct messages,
and file sharing capabilities.
Features: End-to-end encryption, voice messages, message reactions`,

    "contact.txt": `[CONTACT INFORMATION]
└── Email: rukshan@atmotech.lk
└── Phone: +94 71 234 5678
└── Location: Colombo, Sri Lanka 🇱🇰

[SOCIAL MEDIA]
└── LinkedIn: linkedin.com/in/rukshandev
└── GitHub: github.com/rukshan-dev
└── Twitter: twitter.com/rukshan_dev
└── Website: rukshandev.com

[AVAILABILITY]
Currently available for freelance projects and consulting.
Open to discussing full-time remote opportunities.

Feel free to reach out through any of these channels!
I typically respond within 24 hours on weekdays.`,

    "certificates.txt": `[PROFESSIONAL CERTIFICATIONS]
├── AWS Certified Solutions Architect (2023)
├── Meta Frontend Developer Professional Certificate (2022)
├── MongoDB Certified Developer (2022)
├── Google Cloud Platform Fundamentals (2021)
├── React Advanced Patterns Workshop Certificate (2021)
├── Certified Scrum Master (2020)
└── Firebase Expert Certification (2019)

[COURSES COMPLETED]
├── Advanced TypeScript Design Patterns
├── Testing React Applications with Jest & React Testing Library
├── State Management with Redux Toolkit
├── Performance Optimization in React
└── Advanced CSS and Sass`
  }
};

// Boot sequence logs
const bootMessages = [
  "Loading system kernel...",
  "Initializing hardware interfaces...",
  "Loading network services...",
  "Starting security protocols...",
  "Loading file system...",
  "Establishing secure connection...",
  "Checking system integrity...",
  "Initializing command interface...",
  "System boot complete..."
];

// Simulate boot sequence
function simulateBoot() {
  bootProgress.style.width = "0%";
  
  let messageIndex = 0;
  let progress = 0;
  
  const bootInterval = setInterval(() => {
    if (messageIndex < bootMessages.length) {
      const log = document.createElement('div');
      log.className = 'text-xs text-gray-400';
      log.innerHTML = `[<span class="text-blue-400">SYSTEM</span>] ${bootMessages[messageIndex]}`;
      bootLogs.appendChild(log);
      messageIndex++;
      
      progress = (messageIndex / bootMessages.length) * 100;
      bootProgress.style.width = `${progress}%`;
    } else {
      clearInterval(bootInterval);
      setTimeout(() => {
        bootSequence.style.display = 'none';
        updateSystemStats();
        setInterval(updateSystemStats, 3000);
      }, 500);
    }
  }, 400);
}

// Update system stats
function updateSystemStats() {
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

// Matrix code rain effect
function createMatrixRain() {
  matrixBackground.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  matrixBackground.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
  const columns = canvas.width / 15;
  const drops = [];
  
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -100);
  }
  
  function draw() {
    if (!matrixMode) return;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = '15px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = characters[Math.floor(Math.random() * characters.length)];
      ctx.fillText(text, i * 15, drops[i] * 15);
      
      if (drops[i] * 15 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      drops[i]++;
    }
    
    setTimeout(() => requestAnimationFrame(draw), 33);
  }
  
  draw();
}

// Change theme color
function changeTheme(color) {
  const root = document.documentElement;
  
  const themes = {
    "green": { text: "text-green-500", neon: "#39FF14" },
    "blue": { text: "text-blue-500", neon: "#00BFFF" },
    "cyan": { text: "text-cyan-500", neon: "#00FFFF" },
    "purple": { text: "text-purple-500", neon: "#BF00FF" },
    "red": { text: "text-red-500", neon: "#FF0000" }
  };
  
  if (!themes[color]) {
    showInOutput(`<span class="text-red-500">Invalid theme color. Available: green, blue, cyan, purple, red</span>`, 'mb-4');
    return;
  }
  
  currentTheme = color;
  
  document.querySelectorAll('.text-green-500').forEach(el => {
    el.classList.remove('text-green-500');
    el.classList.add(themes[color].text);
  });
  
  // Update terminal glow
  document.querySelectorAll('.terminal-glow').forEach(el => {
    el.style.boxShadow = `0 0 10px ${themes[color].neon}, 0 0 20px rgba(0, 0, 0, 0.5)`;
  });
  
  showInOutput(`<span class="${themes[color].text}">Theme changed to ${color}</span>`, 'mb-4');
}

// Toggle matrix mode
function toggleMatrixMode() {
  matrixMode = !matrixMode;
  
  if (matrixMode) {
    matrixBackground.classList.remove('opacity-20');
    matrixBackground.classList.add('opacity-70');
    createMatrixRain();
    showInOutput(`<span class="text-green-500">Matrix mode activated. Press 'Esc' key to exit.</span>`, 'mb-4');
  } else {
    matrixBackground.classList.remove('opacity-70');
    matrixBackground.classList.add('opacity-20');
    showInOutput(`<span class="text-green-500">Matrix mode deactivated.</span>`, 'mb-4');
  }
}

function showInOutput(text, className = '') {
  const element = document.createElement('div');
  element.className = className;
  element.innerHTML = text;
  output.appendChild(element);
  window.scrollTo(0, document.body.scrollHeight);
}

function executeCommand(cmd) {
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
      const dirPath = currentPath;
      if (fileSystem[dirPath]) {
        const files = Object.keys(fileSystem[dirPath]);
        showInOutput(`<div class="grid grid-cols-3 gap-2 text-blue-300">
          ${files.map(file => `<div><i class="fa fa-file-text mr-2"></i>${file}</div>`).join('')}
        </div>`, 'mb-4');
      } else {
        showInOutput('<span class="text-red-500">ls: Directory not found</span>', 'mb-4');
      }
      break;
      
    case 'cat':
      if (args.length < 2) {
        showInOutput('<span class="text-red-500">cat: Missing filename</span>', 'mb-4');
        break;
      }
      const filename = args[1];
      const dir = fileSystem[currentPath];
      if (dir && dir[filename]) {
        showInOutput(`<pre class="whitespace-pre-wrap text-gray-200">${dir[filename]}</pre>`, 'mb-4 p-2 bg-gray-900 rounded');
      } else {
        showInOutput(`<span class="text-red-500">cat: ${filename}: No such file</span>`, 'mb-4');
      }
      break;
      
    case 'cd':
      if (args.length < 2) {
        showInOutput('<span class="text-yellow-400">No directory specified. Available: ~/portfolio</span>', 'mb-4');
        break;
      }
      const targetDir = args[1];
      if (targetDir === "~" || targetDir === "~/portfolio") {
        currentPath = "~/portfolio";
        currentDir.textContent = currentPath;
      } else {
        showInOutput(`<span class="text-red-500">cd: ${targetDir}: No such directory</span>`, 'mb-4');
      }
      break;
      
    case 'clear':
      output.innerHTML = '';
      break;
      
    case 'whoami':
      showInOutput(`<div class="flex items-start mb-4">
        <div class="bg-gray-800 p-4 rounded w-full">
          <div class="text-white font-bold text-lg mb-2">Rukshan Tharindu</div>
          <div class="text-gray-300 mb-1">Senior Frontend Developer @ AtmoTechnologies</div>
          <div class="text-gray-400 text-sm mb-2">Colombo, Sri Lanka 🇱🇰</div>
          <div class="text-gray-300 text-sm">
            5+ years building modern web applications with React, TypeScript and Firebase
          </div>
        </div>
      </div>`, '');
      break;
      
    case 'projects':
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
      break;
      
    case 'skills':
      const content = fileSystem["~/portfolio"]["skills.txt"];
      showInOutput(`<pre class="whitespace-pre-wrap text-green-300">${content}</pre>`, 'mb-4 p-2 bg-gray-900 rounded');
      // Also show skills visualization modal
      skillVisualModal.classList.remove('hidden');
      break;
      
    case 'contact':
      const contactInfo = fileSystem["~/portfolio"]["contact.txt"];
      showInOutput(`<pre class="whitespace-pre-wrap text-blue-200">${contactInfo}</pre>`, 'mb-4 p-2 bg-gray-900 rounded');
      break;
      
    case 'help':
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
      break;
      
    case 'exit':
      showInOutput(`<span class="text-gray-400">Closing terminal session...</span>`, 'mb-2');
      setTimeout(() => {
        showInOutput(`<span class="text-red-500">Connection terminated.</span>`, 'mb-4');
      }, 1000);
      break;
      
    case 'nmap':
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
      break;
      
    case 'ifconfig':
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
      break;
      
    // New commands for modal features
    case 'weather':
      weatherModal.classList.remove('hidden');
      showInOutput(`<span class="text-blue-400">Opening weather information...</span>`, 'mb-4');
      break;
      
    case 'music':
      musicModal.classList.remove('hidden');
      showInOutput(`<span class="text-green-400">Opening music player...</span>`, 'mb-4');
      break;
      
    case 'matrix':
      toggleMatrixMode();
      break;
      
    case 'theme':
      if (args.length < 2) {
        showInOutput(`<span class="text-yellow-400">Current theme: ${currentTheme}. Usage: theme [color]</span>`, 'mb-4');
        break;
      }
      changeTheme(args[1].toLowerCase());
      break;
      
    default:
      const dateTime = new Date().toISOString().replace('T', ' ').slice(0, 19);
      showInOutput(`<span class="text-red-500">Command not found: ${command}</span>
      <br><span class="text-gray-500">[${dateTime}] Use 'help' to see available commands</span>`, 'mb-4');
  }
}

// Handle input submission
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const command = input.value.trim();
    executeCommand(command);
    input.value = '';
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      input.value = '';
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    
    // Simple tab completion
    const inputVal = input.value.trim();
    const files = Object.keys(fileSystem["~/portfolio"]);
    const commands = ["ls", "cat", "cd", "clear", "whoami", "projects", "skills", "contact", 
                    "help", "exit", "nmap", "ifconfig", "weather", "music", "matrix", "theme"];
    
    // Complete filename for cat command
    if (inputVal.startsWith("cat ")) {
      const partial = inputVal.substring(4);
      const match = files.find(file => file.startsWith(partial));
      if (match) {
        input.value = `cat ${match}`;
      }
    } 
    // Complete command
    else {
      const match = commands.find(cmd => cmd.startsWith(inputVal));
      if (match) {
        input.value = match;
      }
    }
  } else if (e.key === 'Escape' && matrixMode) {
    toggleMatrixMode();
  }
});

// Auto-focus the input when clicking anywhere in the terminal
document.getElementById('terminal').addEventListener('click', function() {
  input.focus();
});

// Handle modal close buttons
document.getElementById('closeWeather').addEventListener('click', function() {
  weatherModal.classList.add('hidden');
});

document.getElementById('closeMusic').addEventListener('click', function() {
  musicModal.classList.add('hidden');
});

document.getElementById('closeSkillVisual').addEventListener('click', function() {
  skillVisualModal.classList.add('hidden');
});

// Window resize handler for matrix background
window.addEventListener('resize', function() {
  if (matrixMode) {
    createMatrixRain();
  }
});

// Simulate typing and executing basic commands on load
const commands = ['ls', 'whoami'];
let cmdIndex = 0;

// Start boot sequence
simulateBoot();

// Wait for boot to complete before showing commands
setTimeout(() => {
  const typeCommand = () => {
    if (cmdIndex < commands.length) {
      const cmd = commands[cmdIndex];
      let charIndex = 0;
      
      const typeChar = () => {
        if (charIndex < cmd.length) {
          input.value += cmd[charIndex];
          charIndex++;
          setTimeout(typeChar, 100);
        } else {
          setTimeout(() => {
            executeCommand(cmd);
            input.value = '';
            cmdIndex++;
            setTimeout(typeCommand, 1000);
          }, 500);
        }
      };
      
      typeChar();
    }
  };
  
  typeCommand();
}, 5000);

function addRadarBlip() {
  const radar = document.querySelector('.radar-background');
  
  // Random position within radar (polar coordinates for better distribution)
  const angle = Math.random() * Math.PI * 2; // 0 to 2π
  const distance = Math.random() * 0.9; // 0 to 90% of radius (to keep within radar)
  
  // Convert to Cartesian coordinates
  const x = 50 + Math.cos(angle) * distance * 50; // 50% + x offset
  const y = 50 + Math.sin(angle) * distance * 50; // 50% + y offset
  
  // Create blip element
  const blip = document.createElement('div');
  blip.className = 'blip';
  blip.style.left = `${x}%`;
  blip.style.top = `${y}%`;
  radar.appendChild(blip);
  
  // Remove blip after animation completes
  setTimeout(() => {
      radar.removeChild(blip);
  }, 3000);
}