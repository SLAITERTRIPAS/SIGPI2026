import React, { useState } from 'react';
import { Search, Plus, GraduationCap, School, Globe, Calendar, Clock, ArrowLeft, Save, Trash2, User, Filter, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FormacaoColaborador {
  id: string;
  nome: string;
  curso: string;
  universidade: string;
  localizacao: 'Dentro do País' | 'Fora do País';
  pais?: string;
  anoInicio: number;
  previsaoConclusao: number;
  status: 'Em Curso' | 'Concluído' | 'Suspenso';
}

export default function GestaoFormacaoView({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<'list' | 'new'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocal, setFilterLocal] = useState<'Todos' | 'Dentro do País' | 'Fora do País'>('Todos');

  const [formacoes, setFormacoes] = useState<FormacaoColaborador[]>([
    {
      id: '1',
      nome: 'João Manuel',
      curso: 'Mestrado em Gestão de Recursos Humanos',
      universidade: 'Universidade Eduardo Mondlane',
      localizacao: 'Dentro do País',
      anoInicio: 2023,
      previsaoConclusao: 2025,
      status: 'Em Curso'
    },
    {
      id: '2',
      nome: 'Maria Alice',
      curso: 'Doutoramento em Engenharia Informática',
      universidade: 'Universidade de Coimbra',
      localizacao: 'Fora do País',
      pais: 'Portugal',
      anoInicio: 2022,
      previsaoConclusao: 2026,
      status: 'Em Curso'
    },
    {
      id: '3',
      nome: 'Carlos Alberto',
      curso: 'Licenciatura em Administração Pública',
      universidade: 'ISPS',
      localizacao: 'Dentro do País',
      anoInicio: 2021,
      previsaoConclusao: 2025,
      status: 'Em Curso'
    }
  ]);

  const [newFormacao, setNewFormacao] = useState<Partial<FormacaoColaborador>>({
    localizacao: 'Dentro do País',
    status: 'Em Curso',
    anoInicio: new Date().getFullYear(),
    previsaoConclusao: new Date().getFullYear() + 2
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    setFormacoes([...formacoes, { ...newFormacao, id } as FormacaoColaborador]);
    setMode('list');
    setNewFormacao({
      localizacao: 'Dentro do País',
      status: 'Em Curso',
      anoInicio: new Date().getFullYear(),
      previsaoConclusao: new Date().getFullYear() + 2
    });
  };

  const filteredFormacoes = formacoes.filter(f => {
    const matchesSearch = f.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         f.curso.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLocal === 'Todos' || f.localizacao === filterLocal;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-100 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={mode === 'new' ? () => setMode('list') : onBack}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-blue-900 font-serif">Gestão de Formação</h2>
            <p className="text-sm text-gray-500 font-serif italic">Controlo de pessoal em formação académica e profissional</p>
          </div>
        </div>

        {mode === 'list' && (
          <button 
            onClick={() => setMode('new')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            <Plus size={20} /> REGISTAR NOVO
          </button>
        )}
      </header>

      <main className="flex-grow overflow-auto p-8">
        <AnimatePresence mode="wait">
          {mode === 'list' ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text"
                    placeholder="Procurar por nome ou curso..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
                    {['Todos', 'Dentro do País', 'Fora do País'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setFilterLocal(opt as any)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterLocal === opt ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <button className="p-3 bg-gray-50 text-gray-500 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all">
                    <Download size={18} />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="grid grid-cols-1 gap-4">
                {filteredFormacoes.length > 0 ? (
                  filteredFormacoes.map((f) => (
                    <div key={f.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-none group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <GraduationCap size={32} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-lg font-bold text-gray-900">{f.nome}</h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <School size={14} className="text-blue-500" />
                              <span className="font-medium">{f.curso}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Globe size={14} className="text-blue-500" />
                              <span>{f.universidade} {f.pais ? `(${f.pais})` : ''}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${f.localizacao === 'Dentro do País' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                              {f.localizacao}
                            </span>
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">
                              {f.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 flex-none w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Início</span>
                          <div className="flex items-center gap-1.5 text-gray-700 font-bold">
                            <Calendar size={14} className="text-blue-500" />
                            {f.anoInicio}
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Previsão</span>
                          <div className="flex items-center gap-1.5 text-blue-600 font-bold">
                            <Clock size={14} />
                            {f.previsaoConclusao}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <FileText size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                    <GraduationCap size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-500 font-medium">Nenhum colaborador encontrado em formação.</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="new"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 bg-blue-600 text-white">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Plus size={28} />
                    Registar Novo Colaborador em Formação
                  </h3>
                  <p className="text-blue-100 mt-1">Preencha os dados académicos e profissionais do colaborador.</p>
                </div>

                <form onSubmit={handleSave} className="p-10 space-y-8">
                  <div className="space-y-6">
                    {/* Nome do Colaborador */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <User size={16} className="text-blue-600" />
                        Nome Completo do Colaborador
                      </label>
                      <input 
                        required
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Ex: João Manuel dos Santos"
                        value={newFormacao.nome || ''}
                        onChange={(e) => setNewFormacao({ ...newFormacao, nome: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Curso */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <GraduationCap size={16} className="text-blue-600" />
                          Nome do Curso
                        </label>
                        <input 
                          required
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          placeholder="Ex: Mestrado em Gestão"
                          value={newFormacao.curso || ''}
                          onChange={(e) => setNewFormacao({ ...newFormacao, curso: e.target.value })}
                        />
                      </div>

                      {/* Universidade */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <School size={16} className="text-blue-600" />
                          Universidade / Instituição
                        </label>
                        <input 
                          required
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          placeholder="Ex: Universidade Eduardo Mondlane"
                          value={newFormacao.universidade || ''}
                          onChange={(e) => setNewFormacao({ ...newFormacao, universidade: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Localização */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <Globe size={16} className="text-blue-600" />
                          Localização
                        </label>
                        <select 
                          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={newFormacao.localizacao}
                          onChange={(e) => setNewFormacao({ ...newFormacao, localizacao: e.target.value as any })}
                        >
                          <option value="Dentro do País">Dentro do País</option>
                          <option value="Fora do País">Fora do País</option>
                        </select>
                      </div>

                      {/* País (se fora) */}
                      {newFormacao.localizacao === 'Fora do País' && (
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Globe size={16} className="text-blue-600" />
                            País de Estudo
                          </label>
                          <input 
                            required
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Ex: Portugal, Brasil, etc."
                            value={newFormacao.pais || ''}
                            onChange={(e) => setNewFormacao({ ...newFormacao, pais: e.target.value })}
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Ano de Início */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <Calendar size={16} className="text-blue-600" />
                          Ano que Começou
                        </label>
                        <input 
                          required
                          type="number"
                          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={newFormacao.anoInicio}
                          onChange={(e) => setNewFormacao({ ...newFormacao, anoInicio: parseInt(e.target.value) })}
                        />
                      </div>

                      {/* Previsão de Conclusão */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <Clock size={16} className="text-blue-600" />
                          Previsão de Conclusão
                        </label>
                        <input 
                          required
                          type="number"
                          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={newFormacao.previsaoConclusao}
                          onChange={(e) => setNewFormacao({ ...newFormacao, previsaoConclusao: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setMode('list')}
                      className="flex-1 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                    >
                      CANCELAR
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                    >
                      <Save size={20} /> GUARDAR REGISTO
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
