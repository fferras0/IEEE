import React, { useEffect, useState } from 'react';
import { NeoButton } from './ui/NeoButton';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neo-blue/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neo-deepBlue/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Pre-header */}
        <div className={`mb-4 inline-block transform transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className="font-mono text-neo-blue text-sm tracking-[0.3em] border border-neo-blue/30 px-3 py-1 rounded-full bg-neo-blue/5">
            EST. 1963 // GLOBAL TECHNOLOGY
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter text-neo-white mb-6 leading-none">
          {/* ADVANCING - Entrance + Float + Gradient */}
          <span className={`block transform transition-all duration-1000 delay-100 ${loaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <span className="block animate-float">
               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neo-blue to-white bg-[length:200%_auto] animate-slow-pan">
                ADVANCING
              </span>
            </span>
          </span>

          {/* TECHNOLOGY - Entrance + Float + Gradient */}
          <span className={`block transform transition-all duration-1000 delay-200 ${loaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <span className="block animate-float" style={{ animationDelay: '1s' }}>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neo-blue via-white to-neo-blue bg-[length:200%_auto] animate-slow-pan">
                TECHNOLOGY
              </span>
            </span>
          </span>

          {/* FOR HUMANITY - Entrance only */}
          <span className={`block text-stroke-white opacity-50 text-4xl md:text-6xl mt-2 transform transition-all duration-1000 delay-300 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            FOR HUMANITY
          </span>
        </h1>

        {/* Description */}
        <p className={`max-w-2xl mx-auto text-neo-gray font-mono text-lg mb-10 transform transition-all duration-1000 delay-500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Join the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity. 
          <span className="text-neo-blue"> The future is now.</span>
        </p>

        {/* Buttons */}
        <div className={`flex flex-col md:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <NeoButton glow onClick={() => document.getElementById('ai')?.scrollIntoView({behavior: 'smooth'})}>
            EXPLORE THE FUTURE
          </NeoButton>
          <NeoButton variant="outline" className="group">
            VIEW CHAPTERS <ArrowRight className="inline ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NeoButton>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] font-mono tracking-widest text-neo-blue">SCROLL_DOWN</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neo-blue to-transparent"></div>
      </div>
    </section>
  );
};