import React, { useState } from 'react';
import { Colaborador } from '../types';
import { GestaoProcesso } from './GestaoProcesso';
import { CategoriaDashboard } from './CategoriaDashboard';

interface Props {
  colaboradores: Colaborador[];
  onBack: () => void;
}

export function ColaboradoresView({ colaboradores, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'gestao'>('dashboard');

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="bg-gray-200 px-4 py-2 rounded">Voltar</button>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Dashboard Efetivo</button>
          <button onClick={() => setActiveTab('gestao')} className={`px-4 py-2 ${activeTab === 'gestao' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Gestão de Processo</button>
        </div>
      </div>
      {activeTab === 'dashboard' ? (
        <CategoriaDashboard colaboradores={colaboradores} />
      ) : (
        <GestaoProcesso colaboradores={colaboradores} />
      )}
    </div>
  );
}
