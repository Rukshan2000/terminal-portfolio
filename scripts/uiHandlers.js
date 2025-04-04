import { DOM } from './constants.js';
import { fileSystem } from './fileSystem.js';
import { history, historyIndex, matrixMode } from './state.js';
import { executeCommand, showInOutput } from './commandHandlers.js';
import { toggleMatrixMode } from './matrixEffect.js';

export function setupEventListeners() {
  // Handle input submission
  DOM.input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const command = DOM.input.value.trim();
      executeCommand(command);
      DOM.input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        DOM.input.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        DOM.input.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        DOM.input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === 'Escape' && matrixMode) {
      toggleMatrixMode();
    }
  });

  // Auto-focus the input when clicking anywhere in the terminal
  DOM.terminal.addEventListener('click', function() {
    DOM.input.focus();
  });

  // Handle modal close buttons
  document.getElementById('closeWeather').addEventListener('click', function() {
    DOM.weatherModal.classList.add('hidden');
  });

  document.getElementById('closeMusic').addEventListener('click', function() {
    DOM.musicModal.classList.add('hidden');
  });

  document.getElementById('closeSkillVisual').addEventListener('click', function() {
    DOM.skillVisualModal.classList.add('hidden');
  });

  // Window resize handler for matrix background
  window.addEventListener('resize', function() {
    if (matrixMode) {
      createMatrixRain();
    }
  });
}

function handleTabCompletion() {
  const inputVal = DOM.input.value.trim();
  const files = Object.keys(fileSystem["~/portfolio"]);
  const commands = ["ls", "cat", "cd", "clear", "whoami", "projects", "skills", "contact", 
                  "help", "exit", "nmap", "ifconfig", "weather", "music", "matrix", "theme"];
  
  // Complete filename for cat command
  if (inputVal.startsWith("cat ")) {
    const partial = inputVal.substring(4);
    const match = files.find(file => file.startsWith(partial));
    if (match) {
      DOM.input.value = `cat ${match}`;
    }
  } 
  // Complete command
  else {
    const match = commands.find(cmd => cmd.startsWith(inputVal));
    if (match) {
      DOM.input.value = match;
    }
  }
}

export function simulateTyping() {
  const commands = ['ls', 'whoami'];
  let cmdIndex = 0;

  const typeCommand = () => {
    if (cmdIndex < commands.length) {
      const cmd = commands[cmdIndex];
      let charIndex = 0;
      
      const typeChar = () => {
        if (charIndex < cmd.length) {
          DOM.input.value += cmd[charIndex];
          charIndex++;
          setTimeout(typeChar, 100);
        } else {
          setTimeout(() => {
            executeCommand(cmd);
            DOM.input.value = '';
            cmdIndex++;
            setTimeout(typeCommand, 1000);
          }, 500);
        }
      };
      
      typeChar();
    }
  };
  
  setTimeout(typeCommand, 5000);
}