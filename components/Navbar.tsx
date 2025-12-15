import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Code, Sun, Moon, Github } from 'lucide-react';
import { CodeViewer } from './CodeViewer';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
      setIsDark(false);
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.remove('light');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add('light');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('light');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  // HYPER SPEED SCROLL
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (!element) return;

    setIsOpen(false);

    const startPosition = window.scrollY;
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const targetPosition = elementPosition + window.scrollY - headerOffset;
    const distance = targetPosition - startPosition;
    
    // 400ms = Very fast, snappy
    const duration = 400; 
    let start: number | null = null;

    // Expo Ease Out - Teleport-like feeling
    const easeOutExpo = (t: number) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animation = (currentTime: number) => {
      if (!start) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const ease = easeOutExpo(progress);
      
      window.scrollTo(0, startPosition + (distance * ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, targetPosition);
      }
    };

    requestAnimationFrame(animation);
  };

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'HISTORY', href: '#history' },
    { name: 'NEWS', href: '#news' },
    { name: 'JOIN', href: '#join' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neo-black/90 backdrop-blur-md border-b border-neo-blue/20 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" aria-label="IEEE Home">
            <div className="relative">
              <Cpu className="w-8 h-8 text-neo-blue animate-pulse-slow" />
              <div className="absolute inset-0 blur-sm bg-neo-blue/40 opacity-50 rounded-full" />
            </div>
            <span className="text-2xl font-orbitron font-bold tracking-widest text-neo-white group-hover:text-neo-blue transition-colors">
              IEEE<span className="text-neo-blue">.ZUJ</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm font-mono text-neo-gray hover:text-neo-blue tracking-wider transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-neo-blue hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-neo-gray hover:text-neo-blue transition-colors"
              aria-label={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
              title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* GitHub Link */}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-neo-gray hover:text-neo-blue transition-colors"
              aria-label="GitHub Repository"
              title="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Source Code Button */}
            <button 
              onClick={() => setIsCodeOpen(true)}
              className="group flex items-center gap-2 px-3 py-1.5 border border-neo-gray/30 rounded text-neo-gray hover:text-neo-blue hover:border-neo-blue transition-all"
              aria-label="View Source Code"
              title="View Source Code"
            >
              <Code className="w-4 h-4" />
              <span className="text-xs font-mono">SRC</span>
            </button>

            <a href="#join" className="px-4 py-1 border border-neo-blue/50 text-neo-blue font-mono text-xs hover:bg-neo-blue hover:text-neo-white transition-all">
              JOIN_IEEE
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
             <button
              onClick={toggleTheme}
              className="text-neo-gray hover:text-neo-blue"
              aria-label={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neo-gray hover:text-neo-blue"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
            <button 
              onClick={() => setIsCodeOpen(true)}
              className="text-neo-gray hover:text-neo-blue"
              aria-label="View Source Code"
            >
              <Code className="w-5 h-5" />
            </button>
            <button 
              className="text-neo-white hover:text-neo-blue"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-neo-black border-b border-neo-blue/20 p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-neo-white font-mono hover:text-neo-blue py-2 border-l-2 border-transparent hover:border-neo-blue pl-4 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Source Code Modal */}
      <CodeViewer isOpen={isCodeOpen} onClose={() => setIsCodeOpen(false)} />
    </>
  );
};