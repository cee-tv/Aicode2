import { MODES } from './modes-config.js';
import { updateUIForMode } from './ui.js';
import { displayResult } from './ui.js';

// Handle execute button click
export async function handleExecute(elements) {
  const modeKey = elements.modeOptions.value;
  const modeConfig = MODES[modeKey];
  const description = elements.description.value;
  let toneValue = elements.tone ? elements.tone.value : 'professional';
  const customToneField = document.getElementById('customTone');

  if (toneValue === 'custom' && customToneField) {
    toneValue = customToneField.value.trim();
    if (!toneValue) {
      elements.output.textContent = `Please provide a custom tone.`;
      return;
    }
  }

  if (!description.trim()) {
    elements.output.textContent = `Please provide ${modeConfig.descriptionLabel.toLowerCase()}`;
    return;
  }

  elements.execute.classList.add('loading');
  elements.output.textContent = `${modeConfig.loadingText}...`;

  try {
    const parameters = modeConfig.parameters(elements);
    if (modeConfig.options?.includes('tone')) {
      // Find the correct index to replace based on the handler function parameters
      const handlerName = modeConfig.handler.name;
      
      switch (handlerName) {
        case 'generateCode':
          parameters[2] = toneValue; // tone is 3rd parameter
          break;
        case 'explainCode':
        case 'reviewCode':
          parameters[2] = toneValue; // add tone as 3rd parameter 
          break;
        case 'commentCode':
          parameters[4] = toneValue; // tone is 5th parameter
          break;
        case 'convertCode':
          parameters[4] = toneValue; // tone is 5th parameter
          break;
      }
    }
    
    const result = await modeConfig.handler(...parameters);
    
    // Check if result is a string - if it's an error object with rawResponse, use that
    if (typeof result === 'object' && result.rawResponse) {
      displayResult(result.rawResponse, elements.language.value, modeKey, elements);
    } else {
      displayResult(result, elements.language.value, modeKey, elements);
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.rawResponse) {
      displayResult(error.rawResponse, elements.language.value, modeKey, elements);
    } else {
      elements.output.textContent = error.message || "An error occurred. Please try again or modify your request.";
    }
  } finally {
    elements.execute.classList.remove('loading');
  }
}
