import React from 'react';

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const NeoCard: React.FC<NeoCardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <div 
      className={`group relative bg-neo-card border border-neo-gray/20 p-6 overflow-hidden transition-all duration-500 hover:border-neo-blue/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neo-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10 text-neo-white">
        {children}
      </div>

      {/* Animated Border Line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-neo-blue group-hover:w-full transition-all duration-700 ease-in-out" />
    </div>
  );
};