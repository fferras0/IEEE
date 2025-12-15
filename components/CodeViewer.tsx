import React, { useState } from 'react';
import { X, Copy, Check, Terminal } from 'lucide-react';

interface CodeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

// This string represents the COMPLETE functional single-file version of the app
const SOURCE_CODE = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IEEE Neo-Horizon</title>
    
    <!-- External Libraries -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;500;700&family=Cairo:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Configuration -->
    <script>
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            colors: {
              neo: {
                black: 'var(--bg-primary)',
                dark: 'var(--bg-dark)',
                card: 'var(--bg-card)',
                blue: 'var(--accent-blue)',
                deepBlue: '#0055ff',
                white: 'var(--text-primary)',
                gray: 'var(--text-secondary)'
              }
            },
            fontFamily: {
              orbitron: ['Orbitron', 'sans-serif'], 
              mono: ['JetBrains Mono', 'monospace'], 
              sans: ['Rajdhani', 'sans-serif'], 
              cairo: ['Cairo', 'sans-serif'],
            },
            animation: {
              'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              'marquee': 'marquee 20s linear infinite',
              'grid-move': 'grid-move 40s linear infinite',
              'slow-pan': 'slow-pan 15s ease infinite',
              'float': 'float 8s ease-in-out infinite',
              'scanline': 'scanline 4s linear infinite',
              'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
              marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
              'grid-move': { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '50px 50px' } },
              'slow-pan': {
                '0%, 100%': { 'background-position': '0% 50%' },
                '50%': { 'background-position': '100% 50%' },
              },
              'float': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-10px)' },
              },
              'scanline': {
                '0%': { top: '0%' },
                '100%': { top: '100%' }
              }
            }
          }
        }
      }
    </script>

    <style>
        :root {
          --bg-primary: #030305;
          --bg-dark: #0a0a0f;
          --bg-card: #11111a;
          --text-primary: #ffffff;
          --text-secondary: #8892b0;
          --accent-blue: #00f0ff;
          --font-scale: 1;
        }
        html.light {
          --bg-primary: #ffffff;
          --bg-dark: #f1f5f9;
          --bg-card: #f8fafc;
          --text-primary: #0f172a;
          --text-secondary: #475569;
          --accent-blue: #0066ff;
        }
        /* Accessibility Overrides */
        html.high-contrast {
          --bg-primary: #000; --bg-dark: #000; --bg-card: #000;
          --text-primary: #ff0; --text-secondary: #0f0; --accent-blue: #0ff;
        }
        html.grayscale-mode { filter: grayscale(100%); }
        
        html { font-size: calc(16px * var(--font-scale)); }
        html[dir="rtl"] body { font-family: 'Cairo', sans-serif; }
        
        body { background-color: var(--bg-primary); color: var(--text-primary); font-family: 'Rajdhani', sans-serif; overflow-x: hidden; transition: background-color 0.3s, color 0.3s; }
        
        /* Utils */
        .glass-nav { background: rgba(3, 3, 5, 0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0, 240, 255, 0.1); }
        /* Light mode glass nav override handled by bg-primary/text-primary mostly, but border needs tweak */
        html.light .glass-nav { background: rgba(255, 255, 255, 0.9); border-bottom: 1px solid rgba(0, 102, 255, 0.1); }

        .clip-slant { clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px); }
        .grid-bg { background-image: linear-gradient(to right, rgba(0,85,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,85,255,0.05) 1px, transparent 1px); background-size: 50px 50px; mask-image: linear-gradient(to bottom, black 40%, transparent 100%); }
        html.light .grid-bg { background-image: linear-gradient(to right, rgba(0,102,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,102,255,0.05) 1px, transparent 1px); mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 40%, transparent 100%); }
        
        .text-stroke-white { 
            -webkit-text-stroke: 1px rgba(255,255,255,0.3); 
            color: transparent; 
        }
        html.light .text-stroke-white { 
            -webkit-text-stroke: 1px rgba(0,0,0,0.8); 
            color: transparent; 
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg-dark); }
        ::-webkit-scrollbar-thumb { background: #0055ff; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent-blue); }
        
        /* Chat Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #00f0ff; border-radius: 2px; }

        /* Entrance Animations */
        .reveal-load { opacity: 0; transform: translateY(20px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-active { opacity: 1; transform: translateY(0); }
        
        /* Scroll Reveal Utility */
        .reveal-on-scroll { opacity: 0; transform: translateY(50px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
    </style>
</head>
<body>
    <!-- Skip Link -->
    <a href="#main" class="fixed top-[-100px] left-0 bg-neo-blue text-black font-bold font-mono px-4 py-3 z-[100] focus:top-0 transition-all border-2 border-white">SKIP TO CONTENT</a>

    <!-- Navigation -->
    <nav id="navbar" class="fixed w-full z-50 py-6 transition-all duration-300">
        <div class="container mx-auto px-6 flex justify-between items-center">
            <!-- Logo -->
            <a href="#" class="flex items-center gap-2 group">
                <div class="relative">
                     <svg class="w-8 h-8 text-neo-blue animate-pulse-slow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                     <div class="absolute inset-0 blur-sm bg-neo-blue/40 opacity-50 rounded-full"></div>
                </div>
                <span class="text-2xl font-orbitron font-bold tracking-widest text-neo-white group-hover:text-neo-blue transition-colors">IEEE<span class="text-neo-blue">.ZUJ</span></span>
            </a>
            
            <!-- Desktop Links -->
            <div class="hidden md:flex items-center gap-8">
                <a href="#hero" onclick="smoothScroll('#hero', event)" class="text-sm font-mono text-neo-gray hover:text-neo-blue tracking-wider transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-neo-blue hover:after:w-full after:transition-all after:duration-300">HOME</a>
                <a href="#about" onclick="smoothScroll('#about', event)" class="text-sm font-mono text-neo-gray hover:text-neo-blue tracking-wider transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-neo-blue hover:after:w-full after:transition-all after:duration-300">ABOUT</a>
                <a href="#history" onclick="smoothScroll('#history', event)" class="text-sm font-mono text-neo-gray hover:text-neo-blue tracking-wider transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-neo-blue hover:after:w-full after:transition-all after:duration-300">HISTORY</a>
                <a href="#news" onclick="smoothScroll('#news', event)" class="text-sm font-mono text-neo-gray hover:text-neo-blue tracking-wider transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-neo-blue hover:after:w-full after:transition-all after:duration-300">NEWS</a>
                <a href="#join" onclick="smoothScroll('#join', event)" class="text-sm font-mono text-neo-gray hover:text-neo-blue tracking-wider transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-neo-blue hover:after:w-full after:transition-all after:duration-300">JOIN</a>
                
                <!-- Theme Toggle -->
                <button onclick="toggleTheme()" class="p-2 text-neo-gray hover:text-neo-blue transition-colors" title="Toggle Theme">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                </button>
            </div>
            
            <!-- Mobile Menu Button -->
            <div class="md:hidden">
               <button class="text-neo-white" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
               </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 w-full bg-neo-black border-b border-neo-blue/20 p-6 flex flex-col gap-4">
            <a href="#hero" onclick="smoothScroll('#hero', event)" class="text-neo-white font-mono hover:text-neo-blue">HOME</a>
            <a href="#about" onclick="smoothScroll('#about', event)" class="text-neo-white font-mono hover:text-neo-blue">ABOUT</a>
            <a href="#history" onclick="smoothScroll('#history', event)" class="text-neo-white font-mono hover:text-neo-blue">HISTORY</a>
            <a href="#news" onclick="smoothScroll('#news', event)" class="text-neo-white font-mono hover:text-neo-blue">NEWS</a>
            <a href="#join" onclick="smoothScroll('#join', event)" class="text-neo-white font-mono hover:text-neo-blue">JOIN</a>
        </div>
    </nav>

    <!-- Main Content -->
    <main id="main">
        <!-- Hero Section -->
        <section id="hero" class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            <div class="absolute inset-0 grid-bg opacity-30 animate-grid-move"></div>
            <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-neo-blue/10 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0055ff]/10 rounded-full blur-[120px] animate-pulse-slow" style="animation-delay: 2s"></div>

            <div class="container mx-auto px-6 relative z-10 text-center">
                <div class="mb-4 inline-block animate-pulse-slow reveal-load">
                     <span class="font-mono text-neo-blue text-sm tracking-[0.3em] border border-neo-blue/30 px-3 py-1 rounded-full bg-neo-blue/5">EST. 1963 // GLOBAL TECHNOLOGY</span>
                </div>

                <h1 class="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter text-neo-white mb-6 leading-none">
                    <span id="hero-l1" class="block transform transition-all duration-1000 delay-100 reveal-load">
                         <span class="block animate-float">
                             <span class="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neo-blue to-white bg-[length:200%_auto] animate-slow-pan">
                                ADVANCING
                             </span>
                         </span>
                    </span>
                    <span id="hero-l2" class="block transform transition-all duration-1000 delay-200 reveal-load">
                         <span class="block animate-float" style="animation-delay: 1s">
                             <span class="block text-transparent bg-clip-text bg-gradient-to-r from-neo-blue via-white to-neo-blue bg-[length:200%_auto] animate-slow-pan">
                                TECHNOLOGY
                             </span>
                         </span>
                    </span>
                    <span id="hero-l3" class="block text-stroke-white text-4xl md:text-6xl mt-2 opacity-50 reveal-load" style="transition-delay: 300ms">FOR HUMANITY</span>
                </h1>

                <p id="hero-desc" class="max-w-2xl mx-auto text-neo-gray font-mono text-lg mb-10 reveal-load" style="transition-delay: 400ms">
                    Join the world's largest technical professional organization. <span class="text-neo-blue">The future is now.</span>
                </p>

                <div class="flex flex-col md:flex-row justify-center gap-6 reveal-load" style="transition-delay: 500ms">
                    <button onclick="smoothScroll('#ai', event)" class="clip-slant px-8 py-3 bg-neo-blue text-black font-mono font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all uppercase group relative">
                        Explore Future
                        <span class="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black opacity-50"></span>
                        <span class="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black opacity-50"></span>
                    </button>
                    <button class="clip-slant px-8 py-3 border border-neo-blue text-neo-blue font-mono font-bold hover:bg-neo-blue/10 transition-all uppercase group relative">
                        View Chapters
                        <span class="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neo-blue opacity-50"></span>
                        <span class="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neo-blue opacity-50"></span>
                    </button>
                </div>
            </div>
            
            <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span class="text-[10px] font-mono tracking-widest text-neo-blue">SCROLL_DOWN</span>
                <div class="w-[1px] h-12 bg-gradient-to-b from-neo-blue to-transparent"></div>
            </div>
        </section>

        <!-- Features -->
        <section id="about" class="py-24 bg-neo-black scroll-mt-20">
            <div class="container mx-auto px-6">
                <div class="flex flex-col md:flex-row justify-between items-end mb-16 reveal-on-scroll">
                    <div>
                        <h2 id="features-title" class="text-4xl md:text-5xl font-orbitron font-bold mb-4">CORE <span class="text-neo-blue">DIVISIONS</span></h2>
                        <div class="h-1 w-24 bg-neo-blue"></div>
                    </div>
                    <p id="features-subtitle" class="text-neo-gray max-w-md text-right font-mono mt-4 md:mt-0">
                        /ACCESSING_DATABASE/SECTOR_01<br>Exploring the pillars of modern engineering.
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="features-grid"></div>
            </div>
        </section>
        
        <!-- AI Tech Stream -->
        <section id="ai" class="py-24 bg-neo-black relative border-t border-neo-gray/10 scroll-mt-20">
          <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row gap-12 items-start">
              <!-- Input -->
              <div class="w-full md:w-1/3 reveal-on-scroll">
                <h2 class="text-4xl font-orbitron font-bold text-neo-white mb-2">NEO<span class="text-neo-blue">_CONCEPT</span></h2>
                <p class="text-neo-gray font-mono mb-8 text-sm">Use the IEEE Innovation Engine powered by Groq AI.</p>
                <form onsubmit="handleGenerate(event)" class="space-y-4">
                  <div class="relative">
                    <input type="text" id="ai-prompt" placeholder="Enter a topic (e.g. Smart Cities)" class="w-full bg-neo-card border border-neo-gray/30 text-neo-white p-4 pl-10 focus:outline-none focus:border-neo-blue font-mono transition-colors" />
                    <svg class="absolute left-3 top-4 w-4 h-4 text-neo-blue/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <button type="submit" id="ai-btn" class="w-full relative px-8 py-3 font-mono font-bold uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 clip-slant bg-neo-blue text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] flex justify-center items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg> GENERATE_CONCEPT
                  </button>
                </form>
                <div class="mt-8 p-4 border border-neo-blue/10 bg-neo-blue/5 rounded text-xs font-mono text-neo-blue/70">
                  <p>SYSTEM_STATUS: ONLINE</p><p>API_GATEWAY: GROQ-LLAMA3-70B</p><p>LATENCY: ~150ms</p>
                </div>
              </div>
              <!-- Output -->
              <div class="w-full md:w-2/3 min-h-[400px] reveal-on-scroll" style="transition-delay: 200ms" id="ai-output">
                 <div class="h-full flex items-center justify-center opacity-30">
                   <div class="text-center">
                     <svg class="w-24 h-24 mx-auto mb-4 text-neo-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>
                     <p class="font-orbitron text-2xl text-neo-white">AWAITING INPUT</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Mission Section -->
        <section id="mission" class="py-24 bg-neo-dark relative border-y border-neo-gray/5">
          <div class="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
          <div class="container mx-auto px-6 relative z-10">
              <div class="flex flex-col lg:flex-row gap-12 items-center reveal-on-scroll">
                <div class="lg:w-1/2">
                   <div class="inline-flex items-center gap-2 text-neo-blue border border-neo-blue/30 bg-neo-blue/5 px-3 py-1 rounded-full text-xs font-mono mb-6">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      <span id="mission-label">OUR MISSION</span>
                   </div>
                   <h2 id="mission-title" class="text-4xl md:text-5xl font-orbitron font-bold text-neo-white mb-6 leading-tight">ENGINEERING THE <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-neo-blue to-white">FUTURE REALITY</span></h2>
                   <p id="mission-desc" class="text-neo-gray text-lg leading-relaxed mb-8 border-l-2 border-neo-blue pl-6">IEEE and its members inspire a global community to innovate for a better tomorrow through its more than 423,000 members in over 160 countries.</p>
                   <div class="grid grid-cols-2 gap-4" id="mission-stats"></div>
                </div>
                <div class="lg:w-1/2 relative">
                   <div class="relative z-10 bg-neo-card p-2 border border-neo-blue/20 rotate-2 hover:rotate-0 transition-transform duration-500">
                      <div class="absolute -inset-1 bg-neo-blue/20 blur-lg opacity-50"></div>
                      <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" alt="IEEE Tech" class="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500 relative z-10 border border-neo-gray/20">
                      <div class="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur border border-neo-blue/30 p-3 z-20"><p class="font-mono text-xs text-neo-blue">SYS.IMG_884 // LAB_01</p></div>
                   </div>
                </div>
              </div>
          </div>
        </section>

        <!-- HISTORY SECTION -->
        <section id="history" class="py-24 bg-neo-black relative scroll-mt-20 overflow-hidden">
          <div class="absolute inset-0 bg-grid-bg opacity-10 pointer-events-none"></div>
          <div class="container mx-auto px-6 relative z-10">
            <div class="flex items-end justify-between mb-20 reveal-on-scroll">
                <div>
                   <div class="inline-flex items-center gap-2 text-neo-blue border border-neo-blue/30 bg-neo-blue/5 px-3 py-1 rounded-full text-xs font-mono mb-4">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                      <span id="history-sub" class="tracking-widest uppercase">ARCHIVED DATA LOGS</span>
                   </div>
                   <h2 id="history-title" class="text-4xl font-orbitron font-bold text-neo-white">SYSTEM LEGACY</h2>
                </div>
                <div class="hidden md:block w-32 h-1 bg-gradient-to-r from-neo-blue to-transparent"></div>
            </div>
            <!-- Blocks Container -->
            <div class="flex flex-col gap-6" id="history-timeline"></div>
          </div>
        </section>

        <!-- Team Section -->
        <section id="team" class="py-24 bg-neo-black relative scroll-mt-20">
           <div class="container mx-auto px-6">
                <div class="text-center mb-16 reveal-on-scroll">
                  <h2 id="team-title" class="text-4xl font-orbitron font-bold mb-2 text-neo-white">SYSTEM ARCHITECTS</h2>
                  <p id="team-sub" class="text-neo-blue font-mono text-sm tracking-widest uppercase">THE MINDS BEHIND THE GRID</p>
                </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="team-grid"></div>
           </div>
        </section>

        <!-- Marquee -->
        <div class="w-full bg-neo-blue py-2 overflow-hidden transform -rotate-1 scroll-mt-24">
            <div id="marquee-content" class="whitespace-nowrap animate-marquee flex gap-8 text-black font-bold font-mono"></div>
        </div>
        
        <!-- News Section -->
        <section id="news" class="py-24 bg-neo-black relative scroll-mt-20">
            <div class="container mx-auto px-6">
                <div class="flex flex-col md:flex-row justify-between items-end mb-12 reveal-on-scroll">
                   <div>
                     <h2 class="text-4xl font-orbitron font-bold text-neo-white">LATEST <span class="text-neo-blue">TRANSMISSIONS</span></h2>
                     <div class="h-1 w-24 bg-neo-blue mt-2"></div>
                   </div>
                   <a href="#" class="hidden md:flex items-center gap-2 text-neo-blue font-mono hover:text-neo-white transition-colors group">
                     VIEW_ARCHIVE <span class="group-hover:translate-x-1 transition-transform">→</span>
                   </a>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <!-- Featured News -->
                     <div class="lg:col-span-2 reveal-on-scroll">
                        <div class="group relative h-full bg-neo-dark border border-neo-blue/30 overflow-hidden flex flex-col md:flex-row shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                           <div class="absolute top-0 left-0 w-full h-[2px] bg-neo-blue z-20 animate-[scanline_4s_linear_infinite] opacity-50 pointer-events-none"></div>
                           <div class="w-full md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden border-r border-neo-blue/20">
                              <div class="absolute inset-0 bg-neo-blue/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
                              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=600" alt="Featured" class="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" />
                              <div class="absolute top-4 left-4 z-20 flex gap-2"><span class="bg-neo-black/80 text-neo-blue border border-neo-blue px-2 py-1 text-[10px] font-mono flex items-center gap-1">● LIVE_FEED</span></div>
                           </div>
                           <div class="w-full md:w-1/2 p-8 flex flex-col relative bg-neo-card/50 backdrop-blur-sm">
                              <div class="flex justify-between items-center mb-6 text-xs font-mono text-neo-gray border-b border-neo-gray/10 pb-4">
                                <div class="flex items-center gap-2"><span class="text-neo-white">2077.11.07</span></div>
                                <div class="flex items-center gap-2 text-neo-blue"><span>SYNCED</span></div>
                              </div>
                              <h3 class="text-2xl font-bold text-neo-white mb-4 font-orbitron group-hover:text-neo-blue transition-colors leading-tight reveal-on-scroll" style="transition-delay: 200ms">Global Grid Synchronization Complete</h3>
                              <p class="text-neo-gray text-sm leading-relaxed mb-8 flex-grow font-mono">The final node of the planetary neural grid has been successfully activated...</p>
                              <div class="mt-auto">
                                <div class="w-full h-[1px] bg-neo-blue/20 mb-4"></div>
                                <button class="w-full flex items-center justify-between text-sm font-mono font-bold uppercase tracking-wider text-neo-black bg-neo-blue hover:bg-white px-4 py-3 clip-slant transition-all duration-300"><span>ACCESS_DATA</span></button>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="flex flex-col gap-6">
                        <div class="group relative bg-neo-card border-l-4 border-l-neo-blue p-6 flex flex-col hover:-translate-x-2 transition-all duration-300 reveal-on-scroll" style="transition-delay: 0ms">
                            <div class="flex justify-between items-center mb-4 text-xs font-mono text-neo-gray"><span>2077.11.02</span> <span class="text-neo-blue/70 bg-neo-blue/5 border border-neo-blue/20 px-2 py-0.5 rounded text-[10px]">QUANTUM</span></div>
                            <h3 class="text-lg font-bold text-neo-white mb-3 group-hover:text-neo-blue transition-colors reveal-on-scroll" style="transition-delay: 300ms">Breakthrough in Neural Latency</h3>
                            <p class="text-xs text-neo-gray mb-4 line-clamp-3">IEEE researchers achieve near-zero latency in biological-digital interfaces.</p>
                            <button class="text-xs font-mono font-bold uppercase text-neo-white hover:text-neo-blue mt-auto w-fit flex items-center gap-2">READ_LOG >></button>
                        </div>
                         <div class="group relative bg-neo-card border-l-4 border-l-neo-blue p-6 flex flex-col hover:-translate-x-2 transition-all duration-300 reveal-on-scroll" style="transition-delay: 150ms">
                            <div class="flex justify-between items-center mb-4 text-xs font-mono text-neo-gray"><span>2077.10.24</span> <span class="text-neo-blue/70 bg-neo-blue/5 border border-neo-blue/20 px-2 py-0.5 rounded text-[10px]">ROBOTICS</span></div>
                            <h3 class="text-lg font-bold text-neo-white mb-3 group-hover:text-neo-blue transition-colors reveal-on-scroll" style="transition-delay: 300ms">Sentient Standards v4.0</h3>
                            <p class="text-xs text-neo-gray mb-4 line-clamp-3">New safety guidelines established for Level 5 autonomous synthetic lifeforms.</p>
                            <button class="text-xs font-mono font-bold uppercase text-neo-white hover:text-neo-blue mt-auto w-fit flex items-center gap-2">READ_LOG >></button>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        <!-- CONTACT Section (Form) -->
        <section id="contact" class="py-24 bg-neo-dark relative border-t border-neo-gray/10">
           <div class="container mx-auto px-6 max-w-2xl">
              <div class="text-center mb-12 reveal-on-scroll">
                 <div class="inline-flex items-center gap-2 text-neo-blue border border-neo-blue/30 bg-neo-blue/5 px-3 py-1 rounded-full text-xs font-mono mb-4">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <span id="contact-sub">ESTABLISH UPLINK</span>
                 </div>
                 <h2 id="contact-title" class="text-3xl md:text-4xl font-orbitron font-bold text-neo-white">SECURE TRANSMISSION</h2>
              </div>
              <form onsubmit="handleContact(event)" class="space-y-6 bg-neo-card p-8 border border-neo-gray/20 shadow-lg relative overflow-hidden group hover:border-neo-blue/50 transition-all duration-300 reveal-on-scroll">
                 <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neo-blue to-transparent opacity-50"></div>
                 <div class="space-y-2">
                    <label id="label-name" class="text-xs font-mono text-neo-blue tracking-widest uppercase">IDENTIFIER // NAME</label>
                    <input type="text" required class="w-full bg-neo-black border border-neo-gray/30 p-3 text-neo-white focus:outline-none focus:border-neo-blue transition-colors font-mono" placeholder="Ex: John Doe" />
                 </div>
                 <div class="space-y-2">
                    <label id="label-email" class="text-xs font-mono text-neo-blue tracking-widest uppercase">DIGITAL_ID // EMAIL</label>
                    <input type="email" required class="w-full bg-neo-black border border-neo-gray/30 p-3 text-neo-white focus:outline-none focus:border-neo-blue transition-colors font-mono" placeholder="Ex: unit@ieee.org" />
                 </div>
                 <div class="space-y-2">
                    <label id="label-msg" class="text-xs font-mono text-neo-blue tracking-widest uppercase">DATA_PACKET // MESSAGE</label>
                    <textarea rows={4} class="w-full bg-neo-black border border-neo-gray/30 p-3 text-neo-white focus:outline-none focus:border-neo-blue transition-colors font-mono" placeholder="..."></textarea>
                 </div>
                 <button type="submit" id="contact-btn" class="w-full bg-neo-blue text-black font-mono font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors flex items-center justify-center gap-2 group/btn">
                    <span>TRANSMIT DATA</span>
                    <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                 </button>
              </form>
           </div>
        </section>

        <!-- Footer -->
        <footer class="bg-neo-dark pt-16 pb-8 border-t border-neo-gray/10">
            <div class="container mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                   <div class="col-span-1 md:col-span-2">
                      <h2 class="text-2xl font-orbitron font-bold text-neo-white mb-4">IEEE</h2>
                      <p id="footer-desc" class="text-neo-gray max-w-sm mb-6">Fostering technological innovation and excellence for the benefit of humanity.</p>
                      <div class="flex gap-4">
                         <a href="#" class="text-xs font-mono text-neo-blue border border-neo-blue/30 px-3 py-1 hover:text-neo-white hover:bg-neo-blue/10 transition-colors uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-neo-blue rounded">Twitter</a>
                         <a href="#" class="text-xs font-mono text-neo-blue border border-neo-blue/30 px-3 py-1 hover:text-neo-white hover:bg-neo-blue/10 transition-colors uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-neo-blue rounded">LinkedIn</a>
                         <a href="#" class="text-xs font-mono text-neo-blue border border-neo-blue/30 px-3 py-1 hover:text-neo-white hover:bg-neo-blue/10 transition-colors uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-neo-blue rounded">Facebook</a>
                         <a href="#" class="text-xs font-mono text-neo-blue border border-neo-blue/30 px-3 py-1 hover:text-neo-white hover:bg-neo-blue/10 transition-colors uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-neo-blue rounded">Instagram</a>
                      </div>
                   </div>
                   <div>
                      <h4 id="footer-nav-title" class="font-bold text-neo-white mb-4 text-sm uppercase tracking-widest">Navigation</h4>
                      <ul id="footer-nav-list" class="space-y-2 text-neo-gray font-mono text-sm"></ul>
                   </div>
                   <div>
                      <h4 id="footer-contact-title" class="font-bold text-neo-white mb-4 text-sm uppercase tracking-widest">Contact</h4>
                      <p class="text-neo-gray text-sm font-mono">3 Park Avenue, 17th Floor<br>New York, NY 10016-5997<br>USA<br><br><span class="text-neo-blue">contact@ieee.org</span></p>
                   </div>
                </div>
                <div class="border-t border-neo-gray/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neo-gray font-mono">
                    <div class="flex flex-col md:flex-row gap-4 items-center mb-4 md:mb-0">
                       <p>&copy; 2025 IEEE. All rights reserved.</p>
                       <span class="hidden md:inline text-neo-blue/50">|</span>
                       <p class="text-neo-blue animate-pulse">Made by Hussain</p>
                    </div>
                    <div class="flex gap-6">
                        <a href="#" class="hover:text-neo-white focus:outline-none focus-visible:text-neo-blue focus-visible:underline">Privacy Policy</a>
                        <a href="#" class="hover:text-neo-white focus:outline-none focus-visible:text-neo-blue focus-visible:underline">Terms & Conditions</a>
                        <a href="#" class="hover:text-neo-white focus:outline-none focus-visible:text-neo-blue focus-visible:underline">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
        
        <button id="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" class="fixed bottom-40 right-8 bg-neo-blue text-black p-3 z-40 hover:bg-neo-white transition-all duration-500 shadow-lg shadow-neo-blue/30 group opacity-0 pointer-events-none translate-y-4 rounded-full" aria-label="Scroll Top"><svg class="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg></button>
        
        <div id="access-wrapper" class="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-3">
            <div id="access-menu" class="hidden bg-neo-card text-neo-white border border-neo-blue shadow-[0_0_30px_rgba(0,240,255,0.2)] p-4 rounded-lg w-72 mb-2 animate-in slide-in-from-bottom-5 fade-in duration-200">
               <div class="flex justify-between items-center mb-4 border-b border-neo-gray/20 pb-2"><h3 class="font-orbitron font-bold text-neo-white text-sm">ACCESSIBILITY</h3><span class="text-[10px] font-mono text-neo-blue animate-pulse">● ACTIVE</span></div>
               <div class="space-y-4 font-mono">
                  <div class="flex justify-between text-neo-white text-xs items-center"><span class="flex items-center gap-2 text-neo-gray"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg> LANGUAGE (اللغة)</span><button onclick="toggleLang()" class="border px-3 py-1 rounded border-neo-gray/30 text-neo-white hover:border-neo-blue hover:text-neo-blue transition-colors" id="lang-btn">ENGLISH</button></div>
                   <div class="flex justify-between text-neo-white text-xs items-center"><span class="flex items-center gap-2 text-neo-gray"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 5 8.268 7.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> GRAYSCALE</span><button onclick="document.documentElement.classList.toggle('grayscale-mode'); this.classList.toggle('bg-neo-blue')" class="w-10 h-5 bg-neo-white/20 rounded-full relative transition-colors"><span class="absolute left-1 top-1 w-3 h-3 bg-neo-white rounded-full transition-all"></span></button></div>
                   <div class="flex justify-between text-neo-white text-xs items-center"><span class="flex items-center gap-2 text-neo-gray"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg> SIZE</span><div class="flex gap-1"><button onclick="resizeFont(-0.1)" class="w-6 h-6 border border-neo-gray/30 hover:border-neo-blue text-neo-white flex items-center justify-center rounded">-</button><button onclick="resizeFont(0.1)" class="w-6 h-6 border border-neo-gray/30 hover:border-neo-blue text-neo-white flex items-center justify-center rounded">+</button></div></div>
                  <div class="text-center pt-2 border-t border-neo-gray/10"><button onclick="resetSettings()" class="text-[10px] text-neo-gray hover:text-neo-blue underline">RESET SETTINGS</button></div>
               </div>
            </div>
            <button id="access-btn" class="p-3 rounded-full shadow-lg border-2 border-neo-blue bg-neo-black text-neo-blue hover:bg-neo-blue hover:text-black transition-all duration-300"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg></button>
        </div>

        <!-- Chatbot -->
        <div id="chatbot-wrapper" class="fixed bottom-24 right-8 z-[55] flex flex-col items-end">
           <div id="chat-window" class="hidden bg-neo-black border border-neo-blue shadow-[0_0_40px_rgba(0,240,255,0.15)] w-80 h-[400px] mb-4 rounded-lg flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
              <div class="bg-neo-blue/10 border-b border-neo-blue/30 p-3 flex justify-between items-center backdrop-blur-sm">
                 <div class="flex items-center gap-2 text-neo-blue"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg><span class="font-orbitron font-bold text-sm tracking-wider">CORE-AI // CHAT</span></div>
                 <button id="close-chat" class="text-neo-gray hover:text-neo-white transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
              </div>
              <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDI0MCwgMjU1LCAwLjAzKSIgLz4KPC9zdmc+')]">
                 <div class="flex justify-start"><div class="max-w-[85%] p-3 text-xs font-mono leading-relaxed rounded-sm border bg-neo-gray/10 border-neo-gray/30 text-neo-gray rounded-tl-none"><span class="block text-[8px] text-neo-blue mb-1 uppercase tracking-widest">System</span>SYSTEM ONLINE. Greetings, Engineer. I am CORE-AI.</div></div>
              </div>
              <form id="chat-form" class="p-3 border-t border-neo-blue/20 bg-neo-black">
                 <div class="relative flex items-center">
                    <input type="text" id="chat-input" placeholder="Enter command..." class="w-full bg-neo-dark border border-neo-gray/30 text-neo-white text-xs font-mono p-3 pr-10 focus:outline-none focus:border-neo-blue transition-colors" />
                    <button type="submit" class="absolute right-2 text-neo-blue hover:text-neo-white transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg></button>
                 </div>
              </form>
           </div>
           <button id="chat-toggle" class="p-3 rounded-full shadow-lg border-2 border-neo-blue bg-[#0a0a0f] text-neo-blue hover:bg-neo-blue hover:text-black transition-all duration-300 group relative">
              <span class="absolute -top-1 -right-1 flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-neo-blue opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-neo-blue"></span></span>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
           </button>
        </div>
    </main>

    <!-- Logic -->
    <script type="module">
        // Groq API is mocked here for the portable file version to avoid exposing keys.
        // In the full React app, this connects to the real Groq API.
        
        // State
        let currentLang = 'en';
        let fontSize = 1;

        const translations = {
            en: {
                nav: ['HOME', 'ABOUT', 'HISTORY', 'NEWS', 'JOIN'],
                heroL1: 'ADVANCING', heroL2: 'TECHNOLOGY', heroL3: 'FOR HUMANITY',
                heroDesc: "Join the world's largest technical professional organization. The future is now.",
                featuresTitle: 'CORE DIVISIONS',
                featuresSubtitle: '/ACCESSING_DATABASE/SECTOR_01<br>Exploring the pillars of modern engineering.',
                features: [
                    {t: 'Global Connectivity', d: 'Connecting engineers across 160+ countries to foster technological innovation.'},
                    {t: 'Standardization', d: 'Setting the industry standards for telecommunications, IT, and power generation.'},
                    {t: 'Emerging Tech', d: 'Leading research in Quantum Computing, IoT, and Artificial Intelligence.'},
                    {t: 'Digital Library', d: 'Access to over 5 million documents in the IEEE Xplore digital library.'}
                ],
                marquee: "IEEE INNOVATION // ADVANCING TECHNOLOGY // FUTURE FORWARD // ",
                footerDesc: "Fostering technological innovation and excellence for the benefit of humanity.",
                footerNavTitle: "NAVIGATION", footerContactTitle: "CONTACT",
                footerNavLinks: ['Home', 'Societies', 'Conferences', 'Standards', 'Careers'],
                missionLabel: 'OUR MISSION',
                missionTitle: 'ENGINEERING THE<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-neo-blue to-white">FUTURE REALITY</span>',
                missionDesc: "IEEE and its members inspire a global community to innovate for a better tomorrow through its more than 423,000 members in over 160 countries.",
                teamTitle: "SYSTEM ARCHITECTS", teamSub: "THE MINDS BEHIND THE GRID",
                team: [
                    {n: "Dr. Sarah Connor", r: "Lead Architect", b: "Pioneering the next generation of neural interfaces."},
                    {n: "James T. Kirk", r: "Quantum Engineer", b: "Specializing in entanglement and superposition."},
                    {n: "Ada Lovelace", r: "Network Ops", b: "Ensuring 99.999% uptime across the global mesh."},
                    {n: "Alan Turing", r: "AI Specialist", b: "Developing ethical synthetic consciousness."}
                ],
                stats: [ {l: "Members", v: "423K+"}, {l: "Countries", v: "160+"}, {l: "Conferences", v: "2,000+"}, {l: "Standards", v: "1,300+"} ],
                joinTitle: "GLOBAL NEXUS", joinSub: "INITIATE MEMBERSHIP PROTOCOL",
                joinText1: "We are building the infrastructure for the next century. IEEE is not merely an organization; it is a collective intelligence engine powering the advancement of humanity.",
                joinText2: "By joining the grid, you gain access to unrestricted knowledge streams, global networking protocols, and the ability to shape the standards that will define our digital reality.",
                joinBenefits: ["Access to IEEE Xplore Digital Library", "Professional Networking & Mentorship", "Discounts on Conferences & Certifications"],
                joinBtn: "INITIALIZE ACCESS",
                contactSub: "ESTABLISH UPLINK", contactTitle: "SECURE TRANSMISSION",
                labelName: "IDENTIFIER // NAME", labelEmail: "DIGITAL_ID // EMAIL", labelMsg: "DATA_PACKET // MESSAGE",
                btnSubmit: "TRANSMIT DATA", btnSending: "TRANSMITTING...", btnSuccess: "TRANSMISSION COMPLETE",
                historyTitle: "SYSTEM LEGACY", historySub: "ARCHIVED DATA LOGS",
                historyEvents: [
                  { year: "1884", title: "AIEE INITIALIZED", desc: "American Institute of Electrical Engineers founded by Thomas Edison and Alexander Graham Bell." },
                  { year: "1912", title: "IRE PROTOCOL", desc: "Institute of Radio Engineers established to govern wireless transmission standards." },
                  { year: "1963", title: "SYSTEM MERGE: IEEE", desc: "AIEE and IRE fuse to form the Institute of Electrical and Electronics Engineers." },
                  { year: "2025", title: "GLOBAL NETWORK", desc: "The world's largest technical professional organization dedicated to advancing technology." }
                ]
            },
            ar: {
                nav: ['الرئيسية', 'حول', 'التاريخ', 'أخبار', 'انضم إلينا'],
                heroL1: 'التقدم', heroL2: 'التكنولوجي', heroL3: 'من أجل البشرية',
                heroDesc: 'انضم إلى أكبر منظمة مهنية تقنية في العالم. المستقبل يبدأ الآن.',
                featuresTitle: 'الأقسام الرئيسية', featuresSubtitle: '/الوصول_إلى_قاعدة_البيانات/قطاع_01<br>استكشاف ركائز الهندسة الحديثة.',
                features: [
                    {t: 'الاتصال العالمي', d: 'ربط المهندسين في أكثر من 160 دولة لتعزيز الابتكار التكنولوجي.'},
                    {t: 'المعايير القياسية', d: 'وضع معايير الصناعة للاتصالات وتكنولوجيا المعلومات وتوليد الطاقة.'},
                    {t: 'التقنيات الناشئة', d: 'ريادة الأبحاث في الحوسبة الكمومية، إنترنت الأشياء، والذكاء الاصطناعي.'},
                    {t: 'المكتبة الرقمية', d: 'الوصول إلى أكثر من 5 ملايين وثيقة في مكتبة IEEE الرقمية.'}
                ],
                marquee: "IEEE ابتكار // تقدم تكنولوجي // نحو المستقبل // ",
                footerDesc: "تعزيز الابتكار التكنولوجي والتميز لصالح البشرية.",
                footerNavTitle: "التنقل", footerContactTitle: "اتصل بنا",
                footerNavLinks: ['الرئيسية', 'المجتمعات', 'المؤتمرات', 'المعايير', 'الوظائف'],
                missionLabel: 'رسالتنا',
                missionTitle: 'بناء المستقبل <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-neo-blue to-white">التكنولوجي</span>',
                missionDesc: "تلهم IEEE وأعضاؤها مجتمعاً عالمياً للابتكار من أجل غد أفضل من خلال أكثر من 423,000 عضو في أكثر من 160 دولة.",
                teamTitle: "مهندسو النظام", teamSub: "العقول خلف الشبكة",
                team: [
                    {n: "د. سارة كونور", r: "كبير المهندسين", b: "ريادة الجيل القادم من الواجهات العصبية."},
                    {n: "جيمس كيرك", r: "مهندس كمي", b: "مختص في التشابك والتراكب الكمي."},
                    {n: "آدا لوفليس", r: "عمليات الشبكة", b: "ضمان استقرار الشبكة بنسبة 99.999٪ عالمياً."},
                    {n: "آلان تورينج", r: "اخصائي ذكاء اصطناعي", b: "تطوير الوعي الاصطناعي الأخلاقي."}
                ],
                stats: [ {l: "عضو", v: "423K+"}, {l: "دولة", v: "160+"}, {l: "مؤتمر", v: "2,000+"}, {l: "معيار", v: "1,300+"} ],
                joinTitle: "الرابطة العالمية", joinSub: "بدء بروتوكول العضوية",
                joinText1: "نحن نبني البنية التحتية للقرن القادم. IEEE ليست مجرد منظمة؛ إنها محرك ذكاء جماعي يغذي تقدم البشرية.",
                joinText2: "من خلال الانضمام إلى الشبكة، يمكنك الوصول إلى تدفقات المعرفة غير المقيدة، وبروتوكولات التواصل العالمية، والقدرة على صياغة المعايير التي ستحدد واقعنا الرقمي.",
                joinBenefits: ["الوصول إلى مكتبة IEEE Xplore الرقمية", "التواصل المهني والإرشاد", "خصومات على المؤتمرات والشهادات"],
                joinBtn: "بدء الوصول",
                contactSub: "إنشاء اتصال", contactTitle: "إرسال آمن",
                labelName: "المعرف // الاسم", labelEmail: "الهوية الرقمية // البريد الإلكتروني", labelMsg: "حزمة البيانات // الرسالة",
                btnSubmit: "إرسال البيانات", btnSending: "جاري الإرسال...", btnSuccess: "تم الإرسال بنجاح",
                historyTitle: "تاريخ النظام", historySub: "سجلات البيانات المؤرشفة",
                historyEvents: [
                  { year: "1884", title: "تأسيس AIEE", desc: "تأسيس المعهد الأمريكي لمهندسي الكهرباء من قبل توماس إديسون وألكسندر جراهام بيل." },
                  { year: "1912", title: "بروتوكول IRE", desc: "تأسيس معهد مهندسي الراديو لحكم معايير البث اللاسلكي." },
                  { year: "1963", title: "اندماج النظام: IEEE", desc: "اندماج AIEE و IRE لتشكيل معهد مهندسي الكهرباء والإلكترونيات." },
                  { year: "2025", title: "الشبكة العالمية", desc: "أكبر منظمة مهنية فنية في العالم مكرسة لتعزيز التكنولوجيا." }
                ]
            }
        };

        function renderContent() {
            const t = translations[currentLang];
            const isAr = currentLang === 'ar';
            document.documentElement.dir = isAr ? 'rtl' : 'ltr';
            document.documentElement.lang = currentLang;

            document.getElementById('hero-l1').innerHTML = \`<span class="block animate-float"><span class="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neo-blue to-white bg-[length:200%_auto] animate-slow-pan">\${t.heroL1}</span></span>\`;
            document.getElementById('hero-l2').innerHTML = \`<span class="block animate-float" style="animation-delay: 1s"><span class="block text-transparent bg-clip-text bg-gradient-to-r from-neo-blue via-white to-neo-blue bg-[length:200%_auto] animate-slow-pan">\${t.heroL2}</span></span>\`;
            document.getElementById('hero-l3').innerText = t.heroL3;
            document.getElementById('hero-desc').innerHTML = isAr ? t.heroDesc : t.heroDesc.replace('The future is now.', '<span class="text-neo-blue">The future is now.</span>');
            document.getElementById('features-title').innerHTML = isAr ? t.featuresTitle : 'CORE <span class="text-neo-blue">DIVISIONS</span>';
            document.getElementById('features-subtitle').innerHTML = t.featuresSubtitle;
            document.getElementById('mission-label').innerText = t.missionLabel;
            document.getElementById('mission-title').innerHTML = t.missionTitle;
            document.getElementById('mission-desc').innerText = t.missionDesc;
            document.getElementById('history-title').innerText = t.historyTitle;
            document.getElementById('history-sub').innerText = t.historySub;
            document.getElementById('team-title').innerText = t.teamTitle;
            document.getElementById('team-sub').innerText = t.teamSub;
            document.getElementById('contact-sub').innerText = t.contactSub;
            document.getElementById('contact-title').innerText = t.contactTitle;
            document.getElementById('label-name').innerText = t.labelName;
            document.getElementById('label-email').innerText = t.labelEmail;
            document.getElementById('label-msg').innerText = t.labelMsg;
            const btn = document.getElementById('contact-btn');
            if(btn && !btn.disabled) btn.querySelector('span').innerText = t.btnSubmit;
            document.getElementById('footer-desc').innerText = t.footerDesc;
            document.getElementById('footer-nav-title').innerText = t.footerNavTitle;
            document.getElementById('footer-contact-title').innerText = t.footerContactTitle;
            document.getElementById('lang-btn').innerText = isAr ? 'ARABIC' : 'ENGLISH';

            const icons = [
               '<svg class="w-8 h-8 text-neo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
               '<svg class="w-8 h-8 text-neo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
               '<svg class="w-8 h-8 text-neo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
               '<svg class="w-8 h-8 text-neo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>'
            ];
            document.getElementById('features-grid').innerHTML = t.features.map((f, i) => \`<div class="group relative bg-neo-card border border-neo-gray/20 p-6 overflow-hidden transition-all duration-500 hover:border-neo-blue/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] h-full reveal-on-scroll" style="transition-delay: \${i * 100}ms"><div class="absolute inset-0 bg-gradient-to-br from-neo-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div><div class="relative z-10 text-neo-white"><div class="group/icon relative mb-4 p-3 bg-neo-blue/10 w-fit rounded border border-neo-blue/20">\${icons[i]}<div class="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-neo-black border border-neo-blue text-[10px] font-mono text-neo-blue uppercase opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 shadow-[0_0_10px_rgba(0,240,255,0.3)]">\${f.t}<div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-neo-black border-r border-b border-neo-blue rotate-45"></div></div></div><h3 class="text-xl font-bold font-sans mb-2 tracking-wide text-neo-white group-hover:text-neo-blue transition-colors">\${f.t}</h3><p class="text-neo-gray text-sm leading-relaxed">\${f.d}</p></div><div class="absolute bottom-0 left-0 h-[2px] w-0 bg-neo-blue group-hover:w-full transition-all duration-700 ease-in-out"></div></div>\`).join('');

            const statsIcons = ['<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>', '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>', '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>', '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'];
            document.getElementById('mission-stats').innerHTML = t.stats.map((s, i) => \`<div class="bg-neo-card border border-neo-gray/10 p-4 hover:border-neo-blue/30 transition-colors"><div class="flex items-center gap-2 text-neo-blue mb-2">\${statsIcons[i]}<span class="font-bold font-orbitron text-2xl text-white">\${s.v}</span></div><p class="text-xs font-mono text-neo-gray uppercase tracking-wider">\${s.l}</p></div>\`).join('');

            document.getElementById('history-timeline').innerHTML = t.historyEvents.map((item, index) => \`<div class="group relative w-full bg-neo-dark border-y border-neo-gray/10 hover:border-neo-blue hover:bg-neo-blue/5 transition-all duration-300 py-8 px-6 flex flex-col md:flex-row items-start md:items-center gap-8 overflow-hidden reveal-on-scroll" style="transition-delay: \${index * 100}ms"><div class="absolute left-0 top-0 bottom-0 w-1 bg-neo-blue opacity-0 group-hover:opacity-100 transition-opacity"></div><div class="md:w-1/4 flex-shrink-0 relative"><span class="text-6xl md:text-8xl font-orbitron font-black text-transparent text-stroke-white opacity-20 group-hover:opacity-40 group-hover:text-neo-blue transition-all duration-300 select-none">\${item.year}</span><div class="absolute bottom-2 left-2 text-[10px] font-mono text-neo-blue opacity-0 group-hover:opacity-100 transition-opacity">INDEX_0\${index + 1}</div></div><div class="hidden md:block h-[1px] w-12 bg-neo-gray/30 group-hover:bg-neo-blue transition-colors"></div><div class="flex-grow"><div class="flex items-center gap-3 mb-2"><h3 class="text-2xl font-bold text-neo-white font-mono uppercase group-hover:text-neo-blue transition-colors">\${item.title}</h3><div class="hidden md:block px-2 py-0.5 border border-neo-blue/30 text-[10px] text-neo-blue font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity">SAVED</div></div><p class="text-neo-gray font-mono text-sm leading-relaxed max-w-2xl">\${item.desc}</p></div><div class="md:ml-auto opacity-20 group-hover:opacity-100 transition-opacity text-neo-blue"><svg class="w-8 h-8 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"></circle><circle cx="12" cy="12" r="2" fill="currentColor"></circle></svg></div></div>\`).join('');

            document.getElementById('team-grid').innerHTML = t.team.map((m, i) => \`<div class="group h-full bg-neo-card border border-neo-gray/20 relative overflow-hidden hover:border-neo-blue transition-colors duration-300 reveal-on-scroll" style="transition-delay: \${i * 150}ms"><div class="relative h-48 bg-neo-dark flex items-center justify-center border-b border-neo-gray/10 group-hover:bg-neo-blue/5 transition-colors"><div class="absolute inset-0 grid-bg opacity-30"></div><div class="relative z-10 w-24 h-24 rounded-full border-2 border-neo-blue/30 flex items-center justify-center bg-neo-black group-hover:border-neo-blue group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all"><svg class="w-12 h-12 text-neo-gray group-hover:text-neo-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><div class="absolute top-2 left-2 w-2 h-2 border-t border-l border-neo-blue/50"></div><div class="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neo-blue/50"></div></div><div class="p-6 relative text-center"><h3 class="text-xl font-bold text-neo-white font-orbitron mb-1 group-hover:text-neo-blue transition-colors">\${m.n}</h3><p class="text-xs font-mono text-neo-gray uppercase mb-4 pb-2">\${m.r}</p><p class="text-sm text-neo-gray/80 leading-relaxed font-sans">\${m.b}</p><div class="mt-4 flex justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity"><div class="w-1 h-1 bg-neo-blue rounded-full"></div><div class="w-1 h-1 bg-neo-blue rounded-full animate-pulse"></div><div class="w-1 h-1 bg-neo-blue rounded-full"></div></div></div></div>\`).join('');
            document.getElementById('marquee-content').innerHTML = new Array(10).fill(t.marquee).map(s => \`<span>\${s}</span>\`).join('');
            document.getElementById('footer-nav-list').innerHTML = t.footerNavLinks.map(l => \`<li><a href="#" class="hover:text-neo-blue transition-colors focus:outline-none focus-visible:text-neo-blue focus-visible:underline rounded p-1">>> \${l}</a></li>\`).join('');
            setTimeout(initScrollObserver, 100);
        }

        // Mock API logic for the static source code version
        window.handleGenerate = async (e) => {
           e.preventDefault();
           const input = document.getElementById('ai-prompt');
           const output = document.getElementById('ai-output');
           const btn = document.getElementById('ai-btn');
           const prompt = input.value;
           if(!prompt) return;
           
           btn.innerHTML = '<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> PROCESSING...';
           output.innerHTML = \`<div class="h-full w-full flex flex-col items-center justify-center border border-dashed border-neo-gray/20 rounded bg-neo-card/50"><div class="w-16 h-16 border-4 border-neo-blue border-t-transparent rounded-full animate-spin mb-4"></div><p class="font-mono text-neo-blue animate-pulse">ESTABLISHING NEURAL HANDSHAKE...</p></div>\`;
           
           try {
             await new Promise(r => setTimeout(r, 2000));
             const concept = { title: "HYPER-MESH V2", description: "An AI-generated concept based on: " + prompt + ". This system utilizes quantum entanglement to provide instantaneous data transfer across global nodes.", specs: ["Quantum Core", "Zero Latency", "Neural Interface"], impact: "Revolutionizes global communication standards." };
             output.innerHTML = \`<div class="group relative bg-neo-card border border-neo-gray/20 p-6 overflow-hidden h-full border-neo-blue/50 shadow-[0_0_30px_rgba(0,240,255,0.1)]"><div class="flex justify-between items-start mb-6 border-b border-neo-gray/20 pb-4"><h3 class="text-3xl font-orbitron font-bold text-neo-blue uppercase">\${concept.title}</h3><svg class="w-8 h-8 text-neo-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg></div><div class="space-y-6"><div><span class="text-xs font-mono text-neo-gray uppercase tracking-widest">Description</span><p class="text-lg text-neo-white mt-2 leading-relaxed">\${concept.description}</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4">\${concept.specs.map((spec, idx) => \`<div class="bg-neo-black/50 p-3 border border-neo-gray/20"><span class="block text-[10px] text-neo-blue mb-1">SPEC_0\${idx + 1}</span><span class="font-mono text-sm text-neo-white">\${spec}</span></div>\`).join('')}</div><div class="bg-gradient-to-r from-neo-deepBlue/20 to-transparent p-4 border-l-2 border-neo-deepBlue"><span class="text-xs font-mono text-neo-blue uppercase tracking-widest">Projected Impact</span><p class="text-sm text-neo-gray mt-1 italic">"\${concept.impact}"</p></div></div></div>\`;
           } catch(err) { output.innerHTML = '<p class="text-red-500 font-mono">ERROR: NEURAL LINK FAILED</p>'; } finally { btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg> GENERATE_CONCEPT'; }
        }

        window.handleContact = (e) => {
            e.preventDefault();
            const btn = document.getElementById('contact-btn');
            const t = translations[currentLang];
            btn.disabled = true; btn.classList.remove('bg-neo-blue', 'hover:bg-white'); btn.classList.add('bg-neo-blue/50');
            btn.innerHTML = \`<span>\${t.btnSending}</span><div class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>\`;
            setTimeout(() => { btn.classList.remove('bg-neo-blue/50'); btn.classList.add('bg-green-500'); btn.innerHTML = \`<span>\${t.btnSuccess}</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>\`; setTimeout(() => { btn.disabled = false; btn.classList.remove('bg-green-500'); btn.classList.add('bg-neo-blue', 'hover:bg-white'); btn.innerHTML = \`<span>\${t.btnSubmit}</span><svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>\`; e.target.reset(); }, 3000); }, 1500);
        }

        // Chatbot Logic
        const chatWindow = document.getElementById('chat-window');
        const chatToggle = document.getElementById('chat-toggle');
        const closeChat = document.getElementById('close-chat');
        const chatForm = document.getElementById('chat-form');
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        
        chatToggle.addEventListener('click', () => {
           chatWindow.classList.toggle('hidden');
           if(!chatWindow.classList.contains('hidden')) {
              chatToggle.classList.add('bg-neo-blue', 'text-black', 'scale-110');
           } else {
              chatToggle.classList.remove('bg-neo-blue', 'text-black', 'scale-110');
           }
        });
        
        closeChat.addEventListener('click', () => {
           chatWindow.classList.add('hidden');
           chatToggle.classList.remove('bg-neo-blue', 'text-black', 'scale-110');
        });

        // Close Chatbot on Click Outside
        document.addEventListener('mousedown', (e) => {
            if (!chatWindow.classList.contains('hidden') &&
                !chatWindow.contains(e.target) &&
                !chatToggle.contains(e.target)) {
                chatWindow.classList.add('hidden');
                chatToggle.classList.remove('bg-neo-blue', 'text-black', 'scale-110');
            }
        });
        
        chatForm.addEventListener('submit', async (e) => {
           e.preventDefault();
           const text = chatInput.value.trim();
           if(!text) return;
           
           // Add User Message
           const userMsg = document.createElement('div');
           userMsg.className = "flex justify-end";
           userMsg.innerHTML = \`<div class="max-w-[85%] p-3 text-xs font-mono leading-relaxed rounded-sm border bg-neo-blue/20 border-neo-blue/50 text-white rounded-tr-none">\${text}</div>\`;
           chatMessages.appendChild(userMsg);
           chatInput.value = '';
           chatMessages.scrollTop = chatMessages.scrollHeight;
           
           // Loading
           const loadMsg = document.createElement('div');
           loadMsg.id = "chat-loading";
           loadMsg.className = "flex justify-start";
           loadMsg.innerHTML = \`<div class="bg-neo-gray/10 border border-neo-gray/30 p-3 rounded-sm rounded-tl-none flex items-center gap-2 text-neo-blue text-xs"><span>COMPUTING...</span></div>\`;
           chatMessages.appendChild(loadMsg);
           
           // Simulate Response
           try {
              // This mocks the API call for the source code demo.
              await new Promise(r => setTimeout(r, 1500));
              loadMsg.remove();
              
              const isArabic = /[\u0600-\u06FF]/.test(text);
              const responseText = isArabic 
                ? "هذا رد محاكاة. النسخة الحية تتصل بـ Groq API ويمكنها التحدث بالعربية."
                : "This is a simulated response. The live version connects to Groq API.";

              const botMsg = document.createElement('div');
              botMsg.className = "flex justify-start";
              botMsg.innerHTML = \`<div class="max-w-[85%] p-3 text-xs font-mono leading-relaxed rounded-sm border bg-neo-gray/10 border-neo-gray/30 text-neo-gray rounded-tl-none"><span class="block text-[8px] text-neo-blue mb-1 uppercase tracking-widest">System</span>\${responseText}</div>\`;
              chatMessages.appendChild(botMsg);
              chatMessages.scrollTop = chatMessages.scrollHeight;
           } catch(err) {
              loadMsg.remove();
           }
        });

        window.toggleLang = () => { currentLang = currentLang === 'en' ? 'ar' : 'en'; renderContent(); };
        window.resizeFont = (delta) => { fontSize = Math.max(0.8, Math.min(1.5, fontSize + delta)); document.documentElement.style.setProperty('--font-scale', fontSize); };
        window.toggleTheme = () => { const html = document.documentElement; if (html.classList.contains('light')) html.classList.remove('light'); else html.classList.add('light'); }
        window.resetSettings = () => { fontSize = 1; currentLang = 'en'; document.documentElement.classList.remove('high-contrast', 'grayscale-mode'); document.documentElement.style.setProperty('--font-scale', 1); renderContent(); }
        
        // Smooth Scroll
        window.smoothScroll = (targetId, e) => { 
            if(e) e.preventDefault(); 
            const element = document.querySelector(targetId); 
            if (!element) return; 
            const startPosition = window.scrollY; 
            const headerOffset = 100; 
            const elementPosition = element.getBoundingClientRect().top; 
            const targetPosition = elementPosition + window.scrollY - headerOffset; 
            const distance = targetPosition - startPosition; 
            const duration = 400; 
            let start = null; 
            const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t); 
            const animation = (currentTime) => { 
                if (!start) start = currentTime; 
                const timeElapsed = currentTime - start; 
                const progress = Math.min(timeElapsed / duration, 1); 
                const ease = easeOutExpo(progress); 
                window.scrollTo(0, startPosition + (distance * ease)); 
                if (timeElapsed < duration) requestAnimationFrame(animation); 
                else window.scrollTo(0, targetPosition); 
            }; 
            requestAnimationFrame(animation); 
        }
        
        // Scroll Listeners
        window.addEventListener('scroll', () => { 
            const btn = document.getElementById('back-to-top'); 
            const nav = document.getElementById('navbar');
            
            // Nav Glass Effect
            if (window.scrollY > 50) nav.classList.add('glass-nav'); 
            else nav.classList.remove('glass-nav');
            
            // Back to Top Button
            if (window.scrollY > 300) { 
                btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4'); 
                btn.classList.add('opacity-100', 'translate-y-0'); 
            } else { 
                btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4'); 
                btn.classList.remove('opacity-100', 'translate-y-0'); 
            } 
        });
        
        // Scroll Reveal Observer
        const initScrollObserver = () => { 
            const observer = new IntersectionObserver((entries) => { 
                entries.forEach(entry => { 
                    if (entry.isIntersecting) { 
                        entry.target.classList.add('is-visible'); 
                        observer.unobserve(entry.target); 
                    } 
                }); 
            }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }); 
            document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el)); 
        };
        
        // Accessibility Menu
        const menu = document.getElementById('access-menu'); 
        const btn = document.getElementById('access-btn'); 
        const wrapper = document.getElementById('access-wrapper');
        
        btn.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            menu.classList.toggle('hidden'); 
            if (!menu.classList.contains('hidden')) { 
                btn.classList.add('bg-neo-blue', 'text-black', 'scale-110'); 
            } else { 
                btn.classList.remove('bg-neo-blue', 'text-black', 'scale-110'); 
            } 
        });
        
        document.addEventListener('mousedown', (e) => { 
            if (!wrapper.contains(e.target)) { 
                menu.classList.add('hidden'); 
                btn.classList.remove('bg-neo-blue', 'text-black', 'scale-110'); 
            } 
        });
        
        // Init
        setTimeout(() => { 
            document.querySelectorAll('.reveal-load').forEach(el => el.classList.add('reveal-active')); 
            initScrollObserver(); 
        }, 100);
        
        renderContent();
    </script>
</body>
</html>`;

export const CodeViewer: React.FC<CodeViewerProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SOURCE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neo-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main Window */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#0d0d14] border border-neo-blue/30 rounded-lg flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a24] border-b border-neo-blue/20 select-none">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500" />
            </div>
            <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-black/40 rounded text-xs font-mono text-neo-gray border border-white/5">
              <Terminal className="w-3 h-3 text-neo-blue" />
              <span>root@ieee-neo:~/build/index.html</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-neo-blue/10 border border-neo-blue/30 text-xs font-mono text-neo-blue hover:bg-neo-blue/20 transition-all"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'COPIED' : 'COPY_SOURCE'}
            </button>
            <button 
              onClick={onClose}
              className="p-1 hover:text-white text-neo-gray transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto custom-scrollbar relative bg-[#0d0d14]">
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>

          <div className="p-6 font-mono text-sm md:text-base leading-relaxed counter-reset-lines">
            <pre className="text-neo-gray/80">
              <code>
                {SOURCE_CODE.split('\n').map((line, i) => (
                  <div key={i} className="table-row">
                    <span className="table-cell text-right pr-6 select-none text-neo-gray/30 text-xs w-8 border-r border-neo-gray/10 mr-4">
                      {i + 1}
                    </span>
                    <span className="table-cell pl-4 whitespace-pre-wrap break-all">
                      {/* Enhanced syntax highlighting for HTML/JS */}
                      {line.split(/(\s+|[<>={}()",;])/).map((token, j) => {
                         // Keywords
                        if (token.match(/^(const|let|var|function|async|await|return|if|else|try|catch|import|from|class|new|typeof|void|export|interface)$/)) {
                          return <span key={j} className="text-neo-deepBlue font-bold">{token}</span>;
                        }
                        // HTML Tags
                        if (token.match(/^(html|head|body|div|span|section|nav|script|style|meta|title|button|svg|a|h1|h2|h3|h4|p|main|input|form|footer|circle|path|ul|li)$/)) {
                           return <span key={j} className="text-yellow-400">{token}</span>;
                        }
                        // Strings
                        if (token.match(/^('.*'|".*"|`.*`)$/)) {
                          return <span key={j} className="text-green-400">{token}</span>;
                        }
                        // Operators/Brackets
                        if (token.match(/^([<>={}()",;])$/)) {
                            return <span key={j} className="text-neo-blue">{token}</span>;
                        }
                        // Tailwind classes (rough match for illustration)
                        if (token.match(/^(text-|bg-|p-|m-|flex|grid|border|w-|h-|hidden|fixed|absolute).*$/)) {
                             return <span key={j} className="text-purple-300/80">{token}</span>;
                        }
                        return <span key={j}>{token}</span>;
                      })}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="px-4 py-1 bg-neo-black border-t border-neo-blue/20 flex justify-between items-center text-[10px] font-mono text-neo-gray/60 uppercase tracking-wider">
           <div>index.html • 12KB</div>
           <div className="flex gap-4">
             <span>Ln {SOURCE_CODE.split('\n').length}, Col 1</span>
             <span className="text-neo-blue animate-pulse">● LIVE CONNECTION</span>
           </div>
        </div>
      </div>
    </div>
  );
};