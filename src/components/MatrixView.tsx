import React, { useState } from 'react';
import { Plus, Trash2, Save, FileText, Building2, Calendar as CalendarIcon, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import ActivityForm from './ActivityForm';
import MatrixForm from './MatrixForm';

export interface MatrixActivity {
  id: string;
  unidadeOrganica: string;
  direcao: string;
  departamento: string;
  reparticao?: string;
  orcamento?: string;
  nivel: string;
  no: string;
  title: string;
  localRealizacao?: string;
  dataMes: string;
  data?: string;
  frequencia: string;
  rubrica: string;
  necessidade: string;
  valor: number;
  status: 'draft' | 'submitted';
  responsavel?: string;
  prazo?: string;
  referencia?: string;
  executada?: boolean;
  motivoNaoExecucao?: string;
}

const DIRECTIONS = [
  'DPEP - Departamento de Planificação, Estudos e Projetos',
  'UGEA - Unidade Gestora e Executora de Aquisições',
  'DCRE - Departamento de Cooperação e Relações Exteriores',
  'DCTQ - Departamento de Controlo Técnico e de Qualidade',
  'DJ - Departamento Jurídico',
  'Divisão de Engenharia',
  'Centro de Incubação de Empresas',
  'DICOSAFA',
  'DICOSSER'
];

export default function MatrixView({ 
  title, 
  isDepartment,
  externalActivities,
  setExternalActivities,
  onFinalSubmit,
  onActivityAdded
}: { 
  title: string, 
  isDepartment: boolean,
  externalActivities?: MatrixActivity[],
  setExternalActivities?: React.Dispatch<React.SetStateAction<MatrixActivity[]>>,
  onFinalSubmit?: (activities: MatrixActivity[]) => void,
  onActivityAdded?: (activity: MatrixActivity) => void
}) {
  const nextYear = new Date().getFullYear() + 1;
  const viewTitle = title === 'Matriz' ? `Matriz de Atividades - Ano ${nextYear} (Ano +1)` : (title.startsWith('Plano') || title.startsWith('Matriz') ? title : (isDepartment ? `Plano de Atividades - para ${nextYear}` : `Matriz de Atividades - Ano ${nextYear} (Ano +1)`));

  const [localActivities, setLocalActivities] = useState<MatrixActivity[]>([]);
  const activities = externalActivities || localActivities;
  const setActivities = setExternalActivities || setLocalActivities;
  
  const [showForm, setShowForm] = useState(false);

  const handleAddActivity = (data: any) => {
    // Calculate total value from rubrics
    const totalValue = data.rubricas?.reduce((acc: number, r: any) => acc + (r.valorTotal || r.total || 0), 0) || 0;
    
    // Get main rubric and necessity (from the first one)
    const mainRubric = data.rubricas?.[0]?.rubrica || '';
    const mainNecessity = data.rubricas?.[0]?.necessidade || '';

    const activity: MatrixActivity = {
      id: Math.random().toString(36).substr(2, 9),
      unidadeOrganica: data.unidadeSelecionada || '',
      direcao: data.selectedCategory || '',
      departamento: data.departamento || '',
      orcamento: data.fonteReceita || '',
      nivel: data.prioridade || 'Média',
      no: data.nAtividade || '1',
      title: data.nomeAtividade || 'Nova Atividade',
      localRealizacao: data.trabalhoProvincia && data.trabalhoDistrito ? `${data.trabalhoProvincia} - ${data.trabalhoDistrito}` : (data.realizacaoProvincia && data.realizacaoDistrito ? `${data.realizacaoProvincia} - ${data.realizacaoDistrito}` : ''),
      dataMes: data.mesRealizacao || data.dataInicio || '',
      data: data.dataInicio && data.dataFim ? `${data.dataInicio} a ${data.dataFim}` : (data.dataInicio || data.dataFim || ''),
      frequencia: data.frequencia || 'Mensal',
      rubrica: mainRubric,
      necessidade: mainNecessity,
      valor: totalValue,
      status: 'draft',
      responsavel: data.responsavel || '',
      prazo: data.dataFim || data.mesRealizacao || data.dataInicio || '',
      referencia: `ACT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`
    };

    setActivities([activity, ...activities]);
    onActivityAdded?.(activity);
    setShowForm(false);
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  return (
    <div className="w-full max-w-[90%] mx-auto space-y-4 md:space-y-8 pb-20 px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-blue-900">{viewTitle}</h2>
          <p className="text-sm md:text-base text-gray-500">
            {isDepartment 
              ? 'Elabore o plano setorial do seu departamento com base nas diretrizes estratégicas.' 
              : 'Defina as diretrizes estratégicas para os planos setoriais das direções.'}
          </p>
        </div>
        {(title.includes('Plano') || title.includes('Matriz')) && 
         title !== 'Minha Matriz' && 
         title !== 'Plano Setorial' && 
         title !== 'Plano Institucional' && (
          <button 
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 whitespace-nowrap"
          >
            <Plus size={20} /> NOVA ATIVIDADE
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="absolute inset-0 bg-white z-50 flex flex-col">
            {title === 'Matriz' ? (
              <MatrixForm 
                onClose={() => setShowForm(false)}
                onSubmit={(data) => {
                  const activity: MatrixActivity = {
                    id: Math.random().toString(36).substr(2, 9),
                    unidadeOrganica: data.unidadeOrganica || '',
                    direcao: data.direcao || '',
                    departamento: data.departamento || '',
                    orcamento: data.fonteReceita || '',
                    nivel: data.prioridade || 'Média',
                    no: data.nAtividade || '1',
                    title: data.nomeAtividade || 'Nova Atividade',
                    localRealizacao: 'Instituição',
                    dataMes: data.mesRealizacao || '',
                    data: data.mesRealizacao || '',
                    frequencia: 'Mensal',
                    rubrica: data.rubrica || '',
                    necessidade: data.necessidade || '',
                    valor: Number(data.valorEstimado) || 0,
                    status: 'draft',
                    responsavel: data.responsavel || '',
                    prazo: data.mesRealizacao || '',
                    referencia: `ACT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`
                  };
                  setActivities([activity, ...activities]);
                  onActivityAdded?.(activity);
                  setShowForm(false);
                }}
              />
            ) : (
              <ActivityForm 
                planType={title || (isDepartment ? 'Plano' : 'Matriz')}
                onClose={() => setShowForm(false)}
                onSubmit={handleAddActivity}
              />
            )}
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {activities.length > 0 ? (
          title === 'Matriz' ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-900 text-white text-[10px] uppercase tracking-wider">
                    <th className="p-4 font-black border-r border-blue-800">Nº</th>
                    <th className="p-4 font-black border-r border-blue-800">Referência</th>
                    <th className="p-4 font-black border-r border-blue-800">Direção</th>
                    <th className="p-4 font-black border-r border-blue-800">Atividade/Tarefa</th>
                    <th className="p-4 font-black border-r border-blue-800">Responsável</th>
                    <th className="p-4 font-black border-r border-blue-800">Recursos Necessários</th>
                    <th className="p-4 font-black border-r border-blue-800">Prazo</th>
                    <th className="p-4 font-black border-r border-blue-800">Status</th>
                    <th className="p-4 font-black text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {activities.map(activity => (
                    <tr key={activity.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 border-r text-center font-bold text-blue-600">{activity.no}</td>
                      <td className="p-4 border-r font-mono text-xs text-gray-500">{activity.referencia || '-'}</td>
                      <td className="p-4 border-r font-bold text-blue-900">{activity.direcao || '-'}</td>
                      <td className="p-4 border-r font-bold text-gray-900">{activity.title}</td>
                      <td className="p-4 border-r text-gray-600">{activity.responsavel || '-'}</td>
                      <td className="p-4 border-r text-gray-500">
                        {activity.necessidade || activity.rubrica || '-'}
                        {activity.valor > 0 && <span className="block text-blue-600 font-bold mt-1">{activity.valor.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</span>}
                      </td>
                      <td className="p-4 border-r text-gray-600">{activity.prazo || activity.dataMes || '-'}</td>
                      <td className="p-4 border-r">
                        <span className="flex items-center gap-1.5 text-amber-600 font-bold text-[10px] uppercase">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                          {activity.status === 'draft' ? 'Aguardando Plano Setorial' : 'Submetido'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => removeActivity(activity.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Remover"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (title === 'Plano Institucional' || title === 'Plano Setorial' || title === 'Matriz das Direções centrais') ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-900 text-white text-[10px] uppercase tracking-wider">
                    <th className="p-4 font-black border-r border-blue-800">Unidade Orgânica</th>
                    <th className="p-4 font-black border-r border-blue-800">Referência</th>
                    <th className="p-4 font-black border-r border-blue-800">Departamento</th>
                    <th className="p-4 font-black border-r border-blue-800">Repartição</th>
                    <th className="p-4 font-black border-r border-blue-800">Orçamento</th>
                    <th className="p-4 font-black border-r border-blue-800">Nível de Prioridade</th>
                    <th className="p-4 font-black border-r border-blue-800">Nome da Atividade</th>
                    <th className="p-4 font-black border-r border-blue-800">Local de Realização</th>
                    <th className="p-4 font-black border-r border-blue-800">Mês</th>
                    <th className="p-4 font-black border-r border-blue-800">Data</th>
                    <th className="p-4 font-black border-r border-blue-800">Rubrica</th>
                    <th className="p-4 font-black border-r border-blue-800">Necessidade</th>
                    <th className="p-4 font-black border-r border-blue-800">Valor</th>
                    <th className="p-4 font-black text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {activities.map(activity => (
                    <tr key={activity.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 border-r font-medium text-gray-700">{activity.unidadeOrganica}</td>
                      <td className="p-4 border-r font-mono text-xs text-gray-500">{activity.referencia || '-'}</td>
                      <td className="p-4 border-r text-gray-600">{activity.departamento}</td>
                      <td className="p-4 border-r text-gray-600">{activity.reparticao || '-'}</td>
                      <td className="p-4 border-r text-gray-600">{activity.orcamento || '-'}</td>
                      <td className="p-4 border-r">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          activity.nivel === 'Urgente' ? 'bg-red-100 text-red-700' :
                          activity.nivel === 'Alta' ? 'bg-orange-100 text-orange-700' :
                          activity.nivel === 'Média' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {activity.nivel}
                        </span>
                      </td>
                      <td className="p-4 border-r font-bold text-gray-900">{activity.title}</td>
                      <td className="p-4 border-r text-gray-600">{activity.localRealizacao || '-'}</td>
                      <td className="p-4 border-r text-gray-600">{activity.dataMes}</td>
                      <td className="p-4 border-r text-gray-600">{activity.data || activity.prazo || '-'}</td>
                      <td className="p-4 border-r text-gray-600">{activity.rubrica}</td>
                      <td className="p-4 border-r text-gray-500 italic">{activity.necessidade}</td>
                      <td className="p-4 border-r font-black text-blue-900">
                        {activity.valor.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => removeActivity(activity.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Remover"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            activities.map(activity => (
              <motion.div 
                layout
                key={activity.id}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                      {activity.no}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900">{activity.title}</h4>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={14} className="text-blue-500" />
                      <span className="font-medium">{activity.unidadeOrganica} - {activity.departamento}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon size={14} className="text-blue-500" />
                      <span>{activity.dataMes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">{activity.frequencia}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase font-bold">{activity.rubrica}</span>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase font-bold">{activity.valor.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-none">
                  <button 
                    onClick={() => removeActivity(activity.id)}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Remover da Matriz"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="h-10 w-px bg-gray-100 mx-2 hidden md:block"></div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</span>
                    <span className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                      AGUARDANDO PLANO SETORIAL
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Target size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">
              {isDepartment 
                ? `Nenhuma atividade definida para o plano de ${nextYear}.` 
                : `Nenhuma diretriz estratégica definida para ${nextYear}.`}
            </p>
            <p className="text-gray-400 text-sm">
              {isDepartment 
                ? 'Comece adicionando as atividades do seu departamento.' 
                : 'Comece adicionando atividades para orientar as direções.'}
            </p>
          </div>
        )}
      </div>

      {activities.length > 0 && (
        <div className="bg-blue-900 p-8 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-2xl">
              <FileText size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold">
                {title === 'Plano Setorial' 
                  ? 'Submeter Plano Setorial' 
                  : title === 'Plano do Departamento'
                    ? 'Submeter Plano do Departamento'
                    : (title === 'Plano da Direção' || title === 'Plano de Direção')
                      ? 'Submeter Plano da Direção'
                      : title === 'Plano Institucional'
                        ? 'Consolidar Plano Institucional'
                        : isDepartment ? 'Submeter Plano' : 'Consolidar Matriz Estratégica'}
              </h3>
              <p className="text-blue-200 text-sm">
                {title === 'Plano Setorial'
                  ? 'Ao submeter, o plano será enviado para validação do Departamento.'
                  : title === 'Plano do Departamento'
                    ? 'Ao submeter, o plano será enviado para validação da Direção.'
                  : (title === 'Plano da Direção' || title === 'Plano de Direção')
                    ? 'Ao submeter, o plano será enviado para a Repartição de Planificação.'
                    : title === 'Plano Institucional'
                      ? 'Ao consolidar, o plano institucional será finalizado.'
                      : isDepartment 
                        ? 'Ao submeter, o plano será enviado para validação.' 
                        : 'Ao consolidar, a matriz será alocada em "Minha Matriz" para posterior partilha.'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              // Sort activities by 'no' (numeric)
              const sortedActivities = [...activities].sort((a, b) => {
                const numA = parseInt(a.no) || 0;
                const numB = parseInt(b.no) || 0;
                return numA - numB;
              });
              setActivities(sortedActivities);

              if (onFinalSubmit) {
                onFinalSubmit(sortedActivities);
              } else {
                let message = '';
                if (title === 'Plano Setorial') {
                  message = 'Plano Setorial submetido ao Departamento com sucesso!';
                } else if (title === 'Plano do Departamento') {
                  message = 'Plano do Departamento submetido à Direção com sucesso!';
                } else if (title === 'Plano da Direção' || title === 'Plano de Direção') {
                  message = 'Plano da Direção submetido ao Plano Institucional com sucesso!';
                } else if (title === 'Plano Institucional') {
                  message = 'Plano Institucional consolidado com sucesso!';
                } else if (title === 'Plano Individual' || title === 'Meu Plano Individual') {
                  message = 'Atividades guardadas no seu Plano Individual!';
                } else {
                  message = isDepartment 
                    ? 'Plano submetido com sucesso!' 
                    : 'Matriz consolidada com sucesso!';
                }
                alert(message);
              }
            }}
            className="bg-white text-blue-900 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all whitespace-nowrap"
          >
            {title === 'Plano Setorial' 
              ? 'SUBMETER AO DEPARTAMENTO'
              : title === 'Plano do Departamento'
                ? 'SUBMETER À DIREÇÃO'
                : (title === 'Plano da Direção' || title === 'Plano de Direção')
                  ? 'SUBMETER AO PLANO INSTITUCIONAL'
                  : title === 'Plano Institucional' 
                    ? 'CONSOLIDAR PLANO INSTITUCIONAL' 
                    : title === 'Plano Individual' || title === 'Meu Plano Individual'
                      ? 'GUARDAR NO MEU PLANO INDIVIDUAL'
                      : (isDepartment ? `SUBMETER PLANO` : `PUBLICAR MATRIZ ${nextYear}`)}
          </button>
        </div>
      )}
    </div>
  );
}
