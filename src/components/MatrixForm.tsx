import React, { useState } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UNIDADES_ORGANICAS_SISTEMA,
  DEPARTAMENTOS, 
  REPARTICOES,
  FUNCIONARIOS,
  RUBRICAS,
  NECESSIDADES,
  FONTES_RECEITA,
  PRIORIDADES,
  MESES
} from '../constants/formOptions';

interface MatrixFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  title?: string;
}

export default function MatrixForm({ onClose, onSubmit, title = "Nova Matriz de Atividades" }: MatrixFormProps) {
  const [formData, setFormData] = useState({
    anoEconomico: new Date().getFullYear() + 1,
    unidadeOrganica: '',
    direcao: '',
    departamento: '',
    reparticao: '',
    nAtividade: '1',
    nomeAtividade: '',
    objetivo: '',
    responsavel: '',
    prazo: '',
    mesRealizacao: '',
    prioridade: 'Média',
    fonteReceita: '',
    rubrica: '',
    necessidade: '',
    valorEstimado: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Reset dependent fields
      if (name === 'unidadeOrganica') {
        newData.direcao = '';
        newData.departamento = '';
        newData.reparticao = '';
      }
      
      if (name === 'direcao') {
        newData.departamento = '';
        newData.reparticao = '';
      }

      if (name === 'departamento') {
        newData.reparticao = '';
      }
      
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedUnidade = UNIDADES_ORGANICAS_SISTEMA.find(u => u.nome === formData.unidadeOrganica);
  const availableDirecoes = selectedUnidade ? selectedUnidade.direcoes : [];
  const availableDepartamentos = DEPARTAMENTOS[formData.direcao] || [];
  const availableReparticoes = REPARTICOES[formData.departamento] || [];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 bg-white z-[150] flex flex-col overflow-hidden"
    >
      <div className="flex-none p-6 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
            <Plus size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter leading-tight">{title}</h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Preencha os dados para criar uma nova entrada na matriz</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-gray-100 rounded-2xl text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-grow overflow-auto p-8 md:p-12 bg-gray-50/30">
        <form id="matrix-form" onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-10">
          
          {/* Header Section */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              <h3 className="font-black text-blue-900 uppercase tracking-tighter">I. Identificação e Contexto</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Ano Económico</label>
                <input 
                  type="number"
                  name="anoEconomico"
                  value={formData.anoEconomico}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Unidade Orgânica</label>
                <select 
                  name="unidadeOrganica"
                  value={formData.unidadeOrganica}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                >
                  <option value="">Selecione...</option>
                  {UNIDADES_ORGANICAS_SISTEMA.map(u => <option key={u.id} value={u.nome}>{u.nome}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Direção / Área</label>
                <select 
                  name="direcao"
                  value={formData.direcao}
                  onChange={handleChange}
                  disabled={!formData.unidadeOrganica}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all disabled:opacity-50"
                  required
                >
                  <option value="">Selecione...</option>
                  {availableDirecoes.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Departamento</label>
                <select 
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  disabled={!formData.direcao || availableDepartamentos.length === 0}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all disabled:opacity-50"
                  required={availableDepartamentos.length > 0}
                >
                  <option value="">Selecione...</option>
                  {availableDepartamentos.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              {availableReparticoes.length > 0 && (
                <div className="space-y-2 md:col-span-4">
                  <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Repartição</label>
                  <select 
                    name="reparticao"
                    value={formData.reparticao}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                    required
                  >
                    <option value="">Selecione...</option>
                    {availableReparticoes.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Activity Details */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              <h3 className="font-black text-blue-900 uppercase tracking-tighter">II. Detalhes da Atividade</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Nº Atividade</label>
                <input 
                  type="text"
                  name="nAtividade"
                  value={formData.nAtividade}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Nome da Atividade / Tarefa</label>
                <input 
                  type="text"
                  name="nomeAtividade"
                  value={formData.nomeAtividade}
                  onChange={handleChange}
                  placeholder="Ex: Realização do Conselho Universitário"
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
              <div className="md:col-span-4 space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Objetivo Estratégico</label>
                <textarea 
                  name="objetivo"
                  value={formData.objetivo}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Descreva o objetivo desta atividade..."
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Responsável</label>
                <select 
                  name="responsavel"
                  value={formData.responsavel}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                >
                  <option value="">Selecione...</option>
                  {FUNCIONARIOS.map(f => <option key={f.nome} value={f.nome}>{f.nome} ({f.cargo})</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Mês de Realização</label>
                <select 
                  name="mesRealizacao"
                  value={formData.mesRealizacao}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                >
                  <option value="">Selecione...</option>
                  {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Prioridade</label>
                <select 
                  name="prioridade"
                  value={formData.prioridade}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                >
                  {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Financial Section */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              <h3 className="font-black text-blue-900 uppercase tracking-tighter">III. Recursos e Orçamento</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Fonte de Receita</label>
                <select 
                  name="fonteReceita"
                  value={formData.fonteReceita}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                >
                  <option value="">Selecione...</option>
                  {FONTES_RECEITA.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Valor Estimado (MZN)</label>
                <input 
                  type="number"
                  name="valorEstimado"
                  value={formData.valorEstimado}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Rúbrica Orçamental</label>
                <select 
                  name="rubrica"
                  value={formData.rubrica}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                >
                  <option value="">Selecione...</option>
                  {RUBRICAS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Necessidade Específica</label>
                <select 
                  name="necessidade"
                  value={formData.necessidade}
                  onChange={handleChange}
                  disabled={!formData.rubrica}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-blue-900 outline-none focus:border-blue-500 focus:bg-white transition-all disabled:opacity-50"
                  required
                >
                  <option value="">Selecione...</option>
                  {formData.rubrica && NECESSIDADES[formData.rubrica]?.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="flex-none p-8 bg-white border-t border-gray-100 flex justify-between items-center">
        <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">
          * Todos os campos são de preenchimento obrigatório
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all uppercase tracking-widest text-xs"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            form="matrix-form"
            className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 uppercase tracking-widest text-xs flex items-center gap-2"
          >
            <Save size={18} /> Criar Matriz
          </button>
        </div>
      </div>
    </motion.div>
  );
}
