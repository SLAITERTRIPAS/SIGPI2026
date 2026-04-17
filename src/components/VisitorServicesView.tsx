import React from 'react';
import { ArrowLeft, Book, FileText, GraduationCap, Building, HelpCircle, MessageSquare, AlertTriangle, Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function VisitorServicesView({ 
  visitorType, 
  onBack, 
  onSelectService 
}: { 
  visitorType: string, 
  onBack: () => void, 
  onSelectService: (service: string) => void 
}) {
  const allServices = [
    { name: 'Biblioteca', icon: Book },
    { name: 'Pedido de certificado', icon: FileText },
    { name: 'Pedido de declaração de cadeiras feitas', icon: FileText },
    { name: 'Pedido de estagio', icon: GraduationCap },
    { name: 'Pedido de anulação de matricula', icon: AlertTriangle },
    { name: 'Pedido de espaco para acomodação', icon: Building },
    { name: 'Pedido de esclarecimento', icon: HelpCircle },
    { name: 'Caixa de reclamação', icon: MessageSquare },
    { name: 'Rastrear Pedido', icon: Search },
  ];

  const services = visitorType === 'Estudante Interno' ? allServices : allServices.filter(s => s.name === 'Biblioteca' || s.name === 'Rastrear Pedido');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen bg-white text-gray-900 p-8 md:p-16">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors"><ArrowLeft size={20} /> Voltar</button>
      
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Serviços Disponíveis para {visitorType}</h1>
        <p className="text-lg text-gray-600 mb-12">Selecione o serviço que deseja solicitar.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <button 
              key={service.name}
              onClick={() => onSelectService(service.name)}
              className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-3xl hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all text-center"
            >
              <service.icon className="text-orange-600" size={32} />
              <span className="text-lg font-bold">{service.name}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
