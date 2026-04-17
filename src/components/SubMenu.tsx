import React, { useState } from 'react';
import { ArrowLeft, Maximize2, LogOut, User, FileText, DollarSign, ChevronRight, BookOpen } from 'lucide-react';
import CourseDashboard from './CourseDashboard';
import LibraryVisitForm from './LibraryVisitForm';
import BookRegistrationForm from './BookRegistrationForm';
import ArchiveView from './ArchiveView';

import { LibraryRegistration, BookRegistration } from '../types';

export default function SubMenu({ 
  title, 
  items, 
  onBack, 
  onNavigate, 
  onShowAlert,
  onLibrarySubmit,
  onBookSubmit,
  onLogout,
  bookRegistrations = [],
  events = [],
  setEvents = () => {},
  onAgendar = () => {},
  onNota = () => {},
  notes = []
}: { 
  title: string, 
  items: { title: string, subItems?: { title: string, accessible?: boolean }[], accessible?: boolean }[], 
  onBack: () => void, 
  onNavigate?: (title: string, items: { title: string, accessible?: boolean }[]) => void, 
  onShowAlert: (msg: string) => void,
  onLibrarySubmit?: (reg: LibraryRegistration) => void,
  onBookSubmit?: (book: BookRegistration) => void,
  onLogout: () => void,
  bookRegistrations?: BookRegistration[],
  events?: any[],
  setEvents?: React.Dispatch<React.SetStateAction<any[]>>,
  onAgendar?: () => void,
  onNota?: () => void,
  notes?: any[]
}) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showLibraryVisitForm, setShowLibraryVisitForm] = useState(false);
  const [showBookRegistrationForm, setShowBookRegistrationForm] = useState(false);
  const [showArchiveView, setShowArchiveView] = useState(false);
  
  if (selectedCourse) {
    return (
      <CourseDashboard 
        title={selectedCourse} 
        onBack={() => setSelectedCourse(null)} 
        onLogout={onLogout} 
        onShowAlert={onShowAlert} 
        events={events}
        setEvents={setEvents}
        onAgendar={onAgendar}
        onNota={onNota}
        notes={notes}
      />
    );
  }

  if (showLibraryVisitForm) {
    return <LibraryVisitForm onBack={() => setShowLibraryVisitForm(false)} onSubmit={onLibrarySubmit} bookRegistrations={bookRegistrations} />;
  }

  if (showBookRegistrationForm) {
    return <BookRegistrationForm onBack={() => setShowBookRegistrationForm(false)} onSubmit={onBookSubmit} />;
  }

  if (showArchiveView) {
    return <ArchiveView onBack={() => setShowArchiveView(false)} />;
  }

  const titleUpper = title.toUpperCase();
  const isDicosafa = titleUpper.includes('DICOSAFA');
  const isDicosser = titleUpper.includes('DICOSSER');
  const isRH = titleUpper === 'DEPARTAMENTO DE RECURSOS HUMANOS';
  const isFinancas = titleUpper === 'DEPARTAMENTO DE FINANÇAS';
  const isPatrimonio = titleUpper === 'DEPARTAMENTO DE PATRIMÓNIO';
  const isSecretariaGeral = titleUpper === 'SECRETARIA GERAL';
  const isTIC = titleUpper === 'DEPARTAMENTO TIC';
  const isLarEstudantes = titleUpper === 'DEPARTAMENTO LAR DE ESTUDANTES';
  const isProducaoAlimentar = titleUpper === 'DEPARTAMENTO DE PRODUÇÃO ALIMENTAR';
  const isBiblioteca = titleUpper === 'DEPARTAMENTO DE BIBLIOTECA' || titleUpper === 'BIBLIOTECA' || titleUpper === 'ATENDIMENTO ESTUDANTIL' || titleUpper === 'GESTÃO DE BIBLIOTECA';
  const isRegistoAcademico = titleUpper === 'DEPARTAMENTO DE REGISTO ACADÉMICO';
  const isAssuntosEstudantis = titleUpper === 'DEPARTAMENTO DE ASSUNTOS ESTUDANTIS';
  const isEngenharia = titleUpper === 'DIVISÃO DE ENGENHARIA';
  const isCursos = titleUpper === 'DEPARTAMENTO DE ENGENHARIA ELETROTÉCNICA' || titleUpper === 'DEPARTAMENTO DE ENGENHARIA DE CONSTRUÇÃO CIVIL' || titleUpper === 'DEPARTAMENTO DE ENGENHARIA DE CONSTRUÇÃO MECÂNICA';
  const isUnidadesOrganicas = titleUpper.includes('UNIDADES ORGÂNICAS');
  const isCIE = titleUpper === 'CENTRO DE INCUBAÇÃO DE EMPRESAS';
  
  const isOrangeTheme = isDicosafa || isDicosser || isRH || isFinancas || isPatrimonio || isSecretariaGeral || isTIC || isLarEstudantes || isProducaoAlimentar || isBiblioteca || isRegistoAcademico || isAssuntosEstudantis;
  const isGreenTheme = isUnidadesOrganicas || isEngenharia || isCursos || isCIE;
  const hasTopRightButton = isRH || isFinancas || isPatrimonio || isSecretariaGeral || isTIC || isLarEstudantes || isProducaoAlimentar || isBiblioteca || isRegistoAcademico || isAssuntosEstudantis;
  const hasTopCenterButtons = isDicosafa || isDicosser || isEngenharia || isCIE || isBiblioteca;
  
  const displayItems = items;

  const defaultColors = [
    'bg-[#5842ff]',
    'bg-[#5865ff]',
    'bg-[#7e8aff]',
    'bg-[#7e65ff]',
    'bg-[#8a8aff]',
  ];

  const orangeColors = [
    'bg-[#d35400]', // Darker Orange
    'bg-[#e67e22]', // Orange
    'bg-[#f39c12]', // Light Orange
    'bg-[#f1c40f]', // Yellow
    'bg-[#e08e36]', // Muted Orange
    'bg-[#f5b041]', // Soft Orange
  ];

  const greenColors = [
    'bg-[#059669]', // Emerald 600
    'bg-[#10b981]', // Emerald 500
    'bg-[#059669]', // Emerald 600
  ];

  const colors = isOrangeTheme ? orangeColors : isGreenTheme ? greenColors : defaultColors;

  return (
    <div className="h-screen w-full bg-[#f8f9fa] flex flex-col overflow-hidden">
      <header className={`flex-none flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 border-b border-gray-100 gap-4 sm:gap-0 ${isOrangeTheme ? 'bg-[#e67e22]' : 'bg-white'}`}>
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <button onClick={onBack} className={`p-2.5 rounded-full transition-colors border ${isOrangeTheme ? 'bg-white/20 hover:bg-white/30 text-white border-white/20' : 'bg-gray-50 hover:bg-gray-100 text-blue-900 border-gray-100'}`}>
            <ArrowLeft size={20} className={isGreenTheme ? 'text-[#059669]' : ''} />
          </button>
          <h1 className={`text-lg font-black uppercase tracking-tighter text-center sm:text-left ${isOrangeTheme ? 'text-white' : isGreenTheme ? 'text-[#059669]' : 'text-blue-900'}`}>
            {isDicosafa ? 'DICOSAFA' : isDicosser ? 'DICOSSER' : title}
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
          <button onClick={() => onShowAlert('Em modo de programação')} className={`flex items-center gap-3 px-5 py-2.5 rounded-full transition-colors border ${isOrangeTheme ? 'bg-white/20 hover:bg-white/30 text-white border-white/20' : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-100'}`}>
            <User size={18} className={isOrangeTheme ? "text-white" : "text-gray-400"} />
            <span className="text-xs font-bold hidden sm:inline">fttripas@gmail.com</span>
          </button>
          <button onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }} className={`p-2.5 rounded-full transition-colors hidden sm:block border ${isOrangeTheme ? 'bg-white/20 hover:bg-white/30 text-white border-white/20' : 'bg-gray-50 hover:bg-gray-100 border-gray-100'}`}><Maximize2 size={18} className={isOrangeTheme ? 'text-white' : 'text-gray-600'} /></button>
          <button onClick={onLogout} className={`p-2.5 rounded-xl transition-colors border ${isOrangeTheme ? 'bg-white/20 hover:bg-white/30 text-white border-white/20' : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-100'}`} title="Sair do Sistema">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center p-8 overflow-auto">
        <div className="w-full max-w-6xl mb-12">
          {hasTopRightButton ? (
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8 md:gap-0">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-black text-blue-900 mb-2 uppercase tracking-tighter font-serif">Selecione a Área</h2>
                <p className="text-xl text-gray-500 font-medium font-serif italic">Navegue pelas repartições e setores disponíveis.</p>
              </div>
              <button 
                onClick={() => onShowAlert('Teto Orçamental')}
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#b91c1c] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl shadow-red-100"
              >
                <DollarSign size={20} />
                Teto Orçamental
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-4xl font-black text-blue-900 mb-2 uppercase tracking-tighter font-serif">
                {isCursos ? 'Cursos Disponíveis' : 'Selecione a Área'}
              </h2>
              <p className="text-xl text-gray-500 font-medium font-serif italic mb-8">
                {isCursos ? 'Selecione um curso para ver mais detalhes.' : 'Navegue pelas repartições e setores disponíveis.'}
              </p>

              {hasTopCenterButtons && (
                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                  {(isDicosafa || isEngenharia || isCIE) && (
                    <>
                      <button 
                        onClick={() => onShowAlert('Relatório Anual')}
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#1e3a8a] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-100"
                      >
                        <FileText size={20} />
                        Relatório Anual
                      </button>
                      <button 
                        onClick={() => onShowAlert('Teto Orçamental')}
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#991b1b] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl shadow-red-100"
                      >
                        <DollarSign size={20} />
                        Teto Orçamental
                      </button>
                    </>
                  )}

                  {isDicosser && (
                    <>
                      <button 
                        onClick={() => onShowAlert('Teto Orçamental')}
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#991b1b] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl shadow-red-100"
                      >
                        <DollarSign size={20} />
                        Teto Orçamental
                      </button>
                      <button 
                        onClick={() => onShowAlert('Relatório Anual')}
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white border-2 border-[#e67e22] text-[#e67e22] px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-50 transition-all shadow-xl shadow-orange-50"
                      >
                        <FileText size={20} />
                        Relatório Anual
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {isCursos ? (
          <div className="flex flex-wrap justify-center items-center gap-8 max-w-5xl mx-auto">
            {displayItems.map((item, index) => (
              <button 
                key={index} 
                onClick={() => {
                  if (item.accessible === false) {
                    onShowAlert('Área não acessível ao seu perfil.');
                    return;
                  }
                  setSelectedCourse(item.title);
                }}
                className={`bg-[#1e3a8a] text-white p-10 rounded-[2rem] flex items-center justify-center gap-6 shadow-2xl hover:scale-[1.02] transition-all duration-300 text-center aspect-[2/1] w-full sm:w-72 ${item.accessible === false ? 'opacity-50 grayscale cursor-not-allowed hover:scale-100' : ''}`}
              >
                <span className="text-xl font-black uppercase tracking-tight leading-tight font-serif">{item.title}</span>
              </button>
            ))}
          </div>
        ) : titleUpper === 'SERVIÇOS CENTRAIS' ? (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 w-full max-w-5xl mx-auto mt-12">
            {displayItems.map((item, index) => (
              <button 
                key={index} 
                onClick={() => {
                  if (item.accessible === false) {
                    onShowAlert('Área não acessível ao seu perfil.');
                    return;
                  }
                  onNavigate?.(item.title, item.subItems || []);
                }}
                className={`${colors[index % colors.length]} text-white p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 shadow-2xl hover:scale-[1.02] transition-all duration-300 text-center w-full sm:w-1/2 aspect-[3/2] max-w-md ${item.accessible === false ? 'opacity-50 grayscale cursor-not-allowed hover:scale-100' : ''}`}
              >
                <span className="text-3xl font-black font-serif leading-tight px-4 uppercase tracking-tight">{item.title}</span>
                {item.subItems && item.subItems.length > 0 && (
                  <ChevronRight size={40} className="opacity-70 mt-4" />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${isGreenTheme ? (isEngenharia ? 'lg:grid-cols-4' : 'lg:grid-cols-3') : 'lg:grid-cols-4'} gap-8 w-full max-w-7xl mx-auto`}>
            {displayItems.map((item, index) => (
              <button 
                key={index} 
                onClick={() => {
                  if (item.accessible === false) {
                    onShowAlert('Área não acessível ao seu perfil.');
                    return;
                  }
                  if (item.title === 'Registos de Visitantes') {
                    setShowLibraryVisitForm(true);
                  } else if (item.title === 'Registo de Obras e Livros') {
                    setShowBookRegistrationForm(true);
                  } else if (item.title === 'Repartição de Arquivo') {
                    setShowArchiveView(true);
                  } else {
                    onNavigate?.(item.title, item.subItems || []);
                  }
                }}
                className={`${colors[index % colors.length]} text-white p-8 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 h-[24rem] shadow-2xl hover:scale-[1.02] transition-all duration-300 ${item.accessible === false ? 'opacity-50 grayscale cursor-not-allowed hover:scale-100' : ''}`}
              >
                <span className={`text-2xl font-black text-center leading-tight font-serif uppercase tracking-tight ${isGreenTheme && item.title === 'Centros' ? 'text-xl' : ''}`}>{item.title}</span>
                {item.subItems && item.subItems.length > 0 && (
                  <ChevronRight size={40} className="opacity-70 mt-4" />
                )}
              </button>
            ))}
          </div>
        )}
      </main>

      <footer className="flex-none bg-[#1e3a8a] text-white text-center py-6 text-sm font-medium tracking-wide">
        Desenvolvido por fttripas - 2025-2026 | @todos os direitos reservados
      </footer>
    </div>
  );
}
