import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Users, Briefcase, Globe, Search, AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_STUDENTS: any[] = [];

const MOCK_STAFF: any[] = [];

export default function VisitorWelcomeView({ onBack, onSelectType }: { onBack: () => void, onSelectType: (type: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [verifiedData, setVerifiedData] = useState<any>(null);

  const visitorTypes = [
    { name: 'Estudante Interno', icon: BookOpen },
    { name: 'Estudante Externo', icon: Globe },
    { name: 'Docente', icon: Users },
    { name: 'CTA', icon: Briefcase }
  ];

  const currentYear = new Date().getFullYear();

  const handleVerify = () => {
    setVerificationStatus('verifying');
    setVerifiedData(null);
    
    // Simulate searching in specific departments as requested
    const searchPath = selectedCategory === 'Estudante Interno' 
      ? 'DICOSSER > Registo Académico > Efetivo Estudantil'
      : 'DICOSAFA > Recursos Humanos > Repartição de Pessoal > Efetivo Geral';

    setTimeout(() => {
      if (selectedCategory === 'Estudante Interno') {
        const student = MOCK_STUDENTS.find(s => s.code === inputValue);
        if (student) {
          setVerifiedData(student);
          setVerificationStatus('success');
          setTimeout(() => onSelectType(selectedCategory), 2000);
        } else {
          setVerificationStatus('error');
        }
      } else {
        // Docente or CTA
        const staff = MOCK_STAFF.find(s => s.id === inputValue || s.nuit === inputValue);
        if (staff) {
          setVerifiedData(staff);
          setVerificationStatus('success');
          setTimeout(() => onSelectType(selectedCategory), 2000);
        } else {
          setVerificationStatus('error');
        }
      }
    }, 2000); // Longer timeout to simulate "searching"
  };

  const searchPath = selectedCategory === 'Estudante Interno' 
    ? 'DICOSSER > Registo Académico > Efetivo Estudantil'
    : 'DICOSAFA > Recursos Humanos > Repartição de Pessoal > Efetivo Geral';

  const handleCategoryClick = (name: string) => {
    if (name === 'Estudante Interno' || name === 'Docente') {
      setSelectedCategory(name);
      setInputValue('');
      setVerificationStatus('idle');
      setVerifiedData(null);
    } else {
      onSelectType(name);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1920")',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 p-8 md:p-16 flex-grow flex flex-col">
        <button 
          onClick={selectedCategory ? () => setSelectedCategory(null) : onBack} 
          className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors self-start"
        >
          <ArrowLeft size={20} /> Voltar
        </button>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mt-12 w-full">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white tracking-tight">
            Bem-vindo a Biblioteca do ISPS ({currentYear})
          </h1>
          
          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              <motion.div
                key="categories"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md mx-auto"
              >
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white hover:bg-white/20 transition-all group"
                  >
                    <span className="text-xl font-bold">clique para selecionar a categoria</span>
                    <ChevronDown 
                      size={24} 
                      className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a5a]/90 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden z-50 shadow-2xl"
                      >
                        {visitorTypes.map((type) => (
                          <button
                            key={type.name}
                            onClick={() => {
                              handleCategoryClick(type.name);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-4 p-4 hover:bg-white/10 text-white transition-colors border-b border-white/10 last:border-0"
                          >
                            <div className="p-2 bg-white/10 rounded-lg">
                              <type.icon size={20} />
                            </div>
                            <span className="font-bold">{type.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <p className="mt-8 text-white/40 text-sm font-medium uppercase tracking-widest">
                  Indique a sua categoria para prosseguir
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="verification"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-2xl"
              >
                <h2 className="text-3xl font-bold text-white mb-4">Verificação de {selectedCategory}</h2>
                <p className="text-white/70 mb-8">
                  {selectedCategory === 'Estudante Interno' 
                    ? 'Por favor, digite o seu código de estudante para preenchimento automático.' 
                    : 'Por favor, digite o seu NUIT ou número de cartão de funcionário.'}
                </p>

                <div className="max-w-md mx-auto space-y-6">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder={selectedCategory === 'Estudante Interno' ? 'Ex: 2024001' : 'Ex: 123456'}
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-4 text-white text-xl font-bold placeholder:text-white/30 outline-none focus:border-white/50 transition-all"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    {verificationStatus === 'success' && (
                      <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" size={24} />
                    )}
                  </div>

                  {verificationStatus === 'error' && (
                    <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-200 text-sm">
                      <AlertCircle size={20} />
                      <div className="text-left">
                        <p className="font-bold">Não identificado</p>
                        <p className="text-xs opacity-70">
                          {selectedCategory === 'Estudante Interno' 
                            ? 'Dados não encontrados no Efetivo Estudantil (Registo Académico).' 
                            : 'Dados não encontrados no Efetivo Geral (Recursos Humanos).'}
                        </p>
                      </div>
                    </div>
                  )}

                  {verificationStatus === 'success' && verifiedData && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/20 border border-green-500/50 p-6 rounded-2xl text-left"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-green-200 text-xs font-bold uppercase tracking-widest">Dados Confirmados</p>
                        <p className="text-green-400 text-[8px] font-mono uppercase">{searchPath.split(' > ').pop()}</p>
                      </div>
                      <p className="text-white text-xl font-bold">{verifiedData.name}</p>
                      <p className="text-white/60">{verifiedData.course || verifiedData.role} • {verifiedData.level || verifiedData.department}</p>
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    <button 
                      onClick={() => onSelectType(selectedCategory === 'Estudante Interno' ? 'Estudante Externo' : 'Externo')}
                      className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/10"
                    >
                      Entrar como Visitante
                    </button>
                    <button 
                      onClick={handleVerify}
                      disabled={!inputValue || verificationStatus === 'verifying' || verificationStatus === 'success'}
                      className="flex-1 py-4 bg-white text-blue-900 rounded-2xl font-bold hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {verificationStatus === 'verifying' ? (
                        <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Search size={20} />
                          Verificar
                        </>
                      )}
                    </button>
                  </div>

                  {verificationStatus === 'verifying' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center space-y-2"
                    >
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Consultando Base de Dados</p>
                      <p className="text-blue-300 text-xs font-mono">{searchPath}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
