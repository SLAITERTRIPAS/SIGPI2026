import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, GraduationCap, Activity, ArrowLeft } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Data from DirectorGeneralOverview
const colaboradoresGenero = [
  { name: 'Masculino', value: 120 },
  { name: 'Feminino', value: 95 },
];

const dadosColaboradoresGeral = [
  { nivel: 'PHD', docentesH: 20, docentesM: 15, ctaH: 2, ctaM: 1 },
  { nivel: 'MESTRADOS', docentesH: 40, docentesM: 30, ctaH: 10, ctaM: 15 },
  { nivel: 'LICENCIADOS', docentesH: 10, docentesM: 5, ctaH: 20, ctaM: 25 },
  { nivel: 'TÉCNICOS PROFISSIONAIS', docentesH: 0, docentesM: 0, ctaH: 5, ctaM: 5 },
  { nivel: 'TÉCNICOS MÉDIOS', docentesH: 0, docentesM: 0, ctaH: 10, ctaM: 10 },
  { nivel: 'MÉDIO', docentesH: 0, docentesM: 0, ctaH: 15, ctaM: 20 },
  { nivel: 'BÁSICOS', docentesH: 0, docentesM: 0, ctaH: 10, ctaM: 5 },
  { nivel: 'SEM NÍVEL DE ESCOLARIDADE', docentesH: 0, docentesM: 0, ctaH: 5, ctaM: 2 },
];

const dadosDistribuicaoDirecao = [
  { direcao: 'Órgãos de Direção e Gestão', h: 10, m: 5, hm: 15 },
  { direcao: 'Unidades Orgânicas', h: 80, m: 60, hm: 140 },
  { direcao: 'Serviços Centrais', h: 30, m: 30, hm: 60 },
];

const estudantesGenero = [
  { name: 'Masculino', value: 1500 },
  { name: 'Feminino', value: 1800 },
];

const estudantesCurso = [
  { name: 'Eng. Elétrica', total: 60, graduadosM: 8, graduadosF: 3, desistentesM: 2, desistentesF: 1 },
  { name: 'Eng. Eletrônica e Telecom.', total: 80, graduadosM: 12, graduadosF: 6, desistentesM: 3, desistentesF: 2 },
  { name: 'Eng. Energias Renováveis', total: 60, graduadosM: 6, graduadosF: 7, desistentesM: 1, desistentesF: 1 },
  { name: 'Eng. Construção Civil', total: 150, graduadosM: 17, graduadosF: 12, desistentesM: 4, desistentesF: 3 },
  { name: 'Eng. Hidráulica', total: 100, graduadosM: 12, graduadosF: 8, desistentesM: 3, desistentesF: 2 },
  { name: 'Eng. Construção Mecânica', total: 120, graduadosM: 20, graduadosF: 4, desistentesM: 6, desistentesF: 1 },
  { name: 'Eng. Termotécnica', total: 110, graduadosM: 16, graduadosF: 6, desistentesM: 4, desistentesF: 2 },
];

const atividades = [
  { name: 'Planificadas', executadas: 120, naoExecutadas: 30 },
  { name: 'Não Planificadas', executadas: 45, naoExecutadas: 0 },
];

export default function BoardOverview({ boardName }: { boardName: string }) {
  const [viewState, setViewState] = useState<'overview' | 'colaboradores' | 'estudantes' | 'atividades'>('overview');

  if (viewState === 'colaboradores') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('overview')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Detalhamento: Colaboradores - {boardName}</h2>
        
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="p-4 bg-gray-50 font-bold text-gray-800 border-b border-gray-200">Distribuição por Gênero e Nível (Docentes vs CTA)</h3>
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                <tr>
                  <th className="p-4 border-b border-gray-200 font-bold" rowSpan={2}>Nível Acadêmico</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-center border-l border-gray-200" colSpan={3}>Docentes</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-center border-l border-gray-200" colSpan={3}>CTA</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-center border-l border-gray-200" rowSpan={2}>Total Geral</th>
                </tr>
                <tr>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs border-l border-gray-200">H</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">M</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">Total</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs border-l border-gray-200">H</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">M</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">Total</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {dadosColaboradoresGeral.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.nivel}</td>
                    <td className="p-4 border-b border-gray-100 text-center border-l border-gray-100">{row.docentesH}</td>
                    <td className="p-4 border-b border-gray-100 text-center">{row.docentesM}</td>
                    <td className="p-4 border-b border-gray-100 text-center font-bold text-blue-600">{row.docentesH + row.docentesM}</td>
                    <td className="p-4 border-b border-gray-100 text-center border-l border-gray-100">{row.ctaH}</td>
                    <td className="p-4 border-b border-gray-100 text-center">{row.ctaM}</td>
                    <td className="p-4 border-b border-gray-100 text-center font-bold text-green-600">{row.ctaH + row.ctaM}</td>
                    <td className="p-4 border-b border-gray-100 text-center font-bold text-gray-900 border-l border-gray-100">
                      {row.docentesH + row.docentesM + row.ctaH + row.ctaM}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="p-4 bg-gray-50 font-bold text-gray-800 border-b border-gray-200">Distribuição por Direção de Afetação</h3>
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                <tr>
                  <th className="p-4 border-b border-gray-200 font-bold">Direção</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-center">Homens (H)</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-center">Mulheres (M)</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-center">Total (HM)</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {dadosDistribuicaoDirecao.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.direcao}</td>
                    <td className="p-4 border-b border-gray-100 text-center">{row.h}</td>
                    <td className="p-4 border-b border-gray-100 text-center">{row.m}</td>
                    <td className="p-4 border-b border-gray-100 text-center font-bold text-gray-900">{row.hm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === 'estudantes') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('overview')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Detalhamento: Estudantes - {boardName}</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b border-gray-200 font-bold" rowSpan={2}>Curso</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center border-l border-gray-200" colSpan={3}>Estudantes Atuais</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center border-l border-gray-200" colSpan={3}>Graduados</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center border-l border-gray-200" colSpan={3}>Desistentes</th>
              </tr>
              <tr>
                <th className="p-2 border-b border-gray-200 font-bold text-center text-xs border-l border-gray-200">H</th>
                <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">M</th>
                <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">Total</th>
                <th className="p-2 border-b border-gray-200 font-bold text-center text-xs border-l border-gray-200">H</th>
                <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">M</th>
                <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">Total</th>
                <th className="p-2 border-b border-gray-200 font-bold text-center text-xs border-l border-gray-200">H</th>
                <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">M</th>
                <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {estudantesCurso.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.name}</td>
                  <td className="p-4 border-b border-gray-100 text-center border-l border-gray-100">{(row.total * 0.6).toFixed(0)}</td>
                  <td className="p-4 border-b border-gray-100 text-center">{(row.total * 0.4).toFixed(0)}</td>
                  <td className="p-4 border-b border-gray-100 text-center font-bold text-blue-600">{row.total}</td>
                  <td className="p-4 border-b border-gray-100 text-center border-l border-gray-100">{row.graduadosM}</td>
                  <td className="p-4 border-b border-gray-100 text-center">{row.graduadosF}</td>
                  <td className="p-4 border-b border-gray-100 text-center font-bold text-green-600">{row.graduadosM + row.graduadosF}</td>
                  <td className="p-4 border-b border-gray-100 text-center border-l border-gray-100">{row.desistentesM}</td>
                  <td className="p-4 border-b border-gray-100 text-center">{row.desistentesF}</td>
                  <td className="p-4 border-b border-gray-100 text-center font-bold text-red-600">{row.desistentesM + row.desistentesF}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (viewState === 'atividades') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('overview')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Detalhamento: Atividades - {boardName}</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b border-gray-200 font-bold">Tipo de Atividade</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Executadas</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Não Executadas</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Total</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Grau de Execução</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {atividades.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.name}</td>
                  <td className="p-4 border-b border-gray-100 text-center font-bold text-green-600">{row.executadas}</td>
                  <td className="p-4 border-b border-gray-100 text-center font-bold text-red-600">{row.naoExecutadas}</td>
                  <td className="p-4 border-b border-gray-100 text-center font-bold">{row.executadas + row.naoExecutadas}</td>
                  <td className="p-4 border-b border-gray-100 text-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                      {Math.round((row.executadas / (row.executadas + row.naoExecutadas)) * 100)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-10">
      <h2 className="text-2xl font-bold text-blue-900 border-b pb-2 mb-6 uppercase tracking-wider">Visão Geral: {boardName}</h2>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        <button onClick={() => setViewState('colaboradores')} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-blue-500 transition-all text-left group">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Colaboradores</p>
            <p className="text-2xl font-bold text-gray-900">215</p>
          </div>
        </button>

        <button onClick={() => setViewState('estudantes')} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-green-500 transition-all text-left group">
          <div className="p-4 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Estudantes</p>
            <p className="text-2xl font-bold text-gray-900">3,300</p>
          </div>
        </button>

        <button onClick={() => setViewState('atividades')} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-purple-500 transition-all text-left group">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Atividades Executadas</p>
            <p className="text-2xl font-bold text-gray-900">165</p>
          </div>
        </button>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Colaboradores por Gênero</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={colaboradoresGenero}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {colaboradoresGenero.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Estudantes por Gênero</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={estudantesGenero}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {estudantesGenero.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index + 2 % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Resumo de Atividades</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={atividades}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="executadas" name="Executadas" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="naoExecutadas" name="Não Executadas" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
