import { setupUIHandlers } from './ui.js';
import { setupCustomLanguageHandlers } from './language-handlers.js';
import { handleModeChange } from './mode-handler.js';  
import { getUIElements } from './ui-elements.js';  

// hljs is loaded globally from the CDN included in index.html

document.addEventListener('DOMContentLoaded', async () => {
  // Use the global hljs loaded from the CDN
  const hljs = window.hljs;
  
  const room = new WebsimSocket();
  const elements = getUIElements();  
  await setupUIHandlers(room);
  await setupCustomLanguageHandlers(room);

  // Default to generator mode on page load
  setTimeout(() => handleModeChange({target:{value: "generator"}}, elements), 250);
});
