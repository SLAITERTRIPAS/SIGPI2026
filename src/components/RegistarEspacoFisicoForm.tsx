import React, { useState } from 'react';
import { MapPin, Save, X, BookOpen } from 'lucide-react';

export default function RegistarEspacoFisicoForm({ onCancel, courseName }: { onCancel: () => void, courseName?: string }) {
  const [piso, setPiso] = useState('');
  const [sala, setSala] = useState('');

  const pisos = ['Rés do Chão', '1º Andar', '2º Andar'];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto border border-gray-200">
      <div className="bg-blue-900 text-white p-6 flex items-center gap-4">
        <MapPin size={32} />
        <div>
          <h2 className="text-2xl font-bold">Registo de Espaço Físico</h2>
          <p className="text-blue-100 text-sm">Registe salas, laboratórios ou oficinas para o curso.</p>
        </div>
      </div>
      
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">BLOCO / EDIFÍCIO</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white">
              <option value="">Selecione o bloco...</option>
              <option value="Bloco Administrativo">Bloco Administrativo</option>
              <option value="Auditório">Auditório</option>
              <option value={`Oficina (${courseName || 'Curso'})`}>{`Oficina (${courseName || 'Curso'})`}</option>
              <option value={`Laboratorio (${courseName || 'Curso'})`}>{`Laboratorio (${courseName || 'Curso'})`}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">PISO / ANDAR</label>
            <select 
              value={piso} 
              onChange={(e) => setPiso(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Selecione o piso...</option>
              {pisos.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">NÚMERO DA SALA</label>
            <input 
              type="text" 
              value={sala}
              onChange={(e) => setSala(e.target.value)}
              placeholder="Ex: 101" 
              className="w-full p-3 border border-gray-300 rounded-lg text-sm" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">TIPO DE ESPAÇO</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg text-sm">
              <option>Sala de Aula</option>
              <option>Laboratório</option>
              <option>Oficina</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-4 border border-gray-200">
          <div className="bg-white p-2 rounded-lg border border-gray-200">
            <BookOpen className="text-blue-900" size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">PRÉ-VISUALIZAÇÃO</p>
            <p className="text-sm font-bold text-blue-900">
              {piso && sala ? `${piso} - Sala ${sala}` : 'Sala de Aula - ... (...)'}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 text-sm flex items-center gap-2">
            <X size={16} />
            Cancelar
          </button>
          <button className="px-6 py-2 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 flex items-center gap-2 text-sm">
            <Save size={16} />
            Registar Espaço
          </button>
        </div>
      </div>
    </div>
  );
}
