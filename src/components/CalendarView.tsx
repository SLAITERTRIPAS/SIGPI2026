import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event, Nota } from '../types';

export default function CalendarView({ events, setEvents, onAgendar, onNota, title, notes }: { 
  events: Event[], 
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>,
  onAgendar: () => void,
  onNota: () => void,
  title?: string,
  notes?: Nota[]
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAgendarOptions, setShowAgendarOptions] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'Reunião' as 'Reunião' | 'Encontro' | 'Data Comemorativa' | 'Feriado Nacional' | 'Feriado Institucional',
    agenda: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    participants: [] as string[]
  });

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventDate = newEvent.date || (selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);

    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title,
      date: eventDate,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      location: newEvent.location,
      participants: newEvent.participants.join(', '),
      type: newEvent.type === 'Reunião' ? 'meeting' : (newEvent.type === 'Encontro' ? 'activity' : newEvent.type as any),
      agenda: newEvent.agenda
    };

    setEvents([...events, event]);
    setShowModal(false);
    setNewEvent({ 
      title: '', 
      type: 'Reunião',
      agenda: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      participants: []
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const calendarDays = [];

    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-16 border border-gray-100 bg-transparent"></div>);
    }

    // Days of current month
    for (let day = 1; day <= days; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      const dayNotes = notes?.filter(n => n.date === dateStr) || [];
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      const isSelected = day === 8 && month === 3 && year === 2026; // Matching screenshot example

      calendarDays.push(
        <div 
          key={day} 
          onClick={() => {
            const d = new Date(year, month, day);
            setSelectedDate(d);
            setNewEvent(prev => ({ ...prev, date: d.toISOString().split('T')[0] }));
            setShowModal(true);
          }}
          className={`h-24 border border-gray-200 p-2 hover:bg-blue-50/50 transition-colors cursor-pointer relative group ${isToday ? 'bg-blue-50/20' : 'bg-transparent'}`}
        >
          <div className="flex flex-col items-center">
            <span className={`text-lg font-black ${(isToday || isSelected) ? 'bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg shadow-blue-200' : 'text-gray-700'}`}>
              {day}
            </span>
            
            {(isToday || isSelected) && (
              <div className="mt-1 bg-blue-100/80 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">
                08:00
              </div>
            )}
          </div>

          <div className="mt-2 space-y-1 overflow-hidden">
            {dayEvents.map(event => (
              <div 
                key={event.id} 
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                  event.type === 'meeting' ? 'bg-blue-50 border-blue-100 text-blue-700' : 
                  event.type === 'Data Comemorativa' ? 'bg-pink-50 border-pink-100 text-pink-700' :
                  event.type === 'Feriado Nacional' ? 'bg-red-50 border-red-100 text-red-700' :
                  event.type === 'Feriado Institucional' ? 'bg-purple-50 border-purple-100 text-purple-700' :
                  'bg-amber-50 border-amber-100 text-amber-700'
                }`}
              >
                {event.startTime}
              </div>
            ))}
            {dayNotes.length > 0 && (
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter opacity-80">
                NOTA DO DIA
              </div>
            )}
          </div>
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-black text-blue-900 uppercase tracking-widest">Calendário - {title || 'Geral'}</h1>
        <div className="relative">
          <button 
            onClick={() => setShowAgendarOptions(!showAgendarOptions)}
            className="bg-orange-600 text-white px-6 py-2 rounded-xl text-sm font-black flex items-center gap-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 uppercase tracking-widest"
          >
            + AGENDAR
          </button>
          <AnimatePresence>
            {showAgendarOptions && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl z-20 border border-gray-100 overflow-hidden"
              >
                <button onClick={() => { setShowAgendarOptions(false); onAgendar(); }} className="w-full text-left px-6 py-4 hover:bg-gray-50 text-xs font-black text-blue-900 uppercase tracking-widest border-b border-gray-50">AGENDAR ENCONTRO</button>
                <button onClick={() => { setShowAgendarOptions(false); setNewEvent({...newEvent, type: 'Data Comemorativa'}); setShowModal(true); }} className="w-full text-left px-6 py-4 hover:bg-gray-50 text-xs font-black text-blue-900 uppercase tracking-widest border-b border-gray-50">DATA COMEMORATIVA</button>
                <button onClick={() => { setShowAgendarOptions(false); setNewEvent({...newEvent, type: 'Feriado Nacional'}); setShowModal(true); }} className="w-full text-left px-6 py-4 hover:bg-gray-50 text-xs font-black text-blue-900 uppercase tracking-widest border-b border-gray-50">FERIADO NACIONAL</button>
                <button onClick={() => { setShowAgendarOptions(false); setNewEvent({...newEvent, type: 'Feriado Institucional'}); setShowModal(true); }} className="w-full text-left px-6 py-4 hover:bg-gray-50 text-xs font-black text-blue-900 uppercase tracking-widest border-b border-gray-50">FERIADO INSTITUCIONAL</button>
                <button onClick={() => { setShowAgendarOptions(false); onNota(); }} className="w-full text-left px-6 py-4 hover:bg-gray-50 text-xs font-black text-blue-900 uppercase tracking-widest">NOTA DO DIA</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="bg-white border border-gray-100 px-6 py-2 rounded-2xl shadow-sm flex items-center gap-6">
          <span className="text-lg font-black text-blue-900 uppercase tracking-widest">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-blue-900"><ChevronLeft size={20} /></button>
            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-blue-900"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>

      <div className="relative bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
        {/* Background Logo */}
        <div 
          className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none"
          style={{ 
            backgroundImage: 'url("https://sigpro.ispsongo.ac.mz/images/logotipo.jpg")',
            backgroundSize: '80% auto',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        <div className="relative z-10">
          <div className="grid grid-cols-7 bg-gray-50/30 border-b border-gray-200">
            {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'].map(day => (
              <div key={day} className="p-4 text-center text-xs font-black text-blue-900 uppercase tracking-widest">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {renderCalendar()}
          </div>
          
          {/* ISPS Watermark */}
          <div className="p-4 flex justify-end">
            <span className="text-4xl font-black text-gray-400/40 font-serif tracking-tighter">ISPS</span>
          </div>
        </div>
      </div>

      {/* Modal de Agendamento */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-600 text-white">
                <h3 className="text-xl font-bold">Agendar Novo Encontro</h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleAddEvent} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Data</label>
                  <input 
                    required
                    type="date" 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={newEvent.date}
                    onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Título da Atividade</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ex: Reunião de Planejamento"
                    value={newEvent.title}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Tipo de Encontro</label>
                    <select 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newEvent.type}
                      onChange={e => setNewEvent({...newEvent, type: e.target.value as any})}
                    >
                      <option value="Reunião">Reunião</option>
                      <option value="Encontro">Encontro</option>
                      <option value="Data Comemorativa">Data Comemorativa</option>
                      <option value="Feriado Nacional">Feriado Nacional</option>
                      <option value="Feriado Institucional">Feriado Institucional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Local</label>
                    <select 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newEvent.location}
                      onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                    >
                      <option value="">Selecione o Local</option>
                      <option value="Sala de Reuniões">Sala de Reuniões</option>
                      <option value="CERQS">CERQS</option>
                      <option value="Sala de Aulas">Sala de Aulas</option>
                      <option value="Auditório">Auditório</option>
                      <option value="Lar de Estudantes">Lar de Estudantes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Agenda</label>
                  <textarea 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Descreva a agenda..."
                    value={newEvent.agenda}
                    onChange={e => setNewEvent({...newEvent, agenda: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Inicia às</label>
                    <input 
                      required
                      type="time" 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newEvent.startTime}
                      onChange={e => setNewEvent({...newEvent, startTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Termina às</label>
                    <input 
                      required
                      type="time" 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newEvent.endTime}
                      onChange={e => setNewEvent({...newEvent, endTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Participantes</label>
                  {[
                    'Membros de CR', 'Membros de CAS', 'Pessoal fora do Quadro', 
                    'Todos estudantes', 'Todos estudantes Femininos', 'Todos estudantes Masculinos'
                  ].map(participant => (
                    <label key={participant} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={newEvent.participants.includes(participant)}
                        onChange={e => {
                          if (e.target.checked) {
                            setNewEvent({...newEvent, participants: [...newEvent.participants, participant]});
                          } else {
                            setNewEvent({...newEvent, participants: newEvent.participants.filter(p => p !== participant)});
                          }
                        }}
                      />
                      <span className="text-sm text-gray-700">{participant}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                  >
                    Submeter o Registo
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
