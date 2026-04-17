import React from 'react';

export default function Footer({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center py-6 ${className}`}>
      <div className="w-full text-center text-[18px] text-white/40 tracking-wider">
        Desenvolvido por fttripas - 2025-2026 | @todos os direitos reservados
      </div>
    </div>
  );
}
