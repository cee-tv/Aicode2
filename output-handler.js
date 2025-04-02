export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Add copy button to code blocks
function addCopyButton(preElement, textToCopy) {
  if (!preElement) return;
  
  // Remove existing copy button if any
  const existingButton = preElement.querySelector('.copy-button');
  if (existingButton) existingButton.remove();
  
  const copyButton = document.createElement('button');
  copyButton.className = 'copy-button';
  copyButton.textContent = 'Copy';
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyButton.textContent = 'Copied!';
      copyButton.classList.add('copied');
      setTimeout(() => {
        copyButton.textContent = 'Copy';
        copyButton.classList.remove('copied');
      }, 2000);
    });
  });
  
  preElement.style.position = 'relative';
  preElement.appendChild(copyButton);
}

// Add run button for HTML code
function addRunButton(elements) {
  const preElement = elements.output.querySelector('pre');
  if (!preElement) return;
  
  const rawCode = decodeURIComponent(preElement.dataset.rawCode || '');
  if (!rawCode) return;
  
  // Remove existing run button if any
  const existingButton = elements.output.querySelector('.run-code-button');
  if (existingButton) existingButton.remove();
  
  const runButton = document.createElement('button');
  runButton.className = 'run-code-button';
  runButton.textContent = 'Run Code';
  runButton.addEventListener('click', () => {
    // Remove existing iframe if any
    const existingIframe = elements.output.querySelector('.run-iframe');
    if (existingIframe) existingIframe.remove();
    
    const iframe = document.createElement('iframe');
    iframe.srcdoc = rawCode;
    iframe.className = 'run-iframe';
    iframe.style.width = '100%';
    iframe.style.height = '300px';
    iframe.style.border = '1px solid #334155';
    iframe.style.borderRadius = '8px';
    iframe.style.marginTop = '20px';
    elements.output.appendChild(iframe);
  });
  
  preElement.appendChild(runButton);
}

export function displayResult(result, language, modeKey, elements) {
  if (modeKey === 'generator') {
    let codeContent = result;
    if (result.includes('\n\n/*\nExplanation:')) {
      codeContent = result.split('\n\n/*\nExplanation:')[0];
    }
    
    if (language.includes("html_css_javascript_all_in_one_file")) {
      language = "html";
    }
    
    let modifiedResult = language.includes("html") ? escapeHtml(codeContent) : result;
    const isHTMLOutput = language.includes("html");
    
    if (isHTMLOutput) {
      elements.output.innerHTML = `<pre data-raw-code="${encodeURIComponent(codeContent)}"><code class="language-${language}">${modifiedResult}</code></pre>`;
    } else {
      elements.output.innerHTML = `<pre><code class="language-${language}">${modifiedResult}</code></pre>`;
    }
    
    hljs.highlightAll();
    addCopyButton(elements.output.querySelector('pre'), codeContent);
    
    if (isHTMLOutput) {
      addRunButton(elements);
    }
  } else if (modeKey === 'converter') {
    let codeContent = result;
    const targetLanguage = elements.targetLanguage.value;
    const isHtmlTarget = targetLanguage.includes("html");
    let modifiedResult = isHtmlTarget ? escapeHtml(codeContent) : result;
    
    elements.output.innerHTML = `
      <pre data-raw-code="${encodeURIComponent(codeContent)}">
        <code class="language-${targetLanguage}">${modifiedResult}</code>
      </pre>
    `;
    
    hljs.highlightAll();
    addCopyButton(elements.output.querySelector('pre'), codeContent);

    if (isHtmlTarget) {
      addRunButton(elements);
    }
  } else {
    elements.output.innerHTML = result;

    const codeBlocks = elements.output.querySelectorAll('pre code');
    codeBlocks.forEach((codeBlock) => {
      hljs.highlightElement(codeBlock);
      const preBlock = codeBlock.parentElement;
      addCopyButton(preBlock, codeBlock.textContent);
      
      if (language && (language.includes("html") || language.includes("html_css_javascript_all_in_one_file"))) {
        preBlock.style.position = 'relative';
        const runButton = document.createElement('button');
        runButton.className = 'run-code-button';
        runButton.textContent = 'Run Code';
        runButton.style.position = 'absolute';
        runButton.style.bottom = '10px';
        runButton.style.right = '10px';
        runButton.addEventListener('click', () => {
          const iframe = document.createElement('iframe');
          iframe.srcdoc = codeBlock.textContent;
          iframe.className = 'run-iframe';
          iframe.style.width = '100%';
          iframe.style.height = '300px';
          preBlock.parentElement.appendChild(iframe);
        });
        preBlock.appendChild(runButton);
      }
    });
  }
  
  return {
    addCopyButton,
    addRunButton
  };
}
