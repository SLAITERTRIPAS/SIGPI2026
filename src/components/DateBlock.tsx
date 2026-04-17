import React, { useState, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';

export default function DateBlock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayOfWeek = now.toLocaleDateString('pt-PT', { weekday: 'long' }).toUpperCase();
  const dateStr = now.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="w-fit bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-right shadow-lg">
      <div className="flex justify-between items-center gap-4 mb-1">
        <Maximize2 size={8} className="text-slate-500 cursor-pointer" />
        <p className="text-amber-600 font-bold text-[17px] uppercase">{dayOfWeek}</p>
      </div>
      <p className="text-slate-300 text-[17px]">{dateStr}</p>
      <p className="text-white font-bold text-[20px] mt-0.5">{timeStr}</p>
    </div>
  );
}
