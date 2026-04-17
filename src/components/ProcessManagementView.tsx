import React, { useState } from 'react';
import { ArrowLeft, Search, FileText, User, Calendar, Download, Eye, Trash2, Filter, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

interface ProcessoSubmetido {
  id: string;
  nome: string;
  nuit: string;
  seccao: string;
  dataSubmissao: string;
  processoNo: string;
  status: 'Pendente' | 'Aprovado' | 'Arquivado';
  ficheiros?: File[];
}

export default function ProcessManagementView({ 
  onBack,
  processos: initialProcessos 
}: { 
  onBack: () => void,
  processos: any[]
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [processos, setProcessos] = useState<any[]>(initialProcessos);

  const filteredProcessos = processos.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.nuit.includes(searchTerm)
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">Gestão de Processos</h2>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Arquivo Digital de Processos Individuais</p>
          </div>
        </div>

        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Pesquisar por NUIT ou Nome Completo..." 
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Nº Processo</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Funcionário / Colaborador</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">NUIT</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Secção</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Data de Submissão</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Anexos</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredProcessos.length > 0 ? (
              filteredProcessos.map((p) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={p.id} 
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="p-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg font-mono text-xs font-bold">
                      {p.processoNo}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                        <User size={20} />
                      </div>
                      <span className="font-bold text-gray-900">{p.nome}</span>
                    </div>
                  </td>
                  <td className="p-6 text-gray-500 font-medium">{p.nuit}</td>
                  <td className="p-6 text-gray-500 font-medium">{p.seccao}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">{p.dataSubmissao}</span>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    {p.ficheiros && p.ficheiros.length > 0 ? (
                      <div className="flex flex-col items-center">
                        <div className="flex -space-x-2 overflow-hidden">
                          {p.ficheiros.slice(0, 3).map((_: any, i: number) => (
                            <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-blue-500 flex items-center justify-center text-[8px] text-white">
                              <FileText size={10} />
                            </div>
                          ))}
                          {p.ficheiros.length > 3 && (
                            <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-[8px] text-gray-600 font-bold">
                              +{p.ficheiros.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold">{p.ficheiros.length} ficheiros</span>
                      </div>
                    ) : (
                      <span className="text-gray-300 text-[10px] uppercase font-bold">Sem anexos</span>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Visualizar">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Download PDF">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-20 text-center">
                  <div className="flex flex-col items-center gap-4 text-gray-400">
                    <Search size={48} strokeWidth={1} />
                    <p className="text-lg font-medium">Nenhum processo encontrado para "{searchTerm}"</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
