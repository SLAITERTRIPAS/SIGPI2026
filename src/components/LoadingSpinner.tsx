import React from 'react';
import { motion } from 'motion/react';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer Blue Circle */}
        <motion.div
          className="absolute w-full h-full border-4 border-blue-600 rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle Red Circle */}
        <motion.div
          className="absolute w-24 h-24 border-4 border-red-600 rounded-full border-b-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Yellow Circle */}
        <motion.div
          className="absolute w-16 h-16 border-4 border-yellow-400 rounded-full border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center Grey Circle */}
        <motion.div
          className="absolute w-8 h-8 border-4 border-gray-400 rounded-full border-r-transparent"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <p className="text-blue-900 font-bold text-sm tracking-widest animate-pulse uppercase">Processando...</p>
        </div>
      </div>
    </div>
  );
}
