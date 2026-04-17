import React from 'react';
import { Building2, Users, Briefcase, Settings } from 'lucide-react';

const menuItems = [
  { title: 'Órgãos de Direção e Gestão', icon: Building2, color: 'bg-blue-900 hover:bg-blue-800' },
  { title: 'Unidades Orgânicas', icon: Users, color: 'bg-red-800 hover:bg-red-700' },
  { title: 'Serviços Centrais', icon: Briefcase, color: 'bg-gray-600 hover:bg-gray-500' },
  { title: 'Sistema', icon: Settings, color: 'bg-black hover:bg-gray-900' },
];

export default function MenuPrincipal() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-2">Menu Principal</h1>
      <p className="text-slate-500 mb-12">Selecione a área a que deseja aceder</p>
      
      <div className="grid grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
        {menuItems.map((item) => (
          <button 
            key={item.title}
            className={`${item.color} text-white p-8 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-lg transition-colors`}
          >
            <item.icon size={48} className="mb-4" />
            <span className="text-center font-bold">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
