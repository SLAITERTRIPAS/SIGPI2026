import React, { useState } from 'react';
import Quadro1_1Form from './Quadro1_1Form';
import Quadro1_2Form from './Quadro1_2Form';
import Quadro1_3Form from './Quadro1_3Form';
import Quadro1_4Form from './Quadro1_4Form';
import Quadro1_5Form from './Quadro1_5Form';
import Quadro1_6Form from './Quadro1_6Form';
import { Calendar, ArrowRight, ArrowLeft, GraduationCap, Users, Briefcase, Microscope, DollarSign, Building2, TrendingUp, FileText, ChevronRight, ChevronDown, Download, Save, User, Maximize2, LogOut, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FinancialData } from '../types';
import { QUADROS } from '../constants/quadros';

export default function EstatisticaView({ 
  onBack,
  isReadOnly = true,
  allowedCategories = null,
  title = 'REPARTIÇÃO DE ESTATÍSTICA',
  hideSidebar = false,
  hideHeader = false,
  hideFooter = false,
  initialActiveItem = null,
  financialData = []
}: { 
  onBack: () => void,
  isReadOnly?: boolean,
  allowedCategories?: string[] | null,
  title?: string,
  hideSidebar?: boolean,
  hideHeader?: boolean,
  hideFooter?: boolean,
  initialActiveItem?: string | null,
  financialData?: FinancialData[]
}) {
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [activeItem, setActiveItem] = useState(initialActiveItem || (allowedCategories ? allowedCategories[0] : 'Corpo discente'));
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [viewMode, setViewMode] = useState<'year-selection' | 'form'>('year-selection');

  const reportYear = (parseInt(selectedYear) - 1).toString();

  // Update active item if prop changes
  React.useEffect(() => {
    if (initialActiveItem) {
      setActiveItem(initialActiveItem);
    }
  }, [initialActiveItem]);

  const currentYear = { year: '2025', desc: 'Programar novos dados estatísticos (Ano N-1)' };
  const pastYears = [
    { year: '2024', desc: 'Consultar dados estatísticos' },
    { year: '2023', desc: 'Consultar dados estatísticos' },
    { year: '2022', desc: 'Consultar dados estatísticos' },
  ];

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    setViewMode('form');
  };

  const handleBackToYears = () => {
    setViewMode('year-selection');
  };

  const allMenuItems = [
    { title: 'Quadro 1.1 Número de Estudantes que procuram o Ensino Superior', icon: GraduationCap },
    { title: 'Quadro 1.2 Número de vagas preenchidas', icon: FileText },
    { title: 'Quadro 1.3 Número de Estudantes Novos Ingresso, Matriculados, graduados por Grau, Sexo e Cursos em Funcionamento no ano académico', icon: Users },
    { title: 'Quadro 1.4 Número de Novos Ingressos, Matriculados e graduados por Nacionalidade e sexo', icon: Users },
    { title: 'Quadro 1.5 Número de Estudantes Estrangeiros, Novos Ingressos, Matriculados e graduados por Curso, Grau e Sexo', icon: Users },
    { title: 'Quadro 1.6 Número de Estudantes com Necessidades Especiais por Curso, Grau e Sexo', icon: Users },
    { title: 'Corpo docente', icon: Users },
    { title: 'Corpo técnico administrativo', icon: Briefcase },
    { title: 'Investigadores', icon: Microscope },
    { title: 'Recursos financeiro', icon: DollarSign },
    { title: 'Infraestruturas', icon: Building2 },
    { title: 'Previsão n+1', icon: TrendingUp },
    { title: 'Calendário', icon: Calendar },
    { title: 'Relatórios', icon: FileText, hasSubmenu: true },
  ];

  const menuItems = allowedCategories && allowedCategories.length > 0
    ? allMenuItems.filter(item => allowedCategories.includes(item.title))
    : allMenuItems;

  const renderHeader = () => (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-none z-10">
      <div className="flex items-center gap-6">
        <button 
          onClick={viewMode === 'form' ? handleBackToYears : onBack}
          className="p-2.5 bg-gray-50 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-blue-600 font-sans font-bold text-lg uppercase tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
          <User size={16} className="text-gray-400" />
          <span className="text-xs font-bold text-gray-600">fttripas@gmail.com</span>
        </div>
        
        <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:bg-gray-100 transition-all shadow-sm">
          <Maximize2 size={18} />
        </button>
        
        <button 
          onClick={onBack}
          className="p-2.5 bg-red-50 rounded-xl text-red-500 hover:bg-red-100 transition-all shadow-sm"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );

  const renderFooter = () => (
    <footer className="h-12 bg-[#000066] flex items-center justify-center px-8 flex-none">
      <p className="text-white text-[15px] font-serif opacity-90 tracking-wide">
        Desenvolvido por fttripas - 2025-2026 | @todos os direitos reservados
      </p>
    </footer>
  );

  const renderSidebar = () => (
    <aside className="w-72 bg-white border-r border-gray-200 flex-none flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-gray-100 bg-gray-50/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-[#6366f1] rounded-2xl text-white shadow-lg shadow-indigo-100">
            <BarChart2 size={24} />
          </div>
          <div>
            <h1 className="text-sm font-black text-gray-900 uppercase tracking-tighter leading-none mb-1">Estatística</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Painel de Gestão</p>
          </div>
        </div>
      </div>

      <nav className="flex-grow py-6">
        <ul className="space-y-1 px-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => setActiveItem(item.title)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  activeItem === item.title 
                    ? 'bg-blue-50 text-blue-700 font-bold' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-blue-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={16} className={activeItem === item.title ? 'text-blue-600' : 'text-gray-400'} />
                  <span className="text-[11px] font-black uppercase tracking-tight">{item.title}</span>
                </div>
                {item.hasSubmenu && (
                  <ChevronRight size={14} className="text-gray-300" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><ArrowLeft size={16} /></button>
        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-gray-300 rounded-full"></div>
        </div>
        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><ArrowRight size={16} /></button>
      </div>
    </aside>
  );

  return (
    <div className={`${hideSidebar ? 'h-full' : 'h-screen'} w-full bg-[#f8f9fa] flex flex-col overflow-hidden relative`}>
      {!hideHeader && renderHeader()}
      
      <div className="flex-grow flex overflow-hidden">
        {!hideSidebar && renderSidebar()}

        <main className="flex-grow overflow-auto bg-[#f8f9fa] p-12">
          {viewMode === 'year-selection' ? (
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-full">
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">Selecione o Ano</h2>
              <p className="text-gray-500 font-medium mb-12 text-center">Escolha o ano para preenchimento ou consulta de dados estatísticos.</p>
              
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Year Card */}
                <button 
                  onClick={() => handleYearSelect(currentYear.year)}
                  className="bg-white border-2 border-blue-100 rounded-[32px] p-8 text-left hover:border-blue-500 hover:shadow-xl hover:shadow-blue-100 transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Calendar size={32} />
                    </div>
                    <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full">Atual</span>
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 mb-2">Ano {currentYear.year}</h3>
                  <p className="text-gray-500 font-medium text-sm">{currentYear.desc}</p>
                </button>

                {/* Past Years Container */}
                <div className="bg-white border border-gray-200 rounded-[32px] p-8 flex flex-col">
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-6 flex items-center gap-2">
                    <FileText size={20} className="text-gray-400" />
                    Anos Anteriores
                  </h3>
                  <div className="flex-grow flex flex-col gap-3">
                    {pastYears.map((py) => (
                      <button 
                        key={py.year}
                        onClick={() => handleYearSelect(py.year)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                            <Calendar size={20} />
                          </div>
                          <div className="text-left">
                            <h4 className="text-lg font-black text-gray-900 leading-none mb-1">{py.year}</h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{py.desc}</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full mx-auto flex flex-col items-center gap-10 min-h-full">
              {/* Quadro Selector at Top Center */}
              <div className="relative w-full max-w-2xl">
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Selecione o Quadro a preencher</label>
                <select 
                  value={activeItem}
                  onChange={(e) => setActiveItem(e.target.value)}
                  className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                >
                  {QUADROS.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>

              {activeItem === 'Relatórios' ? (
              <div className="w-full space-y-8">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">Relatório Estatístico</h2>
                    <p className="text-gray-500 font-medium">Relatório consolidado de dados estatísticos do ano de {reportYear}</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setIsGeneratingReport(true);
                        setTimeout(() => setIsGeneratingReport(false), 2000);
                      }}
                      className="flex items-center gap-2 px-8 py-4 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                    >
                      {isGeneratingReport ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        <>
                          <Download size={18} /> Gerar Relatório {reportYear}
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-[40px] overflow-hidden shadow-2xl relative">
                  {isGeneratingReport && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
                      <p className="text-blue-900 font-black uppercase tracking-widest text-xs animate-pulse">Processando dados de {reportYear}...</p>
                    </div>
                  )}

                  <div className="p-12 space-y-12">
                    {/* Report Header */}
                    <div className="flex justify-between items-start border-b-4 border-blue-600 pb-8">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-100">
                          <BarChart2 size={40} />
                        </div>
                        <div>
                          <h3 className="text-4xl font-black text-blue-900 uppercase tracking-tighter leading-none mb-2">Relatório Anual</h3>
                          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Repartição de Estatística | Ano Lectivo {reportYear}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Data de Emissão</p>
                        <p className="text-sm font-black text-gray-900">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Report Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Section: Academic Data */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 text-blue-600">
                          <GraduationCap size={24} />
                          <h4 className="text-lg font-black uppercase tracking-tight">Dados Académicos</h4>
                        </div>
                        <div className="space-y-4 bg-gray-50 p-6 rounded-3xl">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-500">Total de Estudantes</span>
                            <span className="text-lg font-black text-gray-900">1,245</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-500">Novos Ingressos</span>
                            <span className="text-lg font-black text-gray-900">320</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-500">Graduados</span>
                            <span className="text-lg font-black text-gray-900">185</span>
                          </div>
                          <div className="pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-black text-blue-900">Taxa de Sucesso</span>
                              <span className="text-lg font-black text-blue-600">84.5%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section: Human Resources */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 text-blue-600">
                          <Users size={24} />
                          <h4 className="text-lg font-black uppercase tracking-tight">Recursos Humanos</h4>
                        </div>
                        <div className="space-y-4 bg-gray-50 p-6 rounded-3xl">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-500">Corpo Docente</span>
                            <span className="text-lg font-black text-gray-900">86</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-500">Corpo Técnico</span>
                            <span className="text-lg font-black text-gray-900">42</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-500">Investigadores</span>
                            <span className="text-lg font-black text-gray-900">12</span>
                          </div>
                          <div className="pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-black text-blue-900">Total Colaboradores</span>
                              <span className="text-lg font-black text-blue-600">140</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section: Financial Summary */}
                      <div className="space-y-6 md:col-span-2">
                        <div className="flex items-center gap-3 text-blue-600">
                          <DollarSign size={24} />
                          <h4 className="text-lg font-black uppercase tracking-tight">Resumo Financeiro {reportYear}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Execução Orçamental</p>
                            <p className="text-3xl font-black text-blue-900">92.4%</p>
                            <div className="mt-4 w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full" style={{ width: '92.4%' }} />
                            </div>
                          </div>
                          <div className="bg-green-50 p-8 rounded-[32px] border border-green-100">
                            <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-2">Receitas Totais</p>
                            <p className="text-3xl font-black text-green-900">
                              {financialData.filter(d => d.ano === reportYear).reduce((acc, curr) => acc + curr.receitasProprias + curr.subvencaoEstado, 0).toLocaleString() || '12,450,000'} MZN
                            </p>
                          </div>
                          <div className="bg-red-50 p-8 rounded-[32px] border border-red-100">
                            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">Despesas Totais</p>
                            <p className="text-3xl font-black text-red-900">
                              {financialData.filter(d => d.ano === reportYear).reduce((acc, curr) => acc + curr.despesasPessoal + curr.despesasFuncionamento + curr.despesasInvestimento, 0).toLocaleString() || '11,200,000'} MZN
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Report Footer */}
                    <div className="pt-12 border-t border-gray-100 flex justify-between items-center italic text-gray-400 text-xs">
                      <p>Documento gerado automaticamente pelo Sistema de Gestão Integrada</p>
                      <p>ID de Autenticidade: REP-{reportYear}-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeItem === 'Recursos financeiro' ? (
              <div className="w-full space-y-8">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">{activeItem}</h2>
                    <p className="text-gray-500 font-medium">Dados financeiros consolidados para o ano de {selectedYear}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                      <Download size={16} /> Exportar PDF
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                      <Save size={16} /> Validar Dados
                    </button>
                  </div>
                </div>

                {financialData.filter(d => d.ano === selectedYear).length > 0 ? (
                  <div className="grid grid-cols-1 gap-8">
                    {financialData.filter(d => d.ano === selectedYear).map((data, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                              <DollarSign size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Relatório Financeiro #{data.id}</h3>
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Submetido em: {new Date(data.dataSubmissao).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                            {data.status}
                          </span>
                        </div>
                        
                        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Receitas</h4>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500">Orçamento Anual</span>
                                <span className="text-sm font-black text-gray-900">{data.orcamentoAnual.toLocaleString()} MZN</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500">Receitas Próprias</span>
                                <span className="text-sm font-black text-gray-900">{data.receitasProprias.toLocaleString()} MZN</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500">Subvenção Estado</span>
                                <span className="text-sm font-black text-gray-900">{data.subvencaoEstado.toLocaleString()} MZN</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Despesas</h4>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500">Pessoal</span>
                                <span className="text-sm font-black text-red-600">{data.despesasPessoal.toLocaleString()} MZN</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500">Funcionamento</span>
                                <span className="text-sm font-black text-red-600">{data.despesasFuncionamento.toLocaleString()} MZN</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500">Investimento</span>
                                <span className="text-sm font-black text-red-600">{data.despesasInvestimento.toLocaleString()} MZN</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Resumo</h4>
                            <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500">Total Receitas</span>
                                <span className="text-sm font-black text-blue-700">{(data.receitasProprias + data.subvencaoEstado).toLocaleString()} MZN</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500">Total Despesas</span>
                                <span className="text-sm font-black text-red-700">{(data.despesasPessoal + data.despesasFuncionamento + data.despesasInvestimento).toLocaleString()} MZN</span>
                              </div>
                              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-xs font-black uppercase tracking-widest text-gray-900">Saldo</span>
                                <span className={`text-lg font-black ${(data.receitasProprias + data.subvencaoEstado) - (data.despesasPessoal + data.despesasFuncionamento + data.despesasInvestimento) >= 0 ? 'text-green-600' : 'text-orange-600'}`}>
                                  {((data.receitasProprias + data.subvencaoEstado) - (data.despesasPessoal + data.despesasFuncionamento + data.despesasInvestimento)).toLocaleString()} MZN
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-[32px] p-20 text-center shadow-sm w-full">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <DollarSign size={40} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-black text-gray-800 mb-2 uppercase tracking-tighter">Sem dados financeiros</h3>
                    <p className="text-gray-400 font-medium max-w-md mx-auto">Ainda não foram submetidos dados financeiros para o ano de {selectedYear} pelo Departamento de Finanças.</p>
                  </div>
                )}
              </div>
            ) : activeItem === 'Quadro 1.1 Número de Estudantes que procuram o Ensino Superior' ? (
              <Quadro1_1Form />
            ) : activeItem === 'Quadro 1.2 Número de vagas preenchidas' ? (
              <Quadro1_2Form />
            ) : activeItem === 'Quadro 1.3 Número de Estudantes Novos Ingresso, Matriculados, graduados por Grau, Sexo e Cursos em Funcionamento no ano académico' ? (
              <Quadro1_3Form />
            ) : activeItem === 'Quadro 1.4 Número de Novos Ingressos, Matriculados e graduados por Nacionalidade e sexo' ? (
              <Quadro1_4Form />
            ) : activeItem === 'Quadro 1.5 Número de Estudantes Estrangeiros, Novos Ingressos, Matriculados e graduados por Curso, Grau e Sexo' ? (
              <Quadro1_5Form />
            ) : activeItem === 'Quadro 1.6 Número de Estudantes com Necessidades Especiais por Curso, Grau e Sexo' ? (
              <Quadro1_6Form />
            ) : activeItem === 'Corpo docente' ? (
              <div className="w-full bg-white border border-gray-100 rounded-[32px] p-20 text-center shadow-sm">
                <h2 className="text-2xl font-black text-gray-800 mb-4">Corpo Docente - {selectedYear}</h2>
                <p className="text-sm text-gray-400 font-medium">Formulário para Corpo Docente em desenvolvimento.</p>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-8">
                {/* Main Content Card */}
                <div className="w-full bg-white border border-gray-100 rounded-[32px] p-20 text-center shadow-sm">
                  <h2 className="text-2xl font-black text-gray-800 mb-4">{activeItem} - {selectedYear}</h2>
                  <p className="text-sm text-gray-400 font-medium">Conteúdo para {activeItem} em desenvolvimento.</p>
                </div>

                {/* Consult Previous Data Card */}
                <div className="w-full bg-white border border-gray-100 rounded-[32px] p-20 text-center shadow-sm cursor-pointer hover:bg-gray-50 transition-all group">
                  <h2 className="text-2xl font-black text-gray-600 uppercase tracking-tight group-hover:text-blue-600 transition-colors">consultar dados anteriores</h2>
                </div>
              </div>
            )}
            </div>
          )}
        </main>
      </div>

      {!hideFooter && renderFooter()}
    </div>
  );
}
