import { GoogleGenAI, Type } from "@google/genai";

const getAiClient = () => {
  // Ensure the API key is retrieved from the environment variable
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateTechConcept = async (topic: string) => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a futuristic technology concept based on the topic: "${topic}". 
          Make it sound like a high-tech IEEE innovation from the year 2077. 
          Use technical, neo-futuristic language.`,
      config: {
        systemInstruction: "You are a futuristic technology architect for IEEE. You design bleeding-edge concepts.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A futuristic, cool name for the technology." },
            description: { type: Type.STRING, description: "A compelling description of what the technology does." },
            specs: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3 specifications." },
            impact: { type: Type.STRING, description: "The societal impact of this technology." }
          },
          required: ["title", "description", "specs", "impact"],
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No data returned");
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Fallback logic
    return {
         title: `SIMULATION: ${topic.toUpperCase()} PROTOCOL`,
         description: `(Offline Mode) API access denied or model unavailable. The ${topic} system utilizes advanced offline heuristics to optimize local grid performance without central server dependency.`,
         specs: ["Local Simulation", "Secure Sandbox", "Latency: 0ms"],
         impact: "Ensures operational continuity during network severance."
    };
  }
};

export const sendChatMessage = async (history: { role: string; parts: { text: string }[] }[], newMessage: string) => {
  try {
    const ai = getAiClient();
    
    // Create a chat session with the history
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: history,
      config: {
        systemInstruction: `You are 'CORE-AI', the dedicated digital assistant for the IEEE Neo-Horizon platform. 
          Your tone is professional, futuristic, and helpful. 
          You assist users with questions about IEEE, engineering, and technology.
          
          CRITICAL INSTRUCTION:
          - Detect the user's language automatically.
          - If the user asks in Arabic, you MUST respond in Arabic.
          - If the user asks in English, respond in English.
          - Keep responses concise (under 50 words when possible) and technical.`
      }
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "";
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return "SYSTEM ALERT: CONNECTION INSTABILITY. \n\nI am currently operating in limited offline mode. Please check neural link configuration.";
  }
};