import React, { useState } from 'react';
import { ArrowLeft, LayoutGrid, FileText, Calendar, CheckSquare, BarChart3, Clock, Users, UserPlus, BookOpen, GraduationCap, Book, Building, FlaskConical, Wrench, User, Maximize2, LogOut } from 'lucide-react';
import RegistarFuncionarioForm from './RegistarFuncionarioForm';
import RegistarEfetivoEscolarForm from './RegistarEfetivoEscolarForm';
import GraduadosView from './GraduadosView';
import DisciplinasEspacosFisicosView from './DisciplinasEspacosFisicosView';
import RegistarEspacoFisicoForm from './RegistarEspacoFisicoForm';
import RegistarMateriaisBensForm from './RegistarMateriaisBensForm';
import VisaoGeralMateriais from './VisaoGeralMateriais';
import HorarioView from './HorarioView';
import DocumentosView from './DocumentosView';
import VisaoGeralLayout from './VisaoGeralLayout';
import MatrixView, { MatrixActivity } from './MatrixView';
import ActivityForm from './ActivityForm';
import IndividualPlanForm from './IndividualPlanForm';
import CalendarView from './CalendarView';
import ReportsView from './ReportsView';
import { Event, Nota } from '../types';

export default function CourseDashboard({ 
  title, 
  onBack, 
  onLogout, 
  onGestaoDocumentos,
  onShowAlert,
  events,
  setEvents,
  onAgendar,
  onNota,
  notes
}: { 
  title: string, 
  onBack: () => void, 
  onLogout: () => void, 
  onGestaoDocumentos?: () => void,
  onShowAlert: (msg: string) => void,
  events: Event[],
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>,
  onAgendar: () => void,
  onNota: () => void,
  notes: Nota[]
}) {
  const [activeItem, setActiveItem] = useState('Visão Geral');
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [activeSubMenuItem, setActiveSubMenuItem] = useState<string | null>(null);

  const menuItems = [
    { title: 'Visão Geral', icon: LayoutGrid },
    { title: 'Plano', icon: FileText },
    { title: 'Gestão Académica', icon: CheckSquare, subItems: [
      'Horário', 'Gestão de Pessoal - Docentes', 'Registar Funcionário', 'Estudantes', 'Graduados', 'Disciplina', 'Blocos e Sala de Aula', 'Laboratório', 'Oficinas'
    ]},
    { title: 'Documentos Normativos', icon: FileText },
    { title: 'Relatórios', icon: BarChart3 },
    { title: 'Calendário', icon: Calendar },
  ];

  const subMenuIcons: { [key: string]: any } = {
    'Horário': Clock,
    'Gestão de Pessoal - Docentes': Users,
    'Registar Funcionário': UserPlus,
    'Estudantes': Users,
    'Graduados': GraduationCap,
    'Disciplina': Book,
    'Blocos e Sala de Aula': Building,
    'Laboratório': FlaskConical,
    'Oficinas': Wrench,
  };

  const [selectedPlanType, setSelectedPlanType] = useState<string | null>(null);
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [individualActivities, setIndividualActivities] = useState<MatrixActivity[]>([]);
  const [sectorActivities, setSectorActivities] = useState<MatrixActivity[]>([]);
  const [directionActivities, setDirectionActivities] = useState<MatrixActivity[]>([]);
  const [institutionalActivities, setInstitutionalActivities] = useState<MatrixActivity[]>([]);

  const renderContent = () => {
    if (activeItem === 'Gestão Académica') {
      if (activeSubMenuItem === 'Horário') {
        return <HorarioView title={title} />;
      }
      if (activeSubMenuItem === 'Registar Funcionário') {
        return <RegistarFuncionarioForm onCancel={() => setActiveSubMenuItem(null)} />;
      }
      if (activeSubMenuItem === 'Estudantes') {
        return <RegistarEfetivoEscolarForm onCancel={() => setActiveSubMenuItem(null)} />;
      }
      if (activeSubMenuItem === 'Graduados') {
        return <GraduadosView />;
      }
      if (activeSubMenuItem === 'Disciplina') {
        return <DisciplinasEspacosFisicosView />;
      }
      if (activeSubMenuItem === 'Laboratório') {
        if (showMaterialForm) return <RegistarMateriaisBensForm onCancel={() => setShowMaterialForm(false)} local="Laboratório" />;
        return <VisaoGeralMateriais local="Laboratório" onRegistar={() => setShowMaterialForm(true)} />;
      }
      if (activeSubMenuItem === 'Oficinas') {
        if (showMaterialForm) return <RegistarMateriaisBensForm onCancel={() => setShowMaterialForm(false)} local="Oficinas" />;
        return <VisaoGeralMateriais local="Oficinas" onRegistar={() => setShowMaterialForm(true)} />;
      }
      if (activeSubMenuItem === 'Blocos e Sala de Aula') {
        return <RegistarEspacoFisicoForm onCancel={() => setActiveSubMenuItem(null)} courseName={title} />;
      }
    }
    
    if (activeItem === 'Visão Geral') {
      return <VisaoGeralLayout title={title} />;
    }
    
    if (activeItem === 'Plano' || activeItem === 'Plano de Atividade' || activeItem === 'Plano da Direção') {
      if (!selectedPlanType) {
        const planTypes = [
          'Plano Institucional',
          'Plano de Direção',
          'Plano Setorial',
          'Plano Individual'
        ];
        return (
          <div className="w-full max-w-4xl mx-auto py-12">
            <h3 className="text-2xl font-bold text-blue-900 mb-8 text-center uppercase tracking-widest leading-[1.5]">Selecione o Tipo de Plano</h3>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {planTypes.map(type => (
                <button 
                  key={type}
                  onClick={() => setSelectedPlanType(type)}
                  className="bg-white border-2 border-gray-100 p-10 rounded-3xl shadow-sm hover:border-blue-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-6 group"
                >
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText size={32} />
                  </div>
                  <span className="text-lg font-bold text-gray-900 leading-[1.5]">{type}</span>
                </button>
              ))}
            </div>
            
            <div className="flex flex-col items-center border-t border-gray-100 pt-10">
              <p className="text-gray-500 mb-6 font-medium">Ou registe uma atividade diretamente:</p>
              <button 
                onClick={() => setSelectedPlanType('NOVA_ATIVIDADE')}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
              >
                <FileText size={24} /> REGISTAR NOVA ATIVIDADE
              </button>
            </div>
          </div>
        );
      }

      if (selectedPlanType === 'NOVA_ATIVIDADE') {
        return (
          <div className="absolute inset-0 bg-white z-50 flex flex-col">
            <ActivityForm 
              planType="Plano de Atividade"
              onClose={() => setSelectedPlanType(null)}
              onSubmit={(data) => {
                const totalValue = data.rubricas?.reduce((acc: number, r: any) => acc + (r.valorTotal || r.total || 0), 0) || 0;
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
                };

                setSectorActivities([activity, ...sectorActivities]);
                onShowAlert('Atividade registada e alocada ao Plano Setorial!');
                setSelectedPlanType('Plano Setorial');
              }}
            />
          </div>
        );
      }

      if (selectedPlanType === 'Plano Individual') {
        return (
          <div className="absolute inset-0 bg-white z-50 flex flex-col">
            <IndividualPlanForm 
              onClose={() => setSelectedPlanType(null)}
              onSubmit={(data) => {
                const activity: MatrixActivity = {
                  id: Math.random().toString(36).substr(2, 9),
                  unidadeOrganica: data.unidadeOrganica || '',
                  direcao: data.direcao || '',
                  departamento: data.departamento || '',
                  orcamento: 'Plano Individual',
                  nivel: 'Média',
                  no: '1',
                  title: data.nomeAtividade || 'Nova Meta',
                  localRealizacao: 'Instituição',
                  dataMes: data.dataInicial || '',
                  data: `${data.dataInicial} a ${data.dataFinal}`,
                  frequencia: 'Pontual',
                  rubrica: 'Plano Individual',
                  necessidade: data.objetivo || '',
                  valor: 0,
                  status: 'draft',
                  responsavel: data.nomeColaborador || '',
                  prazo: data.dataFinal || ''
                };

                setSectorActivities([activity, ...sectorActivities]);
                onShowAlert('Plano Individual submetido e alocado ao Plano Setorial!');
                setSelectedPlanType('Plano Setorial');
              }}
            />
          </div>
        );
      }

      let currentActivities = sectorActivities;
      let setCurrentActivities = setSectorActivities;
      let onFinalSubmit = (acts: MatrixActivity[]) => {
        setDirectionActivities([...acts, ...directionActivities]);
        setSectorActivities([]);
        onShowAlert('Plano Setorial submetido à Direção com sucesso!');
        setSelectedPlanType('Plano de Direção');
      };

      if (selectedPlanType === 'Plano de Direção') {
        currentActivities = directionActivities;
        setCurrentActivities = setDirectionActivities;
        onFinalSubmit = (acts: MatrixActivity[]) => {
          setInstitutionalActivities([...acts, ...institutionalActivities]);
          setDirectionActivities([]);
          onShowAlert('Plano de Direção submetido ao Plano Institucional com sucesso!');
          setSelectedPlanType('Plano Institucional');
        };
      } else if (selectedPlanType === 'Plano Institucional') {
        currentActivities = institutionalActivities;
        setCurrentActivities = setInstitutionalActivities;
        onFinalSubmit = (acts: MatrixActivity[]) => {
          onShowAlert('Plano Institucional consolidado e enviado para a Repartição de Planificação!');
          setSelectedPlanType(null);
          setActiveItem('Visão Geral');
        };
      }

      return (
        <div className="w-full">
          <button 
            onClick={() => setSelectedPlanType(null)}
            className="mb-6 text-blue-600 font-bold text-sm hover:underline flex items-center gap-2"
          >
            ← VOLTAR À SELECÇÃO DE PLANO
          </button>
          <MatrixView 
            title={selectedPlanType} 
            isDepartment={true} 
            externalActivities={currentActivities}
            setExternalActivities={setCurrentActivities}
            onFinalSubmit={onFinalSubmit}
          />
        </div>
      );
    }
    
    if (activeItem === 'Meu Plano Individual') {
      return <MatrixView title="Meu Plano Individual" isDepartment={true} externalActivities={individualActivities} setExternalActivities={setIndividualActivities} />;
    }
    
    if (activeItem === 'Documentos Normativos') {
      return <DocumentosView title={title} />;
    }

    if (activeItem === 'Relatórios') {
      return <ReportsView onShowAlert={onShowAlert} initialDirection={title} />;
    }

    if (activeItem === 'Calendário') {
      return <CalendarView events={events} setEvents={setEvents} onAgendar={onAgendar} onNota={onNota} title={title} notes={notes} />;
    }
    
    return null;
  };

  return (
    <div className="h-screen w-full bg-[#f8f9fa] flex flex-col overflow-hidden">
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-none">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#6366f1] rounded-xl text-white shadow-sm">
              <GraduationCap size={20} />
            </div>
            <h1 className="text-xl font-bold text-[#2563eb] font-serif">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <User size={14} className="text-gray-500" />
            <span className="text-xs font-bold text-gray-700">fttripas@gmail.com</span>
          </div>
          <button className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 transition-all">
            <Maximize2 size={18} />
          </button>
          <button 
            onClick={onLogout}
            className="p-2 bg-red-50 rounded-lg text-red-500 hover:bg-red-100 transition-all"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 p-2 md:p-4 flex-none bg-white flex md:flex-col overflow-x-auto md:overflow-y-auto gap-2">
          {menuItems.map((item) => (
            <div key={item.title} className="flex-none md:w-full">
              <button
                onClick={() => {
                  setActiveItem(item.title);
                  setActiveSubMenu(item.subItems ? (activeSubMenu === item.title ? null : item.title) : null);
                  setActiveSubMenuItem(null);
                  setSelectedPlanType(null);
                  setShowMaterialForm(false);
                }}
                className={`w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg text-xs md:text-sm font-bold transition-colors whitespace-nowrap ${activeItem === item.title ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-900'}`}
              >
                <div className="w-4 md:w-5 flex justify-center">
                  <item.icon size={18} className={activeItem === item.title ? 'text-blue-900' : 'text-gray-500'} />
                </div>
                {item.title}
              </button>
              {item.subItems && activeSubMenu === item.title && (
                <div className="ml-4 mt-2 space-y-1 hidden md:block">
                  {item.subItems.map(subItem => {
                    const Icon = subMenuIcons[subItem] || CheckSquare;
                    return (
                      <button 
                        key={subItem} 
                        onClick={() => {
                          setActiveSubMenuItem(subItem);
                          setShowMaterialForm(false);
                        }}
                        className={`w-full flex items-center gap-2 p-2 rounded text-xs transition-colors ${activeSubMenuItem === subItem ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-900'}`}
                      >
                        <div className="w-4 flex justify-center">
                          <Icon size={14} />
                        </div>
                        {subItem}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </aside>

        <main className="flex-grow p-4 md:p-6 overflow-auto flex flex-col items-center justify-start w-full">
          <div className="w-full max-w-5xl">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">{activeSubMenuItem || `Visão Geral - ${title}`}</h2>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
