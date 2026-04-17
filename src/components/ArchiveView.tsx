import React, { useState } from 'react';
import { ArrowLeft, Folder, FileText, Calendar, ChevronRight, Search, Archive } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArchiveDocument {
  id: string;
  title: string;
  type: string;
  year: number;
  date: string;
}

export default function ArchiveView({ onBack }: { onBack: () => void }) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const years = [2025, 2024, 2023, 2022, 2021];

  const categories = [
    'Relatórios Anuais',
    'Planos de Atividades',
    'Planos Institucionais',
    'Planos de Aquisição',
    'Planos de Contratação',
    'Informações Propostas',
    'Guias de Apresentação'
  ];

  // Mock data for documents
  const mockDocuments: ArchiveDocument[] = [
    { id: '1', title: 'Relatório Final de Atividades 2024.pdf', type: 'Relatórios Anuais', year: 2024, date: '2024-12-20' },
    { id: '2', title: 'Plano de Atividades Setorial 2025.pdf', type: 'Planos de Atividades', year: 2025, date: '2025-01-05' },
    { id: '3', title: 'Plano Estratégico Institucional.pdf', type: 'Planos Institucionais', year: 2024, date: '2024-03-15' },
    { id: '4', title: 'Plano Anual de Aquisições.pdf', type: 'Planos de Aquisição', year: 2025, date: '2025-01-10' },
    { id: '5', title: 'Guia de Apresentação de Projetos.pdf', type: 'Guias de Apresentação', year: 2023, date: '2023-06-12' },
  ];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesYear = selectedYear ? doc.year === selectedYear : true;
    const matchesCategory = selectedCategory ? doc.type === selectedCategory : true;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesYear && matchesCategory && matchesSearch;
  });

  const renderYears = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl mx-auto py-8">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => setSelectedYear(year)}
          className="bg-white border-2 border-gray-100 p-8 rounded-3xl shadow-sm hover:border-blue-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-4 group"
        >
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Calendar size={32} />
          </div>
          <span className="text-2xl font-bold text-gray-900">{year}</span>
          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Arquivo Morto</span>
        </button>
      ))}
    </div>
  );

  const renderCategories = () => (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setSelectedYear(null)}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} className="text-blue-900" />
        </button>
        <h3 className="text-2xl font-bold text-blue-900 uppercase tracking-widest">Arquivo de {selectedYear}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Folder size={20} />
              </div>
              <span className="font-bold text-gray-700">{cat}</span>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} className="text-blue-900" />
          </button>
          <div>
            <h3 className="text-2xl font-bold text-blue-900 uppercase tracking-widest">{selectedCategory}</h3>
            <p className="text-gray-500 text-sm">Ano: {selectedYear}</p>
          </div>
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Pesquisar documentos..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Título do Documento</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Data de Submissão</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-50 text-red-600 p-1.5 rounded-lg">
                        <FileText size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-700">{doc.title}</span>
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Documento PDF</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(doc.date).toLocaleDateString('pt-PT')}
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 font-bold text-xs hover:underline uppercase tracking-widest">Visualizar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-12 text-center text-gray-400 italic">
                  Nenhum documento encontrado nesta categoria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#f8f9fa] flex flex-col overflow-hidden">
      <header className="flex-none flex justify-between items-center p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-blue-900">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Archive size={20} />
            </div>
            <h1 className="text-sm font-bold uppercase tracking-widest text-blue-900">
              Repartição de Arquivo - Arquivo Morto
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow p-8 overflow-auto">
        <div className="w-full max-w-6xl mx-auto mb-8">
          <h2 className="text-4xl font-bold text-blue-900 mb-2 leading-[1.5]">Gestão de Arquivo</h2>
          <p className="text-gray-500 leading-[1.5]">Aceda aos documentos históricos organizados por ano e categoria. Todos os arquivos estão disponíveis em formato <b>PDF</b>.</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear ? (selectedCategory ? 'docs' : 'cats') : 'years'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {!selectedYear && renderYears()}
            {selectedYear && !selectedCategory && renderCategories()}
            {selectedYear && selectedCategory && renderDocuments()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="flex-none bg-blue-900 text-white text-center py-4 text-xs">
        Desenvolvido por fttripas - 2025-2026 | @todos os direitos reservados
      </footer>
    </div>
  );
}
