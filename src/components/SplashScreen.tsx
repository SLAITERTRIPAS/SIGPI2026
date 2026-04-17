import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<'loading' | 'logo' | 'welcome'>('loading');

  useEffect(() => {
    // Phase 1: Loading with Year (5 seconds)
    const timer1 = setTimeout(() => {
      setPhase('logo');
    }, 5000);

    // Phase 2: Logo Transformation (5 seconds)
    const timer2 = setTimeout(() => {
      setPhase('welcome');
    }, 10000);

    // Phase 3: Welcome (Wait for user click)
    // Removed automatic onFinish
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center"
          >
            <div className="flex items-center justify-center gap-6 mb-12">
              {[
                { color: 'bg-blue-600', delay: 0 },
                { color: 'bg-red-600', delay: 0.15 },
                { color: 'bg-yellow-400', delay: 0.3 },
                { color: 'bg-green-500', delay: 0.45 }
              ].map((ball, i) => (
                <motion.div
                  key={i}
                  className={`w-12 h-12 rounded-full ${ball.color} shadow-xl flex items-center justify-center text-white font-black text-xl`}
                  animate={{ 
                    y: [0, -40, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: ball.delay,
                    ease: "easeInOut" 
                  }}
                >
                  {currentYear.toString()[i]}
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-blue-900 font-black text-2xl tracking-[0.4em] uppercase animate-pulse">Processando...</p>
            </motion.div>
          </motion.div>
        )}

        {phase === 'logo' && (
          <motion.div
            key="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-900 p-2 bg-white"
              initial={{ borderRadius: "50%", scale: 0.5, rotate: -180 }}
              animate={{ borderRadius: "24px", scale: 1, rotate: 0 }}
              transition={{ duration: 2, ease: "backOut" }}
            >
              <img 
                src="https://sigpro.ispsongo.ac.mz/images/logotipo.jpg" 
                alt="ISPS Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-black text-blue-900 tracking-tighter uppercase max-w-2xl">Instituto Superior Politécnico de Songo</h2>
            </motion.div>
          </motion.div>
        )}

        {phase === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <h1 className="text-6xl md:text-9xl font-black text-blue-900 tracking-tighter leading-none">
                BEM VINDO AO <br />
                <span className="text-orange-600">SIGPI</span>
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xl md:text-2xl text-gray-400 font-bold tracking-[0.5em] uppercase"
            >
              Sistema Integrado de Gestão de Processos Institucionais
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              onClick={onFinish}
              className="px-12 py-4 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-blue-800 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              Clique para Entrar
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
      </div>
    </div>
  );
}
