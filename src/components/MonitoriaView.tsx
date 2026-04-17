import React, { useState } from 'react';
import { ArrowLeft, Search, FileText, Activity, CheckCircle2, XCircle, AlertCircle, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ActivityMonitor {
  id: string;
  referencia: string;
  title: string;
  setor: string;
  mes: string;
  orcamento: number;
  status: 'executada' | 'nao_executada';
  motivo?: string;
  detalhes: string;
}

const MOCK_ACTIVITIES: ActivityMonitor[] = [
  {
    id: '1',
    referencia: 'ACT-2024-1024',
    title: 'Manutenção de Servidores',
    setor: 'Departamento TIC',
    mes: 'Março',
    orcamento: 50000,
    status: 'executada',
    detalhes: 'Manutenção preventiva e corretiva dos servidores centrais realizada com sucesso.'
  },
  {
    id: '2',
    referencia: 'ACT-2024-5582',
    title: 'Workshop de Capacitação',
    setor: 'Recursos Humanos',
    mes: 'Abril',
    orcamento: 25000,
    status: 'nao_executada',
    motivo: 'Falta de quórum mínimo de participantes devido a sobreposição de calendários.',
    detalhes: 'Workshop focado em novas diretrizes administrativas.'
  }
];

export default function MonitoriaView({ onBack, activities = [] }: { onBack: () => void, activities?: any[] }) {
  const [activeTab, setActiveTab] = useState<'tracking' | 'report'>('tracking');
  const [searchRef, setSearchRef] = useState('');
  const [searchResult, setSearchResult] = useState<any | null>(null);

  const allActivities = [...MOCK_ACTIVITIES, ...activities];

  const handleSearch = () => {
    const result = allActivities.find(a => a.referencia?.toUpperCase() === searchRef.toUpperCase());
    setSearchResult(result || null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 flex-none sticky top-0 z-30">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack} 
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-blue-900 uppercase tracking-tighter font-serif">Setor de Monitoria</h1>
            <p className="text-sm text-gray-500 font-medium">Controlo e Acompanhamento de Atividades</p>
          </div>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('tracking')}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'tracking' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Search size={16} /> Rastrear Atividade
          </button>
          <button 
            onClick={() => setActiveTab('report')}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'report' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <BarChart3 size={16} /> Relatório Geral
          </button>
        </div>
      </header>

      <main className="flex-grow p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'tracking' ? (
              <motion.div
                key="tracking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                  <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight font-serif">Inserir Referência</h2>
                  <div className="flex gap-4">
                    <div className="relative flex-grow">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                      <input 
                        type="text"
                        placeholder="Ex: ACT-2024-1024"
                        className="w-full pl-16 pr-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-xl font-bold focus:border-blue-500 focus:bg-white outline-none transition-all"
                        value={searchRef}
                        onChange={(e) => setSearchRef(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                    <button 
                      onClick={handleSearch}
                      className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 uppercase tracking-tighter"
                    >
                      Pesquisar
                    </button>
                  </div>
                </div>

                {searchResult ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className={`p-8 flex items-center justify-between ${(searchResult.status === 'executada' || searchResult.executada) ? 'bg-green-50' : 'bg-red-50'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${(searchResult.status === 'executada' || searchResult.executada) ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                          {(searchResult.status === 'executada' || searchResult.executada) ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-widest opacity-60">Estado de Execução</p>
                          <h3 className={`text-3xl font-black uppercase tracking-tighter ${(searchResult.status === 'executada' || searchResult.executada) ? 'text-green-700' : 'text-red-700'}`}>
                            {(searchResult.status === 'executada' || searchResult.executada) ? 'Executada' : 'Não Executada'}
                          </h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Referência</p>
                        <p className="text-2xl font-mono font-black text-gray-900">{searchResult.referencia}</p>
                      </div>
                    </div>

                    <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Atividade</h4>
                          <p className="text-2xl font-bold text-gray-900 leading-tight">{searchResult.title}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Setor Responsável</h4>
                          <p className="text-xl font-bold text-blue-900">{searchResult.setor || searchResult.direcao || searchResult.departamento || '-'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Mês</h4>
                            <p className="text-xl font-bold text-gray-900">{searchResult.mes || searchResult.dataMes || '-'}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Orçamento</h4>
                            <p className="text-xl font-bold text-green-600">
                              {(searchResult.orcamento || searchResult.valor || 0).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Detalhes da Atividade</h4>
                          <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl italic">
                            "{searchResult.detalhes || searchResult.objetivoAtividade || 'Sem detalhes adicionais.'}"
                          </p>
                        </div>
                        {(searchResult.status === 'nao_executada' || (!searchResult.executada && searchResult.motivoNaoExecucao)) && (
                          <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                            <h4 className="text-sm font-black text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <AlertCircle size={18} /> Motivo da Não Execução
                            </h4>
                            <p className="text-red-900 font-bold leading-relaxed">
                              {searchResult.motivo || searchResult.motivoNaoExecucao}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : searchRef && (
                  <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Atividade não encontrada</h3>
                    <p className="text-gray-500">Verifique se a referência está correta e tente novamente.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="report"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden"
              >
                <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-blue-50/30">
                  <div>
                    <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter font-serif">Relatório de Monitoria</h2>
                    <p className="text-gray-500 font-medium">Resumo do estado das atividades planificadas</p>
                  </div>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold border border-blue-100 shadow-sm hover:bg-blue-50 transition-all flex items-center gap-2">
                    <FileText size={18} /> Exportar PDF
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-xs uppercase tracking-widest text-gray-400 font-black">
                        <th className="px-8 py-6 border-b border-gray-100">Referência</th>
                        <th className="px-8 py-6 border-b border-gray-100">Atividade</th>
                        <th className="px-8 py-6 border-b border-gray-100">Setor Responsável</th>
                        <th className="px-8 py-6 border-b border-gray-100">Mês</th>
                        <th className="px-8 py-6 border-b border-gray-100 text-right">Orçamento</th>
                        <th className="px-8 py-6 border-b border-gray-100">Estado</th>
                        <th className="px-8 py-6 border-b border-gray-100">Motivo (se não exec.)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {allActivities.map((activity) => (
                        <tr key={activity.id} className="hover:bg-blue-50/20 transition-colors">
                          <td className="px-8 py-6 font-mono text-sm font-bold text-blue-600">{activity.referencia}</td>
                          <td className="px-8 py-6 font-bold text-gray-900">{activity.title}</td>
                          <td className="px-8 py-6 text-gray-600 font-medium">{activity.setor || activity.direcao || activity.departamento || '-'}</td>
                          <td className="px-8 py-6 text-gray-600">{activity.mes || activity.dataMes || '-'}</td>
                          <td className="px-8 py-6 text-right font-black text-blue-900">
                            {(activity.orcamento || activity.valor || 0).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              (activity.status === 'executada' || activity.executada) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {(activity.status === 'executada' || activity.executada) ? 'Executada' : 'Não Executada'}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-sm text-gray-500 italic max-w-xs truncate">
                            {activity.motivo || activity.motivoNaoExecucao || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
