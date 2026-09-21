/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Berlin (GMT+2 / CEST) or standard local system format nicely
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      
      try {
        const formatter = new Intl.DateTimeFormat('en-US', options);
        setTimeStr(formatter.format(now));
      } catch (e) {
        setTimeStr(now.toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="footer" 
      className="relative bg-luxury-black border-t border-white/10 py-12 md:py-20 overflow-hidden font-sans select-none"
    >
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-12">
        
        {/* Double-height branding row */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 pb-12 border-b border-white/5">
          
          <div className="flex flex-col justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-sans text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase italic">
                Kamal<span className="text-orange-500">.</span>H
              </span>
              <span className="text-[9px] font-mono border border-orange-500/20 px-2 py-0.5 rounded text-orange-400 font-semibold tracking-wider uppercase mt-1">
                FROSTED GLASS EDITION
              </span>
            </div>
            
            <p className="font-sans text-xs text-white/50 max-w-sm leading-relaxed font-light">
              Design is intelligence made visible. Architectural engineering is stability made permanent. Formulating luxury code vectors globally.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2.5 text-left text-xs font-sans">
              <span className="font-mono text-[9px] font-bold text-white/40 uppercase tracking-widest">NAVIGATION</span>
              <a href="#hero" className="text-white/60 hover:text-orange-400 transition-colors">Home</a>
              <a href="#about" className="text-white/60 hover:text-orange-400 transition-colors">About</a>
              <a href="#projects" className="text-white/60 hover:text-orange-400 transition-colors">Projects</a>
            </div>
            <div className="flex flex-col gap-2.5 text-left text-xs font-sans">
              <span className="font-mono text-[9px] font-bold text-white/40 uppercase tracking-widest">CATEGORIES</span>
              <a href="#skills" className="text-white/60 hover:text-orange-400 transition-colors">Expertise</a>
              <a href="#experience" className="text-white/60 hover:text-orange-400 transition-colors">Chronicle</a>
              <a href="#services" className="text-white/60 hover:text-orange-400 transition-colors">Services</a>
            </div>
            <div className="flex flex-col gap-2.5 text-left text-xs font-sans">
              <span className="font-mono text-[9px] font-bold text-white/40 uppercase tracking-widest">UTILITIES</span>
              <a href="#testimonials" className="text-white/60 hover:text-orange-400 transition-colors">Testimonial</a>
              <a href="#certifications" className="text-white/60 hover:text-orange-400 transition-colors">Certifications</a>
              <a href="#contact" className="text-white/60 hover:text-orange-400 transition-colors">Contact</a>
            </div>
          </div>

        </div>

        {/* Real-time local clock and bottom meta details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col sm:items-start gap-1.5 text-left">
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 font-bold tracking-widest uppercase">
              <span>BERLIN, DE // DIGITAL CLOCK</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="text-sm font-mono font-bold text-white">
              {timeStr || '10:24:00 AM'} <span className="text-[10px] text-white/40 font-semibold">(GMT+2)</span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/Kamal-Hossain52625" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 border border-white/10 rounded-full text-white/50 hover:text-white hover:border-white/20 transition-all bg-white/5 hover:bg-white/10"
              aria-label="GitHub Page"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://linkedin.com/in/" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 border border-white/10 rounded-full text-white/50 hover:text-white hover:border-white/20 transition-all bg-white/5 hover:bg-white/10"
              aria-label="LinkedIn Page"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a 
              href="mailto:mariaafrin1106@gmail.com" 
              className="p-2 border border-white/10 rounded-full text-white/50 hover:text-white hover:border-white/20 transition-all bg-white/5 hover:bg-white/10"
              aria-label="Mail Address"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Scroll to Top Trigger */}
          <button
            onClick={handleScrollToTop}
            className="group flex items-center gap-1.5 font-mono text-[9px] font-extrabold tracking-widest text-orange-400 hover:text-white cursor-pointer uppercase border border-white/10 bg-white/5 hover:bg-white/10 px-4.5 py-2.5 rounded-full transition-all"
          >
            BACK TO HIGHEST
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

        {/* Legal copyrights */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-[9.5px] font-mono text-white/40 tracking-wider">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
            <span>© 2026 KAMAL HOSSAIN. PORTFOLIO CERTIFIED AUTHENTIC</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-400">TERMS OF TRANSMISSION</a>
            <span>//</span>
            <a href="#" className="hover:text-orange-400">COOKIE PREFERENCES</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
