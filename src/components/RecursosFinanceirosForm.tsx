import React, { useState } from 'react';
import { Save, Send, X, DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { FinancialData } from '../types';

interface Props {
  onClose: () => void;
  onSubmit: (data: FinancialData) => void;
  initialYear?: string;
}

export default function RecursosFinanceirosForm({ onClose, onSubmit, initialYear = '2025' }: Props) {
  const [formData, setFormData] = useState<Partial<FinancialData>>({
    ano: initialYear,
    orcamentoAnual: 0,
    receitasProprias: 0,
    subvencaoEstado: 0,
    despesasPessoal: 0,
    despesasFuncionamento: 0,
    despesasInvestimento: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: FinancialData = {
      id: Math.random().toString(36).substr(2, 9),
      ano: formData.ano || initialYear,
      orcamentoAnual: Number(formData.orcamentoAnual) || 0,
      receitasProprias: Number(formData.receitasProprias) || 0,
      subvencaoEstado: Number(formData.subvencaoEstado) || 0,
      despesasPessoal: Number(formData.despesasPessoal) || 0,
      despesasFuncionamento: Number(formData.despesasFuncionamento) || 0,
      despesasInvestimento: Number(formData.despesasInvestimento) || 0,
      dataSubmissao: new Date().toISOString(),
      status: 'Pendente',
    };
    onSubmit(data);
  };

  const totalReceitas = (Number(formData.receitasProprias) || 0) + (Number(formData.subvencaoEstado) || 0);
  const totalDespesas = (Number(formData.despesasPessoal) || 0) + (Number(formData.despesasFuncionamento) || 0) + (Number(formData.despesasInvestimento) || 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="flex-grow overflow-auto bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-blue-600 p-8 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">Formulário de Recursos Financeiros</h2>
              <p className="text-blue-100 text-sm font-medium">Preencha os dados estatísticos financeiros para o ano de {formData.ano}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-blue-500 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Receitas Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-blue-900 font-black uppercase tracking-widest text-xs border-b border-gray-100 pb-2">
                  <TrendingUp size={16} />
                  <span>Receitas e Orçamento</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Orçamento Anual Total (MZN)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="number"
                        required
                        value={formData.orcamentoAnual}
                        onChange={(e) => setFormData({ ...formData, orcamentoAnual: Number(e.target.value) })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Receitas Próprias (MZN)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="number"
                        required
                        value={formData.receitasProprias}
                        onChange={(e) => setFormData({ ...formData, receitasProprias: Number(e.target.value) })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Subvenção do Estado (MZN)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="number"
                        required
                        value={formData.subvencaoEstado}
                        onChange={(e) => setFormData({ ...formData, subvencaoEstado: Number(e.target.value) })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Despesas Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-red-900 font-black uppercase tracking-widest text-xs border-b border-gray-100 pb-2">
                  <TrendingDown size={16} />
                  <span>Despesas</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Despesas com Pessoal (MZN)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="number"
                        required
                        value={formData.despesasPessoal}
                        onChange={(e) => setFormData({ ...formData, despesasPessoal: Number(e.target.value) })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Despesas de Funcionamento (MZN)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="number"
                        required
                        value={formData.despesasFuncionamento}
                        onChange={(e) => setFormData({ ...formData, despesasFuncionamento: Number(e.target.value) })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Despesas de Investimento (MZN)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="number"
                        required
                        value={formData.despesasInvestimento}
                        onChange={(e) => setFormData({ ...formData, despesasInvestimento: Number(e.target.value) })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="bg-blue-50 p-4 rounded-2xl">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Receitas</p>
                <p className="text-lg font-black text-blue-900">{totalReceitas.toLocaleString()} MZN</p>
              </div>
              <div className="bg-red-50 p-4 rounded-2xl">
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Total Despesas</p>
                <p className="text-lg font-black text-red-900">{totalDespesas.toLocaleString()} MZN</p>
              </div>
              <div className={`p-4 rounded-2xl ${saldo >= 0 ? 'bg-green-50' : 'bg-orange-50'}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${saldo >= 0 ? 'text-green-400' : 'text-orange-400'}`}>Saldo Final</p>
                <p className={`text-lg font-black ${saldo >= 0 ? 'text-green-900' : 'text-orange-900'}`}>{saldo.toLocaleString()} MZN</p>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 text-gray-500 font-black text-xs uppercase tracking-widest hover:bg-gray-100 rounded-2xl transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-10 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-2"
              >
                <Send size={16} />
                Enviar para Estatística
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
