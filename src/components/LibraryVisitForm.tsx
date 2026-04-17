import React, { useState, useMemo } from 'react';
import { ArrowLeft, Save, User, Book, Monitor, Clock, CheckCircle2, Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { LibraryRegistration, BookRegistration } from '../types';

export default function LibraryVisitForm({ 
  onBack, 
  onSubmit, 
  initialTipoVisitante,
  bookRegistrations = []
}: { 
  onBack: () => void, 
  onSubmit?: (reg: LibraryRegistration) => void, 
  initialTipoVisitante?: string,
  bookRegistrations?: BookRegistration[]
}) {
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    tipoVisitante: initialTipoVisitante || 'Estudante',
    numeroIdentificacao: '',
    curso: '',
    objetivo: 'Estudo',
    usaComputador: false,
    computadorId: '',
    livrosConsulta: '',
    livrosEmprestimo: '',
    data: new Date().toISOString().split('T')[0],
    horaEntrada: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  const availableBooks = useMemo(() => {
    if (!formData.curso) return [];
    return bookRegistrations.filter(b => 
      b.curso?.toLowerCase() === formData.curso.toLowerCase()
    );
  }, [formData.curso, bookRegistrations]);

  const searchedBooks = useMemo(() => {
    if (!searchTerm) return availableBooks;
    return availableBooks.filter(b => 
      b.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.autor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, availableBooks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSubmit) {
      onSubmit({
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      });
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onBack();
    }, 3000);
  };

  return (
    <div className="h-[100dvh] bg-gray-50 flex flex-col overflow-hidden">
      <header className="flex-none bg-[#e67e22] text-white p-4 md:p-6 flex items-center gap-4 shadow-md z-10">
        <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg md:text-xl font-bold uppercase tracking-wider truncate">Registo de Visita</h1>
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
          <div className="p-8 bg-orange-50 border-b border-orange-100">
            <h2 className="text-2xl font-bold text-orange-900 flex items-center gap-3">
              <User className="text-orange-600" />
              Identificação do Visitante
            </h2>
            <p className="text-orange-700 mt-1">Registe a entrada e o uso dos recursos da biblioteca.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label className="text-sm font-bold text-gray-700">Tipo de Visitante</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={formData.tipoVisitante}
                  onChange={e => setFormData({...formData, tipoVisitante: e.target.value})}
                >
                  <option value="Estudante">Estudante</option>
                  <option value="Docente">Docente</option>
                  <option value="CTA">CTA</option>
                  <option value="Externo">Externo</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Nº Identificação / Cartão</label>
                <input 
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={formData.numeroIdentificacao}
                  onChange={e => setFormData({...formData, numeroIdentificacao: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Curso / Departamento</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={formData.curso}
                  onChange={e => setFormData({...formData, curso: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Monitor className="text-orange-500" size={20} />
                Uso de Recursos
              </h3>
              
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                <input 
                  type="checkbox" 
                  id="usaComputador"
                  className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  checked={formData.usaComputador}
                  onChange={e => setFormData({...formData, usaComputador: e.target.checked})}
                />
                <label htmlFor="usaComputador" className="text-sm font-medium text-gray-700">Irá utilizar computador da biblioteca?</label>
              </div>

              {formData.usaComputador && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <label className="text-sm font-bold text-gray-700">Identificação do Computador (Nº)</label>
                  <input 
                    type="text"
                    placeholder="Ex: PC-05"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    value={formData.computadorId}
                    onChange={e => setFormData({...formData, computadorId: e.target.value})}
                  />
                </motion.div>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Book className="text-orange-500" size={20} />
                Livros e Obras
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                {formData.curso ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="text"
                        placeholder="Pesquisar livro por título ou autor..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 max-h-64 overflow-y-auto custom-scrollbar">
                      {searchedBooks.length > 0 ? (
                        <div className="space-y-3">
                          {searchedBooks.map((book) => (
                            <div key={book.id} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <h4 className="font-bold text-gray-800">{book.titulo}</h4>
                                <p className="text-sm text-gray-500">{book.autor} • {book.area}</p>
                                <div className="flex items-center gap-2 mt-2 text-xs font-medium text-orange-600 bg-orange-50 w-fit px-2 py-1 rounded-md">
                                  <MapPin size={12} />
                                  <span>Estante: {book.estante || 'N/A'} | Prateleira: {book.prateleira || 'N/A'}</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <button 
                                  type="button"
                                  onClick={() => setFormData(prev => ({ 
                                    ...prev, 
                                    livrosConsulta: prev.livrosConsulta ? `${prev.livrosConsulta}\n- ${book.titulo}` : `- ${book.titulo}` 
                                  }))}
                                  className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
                                >
                                  Add Consulta
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => setFormData(prev => ({ 
                                    ...prev, 
                                    livrosEmprestimo: prev.livrosEmprestimo ? `${prev.livrosEmprestimo}\n- ${book.titulo}` : `- ${book.titulo}` 
                                  }))}
                                  className="text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors"
                                >
                                  Add Empréstimo
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Book className="mx-auto mb-2 opacity-20" size={48} />
                          <p className="font-medium">Obra/Livro Indisponível</p>
                          <p className="text-sm">Nenhum livro encontrado para este curso ou pesquisa.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-orange-50 text-orange-800 p-4 rounded-xl border border-orange-100 text-sm font-medium text-center">
                    Por favor, indique o Curso / Departamento acima para ver os livros disponíveis.
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Livros para Consulta Local</label>
                  <textarea 
                    rows={2}
                    placeholder="Liste os livros que irá consultar na biblioteca..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                    value={formData.livrosConsulta}
                    onChange={e => setFormData({...formData, livrosConsulta: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Livros para Empréstimo Externo</label>
                  <textarea 
                    rows={2}
                    placeholder="Liste os livros que deseja levar para casa (sujeito a aprovação)..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                    value={formData.livrosEmprestimo}
                    onChange={e => setFormData({...formData, livrosEmprestimo: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Clock size={16} className="text-orange-500" />
                  Data
                </label>
                <input 
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={formData.data}
                  onChange={e => setFormData({...formData, data: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Clock size={16} className="text-orange-500" />
                  Hora de Entrada
                </label>
                <input 
                  type="time"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={formData.horaEntrada}
                  onChange={e => setFormData({...formData, horaEntrada: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={success}
              className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
                success 
                ? 'bg-green-500 text-white' 
                : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-100 hover:shadow-orange-200'
              }`}
            >
              {success ? (
                <>
                  <CheckCircle2 size={24} />
                  Registo Submetido!
                </>
              ) : (
                <>
                  <Save size={24} />
                  Submeter
                </>
              )}
            </button>
          </form>
        </motion.div>
        </div>
      </main>

      <footer className="flex-none bg-blue-900 text-white text-center py-3 text-[10px] md:text-xs z-10">
        Sistema de Gestão de Biblioteca - DICOSSER
      </footer>
    </div>
  );
}
