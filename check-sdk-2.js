const genai = require('@google/genai');

async function check() {
  console.log("Exports of @google/genai:", Object.keys(genai));
  
  // Testando instanciacao
  try {
      if (genai.GoogleGenAI) {
          const ai = new genai.GoogleGenAI({ apiKey: 'test' });
          console.log("Instance of GoogleGenAI keys:", Object.keys(ai));
          if (ai.models) console.log("ai.models keys:", Object.keys(ai.models));
      } else if (genai.createClient) {
          const client = genai.createClient({ apiKey: 'test' });
          console.log("createClient instance keys:", Object.keys(client));
      }
  } catch (err) {
      console.log("Error checking:", err.message);
  }
}
check();
