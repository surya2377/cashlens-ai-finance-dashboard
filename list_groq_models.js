// Test script to list available Groq models
// Get your key from: https://console.groq.com/keys
// Usage: GROQ_API_KEY=your_key_here node list_groq_models.js

const key = process.env.GROQ_API_KEY;
if (!key) {
  console.error("Error: GROQ_API_KEY environment variable not set");
  console.error("Usage: GROQ_API_KEY=your_key_here node list_groq_models.js");
  process.exit(1);
}

fetch("https://api.groq.com/openai/v1/models", {
  headers: { "Authorization": `Bearer ${key}` }
})
.then(res => res.json())
.then(d => {
  console.log(JSON.stringify(d.data.map(m => m.id), null, 2));
})
.catch(e => console.error(e));
