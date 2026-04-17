import React, { useState } from 'react';
import { Users, Save } from 'lucide-react';

export default function RegistarEfetivoEscolarForm({ onCancel }: { onCancel: () => void }) {
  const [homens, setHomens] = useState(0);
  const [mulheres, setMulheres] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto border border-gray-200">
      <div className="bg-white p-6 border-b border-gray-100 flex items-start gap-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Users className="text-blue-900" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-blue-900">Registo de Efetivo Escolar</h2>
          <p className="text-gray-500 text-sm">Introduza o número de estudantes por nível e género.</p>
        </div>
      </div>
      
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">NÍVEL / ANO</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg text-sm">
              <option>1º Ano</option>
              <option>2º Ano</option>
              <option>3º Ano</option>
              <option>4º Ano</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">HOMEM</label>
            <input 
              type="number" 
              value={homens} 
              onChange={(e) => setHomens(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">MULHER</label>
            <input 
              type="number" 
              value={mulheres} 
              onChange={(e) => setMulheres(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">TOTAL (H+M)</label>
            <input 
              type="number" 
              value={homens + mulheres} 
              readOnly 
              className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg text-sm font-bold text-blue-900" 
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 text-sm">Cancelar</button>
          <button className="px-6 py-2 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 flex items-center gap-2 text-sm">
            <Save size={16} />
            Submeter o Registo
          </button>
        </div>
      </div>
    </div>
  );
}
