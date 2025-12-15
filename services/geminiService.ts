
// Service configured for Groq API (Llama 3.3-70b)
const API_KEY = "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";
const MODEL = "llama-3.3-70b-versatile";

export const generateTechConcept = async (topic: string) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: `You are a futuristic technology architect for IEEE. You design bleeding-edge concepts.
            Return ONLY a JSON object with this exact structure:
            {
              "title": "A futuristic, cool name for the technology",
              "description": "A compelling description of what the technology does",
              "specs": ["Spec 1", "Spec 2", "Spec 3"],
              "impact": "The societal impact"
            }
            Do not include markdown formatting or explanations.`
          },
          {
            role: "user",
            content: `Generate a futuristic technology concept based on the topic: "${topic}". 
          Make it sound like a high-tech IEEE innovation from the year 2077. 
          Use technical, neo-futuristic language.`
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]?.message?.content) {
      return JSON.parse(data.choices[0].message.content);
    }
    throw new Error("No data returned from Groq API");

  } catch (error: any) {
    console.error("Groq API Error:", error);
    
    // Fallback logic
    return {
         title: `SIMULATION: ${topic.toUpperCase()} PROTOCOL`,
         description: `(Offline Mode) Neural link interrupted. The ${topic} system utilizes advanced offline heuristics to optimize local grid performance without central server dependency.`,
         specs: ["Local Simulation", "Secure Sandbox", "Latency: 0ms"],
         impact: "Ensures operational continuity during network severance."
    };
  }
};

export const sendChatMessage = async (history: { role: string; parts: { text: string }[] }[], newMessage: string) => {
  try {
    // Convert existing Gemini history format to OpenAI/Groq format
    const groqHistory = history.map(msg => ({
      role: msg.role === 'model' ? 'assistant' : 'user',
      content: msg.parts[0].text
    }));

    const messages = [
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
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return "SYSTEM ALERT: CONNECTION INSTABILITY. \n\nI am currently operating in limited offline mode. Please check neural link configuration.";
  }
};
