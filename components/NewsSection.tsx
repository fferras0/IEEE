import React from 'react';
import { NeoCard } from './ui/NeoCard';
import { ScrollReveal } from './ui/ScrollReveal';
import { Calendar, ArrowRight, Tag, ExternalLink, Radio, Signal, Wifi } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const weeklyHighlight = {
    date: "2077.11.07",
    category: "FEATURED_WEEKLY",
    title: "Global Grid Synchronization Complete",
    summary: "The final node of the planetary neural grid has been successfully activated. Real-time data transmission between all 160+ IEEE sectors is now instantaneous, marking a new era of collaborative engineering.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=600"
  };

  const news = [
    {
      date: "2077.11.02",
      category: "QUANTUM",
      title: "Breakthrough in Neural Latency",
      summary: "IEEE researchers achieve near-zero latency in biological-digital interfaces, paving the way for seamless thought transmission."
    },
    {
      date: "2077.10.24",
      category: "ROBOTICS",
      title: "Sentient Standards v4.0",
      summary: "New safety guidelines established for Level 5 autonomous synthetic lifeforms in high-density urban environments."
    }
  ];

  return (
    <section id="news" className="py-24 bg-neo-black relative scroll-mt-20">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div>
               <h2 className="text-4xl font-orbitron font-bold text-neo-white">
                 LATEST <span className="text-neo-blue">TRANSMISSIONS</span>
               </h2>
               <div className="h-1 w-24 bg-neo-blue mt-2"></div>
             </div>
             <a href="#" className="hidden md:flex items-center gap-2 text-neo-blue font-mono hover:text-neo-white transition-colors group">
               VIEW_ARCHIVE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feature - Weekly News (Redesigned) */}
          <div className="lg:col-span-2">
            <ScrollReveal className="h-full">
               <div className="group relative h-full bg-neo-dark border border-neo-blue/30 overflow-hidden flex flex-col md:flex-row shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  {/* Decorative Scanline */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-neo-blue z-20 animate-scanline opacity-50 pointer-events-none"></div>
                  
                  {/* Image Side */}
                  <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden border-r border-neo-blue/20">
                     <div className="absolute inset-0 bg-neo-blue/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
                     <img 
                       src={weeklyHighlight.image} 
                       alt="Featured News" 
                       className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                     />
                     
                     {/* Overlay HUD */}
                     <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <span className="bg-neo-black/80 text-neo-blue border border-neo-blue px-2 py-1 text-[10px] font-mono flex items-center gap-1">
                           <Radio className="w-3 h-3 animate-pulse" /> LIVE_FEED
                        </span>
                     </div>
                     <div className="absolute bottom-4 right-4 z-20">
                        <span className="text-neo-white/50 text-[10px] font-mono tracking-widest">IMG_SRC_8842</span>
                     </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-1/2 p-8 flex flex-col relative bg-neo-card/50 backdrop-blur-sm">
                     {/* Background Grid */}
                     <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
                     
                     <div className="flex justify-between items-center mb-6 text-xs font-mono text-neo-gray border-b border-neo-gray/10 pb-4">
                        <div className="flex items-center gap-2">
                           <Calendar className="w-3 h-3 text-neo-blue" />
                           <span className="text-neo-white">{weeklyHighlight.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neo-blue">
                           <Signal className="w-3 h-3" />
                           <span>SYNCED</span>
                        </div>
                     </div>
                     
                     <ScrollReveal delay={200}>
                       <h3 className="text-2xl font-bold text-neo-white mb-4 font-orbitron group-hover:text-neo-blue transition-colors leading-tight">
                          {weeklyHighlight.title}
                       </h3>
                     </ScrollReveal>
                     
                     <p className="text-neo-gray text-sm leading-relaxed mb-8 flex-grow font-mono">
                        {weeklyHighlight.summary}
                     </p>
                     
                     {/* Action Area */}
                     <div className="mt-auto">
                        <div className="w-full h-[1px] bg-neo-blue/20 mb-4"></div>
                        <button className="w-full group/btn flex items-center justify-between text-sm font-mono font-bold uppercase tracking-wider text-neo-black bg-neo-blue hover:bg-white px-4 py-3 clip-path-slant transition-all duration-300">
                           <span>ACCESS_DATA</span>
                           <ExternalLink className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                        </button>
                     </div>
                  </div>
               </div>
            </ScrollReveal>
          </div>

          {/* Side List */}
          <div className="flex flex-col gap-6">
            {news.map((item, i) => (
              <ScrollReveal key={i} delay={i * 150} className="flex-1">
                <NeoCard 
                  className="border-l-4 border-l-neo-blue h-full flex flex-col hover:-translate-x-2 transition-all duration-300 group/card"
                >
                  <div className="flex justify-between items-center mb-4 text-xs font-mono text-neo-gray">
                    <div className="flex items-center gap-2 group-hover/card:text-neo-white transition-colors">
                      <Calendar className="w-3 h-3 text-neo-blue" />
                      <span>{item.date}</span>
                    </div>
                    <div className="text-neo-blue/70 border border-neo-blue/20 px-2 py-0.5 rounded text-[10px] bg-neo-blue/5">
                       {item.category}
                    </div>
                  </div>
                  
                  <ScrollReveal delay={300}>
                    <h3 className="text-lg font-bold text-neo-white mb-3 font-sans group-hover/card:text-neo-blue transition-colors">
                      {item.title}
                    </h3>
                  </ScrollReveal>
                  
                  <p className="text-xs text-neo-gray mb-4 leading-relaxed flex-grow line-clamp-3">
                    {item.summary}
                  </p>
                  
                  <button className="text-xs font-mono font-bold uppercase tracking-wider text-neo-white hover:text-neo-blue flex items-center gap-2 mt-auto w-fit transition-colors group/link">
                    READ_LOG <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </NeoCard>
              </ScrollReveal>
            ))}
          </div>

        </div>
        
        <div className="md:hidden mt-8 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-neo-blue font-mono hover:text-neo-white transition-colors group">
             VIEW_ARCHIVE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </a>
        </div>
      </div>
    </section>
  );
};