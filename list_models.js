// Test script to list available Gemini models
// Get your key from: https://aistudio.google.com/app/apikey
// Usage: GEMINI_API_KEY=your_key_here node list_models.js

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error("Error: GEMINI_API_KEY environment variable not set");
  console.error("Usage: GEMINI_API_KEY=your_key_here node list_models.js");
  process.exit(1);
}

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
  .then(res => res.json())
  .then(data => {
    console.log(data.models.map(m => m.name).join('\n'));
  })
  .catch(e => console.error(e));
