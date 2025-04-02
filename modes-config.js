import { generateCode, explainCode, reviewCode, commentCode, convertCode, optimizeCode } from './codegen.js';

export const MODES = {
  generator: {
    title: "Generator",
    executeName: "Generate",
    loadingText: "Generating code...",
    handler: generateCode,
    options: ['tone', 'mode', 'includeExplanation'],
    parameters: (elements) => ([
      elements.language.value,
      elements.description.value,
      elements.tone.value,
      elements.mode.value,
      elements.includeExplanation.checked
    ]),
    descriptionLabel: "Description of Code to Generate/Modify:",
    placeholder: "Describe what you want the code to do..."
  },
  explainer: {
    title: "Explainer",
    executeName: "Analyze",
    loadingText: "Analyzing code...",
    handler: explainCode,
    options: ['tone'],
    parameters: (elements) => ([
      elements.language.value,
      elements.description.value,
      elements.tone.value
    ]),
    descriptionLabel: "Code to explain:",
    placeholder: "Paste the code you want to explain..."
  },
  reviewer: {
    title: "Reviewer",
    executeName: "Review",
    loadingText: "Reviewing code...",
    handler: reviewCode,
    options: ['tone'],
    parameters: (elements) => ([
      elements.language.value,
      elements.description.value,
      elements.tone.value
    ]),
    descriptionLabel: "Code to review:",
    placeholder: "Paste the code you want to review..."
  },
  commenter: {
    title: "Commenter",
    executeName: "Comment",
    loadingText: "Adding comments...",
    handler: commentCode,
    options: ['tone', 'commentMode', 'commentSpecificity'],
    parameters: (elements) => ([
      elements.language.value,
      elements.description.value,
      elements.commentMode.value,
      elements.commentSpecificity.value,
      elements.tone.value
    ]),
    descriptionLabel: "Code to comment:",
    placeholder: "Paste the code you want to comment..."
  },
  converter: {
    title: "Converter",
    executeName: "Convert",
    loadingText: "Converting code...",
    handler: async (...params) => {
      const result = await convertCode(...params);
      // Combine code and explanation into HTML string
      return `
        ${result.explanation || 'Code converted successfully'}
        <h3>Converted Code</h3>
        <pre><code class="language-${params[1]}">${result.code}</code></pre>
      `;
    },
    options: ['tone', 'targetLanguage', 'includeExplanation'],
    parameters: (elements) => ([
      elements.language.value,
      elements.targetLanguage.value,
      elements.description.value,
      elements.includeExplanation.checked,
      elements.tone.value
    ]),
    descriptionLabel: "Code to convert:",
    placeholder: "Paste the code you want to convert..."
  },
  optimizer: {
    title: "Optimizer",
    executeName: "Optimize",
    loadingText: "Optimizing code...",
    handler: optimizeCode,
    options: ['tone', 'optimizerMode'],
    parameters: (elements) => ([
      elements.language.value,
      elements.description.value,
      elements.optimizerMode.value,
      elements.tone.value
    ]),
    descriptionLabel: "Code to optimize:",
    placeholder: "Paste the code you want to optimize..."
  }
};

export const MODE_OPTIONS = Object.keys(MODES);
