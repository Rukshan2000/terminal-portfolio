import { DOM } from './constants.js';
import { matrixMode } from './state.js';

export function createMatrixRain() {
  DOM.matrixBackground.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  DOM.matrixBackground.appendChild(canvas);
  
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