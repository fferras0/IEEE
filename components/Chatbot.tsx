import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'SYSTEM ONLINE. Greetings, Engineer. I am CORE-AI. How can I assist you with IEEE protocols today?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setLoading(true);
    
    // Optimistically add user message
    // Note: 'messages' in this scope is the state BEFORE this update, 
    // which is exactly what we need for the 'history' passed to the API.
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    // Prepare history for API (excluding the message we are about to send, 
    // as the API's sendMessage appends it to the history provided)
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const response = await sendChatMessage(history, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response || 'DATA CORRUPTION DETECTED.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'CONNECTION SEVERED. UNABLE TO REACH CORE.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-[55] flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="bg-neo-black border border-neo-blue shadow-[0_0_40px_rgba(0,240,255,0.15)] w-80 md:w-96 h-[500px] mb-4 rounded-lg flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300"
        >
          
          {/* Header */}
          <div className="bg-neo-blue/10 border-b border-neo-blue/30 p-3 flex justify-between items-center backdrop-blur-sm">
            <div className="flex items-center gap-2 text-neo-blue">
              <Bot className="w-5 h-5" />
              <span className="font-orbitron font-bold text-sm tracking-wider">CORE-AI // CHAT</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neo-gray hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDI0MCwgMjU1LCAwLjAzKSIgLz4KPC9zdmc+')]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 text-xs font-mono leading-relaxed rounded-sm border ${
                    msg.role === 'user' 
                      ? 'bg-neo-blue/20 border-neo-blue/50 text-white rounded-tr-none' 
                      : 'bg-neo-gray/10 border-neo-gray/30 text-neo-gray rounded-tl-none'
                  }`}
                >
                  {msg.role === 'model' && <span className="block text-[8px] text-neo-blue mb-1 uppercase tracking-widest">System</span>}
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-neo-gray/10 border border-neo-gray/30 p-3 rounded-sm rounded-tl-none flex items-center gap-2 text-neo-blue text-xs">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>COMPUTING...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 border-t border-neo-blue/20 bg-neo-black">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command..."
                className="w-full bg-neo-dark border border-neo-gray/30 text-white text-xs font-mono p-3 pr-10 focus:outline-none focus:border-neo-blue transition-colors"
              />
              <button 
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-2 text-neo-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        ref={toggleBtnRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-lg border-2 transition-all duration-300 group relative
          ${isOpen ? 'bg-neo-blue border-neo-blue text-black scale-110' : 'bg-[#0a0a0f] border-neo-blue text-neo-blue hover:bg-neo-blue hover:text-black'}
        `}
        aria-label="Toggle Chat"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neo-blue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-neo-blue"></span>
        </span>
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};