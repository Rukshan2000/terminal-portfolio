import { simulateBoot } from './bootSequence.js';
import { setupEventListeners, simulateTyping } from './uiHandlers.js';

// Start boot sequence
simulateBoot();

// Setup event listeners
setupEventListeners();

// Simulate typing commands after boot
simulateTyping();