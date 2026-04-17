import React from 'react';
import { Package, Save, X, Search } from 'lucide-react';

export default function RegistarMateriaisBensForm({ onCancel, local }: { onCancel: () => void, local: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto border border-gray-200">
      <div className="bg-blue-900 text-white p-6 flex items-center gap-4">
        <Package size={32} />
        <div>
          <h2 className="text-2xl font-bold">Registo de Materiais e Bens</h2>
          <p className="text-blue-100 text-sm">Registe os materiais e bens existentes em: {local}</p>
        </div>
      </div>
      
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">NOME DO MATERIAL / BEM</label>
            <input type="text" placeholder="Ex: Computador, Microscópio" className="w-full p-3 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">TIPO DE EQUIPAMENTO</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg text-sm">
              <option>Informático</option>
              <option>Laboratorial</option>
              <option>Ferramenta</option>
              <option>Mobiliário</option>
              <option>Outro</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">MARCA</label>
            <input type="text" placeholder="Ex: HP, Bosch" className="w-full p-3 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">MODELO</label>
            <input type="text" placeholder="Ex: EliteBook 840" className="w-full p-3 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">SERIAL NUMBER</label>
            <input type="text" placeholder="Ex: SN123456789" className="w-full p-3 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">CÓDIGO DE INVENTÁRIO</label>
            <input type="text" placeholder="Ex: INV-001" className="w-full p-3 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">QUANTIDADE</label>
            <input type="number" defaultValue={1} className="w-full p-3 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">DATA DE AQUISIÇÃO</label>
            <input type="date" className="w-full p-3 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">ESTADO DE CONSERVAÇÃO</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg text-sm">
              <option>Bom</option>
              <option>Regular</option>
              <option>Mau</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">OBSERVAÇÕES</label>
          <textarea rows={3} placeholder="Detalhes adicionais..." className="w-full p-3 border border-gray-300 rounded-lg text-sm" />
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 text-sm flex items-center gap-2">
            <X size={16} />
            Cancelar
          </button>
          <button className="px-6 py-2 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 flex items-center gap-2 text-sm">
            <Save size={16} />
            Submeter o Registo
          </button>
        </div>
      </div>
    </div>
  );
}
