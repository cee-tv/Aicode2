export function extractJSONFromResponse(responseText) {
  // First try entire response as JSON
  try {
    return JSON.parse(responseText);
  } catch {
    // Continue processing if top-level parse fails
  }

  // Improved regex that handles nested structures better
  const jsonRegex = /({[\s\S]*?})|(\[[\s\S]*?])/g;
  const matches = responseText.match(jsonRegex) || [];
  
  for (let match of matches) {
    try {
      // Apply incremental fixes in sequence
      let potentialJSON = match
        .replace(/([{,]\s*)(['"]?)(\w+)(['"]?)\s*:/g, '$1"$3":') // Fix unquoted keys
        .replace(/'/g, '"') // Convert single quotes to double
        .trim()
        .replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas

      // Special handling for unescaped quotes in strings
      potentialJSON = potentialJSON.replace(/(?<!\\)"(?!\s*[:},\]])/g, '\\"');

      const result = JSON.parse(potentialJSON);
      if (result) return result;
    } catch (error) {
      console.debug('JSON parse attempt failed, trying next potential match:', error.message);
    }
  }

  // Fallback: Try parsing wrapped JSON with explanation text
  try {
    const wrapped = `{${responseText}}`;
    return JSON.parse(wrapped.replace(/(\w+)\s*:/g, '"$1":'));
  } catch {
    console.error("Failed to extract valid JSON from response");
    return responseText;
  }
}
