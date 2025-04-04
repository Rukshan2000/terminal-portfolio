import { THEMES } from './constants.js';
import { currentTheme } from './state.js';

export function changeTheme(color) {
  const root = document.documentElement;
  
  if (!THEMES[color]) {
    showInOutput(`<span class="text-red-500">Invalid theme color. Available: green, blue, cyan, purple, red</span>`, 'mb-4');
    return;
  }
  
  currentTheme = color;
  
  document.querySelectorAll('.text-green-500').forEach(el => {
    el.classList.remove('text-green-500');
    el.classList.add(THEMES[color].text);
  });
  
  // Update terminal glow
  document.querySelectorAll('.terminal-glow').forEach(el => {
    el.style.boxShadow = `0 0 10px ${THEMES[color].neon}, 0 0 20px rgba(0, 0, 0, 0.5)`;
  });
  
  showInOutput(`<span class="${THEMES[color].text}">Theme changed to ${color}</span>`, 'mb-4');
}