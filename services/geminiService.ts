import Groq from "groq-sdk";

// نستخدم المفتاح مباشرة لتجنب أخطاء TypeScript مع process.env
const API_KEY = "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";

const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true 
});

export const generateTechConcept = async (topic: string) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a futuristic technology architect for IEEE.
          Return ONLY valid JSON with this structure:
          {
            "title": "Futuristic Name",
            "description": "Tech description",
            "specs": ["Spec 1", "Spec 2", "Spec 3"],
            "impact": "Societal impact"
          }`
        },
        {
          role: "user",
          content: `Generate a futuristic technology concept based on: "${topic}".`
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
    return {
         title: `SIMULATION: ${topic.toUpperCase()} PROTOCOL`,
         description: `(Offline Mode) API access unavailable. System utilizes advanced offline heuristics.`,
         specs: ["Local Simulation", "Secure Sandbox", "Latency: 0ms"],
         impact: "Ensures operational continuity during network severance."
    };
  }
};

export const sendChatMessage = async (history: { role: string; parts: { text: string }[] }[], newMessage: string) => {
  try {
    const groqHistory = history.map(msg => ({
      role: (msg.role === 'model' ? 'assistant' : 'user') as "assistant" | "user",
      content: msg.parts[0].text
    }));

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are 'CORE-AI', the dedicated digital assistant for IEEE."
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
