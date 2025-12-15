import React, { useState } from 'react';
import { NeoCard } from './ui/NeoCard';
import { NeoButton } from './ui/NeoButton';
import { ScrollReveal } from './ui/ScrollReveal';
import { generateTechConcept } from '../services/geminiService';
import { TechConcept } from '../types';
import { Sparkles, Terminal, Activity, Cpu } from 'lucide-react';

export const TechStream: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState<TechConcept | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setConcept(null);
    try {
      const data = await generateTechConcept(prompt);
      setConcept(data);
    } catch (err) {
      console.error(err);
      // Fallback in case of error for demo purposes or API limits
      setConcept({
        title: "NEURAL LINK V2",
        description: "An error occurred connecting to the Neural Grid. Displaying cached schematic.",
        specs: ["ERROR_LOG_404", "RETRY_CONNECTION", "MANUAL_OVERRIDE"],
        impact: "Unknown"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai" className="py-24 bg-neo-black relative border-t border-neo-gray/10 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Input Section */}
          <div className="w-full md:w-1/3">
            <ScrollReveal>
              <h2 className="text-4xl font-orbitron font-bold text-neo-white mb-2">NEO<span className="text-neo-blue">_CONCEPT</span></h2>
              <p className="text-neo-gray font-mono mb-8 text-sm">
                Use the IEEE Innovation Engine powered by Groq AI to visualize future technologies.
              </p>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter a topic (e.g. Smart Cities)"
                    className="w-full bg-neo-card border border-neo-gray/30 text-neo-white p-4 pl-10 focus:outline-none focus:border-neo-blue font-mono transition-colors"
                  />
                  <Terminal className="absolute left-3 top-4 w-4 h-4 text-neo-blue/50" />
                </div>
                <NeoButton type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2">
                  {loading ? (
                    <><Activity className="animate-spin w-4 h-4" /> PROCESSING...</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> GENERATE_CONCEPT</>
                  )}
                </NeoButton>
              </form>

              <div className="mt-8 p-4 border border-neo-blue/10 bg-neo-blue/5 rounded text-xs font-mono text-neo-blue/70">
                <p>SYSTEM_STATUS: ONLINE</p>
                <p>API_GATEWAY: GROQ-LLAMA-3.3-70B</p>
                <p>LATENCY: ~150ms</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Output Display */}
          <div className="w-full md:w-2/3 min-h-[400px]">
             <ScrollReveal delay={200} className="h-full">
               {loading ? (
                 <div className="h-full w-full flex flex-col items-center justify-center border border-dashed border-neo-gray/20 rounded bg-neo-card/50">
                   <div className="w-16 h-16 border-4 border-neo-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                   <p className="font-mono text-neo-blue animate-pulse">ESTABLISHING NEURAL HANDSHAKE...</p>
                 </div>
               ) : concept ? (
                 <NeoCard className="h-full border-neo-blue/50">
                   <div className="flex justify-between items-start mb-6 border-b border-neo-gray/20 pb-4">
                     <h3 className="text-3xl font-orbitron font-bold text-neo-blue uppercase">{concept.title}</h3>
                     <Cpu className="w-8 h-8 text-neo-white opacity-50" />
                   </div>
                   
                   <div className="space-y-6">
                     <div>
                       <span className="text-xs font-mono text-neo-gray uppercase tracking-widest">Description</span>
                       <p className="text-lg text-neo-white mt-2 leading-relaxed">{concept.description}</p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {concept.specs.map((spec, idx) => (
                         <div key={idx} className="bg-neo-black/50 p-3 border border-neo-gray/20">
                           <span className="block text-[10px] text-neo-blue mb-1">SPEC_0{idx + 1}</span>
                           <span className="font-mono text-sm text-neo-white">{spec}</span>
                         </div>
                       ))}
                     </div>

                     <div className="bg-gradient-to-r from-neo-deepBlue/20 to-transparent p-4 border-l-2 border-neo-deepBlue">
                       <span className="text-xs font-mono text-neo-blue uppercase tracking-widest">Projected Impact</span>
                       <p className="text-sm text-neo-gray mt-1 italic">"{concept.impact}"</p>
                     </div>
                   </div>
                 </NeoCard>
               ) : (
                 <div className="h-full flex items-center justify-center opacity-30">
                   <div className="text-center">
                     <Cpu className="w-24 h-24 mx-auto mb-4 text-neo-white" />
                     <p className="font-orbitron text-2xl text-neo-white">AWAITING INPUT</p>
                   </div>
                 </div>
               )}
             </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};