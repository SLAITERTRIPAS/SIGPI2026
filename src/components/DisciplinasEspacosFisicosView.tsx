import React, { useState } from 'react';
import { Book, MapPin, Building, FlaskConical, Wrench } from 'lucide-react';
import RegistarMateriaisBensForm from './RegistarMateriaisBensForm';

export default function DisciplinasEspacosFisicosView() {
  const [selectedLocal, setSelectedLocal] = useState<string | null>(null);

  const espacos = [
    { name: 'Sala 101 - Sala de Aula', icon: Building, type: 'sala' },
    { name: 'Lab 1 - Laboratório', icon: FlaskConical, type: 'lab' },
    { name: 'Oficina 1 - Oficina', icon: Wrench, type: 'oficina' },
  ];

  if (selectedLocal) {
    return <RegistarMateriaisBensForm local={selectedLocal} onCancel={() => setSelectedLocal(null)} />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">Disciplinas e Espaços Físicos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 min-h-[300px]">
          <div className="flex items-center gap-2 mb-4 text-blue-900 font-bold">
            <Book size={20} />
            <h3>Disciplinas Registadas</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 min-h-[300px]">
          <div className="flex items-center gap-2 mb-4 text-blue-900 font-bold">
            <MapPin size={20} />
            <h3>Espaços Físicos</h3>
          </div>
          <div className="space-y-3">
            {espacos.map((espaco, index) => (
              <button 
                key={index} 
                onClick={() => (espaco.type === 'lab' || espaco.type === 'oficina') && setSelectedLocal(espaco.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm text-gray-700 transition-colors ${espaco.type === 'lab' || espaco.type === 'oficina' ? 'bg-gray-50 hover:bg-blue-50' : 'bg-gray-50'}`}
              >
                <espaco.icon size={18} className="text-blue-900" />
                {espaco.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
