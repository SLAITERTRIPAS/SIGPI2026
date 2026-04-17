/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import EventBlock from './components/EventBlock';
import DateBlock from './components/DateBlock';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import LoginScreen from './components/LoginScreen';
import MainMenu from './components/MainMenu';
import SubMenu from './components/SubMenu';
import DirectorDashboard from './components/DirectorDashboard';
import CourseDashboard from './components/CourseDashboard';
import EstatisticaView from './components/EstatisticaView';
import SistemaView from './components/SistemaView';
import Modal from './components/Modal';
import EventDetailView from './components/EventDetailView';
import NoteDetailView from './components/NoteDetailView';
import AgendarNovoEncontroView from './components/AgendarNovoEncontroView';
import NotaDoDiaForm from './components/NotaDoDiaForm';
import LibraryVisitForm from './components/LibraryVisitForm';
import VisitorWelcomeView from './components/VisitorWelcomeView';
import VisitorServicesView from './components/VisitorServicesView';
import ServiceRequestForm from './components/ServiceRequestForm';
import TrackingView from './components/TrackingView';
import GestaoDocumentosView from './components/GestaoDocumentosView';
import MonitoriaView from './components/MonitoriaView';
import LoadingSpinner from './components/LoadingSpinner';
import SplashScreen from './components/SplashScreen';
import { Event, Expediente, LibraryRegistration, BookRegistration, ServiceRequest, Nota, FinancialData } from './types';
import { ColaboradoresView } from './components/ColaboradoresView';
import { EFETIVO_GERAL_DATA } from './constants/colaboradoresList';

export default function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [view, setView] = useState<'home' | 'login' | 'menu' | 'submenu' | 'dashboard' | 'library_visit' | 'event_detail' | 'note_detail' | 'agendar' | 'nota_form' | 'visitor_welcome' | 'visitor_services' | 'service_request' | 'tracking' | 'gestao_documentos' | 'monitoria' | 'colaboradores'>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [subMenuStack, setSubMenuStack] = useState<{ title: string, items: { title: string, subItems?: { title: string }[] }[] }[]>([]);
  const [dashboardTitle, setDashboardTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [notes, setNotes] = useState<Nota[]>([
    {
      id: '1',
      title: '1ª Nota do dia',
      content: 'Submissão de relatórios mensais até ao dia 15 de Março. Por favor, certifique-se de que todos os indicadores estratégicos foram devidamente preenchidos e validados pela sua direção antes do envio final.',
      date: new Date().toISOString().split('T')[0],
      prazo: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // 5 days from now
      remetente: 'Direção Geral'
    }
  ]);
  const [visitorType, setVisitorType] = useState('Estudante');
  const [selectedService, setSelectedService] = useState('');
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Reunião de Direção',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      location: 'Sala de Conferências',
      participants: 'Diretores de Departamento',
      type: 'meeting',
      agenda: 'Planejamento mensal',
      preside: 'Diretor-Geral'
    }
  ]);
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [libraryRegistrations, setLibraryRegistrations] = useState<LibraryRegistration[]>([]);
  const [bookRegistrations, setBookRegistrations] = useState<BookRegistration[]>([]);
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => {
          console.warn(`Fullscreen request failed: ${e.message}`);
        });
      }
      // Remove listener after first interaction
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleLogin = (userData: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(userData);
      setShowSplash(true); // Show splash screen after login
      setView('menu');
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(null);
      setSubMenuStack([]);
      setView('home');
      setIsLoading(false);
    }, 1000);
  };

  const handleEventClick = () => {
    setView('event_detail');
  };

  const handleBackFromEvent = () => {
    setSelectedEvent(null);
    setView('home');
  };

  const isCourse = (title: string) => {
    const upperTitle = title.toUpperCase();
    return upperTitle.includes('CURSO') || 
           upperTitle.includes('DEPARTAMENTO DE ENGENHARIA') ||
           upperTitle.includes('DEPARTAMENTO DE PESQUISA');
  };

  const isAdmin = user?.email === 'admin@isps.ac.mz';

  const openSubMenu = (title: string, items: { title: string, subItems?: { title: string }[] }[]) => {
    if (title === 'Gestão de Colaboradores') {
      setView('colaboradores');
      return;
    }
    if (title === 'Entrada de Expediente' || title === 'Saída de Expediente') {
      setIsLoading(true);
      setTimeout(() => {
        setView('gestao_documentos');
        setIsLoading(false);
      }, 800);
      return;
    }

    if (title === 'Setor de Monitoria') {
      setIsLoading(true);
      setTimeout(() => {
        setView('monitoria');
        setIsLoading(false);
      }, 800);
      return;
    }
    
    if (items && items.length > 0) {
      setSubMenuStack(prev => [...prev, { title, items }]);
      setView('submenu');
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setDashboardTitle(title);
        setView('dashboard');
        setIsLoading(false);
      }, 1200);
    }
  };

  const goBack = () => {
    if (view === 'dashboard') {
      if (subMenuStack.length > 0) {
        setView('submenu');
      } else {
        setView('menu');
      }
    } else if (view === 'submenu') {
      if (subMenuStack.length > 1) {
        setSubMenuStack(prev => prev.slice(0, -1));
      } else {
        setSubMenuStack([]);
        setView('menu');
      }
    } else if (view === 'menu') {
      setView('login');
    } else if (view === 'login' || view === 'library_visit' || view === 'gestao_documentos' || view === 'monitoria') {
      if (view === 'gestao_documentos' || view === 'monitoria') {
        if (dashboardTitle) {
          setView('dashboard');
        } else if (subMenuStack.length > 0) {
          setView('submenu');
        } else {
          setView('menu');
        }
      } else {
        setView('home');
      }
    }
  };

  const handleShowAlert = (message: string) => {
    setModalMessage(message);
  };

  const currentSubMenu = subMenuStack.length > 0 ? subMenuStack[subMenuStack.length - 1] : null;

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <>
            {/* Background Image with Overlay */}
            <div 
              className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920")',
              }}
            >
              <div className="absolute inset-0 bg-[#0a0a5a]/90 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a5a] via-transparent to-[#0a0a5a]"></div>
              {/* Subtle Noise/Grain Overlay */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full text-white">
              <header className="flex flex-col sm:flex-row justify-between items-start p-4 flex-none gap-4 sm:gap-0">
                <div className="flex flex-col gap-4 w-full sm:w-auto">
                  <EventBlock events={events} onEventClick={handleEventClick} />
                  <button 
                    onClick={() => setView('note_detail')}
                    className="w-full sm:w-72 bg-slate-950/80 border border-slate-800 p-6 rounded-xl shadow-lg backdrop-blur-sm text-left hover:bg-slate-900/90 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-2 flex h-1 w-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1 w-1 bg-amber-600"></span>
                    </div>
                    <h3 className="text-amber-600 font-bold text-[17px] uppercase mb-1 group-hover:text-amber-500 transition-colors">Nota do dia:</h3>
                    <p className="text-slate-300 text-[17px] leading-relaxed line-clamp-3">
                      {notes.filter(n => {
                        const noteDate = new Date(n.date);
                        noteDate.setHours(0, 0, 0, 0);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return noteDate > today;
                      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]?.content || 'Nenhuma nota ativa no momento.'}
                    </p>
                  </button>
                </div>
                <div className="w-full sm:w-auto flex justify-end">
                  <DateBlock />
                </div>
              </header>
              <main className="flex-grow flex flex-col items-center justify-center sm:justify-start sm:pt-0 sm:-mt-40">
                <MainContent 
                  onStart={() => setView('login')} 
                  onVisitante={() => setView('visitor_welcome')}
                />
                <div className="w-1/2 h-px bg-white/20 mt-12"></div>
              </main>
              <Footer className="flex-none" />
            </div>
          </>
        );
      case 'event_detail':
        return <EventDetailView events={events} onBack={handleBackFromEvent} />;
      case 'note_detail':
        return <NoteDetailView onBack={() => setView('home')} notes={notes} />;
      case 'nota_form':
        return (
          <NotaDoDiaForm 
            onBack={() => setView('home')} 
            onSubmit={(note) => { 
              setNotes(prev => [...prev, { ...note, id: Math.random().toString(36).substr(2, 9) }]); 
              setView('home'); 
            }} 
          />
        );
      case 'agendar':
        return (
          <AgendarNovoEncontroView 
            onBack={() => setView('home')} 
            onSchedule={(event) => {
              setEvents(prev => [...prev, { ...event, id: Math.random().toString(36).substr(2, 9) }]);
              setView('home');
            }} 
          />
        );
      case 'visitor_welcome':
        return <VisitorWelcomeView onBack={() => setView('home')} onSelectType={(type) => { setVisitorType(type); setView('visitor_services'); }} />;
      case 'visitor_services':
        return (
          <VisitorServicesView 
            visitorType={visitorType} 
            onBack={() => setView('visitor_welcome')} 
            onSelectService={(service) => {
              if (service === 'Biblioteca') {
                setView('library_visit');
              } else if (service === 'Rastrear Pedido') {
                setView('tracking');
              } else {
                setSelectedService(service);
                setView('service_request');
              }
            }} 
          />
        );
      case 'service_request':
        return (
          <ServiceRequestForm 
            visitorType={visitorType} 
            service={selectedService} 
            onBack={() => setView('visitor_services')} 
            onSubmit={(req) => {
              setServiceRequests(prev => [...prev, req]);
            }} 
          />
        );
      case 'tracking':
        return <TrackingView onBack={() => setView('home')} serviceRequests={serviceRequests} />;
      case 'gestao_documentos':
        return (
          <GestaoDocumentosView 
            onBack={goBack} 
            expedientes={expedientes} 
            onUpdateExpediente={(updated) => {
              setExpedientes(prev => prev.map(e => e.id === updated.id ? updated : e));
            }}
            onTrackingClick={() => setView('tracking')}
            title={dashboardTitle || 'Secretaria Geral'}
          />
        );
      case 'monitoria':
        return (
          <MonitoriaView 
            onBack={goBack}
            activities={activities}
          />
        );
      case 'colaboradores':
        return <ColaboradoresView colaboradores={EFETIVO_GERAL_DATA} onBack={goBack} />;      case 'login':
        return <LoginScreen onLogin={handleLogin} onClose={goBack} events={events} />;
      case 'library_visit':
        return (
          <LibraryVisitForm 
            onBack={() => setView('home')} 
            onSubmit={(reg) => {
              setLibraryRegistrations(prev => [...prev, reg]);
              setView('home');
            }}
            initialTipoVisitante={visitorType}
            bookRegistrations={bookRegistrations}
          />
        );
      case 'menu':
        return (
          <MainMenu 
            user={user}
            onNavigate={openSubMenu} 
            onShowAlert={handleShowAlert} 
            onBack={goBack} 
            onLogout={handleLogout}
            onGestaoDocumentos={() => setView('gestao_documentos')}
          />
        );
      case 'submenu':
        return currentSubMenu ? (
          <SubMenu 
            title={currentSubMenu.title} 
            items={currentSubMenu.items} 
            onBack={goBack} 
            onNavigate={(title, items) => openSubMenu(title, items.map(i => ({ title: i.title, subItems: (i as any).subItems })))}
            onShowAlert={handleShowAlert}
            onLibrarySubmit={(reg) => setLibraryRegistrations(prev => [...prev, reg])}
            onBookSubmit={(book) => setBookRegistrations(prev => [...prev, book])}
            onLogout={handleLogout}
            bookRegistrations={bookRegistrations}
            events={events}
            setEvents={setEvents}
            onAgendar={() => setView('agendar')}
            onNota={() => setView('nota_form')}
            notes={notes}
          />
        ) : null;
      case 'dashboard':
        if (dashboardTitle?.toUpperCase() === 'REPARTIÇÃO DE ESTATÍSTICA') {
          return <EstatisticaView onBack={goBack} isReadOnly={true} financialData={financialData} />;
        }
        if (dashboardTitle === 'Sistema') {
          return (
            <SistemaView 
              onBack={goBack} 
              onLogout={handleLogout} 
              events={events}
              expedientes={expedientes}
              libraryRegistrations={libraryRegistrations}
              bookRegistrations={bookRegistrations}
              setExpedientes={setExpedientes}
              setLibraryRegistrations={setLibraryRegistrations}
              setBookRegistrations={setBookRegistrations}
              setEvents={setEvents}
              setNotes={setNotes}
              user={user}
            />
          );
        }
        if (isCourse(dashboardTitle)) {
          return (
            <CourseDashboard 
              title={dashboardTitle} 
              onBack={goBack} 
              onLogout={handleLogout} 
              onShowAlert={handleShowAlert}
              events={events}
              setEvents={setEvents}
              onAgendar={() => setView('agendar')}
              onNota={() => setView('nota_form')}
              notes={notes}
            />
          );
        }
        return (
          <DirectorDashboard 
            title={dashboardTitle} 
            onBack={goBack} 
            onShowAlert={handleShowAlert}
            events={events}
            setEvents={setEvents}
            expedientes={expedientes}
            setExpedientes={setExpedientes}
            libraryRegistrations={libraryRegistrations}
            setLibraryRegistrations={setLibraryRegistrations}
            bookRegistrations={bookRegistrations}
            setBookRegistrations={setBookRegistrations}
            financialData={financialData}
            setFinancialData={setFinancialData}
            notes={notes}
            setNotes={setNotes}
            onLogout={handleLogout}
            onAgendar={() => setView('agendar')}
            onNota={() => setView('nota_form')}
            onGestaoDocumentos={() => setView('gestao_documentos')}
            activities={activities}
            setActivities={setActivities}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`h-screen w-screen flex flex-col font-serif overflow-hidden relative ${view === 'home' ? '' : 'bg-white text-black'}`}>
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </AnimatePresence>
      {renderView()}
      <Modal isOpen={!!modalMessage} onClose={() => setModalMessage('')} message={modalMessage} />
      {isLoading && <LoadingSpinner />}
      
      {/* Hidden Programmer Exit Button (Bottom Left) */}
      <div 
        onDoubleClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
        }}
        className="fixed bottom-0 left-0 w-16 h-16 z-[99999] cursor-default opacity-0 hover:opacity-5 transition-opacity bg-black/10"
        title="Programmer Exit"
      />
    </div>
  );
}
