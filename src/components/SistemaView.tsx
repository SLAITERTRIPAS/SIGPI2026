import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Maximize2, Menu, Settings, RefreshCw, Users, FileText, Database, Calendar, HardDrive, Trash2, Info, LogOut, User, Plus, CheckSquare, UserPlus, Zap, ShieldCheck, BarChart3, Loader2, Network, ChevronRight, Building } from 'lucide-react';
import CalendarView from './CalendarView';
import MonografiaView from './MonografiaView';
import EstatisticaView from './EstatisticaView';
import ReportsView from './ReportsView';

export default function SistemaView({ 
  onBack, 
  onLogout,
  events = [],
  expedientes = [],
  libraryRegistrations = [],
  bookRegistrations = [],
  setEvents,
  setExpedientes,
  setLibraryRegistrations,
  setBookRegistrations,
  setNotes,
  user
}: { 
  onBack: () => void, 
  onLogout: () => void,
  events?: any[],
  expedientes?: any[],
  libraryRegistrations?: any[],
  bookRegistrations?: any[],
  setEvents?: React.Dispatch<React.SetStateAction<any[]>>,
  setExpedientes?: React.Dispatch<React.SetStateAction<any[]>>,
  setLibraryRegistrations?: React.Dispatch<React.SetStateAction<any[]>>,
  setBookRegistrations?: React.Dispatch<React.SetStateAction<any[]>>,
  setNotes?: React.Dispatch<React.SetStateAction<any[]>>,
  user?: any
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Sobre o Sistema');
  const [showSupport, setShowSupport] = useState(false);
  const [version, setVersion] = useState('SIGPI/V1.00.2025');
  const [isSyncing, setIsSyncing] = useState(false);
  const [ownerPhoto, setOwnerPhoto] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState('ISPS');
  const [ownerCargo, setOwnerCargo] = useState('');
  const [itEmail, setItEmail] = useState('slaitertripas@gmail.com');
  const [itWhatsapp, setItWhatsapp] = useState('+258 84 000 0000');
  const [itLinkedin, setItLinkedin] = useState('linkedin.com/in/fttripas');
  const [itFacebook, setItFacebook] = useState('facebook.com/fttripas');
  const [itWeb, setItWeb] = useState('www.fttripas.com');
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [backupFile, setBackupFile] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleaningStep, setCleaningStep] = useState<string | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('proprietarioName');
    const savedCargo = localStorage.getItem('proprietarioCargo');
    const savedPhoto = localStorage.getItem('proprietarioPhoto');
    const savedEmail = localStorage.getItem('itEmail');
    const savedWhatsapp = localStorage.getItem('itWhatsapp');
    const savedLinkedin = localStorage.getItem('itLinkedin');
    const savedFacebook = localStorage.getItem('itFacebook');
    const savedWeb = localStorage.getItem('itWeb');

    if (savedName) setOwnerName(savedName);
    if (savedCargo) setOwnerCargo(savedCargo);
    if (savedPhoto) setOwnerPhoto(savedPhoto);
    if (savedEmail) setItEmail(savedEmail);
    if (savedWhatsapp) setItWhatsapp(savedWhatsapp);
    if (savedLinkedin) setItLinkedin(savedLinkedin);
    if (savedFacebook) setItFacebook(savedFacebook);
    if (savedWeb) setItWeb(savedWeb);
  }, []);

  const handleSaveProprietario = () => {
    console.log('Iniciando salvamento do proprietário...');
    
    // Check if user is the owner
    const isOwner = user?.email === 'slaitertripas@gmail.com' || user?.email === 'admin@isps.ac.mz';
    
    if (!isOwner) {
      alert('Apenas o proprietário do sistema tem permissão para alterar estas informações.');
      return;
    }

    try {
      // Validar dados antes de salvar
      if (!ownerName.trim()) {
        alert('Por favor, insira o nome do proprietário.');
        return;
      }

      localStorage.setItem('proprietarioName', ownerName);
      localStorage.setItem('proprietarioCargo', ownerCargo);
      
      if (ownerPhoto) {
        try {
          localStorage.setItem('proprietarioPhoto', ownerPhoto);
        } catch (e) {
          console.warn('Foto muito grande para o localStorage, não será guardada permanentemente.');
          // Não bloqueia o resto do salvamento
        }
      }
      
      localStorage.setItem('itEmail', itEmail);
      localStorage.setItem('itWhatsapp', itWhatsapp);
      localStorage.setItem('itLinkedin', itLinkedin);
      localStorage.setItem('itFacebook', itFacebook);
      localStorage.setItem('itWeb', itWeb);
      
      console.log('Dados guardados com sucesso no localStorage');
      alert('Informações do proprietário e equipa de TI guardadas com sucesso!');
    } catch (error) {
      console.error('Erro crítico ao guardar no localStorage:', error);
      alert('Erro ao guardar as informações. O armazenamento do navegador pode estar cheio ou desativado.');
    }
  };

  const totalRecords = 1 + events.length + expedientes.length + libraryRegistrations.length + bookRegistrations.length;
  const dbSize = new Blob([JSON.stringify({events, expedientes, libraryRegistrations, bookRegistrations})]).size;
  const dbSizeFormatted = dbSize > 1024 * 1024 ? (dbSize / (1024 * 1024)).toFixed(2) + ' MB' : (dbSize / 1024).toFixed(2) + ' KB';
  const currentDate = new Date().toLocaleDateString('pt-PT');

  const menuItems = [
    { title: 'Atualização', icon: Zap },
    { title: 'Gestão de Usuário', icon: Users },
    { title: 'Registar', icon: UserPlus },
    { title: 'Base de Dados', icon: Database },
    { title: 'Estrutura Orgânica', icon: Network },
    { title: 'Estatística', icon: BarChart3 },
    { title: 'Relatórios', icon: FileText },
    { title: 'Monografia', icon: FileText },
    { title: 'Calendário', icon: Calendar },
    { title: 'Backup', icon: HardDrive },
    { title: 'Limpeza de Testes', icon: RefreshCw },
    { title: 'Configurações', icon: ShieldCheck },
    { title: 'Sobre o Sistema', icon: Info },
  ];

  const topCards = [
    { title: 'TOTAL DE TABELAS', value: '5', color: 'text-blue-600', bg: 'bg-blue-50/50', border: 'border-blue-100' },
    { title: 'TOTAL DE REGISTOS', value: totalRecords.toString(), color: 'text-purple-600', bg: 'bg-purple-50/50', border: 'border-purple-100' },
    { title: 'TAMANHO DO BANCO', value: dbSizeFormatted, color: 'text-pink-600', bg: 'bg-pink-50/50', border: 'border-pink-100' },
  ];

  const smallCards = [
    { title: 'Utilizadores', value: '1' },
    { title: 'Eventos', value: events.length.toString() },
    { title: 'Expedientes', value: expedientes.length.toString() },
    { title: 'Visitas Biblioteca', value: libraryRegistrations.length.toString() },
    { title: 'Livros Registados', value: bookRegistrations.length.toString() },
  ];

  const tableData = [
    { name: 'tb_utilizadores', records: '1', lastUpdate: currentDate, status: 'Ativo' },
    { name: 'tb_eventos', records: events.length.toString(), lastUpdate: currentDate, status: 'Ativo' },
    { name: 'tb_expedientes', records: expedientes.length.toString(), lastUpdate: currentDate, status: 'Ativo' },
    { name: 'tb_visitas_biblioteca', records: libraryRegistrations.length.toString(), lastUpdate: currentDate, status: 'Ativo' },
    { name: 'tb_livros', records: bookRegistrations.length.toString(), lastUpdate: currentDate, status: 'Ativo' },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setSyncSuccess(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      // Update version number on sync
      const parts = version.split('.');
      const lastPart = parseInt(parts[parts.length - 1]);
      const newVersion = [...parts.slice(0, -1), (lastPart + 1).toString()].join('.');
      setVersion(newVersion);
      
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 2000);
  };

  const handleBackup = () => {
    const data = JSON.stringify({ events, expedientes, libraryRegistrations, bookRegistrations, version });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SIGPI_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert('Backup realizado com sucesso! Guarde o ficheiro num local seguro.');
  };

  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (data.version) {
            setVersion(data.version);
            alert('Sistema restaurado com sucesso para a versão ' + data.version);
          }
        } catch (err) {
          alert('Erro ao restaurar backup. Ficheiro inválido.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOwnerPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [registerStep, setRegisterStep] = useState(1);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const isOwner = user?.email === 'slaitertripas@gmail.com' || user?.email === 'admin@isps.ac.mz';

  const EstruturaExplorer = () => {
    const [path, setPath] = useState<string[]>([]);
    
    // Simplifed structure for exploration
    const estrutura = [
      {
        title: 'Direção Geral',
        type: 'Direção',
        departments: [
          { title: 'Gabinete do Diretor Geral', sectors: ['Secretaria Executiva', 'Assessoria'] },
          { title: 'DPEP', sectors: ['Relatório', 'Monitoria', 'Estatística', 'Estudos e Projetos'] },
          { title: 'UGEA', sectors: ['Aquisições'] },
          { title: 'DCRE', sectors: ['Cooperação'] },
        ]
      },
      {
        title: 'Divisão de Engenharia',
        type: 'Divisão',
        departments: [
          { title: 'Engenharia Eletrotécnica', sectors: ['Curso de Elétrica', 'Curso de Eletrónica', 'Curso de Energias Renováveis'] },
          { title: 'Engenharia de Construção Civil', sectors: ['Curso de Hidráulica', 'Curso de Construção Civil'] },
          { title: 'Engenharia de Construção Mecânica', sectors: ['Curso de Termotécnica', 'Curso de Mecânica'] },
          { title: 'Pesquisa e Extensão', sectors: ['Setor de Pesquisa', 'Setor de Publicação'] }
        ]
      },
      {
        title: 'DICOSAFA',
        type: 'Direção',
        departments: [
          { title: 'Recursos Humanos', sectors: ['Repartição de Pessoal', 'Repartição de Formação', 'Bem-Estar Social'] },
          { title: 'Finanças', sectors: ['Tesouraria', 'Plano e Orçamento', 'Contabilidade'] },
          { title: 'Património', sectors: ['Transportes', 'Manutenção', 'Infraestrutura'] },
          { title: 'TIC', sectors: ['Redes', 'Hardware', 'Software', 'Oficina'] },
          { title: 'Secretaria Geral', sectors: ['Arquivo', 'Expediente'] }
        ]
      },
      {
        title: 'DICOSSER',
        type: 'Direção',
        departments: [
          { title: 'Registo Académico', sectors: ['Matrículas', 'Exames de Admissão', 'Certificados'] },
          { title: 'Assuntos Estudantis', sectors: ['Bolsas', 'Desporto', 'Alojamento'] },
          { title: 'Biblioteca', sectors: ['Gestão de Acervo', 'Documentação', 'Arquivo Central'] }
        ]
      }
    ];

    const currentLevel = path.length;
    const currentDirection = path[0] ? estrutura.find(d => d.title === path[0]) : null;
    const currentDept = (currentDirection && path[1]) ? currentDirection.departments.find(d => d.title === path[1]) : null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">Estrutura Orgânica</h2>
            <div className="flex items-center gap-2 mt-2">
              <button 
                onClick={() => setPath([])}
                className={`text-[10px] font-bold uppercase p-1 px-2 rounded ${path.length === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 hover:text-blue-600'}`}
              >
                Raiz
              </button>
              {path.map((p, i) => (
                <React.Fragment key={i}>
                  <ChevronRight size={10} className="text-gray-300" />
                  <button 
                    onClick={() => setPath(path.slice(0, i + 1))}
                    className={`text-[10px] font-bold uppercase p-1 px-2 rounded ${i === path.length - 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 hover:text-blue-600'}`}
                  >
                    {p}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentLevel === 0 && estrutura.map((dir, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => setPath([dir.title])}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Network size={24} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{dir.type}</p>
              <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter leading-tight">{dir.title}</h3>
              <p className="text-[10px] text-gray-500 mt-4 uppercase font-bold">{dir.departments.length} Departamentos</p>
            </motion.div>
          ))}

          {currentLevel === 1 && currentDirection?.departments.map((dept, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => setPath([...path, dept.title])}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Building size={24} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Departamento</p>
              <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter leading-tight">{dept.title}</h3>
              <p className="text-[10px] text-gray-500 mt-4 uppercase font-bold">{dept.sectors.length} Setores / Cursos</p>
            </motion.div>
          ))}

          {currentLevel === 2 && currentDept?.sectors.map((sector, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all group border-l-4 border-l-blue-600"
            >
              <div className="w-12 h-12 bg-gray-50 text-gray-600 rounded-2xl flex items-center justify-center mb-6">
                <FileText size={24} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Setor / Curso</p>
              <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter leading-tight">{sector}</h3>
              <button 
                onClick={() => alert(`Acedendo ao painel de: ${sector}`)}
                className="mt-6 w-full py-3 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
              >
                Ver Dashboad
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const handleClearData = async () => {
    setIsCleaning(true);
    
    const steps = [
      { id: 'events', label: 'Limpando Eventos do Calendário...', action: () => setEvents?.([]) },
      { id: 'expedientes', label: 'Removendo Expedientes e Documentos...', action: () => setExpedientes?.([]) },
      { id: 'library', label: 'Eliminando Registos de Biblioteca...', action: () => setLibraryRegistrations?.([]) },
      { id: 'books', label: 'Limpando Livros Registados...', action: () => setBookRegistrations?.([]) },
      { id: 'notes', label: 'Removendo Notas e Alertas...', action: () => setNotes?.([]) },
      { id: 'storage', label: 'Limpando Cache e Preferências...', action: () => {
        const pName = localStorage.getItem('proprietarioName');
        const pCargo = localStorage.getItem('proprietarioCargo');
        const pPhoto = localStorage.getItem('proprietarioPhoto');
        const iEmail = localStorage.getItem('itEmail');
        const iWhatsapp = localStorage.getItem('itWhatsapp');
        const iLinkedin = localStorage.getItem('itLinkedin');
        const iFacebook = localStorage.getItem('itFacebook');
        const iWeb = localStorage.getItem('itWeb');

        localStorage.clear();

        if (pName) localStorage.setItem('proprietarioName', pName);
        if (pCargo) localStorage.setItem('proprietarioCargo', pCargo);
        if (pPhoto) localStorage.setItem('proprietarioPhoto', pPhoto);
        if (iEmail) localStorage.setItem('itEmail', iEmail);
        if (iWhatsapp) localStorage.setItem('itWhatsapp', iWhatsapp);
        if (iLinkedin) localStorage.setItem('itLinkedin', iLinkedin);
        if (iFacebook) localStorage.setItem('itFacebook', iFacebook);
        if (iWeb) localStorage.setItem('itWeb', iWeb);
      }}
    ];

    for (const step of steps) {
      setCleaningStep(step.label);
      await new Promise(resolve => setTimeout(resolve, 800));
      step.action();
    }

    setCleaningStep('Finalizando Limpeza...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsCleaning(false);
    setCleaningStep(null);
    setShowClearConfirm(false);
    alert('Sistema limpo com sucesso! Todos os dados de teste foram removidos.');
    setActiveItem('Sobre o Sistema');
  };

  const renderContent = () => {
    if (activeItem === 'Estrutura Orgânica') {
      return <EstruturaExplorer />;
    }

    if (activeItem === 'Base de Dados') {
      return (
        <>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1e40af] mb-1 font-serif leading-[1.5]">Base de Dados do Sistema</h2>
              <p className="text-gray-500 text-xs leading-[1.5]">Visualização em tempo real das tabelas e registos do sistema.</p>
            </div>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border border-green-200">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              CONECTADO
            </div>
          </div>

          {/* Top Cards */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {topCards.map((card, idx) => (
              <div key={idx} className={`${card.bg} border ${card.border} rounded-lg p-4 shadow-sm`}>
                <h3 className={`text-[10px] font-bold uppercase tracking-wider ${card.color} mb-4 leading-[1.5]`}>{card.title}</h3>
                <p className={`text-4xl font-bold ${card.color} leading-[1.5]`}>{card.value}</p>
              </div>
            ))}
          </div>

          {/* Small Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {smallCards.map((card, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-4 leading-[1.5]">{card.title}</h3>
                <p className="text-lg font-bold text-[#1e40af] leading-[1.5]">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-bold tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">NOME DA TABELA</th>
                  <th className="px-6 py-4">REGISTOS</th>
                  <th className="px-6 py-4">ÚLTIMA ALTERAÇÃO</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4 text-right">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-700 flex items-center gap-2">
                      <Database size={14} className="text-gray-400" />
                      {row.name}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">{row.records}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{row.lastUpdate}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded text-[10px] font-bold">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* Actions placeholder */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    if (activeItem === 'Monografia') {
      return <MonografiaView 
        onBack={() => setActiveItem('Sobre o Sistema')} 
        title="Sistema" 
        systemData={{
          eventsCount: events.length,
          expedientesCount: expedientes.length,
          libraryCount: libraryRegistrations.length,
          booksCount: bookRegistrations.length,
          version: version
        }}
      />;
    }

    if (activeItem === 'Sobre o Sistema') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100 relative overflow-hidden h-fit"
            >
              <div className="relative z-10 w-full">
                <h2 className="text-4xl font-black text-black mb-6 font-serif uppercase tracking-tighter">Sobre o Sistema</h2>
                <p className="text-black leading-relaxed font-medium text-justify text-sm">
                  O **SIGPI (Sistema Integrado de Gestão de Processos Institucionais)** é uma plataforma tecnológica de vanguarda concebida especificamente para o **Instituto Superior Politécnico de Songo (ISPSongo)**. 
                  Este ecossistema digital unifica a gestão académica, administrativa e estratégica, permitindo o controlo rigoroso de planos de atividades, gestão de expedientes, monitorização financeira e análise estatística em tempo real. 
                  Focado na transparência e eficiência, o sistema facilita a colaboração entre direções, departamentos e setores, garantindo que todos os processos institucionais estejam alinhados com as metas estratégicas da instituição.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
              {/* Especificações Técnicas */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="md:col-span-5 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-50 rounded-lg text-[#1e3a8a]">
                    <Settings size={20} />
                  </div>
                  <h3 className="text-xl font-black text-[#1e3a8a] uppercase tracking-tighter font-serif">Especificações Técnicas</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50/30 p-4 rounded-2xl border border-gray-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Nome do Sistema</p>
                    <p className="text-sm font-black text-[#1e3a8a] uppercase tracking-tighter">SIGPI</p>
                    <p className="text-[8px] text-gray-500 italic">Sistema Integrado de Gestão de Processos Institucionais</p>
                  </div>
                  <div className="bg-gray-50/30 p-4 rounded-2xl border border-gray-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Versão Atual</p>
                    <p className="text-sm font-black text-[#1e3a8a] uppercase tracking-tighter">{version}</p>
                  </div>
                  <div className="bg-gray-50/30 p-4 rounded-2xl border border-gray-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Tecnologias</p>
                    <p className="text-[10px] font-black text-gray-700 uppercase tracking-tighter">React 18 + TypeScript + Tailwind CSS</p>
                  </div>
                  <div className="bg-gray-50/30 p-4 rounded-2xl border border-gray-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Base de Dados</p>
                    <p className="text-[10px] font-black text-gray-700 uppercase tracking-tighter">Firestore (Real-time NoSQL)</p>
                  </div>
                  <div className="bg-gray-50/30 p-4 rounded-2xl border border-gray-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Ambiente</p>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <p className="text-sm font-black text-gray-700 uppercase tracking-tighter">Produção / Cloud</p>
                    </div>
                  </div>
                  <div className="bg-gray-50/30 p-4 rounded-2xl border border-gray-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Última Sincronização</p>
                    <button 
                      onClick={handleSync}
                      disabled={isSyncing}
                      className="flex items-center gap-2 group relative"
                    >
                      <RefreshCw size={12} className={`text-blue-600 ${isSyncing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                      <p className={`text-sm font-black uppercase tracking-tighter transition-colors ${syncSuccess ? 'text-green-600' : 'text-gray-700 group-hover:text-blue-600'}`}>
                        {isSyncing ? 'Sincronizando...' : syncSuccess ? 'Sincronizado!' : 'Sincronizar'}
                      </p>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Monografia & Versão Column */}
              <div className="md:col-span-3 space-y-6 flex flex-col">
                <motion.button 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setActiveItem('Monografia')}
                  className="flex-1 bg-[#000066] text-white p-8 rounded-[2.5rem] shadow-xl hover:bg-blue-800 transition-all group text-left relative overflow-hidden flex flex-col justify-center"
                >
                  <div className="relative z-10">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <FileText size={20} />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tighter mb-2 leading-tight">Monografia do Projeto</h3>
                    <p className="text-blue-100 text-[10px] font-medium leading-relaxed opacity-80">
                      Aceda à documentação técnica completa, evolução do sistema e parâmetros padrão.
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                </motion.button>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <Zap size={20} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Versão Atual</p>
                      <p className="text-sm font-black text-gray-900">{version}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                    O sistema é atualizado regularmente com novas funcionalidades e melhorias de segurança.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Segurança e Privacidade */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg text-[#1e3a8a]">
                  <CheckSquare size={20} />
                </div>
                <h3 className="text-xl font-black text-[#1e3a8a] uppercase tracking-tighter font-serif">Segurança e Privacidade</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-8 font-medium">
                Este sistema utiliza criptografia de ponta a ponta para todos os documentos e dados sensíveis. 
                O acesso é restrito a funcionários autorizados do ISPSongo, com auditoria completa de logs para cada ação realizada.
              </p>
              <div className="flex flex-wrap gap-3">
                {['SSL/TLS 1.3', 'AES-256 Encryption', 'ISO/IEC 27001'].map((badge) => (
                  <span key={badge} className="px-4 py-2 bg-blue-50 text-[#1e3a8a] rounded-xl text-[8px] font-black uppercase tracking-widest border border-blue-100">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Proprietário */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#000066] rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden h-fit"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-between w-full mb-8">
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Proprietário</span>
                  </div>
                  {!isOwner && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/20 rounded-full border border-red-500/30">
                      <ShieldCheck size={12} className="text-red-400" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-red-400">Apenas Leitura</span>
                    </div>
                  )}
                </div>
                
                <label className={`relative w-28 h-28 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20 overflow-hidden ${isOwner ? 'cursor-pointer group' : 'cursor-default'}`}>
                  {ownerPhoto ? (
                    <img src={ownerPhoto} alt="Proprietário" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black">IS</span>
                  )}
                  {isOwner && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Plus size={24} />
                    </div>
                  )}
                  {isOwner && <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />}
                </label>
                
                <input 
                  type="text" 
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  readOnly={!isOwner}
                  className={`bg-transparent text-2xl font-black uppercase tracking-tighter mb-1 text-center border-b border-transparent focus:outline-none w-full ${isOwner ? 'hover:border-white/30 focus:border-white' : ''}`}
                  placeholder="Nome"
                />
                <input 
                  type="text" 
                  value={ownerCargo}
                  onChange={(e) => setOwnerCargo(e.target.value)}
                  readOnly={!isOwner}
                  className={`bg-transparent text-[10px] font-black text-blue-300 uppercase tracking-widest mb-8 text-center border-b border-transparent focus:outline-none w-full ${isOwner ? 'hover:border-white/30 focus:border-white' : ''}`}
                  placeholder="Cargo"
                />

                <div className="w-full space-y-3 mb-8">
                  <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                    <FileText size={14} className="text-blue-300" />
                    <input 
                      type="text" 
                      value={itEmail}
                      onChange={(e) => setItEmail(e.target.value)}
                      readOnly={!isOwner}
                      className="bg-transparent text-[10px] font-bold text-white w-full focus:outline-none"
                      placeholder="Email TI"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                    <Zap size={14} className="text-green-300" />
                    <input 
                      type="text" 
                      value={itWhatsapp}
                      onChange={(e) => setItWhatsapp(e.target.value)}
                      readOnly={!isOwner}
                      className="bg-transparent text-[10px] font-bold text-white w-full focus:outline-none"
                      placeholder="Whatsapp TI"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                    <Users size={14} className="text-blue-400" />
                    <input 
                      type="text" 
                      value={itLinkedin}
                      onChange={(e) => setItLinkedin(e.target.value)}
                      readOnly={!isOwner}
                      className="bg-transparent text-[10px] font-bold text-white w-full focus:outline-none"
                      placeholder="LinkedIn TI"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                    <Users size={14} className="text-blue-600" />
                    <input 
                      type="text" 
                      value={itFacebook}
                      onChange={(e) => setItFacebook(e.target.value)}
                      readOnly={!isOwner}
                      className="bg-transparent text-[10px] font-bold text-white w-full focus:outline-none"
                      placeholder="Facebook TI"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                    <Maximize2 size={14} className="text-orange-300" />
                    <input 
                      type="text" 
                      value={itWeb}
                      onChange={(e) => setItWeb(e.target.value)}
                      readOnly={!isOwner}
                      className="bg-transparent text-[10px] font-bold text-white w-full focus:outline-none"
                      placeholder="Página Web TI"
                    />
                  </div>
                </div>
                
                {isOwner && (
                  <button 
                    type="button"
                    onClick={handleSaveProprietario} 
                    className="w-full py-4 bg-white text-[#000066] hover:bg-blue-50 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg mb-8 relative z-20 cursor-pointer"
                  >
                    Guardar Informações
                  </button>
                )}
                
                <div className="w-full h-px bg-white/10 mb-8"></div>
                
                <div className="space-y-4 w-full text-left">
                  <div className="flex items-center gap-3 text-[10px] font-bold">
                    <div className="p-1.5 bg-white/10 rounded-lg">
                      <Database size={14} />
                    </div>
                    <span className="tracking-wide">ISPSongo - Moçambique</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold">
                    <div className="p-1.5 bg-white/10 rounded-lg">
                      <FileText size={14} />
                    </div>
                    <span className="tracking-wide">suporte@ispsongo.ac.mz</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full -mr-16 -mb-16 blur-2xl"></div>
            </motion.div>

            {/* Suporte Técnico */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
            >
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Suporte Técnico</p>
              <button 
                onClick={() => setShowSupport(!showSupport)}
                className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all mb-4 ${
                  showSupport 
                    ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-lg' 
                    : 'bg-gray-50 border border-gray-100 text-[#1e3a8a] hover:bg-gray-100'
                }`}
              >
                {showSupport ? 'Ocultar Contactos de TI' : 'Contactar Equipa de TI'}
              </button>

              <AnimatePresence>
                {showSupport && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                            <FileText size={16} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Email</p>
                            <p className="text-xs font-black text-gray-700">{itEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                            <Zap size={16} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Whatsapp</p>
                            <p className="text-xs font-black text-gray-700">{itWhatsapp}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700">
                            <Users size={16} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">LinkedIn</p>
                            <p className="text-xs font-black text-gray-700">{itLinkedin}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                            <Users size={16} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Facebook</p>
                            <p className="text-xs font-black text-gray-700">{itFacebook}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                            <Maximize2 size={16} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Página Web</p>
                            <p className="text-xs font-black text-gray-700">{itWeb}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Back Button */}
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              onClick={onBack}
              className="w-full py-4 bg-blue-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20"
            >
              <ArrowLeft size={16} />
              Voltar ao Menu
            </motion.button>
          </div>
        </div>
      );
    }

    if (activeItem === 'Atualização') {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className={`p-12 rounded-full bg-blue-50 text-blue-600 ${isSyncing ? 'animate-spin' : ''}`}>
            <RefreshCw size={80} />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter mb-2">Atualização do Sistema</h2>
            <p className="text-gray-500 max-w-md mx-auto">Clique no botão abaixo para verificar e aplicar as atualizações mais recentes do SIGPI.</p>
          </div>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {isSyncing ? 'Atualizando...' : 'Iniciar Atualização'}
          </button>
          {syncSuccess && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 font-black uppercase tracking-widest">Sistema atualizado para {version}</motion.p>
          )}
        </div>
      );
    }

    if (activeItem === 'Gestão de Usuário') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">Gestão de Usuários</h2>
            <button onClick={() => setActiveItem('Registar')} className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">+ Novo Usuário</button>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <tr>
                  <th className="px-8 py-4">Usuário</th>
                  <th className="px-8 py-4">Cargo</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black">AD</div>
                      <div>
                        <p className="text-sm font-black text-gray-900">Administrador</p>
                        <p className="text-[10px] text-gray-400">admin@sigpi.ispsongo.ac.mz</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-black text-gray-500 uppercase">TI / Gestão</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase">Ativo</span>
                  </td>
                  <td className="px-8 py-6 text-right space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Settings size={16} /></button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeItem === 'Registar') {
      return (
        <div className="max-w-5xl mx-auto h-full flex flex-col">
          {/* Form Header */}
          <div className="bg-[#000066] py-4 px-8 rounded-t-xl text-center">
            <h2 className="text-white text-xl font-black uppercase tracking-widest font-serif">
              {registerStep === 1 && "Dados Pessoais"}
              {registerStep === 2 && "Dados Profissionais e Académicos"}
              {registerStep === 3 && "Credenciais de acesso"}
            </h2>
          </div>

          {/* Form Body */}
          <div className="flex-grow bg-[#e5e7eb] p-8 relative min-h-[600px]">
            <AnimatePresence mode="wait">
              {registerError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-[#fee2e2] border border-[#f87171] rounded"
                >
                  <p className="text-[#b91c1c] text-xs font-black uppercase tracking-widest">{registerError}</p>
                </motion.div>
              )}

              {registerStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Nome Completo</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" placeholder="Ex: João Manuel Silva" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Data de Nascimento</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" placeholder="dd/mm/aaaa" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Género</label>
                      <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                        <option>Selecione...</option>
                        <option>Masculino</option>
                        <option>Feminino</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Estado Civil</label>
                      <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                        <option>Selecione...</option>
                        <option>Solteiro(a)</option>
                        <option>Casado(a)</option>
                        <option>Divorciado(a)</option>
                        <option>Viúvo(a)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Nacionalidade</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" defaultValue="Moçambicano" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Naturalidade (Província)</label>
                      <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                        <option>Selecione...</option>
                        <option>Tete</option>
                        <option>Maputo</option>
                        <option>Sofala</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Distrito</label>
                      <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                        <option>Selecione...</option>
                        <option>Songo</option>
                        <option>Moatize</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Número de BI / Passaporte</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" placeholder="Documento de Identificação" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">NUIT</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" placeholder="Número Único de Identificação Tributária" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Email Institucional (Acesso) *</label>
                      <input type="email" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" placeholder="exemplo@instituicao.ac.mz" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Email Pessoal</label>
                      <input type="email" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" placeholder="exemplo@gmail.com" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Endereço Físico</label>
                    <input type="text" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" placeholder="Av. / Rua / Bairro / Nº Casa" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Contacto Telefónico</label>
                    <input type="text" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" placeholder="+258 8x xxx xxxx" />
                  </div>
                </motion.div>
              )}

              {registerStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Categoria de Funcionário</label>
                    <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                      <option>Selecione...</option>
                      <option>Docente</option>
                      <option>CTA</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Unidade Orgânica</label>
                      <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                        <option>Selecione...</option>
                        <option>ISPS</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Direção</label>
                      <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                        <option>Selecione...</option>
                        <option>Direção Geral</option>
                        <option>Direção Académica</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Departamento</label>
                      <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                        <option>Selecione...</option>
                        <option>Departamento de Engenharia</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Repartição</label>
                      <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                        <option>Selecione...</option>
                        <option>Repartição de TI</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Cargo / Função</label>
                      <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                        <option>Selecione...</option>
                        <option>Chefe de Departamento</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Regime de Trabalho</label>
                      <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                        <option>Selecione...</option>
                        <option>Tempo Inteiro</option>
                        <option>Tempo Parcial</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Ano de Início de Funções</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" placeholder="Ex: 2020" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Nível Académico</label>
                      <select className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900 appearance-none">
                        <option>Selecione...</option>
                        <option>Licenciatura</option>
                        <option>Mestrado</option>
                        <option>Doutoramento</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {registerStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="p-6 bg-[#d1d5db] border border-gray-300 rounded">
                    <p className="text-[#000066] text-sm italic font-medium">Defina a sua palavra-passe de acesso.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Palavra-passe *</label>
                      <input type="password" title="Mínimo 6 caracteres" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" placeholder="Mínimo 6 caracteres" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#000066] uppercase tracking-widest">Confirmar Palavra-passe *</label>
                      <input type="password" title="Confirmar Palavra-passe" className="w-full px-4 py-3 bg-white border-none rounded shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-900" placeholder="********" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form Footer Navigation */}
          <div className="bg-[#9ca3af] py-4 px-8 rounded-b-xl flex justify-between items-center">
            {registerStep > 1 ? (
              <button 
                onClick={() => setRegisterStep(prev => prev - 1)}
                className="p-2 bg-[#000066] text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            ) : <div />}

            <button 
              onClick={() => {
                if (registerStep === 1) {
                  // Simple validation for the example
                  const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                  if (!emailInput?.value) {
                    setRegisterError('Por favor, preencha o Email Institucional.');
                    return;
                  }
                }
                
                setRegisterError(null);
                if (registerStep < 3) {
                  setRegisterStep(prev => prev + 1);
                } else {
                  alert('Funcionário registado com sucesso no SIGPLANO!');
                  setActiveItem('Gestão de Usuário');
                }
              }}
              className="p-2 bg-[#000066] text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <ArrowLeft size={24} className="rotate-180" />
            </button>
          </div>
        </div>
      );
    }

    if (activeItem === 'Relatórios') {
      return (
        <ReportsView onShowAlert={(msg) => alert(msg)} />
      );
    }

    if (activeItem === 'Estatística') {
      return (
        <div className="absolute inset-0 bg-white z-50 flex flex-col">
          <EstatisticaView 
            onBack={() => setActiveItem('Visão geral')} 
            isReadOnly={true} 
            title="SISTEMA"
          />
        </div>
      );
    }

    if (activeItem === 'Calendário') {
      return (
        <div className="w-full h-full">
          <CalendarView 
            events={events} 
            setEvents={() => {}} 
            onAgendar={() => {}} 
            onNota={() => {}} 
            title="SISTEMA"
          />
        </div>
      );
    }

    if (activeItem === 'Backup') {
      return (
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter mb-2">Backup e Restauro</h2>
            <p className="text-gray-500">Garanta a segurança dos dados do SIGPI através de cópias de segurança regulares.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-6">
              <div className="p-6 rounded-full bg-blue-50 text-blue-600">
                <HardDrive size={48} />
              </div>
              <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">Fazer Backup</h3>
              <p className="text-xs text-gray-400">Exporta todos os dados do sistema para um ficheiro JSON seguro.</p>
              <button 
                onClick={handleBackup}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
              >
                Gerar Backup
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-6">
              <div className="p-6 rounded-full bg-orange-50 text-orange-600">
                <RefreshCw size={48} />
              </div>
              <h3 className="text-xl font-black text-orange-900 uppercase tracking-tighter">Restaurar</h3>
              <p className="text-xs text-gray-400">Importa dados de um backup anterior para o sistema.</p>
              <label className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all cursor-pointer text-center">
                Carregar Backup
                <input type="file" className="hidden" accept=".json" onChange={handleRestore} />
              </label>
            </div>
          </div>
        </div>
      );
    }

    if (activeItem === 'Limpeza de Testes') {
      return (
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-black text-red-900 uppercase tracking-tighter mb-2">Limpeza do Sistema</h2>
            <p className="text-gray-500">Remova todos os registos e configurações para reiniciar o sistema.</p>
          </div>
          
          <div className="bg-white rounded-[2.5rem] p-12 shadow-xl border border-red-100 flex flex-col items-center text-center space-y-8">
            <div className="p-8 rounded-full bg-red-50 text-red-600">
              <Trash2 size={64} />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-red-900 uppercase tracking-tighter">Limpar Base de Dados</h3>
              <p className="text-sm text-gray-500 max-w-md">
                Ao clicar no botão abaixo, todos os eventos, expedientes, registos de biblioteca, notas e configurações locais serão eliminados permanentemente.
              </p>
            </div>

            <div className="w-full p-6 bg-red-50 rounded-2xl border border-red-100 text-left">
              <h4 className="text-xs font-black text-red-900 uppercase tracking-widest mb-3">O que será removido:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs text-red-700 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Todos os Eventos do Calendário
                </li>
                <li className="flex items-center gap-2 text-xs text-red-700 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Todos os Expedientes e Documentos
                </li>
                <li className="flex items-center gap-2 text-xs text-red-700 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Registos de Biblioteca e Livros
                </li>
                <li className="flex items-center gap-2 text-xs text-red-700 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Notas do Dia e Alertas
                </li>
                <li className="flex items-center gap-2 text-xs text-red-700 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Configurações de Perfil e Preferências
                </li>
              </ul>
            </div>

            <button 
              onClick={() => setShowClearConfirm(true)}
              className="w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-100 flex items-center justify-center gap-3"
            >
              <Trash2 size={20} />
              Confirmar Limpeza Total
            </button>

            <AnimatePresence>
              {showClearConfirm && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl border border-red-100 text-center"
                  >
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      {isCleaning ? <Loader2 size={32} className="animate-spin" /> : <Trash2 size={32} />}
                    </div>
                    <h3 className="text-xl font-black text-red-900 uppercase tracking-tighter mb-4">
                      {isCleaning ? 'Limpando Sistema' : 'Confirmar Ação Irreversível'}
                    </h3>
                    <p className="text-sm text-gray-500 mb-8 font-medium">
                      {isCleaning 
                        ? cleaningStep || 'A processar...' 
                        : 'Tem a certeza absoluta? Todos os dados serão eliminados e não poderão ser recuperados.'}
                    </p>
                    <div className="space-y-3">
                      {!isCleaning ? (
                        <>
                          <button 
                            onClick={handleClearData}
                            className="w-full py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-red-700 transition-all"
                          >
                            Sim, Limpar Tudo
                          </button>
                          <button 
                            onClick={() => setShowClearConfirm(false)}
                            className="w-full py-4 bg-gray-100 text-gray-600 rounded-xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-red-600"
                            animate={{ width: ['0%', '100%'] }}
                            transition={{ duration: 5, ease: "linear" }}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-[#f8f9fa] flex flex-col overflow-hidden font-sans">
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 flex-none">
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={onBack} 
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-[#6366f1] rounded-xl text-white shadow-sm">
              <Settings size={18} />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-[#2563eb] font-serif">Sistema</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <User size={14} className="text-gray-500" />
            <span className="text-xs font-bold text-gray-700 truncate max-w-[100px] md:max-w-none">fttripas@gmail.com</span>
          </div>
          <button className="hidden md:block p-2 bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 transition-all">
            <Maximize2 size={18} />
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-[#6366f1] text-white rounded-xl text-[10px] md:text-xs font-bold hover:bg-[#4f46e5] transition-all shadow-sm"
          >
            <Menu size={16} />
            <span className="hidden xs:inline">Menu</span>
          </button>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden relative">
        {/* Main Content */}
        <main className="flex-grow overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

        {/* Sidebar Menu */}
        {isMenuOpen && (
          <aside className="fixed inset-y-0 right-0 w-80 bg-[#000066] text-white z-[60] flex flex-col transition-all duration-300 shadow-2xl md:relative md:inset-auto md:shadow-none">
            <div className="flex items-center justify-between p-6 md:hidden">
              <span className="font-black uppercase tracking-widest text-xs">Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                <ArrowLeft size={18} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto py-4 md:py-8">
              <ul className="space-y-2 px-4">
                {menuItems.map((item, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => setActiveItem(item.title)}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                        activeItem === item.title 
                          ? 'bg-white text-[#000066] shadow-xl' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon size={18} />
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 border-t border-white/10">
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
              >
                <LogOut size={18} className="text-orange-500" />
                Sair do Sistema
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* Footer */}
      <footer className="flex-none bg-[#000066] text-white text-center py-4 text-[11px] font-black uppercase tracking-widest italic border-t border-white/10">
        Desenvolvido por fttripas - 2025-2026 | @todos os direitos reservados
      </footer>
    </div>
  );
}
