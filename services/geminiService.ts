import Groq from "groq-sdk";

// استخدام مفتاح Groq الذي زودتنا به
// ملاحظة: في المشاريع الحقيقية يفضل استخدام process.env.API_KEY
const API_KEY = "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";

// تهيئة عميل Groq
const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true // ضروري للعمل من المتصفح مباشرة في هذا العرض التوضيحي
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
    
    // Fallback في حال حدوث خطأ للحفاظ على عمل الموقع
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
    // تحويل صيغة المحادثة لتناسب Groq
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
