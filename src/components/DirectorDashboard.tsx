import React, { useState } from 'react';
import { ArrowLeft, Maximize2, LogOut, User, LayoutGrid, FileText, Calendar, CheckSquare, BarChart3, Archive, FolderOpen, Users, Plus, GraduationCap, Briefcase, Microscope, DollarSign, Building2, TrendingUp, BarChart2 } from 'lucide-react';
import DirectorGeneralOverview from './DirectorGeneralOverview';
import BoardOverview from './BoardOverview';
import CalendarView from './CalendarView';
import AssignActivityView from './AssignActivityView';
import MatrixView, { MatrixActivity } from './MatrixView';
import MyMatrixView from './MyMatrixView';
import ReportsView from './ReportsView';
import ActivityForm from './ActivityForm';
import IndividualPlanForm from './IndividualPlanForm';
import ExpedienteManagement from './ExpedienteManagement';
import GestaoDocumentosView from './GestaoDocumentosView';
import EstatisticaView from './EstatisticaView';
import DocumentosView from './DocumentosView';
import LibraryManagementView from './LibraryManagementView';
import GestaoPessoalView from './GestaoPessoalView';
import MatrixForm from './MatrixForm';
import { Event, Expediente, LibraryRegistration, BookRegistration, Nota, FinancialData } from '../types';
import RecursosFinanceirosForm from './RecursosFinanceirosForm';
import DRADashboard from './DRADashboard';
import GestaoFormacaoView from './GestaoFormacaoView';
import { BookOpen } from 'lucide-react';

export default function DirectorDashboard({ 
  title, 
  onBack, 
  onShowAlert, 
  events, 
  setEvents,
  expedientes,
  setExpedientes,
  libraryRegistrations,
  setLibraryRegistrations,
  bookRegistrations,
  setBookRegistrations,
  financialData,
  setFinancialData,
  notes,
  setNotes,
  onLogout,
  onAgendar,
  onNota,
  onGestaoDocumentos,
  activities,
  setActivities
}: { 
  title: string, 
  onBack: () => void, 
  onShowAlert: (msg: string) => void,
  events: Event[],
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>,
  expedientes: Expediente[],
  setExpedientes: React.Dispatch<React.SetStateAction<Expediente[]>>,
  libraryRegistrations?: LibraryRegistration[],
  setLibraryRegistrations?: React.Dispatch<React.SetStateAction<LibraryRegistration[]>>,
  bookRegistrations?: BookRegistration[],
  setBookRegistrations?: React.Dispatch<React.SetStateAction<BookRegistration[]>>,
  financialData?: FinancialData[],
  setFinancialData?: React.Dispatch<React.SetStateAction<FinancialData[]>>,
  notes: Nota[],
  setNotes: React.Dispatch<React.SetStateAction<Nota[]>>,
  onLogout: () => void,
  onAgendar: () => void,
  onNota: () => void,
  onGestaoDocumentos?: () => void,
  activities?: MatrixActivity[],
  setActivities?: React.Dispatch<React.SetStateAction<MatrixActivity[]>>
}) {
  const isEstatisticaMain = title.toUpperCase() === 'REPARTIÇÃO DE ESTATÍSTICA';
  const [activeItem, setActiveItem] = useState(isEstatisticaMain ? 'Corpo discente' : 'Visão Geral');

  const isDepartment = title.toUpperCase().includes('DEPARTAMENTO') || 
                       title.toUpperCase().includes('DIVISÃO') || 
                       title.toUpperCase().includes('UNIDADE') || 
                       title.toUpperCase().includes('SECRETARIA') || 
                       title.toUpperCase().includes('CENTRO') ||
                       title.toUpperCase().includes('REPARTIÇÃO') ||
                       title.toUpperCase().includes('SETOR') ||
                       title.toUpperCase().includes('GDG');

  const nextYear = new Date().getFullYear() + 1;
  const planLabel = isDepartment ? 'Plano de Atividade' : 'Matriz';

  const hasExpediente = ['SECRETARIA EXECUTIVA', 'SECRETARIA GERAL'].includes(title.toUpperCase());

  const estatisticaSectors = [
    'Repartição de Pessoal',
    'Chefe de Finanças',
    'Chefe das Finanças',
    'Registo Académico',
    'Biblioteca',
    'Bilioteca',
    'Diretor da DICOSSER',
    'Diretor da DICOCOSSER',
    'Diretor da DICOSAFA',
    'Diretor do CIE',
    'Diretor da Divisão de Engenharia',
    'Repartição de Infraestrutura',
    'Repartição de Infraestruturas'
  ];
  const hasEstatistica = estatisticaSectors.some(s => title.toUpperCase().includes(s.toUpperCase()));

  const isExcludedFromNewMenu = title.toUpperCase().includes('ESTATÍSTICA') || 
                                title.toUpperCase().includes('RELATÓRIO') || 
                                title.toUpperCase().includes('PLANO DE ATIVIDADE') ;

  const isDG = title.toUpperCase() === 'DIRETOR-GERAL';
  const isDC = title.toUpperCase().includes('DIRETOR CENTRAL') || 
               title.toUpperCase().includes('DIRETORES CENTRAIS') ||
               title.toUpperCase().includes('DIRETOR DA DICOSAFA') ||
               title.toUpperCase().includes('DIRETOR DA DICOSSER') ||
               title.toUpperCase().includes('DIRETOR DA DICOCOSSER') ||
               title.toUpperCase().includes('DIRETOR DO CIE');
  const isDCC = title.toUpperCase().includes('DIRETOR DO CURSO') || title.toUpperCase().includes('DIRETOR DOS CURSOS');
  const isCD = title.toUpperCase().includes('CHEFE DO DEPARTAMENTO') || title.toUpperCase().includes('CHEFES DOS DEPARTAMENTOS');
  const isCR = title.toUpperCase().includes('CHEFE DA REPARTIÇÃO') || title.toUpperCase().includes('CHEFES DAS REPARTIÇÕES');
  const isConsRep = title.toUpperCase().includes('CONSELHO DE REPRESENTANTES');
  const isConsAdm = title.toUpperCase().includes('CONSELHO ADMINISTRATIVO E DE GESTÃO');
  const isConsTec = title.toUpperCase().includes('CONSELHO TÉCNICO E DE QUALIDADE');
  const isDICOSAFA_Dept = title.toUpperCase().includes('DEPARTAMENTO DE RECURSOS HUMANOS') ||
                          title.toUpperCase().includes('DEPARTAMENTO DE FINANÇAS') ||
                          title.toUpperCase().includes('DEPARTAMENTO DE PATRIMÓNIO') ||
                          title.toUpperCase().includes('SECRETARIA GERAL') ||
                          title.toUpperCase().includes('DEPARTAMENTO TIC') ||
                          title.toUpperCase().includes('DEPARTAMENTO LAR DE ESTUDANTES') ||
                          title.toUpperCase().includes('CHEFE DO RH') ||
                          title.toUpperCase().includes('CHEFE DE FINANÇAS') ||
                          title.toUpperCase().includes('CHEFE DE DP') ||
                          title.toUpperCase().includes('CHEFE DA SG') ||
                          title.toUpperCase().includes('CHEFE DE DTIC') ||
                          title.toUpperCase().includes('CHEFE DE DLA');
  const isGDG = title.toUpperCase().includes('CHEFE DO GDG');
  const isGestDoc = title.toUpperCase() === 'GESTÃO DE DOCUMENTOS' || (['SECRETARIA EXECUTIVA'].includes(title.toUpperCase()) && !isDICOSAFA_Dept);
  const isSetor = !isDG && !isDC && !isDCC && !isCD && !isCR && !isConsRep && !isConsAdm && !isConsTec && !isGestDoc && !isEstatisticaMain && !isGDG;

  const getMenuItems = () => {
    const baseItems = [
      { title: 'Visão Geral', icon: LayoutGrid },
    ];

    if (isEstatisticaMain) {
      return [
        { title: 'Corpo discente', icon: GraduationCap },
        { title: 'Corpo docente', icon: Users },
        { title: 'Corpo técnico administrativo', icon: Briefcase },
        { title: 'Investigadores', icon: Microscope },
        { title: 'Recursos financeiro', icon: DollarSign },
        { title: 'Infraestruturas', icon: Building2 },
        { title: 'Previsão n+1', icon: TrendingUp },
        { title: 'Calendário', icon: Calendar },
        { title: 'Relatórios', icon: FileText },
      ];
    }

    let items = [...baseItems];

    if (isDG) {
      items.push(
        { title: 'Matriz', icon: FileText },
        { title: 'Plano', icon: FileText },
        { title: 'Calendário', icon: Calendar },
        { title: 'Atribuição de Nova Atividade', icon: CheckSquare },
        { title: 'Documentos Normativos', icon: FileText },
        { title: 'Gestão de Expediente', icon: FolderOpen },
        { title: 'Relatórios', icon: BarChart3 }
      );
    } else if (isDC) {
      items.push(
        { title: 'Plano', icon: FileText },
        { title: 'Calendário', icon: Calendar },
        { title: 'Atribuição de Nova Atividade', icon: CheckSquare },
        { title: 'Documentos Normativos', icon: FileText },
        { title: 'Gestão de Expediente', icon: FolderOpen },
        { title: 'Relatórios', icon: BarChart3 }
      );
    } else if (isDCC || title.toUpperCase().includes('DRA')) {
      items.push(
        { title: 'Plano', icon: FileText },
        { title: 'Gestão Académica', icon: Users },
        { title: 'Documentos Normativos', icon: FileText },
        { title: 'Calendário', icon: Calendar }
      );
      if (!items.some(i => i.title === 'Estatística')) {
        items.push({ title: 'Estatística', icon: BarChart3 });
      }
      if (!items.some(i => i.title === 'Relatórios')) {
        items.push({ title: 'Relatórios', icon: BarChart2 });
      }
    } else if (isCD || isCR || isDICOSAFA_Dept || isSetor || isGDG) {
      if (!isExcludedFromNewMenu) {
        items.push(
          { title: 'Plano', icon: FileText },
          { title: 'Calendário', icon: Calendar },
          { title: 'Atribuição de Nova Atividade', icon: CheckSquare },
          { title: 'Relatórios', icon: BarChart3 },
          { title: 'Documentos Normativos', icon: FileText },
          { title: 'Gestão de Expediente', icon: FolderOpen }
        );
      } else {
        items.push(
          { title: 'Plano de Atividade', icon: FileText },
          { title: 'Meu Plano Individual', icon: User },
          { title: 'Calendário', icon: Calendar },
          { title: 'Atribuição de Nova Atividade', icon: CheckSquare },
          { title: 'Relatórios', icon: BarChart3 },
          { title: 'Documentos Normativos', icon: FileText },
          { title: 'Gestão de Expediente', icon: FolderOpen }
        );
      }
    } else if (isConsRep || isConsAdm || isConsTec) {
      items.push(
        { title: 'Calendário', icon: Calendar },
        { title: 'Relatórios', icon: BarChart3 },
        { title: 'Documentos Normativos', icon: FileText },
        { title: 'Gestão de Expediente', icon: FolderOpen }
      );
    } else if (isGestDoc) {
      items.push(
        { title: 'Gestão de Expediente', icon: FolderOpen },
        { title: 'Documentos Normativos', icon: FileText },
        { title: 'Relatórios', icon: BarChart3 },
        { title: 'Calendário', icon: Calendar }
      );
    } else {
      // Fallback for any other title
      items.push(
        { title: 'Plano', icon: FileText },
        { title: 'Calendário', icon: Calendar },
        { title: 'Documentos Normativos', icon: FileText }
      );
    }

    // Add Estatística if applicable and not already present
    if (hasEstatistica && !items.some(i => i.title === 'Estatística')) {
      // Insert after Plano or Calendário if they exist, otherwise at the end
      const insertIndex = items.findIndex(i => i.title === 'Calendário' || i.title === 'Plano' || i.title === 'Plano de Atividade');
      if (insertIndex !== -1) {
        items.splice(insertIndex + 1, 0, { title: 'Estatística', icon: BarChart3 });
      } else {
        items.push({ title: 'Estatística', icon: BarChart3 });
      }
    }

    // Special case for Gestão de Pessoal
    if (title.toUpperCase().includes('PESSOAL') && !items.some(i => i.title === 'Gestão de Pessoal')) {
      items.push({ title: 'Gestão de Pessoal', icon: Users });
    }

    // Special case for Gestão de Formação
    if (title.toUpperCase().includes('FORMAÇÃO') && !items.some(i => i.title === 'Gestão de Formação')) {
      items.push({ title: 'Gestão de Formação', icon: GraduationCap });
    }

    return items;
  };

  const menuItems = getMenuItems();

  const boards = [
    'CONSELHO DE REPRESENTANTES',
    'CONSELHO ADMINISTRATIVO E DE GESTÃO',
    'CONSELHO TÉCNICO E DE QUALIDADE'
  ];

  const [selectedPlanType, setSelectedPlanType] = useState<string | null>(null);
  const [showMatrixForm, setShowMatrixForm] = useState(false);
  const [individualActivities, setIndividualActivities] = useState<MatrixActivity[]>([]);
  const [sectorActivities, setSectorActivities] = useState<MatrixActivity[]>([]);
  const [departmentActivities, setDepartmentActivities] = useState<MatrixActivity[]>([]);
  const [directionActivities, setDirectionActivities] = useState<MatrixActivity[]>([]);
  const [institutionalActivities, setInstitutionalActivities] = useState<MatrixActivity[]>([]);
  const [publishedMatrices, setPublishedMatrices] = useState<any[]>([
    {
      id: 'MAT-2027-001',
      year: 2027,
      publishedAt: '2026-04-02 11:15',
      activityCount: 8,
      status: 'published'
    },
    {
      id: 'MAT-2026-005',
      year: 2026,
      publishedAt: '2025-03-15 09:30',
      activityCount: 12,
      status: 'shared'
    }
  ]);

  const renderContent = () => {
    if (isEstatisticaMain) {
      return (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
          <EstatisticaView 
            onBack={() => onBack()} 
            isReadOnly={false} 
            title={title}
            hideSidebar={false}
            initialActiveItem={activeItem}
          />
        </div>
      );
    }

    if (activeItem === 'Gestão de Pessoal') {
      return <GestaoPessoalView onBack={() => setActiveItem('Visão Geral')} />;
    }

    if (activeItem === 'Gestão de Formação') {
      return <GestaoFormacaoView onBack={() => setActiveItem('Visão Geral')} />;
    }

    if (activeItem === 'Gestão de Documentos' || activeItem === 'Gestão de Expediente' || (activeItem === 'Gestão de Expedientes' && hasExpediente)) {
      return (
        <div className="w-full h-full">
          <GestaoDocumentosView 
            onBack={() => setActiveItem('Visão geral')} 
            expedientes={expedientes} 
            onUpdateExpediente={(updated) => {
              setExpedientes(prev => prev.map(e => e.id === updated.id ? updated : e));
            }}
            onTrackingClick={() => onShowAlert('Funcionalidade de rastreio em desenvolvimento')}
            title={title}
            hideHeader={true}
          />
        </div>
      );
    }

    if (activeItem === 'Calendário') {
      return <CalendarView events={events} setEvents={setEvents} onAgendar={onAgendar} onNota={onNota} title={title} notes={notes} />;
    }

    if (activeItem === 'Atribuição de Nova Atividade') {
      return <AssignActivityView directorTitle={title} />;
    }

    if (activeItem === 'Matriz' || activeItem === 'Plano' || activeItem === 'Plano de Atividade' || activeItem === 'Plano da Direção' || activeItem === 'Meu Plano Individual') {
      if (activeItem === 'Meu Plano Individual') {
        return <MatrixView title="Meu Plano Individual" isDepartment={true} externalActivities={individualActivities} setExternalActivities={setIndividualActivities} />;
      }

      if (isExcludedFromNewMenu && activeItem === 'Plano de Atividade') {
        return <MatrixView title="Plano Setorial" isDepartment={true} externalActivities={sectorActivities} setExternalActivities={setSectorActivities} onFinalSubmit={(acts) => {
          setDirectionActivities([...acts, ...directionActivities]);
          setSectorActivities([]);
          onShowAlert('Plano Setorial submetido à Direção com sucesso!');
        }} />;
      }

      if ((isDepartment || isDG || isDC || isDCC) && !selectedPlanType && !showMatrixForm) {
        let planTypes: string[] = [];
        let menuTitle = "Selecione o Tipo de Plano";

        if (activeItem === 'Matriz' && isDG) {
          planTypes = ['Nova matriz', 'Minha Matriz', 'Matriz das Direções centrais'];
          menuTitle = "Selecione a Matriz";
        } else {
          if (title.toUpperCase().includes('PLANIFICAÇÃO') || isDG) {
            planTypes = ['Plano Institucional', 'Planos Individuais'];
          } else if (isDC) {
            planTypes = ['Plano da Direção', 'Planos Individuais'];
          } else if (isCD || isGDG) {
            planTypes = ['Plano do Departamento', 'Planos Individuais'];
          } else {
            planTypes = ['Plano Setorial', 'Planos Individuais'];
          }
        }

        return (
          <div className="w-full max-w-4xl mx-auto py-12">
            <h3 className="text-2xl font-bold text-blue-900 mb-8 text-center uppercase tracking-widest leading-[1.5]">{menuTitle}</h3>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {planTypes.map(type => (
                <button 
                  key={type}
                  onClick={() => {
                    if (type === 'Nova matriz') {
                      setShowMatrixForm(true);
                    } else if (type === 'Plano de Atividade') {
                      setSelectedPlanType('NOVA_ATIVIDADE');
                    } else {
                      setSelectedPlanType(type);
                    }
                  }}
                  className="bg-white border-2 border-gray-100 p-10 rounded-3xl shadow-sm hover:border-blue-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-6 group"
                >
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText size={32} />
                  </div>
                  <span className="text-lg font-bold text-gray-900 leading-[1.5]">{type}</span>
                </button>
              ))}
            </div>

            {activeItem !== 'Matriz' && (
              <div className="flex flex-col items-center border-t border-gray-100 pt-10">
                <p className="text-gray-500 mb-6 font-medium">Ou registe uma atividade diretamente:</p>
                <button 
                  onClick={() => setSelectedPlanType('NOVA_ATIVIDADE')}
                  className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                >
                  <Plus size={24} /> REGISTAR NOVA ATIVIDADE
                </button>
              </div>
            )}
          </div>
        );
      }

      if (selectedPlanType === 'Minha Matriz') {
        return <MyMatrixView onShowAlert={onShowAlert} externalMatrices={publishedMatrices} />;
      }

      if (showMatrixForm) {
        return (
          <MatrixForm 
            title={isDG ? "Nova Matriz de Atividades" : "Plano de Atividade"}
            onClose={() => setShowMatrixForm(false)}
            onSubmit={(data) => {
              const activity: MatrixActivity = {
                id: Math.random().toString(36).substr(2, 9),
                unidadeOrganica: data.unidadeOrganica || '',
                direcao: data.direcao || '',
                departamento: data.departamento || '',
                reparticao: data.reparticao || '',
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
              };
              
              if (isDG) {
                setInstitutionalActivities([activity, ...institutionalActivities]);
                setDirectionActivities([activity, ...directionActivities]);
                
                // Add to published matrices if it's a new year or just update the count
                const year = data.anoEconomico || (new Date().getFullYear() + 1);
                const existingMatrixIndex = publishedMatrices.findIndex(m => m.year === year);
                
                if (existingMatrixIndex >= 0) {
                  const updatedMatrices = [...publishedMatrices];
                  updatedMatrices[existingMatrixIndex] = {
                    ...updatedMatrices[existingMatrixIndex],
                    activityCount: updatedMatrices[existingMatrixIndex].activityCount + 1,
                    publishedAt: new Date().toLocaleString()
                  };
                  setPublishedMatrices(updatedMatrices);
                } else {
                  setPublishedMatrices([{
                    id: `MAT-${year}-${Math.floor(Math.random() * 1000)}`,
                    year: year,
                    publishedAt: new Date().toLocaleString(),
                    activityCount: 1,
                    status: 'published'
                  }, ...publishedMatrices]);
                }

                setShowMatrixForm(false);
                setSelectedPlanType('Nova matriz');
                onShowAlert('Matriz criada com sucesso!');
              } else if (title.toUpperCase().includes('PLANIFICAÇÃO')) {
                setInstitutionalActivities([activity, ...institutionalActivities]);
                setShowMatrixForm(false);
                setSelectedPlanType('Plano Institucional');
                onShowAlert('Atividade adicionada ao Plano Institucional com sucesso!');
              } else if (isDC) {
                setDirectionActivities([activity, ...directionActivities]);
                setShowMatrixForm(false);
                setSelectedPlanType('Plano da Direção');
                onShowAlert('Atividade adicionada ao Plano da Direção com sucesso!');
              } else if (isCD) {
                setDepartmentActivities([activity, ...departmentActivities]);
                setShowMatrixForm(false);
                setSelectedPlanType('Plano do Departamento');
                onShowAlert('Atividade adicionada ao Plano do Departamento com sucesso!');
              } else {
                setSectorActivities([activity, ...sectorActivities]);
                setShowMatrixForm(false);
                setSelectedPlanType('Plano Setorial');
                onShowAlert('Atividade adicionada ao Plano Setorial com sucesso!');
              }
            }}
          />
        );
      }

      if (selectedPlanType === 'Nova matriz') {
        return <MatrixView title="Matriz" isDepartment={false} externalActivities={institutionalActivities} setExternalActivities={setInstitutionalActivities} onActivityAdded={(a) => setActivities?.(prev => [a, ...prev])} />;
      }

      if (selectedPlanType === 'Matriz das Direções centrais') {
        return <MatrixView title="Matriz das Direções centrais" isDepartment={false} externalActivities={directionActivities} setExternalActivities={setDirectionActivities} onActivityAdded={(a) => setActivities?.(prev => [a, ...prev])} />;
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
                  referencia: `ACT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}` // Added reference
                };

                if (title.toUpperCase().includes('PLANIFICAÇÃO') || isDG) {
                  setInstitutionalActivities([activity, ...institutionalActivities]);
                  onShowAlert('Atividade registada e alocada ao Plano Institucional!');
                  setSelectedPlanType('Plano Institucional');
                } else if (isDC) {
                  setDirectionActivities([activity, ...directionActivities]);
                  onShowAlert('Atividade registada e alocada ao Plano da Direção!');
                  setSelectedPlanType('Plano da Direção');
                } else if (isCD) {
                  setDepartmentActivities([activity, ...departmentActivities]);
                  onShowAlert('Atividade registada e alocada ao Plano do Departamento!');
                  setSelectedPlanType('Plano do Departamento');
                } else {
                  setSectorActivities([activity, ...sectorActivities]);
                  onShowAlert('Atividade registada e alocada ao Plano Setorial!');
                  setSelectedPlanType('Plano Setorial');
                }

                if (setActivities) {
                  setActivities(prev => [activity, ...prev]);
                }
              }}
            />
          </div>
        );
      }

      if (selectedPlanType === 'Planos Individuais') {
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
        setDepartmentActivities([...acts, ...departmentActivities]);
        setSectorActivities([]);
        onShowAlert('Plano Setorial submetido ao Departamento com sucesso!');
        setSelectedPlanType('Plano do Departamento');
      };

      if (selectedPlanType === 'Plano do Departamento') {
        currentActivities = departmentActivities;
        setCurrentActivities = setDepartmentActivities;
        onFinalSubmit = (acts: MatrixActivity[]) => {
          setDirectionActivities([...acts, ...directionActivities]);
          setDepartmentActivities([]);
          onShowAlert('Plano do Departamento submetido à Direção com sucesso!');
          setSelectedPlanType('Plano da Direção');
        };
      } else if (selectedPlanType === 'Plano da Direção' || selectedPlanType === 'Plano de Direção') {
        currentActivities = directionActivities;
        setCurrentActivities = setDirectionActivities;
        onFinalSubmit = (acts: MatrixActivity[]) => {
          setInstitutionalActivities([...acts, ...institutionalActivities]);
          setDirectionActivities([]);
          onShowAlert('Plano da Direção submetido ao Plano Institucional com sucesso!');
          setSelectedPlanType('Plano Institucional');
        };
      } else if (selectedPlanType === 'Plano Institucional') {
        currentActivities = institutionalActivities;
        setCurrentActivities = setInstitutionalActivities;
        onFinalSubmit = (acts: MatrixActivity[]) => {
          onShowAlert('Plano Institucional consolidado e enviado para a Repartição de Planificação!');
          setSelectedPlanType(null);
          setActiveItem('Visão geral');
        };
      }

      return (
        <MatrixView 
          title={selectedPlanType || activeItem} 
          isDepartment={isDepartment} 
          externalActivities={currentActivities} 
          setExternalActivities={setCurrentActivities} 
          onFinalSubmit={onFinalSubmit}
          onActivityAdded={(a) => setActivities?.(prev => [a, ...prev])}
        />
      );
    }

    if (activeItem === 'Minha Matriz') {
      return <MyMatrixView onShowAlert={onShowAlert} />;
    }

    if (activeItem === 'Meu Plano Individual') {
      return <MatrixView title="Meu Plano Individual" isDepartment={isDepartment} externalActivities={individualActivities} setExternalActivities={setIndividualActivities} onActivityAdded={(a) => setActivities?.(prev => [a, ...prev])} />;
    }

    if (activeItem === 'Gestão Académica') {
      return (
        <div className="w-full max-w-4xl border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
          <Users size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold text-blue-900 mb-4 uppercase tracking-widest">Gestão Académica</h3>
          <p>Módulo de Gestão Académica em desenvolvimento para o {title}.</p>
        </div>
      );
    }

    if (activeItem === 'Relatórios') {
      return <ReportsView onShowAlert={onShowAlert} initialDirection={title} />;
    }

    if (activeItem === 'Documentos Normativos') {
      return <DocumentosView title={title} />;
    }

    if (activeItem === 'Estatística') {
      const titleUpper = title.toUpperCase();
      
      // If it's the Finance Head, show the specific form
      if (titleUpper.includes('FINANÇAS')) {
        return (
          <div className="absolute inset-0 bg-white z-50 flex flex-col">
            <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-none">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveItem('Visão Geral')} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
                  <ArrowLeft size={18} className="text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-[#2563eb] font-serif">Estatística - Recursos Financeiros</h1>
              </div>
            </header>
            <RecursosFinanceirosForm 
              onClose={() => setActiveItem('Visão Geral')}
              onSubmit={(data) => {
                if (setFinancialData) {
                  setFinancialData(prev => [...prev, data]);
                  onShowAlert('Dados financeiros enviados com sucesso para a Repartição de Estatística!');
                  setActiveItem('Visão Geral');
                }
              }}
            />
          </div>
        );
      }

      let allowedCategories: string[] | null = null;
      if (titleUpper.includes('PESSOAL')) allowedCategories = ['Corpo docente', 'Corpo técnico administrativo'];
      if (titleUpper.includes('BOLSAS')) allowedCategories = ['Bolseiros'];
      if (titleUpper.includes('REGISTO ACADÉMICO') || titleUpper.includes('DRA')) allowedCategories = ['Corpo discente', 'Previsão n+1'];
      if (titleUpper.includes('INFRAESTRUTURAS')) allowedCategories = ['Infraestruturas'];
      if (titleUpper.includes('DICOSSER')) allowedCategories = ['Previsão n+1'];

      return (
        <div className="absolute inset-0 bg-white z-50 flex flex-col">
          <EstatisticaView 
            onBack={() => setActiveItem('Visão Geral')} 
            isReadOnly={false} 
            allowedCategories={allowedCategories} 
            title={title}
            financialData={financialData}
            hideHeader={true}
            hideFooter={true}
          />
        </div>
      );
    }

    if (activeItem === 'Gestão de Expedientes' && hasExpediente) {
      return <ExpedienteManagement title={title} expedientes={expedientes} setExpedientes={setExpedientes} />;
    }

    if (title.toUpperCase() === 'GESTÃO DE BIBLIOTECA') {
      return <LibraryManagementView registrations={libraryRegistrations || []} bookRegistrations={bookRegistrations || []} />;
    }

    if (title.toUpperCase() === 'DIRETOR-GERAL' && activeItem === 'Visão Geral') {
      return <DirectorGeneralOverview />;
    }

    if (boards.includes(title.toUpperCase()) && activeItem === 'Visão Geral') {
      return <BoardOverview boardName={title} />;
    }

    if (title.toUpperCase().includes('DRA') && activeItem === 'Visão Geral') {
      return <DRADashboard />;
    }

    return (
      <div className="w-full max-w-4xl border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
        <LayoutGrid size={48} className="mx-auto mb-4 opacity-50" />
        <p>Bem-vindo ao Gabinete do {title}. Selecione uma opção no menu lateral.</p>
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden">
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
              {isEstatisticaMain ? <BarChart2 size={20} /> : <LayoutGrid size={20} />}
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
        <aside className={`${activeItem === 'Estatística' ? 'hidden' : 'flex'} w-full md:w-72 border-b md:border-b-0 md:border-r border-gray-100 p-4 flex-none flex md:flex-col overflow-x-auto md:overflow-y-auto gap-2 bg-gray-50/30`}>
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => {
                setActiveItem(item.title);
                setSelectedPlanType(null);
              }}
              className={`flex-none md:w-full flex items-center gap-3 p-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-tighter whitespace-nowrap transition-all ${activeItem === item.title ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
            >
              <item.icon size={20} />
              {item.title}
            </button>
          ))}
        </aside>

        <main className="flex-grow p-6 md:p-10 flex flex-col items-center justify-start overflow-auto relative w-full bg-white">
          {!isEstatisticaMain && !boards.includes(title) && activeItem === 'Visão Geral' && <h2 className="text-4xl font-black text-blue-900 mb-8 self-start uppercase tracking-tighter font-serif">VISÃO GERAL DO {title.toUpperCase()}</h2>}
          {!isEstatisticaMain && activeItem !== 'Visão Geral' && activeItem !== 'Relatórios' && activeItem !== 'Matriz' && activeItem !== 'Plano' && activeItem !== 'Plano de Atividade' && activeItem !== 'Plano da Direção' && activeItem !== 'Minha Matriz' && activeItem !== 'Gestão de Documentos' && activeItem !== 'Gestão de Expediente' && <h2 className="text-4xl font-black text-blue-900 mb-8 self-start uppercase tracking-tighter font-serif">{activeItem} - {title}</h2>}
          {(activeItem === 'Plano de Atividade' || activeItem === 'Plano da Direção') && selectedPlanType && selectedPlanType !== 'Plano Individual' && (
            <button 
              onClick={() => setSelectedPlanType(null)}
              className="mb-6 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2 self-start"
            >
              ← VOLTAR À SELECÇÃO DE PLANO
            </button>
          )}
          {renderContent()}
        </main>
      </div>

      <footer className="flex-none bg-[#1e3a8a] text-white text-center py-6 text-sm font-medium tracking-wide">
        Desenvolvido por fttripas - 2025-2026 | @todos os direitos reservados
      </footer>
    </div>
  );
}
