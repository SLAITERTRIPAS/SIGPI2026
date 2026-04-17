import React from 'react';
import { Event } from '../types';

export default function EventBlock({ events, onEventClick }: { events: Event[], onEventClick: () => void }) {
  // Sort events by date and time
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.startTime}`);
    const dateB = new Date(`${b.date}T${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get only upcoming events or today's events
  const displayEvents = sortedEvents.filter(e => {
    const eventDate = new Date(e.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  }).slice(0, 3);

  const isNew = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    eventDate.setHours(0, 0, 0, 0);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 3;
  };

  return (
    <div className="w-full sm:w-72 bg-slate-950 border border-slate-800 p-9 rounded-xl shadow-lg">
      <h2 className="text-amber-600 font-bold text-[12px] tracking-widest uppercase flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-1 bg-amber-600"></span>
        </span>
        Eventos Marcados
      </h2>
      <div className="space-y-3 mb-4">
        {displayEvents.length > 0 ? (
          displayEvents.map(event => (
            <button 
              key={event.id} 
              onClick={onEventClick}
              className="w-full text-left border-l-2 border-amber-500 pl-2 hover:bg-white/5 transition-colors py-1 group relative"
            >
              <div className="flex items-center justify-between gap-2">
                <p className={`text-white font-bold ${event.title === 'Reunião de Direção' ? 'text-[13px]' : 'text-[20px]'} uppercase group-hover:text-amber-500 transition-colors truncate`}>{event.title}</p>
                {isNew(event.date) && (
                  <span className="flex-none bg-amber-600 text-white text-[15px] font-black px-1 rounded-sm animate-pulse">NOVO</span>
                )}
              </div>
              <p className="text-slate-400 text-[16px]">{new Date(event.date).toLocaleDateString('pt-PT')} - {event.startTime} às {event.endTime}</p>
            </button>
          ))
        ) : (
          <p className="text-slate-500 text-[7px] italic">Nenhum evento agendado.</p>
        )}
      </div>
      <button 
        onClick={onEventClick}
        className="text-slate-400 text-[9px] block hover:text-amber-500 transition-colors uppercase"
      >
        VER CALENDÁRIO COMPLETO —
      </button>
    </div>
  );
}
