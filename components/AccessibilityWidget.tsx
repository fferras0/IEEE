import React, { useState, useEffect, useRef } from 'react';
import { Settings, Eye, Type, Globe, Zap, PersonStanding } from 'lucide-react';

export const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [isRTL, setIsRTL] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  
  // Ref for click outside detection
  const widgetRef = useRef<HTMLDivElement>(null);

  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle Font Size Change
  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontSize.toString());
  }, [fontSize]);

  // Handle High Contrast
  useEffect(() => {
    if (isHighContrast) document.documentElement.classList.add('high-contrast');
    else document.documentElement.classList.remove('high-contrast');
  }, [isHighContrast]);

  // Handle Grayscale
  useEffect(() => {
    if (isGrayscale) document.documentElement.classList.add('grayscale-mode');
    else document.documentElement.classList.remove('grayscale-mode');
  }, [isGrayscale]);

  // Handle RTL / Arabic
  useEffect(() => {
    if (isRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  }, [isRTL]);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div ref={widgetRef} className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-3">
      
      {/* Settings Menu - Forced Dark Theme for Visibility */}
      {isOpen && (
        <div className="bg-[#0a0a0f] text-white border border-neo-blue shadow-[0_0_30px_rgba(0,240,255,0.2)] p-4 rounded-lg w-72 mb-2 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
            <h3 className="font-orbitron font-bold text-white text-sm">ACCESSIBILITY</h3>
            <span className="text-[10px] font-mono text-neo-blue animate-pulse">● ACTIVE</span>
          </div>

          <div className="space-y-4 font-mono">
            {/* Language Toggle */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Globe className="w-4 h-4" />
                <span>LANGUAGE (اللغة)</span>
              </div>
              <button 
                onClick={() => setIsRTL(!isRTL)}
                className={`px-3 py-1 text-xs font-bold border rounded transition-colors ${isRTL ? 'bg-neo-blue text-black border-neo-blue' : 'text-white border-white/30 hover:border-neo-blue'}`}
              >
                {isRTL ? 'ARABIC' : 'ENGLISH'}
              </button>
            </div>

            {/* Font Size */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Type className="w-4 h-4" />
                <span>TEXT SIZE</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setFontSize(Math.max(0.8, fontSize - 0.1))} className="w-6 h-6 flex items-center justify-center border border-white/30 hover:border-neo-blue hover:text-neo-blue text-white rounded transition-colors">-</button>
                <span className="w-8 text-center text-xs text-white flex items-center justify-center">{Math.round(fontSize * 100)}%</span>
                <button onClick={() => setFontSize(Math.min(1.5, fontSize + 0.1))} className="w-6 h-6 flex items-center justify-center border border-white/30 hover:border-neo-blue hover:text-neo-blue text-white rounded transition-colors">+</button>
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Zap className="w-4 h-4" />
                <span>CONTRAST</span>
              </div>
              <button 
                onClick={() => setIsHighContrast(!isHighContrast)}
                className={`w-10 h-5 rounded-full relative transition-colors ${isHighContrast ? 'bg-neo-blue' : 'bg-white/20'}`}
              >
                <span className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isHighContrast ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            {/* Grayscale */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Eye className="w-4 h-4" />
                <span>GRAYSCALE</span>
              </div>
              <button 
                onClick={() => setIsGrayscale(!isGrayscale)}
                className={`w-10 h-5 rounded-full relative transition-colors ${isGrayscale ? 'bg-neo-blue' : 'bg-white/20'}`}
              >
                <span className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isGrayscale ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="pt-2 text-[10px] text-gray-500 text-center border-t border-white/10 mt-2">
              <button onClick={() => { setFontSize(1); setIsRTL(false); setIsHighContrast(false); setIsGrayscale(false); }} className="hover:text-neo-blue underline transition-colors">
                RESET SETTINGS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button 
        onClick={toggleOpen}
        aria-label="Open Accessibility Menu"
        className={`p-3 rounded-full shadow-lg border-2 transition-all duration-300 group
          ${isOpen ? 'bg-neo-blue border-neo-blue text-black scale-110' : 'bg-[#0a0a0f] border-neo-blue text-neo-blue hover:bg-neo-blue hover:text-black'}
        `}
      >
        <PersonStanding className="w-6 h-6" />
      </button>

    </div>
  );
};