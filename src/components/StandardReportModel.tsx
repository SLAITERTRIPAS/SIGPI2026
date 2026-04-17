import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ArrowLeft, Printer } from 'lucide-react';

interface ReportSection {
  title: string;
  content: React.ReactNode;
}

interface StandardReportModelProps {
  direction: string;
  year: number;
  title: string;
  location?: string;
  date?: string;
  technicalSheet?: {
    name: string;
    role: string;
  }[];
  abbreviations?: {
    sigla: string;
    significado: string;
  }[];
  sections: ReportSection[];
  onBack: () => void;
}

export default function StandardReportModel({
  direction,
  year,
  title,
  location = "Songo",
  date = new Date().toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' }),
  technicalSheet = [],
  abbreviations = [],
  sections,
  onBack
}: StandardReportModelProps) {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:p-0 print:bg-white">
      {/* Toolbar - Hidden on print */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-900 font-bold hover:underline"
        >
          <ArrowLeft size={20} /> VOLTAR
        </button>
        <div className="flex gap-4">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg"
          >
            <Printer size={18} /> IMPRIMIR / PDF
          </button>
        </div>
      </div>

      {/* Report Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-none print:shadow-none min-h-[29.7cm] flex flex-col"
      >
        {/* Page 1: Cover */}
        <div className="flex flex-col items-center justify-between min-h-[29.7cm] p-20 text-center uppercase font-serif border-b border-gray-100 print:border-none page-break-after-always">
          <div className="flex flex-col items-center gap-4">
            <img 
              src="https://picsum.photos/seed/isps_logo/300/300" 
              alt="Logo ISPS" 
              className="w-32 h-32 object-contain grayscale"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-xl font-bold">Instituto Superior Politécnico de Songo</h1>
          </div>

          <div className="space-y-12">
            <h2 className="text-2xl font-black tracking-tight leading-tight border-y-2 border-black py-4">
              {direction}
            </h2>
            <div className="space-y-4">
              <h3 className="text-3xl font-black">{title}</h3>
              <p className="text-xl font-bold">ANO DE {year}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg">{location}, {date}</p>
          </div>
        </div>

        {/* Page 2: Ficha Técnica & Abreviaturas */}
        <div className="p-20 min-h-[29.7cm] space-y-12 font-serif border-b border-gray-100 print:border-none page-break-after-always">
          {technicalSheet.length > 0 && (
            <section>
              <h3 className="text-xl font-bold uppercase mb-6 border-b border-black pb-2">FICHA TÉCNICA</h3>
              <div className="space-y-6">
                {technicalSheet.map((person, idx) => (
                  <div key={idx}>
                    <p className="font-bold">{person.name}</p>
                    <p className="text-sm italic">({person.role})</p>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <p className="font-bold">Data de Elaboração</p>
                <p>{date}</p>
              </div>
            </section>
          )}

          {abbreviations.length > 0 && (
            <section>
              <h3 className="text-xl font-bold uppercase mb-6 border-b border-black pb-2">LISTA DE ABREVIATURAS</h3>
              <div className="grid grid-cols-[120px_1fr] gap-x-8 gap-y-2 text-sm">
                <div className="font-bold border-b border-gray-200 pb-1">SIGLA</div>
                <div className="font-bold border-b border-gray-200 pb-1">SIGNIFICADO</div>
                {abbreviations.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="font-bold">{item.sigla}</div>
                    <div>{item.significado}</div>
                  </React.Fragment>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Content Sections */}
        {sections.map((section, idx) => (
          <div key={idx} className="p-20 min-h-[29.7cm] space-y-8 font-serif border-b border-gray-100 print:border-none page-break-after-always">
            <h3 className="text-xl font-bold uppercase mb-6 border-b-2 border-black pb-2 flex items-center gap-4">
              <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm">{idx + 1}</span>
              {section.title}
            </h3>
            <div className="text-justify leading-relaxed space-y-4 text-sm">
              {section.content}
            </div>
          </div>
        ))}

        {/* Footer for all pages (simulated) */}
        <div className="mt-auto p-8 text-center text-[10px] text-gray-400 font-sans uppercase tracking-widest border-t border-gray-50 print:hidden">
          SIGPI - Sistema Integrado de Gestão de Processos Institucionais • {year}
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; }
          .page-break-after-always { page-break-after: always !always; }
          @page { margin: 2cm; }
        }
      `}} />
    </div>
  );
}
