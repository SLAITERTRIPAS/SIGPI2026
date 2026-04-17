import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { ServiceRequest } from '../types';

export default function ServiceRequestForm({ 
  visitorType, 
  service, 
  onBack, 
  onSubmit 
}: { 
  visitorType: string, 
  service: string, 
  onBack: () => void, 
  onSubmit: (request: ServiceRequest) => void 
}) {
  const [success, setSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    curso: '',
    nivel: '',
    descricao: ''
  });

  const generateTrackingCode = (nome: string, curso: string, nivel: string, assunto: string, isEstudante: boolean) => {
    const date = new Date();
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    
    const getInitials = (str: string) => str.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 3);
    
    const assuntoFormatado = assunto.split(' ').map(w => w[0]).join('').toUpperCase();

    if (isEstudante) {
      const nomeInitials = getInitials(nome) || 'EST';
      const cursoInitials = getInitials(curso) || 'CUR';
      const nivelFormatado = nivel ? nivel.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() : 'NIVEL';
      return `${nomeInitials}-${cursoInitials}-${d}${m}${y}-${nivelFormatado}/${assuntoFormatado}`;
    } else {
      const depInitials = getInitials(curso) || 'DEP';
      return `COLAB-${depInitials}-${d}${m}${y}-${assuntoFormatado}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const code = generateTrackingCode(formData.nome, formData.curso, formData.nivel, service, visitorType === 'Estudante');
    setTrackingCode(code);

    const newRequest: ServiceRequest = {
      id: Math.random().toString(36).substr(2, 9),
      trackingCode: code,
      visitorType,
      service,
      nome: formData.nome,
      curso: formData.curso,
      nivel: formData.nivel,
      descricao: formData.descricao,
      status: 'Submetido',
      history: [
        {
          stage: 'Submetido',
          date: new Date().toISOString(),
          parecer: 'Pedido submetido com sucesso.',
          author: formData.nome
        }
      ],
      createdAt: new Date().toISOString()
    };

    onSubmit(newRequest);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
        >
          <CheckCircle2 className="text-green-500 w-20 h-20 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido Submetido!</h2>
          <p className="text-gray-600 mb-6">O seu pedido foi encaminhado para a Secretaria Geral.</p>
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8">
            <p className="text-sm text-gray-500 font-bold mb-2 uppercase">Código de Rastreio</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl font-mono font-bold text-blue-900">{trackingCode}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(trackingCode)}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                title="Copiar código"
              >
                <Copy size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">Guarde este código para consultar o estado do seu pedido.</p>
          </div>

          <button 
            onClick={onBack}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Voltar ao Início
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      <header className="flex-none bg-[#e67e22] text-white p-4 md:p-6 flex items-center gap-4 shadow-md z-10">
        <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg md:text-xl font-bold uppercase tracking-wider truncate">Solicitação de Serviço</h1>
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
        <div className="max-w-2xl mx-auto pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="p-8 bg-orange-50 border-b border-orange-100">
              <h2 className="text-2xl font-bold text-orange-900">{service}</h2>
              <p className="text-orange-700 mt-1">Preencha os dados abaixo para submeter o seu pedido.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Nome Completo</label>
                <input 
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={formData.nome}
                  onChange={e => setFormData({...formData, nome: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Curso / Departamento</label>
                <input 
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={formData.curso}
                  onChange={e => setFormData({...formData, curso: e.target.value})}
                />
              </div>

              {visitorType === 'Estudante' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nível Frequentado (Ano)</label>
                  <input 
                    required
                    type="text"
                    placeholder="Ex: 3º Ano"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.nivel}
                    onChange={e => setFormData({...formData, nivel: e.target.value})}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Descrição / Detalhes do Pedido</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                  value={formData.descricao}
                  onChange={e => setFormData({...formData, descricao: e.target.value})}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
              >
                <Send size={24} />
                Submeter Pedido
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
