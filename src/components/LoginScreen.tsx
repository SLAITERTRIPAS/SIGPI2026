import React, { useState } from 'react';
import { X, Maximize2, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MOCK_USERS } from '../constants/mockUsers';

export default function LoginScreen({ onClose, onLogin, events }: { onClose: () => void, onLogin: (user: any) => void, events: any[] }) {
  const [view, setView] = useState<'login' | 'recover' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Recover State
  const [recoverNuit, setRecoverNuit] = useState('');
  const [recoverBi, setRecoverBi] = useState('');
  const [recoverNome, setRecoverNome] = useState('');
  
  // Reset State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchedUser, setMatchedUser] = useState<any>(null);

  const comemorativas = events.filter(e => e.type === 'Data Comemorativa');
  const feriadosNacionais = events.filter(e => e.type === 'Feriado Nacional');
  const feriadosInstitucionais = events.filter(e => e.type === 'Feriado Institucional');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      setSuccess(`Bem-vindo à ${user.direcao} e ao ${user.departamento}`);
      setTimeout(() => {
        onLogin(user);
      }, 2000);
    } else {
      setError('O usuário não é colaborador do ISPS, contacte o RH.');
    }
  };

  const handleRecoverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const user = MOCK_USERS.find(u => 
      u.nuit === recoverNuit && 
      u.bi === recoverBi && 
      u.name.toLowerCase() === recoverNome.toLowerCase()
    );

    if (user) {
      setMatchedUser(user);
      setView('reset');
    } else {
      setError('DADOS NÃO IDENTICOS');
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setSuccess('Senha alterada com sucesso!');
    setTimeout(() => {
      setView('login');
      setSuccess('');
      setRecoverNuit('');
      setRecoverBi('');
      setRecoverNome('');
      setNewPassword('');
      setConfirmPassword('');
      setMatchedUser(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex flex-col md:flex-row h-screen w-full bg-white z-[100]">
      {/* Left Side - Blue */}
      <div className="hidden md:flex w-full md:w-1/2 bg-[#1e1e96] p-8 md:p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Background Image with 30% transparency */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ 
            backgroundImage: 'url("https://drive.google.com/uc?export=view&id=1OzjBJrxrQ2HuVE5DSWg2Zvi_3vsG5oPk")',
          }}
        ></div>

        <div className="relative z-10 flex flex-col">
          <div className="flex items-center gap-4">
            <div className="border border-white/30 p-2 rounded flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white rounded-sm"></div>
            </div>
            <h1 className="text-sm font-bold tracking-widest uppercase leading-tight">
              SERVIÇO DE<br />PLANIFICAÇÃO INSTITUCIONAL
            </h1>
          </div>

          <div className="mt-[10px] space-y-4">
            {comemorativas.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase mb-2 tracking-widest">DATAS COMEMORATIVAS</h2>
                {comemorativas.map(e => <p key={e.id} className="text-sm opacity-80">{e.title}</p>)}
              </div>
            )}
            {feriadosNacionais.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase mb-2 tracking-widest">FERIADOS NACIONAIS</h2>
                {feriadosNacionais.map(e => <p key={e.id} className="text-sm opacity-80">{e.title}</p>)}
              </div>
            )}
            {feriadosInstitucionais.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase mb-2 tracking-widest">FERIADOS INSTITUCIONAIS</h2>
                {feriadosInstitucionais.map(e => <p key={e.id} className="text-sm opacity-80">{e.title}</p>)}
              </div>
            )}
            {comemorativas.length === 0 && feriadosNacionais.length === 0 && feriadosInstitucionais.length === 0 && (
              <p className="text-sm opacity-80">Nenhum evento agendado.</p>
            )}
          </div>
        </div>

        <div className="relative z-10 text-[10px] opacity-60 font-sans">
          Desenvolvido por fttripas - 2025-2026 | @todos os direitos reservados
        </div>

        {/* Top Right Icons */}
        <div className="absolute top-6 right-6 flex gap-3 z-20">
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"><Maximize2 size={16} /></button>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"><X size={16} /></button>
        </div>
      </div>

      {/* Right Side - White */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-20 overflow-y-auto">
        <div className="w-full max-w-md text-center">
          {view === 'login' && (
            <>
              <h1 className="text-4xl font-bold text-[#0a0a5a] mb-2 font-serif tracking-tight">BEM-VINDO</h1>
              <p className="text-xl text-gray-500 italic mb-16 font-serif">Insira as suas credenciais de acesso.</p>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-shake">
                    <AlertCircle size={20} />
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex flex-col items-center gap-2 text-green-700 text-sm animate-bounce">
                    <CheckCircle2 size={24} />
                    <p className="font-bold text-center">{success}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-[#0a0a5a] tracking-[0.2em] uppercase">E-MAIL OU NUIT</label>
                  <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu e-mail ou número de NUIT"
                    className="w-full p-4 bg-gray-100 rounded-xl text-sm text-center placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a0a5a]/20 transition-all"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-[#0a0a5a] tracking-[0.2em] uppercase">PALAVRA-PASSE</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full p-4 bg-gray-100 rounded-xl text-sm text-center placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a0a5a]/20 transition-all"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={() => { setView('recover'); setError(''); setSuccess(''); }}
                    className="text-[10px] font-bold text-[#0a0a5a] tracking-widest hover:underline uppercase"
                  >
                    ESQUECEU A SENHA?
                  </button>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={!!success}
                    className="w-full bg-[#0a0a5a] text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#0a0a5a]/90 transition-all shadow-lg shadow-blue-900/20 group disabled:bg-gray-400"
                  >
                    <span className="tracking-widest uppercase text-sm">ENTRAR NO SISTEMA</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
              
              <div className="mt-12 p-4 bg-blue-50 rounded-xl border border-blue-100 max-h-60 overflow-y-auto text-left">
                <p className="text-[10px] text-blue-800 font-bold uppercase tracking-widest mb-3 sticky top-0 bg-blue-50 py-1 z-10">Credenciais de Teste (Clique para preencher - Senha: 123):</p>
                <div className="text-[10px] text-blue-600 space-y-2">
                  {MOCK_USERS.map((u, i) => (
                    <div 
                      key={i} 
                      className="cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors"
                      onClick={() => { setEmail(u.email); setPassword('123'); }}
                    >
                      <strong className="block text-blue-900">{u.name}</strong> 
                      <span className="opacity-80 block">{u.departamento}</span>
                      <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-800 mt-1 inline-block">{u.email}</code>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {view === 'recover' && (
            <>
              <h1 className="text-4xl font-bold text-[#0a0a5a] mb-2 font-serif tracking-tight">RECUPERAR SENHA</h1>
              <p className="text-xl text-gray-500 italic mb-16 font-serif">Preencha os dados para verificação.</p>

              <form className="space-y-6" onSubmit={handleRecoverSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-shake">
                    <AlertCircle size={20} />
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-[#0a0a5a] tracking-[0.2em] uppercase">NUIT</label>
                  <input 
                    type="text" 
                    value={recoverNuit}
                    onChange={(e) => setRecoverNuit(e.target.value)}
                    placeholder="Seu número de NUIT"
                    className="w-full p-4 bg-gray-100 rounded-xl text-sm text-center placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a0a5a]/20 transition-all"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-[#0a0a5a] tracking-[0.2em] uppercase">NÚMERO DE BI</label>
                  <input 
                    type="text" 
                    value={recoverBi}
                    onChange={(e) => setRecoverBi(e.target.value)}
                    placeholder="Seu número de BI"
                    className="w-full p-4 bg-gray-100 rounded-xl text-sm text-center placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a0a5a]/20 transition-all"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-[#0a0a5a] tracking-[0.2em] uppercase">NOME COMPLETO</label>
                  <input 
                    type="text" 
                    value={recoverNome}
                    onChange={(e) => setRecoverNome(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full p-4 bg-gray-100 rounded-xl text-sm text-center placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a0a5a]/20 transition-all"
                    required
                  />
                </div>

                <div className="pt-4 flex flex-col gap-4">
                  <button 
                    type="submit"
                    className="w-full bg-[#0a0a5a] text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#0a0a5a]/90 transition-all shadow-lg shadow-blue-900/20 group"
                  >
                    <span className="tracking-widest uppercase text-sm">VERIFICAR DADOS</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setView('login'); setError(''); }}
                    className="text-[10px] font-bold text-gray-500 tracking-widest hover:text-[#0a0a5a] uppercase"
                  >
                    VOLTAR AO LOGIN
                  </button>
                </div>
              </form>
            </>
          )}

          {view === 'reset' && (
            <>
              <h1 className="text-4xl font-bold text-[#0a0a5a] mb-2 font-serif tracking-tight">NOVA SENHA</h1>
              <p className="text-xl text-gray-500 italic mb-16 font-serif">Defina a sua nova palavra-passe.</p>

              <form className="space-y-6" onSubmit={handleResetSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-shake">
                    <AlertCircle size={20} />
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex flex-col items-center gap-2 text-green-700 text-sm animate-bounce">
                    <CheckCircle2 size={24} />
                    <p className="font-bold text-center">{success}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-[#0a0a5a] tracking-[0.2em] uppercase">NOVA PALAVRA-PASSE</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full p-4 bg-gray-100 rounded-xl text-sm text-center placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a0a5a]/20 transition-all"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-[#0a0a5a] tracking-[0.2em] uppercase">CONFIRMAR NOVA PALAVRA-PASSE</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full p-4 bg-gray-100 rounded-xl text-sm text-center placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a0a5a]/20 transition-all"
                    required
                  />
                </div>

                <div className="pt-4 flex flex-col gap-4">
                  <button 
                    type="submit"
                    disabled={!!success}
                    className="w-full bg-[#0a0a5a] text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#0a0a5a]/90 transition-all shadow-lg shadow-blue-900/20 group disabled:bg-gray-400"
                  >
                    <span className="tracking-widest uppercase text-sm">REDEFINIR SENHA</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setView('login'); setError(''); setSuccess(''); }}
                    className="text-[10px] font-bold text-gray-500 tracking-widest hover:text-[#0a0a5a] uppercase"
                  >
                    CANCELAR
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
