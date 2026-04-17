import React, { useState, useRef } from 'react';
import { ArrowLeft, Users, UserCheck, UserX, GraduationCap, Briefcase, Search, Edit, MapPin, Archive, Upload, Plus, Download, ImagePlus, FileText, FileSpreadsheet, Trash2, Check, X, ClipboardList, FolderSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LoadingSpinner from './LoadingSpinner';
import IndividualProcessForm from './IndividualProcessForm';
import ProcessManagementView from './ProcessManagementView';
import { EFETIVO_GERAL_DATA } from '../constants/colaboradoresList';
import { Colaborador } from '../types';
import { LISTA_FUNCOES, LISTA_CARGOS_CHEFIA } from '../constants/funcoesList';

const PROVINCIAS_DISTRITOS: Record<string, string[]> = {
  'Maputo Cidade': ['KaMpfumo', 'Nlhamankulu', 'KaMaxakeni', 'KaMavota', 'KaMubukwana', 'KaTembe', 'KaNyaka'],
  'Maputo': ['Boane', 'Magude', 'Manhiça', 'Marracuene', 'Matola', 'Matutuíne', 'Moamba', 'Namaacha'],
  'Gaza': ['Bilene', 'Chibuto', 'Chicualacuala', 'Chigubo', 'Chókwè', 'Chonguene', 'Guijá', 'Limpopo', 'Mabalane', 'Macia', 'Mandlakazi', 'Mapai', 'Massangena', 'Massingir', 'Xai-Xai'],
  'Inhambane': ['Funhalouro', 'Govuro', 'Homoíne', 'Inhambane', 'Inharrime', 'Inhassoro', 'Jangamo', 'Mabote', 'Massinga', 'Maxixe', 'Morrumbene', 'Panda', 'Vilankulo', 'Zavala'],
  'Sofala': ['Beira', 'Búzi', 'Caia', 'Chemba', 'Cheringoma', 'Chibabava', 'Dondo', 'Gorongosa', 'Machanga', 'Maringué', 'Muanza', 'Nhamatanda'],
  'Manica': ['Bárue', 'Chimoio', 'Gondola', 'Guro', 'Macate', 'Machaze', 'Macossa', 'Manica', 'Mossurize', 'Sussundenga', 'Tambara', 'Vanduzi'],
  'Tete': ['Angónia', 'Cahora-Bassa', 'Changara', 'Chifunde', 'Chiúta', 'Dôa', 'Macanga', 'Magoé', 'Marávia', 'Moatize', 'Mutarara', 'Tete', 'Tsangano', 'Zumbo'],
  'Zambézia': ['Alto Molócuè', 'Chinde', 'Derre', 'Gilé', 'Gurué', 'Ile', 'Inhassunge', 'Luabo', 'Lugela', 'Maganja da Costa', 'Milange', 'Mocuba', 'Mocubela', 'Molumbo', 'Mopeia', 'Morrumbala', 'Mulevala', 'Namacurra', 'Namarroi', 'Nicoadala', 'Pebane', 'Quelimane'],
  'Nampula': ['Angoche', 'Eráti', 'Ilha de Moçambique', 'Lalaua', 'Larde', 'Liúpo', 'Macomia', 'Mecubúri', 'Memba', 'Mogincual', 'Mogovolas', 'Moma', 'Monapo', 'Mossuril', 'Muecate', 'Murrupula', 'Nacala-a-Velha', 'Nacala Porto', 'Nampula', 'Rapale', 'Ribáuè'],
  'Cabo Delgado': ['Ancuabe', 'Balama', 'Chiúre', 'Ibo', 'Macomia', 'Mecúfi', 'Meluco', 'Metuge', 'Mocímboa da Praia', 'Montepuez', 'Mueda', 'Muidumbe', 'Namuno', 'Nangade', 'Palma', 'Pemba', 'Quissanga'],
  'Niassa': ['Chimbonila', 'Cuamba', 'Lago', 'Lichinga', 'Majune', 'Mandimba', 'Marrupa', 'Maúa', 'Mavago', 'Mecanhelas', 'Mecula', 'Metarica', 'Muembe', 'N\'gauma', 'Nipepe', 'Sanga']
};

// Removed local interface because it is imported

const UNIDADES_ORGANICAS = [
  'Direção Geral',
  'DICOSAFA',
  'DICOSSER',
  'Divisão de Engenharia',
  'Departamento de Recursos Humanos',
  'Repartição de Pessoal',
  'Repartição de Formação',
  'Repartição de Apoio Social',
  'Departamento de Finanças',
  'Repartição de Plano e Orçamento',
  'Repartição de Tesouraria',
  'Departamento de Património',
  'Repartição de Infraestrutura',
  'Repartição de Transporte',
  'Repartição de Manutenção',
  'Secretaria Geral',
  'Departamento TIC',
  'Departamento Lar de Estudantes',
  'Departamento de Produção Alimentar',
  'Departamento de Registo Académico',
  'Departamento de Assuntos Estudantis',
  'Departamento de Biblioteca',
  'Repartição de Documentos',
  'Repartição de Arquivo'
];

export default function GestaoPessoalView({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'menu' | 'lista' | 'detalhes' | 'actualizar' | 'alocar' | 'processo_form' | 'gestao_processo'>('menu');
  const [isProcessing, setIsProcessing] = useState(false);
  const [filtro, setFiltro] = useState<{ tipo?: 'Docente' | 'CTA', efetivo?: boolean } | null>(null);
  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [processos, setProcessos] = useState<any[]>([]);

  const [colaboradores, setColaboradores] = useState<Colaborador[]>(EFETIVO_GERAL_DATA);

  // Updated requested filtering metrics
  const statsMetrics = {
    docenteQuadro: colaboradores.filter(c => c.tipo.toUpperCase() === 'DOCENTE' && ['pertence ao quadro', 'definitivo'].includes(c.tipoRelacaoContractual.toLowerCase())).length,
    docenteNaoQuadro: colaboradores.filter(c => c.tipo.toUpperCase() === 'DOCENTE' && ['não pertence ao quadro', 'contratado'].includes(c.tipoRelacaoContractual.toLowerCase())).length,
    ctaQuadro: colaboradores.filter(c => c.tipo.toUpperCase() === 'CTA' && ['pertence ao quadro', 'definitivo'].includes(c.tipoRelacaoContractual.toLowerCase())).length,
    ctaNaoQuadro: colaboradores.filter(c => c.tipo.toUpperCase() === 'CTA' && ['não pertence ao quadro', 'contratado'].includes(c.tipoRelacaoContractual.toLowerCase())).length,
  };

  const filteredList = colaboradores
    .filter(c => {
      const matchesSearch = c.nome.toLowerCase().includes(searchTerm.toLowerCase());
      if (!filtro) return matchesSearch;
      const matchesTipo = filtro.tipo ? c.tipo === filtro.tipo : true;
      const matchesEfetivo = filtro.efetivo !== undefined ? c.efetivo === filtro.efetivo : true;
      return matchesSearch && matchesTipo && matchesEfetivo;
    })
    .sort((a, b) => a.nome.localeCompare(b.nome));

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedColaborador) {
      setIsProcessing(true);
      setTimeout(() => {
        setColaboradores(prev => prev.map(c => c.id === selectedColaborador.id ? selectedColaborador : c));
        setView('detalhes');
        setIsProcessing(false);
      }, 1500);
    }
  };

  const handleAlocar = (unidade: string) => {
    if (selectedColaborador) {
      setIsProcessing(true);
      setTimeout(() => {
        const updated = { ...selectedColaborador, unidade };
        setColaboradores(prev => prev.map(c => c.id === updated.id ? updated : c));
        setSelectedColaborador(updated);
        setView('detalhes');
        setIsProcessing(false);
      }, 1500);
    }
  };

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Colaborador | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [isDigitalizing, setIsDigitalizing] = useState(false);
  const [digitalizeProgress, setDigitalizeProgress] = useState(0);
  const [digitalizeStep, setDigitalizeStep] = useState('');

  const getReportTitle = () => {
    if (!filtro) return 'EFETIVO GERAL DE FUNCIONÁRIOS';
    if (filtro.tipo === 'Docente' && filtro.efetivo) return 'EFETIVO DO PESSOAL DOCENTE (QUADRO)';
    if (filtro.tipo === 'Docente' && !filtro.efetivo) return 'EFETIVO DO PESSOAL DOCENTE NÃO (QUADRO)';
    if (filtro.tipo === 'CTA' && filtro.efetivo) return 'EFETIVO DO PESSOAL CTA (QUADRO)';
    if (filtro.tipo === 'CTA' && !filtro.efetivo) return 'EFETIVO DO PESSOAL CTA NÃO (QUADRO)';
    return 'EFETIVO DE FUNCIONÁRIOS';
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  const handleDownload = (format: 'pdf' | 'excel') => {
    setShowDownloadMenu(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Download do relatório em formato ${format.toUpperCase()} iniciado com sucesso!`);
    }, 1500);
  };

  const handleGuardar = (c: Colaborador) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Guardado com sucesso!');
    }, 1000);
  };

  const handleRemove = (id: string) => {
    setColaboradores(prev => prev.filter(c => c.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      
      // Se for PDF, simular "Digitalização"
      if (file.type === 'application/pdf') {
        setIsDigitalizing(true);
        setDigitalizeProgress(0);
        
        const scanSteps = [
          { label: 'Lendo cabeçalho do PDF...', progress: 20 },
          { label: 'Executando OCR nas imagens...', progress: 50 },
          { label: 'Extraindo dados estruturados...', progress: 80 },
          { label: 'Validando registros extraídos...', progress: 100 }
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
          if (currentStep < scanSteps.length) {
            setDigitalizeStep(scanSteps[currentStep].label);
            setDigitalizeProgress(scanSteps[currentStep].progress);
            currentStep++;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              finishImport(file.name);
              setIsDigitalizing(false);
            }, 500);
          }
        }, 1000);
      } else {
        // Excel/CSV normal
        setTimeout(() => {
          finishImport(file.name);
        }, 2000);
      }
    }
  };

  const finishImport = (fileName: string) => {
    const novosColaboradores: Colaborador[] = [
      {
        id: Math.random().toString(36).substr(2, 9),
        ord: colaboradores.length + 1,
        nome: 'Novo Colaborador Importado 1',
        genero: 'M',
        dataNascimento: '1990-01-01',
        localNascimento: { pais: 'Moçambique', provincia: 'Maputo', distrito: 'Matola' },
        nuit: '111222333',
        numeroBI: '110000000000X',
        nivelAcademico: 'Mestrado',
        areaFormacao: 'Gestão',
        categoria: 'Técnico Superior',
        tipoContrato: 'Por Tempo Indeterminado',
        tipoRelacaoContractual: 'Nomeação Definitiva',
        email: 'novo1@ispg.ac.mz',
        tipo: 'CTA',
        efetivo: true,
        unidade: 'Departamento de Finanças',
        cargo: 'Técnico'
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        ord: colaboradores.length + 2,
        nome: 'Nova Colaboradora Importada 2',
        genero: 'F',
        dataNascimento: '1985-05-10',
        localNascimento: { pais: 'Moçambique', provincia: 'Sofala', distrito: 'Beira' },
        nuit: '444555666',
        numeroBI: '110000000000Y',
        nivelAcademico: 'Doutoramento',
        areaFormacao: 'Informática',
        categoria: 'Professor Auxiliar',
        tipoContrato: 'A Prazo Certo',
        tipoRelacaoContractual: 'Contrato',
        email: 'nova2@ispg.ac.mz',
        tipo: 'Docente',
        efetivo: false,
        unidade: 'Departamento TIC',
        cargo: 'Docente'
      }
    ];
    
    setColaboradores(prev => [...prev, ...novosColaboradores]);
    setIsProcessing(false);
    alert(`Ficheiro "${fileName}" processado e digitalizado com sucesso!\n\n2 colaboradores foram importados e alocados automaticamente.`);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (view === 'menu') {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 relative">
        {isProcessing && <LoadingSpinner />}
        
        {/* Modal de Digitalização */}
        <AnimatePresence>
          {isDigitalizing && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                  <motion.div 
                    className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="text-blue-600" size={32} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Transformando em Digital</h3>
                <p className="text-sm text-gray-500 mb-6">{digitalizeStep}</p>
                
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${digitalizeProgress}%` }}
                  />
                </div>
                <p className="text-[10px] font-bold text-blue-600 text-right uppercase">{digitalizeProgress}% Concluído</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 uppercase tracking-widest">Gestão de Pessoal</h2>
          
          <div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".csv, .pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleFileUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-md"
            >
              <Upload size={20} />
              Digitalizar Ficheiro
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MenuCard 
            title="Efetivo Geral" 
            icon={Users} 
            onClick={() => { setFiltro(null); setView('lista'); }} 
            description="Lista de todos os colaboradores"
          />
          <MenuCard 
            title="Processo Individual" 
            icon={ClipboardList} 
            onClick={() => setView('processo_form')} 
            description="Criar novo processo individual de funcionário"
            color="bg-orange-50 text-orange-600 group-hover:bg-orange-600"
          />
          <MenuCard 
            title="Gestão de Processo" 
            icon={FolderSearch} 
            onClick={() => setView('gestao_processo')} 
            description="Consultar e gerir processos individuais submetidos"
            color="bg-purple-50 text-purple-600 group-hover:bg-purple-600"
          />
          <MenuCard 
            title="Efetivo do Pessoal Docente (Quadro)" 
            icon={UserCheck} 
            onClick={() => { setFiltro({ tipo: 'Docente', efetivo: true }); setView('lista'); }} 
            description="Docentes do quadro"
            count={statsMetrics.docenteQuadro}
          />
          <MenuCard 
            title="Efetivo do Pessoal Docente Não (Quadro)" 
            icon={UserX} 
            onClick={() => { setFiltro({ tipo: 'Docente', efetivo: false }); setView('lista'); }} 
            description="Docentes contratados"
            count={statsMetrics.docenteNaoQuadro}
          />
          <MenuCard 
            title="Efetivo do Pessoal CTA (Quadro)" 
            icon={Briefcase} 
            onClick={() => { setFiltro({ tipo: 'CTA', efetivo: true }); setView('lista'); }} 
            description="Corpo Técnico Administrativo do quadro"
            count={statsMetrics.ctaQuadro}
          />
          <MenuCard 
            title="Efetivo do Pessoal CTA Não (Quadro)" 
            icon={Archive} 
            onClick={() => { setFiltro({ tipo: 'CTA', efetivo: false }); setView('lista'); }} 
            description="Corpo Técnico Administrativo contratado"
            count={statsMetrics.ctaNaoQuadro}
          />
        </div>
      </div>
    );
  }

  if (view === 'lista') {
    return (
      <div className="w-full max-w-none">
        <div className="flex items-center justify-between mb-6 px-4">
          <button onClick={() => setView('menu')} className="flex items-center gap-2 text-gray-500 hover:text-blue-900 transition-colors">
            <ArrowLeft size={20} /> Voltar ao Menu
          </button>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Pesquisar nome..." 
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setFiltro(null)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${!filtro ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Todos
              </button>
            </div>
          </div>
        </div>

        {/* DISTRIBUIÇÃO POR VÍNCULO METRICS */}
        {!filtro && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-4">
             <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-sm">
               <h3 className="text-[11px] font-black text-blue-800 uppercase tracking-widest mb-2 h-8 flex items-center text-center">DOCENTE (QUADRO)</h3>
               <span className="text-4xl font-black text-blue-600 leading-none">{statsMetrics.docenteQuadro}</span>
             </div>
             <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-sm">
               <h3 className="text-[11px] font-black text-orange-800 uppercase tracking-widest mb-2 h-8 flex items-center text-center">DOCENTE NÃO (QUADRO)</h3>
               <span className="text-4xl font-black text-orange-600 leading-none">{statsMetrics.docenteNaoQuadro}</span>
             </div>
             <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-sm">
               <h3 className="text-[11px] font-black text-green-800 uppercase tracking-widest mb-2 h-8 flex items-center text-center">CTA (QUADRO)</h3>
               <span className="text-4xl font-black text-green-600 leading-none">{statsMetrics.ctaQuadro}</span>
             </div>
             <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-sm">
               <h3 className="text-[11px] font-black text-amber-800 uppercase tracking-widest mb-2 h-8 flex items-center text-center">CTA NÃO (QUADRO)</h3>
               <span className="text-4xl font-black text-amber-600 leading-none">{statsMetrics.ctaNaoQuadro}</span>
             </div>
          </div>
        )}

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-8 relative">
          {/* Download Button Top Right */}
          <div className="absolute top-8 right-8">
            <div className="relative">
              <button 
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-bold text-sm"
              >
                <Download size={16} /> Download
              </button>
              {showDownloadMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <button onClick={() => handleDownload('pdf')} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 text-gray-700 transition-colors">
                    <FileText size={18} className="text-red-500" /> Formato PDF
                  </button>
                  <button onClick={() => handleDownload('excel')} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-green-50 text-gray-700 transition-colors">
                    <FileSpreadsheet size={18} className="text-green-600" /> Formato Excel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            {/* Logo Upload */}
            <div 
              className="w-24 h-24 mb-4 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden relative group"
              onClick={() => logoInputRef.current?.click()}
            >
              {logoUrl ? (
                <>
                  <img src={logoUrl} alt="Logótipo" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs font-bold">Alterar</div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <ImagePlus size={24} className="mb-1" />
                  <span className="text-[10px] font-bold uppercase text-center leading-tight">Logótipo</span>
                </div>
              )}
            </div>
            <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
            
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Instituto Superior Politécnico de Songo</h1>
            <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider">{getReportTitle()}</h2>
          </div>
        </div>

        <div className="bg-white shadow-xl border-y border-gray-100 overflow-x-auto pb-32">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="text-xs">
              <tr className="bg-gray-50">
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Ord.</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Nome Completo</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Género</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Data de Nascimento</th>
                <th colSpan={3} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Local de Nascimento</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">NUIT</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Nº B.I.</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Nível Académico</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Área de Formação</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Categoria</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Tipo de Contrato</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Tipo de relação contractual</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Função</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Cargo de Chefia</th>
                <th rowSpan={2} className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Ações</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">País</th>
                <th className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Província</th>
                <th className="p-2 border border-gray-200 font-bold text-gray-600 text-center align-middle">Distrito</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filteredList.map(c => editingId === c.id ? (
                <tr key={c.id} className="bg-blue-50/50">
                  <td className="p-2 border border-gray-200 text-center font-bold text-gray-900">{c.ord}</td>
                  <td className="p-2 border border-gray-200">
                    <input 
                      type="text" 
                      value={editFormData?.nome || ''} 
                      onChange={e => setEditFormData({...editFormData!, nome: e.target.value})}
                      className="w-full p-1 border border-gray-300 rounded"
                      autoFocus
                    />
                  </td>
                  <td className="p-2 border border-gray-200">
                    <select 
                      value={editFormData?.genero || ''} 
                      onChange={e => setEditFormData({...editFormData!, genero: e.target.value, localNascimento: {...editFormData!.localNascimento, pais: e.target.value === 'M' ? 'Moçambicano' : e.target.value === 'F' ? 'Moçambicana' : editFormData!.localNascimento.pais}})}
                      className="w-full p-1 border border-gray-300 rounded"
                    >
                      <option value=""></option>
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>
                  </td>
                  <td className="p-2 border border-gray-200">
                    <input 
                      type="date" 
                      value={editFormData?.dataNascimento || ''} 
                      onChange={e => setEditFormData({...editFormData!, dataNascimento: e.target.value})}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="p-2 border border-gray-200">
                    <input 
                      type="text" 
                      value={editFormData?.localNascimento.pais || ''} 
                      onChange={e => setEditFormData({...editFormData!, localNascimento: {...editFormData!.localNascimento, pais: e.target.value}})}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="p-2 border border-gray-200">
                    <select 
                      value={editFormData?.localNascimento.provincia || ''} 
                      onChange={e => setEditFormData({...editFormData!, localNascimento: {...editFormData!.localNascimento, provincia: e.target.value, distrito: ''}})}
                      className="w-full p-1 border border-gray-300 rounded"
                    >
                      <option value=""></option>
                      {Object.keys(PROVINCIAS_DISTRITOS).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </td>
                  <td className="p-2 border border-gray-200">
                    <select 
                      value={editFormData?.localNascimento.distrito || ''} 
                      onChange={e => setEditFormData({...editFormData!, localNascimento: {...editFormData!.localNascimento, distrito: e.target.value}})}
                      className="w-full p-1 border border-gray-300 rounded"
                      disabled={!editFormData?.localNascimento.provincia}
                    >
                      <option value=""></option>
                      {editFormData?.localNascimento.provincia && PROVINCIAS_DISTRITOS[editFormData.localNascimento.provincia]?.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </td>
                  <td className="p-2 border border-gray-200">
                    <input 
                      type="text" 
                      value={editFormData?.nuit || ''} 
                      onChange={e => setEditFormData({...editFormData!, nuit: e.target.value})}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="p-2 border border-gray-200">
                    <input 
                      type="text" 
                      value={editFormData?.numeroBI || ''} 
                      onChange={e => setEditFormData({...editFormData!, numeroBI: e.target.value})}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="p-2 border border-gray-200">
                    <select 
                      value={editFormData?.nivelAcademico || ''} 
                      onChange={e => setEditFormData({...editFormData!, nivelAcademico: e.target.value})}
                      className="w-full p-1 border border-gray-300 rounded"
                    >
                      <option value=""></option>
                      <option value="Médio">Médio</option>
                      <option value="Licenciatura">Licenciatura</option>
                      <option value="Mestrado">Mestrado</option>
                      <option value="Doutoramento">Doutoramento</option>
                    </select>
                  </td>
                  <td className="p-2 border border-gray-200">
                    <input 
                      type="text" 
                      value={editFormData?.areaFormacao || ''} 
                      onChange={e => setEditFormData({...editFormData!, areaFormacao: e.target.value})}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="p-2 border border-gray-200">
                    <input 
                      type="text" 
                      value={editFormData?.categoria || ''} 
                      onChange={e => setEditFormData({...editFormData!, categoria: e.target.value})}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="p-2 border border-gray-200">
                    <select 
                      value={editFormData?.tipoContrato || ''} 
                      onChange={e => setEditFormData({...editFormData!, tipoContrato: e.target.value})}
                      className="w-full p-1 border border-gray-300 rounded"
                    >
                      <option value=""></option>
                      <option value="A Prazo Certo">A Prazo Certo</option>
                      <option value="Por Tempo Indeterminado">Por Tempo Indeterminado</option>
                      <option value="Prestação de Serviços">Prestação de Serviços</option>
                    </select>
                  </td>
                  <td className="p-2 border border-gray-200">
                    <select 
                      value={editFormData?.tipoRelacaoContractual || ''} 
                      onChange={e => setEditFormData({...editFormData!, tipoRelacaoContractual: e.target.value})}
                      className="w-full p-1 border border-gray-300 rounded"
                    >
                      <option value=""></option>
                      <option value="Nomeação Definitiva">Nomeação Definitiva</option>
                      <option value="Nomeação Provisória">Nomeação Provisória</option>
                      <option value="Contrato">Contrato</option>
                      <option value="Comissão de Serviço">Comissão de Serviço</option>
                    </select>
                  </td>
                  <td className="p-2 border border-gray-200">
                    <select 
                      value={editFormData?.cargo || ''} 
                      onChange={e => setEditFormData({...editFormData!, cargo: e.target.value})}
                      className="w-full p-1 border border-gray-300 rounded"
                      title="Selecione a função do colaborador"
                    >
                      <option value=""></option>
                      {LISTA_FUNCOES.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </td>
                  <td className="p-2 border border-gray-200">
                    <select 
                      value={editFormData?.cargoChefia || ''} 
                      onChange={e => setEditFormData({...editFormData!, cargoChefia: e.target.value})}
                      className="w-full p-1 border border-gray-300 rounded"
                      title="Selecione o cargo de chefia, se aplicável"
                    >
                      <option value=""></option>
                      {LISTA_CARGOS_CHEFIA.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="p-2 border border-gray-200 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => {
                          const isDocente = editFormData?.cargo === 'Docente';
                          const isQuadro = ['Nomeação Definitiva', 'Comissão de Serviço'].includes(editFormData?.tipoRelacaoContractual || '');
                          
                          const updatedColaborador = {
                            ...editFormData!,
                            tipo: isDocente ? 'Docente' : 'CTA',
                            efetivo: isQuadro
                          };
                          
                          setColaboradores(prev => prev.map(col => col.id === c.id ? updatedColaborador : col));
                          setEditingId(null);
                        }}
                        className="text-green-600 hover:text-green-800 p-1 rounded-lg hover:bg-green-50 transition-colors"
                        title="Guardar"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if (!c.nome) {
                            setColaboradores(prev => prev.filter(col => col.id !== c.id));
                          }
                          setEditingId(null);
                        }}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Cancelar"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr 
                  key={c.id} 
                  className="hover:bg-blue-50/50 transition-colors group"
                >
                  <td className="p-2 border border-gray-200 text-center font-bold text-gray-900">{c.ord}</td>
                  <td className="p-2 border border-gray-200 font-bold text-gray-900 whitespace-nowrap relative">
                    <div 
                      className="cursor-pointer text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === c.id ? null : c.id);
                        setSelectedColaborador(c);
                      }}
                    >
                      {c.nome || <span className="text-gray-400 italic">(Sem Nome)</span>}
                    </div>
                    {activeDropdown === c.id && (
                      <div className="absolute left-2 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
                        <button 
                          className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                          onClick={(e) => { e.stopPropagation(); setView('detalhes'); setActiveDropdown(null); }}
                        >
                          Abrir
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setEditingId(c.id);
                            setEditFormData(c);
                            setActiveDropdown(null); 
                          }}
                        >
                          Actualizar
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
                          onClick={(e) => { e.stopPropagation(); setView('alocar'); setActiveDropdown(null); }}
                        >
                          Alocar
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600"
                          onClick={(e) => { e.stopPropagation(); handleRemove(c.id); setActiveDropdown(null); }}
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.genero}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600 whitespace-nowrap">{c.dataNascimento}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.localNascimento.pais}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.localNascimento.provincia}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.localNascimento.distrito}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.nuit}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.numeroBI}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.nivelAcademico}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.areaFormacao}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.categoria}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.tipoContrato}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.tipoRelacaoContractual}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.cargo || '-'}</td>
                  <td className="p-2 border border-gray-200 text-center text-gray-600">{c.cargoChefia || '-'}</td>
                  <td className="p-2 border border-gray-200 text-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRemove(c.id); }}
                      className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remover"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr 
                className="bg-blue-50/30 hover:bg-blue-50 transition-colors cursor-pointer group"
                onClick={() => {
                  const novoColaborador: Colaborador = {
                    id: Math.random().toString(36).substr(2, 9),
                    ord: colaboradores.length + 1,
                    nome: '',
                    genero: 'M',
                    dataNascimento: '',
                    localNascimento: { pais: '', provincia: '', distrito: '' },
                    nuit: '',
                    numeroBI: '',
                    nivelAcademico: '',
                    areaFormacao: '',
                    categoria: '',
                    tipoContrato: '',
                    tipoRelacaoContractual: '',
                    email: '',
                    tipo: (filtro?.tipo as 'Docente' | 'CTA') || 'Docente',
                    efetivo: filtro?.efetivo ?? true,
                    unidade: '',
                    cargo: ''
                  };
                  setColaboradores([...colaboradores, novoColaborador]);
                  setEditingId(novoColaborador.id);
                  setEditFormData(novoColaborador);
                }}
              >
                <td colSpan={15} className="p-4 border border-gray-200 text-center">
                  <div className="flex items-center justify-center gap-2 text-blue-600 font-bold group-hover:text-blue-800">
                    <Plus size={18} /> Adicionar Novo Registo
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (view === 'detalhes' && selectedColaborador) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="flex justify-between items-start mb-8">
          <button onClick={() => setView('lista')} className="flex items-center gap-2 text-gray-500 hover:text-blue-900 transition-colors">
            <ArrowLeft size={20} /> Voltar à Lista
          </button>
          <div className="text-right">
            <h3 className="text-2xl font-bold text-blue-900 uppercase">Detalhes do Colaborador</h3>
            <p className="text-gray-500 text-sm">ID: {selectedColaborador.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <DetailItem label="Nome Completo" value={selectedColaborador.nome} />
          <DetailItem label="Email" value={selectedColaborador.email} />
          <DetailItem label="Tipo" value={selectedColaborador.tipo} />
          <DetailItem label="Efetivo" value={selectedColaborador.efetivo ? 'Sim' : 'Não'} />
          <DetailItem label="Unidade Atual" value={selectedColaborador.unidade} />
          <DetailItem label="Cargo/Função" value={selectedColaborador.cargo} />
          <DetailItem label="Nível Académico" value={selectedColaborador.nivelAcademico} />
          <DetailItem label="Área de Formação" value={selectedColaborador.areaFormacao} />
        </div>

        <div className="flex gap-4 pt-8 border-t border-gray-100">
          <button onClick={() => setView('actualizar')} className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-4 rounded-2xl font-bold hover:bg-blue-200 transition-colors">
            <Edit size={20} /> Actualizar Dados
          </button>
          <button onClick={() => setView('alocar')} className="flex-1 flex items-center justify-center gap-2 bg-purple-100 text-purple-700 py-4 rounded-2xl font-bold hover:bg-purple-200 transition-colors">
            <MapPin size={20} /> Alocar Colaborador
          </button>
        </div>
      </div>
    );
  }

  if (view === 'actualizar' && selectedColaborador) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        {isProcessing && <LoadingSpinner />}
        <h3 className="text-2xl font-bold text-blue-900 mb-6 uppercase">Actualizar Dados</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nome</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-xl border border-gray-200" 
              value={selectedColaborador.nome} 
              onChange={e => setSelectedColaborador({...selectedColaborador, nome: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 rounded-xl border border-gray-200" 
              value={selectedColaborador.email} 
              onChange={e => setSelectedColaborador({...selectedColaborador, email: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Província</label>
              <select 
                className="w-full px-4 py-2 rounded-xl border border-gray-200"
                value={selectedColaborador.localNascimento.provincia}
                onChange={e => setSelectedColaborador({
                  ...selectedColaborador, 
                  localNascimento: { ...selectedColaborador.localNascimento, provincia: e.target.value, distrito: '' }
                })}
              >
                <option value="">Selecione...</option>
                {Object.keys(PROVINCIAS_DISTRITOS).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Distrito</label>
              <select 
                className="w-full px-4 py-2 rounded-xl border border-gray-200"
                value={selectedColaborador.localNascimento.distrito}
                onChange={e => setSelectedColaborador({
                  ...selectedColaborador, 
                  localNascimento: { ...selectedColaborador.localNascimento, distrito: e.target.value }
                })}
                disabled={!selectedColaborador.localNascimento.provincia}
              >
                <option value="">Selecione...</option>
                {selectedColaborador.localNascimento.provincia && PROVINCIAS_DISTRITOS[selectedColaborador.localNascimento.provincia]?.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Cargo</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-xl border border-gray-200" 
                value={selectedColaborador.cargo} 
                onChange={e => setSelectedColaborador({...selectedColaborador, cargo: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Efetivo</label>
              <select 
                className="w-full px-4 py-2 rounded-xl border border-gray-200"
                value={selectedColaborador.efetivo ? 'true' : 'false'}
                onChange={e => setSelectedColaborador({...selectedColaborador, efetivo: e.target.value === 'true'})}
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={() => setView('detalhes')} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Guardar Alterações</button>
          </div>
        </form>
      </div>
    );
  }

  if (view === 'alocar' && selectedColaborador) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        {isProcessing && <LoadingSpinner />}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-blue-900 uppercase">Alocar Colaborador</h3>
          <button onClick={() => setView('detalhes')} className="text-gray-400 hover:text-gray-600"><ArrowLeft size={24} /></button>
        </div>
        <p className="text-gray-600 mb-6">Selecione a nova unidade orgânica para <strong>{selectedColaborador.nome}</strong>:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {UNIDADES_ORGANICAS.map(unidade => (
            <button 
              key={unidade}
              onClick={() => handleAlocar(unidade)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedColaborador.unidade === unidade ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">{unidade}</span>
                {selectedColaborador.unidade === unidade && <UserCheck size={20} className="text-blue-600" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'processo_form') {
    return (
      <IndividualProcessForm 
        onClose={() => setView('menu')}
        onSubmit={(data) => {
          const id = Math.random().toString(36).substr(2, 9);
          
          // 1. Criar Registo no Efetivo Geral (Colaboradores)
          const novoColaborador: Colaborador = {
            id: id,
            ord: colaboradores.length + 1,
            nome: data.nome,
            genero: data.genero as 'M' | 'F',
            dataNascimento: data.dataNascimento,
            localNascimento: { 
              pais: 'Moçambique', 
              provincia: data.naturalidade || '', 
              distrito: '' 
            },
            nuit: data.nuit || '---',
            numeroBI: data.biNo,
            nivelAcademico: data.habilitacoesLiterarias,
            areaFormacao: data.habilitacoesProfissionais,
            categoria: data.categoria,
            tipoContrato: 'Contratado',
            tipoRelacaoContractual: 'Contrato',
            email: `${data.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('.')}@isps.ac.mz`,
            tipo: data.categoria.toLowerCase().includes('docente') || data.seccao.toLowerCase().includes('docente') ? 'Docente' : 'CTA',
            efetivo: false,
            unidade: data.seccao,
            cargo: data.categoria
          };

          // 2. Criar Registo na Gestão de Processos com uploads
          const novoProcesso = {
            id: id,
            nome: data.nome,
            nuit: data.nuit || '---', 
            seccao: data.seccao,
            dataSubmissao: new Date().toISOString().split('T')[0],
            processoNo: data.processoNo || `P-${new Date().getFullYear()}-${(processos.length + 1).toString().padStart(3, '0')}`,
            status: 'Pendente',
            ficheiros: data.ficheiros || []
          };

          setColaboradores(prev => [...prev, novoColaborador]);
          setProcessos(prev => [novoProcesso, ...prev]);
          
          setView('gestao_processo');
          alert('Processo Individual finalizado com sucesso! Os dados foram integrados no Efetivo Geral e uma cópia digital foi arquivada na Gestão de Processos.');
        }}
      />
    );
  }

  if (view === 'gestao_processo') {
    return (
      <ProcessManagementView 
        onBack={() => setView('menu')}
        processos={processos}
      />
    );
  }

  return null;
}

function MenuCard({ title, icon: Icon, onClick, description, color, count }: { title: string, icon: any, onClick: () => void, description: string, color?: string, count?: number }) {
  return (
    <button 
      onClick={onClick}
      className="bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm hover:border-blue-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-4 group relative"
    >
      {count !== undefined && (
        <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-sm">
          {count}
        </div>
      )}
      <div className={`p-4 rounded-2xl transition-colors ${color || 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
        <Icon size={32} />
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
      <p className="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}
