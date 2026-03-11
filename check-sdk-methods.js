const { GoogleGenAI } = require('@google/genai');

async function checkSDK() {
  try {
    const ai = new GoogleGenAI({ apiKey: 'dummy' });
    console.log("Types on 'ai':", Object.keys(ai));
    console.log("ai.getGenerativeModel type:", typeof ai.getGenerativeModel);
    console.log("ai.models type:", typeof ai.models);
    
    if (ai.models) {
        console.log("ai.models keys:", Object.keys(ai.models));
    }
  } catch (err) {
    console.error("Diagnostic Error:", err);
  }
}
checkSDK();
