// Utility function to convert camelCase to a readable sentence
function camelToSentence(text) {
  if (!text) return '';

  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
}

module.exports = { camelToSentence };
