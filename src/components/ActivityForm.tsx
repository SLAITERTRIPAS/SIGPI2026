import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Save, Plus, Trash2, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UNIDADES_ORGANICAS_SISTEMA,
  UNIDADES_CENTRAIS, 
  UNIDADES_ORGANICAS, 
  SERVICOS_CENTRAIS, 
  DEPARTAMENTOS, 
  REPARTICOES,
  CURSOS,
  PROVINCIAS, 
  DISTANCIAS_SONGO,
  RUBRICAS, 
  NECESSIDADES, 
  FONTES_RECEITA, 
  PRIORIDADES, 
  TRIMESTRES, 
  MESES, 
  VIATURAS, 
  FUNCIONARIOS 
} from '../constants/formOptions';

interface ActivityFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  planType: string;
}

export default function ActivityForm({ onClose, onSubmit, planType }: ActivityFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const [selectedCategory, setSelectedCategory] = useState('');

  const [formData, setFormData] = useState({
    // Step 1: Identificação
    unidadeCentral: '',
    unidadeOrganica: '',
    servicoCentral: '',
    unidadeSelecionada: '', // New field for the selected unit regardless of category
    departamento: '',
    reparticao: '',
    curso: '',
    fonteReceita: '',
    prioridade: 'Média',
    nAtividade: '1',
    // Step 2: Atividade
    nomeAtividade: '',
    objetivoAtividade: '',
    // Step 3: Localização
    realizacaoProvincia: '',
    realizacaoDistrito: '',
    trabalhoProvincia: '',
    trabalhoDistrito: '',
    // Step 4: Recursos Humanos
    responsavel: '',
    outrosColaboradores: '',
    nVezesAno: '1',
    trimestre: '',
    mesRealizacao: '',
    dataInicio: '',
    dataFim: '',
    totalDias: 0,
    frequencia: 'Mensal',
    // Step 5: Transporte
    necessitaTransporte: 'Não',
    viatura: '',
    motorista: '',
    distanciaDestino: 0,
    distanciaKm: 0,
    litrosGasoleo: 0,
    precoLitro: 100,
    valorTotalGasoleo: 0,
    // Step 6: Rubricas
    rubricas: [{ 
      id: 1, 
      rubrica: '', 
      necessidade: '', 
      especificacao: '',
      detalhes: '',
      pessoas: 1,
      quantidade: 0, 
      dias: 0,
      valorUnitario: 0, 
      total: 0,
      // Specific fields for Ajuda de Custo
      pessoa: '',
      valorDiario: 6000,
      temMeioDia: false,
      meioDia30: 0,
    }],
    // Step 7: Observações
    observacoes: '',
    situacaoAtividade: 'Atividade planificação'
  });

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // Recalculate dependent rubricas when source values change
  useEffect(() => {
    setFormData(prev => {
      let hasChanges = false;
      const newRubricas = prev.rubricas.map(rubrica => {
        const isAjudaCusto = rubrica.rubrica === 'Demais despesas com o pessoal 112' && 
                             rubrica.necessidade === '112101 - Ajuda de custo dentro do país para pessoal civil';
        const isCombustivel = rubrica.necessidade === '121001 - Combustíveis e lubrificantes';

        if (isAjudaCusto) {
          const precoUnitario = 6000;
          const qtd = rubrica.quantidade || 0;
          const dias = prev.totalDias || 0;
          const valorTotal = (qtd * dias * precoUnitario) + (0.3 * precoUnitario * qtd);
          if (rubrica.precoUnitario !== precoUnitario || rubrica.valorTotal !== valorTotal) {
            hasChanges = true;
            return { ...rubrica, precoUnitario, valorTotal };
          }
        }

        if (isCombustivel) {
          const quantidade = prev.litrosGasoleo || 0;
          const precoUnitario = prev.precoLitro || 0;
          const valorTotal = prev.valorTotalGasoleo || 0;
          if (rubrica.quantidade !== quantidade || rubrica.precoUnitario !== precoUnitario || rubrica.valorTotal !== valorTotal) {
            hasChanges = true;
            return { ...rubrica, quantidade, precoUnitario, valorTotal };
          }
        }

        return rubrica;
      });
      
      if (hasChanges) {
        return { ...prev, rubricas: newRubricas };
      }
      return prev;
    });
  }, [formData.totalDias, formData.litrosGasoleo, formData.precoLitro, formData.valorTotalGasoleo]);

  const handleAddRubrica = () => {
    setFormData({
      ...formData,
      rubricas: [...formData.rubricas, { 
        id: Date.now(), 
        rubrica: '', 
        necessidade: '', 
        especificacao: '',
        detalhes: '',
        pessoas: 1,
        quantidade: 0, 
        valorUnitario: 0, 
        total: 0,
        pessoa: '',
        dias: 0,
        valorDiario: 6000,
        temMeioDia: false,
        meioDia30: 0
      }]
    });
  };

  const handleRemoveRubrica = (id: number) => {
    setFormData({
      ...formData,
      rubricas: formData.rubricas.filter(r => r.id !== id)
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-blue-900 border-b pb-2 tracking-tighter uppercase">I. IDENTIFICAÇÃO</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Unidade Orgânica</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setFormData({ ...formData, unidadeSelecionada: '', departamento: '', reparticao: '' });
                  }}
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Selecione...</option>
                  {UNIDADES_ORGANICAS_SISTEMA.map(u => <option key={u.id} value={u.nome}>{u.nome}</option>)}
                </select>
              </div>

              {selectedCategory && (
                <div>
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">
                    Direção / Área
                  </label>
                  <select 
                    value={formData.unidadeSelecionada}
                    onChange={(e) => setFormData({ ...formData, unidadeSelecionada: e.target.value, departamento: '', reparticao: '' })}
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Selecione...</option>
                    {UNIDADES_ORGANICAS_SISTEMA.find(u => u.nome === selectedCategory)?.direcoes?.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Sector (Departamento)</label>
                <select 
                  value={formData.departamento}
                  onChange={(e) => setFormData({ ...formData, departamento: e.target.value, reparticao: '', curso: '' })}
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Selecione...</option>
                  {formData.unidadeSelecionada && DEPARTAMENTOS[formData.unidadeSelecionada] ? (
                    DEPARTAMENTOS[formData.unidadeSelecionada].map(d => <option key={d} value={d}>{d}</option>)
                  ) : (
                    <option disabled>Selecione uma Direção primeiro</option>
                  )}
                </select>
              </div>
              {CURSOS[formData.departamento] && (
                <div>
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Curso</label>
                  <select 
                    value={formData.curso}
                    onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Selecione o curso...</option>
                    {CURSOS[formData.departamento].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Repartição</label>
                <select 
                  value={formData.reparticao}
                  onChange={(e) => setFormData({ ...formData, reparticao: e.target.value })}
                  disabled={!formData.departamento || !REPARTICOES[formData.departamento]}
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value="">Selecione...</option>
                  {formData.departamento && REPARTICOES[formData.departamento] && REPARTICOES[formData.departamento].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-blue-900 border-b pb-2 tracking-tighter uppercase">II. ATIVIDADE</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Fonte de Receita</label>
                <select 
                  value={formData.fonteReceita}
                  onChange={(e) => setFormData({ ...formData, fonteReceita: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Selecione...</option>
                  {FONTES_RECEITA.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Prioridade</label>
                <select 
                  value={formData.prioridade}
                  onChange={(e) => setFormData({ ...formData, prioridade: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Nº/Activ.</label>
                <select 
                  value={formData.nAtividade}
                  onChange={(e) => setFormData({ ...formData, nAtividade: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Nome da atividade</label>
                <input 
                  type="text" 
                  value={formData.nomeAtividade}
                  onChange={(e) => setFormData({ ...formData, nomeAtividade: e.target.value })}
                  placeholder="Escreva o nome da atividade..."
                  className="w-full p-3 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Objetivo da atividade</label>
                <textarea 
                  rows={4} 
                  value={formData.objetivoAtividade}
                  onChange={(e) => setFormData({ ...formData, objetivoAtividade: e.target.value })}
                  placeholder="Escreva o objetivo..."
                  className="w-full p-3 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none" 
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <h4 className="text-lg font-bold text-blue-900 border-b pb-2 tracking-tighter uppercase">III. LOCALIZAÇÃO</h4>
            
            {/* Local de Realização da Instituição */}
            <div className="space-y-4">
              <p className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
                Local de Realização da Instituição
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Província</label>
                  <select 
                    value={formData.realizacaoProvincia || 'Tete'}
                    onChange={(e) => setFormData({ ...formData, realizacaoProvincia: e.target.value, realizacaoDistrito: '' })}
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Selecione a província...</option>
                    {Object.keys(PROVINCIAS).map(p => <option key={p} value={p}>{p.replace('_', ' ')}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Distrito</label>
                  <select 
                    value={formData.realizacaoDistrito || 'Cahora Bassa'}
                    onChange={(e) => setFormData({ ...formData, realizacaoDistrito: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Selecione o distrito...</option>
                    {(formData.realizacaoProvincia || 'Tete') && PROVINCIAS[formData.realizacaoProvincia || 'Tete']?.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Local a Trabalhar */}
            <div className="space-y-4 pt-6 border-t border-dashed">
              <p className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-700 rounded-full"></span>
                Local a Trabalhar
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Província</label>
                  <select 
                    value={formData.trabalhoProvincia}
                    onChange={(e) => {
                      const prov = e.target.value;
                      const dist = DISTANCIAS_SONGO[prov] || 0;
                      const idaEVolta = dist * 2;
                      const litros = idaEVolta / 10;
                      setFormData({ 
                        ...formData, 
                        trabalhoProvincia: prov, 
                        trabalhoDistrito: '',
                        distanciaDestino: dist,
                        distanciaKm: idaEVolta,
                        litrosGasoleo: litros,
                        valorTotalGasoleo: litros * formData.precoLitro
                      });
                    }}
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Selecione a província...</option>
                    {Object.keys(PROVINCIAS).map(p => <option key={p} value={p}>{p.replace('_', ' ')}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Distrito</label>
                  <select 
                    value={formData.trabalhoDistrito}
                    onChange={(e) => setFormData({ ...formData, trabalhoDistrito: e.target.value })}
                    disabled={!formData.trabalhoProvincia}
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">Selecione o distrito...</option>
                    {formData.trabalhoProvincia && PROVINCIAS[formData.trabalhoProvincia].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <h4 className="text-lg font-bold text-blue-900 border-b pb-2 tracking-tighter uppercase">IV. RECURSOS HUMANOS</h4>
            
            {/* Recursos Humanos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Responsável</label>
                <select 
                  value={formData.responsavel}
                  onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Selecione...</option>
                  {FUNCIONARIOS.map(f => <option key={f.nome} value={f.nome}>{f.nome} ({f.cargo})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Outros Colaboradores</label>
                <select 
                  value={formData.outrosColaboradores}
                  onChange={(e) => setFormData({ ...formData, outrosColaboradores: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Selecione...</option>
                  {FUNCIONARIOS.filter(f => f.cargo.toLowerCase().includes('chefe') || f.cargo.toLowerCase().includes('diretor')).map(f => (
                    <option key={f.nome} value={f.nome}>{f.nome} ({f.cargo})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 gap-4 md:col-span-2">
                <div>
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Nº de vezes /ano</label>
                  <select 
                    value={formData.nVezesAno}
                    onChange={(e) => setFormData({ ...formData, nVezesAno: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Trimestre</label>
                  <select 
                    value={formData.trimestre}
                    onChange={(e) => setFormData({ ...formData, trimestre: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Selecione...</option>
                    {TRIMESTRES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Mês de realização</label>
                  <select 
                    value={formData.mesRealizacao}
                    onChange={(e) => setFormData({ ...formData, mesRealizacao: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Selecione...</option>
                    {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Frequência</label>
                  <select 
                    value={formData.frequencia}
                    onChange={(e) => setFormData({ ...formData, frequencia: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="Diária">Diária</option>
                    <option value="Semanal">Semanal</option>
                    <option value="Mensal">Mensal</option>
                    <option value="Pontual">Pontual</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Data Início</label>
                <input 
                  type="date" 
                  value={formData.dataInicio}
                  onChange={(e) => {
                    const start = e.target.value;
                    const end = formData.dataFim;
                    let days = 0;
                    if (start && end) {
                      const d1 = new Date(start);
                      const d2 = new Date(end);
                      days = Math.max(0, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1);
                    }
                    setFormData({ ...formData, dataInicio: start, totalDias: days });
                  }}
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Data Fim</label>
                <input 
                  type="date" 
                  value={formData.dataFim}
                  onChange={(e) => {
                    const end = e.target.value;
                    const start = formData.dataInicio;
                    let days = 0;
                    if (start && end) {
                      const d1 = new Date(start);
                      const d2 = new Date(end);
                      days = Math.max(0, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1);
                    }
                    setFormData({ ...formData, dataFim: end, totalDias: days });
                  }}
                  className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                />
              </div>
              <div className="md:col-span-2 flex justify-end items-center gap-4">
                <span className="text-[10px] font-black text-blue-900 uppercase">Dias previstos</span>
                <input 
                  type="text" 
                  readOnly 
                  value={formData.totalDias}
                  className="w-32 p-2.5 border bg-gray-50 rounded-xl text-center text-sm font-black text-blue-900 outline-none" 
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-blue-900 border-b pb-2 tracking-tighter uppercase">V. TRANSPORTE</h4>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Viatura (Marca da viatura)</label>
                  <select 
                    value={formData.necessitaTransporte}
                    onChange={(e) => setFormData({ ...formData, necessitaTransporte: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                  <p className="text-[9px] text-gray-400 mt-1 italic">* Se não, bloqueia ajudas de custo e combustível</p>
                </div>

                {formData.necessitaTransporte === 'Sim' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
                  >
                    <div>
                      <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Lista de Viaturas</label>
                      <select 
                        value={formData.viatura}
                        onChange={(e) => setFormData({ ...formData, viatura: e.target.value })}
                        className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      >
                        <option value="">Selecione...</option>
                        {VIATURAS.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Motorista</label>
                      <select 
                        value={formData.motorista}
                        onChange={(e) => setFormData({ ...formData, motorista: e.target.value })}
                        className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      >
                        <option value="">Selecione...</option>
                        {FUNCIONARIOS.filter(f => f.cargo.toLowerCase().includes('motorista')).map(f => (
                          <option key={f.nome} value={f.nome}>{f.nome}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Distância até ao destino (KM)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={formData.distanciaDestino || ''}
                          onChange={(e) => {
                            const dist = Number(e.target.value);
                            const idaEVolta = dist * 2;
                            const litros = idaEVolta / 10; // Assuming 10km/L
                            setFormData({ 
                              ...formData, 
                              distanciaDestino: dist,
                              distanciaKm: idaEVolta,
                              litrosGasoleo: litros,
                              valorTotalGasoleo: litros * formData.precoLitro
                            });
                          }}
                          className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                        <span className="absolute right-3 top-2.5 text-xs font-bold text-gray-400">KM</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Distância em km (Ida e Volta)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          readOnly
                          value={formData.distanciaKm || ''}
                          className="w-full p-2.5 border bg-gray-50 rounded-xl text-sm font-bold text-blue-900 outline-none"
                        />
                        <span className="absolute right-3 top-2.5 text-xs font-bold text-gray-400">KM</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:col-span-2">
                      <div>
                        <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Litros Gasóleo (Calculado)</label>
                        <input 
                          type="number" 
                          readOnly
                          value={formData.litrosGasoleo || ''}
                          className="w-full p-2.5 border bg-gray-50 rounded-xl text-sm font-bold text-blue-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Preço/Litro (MZN)</label>
                        <input 
                          type="number" 
                          value={formData.precoLitro || ''}
                          onChange={(e) => {
                            const preco = Number(e.target.value);
                            setFormData({ 
                              ...formData, 
                              precoLitro: preco,
                              valorTotalGasoleo: formData.litrosGasoleo * preco
                            });
                          }}
                          className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Valor Total Gasóleo (MZN)</label>
                        <div className="w-full p-2.5 bg-gray-50 border rounded-xl text-sm font-bold text-blue-900">
                          {formData.valorTotalGasoleo?.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' }) || '0,00 MT'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-blue-900 border-b pb-2 tracking-tighter uppercase">VI. RUBRICAS E NECESSIDADES</h4>
            <div className="space-y-4">
              {formData.rubricas.map((rubrica, index) => {
                const isAjudaCusto = rubrica.rubrica === 'Demais despesas com o pessoal 112' && 
                                   rubrica.necessidade === '112101 - Ajuda de custo dentro do país para pessoal civil';
                
                const isCombustivel = rubrica.necessidade === '121001 - Combustíveis e lubrificantes';
                
                // If transport is NOT needed, some fields might be blocked
                const isBlocked = formData.necessitaTransporte === 'Não' && 
                                 (rubrica.necessidade.includes('Ajuda de custo') || rubrica.necessidade.includes('Combustível'));

                return (
                  <div key={rubrica.id} className={`p-6 border rounded-2xl space-y-6 relative ${isBlocked ? 'bg-gray-100 opacity-60 grayscale' : 'bg-white shadow-sm'}`}>
                    {isBlocked && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200 shadow-sm">Bloqueado (Sem Transporte)</span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Rúbrica</label>
                        <select 
                          value={rubrica.rubrica}
                          disabled={isBlocked}
                          onChange={(e) => {
                            const newRubricas = [...formData.rubricas];
                            newRubricas[index] = { ...rubrica, rubrica: e.target.value, necessidade: '' };
                            setFormData({ ...formData, rubricas: newRubricas });
                          }}
                          className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        >
                          <option value="">Selecione...</option>
                          {RUBRICAS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Necessidade</label>
                        <select 
                          value={rubrica.necessidade}
                          disabled={isBlocked || !rubrica.rubrica}
                          onChange={(e) => {
                            const newRubricas = [...formData.rubricas];
                            const newNecessidade = e.target.value;
                            let newRubrica = { ...rubrica, necessidade: newNecessidade };
                            
                            if (newNecessidade === '121001 - Combustíveis e lubrificantes') {
                              newRubrica.quantidade = formData.litrosGasoleo || 0;
                              newRubrica.precoUnitario = formData.precoLitro || 0;
                              newRubrica.valorTotal = formData.valorTotalGasoleo || 0;
                            } else if (newNecessidade === '112101 - Ajuda de custo dentro do país para pessoal civil') {
                              newRubrica.precoUnitario = 6000;
                              const qtd = newRubrica.quantidade || 0;
                              const dias = formData.totalDias || 0;
                              newRubrica.valorTotal = (qtd * dias * 6000) + (0.3 * 6000 * qtd);
                            }

                            newRubricas[index] = newRubrica;
                            setFormData({ ...formData, rubricas: newRubricas });
                          }}
                          className="w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        >
                          <option value="">Selecione...</option>
                          {rubrica.rubrica && NECESSIDADES[rubrica.rubrica]?.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">
                          {isAjudaCusto ? 'Nº de Pessoas Envolvidas' : (isCombustivel ? 'Litros (Automático)' : 'Quantidade')}
                        </label>
                        <input 
                          type="number" 
                          value={rubrica.quantidade || ''}
                          disabled={isBlocked}
                          readOnly={isCombustivel}
                          onChange={(e) => {
                            if (isCombustivel) return;
                            const newRubricas = [...formData.rubricas];
                            const qtd = Number(e.target.value);
                            let valorTotal = 0;
                            
                            if (isAjudaCusto) {
                              const precoUnitario = 6000;
                              const dias = formData.totalDias || 0;
                              valorTotal = (qtd * dias * precoUnitario) + (0.3 * precoUnitario * qtd);
                              newRubricas[index] = { 
                                ...rubrica, 
                                quantidade: qtd,
                                precoUnitario: precoUnitario,
                                valorTotal: valorTotal
                              };
                            } else {
                              valorTotal = qtd * (rubrica.precoUnitario || 0);
                              newRubricas[index] = { 
                                ...rubrica, 
                                quantidade: qtd,
                                valorTotal: valorTotal
                              };
                            }
                            setFormData({ ...formData, rubricas: newRubricas });
                          }}
                          className={`w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${isCombustivel ? 'bg-gray-50 text-blue-900 font-bold' : ''}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Preço Unitário (MT)</label>
                        <input 
                          type="number" 
                          value={isAjudaCusto ? 6000 : (rubrica.precoUnitario || '')}
                          readOnly={isAjudaCusto || isCombustivel}
                          disabled={isBlocked}
                          onChange={(e) => {
                            if (isAjudaCusto || isCombustivel) return;
                            const newRubricas = [...formData.rubricas];
                            const preco = Number(e.target.value);
                            newRubricas[index] = { 
                              ...rubrica, 
                              precoUnitario: preco,
                              valorTotal: (rubrica.quantidade || 0) * preco
                            };
                            setFormData({ ...formData, rubricas: newRubricas });
                          }}
                          className={`w-full p-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${(isAjudaCusto || isCombustivel) ? 'bg-gray-50 text-blue-900 font-bold' : ''}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Valor Total (MT)</label>
                        <div className="w-full p-2.5 bg-gray-50 border rounded-xl text-sm font-bold text-blue-900">
                          {rubrica.valorTotal?.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' }) || '0,00 MT'}
                        </div>
                      </div>
                    </div>

                    {isAjudaCusto && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-4"
                      >
                        <h5 className="text-xs font-bold text-blue-900 uppercase">Detalhes da Ajuda de Custo</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Número de Dias (Automático)</label>
                            <input 
                              type="number" 
                              readOnly
                              value={formData.totalDias || 0}
                              className="w-full p-2 border bg-gray-50 rounded-lg text-sm font-bold text-blue-900 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Fórmula Aplicada</label>
                            <div className="w-full p-2 border bg-gray-50 rounded-lg text-xs text-gray-600 outline-none">
                              (Pessoas × Dias × 6000) + (30% × 6000 × Pessoas)
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {formData.rubricas.length > 1 && (
                      <button 
                        onClick={() => handleRemoveRubrica(rubrica.id)}
                        className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-all shadow-sm"
                      >
                        <Plus size={14} className="rotate-45" />
                      </button>
                    )}
                  </div>
                );
              })}
              <button 
                onClick={handleAddRubrica}
                className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
              >
                <Plus size={18} /> ADICIONAR NOVA RÚBRICA
              </button>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-blue-900 border-b pb-2 tracking-tighter uppercase">VII. OBSERVAÇÕES</h4>
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-blue-900 uppercase mb-1">Nota adicional</label>
              <textarea 
                rows={8} 
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                placeholder="Escreva uma nota caso necessário..."
                className="w-full p-4 border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-8 bg-gray-50/50 border-b text-center space-y-4 relative">
          <div className="space-y-1 pr-8 sm:pr-0">
            <h2 className="text-lg sm:text-xl font-black text-blue-900 tracking-tighter uppercase">Instituto Superior Politécnico de Songo</h2>
            <h3 className="text-xs sm:text-sm font-bold text-blue-700 uppercase tracking-widest">FORMULÁRIO DE PLANO DE ATIVIDADES</h3>
            <p className="text-[10px] font-bold text-blue-500 uppercase">Ano Económico (De 2026 para 2027)</p>
          </div>
          
          <div className="absolute top-4 sm:top-8 right-4 sm:right-8">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <Plus size={24} className="rotate-45" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold text-blue-900 uppercase">Passo {step} de {totalSteps}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-900"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-auto p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`w-full sm:w-auto px-6 py-2 rounded-lg font-bold text-sm transition-all ${step === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Anterior
          </button>
          
          {step < totalSteps ? (
            <button 
              onClick={nextStep}
              className="w-full sm:w-auto justify-center bg-[#1a5f7a] text-white px-8 py-2 rounded-lg font-bold text-sm hover:bg-[#154d63] transition-all flex items-center gap-2"
            >
              Seguinte <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={() => onSubmit({ ...formData, selectedCategory })}
              className="w-full sm:w-auto justify-center bg-[#00a86b] text-white px-10 py-2 rounded-lg font-bold text-sm hover:bg-[#008f5b] transition-all flex items-center gap-2"
            >
              <Save size={18} /> Submeter o Registo
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
