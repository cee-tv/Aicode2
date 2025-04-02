// Centralizes UI element references
export function getUIElements() {
  return {
    execute: document.getElementById('execute'),
    output: document.getElementById('output'),
    language: document.getElementById('language'),
    description: document.getElementById('description'),
    tone: document.getElementById('tone'),
    mode: document.getElementById('mode'),
    includeExplanation: document.getElementById('includeExplanation'),
    modeOptions: document.getElementById('modeOptions'),
    titleText: document.getElementById('titleText'),
    descriptionLabel: document.getElementById('descriptionLabel'),
    commentMode: document.getElementById('commentMode'),
    commentSpecificity: document.getElementById('commentSpecificity'),
    body: document.body,
    container: document.querySelector('.container'),
    subtitle: document.querySelector('.subtitle'),
    labels: document.querySelectorAll('label'),
    selectsAndTextareas: document.querySelectorAll('select, textarea'),
    checkbox: document.querySelector('.checkbox-group input[type="checkbox"]'),
    modeSwitch: document.querySelector('.mode-switch'),
    customLanguageInputEl: document.querySelector('.custom-language-input input'),
    copyButton: document.querySelector('.copy-button'),
    customToneInputEl: document.querySelector('#customToneInput input'),
    targetLanguage: document.getElementById('targetLanguage'),
    optimizerMode: document.getElementById('optimizerMode')
  };
}

// Handles custom tone input logic
export function setupToneHandlers(elements) {
  const toneSelect = elements.tone;
  const customToneInput = document.getElementById('customToneInput');
  const customToneField = document.getElementById('customTone');

  toneSelect.addEventListener('change', (e) => {
    if (e.target.value === 'custom') {
      customToneInput.classList.remove('hidden');
      customToneField.focus();
    } else {
      customToneInput.classList.add('hidden');
    }
  });
}