// DOM Elements
export const DOM = {
    input: document.getElementById('commandInput'),
    output: document.getElementById('output'),
    currentDir: document.getElementById('currentDir'),
    weatherModal: document.getElementById('weatherModal'),
    musicModal: document.getElementById('musicModal'),
    skillVisualModal: document.getElementById('skillVisualModal'),
    matrixBackground: document.getElementById('matrix-background'),
    bootLogs: document.getElementById('boot-logs'),
    bootProgress: document.getElementById('boot-progress'),
    bootSequence: document.getElementById('bootSequence'),
    systemStats: document.getElementById('system-stats'),
    terminal: document.getElementById('terminal')
  };
  
  // Boot sequence messages
  export const BOOT_MESSAGES = [
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
  
  // Theme colors
  export const THEMES = {
    "green": { text: "text-green-500", neon: "#39FF14" },
    "blue": { text: "text-blue-500", neon: "#00BFFF" },
    "cyan": { text: "text-cyan-500", neon: "#00FFFF" },
    "purple": { text: "text-purple-500", neon: "#BF00FF" },
    "red": { text: "text-red-500", neon: "#FF0000" }
  };