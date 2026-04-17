import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, ArrowRight, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { Expediente } from '../types';

interface ExpedienteManagementProps {
  title: string;
  expedientes: Expediente[];
  setExpedientes: React.Dispatch<React.SetStateAction<Expediente[]>>;
}

export default function ExpedienteManagement({ title, expedientes, setExpedientes }: ExpedienteManagementProps) {
  const [activeTab, setActiveTab] = useState<'Entrada' | 'Saída' | 'SIC'>('Entrada');
  const [showForm, setShowForm] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackedExpediente, setTrackedExpediente] = useState<Expediente | null>(null);
  const [formData, setFormData] = useState<Partial<Expediente>>({
    tipo: 'Entrada',
    numero: '',
    data: new Date().toISOString().split('T')[0],
    assunto: '',
    origem: '',
    destino: '',
    status: 'Pendente'
  });

  const filteredExpedientes = expedientes.filter(e => e.tipo === activeTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpediente: Expediente = {
      id: Math.random().toString(36).substr(2, 9),
      tipo: activeTab,
      numero: formData.numero || `EXP-${Math.floor(Math.random() * 1000)}`,
      data: formData.data || new Date().toISOString().split('T')[0],
      assunto: formData.assunto || '',
      origem: formData.origem || '',
      destino: formData.destino || '',
      status: formData.status as any || 'Pendente',
      criadoPor: title
    };
    setExpedientes([newExpediente, ...expedientes]);
    setShowForm(false);
    setFormData({
      tipo: activeTab,
      numero: '',
      data: new Date().toISOString().split('T')[0],
      assunto: '',
      origem: '',
      destino: '',
      status: 'Pendente'
    });
  };

  const updateStatus = (id: string, newStatus: Expediente['status']) => {
    setExpedientes(expedientes.map(e => e.id === id ? { ...e, status: newStatus } : e));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Gestão de Expedientes</h2>
          <p className="text-gray-500">Controlo de entradas, saídas e SIC.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={20} /> NOVO REGISTO
        </button>
        <button 
          onClick={() => setShowTracking(true)}
          className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-900 transition-all shadow-lg shadow-gray-100"
        >
          <Search size={20} /> RASTREAR FLUXO
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        {(['Entrada', 'Saída', 'SIC'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setFormData(prev => ({ ...prev, tipo: tab }));
            }}
            className={`px-6 py-3 font-bold text-sm transition-colors relative ${
              activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Novo Registo de {activeTab}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Número do Expediente</label>
                <input 
                  type="text" 
                  value={formData.numero}
                  onChange={e => setFormData({...formData, numero: e.target.value})}
                  className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Data</label>
                <input 
                  type="date" 
                  value={formData.data}
                  onChange={e => setFormData({...formData, data: e.target.value})}
                  className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Assunto</label>
                <input 
                  type="text" 
                  value={formData.assunto}
                  onChange={e => setFormData({...formData, assunto: e.target.value})}
                  className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Origem</label>
                <input 
                  type="text" 
                  value={formData.origem}
                  onChange={e => setFormData({...formData, origem: e.target.value})}
                  className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Destino</label>
                <input 
                  type="text" 
                  value={formData.destino}
                  onChange={e => setFormData({...formData, destino: e.target.value})}
                  className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 font-bold text-sm hover:bg-gray-50 rounded-lg"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700"
              >
                Submeter o Registo
              </button>
            </div>
          </form>
        </div>
      )}

      {showTracking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl w-full max-w-md">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Rastrear Expediente</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                value={trackingNumber}
                onChange={e => setTrackingNumber(e.target.value)}
                className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Introduza o número de rastreio"
              />
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => { setShowTracking(false); setTrackedExpediente(null); }}
                  className="px-4 py-2 text-gray-600 font-bold text-sm hover:bg-gray-50 rounded-lg"
                >
                  Fechar
                </button>
                <button 
                  onClick={() => {
                    const found = expedientes.find(e => e.numero === trackingNumber);
                    setTrackedExpediente(found || null);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700"
                >
                  Rastrear
                </button>
              </div>
              {trackedExpediente ? (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs font-bold text-blue-900 mb-1">Status Atual:</p>
                  <p className="text-sm font-bold text-blue-700">{trackedExpediente.status}</p>
                  <p className="text-xs text-gray-600 mt-2">Assunto: {trackedExpediente.assunto}</p>
                </div>
              ) : trackingNumber && (
                <p className="text-xs text-red-500 mt-2">Expediente não encontrado.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {filteredExpedientes.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider">
                <th className="p-4 font-black">Nº</th>
                <th className="p-4 font-black">Data</th>
                <th className="p-4 font-black">Assunto</th>
                <th className="p-4 font-black">Origem</th>
                <th className="p-4 font-black">Destino</th>
                <th className="p-4 font-black">Criado Por</th>
                <th className="p-4 font-black">Status</th>
                <th className="p-4 font-black text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredExpedientes.map(exp => (
                <tr key={exp.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">{exp.numero}</td>
                  <td className="p-4 text-gray-600">{exp.data}</td>
                  <td className="p-4 text-gray-900">{exp.assunto}</td>
                  <td className="p-4 text-gray-600">{exp.origem}</td>
                  <td className="p-4 text-gray-600">{exp.destino}</td>
                  <td className="p-4 text-xs text-gray-500">{exp.criadoPor}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1.5 w-fit ${
                      exp.status === 'Concluído' ? 'bg-green-100 text-green-700' :
                      exp.status === 'Em andamento' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {exp.status === 'Concluído' ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {exp.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <select 
                      value={exp.status}
                      onChange={(e) => updateStatus(exp.id, e.target.value as any)}
                      className="text-xs border rounded p-1 outline-none"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Concluído">Concluído</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="font-medium">Nenhum registo de {activeTab.toLowerCase()} encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
