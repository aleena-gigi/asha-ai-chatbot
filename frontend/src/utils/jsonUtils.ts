// Helper function to extract JSON objects from a string that might contain multiple concatenated JSON objects
export const extractJsonObjects = (text: string): any[] => {
  const objects: any[] = [];
  let startIndex = 0;
  
  while (startIndex < text.length) {
    try {
      // Find the start of a JSON object
      const jsonStart = text.indexOf('{', startIndex);
      if (jsonStart === -1) break;
      
      // Try to parse from this position
      let depth = 0;
      let endIndex = jsonStart;
      
      // Find the matching closing brace by tracking nesting depth
      for (let i = jsonStart; i < text.length; i++) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') {
          depth--;
          if (depth === 0) {
            endIndex = i + 1;
            break;
          }
        }
      }
      
      if (depth !== 0) break; // Unbalanced braces
      
      // Extract and parse the JSON object
      const jsonStr = text.substring(jsonStart, endIndex);
      const jsonObj = JSON.parse(jsonStr);
      objects.push(jsonObj);
      
      // Move past this object
      startIndex = endIndex;
    } catch (e) {
      // If parsing fails, move to the next character and try again
      startIndex++;
    }
  }
  
  return objects;
};
