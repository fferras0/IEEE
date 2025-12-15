import React from 'react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  glow?: boolean;
}

export const NeoButton: React.FC<NeoButtonProps> = ({ 
  children, 
  variant = 'primary', 
  glow = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-8 py-3 font-mono font-bold uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 clip-path-slant";
  
  const variants = {
    primary: "bg-neo-blue text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]",
    secondary: "bg-neo-deepBlue text-white hover:bg-neo-blue hover:text-black",
    outline: "bg-transparent border border-neo-blue text-neo-blue hover:bg-neo-blue/10"
  };

  const glowStyle = glow ? "shadow-[0_0_15px_rgba(0,240,255,0.3)]" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${glowStyle} ${className}`}
      {...props}
    >
      {children}
      {/* Decorative corner markers */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50"></span>
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50"></span>
    </button>
  );
};
