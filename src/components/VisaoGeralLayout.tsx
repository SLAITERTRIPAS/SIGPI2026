import React from 'react';
import { LayoutGrid } from 'lucide-react';

export default function VisaoGeralLayout({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-4">Estatísticas Gerais - {title}</h3>
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center font-bold text-xl">85%</div>
              <div className="space-y-2 text-sm">
                <p>🟢 Indicador Positivo: 85%</p>
                <p>🔴 Indicador Negativo: 10%</p>
                <p>🟡 Em Espera: 5%</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-4">Distribuição Detalhada</h3>
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-500"><th>Categoria</th><th>Quantidade</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>Item A</td><td>45</td><td>Ativo</td></tr>
                <tr><td>Item B</td><td>32</td><td>Ativo</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-4">Total Registos</h3>
            <p className="text-4xl font-bold">120</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-4">Alertas</h3>
            <p className="text-4xl font-bold text-red-500">3</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-4">Pendentes</h3>
            <p className="text-4xl font-bold text-yellow-500">7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
