import React from 'react';
import { GraduationCap, Users, FileText, Calendar, BookOpen } from 'lucide-react';

export default function DRADashboard() {
  const stats = [
    { title: 'Estudantes Ativos', value: '1.240', icon: GraduationCap, color: 'text-blue-600' },
    { title: 'Novas Matrículas', value: '320', icon: Users, color: 'text-green-600' },
    { title: 'Exames Agendados', value: '45', icon: Calendar, color: 'text-purple-600' },
    { title: 'Processos de Certificação', value: '12', icon: FileText, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</p>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-black text-blue-900 mb-6 uppercase tracking-tighter">Atividades Recentes do DRA</h3>
        <div className="space-y-4">
          {['Processamento de Matrículas 2026', 'Preparação de Exames de Admissão', 'Certificação de Graduados 2025'].map((activity, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <BookOpen size={20} className="text-blue-600" />
              <p className="text-sm font-medium text-gray-700">{activity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
