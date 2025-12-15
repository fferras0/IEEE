import Groq from "groq-sdk";

// قراءة المفتاح من البيئة
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API Key is missing!");
}

// Initialize the Groq Client
const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true 
});
      messages: [
        {
          role: "system",
          content: `You are a futuristic technology architect for IEEE. You design bleeding-edge concepts.
          Return a JSON object with the following structure:
          {
            "title": "A futuristic, cool name for the technology.",
            "description": "A compelling description of what the technology does.",
            "specs": ["Spec 1", "Spec 2", "Spec 3"],
            "impact": "The societal impact of this technology."
          }
          Ensure the response is valid JSON only.`
        },
        {
          role: "user",
          content: `Generate a futuristic technology concept based on the topic: "${topic}". 
          Make it sound like a high-tech IEEE innovation from the year 2077. 
          Use technical, neo-futuristic language.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content;
    if (content) {
      return JSON.parse(content);
    }
    throw new Error("No data returned");
  } catch (error: any) {
    console.error("Groq API Error:", error);
    
    // Fallback for 401 (Invalid Key), 400 (Model Issues), or 429 (Rate Limit) to keep app functional
    if (error?.status === 401 || error?.error?.code === 'invalid_api_key' || error?.status === 403 || error?.status === 400) {
       console.warn("API Error. Switching to Simulation Mode.");
       return {
         title: `SIMULATION: ${topic.toUpperCase()} PROTOCOL`,
         description: `(Offline Mode) API access denied or model unavailable. The ${topic} system utilizes advanced offline heuristics to optimize local grid performance without central server dependency.`,
         specs: ["Local Simulation", "Secure Sandbox", "Latency: 0ms"],
         impact: "Ensures operational continuity during network severance."
       };
    }
    
    throw error;
  }
};

export const sendChatMessage = async (history: { role: string; parts: { text: string }[] }[], newMessage: string) => {
  try {
    // Convert Gemini history format to Groq format (assistant/user)
    const groqHistory = history.map(msg => ({
      role: (msg.role === 'model' ? 'assistant' : 'user') as "assistant" | "user",
      content: msg.parts[0].text
    }));

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are 'CORE-AI', the dedicated digital assistant for the IEEE Neo-Horizon platform. 
          Your tone is professional, futuristic, and helpful. 
          You assist users with questions about IEEE, engineering, and technology.
          
          CRITICAL INSTRUCTION:
          - Detect the user's language automatically.
          - If the user asks in Arabic, you MUST respond in Arabic.
          - If the user asks in English, respond in English.
          - Keep responses concise (under 50 words when possible) and technical.`
        },
        ...groqHistory,
        { role: "user", content: newMessage }
      ],
      model: "llama-3.3-70b-versatile",
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error: any) {
    console.error("Chat API Error:", error);
    
    // Fallback response for chat
    if (error?.status === 401 || error?.error?.code === 'invalid_api_key' || error?.status === 400) {
      return "SYSTEM ALERT: CONNECTION INSTABILITY (400/401). \n\nI am currently operating in limited offline mode. Please check neural link configuration.";
    }

    return "CONNECTION_ERROR: UNABLE TO ESTABLISH LINK WITH CORE-AI.";
  }
};
