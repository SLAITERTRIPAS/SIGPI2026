import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, User, Building2, Briefcase, FileText, CheckCircle2, AlertCircle, CheckSquare, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data Hierarchy
const unidadesOrganicas = [
  { id: 'odg', name: 'Órgãos de Direção e Gestão' },
  { id: 'uo', name: 'Unidades Orgânicas' },
  { id: 'sc', name: 'Serviços Centrais' },
];

const direcoes = [
  // Órgãos de Direção e Gestão
  { id: 'dg', unidadeId: 'odg', name: 'DIRETOR-GERAL' },
  { id: 'cr', unidadeId: 'odg', name: 'CONSELHO DE REPRESENTANTES' },
  { id: 'cag', unidadeId: 'odg', name: 'CONSELHO ADMINISTRATIVO E DE GESTÃO' },
  { id: 'ctq', unidadeId: 'odg', name: 'CONSELHO TÉCNICO E DE QUALIDADE' },
  // Unidades Orgânicas
  { id: 'div_eng', unidadeId: 'uo', name: 'Divisão de Engenharia' },
  { id: 'cie', unidadeId: 'uo', name: 'Centro de Incubação de Empresas' },
  { id: 'centros', unidadeId: 'uo', name: 'Centros' },
  // Serviços Centrais
  { id: 'dicosafa', unidadeId: 'sc', name: 'DICOSAFA' },
  { id: 'dicosser', unidadeId: 'sc', name: 'DICOSSER' },
];

const departamentos = [
  // DIRETOR-GERAL
  { id: 'gdg', direcaoId: 'dg', name: 'Gabinete do Diretor Geral' },
  // Divisão de Engenharia
  { id: 'dap', direcaoId: 'div_eng', name: 'Diretor Adjunto Pedagógico' },
  { id: 'dpe', direcaoId: 'div_eng', name: 'Departamento de Pesquisa e Extensão' },
  { id: 'eet', direcaoId: 'div_eng', name: 'Departamento de Engenharia Electrotécnica' },
  { id: 'ecc', direcaoId: 'div_eng', name: 'Departamento de Engenharia de Construção Civil' },
  { id: 'ecm', direcaoId: 'div_eng', name: 'Departamento de Engenharia de Construção Mecânica' },
  { id: 'ddg', direcaoId: 'div_eng', name: 'Departamento de Disciplinas Gerais' },
  { id: 'dta', direcaoId: 'div_eng', name: 'Departamento Técnico e de Apoio' },
  // DICOSAFA
  { id: 'rh', direcaoId: 'dicosafa', name: 'Departamento de Recursos Humanos' },
  { id: 'financas', direcaoId: 'dicosafa', name: 'Departamento de Finanças' },
  { id: 'patrimonio', direcaoId: 'dicosafa', name: 'Departamento de Património' },
  { id: 'sg', direcaoId: 'dicosafa', name: 'Secretaria Geral' },
  { id: 'tic', direcaoId: 'dicosafa', name: 'Departamento TIC' },
  { id: 'lar', direcaoId: 'dicosafa', name: 'Departamento Lar de Estudantes' },
  { id: 'producao', direcaoId: 'dicosafa', name: 'Departamento de Produção Alimentar' },
  // DICOSSER
  { id: 'registo', direcaoId: 'dicosser', name: 'Departamento de Registo Académico' },
  { id: 'assuntos', direcaoId: 'dicosser', name: 'Departamento de Assuntos Estudantis' },
  { id: 'dept_bib', direcaoId: 'dicosser', name: 'Departamento de Biblioteca' },
];

const reparticoes = [
  // RH
  { id: 'rep_pessoal', deptoId: 'rh', name: 'Repartição de Pessoal' },
  { id: 'rep_formacao', deptoId: 'rh', name: 'Repartição de Formação' },
  { id: 'rep_apoio', deptoId: 'rh', name: 'Repartição de Apoio Social' },
  // Biblioteca
  { id: 'rep_doc', deptoId: 'dept_bib', name: 'Repartição de Documentos' },
  { id: 'rep_arq', deptoId: 'dept_bib', name: 'Repartição de Arquivo' },
  { id: 'bib_unit', deptoId: 'dept_bib', name: 'Biblioteca' },
];

const cursos = [
  // EET
  { id: 'c_eet_1', deptoId: 'eet', name: 'Engenharia Electrotécnica' },
  { id: 'c_eet_2', deptoId: 'eet', name: 'Sistemas de Energia' },
  { id: 'c_eet_3', deptoId: 'eet', name: 'Telecomunicações' },
  // ECC
  { id: 'c_ecc_1', deptoId: 'ecc', name: 'Engenharia de Construção Civil' },
  { id: 'c_ecc_2', deptoId: 'ecc', name: 'Estruturas' },
  { id: 'c_ecc_3', deptoId: 'ecc', name: 'Hidráulica' },
  // ECM
  { id: 'c_ecm_1', deptoId: 'ecm', name: 'Engenharia de Construção Mecânica' },
  { id: 'c_ecm_2', deptoId: 'ecm', name: 'Manutenção Industrial' },
  { id: 'c_ecm_3', deptoId: 'ecm', name: 'Termodinâmica' },
  // DDG
  { id: 'c_ddg_1', deptoId: 'ddg', name: 'Matemática' },
  { id: 'c_ddg_2', deptoId: 'ddg', name: 'Física' },
  { id: 'c_ddg_3', deptoId: 'ddg', name: 'Química' },
  // DAP
  { id: 'c_dap_1', deptoId: 'dap', name: 'Pedagogia' },
  { id: 'c_dap_2', deptoId: 'dap', name: 'Gestão Escolar' },
  // DPE
  { id: 'c_dpe_1', deptoId: 'dpe', name: 'Investigação Científica' },
  { id: 'c_dpe_2', deptoId: 'dpe', name: 'Extensão Universitária' },
  // DTA
  { id: 'c_dta_1', deptoId: 'dta', name: 'Apoio Técnico' },
  { id: 'c_dta_2', deptoId: 'dta', name: 'Laboratórios' },
];

const colaboradores: any[] = [];

export default function AssignActivityView({ directorTitle }: { directorTitle: string }) {
  const [formData, setFormData] = useState({
    unidadeId: '',
    direcaoId: '',
    deptoId: '',
    reparticaoId: '',
    curso: '',
    colaboradorId: '',
    atividade: '',
    prazo: ''
  });

  const [success, setSuccess] = useState(false);

  const titleUpper = directorTitle.toUpperCase();
  const isDirectorGeral = titleUpper === 'DIRETOR-GERAL';
  
  // Identify user's scope based on title
  const getUserScope = () => {
    if (isDirectorGeral) return { level: 'geral' };
    
    // Check if Director
    const direcao = direcoes.find(d => titleUpper.includes(d.name.toUpperCase()) || (d.id === 'div_eng' && titleUpper.includes('ENGENHARIA')));
    if (direcao) return { level: 'direcao', id: direcao.id, unidadeId: direcao.unidadeId };
    
    // Check if Chefe de Depto
    const depto = departamentos.find(d => titleUpper.includes(d.name.toUpperCase()));
    if (depto) {
      const dir = direcoes.find(dir => dir.id === depto.direcaoId);
      return { level: 'depto', id: depto.id, direcaoId: depto.direcaoId, unidadeId: dir?.unidadeId };
    }

    // Check if Chefe de Repartição
    const rep = reparticoes.find(r => titleUpper.includes(r.name.toUpperCase()));
    if (rep) {
      const depto = departamentos.find(d => d.id === rep.deptoId);
      const dir = direcoes.find(dir => dir.id === depto?.direcaoId);
      return { level: 'reparticao', id: rep.id, deptoId: rep.deptoId, direcaoId: depto?.direcaoId, unidadeId: dir?.unidadeId };
    }

    // Check if Diretor de Curso
    const curso = cursos.find(c => titleUpper.includes(c.name.toUpperCase()));
    if (curso) {
      const depto = departamentos.find(d => d.id === curso.deptoId);
      const dir = direcoes.find(dir => dir.id === depto?.direcaoId);
      return { level: 'curso', id: curso.id, deptoId: curso.deptoId, direcaoId: depto?.direcaoId, unidadeId: dir?.unidadeId };
    }

    return { level: 'none' };
  };

  const userScope = getUserScope();

  // Pre-select fields based on scope
  useEffect(() => {
    if (userScope.level !== 'geral' && userScope.level !== 'none') {
      setFormData(prev => ({
        ...prev,
        unidadeId: userScope.unidadeId || '',
        direcaoId: userScope.direcaoId || (userScope.level === 'direcao' ? userScope.id : ''),
        deptoId: userScope.deptoId || (userScope.level === 'depto' ? userScope.id : ''),
        reparticaoId: (userScope.level === 'reparticao' || userScope.level === 'curso') ? userScope.id : ''
      }));
    }
  }, [directorTitle]);

  // Filtered options
  const filteredUnidades = userScope.level === 'geral'
    ? unidadesOrganicas
    : unidadesOrganicas.filter(u => u.id === userScope.unidadeId);
  
  const filteredDirecoes = userScope.level === 'geral' 
    ? direcoes.filter(d => d.unidadeId === formData.unidadeId)
    : direcoes.filter(d => d.id === formData.direcaoId || (userScope.level === 'direcao' && d.id === userScope.id));

  const filteredDeptos = (userScope.level === 'geral' || userScope.level === 'direcao')
    ? departamentos.filter(d => d.direcaoId === formData.direcaoId)
    : departamentos.filter(d => d.id === formData.deptoId || (userScope.level === 'depto' && d.id === userScope.id));

  const filteredReparticoes = (userScope.level === 'geral' || userScope.level === 'direcao' || userScope.level === 'depto')
    ? reparticoes.filter(r => r.deptoId === formData.deptoId)
    : reparticoes.filter(r => r.id === formData.reparticaoId || (userScope.level === 'reparticao' && r.id === userScope.id));

  const filteredCursos = (userScope.level === 'geral' || userScope.level === 'direcao' || userScope.level === 'depto')
    ? (formData.direcaoId === 'div_eng' ? cursos.filter(c => c.deptoId === formData.deptoId) : [])
    : (userScope.level === 'curso' ? cursos.filter(c => c.id === userScope.id) : []);

  const filteredColaboradores = colaboradores.filter(c => {
    if (userScope.level === 'geral') {
      // DG can see everyone if filters are applied, or everyone in the institution
      if (formData.reparticaoId) return c.repId === formData.reparticaoId;
      if (formData.deptoId) return c.deptoId === formData.deptoId;
      if (formData.direcaoId) return c.direcaoId === formData.direcaoId;
      return true; // DG can see all by default if no filter
    }
    
    if (formData.reparticaoId) {
      return c.repId === formData.reparticaoId;
    }
    if (formData.deptoId) return c.deptoId === formData.deptoId;
    if (formData.direcaoId) return c.direcaoId === formData.direcaoId;
    return false;
  });

  // Reset dependent fields on parent change
  useEffect(() => {
    if (userScope.level === 'geral') {
      setFormData(prev => ({ ...prev, direcaoId: '', deptoId: '', reparticaoId: '', colaboradorId: '' }));
    }
  }, [formData.unidadeId]);

  useEffect(() => {
    if (userScope.level === 'geral' || userScope.level === 'direcao') {
      setFormData(prev => ({ ...prev, deptoId: '', reparticaoId: '', colaboradorId: '' }));
    }
  }, [formData.direcaoId]);

  useEffect(() => {
    if (userScope.level !== 'reparticao') {
      setFormData(prev => ({ ...prev, reparticaoId: '', colaboradorId: '' }));
    }
  }, [formData.deptoId]);

  useEffect(() => {
    setFormData(prev => ({ ...prev, colaboradorId: '' }));
  }, [formData.reparticaoId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Atividade Atribuída:', formData);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        unidadeId: '',
        direcaoId: '',
        deptoId: '',
        reparticaoId: '',
        curso: '',
        colaboradorId: '',
        atividade: '',
        prazo: ''
      });
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-8 bg-[#1e61ff] text-white">
          <h3 className="text-3xl font-bold flex items-center gap-3 font-serif">
            <CheckSquare className="text-white" size={32} />
            Atribuição de Nova Atividade
          </h3>
          <p className="text-blue-50 mt-2 text-lg font-serif italic">Preencha os dados abaixo para delegar uma tarefa a um colaborador.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Unidade Orgânica */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2 font-serif">
                <Building2 size={18} className="text-[#1e61ff]" />
                Unidade Orgânica
              </label>
              <select
                required
                disabled={userScope.level !== 'geral'}
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-[#1e61ff] outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all text-gray-500 font-serif"
                value={formData.unidadeId}
                onChange={e => setFormData({ ...formData, unidadeId: e.target.value })}
              >
                <option value="">Selecione a Unidade</option>
                {unidadesOrganicas.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>

            {/* Direção */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2 font-serif">
                <Briefcase size={18} className="text-[#1e61ff]" />
                Direção
              </label>
              <select
                required
                disabled={userScope.level !== 'geral' && userScope.level !== 'direcao'}
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-[#1e61ff] outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all text-gray-500 font-serif"
                value={formData.direcaoId}
                onChange={e => setFormData({ ...formData, direcaoId: e.target.value })}
              >
                <option value="">Selecione a Direção</option>
                {filteredDirecoes.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Departamento */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2 font-serif">
                <LayoutGrid size={18} className="text-[#1e61ff]" />
                Departamento
              </label>
              <select
                required
                disabled={userScope.level !== 'geral' && userScope.level !== 'direcao' && userScope.level !== 'depto'}
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-[#1e61ff] outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all text-gray-500 font-serif"
                value={formData.deptoId}
                onChange={e => setFormData({ ...formData, deptoId: e.target.value })}
              >
                <option value="">Selecione o Departamento</option>
                {filteredDeptos.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Repartição ou Curso */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2 font-serif">
                <LayoutGrid size={18} className="text-[#1e61ff]" />
                {formData.direcaoId === 'div_eng' ? 'Curso' : 'Repartição'}
              </label>
              <select
                disabled={userScope.level !== 'geral' && userScope.level !== 'direcao' && userScope.level !== 'depto' && userScope.level !== 'reparticao'}
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-[#1e61ff] outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all text-gray-500 font-serif"
                value={formData.reparticaoId}
                onChange={e => setFormData({ ...formData, reparticaoId: e.target.value })}
              >
                <option value="">{formData.direcaoId === 'div_eng' ? 'Selecione o Curso' : 'Selecione a Repartição'}</option>
                {formData.direcaoId === 'div_eng' ? (
                  filteredCursos.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))
                ) : (
                  filteredReparticoes.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))
                )}
              </select>
            </div>

            {/* Colaborador */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2 font-serif">
                <User size={18} className="text-[#1e61ff]" />
                Colaborador
              </label>
              <select
                required
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-[#1e61ff] outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all text-gray-500 font-serif"
                value={formData.colaboradorId}
                onChange={e => setFormData({ ...formData, colaboradorId: e.target.value })}
              >
                <option value="">Selecione o Colaborador</option>
                {filteredColaboradores.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.cargo})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Nome da Atividade */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2 font-serif">
              <FileText size={18} className="text-[#1e61ff]" />
              Nome da Atividade
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-[#1e61ff] outline-none transition-all resize-none text-gray-500 font-serif"
              placeholder="Descreva detalhadamente a atividade a ser realizada..."
              value={formData.atividade}
              onChange={e => setFormData({ ...formData, atividade: e.target.value })}
            />
          </div>

          {/* Prazo */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2 font-serif">
              <CalendarIcon size={18} className="text-[#1e61ff]" />
              Prazo de Entrega
            </label>
            <input
              required
              type="date"
              className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-[#1e61ff] outline-none transition-all text-gray-500 font-serif"
              value={formData.prazo}
              onChange={e => setFormData({ ...formData, prazo: e.target.value })}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={success}
              className={`w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-lg font-serif ${
                success 
                ? 'bg-green-500 text-white' 
                : 'bg-[#1e61ff] text-white hover:bg-[#1e61ff]/90 shadow-blue-100 hover:shadow-blue-200'
              }`}
            >
              {success ? (
                <>
                  <CheckCircle2 size={28} />
                  Atividade Atribuída com Sucesso!
                </>
              ) : (
                <>
                  <CheckSquare size={28} />
                  Atribuir Atividade
                </>
              )}
            </button>
          </div>
        </form>

        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-green-50 border-t border-green-100 flex items-center justify-center gap-2 text-green-700 text-sm font-medium"
            >
              <AlertCircle size={16} />
              O colaborador receberá uma notificação imediata sobre esta nova tarefa.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
