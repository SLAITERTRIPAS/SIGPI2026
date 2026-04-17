import React, { useState } from 'react';
import { Search, Plus, FileText, Calendar, Download, Filter, ChevronRight, History, Building2, LayoutGrid, FileCheck, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import StandardReportModel from './StandardReportModel';

interface ReportData {
  id: string;
  title: string;
  direction: string;
  year: number;
  type?: string;
  sections: { title: string; content: React.ReactNode }[];
  technicalSheet?: { name: string; role: string }[];
  abbreviations?: { sigla: string; significado: string }[];
}

export default function ReportsView({ 
  onShowAlert, 
  initialDirection 
}: { 
  onShowAlert: (msg: string) => void,
  initialDirection?: string
}) {
  const directions = [
    { id: 'DG', name: 'Direção Geral', icon: <Building2 />, color: 'blue' },
    { id: 'DICOSAFA', name: 'DICOSAFA (Adm. e Finanças)', icon: <LayoutGrid />, color: 'purple' },
    { id: 'DICOSSER', name: 'DICOSSER (Académicos)', icon: <FileCheck />, color: 'green' },
    { id: 'DE', name: 'Divisão de Engenharia', icon: <Building2 />, color: 'orange' },
  ];

  const normalizeDirection = (dir: string | undefined) => {
    if (!dir) return null;
    const d = dir.toUpperCase();
    if (d.includes('GERAL')) return 'Direção Geral';
    if (d.includes('DICOSAFA')) return 'DICOSAFA (Adm. e Finanças)';
    if (d.includes('DICOSSER')) return 'DICOSSER (Académicos)';
    if (d.includes('ENGENHARIA')) return 'Divisão de Engenharia';
    return dir;
  };

  const [reportType, setReportType] = useState<'Anual' | 'Semestral' | null>(null);
  const [mode, setMode] = useState<'type-selection' | 'action-selection' | 'consult' | 'new' | 'view-report' | 'edit-report'>('type-selection');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear() - 1);
  const [selectedDirection, setSelectedDirection] = useState<string | null>(normalizeDirection(initialDirection));
  const [activeReport, setActiveReport] = useState<ReportData | null>(null);

  const mockReports: ReportData[] = [
    {
      id: 'rep-1',
      title: 'Relatório de Atividades',
      direction: 'Direção Geral',
      year: selectedYear,
      type: 'Anual',
      technicalSheet: [
        { name: 'Dr. Eng. Francisco Trípas', role: 'Diretor Geral' },
        { name: 'Franzíssi Tripalonga Vicente', role: 'Gestor de Sistemas' }
      ],
      abbreviations: [
        { sigla: 'ISPS', significado: 'Instituto Superior Politécnico de Songo' },
        { sigla: 'DG', significado: 'Direção Geral' }
      ],
      sections: [
        { 
          title: 'Introdução', 
          content: <p>Este relatório apresenta as principais atividades desenvolvidas pela Direção Geral durante o exercício de {selectedYear}. Focamos na modernização administrativa e na consolidação do SIGPI.</p> 
        },
        { 
          title: 'Metas Atingidas', 
          content: <ul className="list-disc ml-6"><li>Implementação do SIGPI em 80% dos setores.</li><li>Redução de 40% no consumo de papel.</li><li>Aumento da transparência nos processos de expediente.</li></ul> 
        }
      ]
    },
    {
      id: 'rep-2',
      title: 'Relatório de Execução Orçamental',
      direction: 'DICOSAFA (Adm. e Finanças)',
      year: selectedYear,
      type: 'Semestral',
      sections: [
        { title: 'Resumo Financeiro', content: <p>A execução orçamental de {selectedYear} seguiu rigorosamente os planos aprovados pelo CAG.</p> },
        { title: 'Detalhamento de Gastos', content: <p>Os maiores investimentos foram realizados na infraestrutura de rede e capacitação de pessoal.</p> }
      ]
    }
  ];

  const years = Array.from({ length: new Date().getFullYear() - 2010 + 1 }, (_, i) => 2010 + i).reverse();
  const nextYear = new Date().getFullYear() + 1;

  const handleOpenReport = (report: ReportData) => {
    setActiveReport(report);
    setMode('view-report');
  };

  const renderTypeSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mt-12">
      <button 
        onClick={() => { setReportType('Anual'); setMode('action-selection'); }}
        className="group bg-white border-2 border-gray-100 p-10 rounded-3xl shadow-sm hover:border-blue-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-6"
      >
        <div className="p-6 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Calendar size={48} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Relatório Anual</h3>
          <p className="text-gray-500">Relatórios referentes ao ano civil completo.</p>
        </div>
      </button>

      <button 
        onClick={() => { setReportType('Semestral'); setMode('action-selection'); }}
        className="group bg-white border-2 border-gray-100 p-10 rounded-3xl shadow-sm hover:border-purple-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-6"
      >
        <div className="p-6 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
          <Calendar size={48} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Relatório Semestral</h3>
          <p className="text-gray-500">Relatórios referentes a um semestre específico.</p>
        </div>
      </button>
    </div>
  );

  const renderActionSelection = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto mt-12 space-y-8"
    >
      <button onClick={() => setMode('type-selection')} className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-2">
        ← VOLTAR AOS TIPOS DE RELATÓRIO
      </button>
      
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900">Relatório {reportType}</h3>
        <p className="text-gray-500">Escolha a ação que deseja realizar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button 
          onClick={() => setMode('consult')}
          className="group bg-white border-2 border-gray-100 p-10 rounded-3xl shadow-sm hover:border-blue-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-6"
        >
          <div className="p-6 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Search size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Consultar</h3>
            <p className="text-gray-500">Apresenta relatórios anteriores.</p>
          </div>
        </button>

        <button 
          onClick={() => {
            setActiveReport(null);
            setMode('edit-report');
          }}
          className="group bg-white border-2 border-gray-100 p-10 rounded-3xl shadow-sm hover:border-green-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-6"
        >
          <div className="p-6 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-colors">
            <Plus size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Novo</h3>
            <p className="text-gray-500">Abre o layout de relatório a produzir.</p>
          </div>
        </button>
      </div>
    </motion.div>
  );

  const renderConsult = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-5xl mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <button onClick={() => { setMode('action-selection'); setSelectedDirection(null); }} className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-2">
          ← VOLTAR ÀS AÇÕES
        </button>
        <div className="flex items-center gap-4">
          <label className="text-xs font-bold text-gray-400 uppercase">Ano:</label>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold text-blue-900 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {!selectedDirection ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {directions.map((dir) => (
            <button
              key={dir.id}
              onClick={() => setSelectedDirection(dir.name)}
              className={`p-8 bg-white border-2 border-gray-100 rounded-3xl shadow-sm hover:border-${dir.color}-500 hover:shadow-lg transition-all flex items-center gap-6 text-left`}
            >
              <div className={`p-4 bg-${dir.color}-50 text-${dir.color}-600 rounded-2xl`}>
                {React.cloneElement(dir.icon as React.ReactElement, { size: 32 })}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{dir.name}</h4>
                <p className="text-sm text-gray-500">Ver relatórios desta direção</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedDirection(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedDirection}</h3>
                <p className="text-sm text-gray-500">Relatórios de {selectedYear}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all text-sm">
              <Download size={18} /> DESCARREGAR TUDO (.ZIP)
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {mockReports
              .filter(r => r.direction === selectedDirection && r.year === selectedYear && (r as any).type === reportType)
              .map((doc, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 text-gray-400 rounded-lg">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{doc.title}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">RELATÓRIO {reportType?.toUpperCase()} • {selectedYear}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setActiveReport(doc);
                        setMode('edit-report');
                      }}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs hover:bg-blue-600 hover:text-white transition-all"
                    >
                      ABRIR
                    </button>
                    <button 
                      onClick={() => onShowAlert('A descarregar relatório...')}
                      className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                      <Download size={16} /> DESCARREGAR
                    </button>
                  </div>
                </div>
              ))}
            {mockReports.filter(r => r.direction === selectedDirection && r.year === selectedYear && (r as any).type === reportType).length === 0 && (
              <div className="p-12 text-center text-gray-400 italic">
                Nenhum relatório encontrado para esta direção em {selectedYear}.
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderNew = () => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      <button onClick={() => setMode('selection')} className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-2">
        ← VOLTAR À SELECÇÃO
      </button>

      <div className="bg-white border border-gray-100 p-10 rounded-3xl shadow-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Novo Relatório de Atividades {nextYear}</h3>
          <p className="text-gray-500">Inicie o processo de recolha de dados e indicadores para o próximo ciclo.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Título do Relatório</label>
            <input 
              type="text" 
              defaultValue={`Relatório de Atividades e Contas - Exercício ${nextYear}`}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Data de Início</label>
              <div className="relative">
                <input type="date" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
                <Calendar className="absolute right-4 top-4 text-gray-400" size={20} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Prazo de Entrega</label>
              <div className="relative">
                <input type="date" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
                <Calendar className="absolute right-4 top-4 text-gray-400" size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Instruções para as Direções</label>
            <textarea 
              rows={4}
              placeholder="Descreva as orientações específicas para o preenchimento deste relatório..."
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <div className="pt-6 flex justify-end gap-4">
          <button 
            onClick={() => setMode('selection')}
            className="px-8 py-3 text-gray-500 font-bold hover:text-gray-700"
          >
            CANCELAR
          </button>
          <button 
            onClick={() => {
              onShowAlert(`Processo de relatório para ${nextYear} iniciado com sucesso!`);
              setMode('selection');
            }}
            className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
          >
            CRIAR E NOTIFICAR DIRECÇÕES
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full h-full">
      {mode !== 'view-report' && mode !== 'edit-report' && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900">Gestão de Relatórios</h2>
          <p className="text-gray-500">Consulte o histórico institucional ou inicie novos processos de reporte.</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {mode === 'type-selection' && renderTypeSelection()}
        {mode === 'action-selection' && renderActionSelection()}
        {mode === 'consult' && renderConsult()}
        {mode === 'edit-report' && (
          <ReportEditor 
            report={activeReport} 
            reportType={reportType}
            onBack={() => setMode(activeReport ? 'consult' : 'action-selection')} 
            onSave={() => {
              onShowAlert('Relatório guardado com sucesso!');
              setMode('consult');
            }}
          />
        )}
        {mode === 'view-report' && activeReport && (
          <StandardReportModel 
            direction={activeReport.direction}
            year={activeReport.year}
            title={activeReport.title}
            sections={activeReport.sections}
            technicalSheet={activeReport.technicalSheet}
            abbreviations={activeReport.abbreviations}
            onBack={() => setMode('consult')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ReportEditor({ report, reportType, onBack, onSave }: { report: ReportData | null, reportType: string | null, onBack: () => void, onSave: () => void }) {
  const [title, setTitle] = useState(report?.title || `Relatório ${reportType || ''}`);
  const [direction, setDirection] = useState(report?.direction || 'Direção Geral');
  const [year, setYear] = useState(report?.year || new Date().getFullYear());
  const [sections, setSections] = useState<{title: string, content: string}[]>(
    report?.sections.map(s => ({ title: s.title, content: '' })) || [
      { title: 'Introdução', content: '' },
      { title: 'Desenvolvimento', content: '' },
      { title: 'Conclusão', content: '' }
    ]
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto bg-white shadow-2xl min-h-screen flex flex-col"
    >
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50 sticky top-0 z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold">
          <ArrowLeft size={20} /> VOLTAR
        </button>
        <div className="flex gap-4">
          <button onClick={onSave} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
            <FileCheck size={18} /> GUARDAR RELATÓRIO
          </button>
        </div>
      </div>

      <div className="p-12 flex-grow space-y-12 font-serif">
        <div className="text-center space-y-6 border-b-2 border-black pb-12">
          <input 
            type="text" 
            value={direction}
            onChange={e => setDirection(e.target.value)}
            className="text-2xl font-black tracking-tight leading-tight text-center w-full outline-none border-b border-transparent hover:border-gray-200 focus:border-blue-500 transition-colors"
            placeholder="Nome da Direção"
          />
          <input 
            type="text" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="text-4xl font-black text-center w-full outline-none border-b border-transparent hover:border-gray-200 focus:border-blue-500 transition-colors"
            placeholder="Título do Relatório"
          />
          <div className="flex items-center justify-center gap-2 text-xl font-bold">
            ANO DE 
            <input 
              type="number" 
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              className="w-24 text-center outline-none border-b border-transparent hover:border-gray-200 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                <input 
                  type="text"
                  value={section.title}
                  onChange={e => {
                    const newSections = [...sections];
                    newSections[idx].title = e.target.value;
                    setSections(newSections);
                  }}
                  className="text-xl font-bold uppercase w-full outline-none border-b border-transparent hover:border-gray-200 focus:border-blue-500 transition-colors"
                  placeholder="Título da Secção"
                />
              </div>
              <textarea 
                value={section.content}
                onChange={e => {
                  const newSections = [...sections];
                  newSections[idx].content = e.target.value;
                  setSections(newSections);
                }}
                rows={8}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-y text-justify leading-relaxed"
                placeholder="Escreva o conteúdo desta secção aqui..."
              />
            </div>
          ))}

          <button 
            onClick={() => setSections([...sections, { title: 'Nova Secção', content: '' }])}
            className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-500 font-bold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} /> ADICIONAR SECÇÃO
          </button>
        </div>
      </div>
    </motion.div>
  );
}
