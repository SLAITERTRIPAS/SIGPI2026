import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { 
  UNIDADES_ORGANICAS_SISTEMA,
  DEPARTAMENTOS, 
  FUNCIONARIOS 
} from '../constants/formOptions';

interface IndividualPlanFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function IndividualPlanForm({ onClose, onSubmit }: IndividualPlanFormProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    unidadeOrganica: '',
    direcao: '',
    departamento: '',
    nomeColaborador: '',
    nomeAtividade: '',
    objetivo: '',
    dataInicial: '',
    dataFinal: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute inset-0 bg-white z-50 flex flex-col overflow-hidden"
    >
      {/* Header matching the image */}
      <div className="flex-none p-4 relative border-b border-gray-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>
        
        <div className="text-center space-y-1">
          <h1 className="text-[#1a4b84] font-bold text-lg tracking-tight">INSTITUTO SUPERIOR POLITÉCNICO DE SONGO</h1>
          <h2 className="text-[#4a90e2] font-medium text-2xl">FORMUÁRIO DE PLANO IDIVIDUAL</h2>
          <p className="text-[#4a90e2] text-[10px] font-bold">ANO ECONÓMICO (DE 2026 PARA 2027)</p>
        </div>
      </div>

      <div className="flex-grow overflow-auto p-8 bg-white">
        <form id="individual-plan-form" onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-12">
          
          {/* Top Row: Unidade, Direção, Departamento, Nome Colaborador */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t-2 border-[#1a4b84] pt-4">
            <div className="space-y-1">
              <label className="block text-[#1a4b84] font-serif text-lg italic">Unidade Orgânica</label>
              <select 
                name="unidadeOrganica"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setFormData(prev => ({ ...prev, unidadeOrganica: e.target.value, direcao: '', departamento: '' }));
                }}
                className="w-full p-2 border-2 border-gray-400 rounded-xl text-sm outline-none focus:border-[#1a4b84] transition-all bg-white"
                required
              >
                <option value=""></option>
                {UNIDADES_ORGANICAS_SISTEMA.map(u => <option key={u.id} value={u.nome}>{u.nome}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-[#1a4b84] font-serif text-lg italic">Direção / Área</label>
              <select 
                name="direcao"
                value={formData.direcao}
                onChange={(e) => setFormData(prev => ({ ...prev, direcao: e.target.value, departamento: '' }))}
                className="w-full p-2 border-2 border-gray-400 rounded-xl text-sm outline-none focus:border-[#1a4b84] transition-all bg-white"
                required
              >
                <option value=""></option>
                {selectedCategory && UNIDADES_ORGANICAS_SISTEMA.find(u => u.nome === selectedCategory)?.direcoes?.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-[#1a4b84] font-serif text-lg italic">Departamento</label>
              <select 
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-400 rounded-xl text-sm outline-none focus:border-[#1a4b84] transition-all bg-white"
                required
              >
                <option value=""></option>
                {formData.direcao && DEPARTAMENTOS[formData.direcao] ? (
                  DEPARTAMENTOS[formData.direcao].map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))
                ) : (
                  <option disabled>Selecione uma Direção primeiro</option>
                )}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-[#1a4b84] font-serif text-lg italic whitespace-nowrap">Nome do Colaborador</label>
              <select 
                name="nomeColaborador"
                value={formData.nomeColaborador}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-400 rounded-xl text-sm outline-none focus:border-[#1a4b84] transition-all bg-white"
                required
              >
                <option value=""></option>
                {FUNCIONARIOS.map(f => <option key={f.nome} value={f.nome}>{f.nome}</option>)}
              </select>
            </div>
          </div>

          {/* Bottom Row: Nome da Atividade, Objetivo, Data Inicial, Data Final */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t-2 border-[#4a90e2] pt-4">
            <div className="md:col-span-4 space-y-1">
              <label className="block text-[#4a90e2] font-serif text-lg italic">Nome da Atividade</label>
              <textarea 
                name="nomeAtividade"
                value={formData.nomeAtividade}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border-2 border-gray-400 rounded-2xl text-sm outline-none focus:border-[#4a90e2] transition-all resize-none"
                required
              />
            </div>
            <div className="md:col-span-4 space-y-1">
              <label className="block text-[#4a90e2] font-serif text-lg italic">Objetivo</label>
              <textarea 
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border-2 border-gray-400 rounded-2xl text-sm outline-none focus:border-[#4a90e2] transition-all resize-none"
                required
              />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="block text-[#4a90e2] font-serif text-lg italic text-center">Data Inicial</label>
              <div className="relative">
                <input 
                  type="date" 
                  name="dataInicial"
                  value={formData.dataInicial}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-gray-400 rounded-2xl text-sm outline-none focus:border-[#4a90e2] transition-all text-center"
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="block text-[#4a90e2] font-serif text-lg italic text-center">Data final</label>
              <div className="relative">
                <input 
                  type="date" 
                  name="dataFinal"
                  value={formData.dataFinal}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-gray-400 rounded-2xl text-sm outline-none focus:border-[#4a90e2] transition-all text-center"
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="flex-none p-6 bg-white border-t border-gray-200 flex justify-end items-center">
        <button 
          type="submit"
          form="individual-plan-form"
          className="bg-[#1a5f7a] text-white px-12 py-2 rounded-lg font-bold text-lg hover:bg-[#144a5f] transition-all shadow-md"
        >
          submeter
        </button>
      </div>
    </motion.div>
  );
}
