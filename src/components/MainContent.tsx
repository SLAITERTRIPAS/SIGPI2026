import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MainContent({ onStart, onVisitante }: { onStart: () => void, onVisitante: () => void }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="text-center px-4 max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-white font-serif font-bold text-4xl md:text-[50px] leading-tight tracking-tighter mb-10 drop-shadow-2xl">
          <span className="block font-serif text-2xl md:text-[50px] leading-none">
            Sistema Integrado de Gestão de Processos Institucionais 2026
          </span>
        </h1>
        
        <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-16 leading-relaxed font-serif italic tracking-wide">
          Plataforma unificada para indicadores estratégicos, projeções acadêmicas <br className="hidden md:block" /> e conformidade normativa do ISPS.
        </p>
      </motion.div>
      
      <div className="flex flex-col gap-4 items-center relative">
        <button 
          onClick={() => setShowOptions(!showOptions)} 
          className="w-72 bg-white/10 backdrop-blur-xl text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all shadow-2xl uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 border border-white/20 group"
        >
          <span className="group-hover:scale-110 transition-transform">ENTRAR</span>
          {showOptions ? <ChevronUp size={16} className="opacity-50" /> : <ChevronDown size={16} className="opacity-50" />}
        </button>

        <AnimatePresence>
          {showOptions && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-2 mt-2 w-72 absolute top-full mt-2 z-20"
            >
              <button 
                onClick={onStart} 
                className="w-full bg-white text-[#0a0a5a] px-10 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
              >
                INICIAR O SISTEMA
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse"></div>
              </button>
              
              <button 
                onClick={() => {
                  onVisitante();
                }} 
                className="w-full bg-white/5 backdrop-blur-md text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all shadow-lg uppercase tracking-widest text-[10px] border border-white/10"
              >
                VISITANTE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-20 pt-12 border-t border-white/5">
        <p className="text-white/40 text-[10px] tracking-[0.6em] uppercase font-bold font-sans">INSTITUTO SUPERIOR POLITÉCNICO DE SONGO</p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="w-1 h-1 rounded-full bg-white/20"></div>
          <div className="w-1 h-1 rounded-full bg-white/20"></div>
          <div className="w-1 h-1 rounded-full bg-white/20"></div>
        </div>
      </div>
    </div>
  );
}
