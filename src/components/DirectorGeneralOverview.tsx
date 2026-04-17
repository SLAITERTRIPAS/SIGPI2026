import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, GraduationCap, Activity, DollarSign, ArrowLeft, CheckSquare, Landmark, Wallet, Globe, TrendingUp, TrendingDown } from 'lucide-react';
import { EFETIVO_GERAL_DATA } from '../constants/colaboradoresList';
import { ESTUDANTES_DATA } from '../constants/estudantesList';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Filter helper
const getColaboradores = (tipo: 'Docente' | 'CTA', quadro: boolean) => 
  EFETIVO_GERAL_DATA.filter(c => c.tipo === tipo && (quadro ? c.tipoRelacaoContractual === 'Pertence ao quadro' : c.tipoRelacaoContractual !== 'Pertence ao quadro'));

// Totals from specific units
const totalFuncionarios = EFETIVO_GERAL_DATA.length;
const totalDocentesQuadro = getColaboradores('Docente', true).length;
const totalDocentesNaoQuadro = getColaboradores('Docente', false).length;
const totalCTAQuadro = getColaboradores('CTA', true).length;
const totalCTANaoQuadro = getColaboradores('CTA', false).length;

const totalEstudantes = ESTUDANTES_DATA.reduce((acc, curr) => acc + curr.homens + curr.mulheres, 0);

// Use real data
const colaboradoresGenero = [
  { name: 'Masculino', value: EFETIVO_GERAL_DATA.filter(c => c.genero === 'M').length },
  { name: 'Feminino', value: EFETIVO_GERAL_DATA.filter(c => c.genero === 'F').length },
];

const colaboradoresNivel = [
  { name: 'Licenciatura', value: EFETIVO_GERAL_DATA.filter(c => c.nivelAcademico.includes('Licenciado')).length },
  { name: 'Mestrado', value: EFETIVO_GERAL_DATA.filter(c => c.nivelAcademico.includes('Mestrado')).length },
  { name: 'Doutoramento', value: EFETIVO_GERAL_DATA.filter(c => c.nivelAcademico.includes('Doutor')).length },
];

const colaboradoresDirecao = [
  { name: 'Repartição de Pessoal', value: EFETIVO_GERAL_DATA.filter(c => c.unidade === 'Repartição de Pessoal').length },
];

const estudantesGenero = [
  { name: 'Masculino', value: ESTUDANTES_DATA.reduce((acc, curr) => acc + curr.homens, 0) },
  { name: 'Feminino', value: ESTUDANTES_DATA.reduce((acc, curr) => acc + curr.mulheres, 0) },
];

// Based on courses in ESTUDANTES_DATA
const estudantesCurso = ESTUDANTES_DATA.map(e => ({
  name: e.curso,
  total: e.homens + e.mulheres,
  graduadosM: 0,
  graduadosF: 0
}));

const atividades: any[] = [];
const dadosDocentes: any[] = [];
const dadosCTA: any[] = [];
const dadosColaboradoresGeral: any[] = [];
const dadosDistribuicaoDirecao: any[] = [];
const dadosOrgaosDirecao: any[] = [];
const dadosUnidadesOrganicas: any[] = [];
const dadosDivisaoEngenharia: any[] = [];
const dadosServicosCentrais: any[] = [];

const dadosEstudantes = ESTUDANTES_DATA.map(e => ({
  curso: e.curso,
  departamento: e.departamento,
  h: e.homens,
  m: e.mulheres,
  hm: e.homens + e.mulheres
}));

const dadosCursosEET_Laboral = [
  { curso: 'Curso de Engenharia Elétrica', h: 25, m: 10, hm: 35, graduadosH: 5, graduadosM: 2, graduadosHM: 7, desistentesH: 2, desistentesM: 1, desistentesHM: 3 },
  { curso: 'Curso de Engenharia Eletrônica e de Telecomunicações', h: 30, m: 20, hm: 50, graduadosH: 8, graduadosM: 4, graduadosHM: 12, desistentesH: 3, desistentesM: 2, desistentesHM: 5 },
  { curso: 'Curso de Engenharia de Energias Renováveis', h: 20, m: 20, hm: 40, graduadosH: 4, graduadosM: 5, graduadosHM: 9, desistentesH: 1, desistentesM: 1, desistentesHM: 2 },
];
const dadosCursosEET_PosLaboral = [
  { curso: 'Curso de Engenharia Elétrica', h: 15, m: 10, hm: 25, graduadosH: 3, graduadosM: 1, graduadosHM: 4, desistentesH: 1, desistentesM: 0, desistentesHM: 1 },
  { curso: 'Curso de Engenharia Eletrônica e de Telecomunicações', h: 20, m: 10, hm: 30, graduadosH: 4, graduadosM: 2, graduadosHM: 6, desistentesH: 2, desistentesM: 1, desistentesHM: 3 },
  { curso: 'Curso de Engenharia de Energias Renováveis', h: 10, m: 10, hm: 20, graduadosH: 2, graduadosM: 2, graduadosHM: 4, desistentesH: 0, desistentesM: 1, desistentesHM: 1 },
];

const dadosCursosECC_Laboral = [
  { curso: 'Curso de Engenharia de Construção Civil', h: 50, m: 40, hm: 90, graduadosH: 10, graduadosM: 8, graduadosHM: 18, desistentesH: 4, desistentesM: 3, desistentesHM: 7 },
  { curso: 'Curso de Engenharia Hidráulica', h: 40, m: 25, hm: 65, graduadosH: 8, graduadosM: 5, graduadosHM: 13, desistentesH: 3, desistentesM: 2, desistentesHM: 5 },
];
const dadosCursosECC_PosLaboral = [
  { curso: 'Curso de Engenharia de Construção Civil', h: 40, m: 20, hm: 60, graduadosH: 7, graduadosM: 4, graduadosHM: 11, desistentesH: 5, desistentesM: 2, desistentesHM: 7 },
  { curso: 'Curso de Engenharia Hidráulica', h: 20, m: 15, hm: 35, graduadosH: 4, graduadosM: 3, graduadosHM: 7, desistentesH: 2, desistentesM: 1, desistentesHM: 3 },
];

const dadosCursosECM_Laboral = [
  { curso: 'Curso de Engenharia de Construção Mecânica', h: 60, m: 15, hm: 75, graduadosH: 12, graduadosM: 3, graduadosHM: 15, desistentesH: 6, desistentesM: 1, desistentesHM: 7 },
  { curso: 'Curso de Engenharia Termotécnica', h: 50, m: 20, hm: 70, graduadosH: 10, graduadosM: 4, graduadosHM: 14, desistentesH: 4, desistentesM: 2, desistentesHM: 6 },
];
const dadosCursosECM_PosLaboral = [
  { curso: 'Curso de Engenharia de Construção Mecânica', h: 40, m: 5, hm: 45, graduadosH: 8, graduadosM: 1, graduadosHM: 9, desistentesH: 5, desistentesM: 0, desistentesHM: 5 },
  { curso: 'Curso de Engenharia Termotécnica', h: 30, m: 10, hm: 40, graduadosH: 6, graduadosM: 2, graduadosHM: 8, desistentesH: 3, desistentesM: 1, desistentesHM: 4 },
];

const dadosAtividadesPlanificadas = [];

const dadosAtividadesNaoPlanificadas = [];

const dadosReceitasProprias = [];

const dadosExecucaoOrcamental = [];

const dadosPagamentosEfetuados = [];

export default function DirectorGeneralOverview() {
  const [viewState, setViewState] = useState<'overview' | 'colaboradores' | 'docentes' | 'cta' | 'estudantes' | 'estudantes_eet' | 'estudantes_ecc' | 'estudantes_ecm' | 'atividades' | 'orcamento' | 'atividades_planificadas' | 'atividades_nao_planificadas' | 'receitas_proprias' | 'orgaos_direcao' | 'unidades_organicas' | 'divisao_engenharia' | 'servicos_centrais' | 'entrada_valores' | 'saida_valores'>('overview');

  const renderTable = (title: string, data: any[], onBack: () => void, firstColumnLabel: string = 'Nível Acadêmico', firstColumnKey: string = 'nivel', onRowClick?: (row: any) => void) => (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
        <ArrowLeft size={16} /> Voltar
      </button>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b border-gray-200 font-bold">{firstColumnLabel}</th>
              <th className="p-4 border-b border-gray-200 font-bold text-center">Homens (H)</th>
              <th className="p-4 border-b border-gray-200 font-bold text-center">Mulheres (M)</th>
              <th className="p-4 border-b border-gray-200 font-bold text-center">Total (HM)</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {data.map((row, idx) => (
              <tr key={idx} className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => onRowClick && onRowClick(row)}>
                <td className="p-4 border-b border-gray-100 font-medium">
                  {onRowClick ? <span className="text-blue-600 hover:underline">{row[firstColumnKey]}</span> : row[firstColumnKey]}
                </td>
                <td className="p-4 border-b border-gray-100 text-center">{row.h}</td>
                <td className="p-4 border-b border-gray-100 text-center">{row.m}</td>
                <td className="p-4 border-b border-gray-100 text-center font-bold text-gray-900">{row.hm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderActivitiesTable = (title: string, data: any[], onBack: () => void) => (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
        <ArrowLeft size={16} /> Voltar
      </button>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b border-gray-200 font-bold">Unidade Orgânica</th>
              <th className="p-4 border-b border-gray-200 font-bold">Direção</th>
              <th className="p-4 border-b border-gray-200 font-bold">Nome da Atividade</th>
              <th className="p-4 border-b border-gray-200 font-bold">Mês de Realização</th>
              <th className="p-4 border-b border-gray-200 font-bold text-right">Orçamento da Atividade</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.unidade}</td>
                <td className="p-4 border-b border-gray-100">{row.direcao}</td>
                <td className="p-4 border-b border-gray-100">{row.atividade}</td>
                <td className="p-4 border-b border-gray-100">{row.mes}</td>
                <td className="p-4 border-b border-gray-100 text-right font-bold text-gray-900">{row.orcamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGroupedTables = (mainTitle: string, groups: { subtitle: string, data: any[] }[], onBack: () => void, firstColumnLabel: string = 'Curso', firstColumnKey: string = 'curso') => (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
        <ArrowLeft size={16} /> Voltar
      </button>
      <h2 className="text-2xl font-bold text-gray-900">{mainTitle}</h2>
      
      {groups.map((group, gIdx) => (
        <div key={gIdx} className="space-y-4 mt-8">
          <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">{group.subtitle}</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                <tr>
                  <th className="p-4 border-b border-gray-200 font-bold" rowSpan={2}>{firstColumnLabel}</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-center border-l border-gray-200" colSpan={3}>Estudantes Ativos</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-center border-l border-gray-200" colSpan={3}>Graduados</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-center border-l border-gray-200" colSpan={3}>Desistentes</th>
                </tr>
                <tr>
                  <th className="p-2 border-b border-gray-200 font-bold text-center border-l border-gray-200 text-xs">H</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">M</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">HM</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center border-l border-gray-200 text-xs">H</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">M</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">HM</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center border-l border-gray-200 text-xs">H</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">M</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-xs">HM</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {group.data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-4 border-b border-gray-100 font-medium">{row[firstColumnKey]}</td>
                    <td className="p-4 border-b border-gray-100 text-center border-l border-gray-100">{row.h}</td>
                    <td className="p-4 border-b border-gray-100 text-center">{row.m}</td>
                    <td className="p-4 border-b border-gray-100 text-center font-bold text-gray-900">{row.hm}</td>
                    <td className="p-4 border-b border-gray-100 text-center border-l border-gray-100">{row.graduadosH || 0}</td>
                    <td className="p-4 border-b border-gray-100 text-center">{row.graduadosM || 0}</td>
                    <td className="p-4 border-b border-gray-100 text-center font-bold text-gray-900">{row.graduadosHM || 0}</td>
                    <td className="p-4 border-b border-gray-100 text-center border-l border-gray-100">{row.desistentesH || 0}</td>
                    <td className="p-4 border-b border-gray-100 text-center">{row.desistentesM || 0}</td>
                    <td className="p-4 border-b border-gray-100 text-center font-bold text-gray-900">{row.desistentesHM || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );

  if (viewState === 'docentes') {
    return renderTable('Colaboradores: DOCENTES', dadosDocentes, () => setViewState('colaboradores'));
  }

  if (viewState === 'cta') {
    return renderTable('Colaboradores: CTA', dadosCTA, () => setViewState('colaboradores'));
  }

  if (viewState === 'estudantes') {
    return renderTable('Total Estudantes por Departamento', dadosEstudantes, () => setViewState('overview'), 'Departamento', 'curso', (row) => {
      if (row.curso === 'ENGENHARIA ELECTROTÉCNICA') {
        setViewState('estudantes_eet');
      } else if (row.curso === 'ENGENHARIA DE CONSTRUÇÃO CIVIL') {
        setViewState('estudantes_ecc');
      } else if (row.curso === 'ENGENHARIA DE CONSTRUÇÃO MECÂNICA') {
        setViewState('estudantes_ecm');
      }
    });
  }

  if (viewState === 'estudantes_eet') {
    return renderGroupedTables('Cursos: Engenharia Electrotécnica', [
      { subtitle: 'Regime Laboral', data: dadosCursosEET_Laboral },
      { subtitle: 'Regime Pós-Laboral', data: dadosCursosEET_PosLaboral }
    ], () => setViewState('estudantes'));
  }

  if (viewState === 'estudantes_ecc') {
    return renderGroupedTables('Cursos: Engenharia de Construção Civil', [
      { subtitle: 'Regime Laboral', data: dadosCursosECC_Laboral },
      { subtitle: 'Regime Pós-Laboral', data: dadosCursosECC_PosLaboral }
    ], () => setViewState('estudantes'));
  }

  if (viewState === 'estudantes_ecm') {
    return renderGroupedTables('Cursos: Engenharia de Construção Mecânica', [
      { subtitle: 'Regime Laboral', data: dadosCursosECM_Laboral },
      { subtitle: 'Regime Pós-Laboral', data: dadosCursosECM_PosLaboral }
    ], () => setViewState('estudantes'));
  }

  if (viewState === 'colaboradores') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('overview')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar para Visão Geral
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Selecione a Categoria de Colaboradores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button 
            onClick={() => setViewState('docentes')} 
            className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 group"
          >
            <Users size={48} className="text-blue-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-gray-900">DOCENTES</h3>
            <p className="text-gray-500">Visualizar distribuição por nível acadêmico e gênero</p>
          </button>
          <button 
            onClick={() => setViewState('cta')} 
            className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 group"
          >
            <Users size={48} className="text-green-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-gray-900">CTA</h3>
            <p className="text-gray-500">Visualizar distribuição por nível acadêmico e gênero</p>
          </button>
        </div>

        <div className="mt-12 space-y-4 pt-8">
          <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">Distribuição por Gênero e Nível (Docentes vs CTA)</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
              <tfoot className="bg-gray-100 font-bold text-gray-900">
                <tr>
                  <td className="p-4">TOTAL</td>
                  <td className="p-4 text-center border-l border-gray-200">{dadosColaboradoresGeral.reduce((acc, curr) => acc + curr.docentesH, 0)}</td>
                  <td className="p-4 text-center">{dadosColaboradoresGeral.reduce((acc, curr) => acc + curr.docentesM, 0)}</td>
                  <td className="p-4 text-center text-blue-700">{dadosColaboradoresGeral.reduce((acc, curr) => acc + curr.docentesH + curr.docentesM, 0)}</td>
                  <td className="p-4 text-center border-l border-gray-200">{dadosColaboradoresGeral.reduce((acc, curr) => acc + curr.ctaH, 0)}</td>
                  <td className="p-4 text-center">{dadosColaboradoresGeral.reduce((acc, curr) => acc + curr.ctaM, 0)}</td>
                  <td className="p-4 text-center text-green-700">{dadosColaboradoresGeral.reduce((acc, curr) => acc + curr.ctaH + curr.ctaM, 0)}</td>
                  <td className="p-4 text-center border-l border-gray-200">
                    {dadosColaboradoresGeral.reduce((acc, curr) => acc + curr.docentesH + curr.docentesM + curr.ctaH + curr.ctaM, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-12 space-y-4 pt-8">
          <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">Distribuição dos Colaboradores por Direção</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
                  <tr 
                    key={idx} 
                    className={`hover:bg-gray-50 ${(row.direcao === 'Órgãos de Direção e Gestão' || row.direcao === 'Unidades Orgânicas' || row.direcao === 'Serviços Centrais') ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                      if (row.direcao === 'Órgãos de Direção e Gestão') {
                        setViewState('orgaos_direcao');
                      } else if (row.direcao === 'Unidades Orgânicas') {
                        setViewState('unidades_organicas');
                      } else if (row.direcao === 'Serviços Centrais') {
                        setViewState('servicos_centrais');
                      }
                    }}
                  >
                    <td className="p-4 border-b border-gray-100 font-medium text-gray-900">
                      {row.direcao}
                      {(row.direcao === 'Órgãos de Direção e Gestão' || row.direcao === 'Unidades Orgânicas' || row.direcao === 'Serviços Centrais') && <span className="ml-2 text-xs text-blue-500 font-normal">(Ver detalhes)</span>}
                    </td>
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

  if (viewState === 'orgaos_direcao') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('colaboradores')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar para Colaboradores
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Detalhamento: Órgãos de Direção e Gestão</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b border-gray-200 font-bold">Cargo / Departamento</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Homens (H)</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Mulheres (M)</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Total (HM)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {dadosOrgaosDirecao.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.cargo}</td>
                  <td className="p-4 border-b border-gray-100 text-center">{row.h}</td>
                  <td className="p-4 border-b border-gray-100 text-center">{row.m}</td>
                  <td className="p-4 border-b border-gray-100 text-center font-bold text-gray-900">{row.hm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (viewState === 'unidades_organicas') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('colaboradores')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar para Colaboradores
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Detalhamento: Unidades Orgânicas</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b border-gray-200 font-bold">Unidade</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Homens (H)</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Mulheres (M)</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Total (HM)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {dadosUnidadesOrganicas.map((row, idx) => (
                <tr 
                  key={idx} 
                  className={`hover:bg-gray-50 ${row.cargo === 'Divisão de Engenharia' ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (row.cargo === 'Divisão de Engenharia') {
                      setViewState('divisao_engenharia');
                    }
                  }}
                >
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-900">
                    {row.cargo}
                    {row.cargo === 'Divisão de Engenharia' && <span className="ml-2 text-xs text-blue-500 font-normal">(Ver detalhes)</span>}
                  </td>
                  <td className="p-4 border-b border-gray-100 text-center">{row.h}</td>
                  <td className="p-4 border-b border-gray-100 text-center">{row.m}</td>
                  <td className="p-4 border-b border-gray-100 text-center font-bold text-gray-900">{row.hm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (viewState === 'divisao_engenharia') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('unidades_organicas')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar para Unidades Orgânicas
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Detalhamento: Divisão de Engenharia</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b border-gray-200 font-bold">Departamento</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Homens (H)</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Mulheres (M)</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Total (HM)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {dadosDivisaoEngenharia.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.departamento}</td>
                  <td className="p-4 border-b border-gray-100 text-center">{row.h}</td>
                  <td className="p-4 border-b border-gray-100 text-center">{row.m}</td>
                  <td className="p-4 border-b border-gray-100 text-center font-bold text-gray-900">{row.hm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (viewState === 'servicos_centrais') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('colaboradores')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar para Colaboradores
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Detalhamento: Serviços Centrais</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b border-gray-200 font-bold">Departamento</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Homens (H)</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Mulheres (M)</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Total (HM)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {dadosServicosCentrais.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.departamento}</td>
                  <td className="p-4 border-b border-gray-100 text-center">{row.h}</td>
                  <td className="p-4 border-b border-gray-100 text-center">{row.m}</td>
                  <td className="p-4 border-b border-gray-100 text-center font-bold text-gray-900">{row.hm}</td>
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
          <ArrowLeft size={16} /> Voltar para Visão Geral
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Detalhamento de Atividades Executadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button 
            onClick={() => setViewState('atividades_planificadas')}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4 hover:border-green-500 hover:shadow-md transition-all group"
          >
            <div className="p-4 bg-green-100 text-green-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
              <CheckSquare size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Atividades Planificadas</h3>
            <div className="text-center space-y-2">
              <p className="text-gray-500"><span className="font-bold text-gray-900 text-xl">{atividades.find(a => a.name === 'Planificadas')?.executadas}</span> atividades executadas</p>
              <p className="text-gray-500">Orçamento Total: <span className="font-bold text-green-600 text-xl">
                {(dadosAtividadesPlanificadas.reduce((acc, curr) => acc + parseInt(curr.orcamento.replace(/,/g, '')), 0) / 1000000).toFixed(1)}M MZN
              </span></p>
            </div>
          </button>
          <button 
            onClick={() => setViewState('atividades_nao_planificadas')}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4 hover:border-amber-500 hover:shadow-md transition-all group"
          >
            <div className="p-4 bg-amber-100 text-amber-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
              <Activity size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Atividades Não Planificadas</h3>
            <div className="text-center space-y-2">
              <p className="text-gray-500"><span className="font-bold text-gray-900 text-xl">{atividades.find(a => a.name === 'Não Planificadas')?.executadas}</span> atividades executadas</p>
              <p className="text-gray-500">Orçamento Total: <span className="font-bold text-amber-600 text-xl">
                {dadosAtividadesNaoPlanificadas.reduce((acc, curr) => acc + parseInt(curr.orcamento.replace(/,/g, '')), 0).toLocaleString()} MZN
              </span></p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (viewState === 'atividades_planificadas') {
    return renderActivitiesTable('Atividades Planificadas', dadosAtividadesPlanificadas, () => setViewState('atividades'));
  }

  if (viewState === 'atividades_nao_planificadas') {
    return renderActivitiesTable('Atividades Não Planificadas', dadosAtividadesNaoPlanificadas, () => setViewState('atividades'));
  }

  if (viewState === 'orcamento') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('overview')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar para Visão Geral
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Execução Orçamental</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button 
            onClick={() => setViewState('entrada_valores')}
            className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div className="p-6 bg-blue-100 text-blue-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
              <TrendingUp size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Entrada de Valores</h3>
            <p className="text-gray-500 text-center">Detalhamento das fontes de receita e arrecadação</p>
          </button>
          <button 
            onClick={() => setViewState('saida_valores')}
            className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4 hover:border-red-500 hover:shadow-md transition-all group"
          >
            <div className="p-6 bg-red-100 text-red-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
              <TrendingDown size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Saída de Valores</h3>
            <p className="text-gray-500 text-center">Detalhamento das despesas e execução por rubrica</p>
          </button>
        </div>
      </div>
    );
  }

  if (viewState === 'entrada_valores') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('orcamento')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Entrada de Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full mb-2">
              <Landmark size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Orçamento de Estado</h3>
            <div className="text-center space-y-2">
              <p className="text-gray-500">Valor Alocado: <span className="font-bold text-blue-600 text-xl">5.5M MZN</span></p>
              <p className="text-xs text-gray-400">55% do Orçamento Geral</p>
            </div>
          </div>
          <button 
            onClick={() => setViewState('receitas_proprias')}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4 hover:border-green-500 hover:shadow-md transition-all group"
          >
            <div className="p-4 bg-green-100 text-green-600 rounded-full mb-2 group-hover:scale-110 transition-transform">
              <Wallet size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Receitas Próprias</h3>
            <div className="text-center space-y-2">
              <p className="text-gray-500">Valor Arrecadado: <span className="font-bold text-green-600 text-xl">2.5M MZN</span></p>
              <p className="text-xs text-gray-400">25% do Orçamento Geral</p>
            </div>
          </button>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4">
            <div className="p-4 bg-purple-100 text-purple-600 rounded-full mb-2">
              <Globe size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Fontes Externas</h3>
            <div className="text-center space-y-2">
              <p className="text-gray-500">Valor Captado: <span className="font-bold text-purple-600 text-xl">2.0M MZN</span></p>
              <p className="text-xs text-gray-400">20% do Orçamento Geral</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === 'saida_valores') {
    const totalDotacao = dadosExecucaoOrcamental.reduce((acc, curr) => acc + parseInt(curr.dotacao.replace(/,/g, '').replace(' MZN', '')), 0);
    const totalExecutado = dadosExecucaoOrcamental.reduce((acc, curr) => acc + parseInt(curr.executado.replace(/,/g, '').replace(' MZN', '')), 0);
    const saldoDisponivel = totalDotacao - totalExecutado;

    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('orcamento')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar
        </button>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Saída de Valores</h2>
          <div className="bg-green-50 px-6 py-3 rounded-xl border border-green-200">
            <p className="text-sm text-green-700 font-medium">Saldo Disponível (Tempo Real)</p>
            <p className="text-2xl font-bold text-green-800">{saldoDisponivel.toLocaleString()} MZN</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Histórico de Pagamentos</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                  <tr>
                    <th className="p-4 border-b border-gray-200 font-bold">O que se pagou</th>
                    <th className="p-4 border-b border-gray-200 font-bold">Mês</th>
                    <th className="p-4 border-b border-gray-200 font-bold text-right">Valor Pago</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {dadosPagamentosEfetuados.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.item}</td>
                      <td className="p-4 border-b border-gray-100">{row.mes}</td>
                      <td className="p-4 border-b border-gray-100 text-right font-bold text-red-600">{row.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Execução por Rubrica</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 space-y-4">
                {dadosExecucaoOrcamental.map((row, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{row.rubrica}</span>
                      <span className="font-bold text-gray-900">{row.percentagem}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${row.percentagem > 80 ? 'bg-green-500' : row.percentagem > 50 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${row.percentagem}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500">
                      <span>Exec: {row.executado}</span>
                      <span>Dot: {row.dotacao}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === 'receitas_proprias') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10">
        <button onClick={() => setViewState('entrada_valores')} className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft size={16} /> Voltar
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Detalhamento: Receitas Próprias</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b border-gray-200 font-bold">Categoria</th>
                <th className="p-4 border-b border-gray-200 font-bold text-right">Janeiro</th>
                <th className="p-4 border-b border-gray-200 font-bold text-right">Fevereiro</th>
                <th className="p-4 border-b border-gray-200 font-bold text-right">Março</th>
                <th className="p-4 border-b border-gray-200 font-bold text-right">Total</th>
                <th className="p-4 border-b border-gray-200 font-bold text-center">Quantidade</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {dadosReceitasProprias.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-4 border-b border-gray-100 font-medium text-gray-900">{row.categoria}</td>
                  <td className="p-4 border-b border-gray-100 text-right">{row.jan}</td>
                  <td className="p-4 border-b border-gray-100 text-right">{row.fev}</td>
                  <td className="p-4 border-b border-gray-100 text-right">{row.mar}</td>
                  <td className="p-4 border-b border-gray-100 text-right font-bold text-green-600">{row.total}</td>
                  <td className="p-4 border-b border-gray-100 text-center font-bold text-blue-600">{row.qtd}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 font-bold text-gray-900">
              <tr>
                <td className="p-4 border-t border-gray-200">Total Geral</td>
                <td className="p-4 border-t border-gray-200 text-right">
                  {dadosReceitasProprias.reduce((acc, curr) => acc + parseInt(curr.jan.replace(/,/g, '')), 0).toLocaleString()} MZN
                </td>
                <td className="p-4 border-t border-gray-200 text-right">
                  {dadosReceitasProprias.reduce((acc, curr) => acc + parseInt(curr.fev.replace(/,/g, '')), 0).toLocaleString()} MZN
                </td>
                <td className="p-4 border-t border-gray-200 text-right">
                  {dadosReceitasProprias.reduce((acc, curr) => acc + parseInt(curr.mar.replace(/,/g, '')), 0).toLocaleString()} MZN
                </td>
                <td className="p-4 border-t border-gray-200 text-right text-green-700">
                  {dadosReceitasProprias.reduce((acc, curr) => acc + parseInt(curr.total.replace(/,/g, '')), 0).toLocaleString()} MZN
                </td>
                <td className="p-4 border-t border-gray-200 text-center text-blue-700">
                  {dadosReceitasProprias.reduce((acc, curr) => acc + curr.qtd, 0).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-10">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button 
          onClick={() => setViewState('colaboradores')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:bg-blue-50 hover:border-blue-200 transition-colors text-left cursor-pointer"
        >
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Colaboradores</p>
            <p className="text-2xl font-bold text-gray-900">{colaboradoresDirecao.reduce((acc, curr) => acc + curr.value, 0)}</p>
          </div>
        </button>
        <button 
          onClick={() => setViewState('estudantes')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:bg-green-50 hover:border-green-200 transition-colors text-left cursor-pointer"
        >
          <div className="p-4 bg-green-100 text-green-600 rounded-xl">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Estudantes</p>
            <p className="text-2xl font-bold text-gray-900">{estudantesCurso.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}</p>
          </div>
        </button>
        <button 
          onClick={() => setViewState('atividades')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:bg-purple-50 hover:border-purple-200 transition-colors text-left cursor-pointer"
        >
          <div className="p-4 bg-purple-100 text-purple-600 rounded-xl">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Atividades Executadas</p>
            <p className="text-2xl font-bold text-gray-900">{atividades.reduce((acc, curr) => acc + curr.executadas, 0)}</p>
          </div>
        </button>
        <button 
          onClick={() => setViewState('orcamento')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:bg-amber-50 hover:border-amber-200 transition-colors text-left cursor-pointer"
        >
          <div className="p-4 bg-amber-100 text-amber-600 rounded-xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Execução Orçamental</p>
            <p className="text-2xl font-bold text-gray-900">{(dadosExecucaoOrcamental.reduce((acc, curr) => acc + parseInt(curr.dotacao.replace(/,/g, '').replace(' MZN', '')), 0) / 1000000).toFixed(1)}M MZN</p>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colaboradores */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Colaboradores por Gênero e Nível</h3>
          <div className="flex flex-col sm:flex-row gap-4 h-64">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={colaboradoresGenero} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">
                    {colaboradoresGenero.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={colaboradoresNivel} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">
                    {colaboradoresNivel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Colaboradores por Direção */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Colaboradores por Direção de Afetação</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={colaboradoresDirecao} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={180} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Estudantes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Estudantes e Graduados por Curso</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={estudantesCurso} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Legend wrapperStyle={{ bottom: 0 }} />
                <Bar dataKey="total" name="Total de Estudantes" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="graduadosM" name="Graduados (M)" fill="#0088FE" stackId="a" />
                <Bar dataKey="graduadosF" name="Graduados (F)" fill="#00C49F" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Atividades */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Ponto de Situação das Atividades</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={atividades} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="executadas" name="Executadas" fill="#22c55e" stackId="a" />
                <Bar dataKey="naoExecutadas" name="Não Executadas" fill="#ef4444" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orçamento */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Execução Orçamental</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Teto Orçamental (Geral)</span>
                <span className="font-bold text-gray-900">
                  {Math.round(((dadosAtividadesPlanificadas.reduce((acc, curr) => acc + parseInt(curr.orcamento.replace(/,/g, '')), 0) + dadosAtividadesNaoPlanificadas.reduce((acc, curr) => acc + parseInt(curr.orcamento.replace(/,/g, '')), 0)) / 10000000) * 100)}% Utilizado
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${Math.round(((dadosAtividadesPlanificadas.reduce((acc, curr) => acc + parseInt(curr.orcamento.replace(/,/g, '')), 0) + dadosAtividadesNaoPlanificadas.reduce((acc, curr) => acc + parseInt(curr.orcamento.replace(/,/g, '')), 0)) / 10000000) * 100)}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">
                {((dadosAtividadesPlanificadas.reduce((acc, curr) => acc + parseInt(curr.orcamento.replace(/,/g, '')), 0) + dadosAtividadesNaoPlanificadas.reduce((acc, curr) => acc + parseInt(curr.orcamento.replace(/,/g, '')), 0)) / 1000000).toFixed(1)}M / 10.0M MZN
              </p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Receitas Próprias (Tempo Real)</span>
                <span className="font-bold text-green-600">
                  {Math.round((dadosReceitasProprias.reduce((acc, curr) => acc + parseInt(curr.total.replace(/,/g, '')), 0) / 2500000) * 100)}% da Meta
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: `${Math.round((dadosReceitasProprias.reduce((acc, curr) => acc + parseInt(curr.total.replace(/,/g, '')), 0) / 2500000) * 100)}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">
                {(dadosReceitasProprias.reduce((acc, curr) => acc + parseInt(curr.total.replace(/,/g, '')), 0) / 1000000).toFixed(1)}M / 2.5M MZN (Meta)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
