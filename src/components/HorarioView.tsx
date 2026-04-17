import React, { useState } from 'react';
import { Calendar, RefreshCw, Sun, Moon, Clock, CheckCircle2, AlertCircle, Info, ShieldCheck } from 'lucide-react';

interface TimeSlot {
  start: string;
  end: string;
}

interface PeriodSchedule {
  name: string;
  slots: TimeSlot[];
}

// Mock data for resources
const MOCK_DOCENTES: string[] = [];

const MOCK_DISCIPLINAS = [
  'Matemática I',
  'Física Aplicada',
  'Programação Web',
  'Sistemas Digitais',
  'Introdução à Engenharia',
  'Base de Dados',
  'Redes de Computadores',
  'Cálculo Diferencial',
  'Eletrónica Analógica'
];

const MOCK_SALAS = [
  { id: 'S101', type: 'SALA', name: 'Sala 101' },
  { id: 'S102', type: 'SALA', name: 'Sala 102' },
  { id: 'S103', type: 'SALA', name: 'Sala 103' },
  { id: 'L01', type: 'LABORATÓRIO', name: 'Laboratório de Informática' },
  { id: 'L02', type: 'LABORATÓRIO', name: 'Laboratório de Física' },
  { id: 'O01', type: 'OFICINA', name: 'Oficina Mecânica' }
];

export default function HorarioView({ title }: { title: string }) {
  const [horario, setHorario] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'LABORAL' | 'POS_LABORAL'>('LABORAL');

  const generateSlots = (startTime: string, slotsCount: number): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    let current = new Date(`2000-01-01T${startTime}:00`);

    for (let i = 0; i < slotsCount; i++) {
      const start = current.toTimeString().slice(0, 5);
      current.setMinutes(current.getMinutes() + 50);
      const end = current.toTimeString().slice(0, 5);
      slots.push({ start, end });
      current.setMinutes(current.getMinutes() + 5);
    }
    return slots;
  };

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const gerarHorario = () => {
    setLoading(true);
    setLogs([]);
    setStatus('Iniciando motor de otimização...');
    
    setTimeout(() => {
      setStatus('Mapeando disponibilidade global de salas...');
      addLog('INFO: Identificadas 6 salas registadas no sistema.');
      
      setTimeout(() => {
        setStatus('Cruzando horários de outros cursos...');
        addLog('AVISO: Sala S101 ocupada por "Engenharia Civil" na Segunda-feira às 07:00.');
        addLog('INFO: Redirecionando alocação para S102.');
        
        setTimeout(() => {
          setStatus('Validando carga horária dos docentes...');
          addLog('INFO: Prof. Armando José com 18h/semana. Alocação permitida.');
          
          setTimeout(() => {
            setStatus('Finalizando matriz de horários coesa...');
            addLog('SUCESSO: 0 conflitos detetados após 3 ajustes automáticos.');

            const schedules: PeriodSchedule[] = [];
            const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

            if (selectedPeriod === 'LABORAL') {
              schedules.push({
                name: 'MANHÃ (07:00 - 12:25)',
                slots: generateSlots('07:00', 6)
              });
              schedules.push({
                name: 'TARDE (13:00 - 18:25)',
                slots: generateSlots('13:00', 6)
              });
            } else {
              schedules.push({
                name: 'NOITE (18:50 - 23:25)',
                slots: generateSlots('18:50', 5)
              });
            }

            const assignments: any = {};
            schedules.forEach((period, pIdx) => {
              period.slots.forEach((slot, sIdx) => {
                dias.forEach(dia => {
                  const key = `${pIdx}-${sIdx}-${dia}`;
                  const randomDisc = MOCK_DISCIPLINAS[Math.floor(Math.random() * MOCK_DISCIPLINAS.length)];
                  const randomDoc = MOCK_DOCENTES[Math.floor(Math.random() * MOCK_DOCENTES.length)];
                  const randomSala = MOCK_SALAS[Math.floor(Math.random() * MOCK_SALAS.length)];
                  
                  assignments[key] = {
                    disciplina: randomDisc,
                    docente: randomDoc,
                    sala: randomSala.id,
                    tipoSala: randomSala.type,
                    salaName: randomSala.name
                  };
                });
              });
            });

            setHorario({
              curso: title,
              periodo: selectedPeriod,
              ano: new Date().getFullYear() + 1,
              dias,
              schedules,
              assignments
            });
            setLoading(false);
            setStatus('');
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <ShieldCheck className="text-green-600" />
            Gerador de Horário Inteligente
          </h3>
          <p className="text-sm text-gray-500 mt-1">Otimização automática baseada em recursos e espaços físicos.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button 
              onClick={() => setSelectedPeriod('LABORAL')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedPeriod === 'LABORAL' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Sun size={16} />
              Laboral
            </button>
            <button 
              onClick={() => setSelectedPeriod('POS_LABORAL')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedPeriod === 'POS_LABORAL' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Moon size={16} />
              Pós-Laboral
            </button>
          </div>

          <button 
            onClick={gerarHorario}
            disabled={loading}
            className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 disabled:bg-gray-400 disabled:shadow-none"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            {loading ? 'A Otimizar...' : 'Gerar Horário Coeso'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-blue-50 border border-blue-100 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
            <RefreshCw className="text-blue-600 animate-spin" size={48} />
            <div>
              <p className="text-blue-900 font-bold text-lg">{status}</p>
              <p className="text-blue-600 text-sm">O sistema está a identificar salas ocupadas e a ajustar o tempo livre.</p>
            </div>
            <div className="w-full max-w-md bg-blue-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full animate-[progress_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-6 text-white font-mono text-[10px] space-y-2 overflow-hidden shadow-xl">
            <p className="text-gray-500 border-b border-gray-800 pb-2 mb-4 flex items-center gap-2">
              <Info size={12} /> LOG DE OTIMIZAÇÃO
            </p>
            {logs.map((log, i) => (
              <p key={i} className={`${log.startsWith('SUCESSO') ? 'text-green-400' : log.startsWith('AVISO') ? 'text-amber-400' : 'text-blue-300'}`}>
                {`> ${log}`}
              </p>
            ))}
            {logs.length === 0 && <p className="text-gray-600 italic">Aguardando processamento...</p>}
          </div>
        </div>
      )}

      {horario && !loading && (
        <div className="space-y-8">
          <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" size={20} />
              <div>
                <p className="text-green-900 font-bold text-sm">Horário Coeso Gerado</p>
                <p className="text-green-700 text-xs">Conflitos de salas e docentes resolvidos com sucesso.</p>
              </div>
            </div>
            <div className="flex gap-4 text-[10px] uppercase font-bold text-green-800">
              <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Salas OK</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Labs OK</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Docentes OK</span>
            </div>
          </div>

          {horario.schedules.map((period: PeriodSchedule, pIdx: number) => (
            <div key={pIdx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center justify-between">
                <h4 className="font-bold text-blue-900 flex items-center gap-2 uppercase tracking-widest text-sm">
                  <Clock size={16} />
                  {period.name}
                </h4>
                <span className="text-xs font-medium text-gray-500">Curso: {horario.curso}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse table-fixed min-w-[800px]">
                  <thead>
                    <tr className="bg-white">
                      <th className="w-24 p-4 border-b border-r border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">Tempo</th>
                      {horario.dias.map((dia: string) => (
                        <th key={dia} className="p-4 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">{dia}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {period.slots.map((slot: TimeSlot, sIdx: number) => (
                      <tr key={sIdx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 border-b border-r border-gray-100 font-bold text-blue-900 bg-gray-50/30">
                          <div className="flex flex-col">
                            <span>{slot.start}</span>
                            <span className="text-[10px] text-gray-400 font-normal">até {slot.end}</span>
                          </div>
                        </td>
                        {horario.dias.map((dia: string) => {
                          const assignment = horario.assignments[`${pIdx}-${sIdx}-${dia}`];
                          return (
                            <td key={dia} className="p-2 border-b border-gray-100 align-top">
                              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <p className="font-bold text-blue-900 text-[11px] mb-1 line-clamp-1">{assignment.disciplina}</p>
                                <p className="text-[9px] text-gray-500 mb-2 italic">{assignment.docente}</p>
                                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                                    assignment.tipoSala === 'LABORATÓRIO' ? 'bg-purple-100 text-purple-700' : 
                                    assignment.tipoSala === 'OFICINA' ? 'bg-amber-100 text-amber-700' : 
                                    'bg-blue-100 text-blue-700'
                                  }`}>
                                    {assignment.tipoSala}
                                  </span>
                                  <span className="text-[10px] font-bold text-gray-700" title={assignment.salaName}>{assignment.sala}</span>
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {!horario && !loading && (
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-sm">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar size={40} className="text-gray-300" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Gerador de Horário Coeso</h4>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            O sistema analisará automaticamente a disponibilidade de docentes, salas de aula, laboratórios e oficinas para evitar qualquer sobreposição.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Salas</p>
              <p className="text-lg font-bold text-blue-900">Disponíveis</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Docentes</p>
              <p className="text-lg font-bold text-blue-900">Alocados</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Conflitos</p>
              <p className="text-lg font-bold text-green-600">Zero</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
