import Groq from "groq-sdk";

// ملاحظة: في بيئة الإنتاج يفضل استخدام process.env.API_KEY
// لكن للتأكد من عمله الآن سنستخدم المفتاح الذي وضعته
const API_KEY = "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";

// Initialize the Groq Client
const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true // Enabled for client-side demo
});

export const generateTechConcept = async (topic: string) => {
  try {
    const completion = await groq.chat.completions.create({
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
    
    // Fallback in case of error
    return {
         title: `SIMULATION: ${topic.toUpperCase()} PROTOCOL`,
         description: `(Offline Mode) System utilizes advanced offline heuristics to optimize local grid performance.`,
         specs: ["Local Simulation", "Secure Sandbox", "Latency: 0ms"],
         impact: "Ensures operational continuity during network severance."
    };
  }
};

export const sendChatMessage = async (history: { role: string; parts: { text: string }[] }[], newMessage: string) => {
  try {
    // Convert Gemini history format to Groq format
    const groqHistory = history.map(msg => ({
      role: (msg.role === 'model' ? 'assistant' : 'user') as "assistant" | "user",
      content: msg.parts[0].text
    }));

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are 'CORE-AI', the dedicated digital assistant for the IEEE Neo-Horizon platform. 
          Your tone is professional, futuristic, and helpful.`
        },
        ...groqHistory,
        { role: "user", content: newMessage }
      ],
      model: "llama-3.3-70b-versatile",
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return "CONNECTION_ERROR: UNABLE TO ESTABLISH LINK WITH CORE-AI.";
  }
};
