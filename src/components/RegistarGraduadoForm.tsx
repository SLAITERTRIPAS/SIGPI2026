import React from 'react';
import { GraduationCap, Save, X } from 'lucide-react';

export default function RegistarGraduadoForm({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto border border-gray-200">
      <div className="bg-blue-900 text-white p-6 flex items-center gap-4">
        <GraduationCap size={32} />
        <div>
          <h2 className="text-2xl font-bold">Registo de Graduados</h2>
          <p className="text-blue-100 text-sm">Preencha os dados para registar um novo graduado no sistema</p>
        </div>
      </div>
      
      <div className="p-8 space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">NOME COMPLETO DO GRADUADO</label>
          <input type="text" placeholder="Insira o nome completo..." className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">GÉNERO</label>
            <select className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white">
              <option value="">SELECIONE O GÉNERO</option>
              <option value="HOMEM">HOMEM</option>
              <option value="MULHER">MULHER</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">IDADE</label>
            <input type="number" placeholder="Ex: 23" className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">ANO DE INGRESSO</label>
            <input type="number" placeholder="Ex: 2020" className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">ANO DE GRADUAÇÃO</label>
            <input type="number" defaultValue={2026} className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">MÉDIA FINAL</label>
            <input type="number" step="0.1" placeholder="Ex: 14.5" className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">TÍTULO DO TRABALHO DE FIM DE CURSO (TFC)</label>
          <textarea rows={4} placeholder="Insira o título do trabalho..." className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" />
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 text-sm">Cancelar</button>
          <button className="px-6 py-2 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 flex items-center gap-2 text-sm">
            <Save size={16} />
            Registar Graduado
          </button>
        </div>
      </div>
    </div>
  );
}
