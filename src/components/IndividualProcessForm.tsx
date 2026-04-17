import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Save, Upload, FileText, Search, User, Calendar, MapPin, Briefcase, GraduationCap, Award, AlertCircle, CheckCircle2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SearchableSelect from './ui/SearchableSelect';
import { ESTADOS_CIVIS, NIVEIS_ACADEMICOS, CATEGORIAS_FUNCIONARIOS, PROVINCIAS_LIST, SECOES, HABILITACOES_PROFISSIONAIS_LIST } from '../constants/formOptions';

interface IndividualProcessData {
  // Page 1: Cover
  processoNo: string;
  seccao: string;
  nome: string;
  processoIndividualNo: string;
  nuit: string;

  // Page 2: Personal Data
  genero: 'M' | 'F';
  filiacao: string;
  estadoCivil: string;
  naturalidade: string;
  dataNascimento: string;
  biNo: string;
  biEmitidoA: string;
  biEm: string;
  habilitacoesLiterarias: string;
  habilitacoesProfissionais: string;
  carteiraProfissionalNo: string;
  socioSindicatoNo: string;
  trabalhoAnterior: { ano: string; empresa: string; observacoes: string }[];
  morada: string;
  celula: string;
  quarteiraoNo: string;
  casaNo: string;
  telefone: string;
  totalFilhos: string;
  filhosMenores: { dataNascimento: string; nome: string; numeroFilho: string }[];
  dataAdmissao: string;
  categoria: string;
  evolucaoHabilitacoesProfissionais: { data: string; descricao: string }[];
  evolucaoHabilitacoesLiterarias: { data: string; descricao: string; instituicao: string }[];

  // Page 3: Variations & Absences
  variacoesCategoriasVencimentos: { data: string; categoria: string; vencimento: string; data2: string; categoria2: string; vencimento2: string }[];
  faltasAnuais: { data: string; categoria: string; vencimento: string; data2: string; categoria2: string; vencimento2: string }[]; // Based on image 3 left side
  movimentoFerias: { periodo: string; dias: string; diasGozar: string; inicio: string; termino: string; rubrica: string }[];
  observacoesPag3: string;

  // Page 4: Punishments & Rewards
  punicoes: { data: string; descricao: string }[];
  descontosAnuais: { data: string; descricao: string; ano: string; descricao2: string }[];
  louvores: { data: string; descricao: string }[];
  gratificacoes: { data: string; normal: string; especial: string; data2: string; normal2: string; especial2: string }[];

  // Page 5: Attached Documents
  documentosAnexos: { data: string; descricao: string }[];
  ficheiros: File[];
  fotoUrl: string;
}

const initialData: IndividualProcessData = {
  processoNo: '',
  seccao: '',
  nome: '',
  processoIndividualNo: '',
  nuit: '',
  genero: 'M',
  filiacao: '',
  estadoCivil: '',
  naturalidade: '',
  dataNascimento: '',
  biNo: '',
  biEmitidoA: '',
  biEm: '',
  habilitacoesLiterarias: '',
  habilitacoesProfissionais: '',
  carteiraProfissionalNo: '',
  socioSindicatoNo: '',
  trabalhoAnterior: Array(3).fill({ ano: '', empresa: '', observacoes: '' }),
  morada: '',
  celula: '',
  quarteiraoNo: '',
  casaNo: '',
  telefone: '',
  totalFilhos: '',
  filhosMenores: Array(4).fill({ dataNascimento: '', nome: '', numeroFilho: '' }),
  dataAdmissao: '',
  categoria: '',
  evolucaoHabilitacoesProfissionais: Array(4).fill({ data: '', descricao: '' }),
  evolucaoHabilitacoesLiterarias: Array(4).fill({ data: '', descricao: '', instituicao: '' }),
  variacoesCategoriasVencimentos: Array(8).fill({ data: '', categoria: '', vencimento: '', data2: '', categoria2: '', vencimento2: '' }),
  faltasAnuais: Array(8).fill({ data: '', categoria: '', vencimento: '', data2: '', categoria2: '', vencimento2: '' }),
  movimentoFerias: Array(10).fill({ periodo: '', dias: '', diasGozar: '', inicio: '', termino: '', rubrica: '' }),
  observacoesPag3: '',
  punicoes: Array(5).fill({ data: '', descricao: '' }),
  descontosAnuais: Array(5).fill({ data: '', descricao: '', ano: '', descricao2: '' }),
  louvores: Array(5).fill({ data: '', descricao: '' }),
  gratificacoes: Array(5).fill({ data: '', normal: '', especial: '', data2: '', normal2: '', especial2: '' }),
  documentosAnexos: Array(15).fill({ data: '', descricao: '' }),
  ficheiros: [],
  fotoUrl: ''
};

export default function IndividualProcessForm({ 
  onClose, 
  onSubmit 
}: { 
  onClose: () => void, 
  onSubmit: (data: IndividualProcessData) => void 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<IndividualProcessData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof IndividualProcessData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTableChange = (field: keyof IndividualProcessData, index: number, subField: string, value: any) => {
    const list = [...(formData[field] as any[])];
    list[index] = { ...list[index], [subField]: value };
    setFormData(prev => ({ ...prev, [field]: list }));
  };

  const addRow = (field: keyof IndividualProcessData, template: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), template]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, ficheiros: [...prev.ficheiros, ...newFiles] }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, fotoUrl: event.target?.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 2000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="space-y-12 py-10 flex flex-col items-center relative">
            <div className="absolute top-10 right-10">
              <div className="relative group">
                <label className="w-32 h-40 border border-black flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
                  {formData.fotoUrl ? (
                    <img src={formData.fotoUrl} alt="Foto" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <span className="text-[10px] text-gray-400 text-center px-2 uppercase font-bold">Carregar Foto</span>
                    </>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </label>
                {formData.fotoUrl && (
                  <button 
                    onClick={() => handleInputChange('fotoUrl', '')}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <AlertCircle size={12} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className="border-2 border-black p-4 w-48 text-center">
                <p className="text-xs font-bold uppercase">Processo</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">Nº</span>
                  <input 
                    type="text" 
                    className="w-full border-b border-dotted border-black outline-none text-center font-bold"
                    value={formData.processoNo}
                    onChange={e => handleInputChange('processoNo', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-20 my-20 w-full">
              <div className="w-full max-w-md space-y-8">
                <div className="flex items-center gap-4 justify-center">
                  <span className="text-xs font-bold uppercase rotate-180 [writing-mode:vertical-lr]">SECÇÃO</span>
                  <SearchableSelect 
                    className="w-full text-xl font-serif text-center"
                    options={SECOES}
                    value={formData.seccao}
                    onChange={(val) => handleInputChange('seccao', val)}
                    placeholder="Selecionar Secção..."
                  />
                </div>
              </div>

              <div className="text-center space-y-4">
                <h1 className="text-6xl font-black tracking-tighter text-gray-900 uppercase">Processo Individual</h1>
                <p className="text-2xl font-serif italic text-gray-500">DE</p>
              </div>

              <div className="w-full max-w-2xl space-y-6">
                <div className="flex items-center gap-4 justify-center">
                  <span className="text-xs font-bold uppercase rotate-180 [writing-mode:vertical-lr]">NOME</span>
                  <div className="w-full space-y-4">
                    <input 
                      type="text" 
                      className="w-full border-b border-black outline-none text-2xl font-bold text-center uppercase"
                      value={formData.nome}
                      onChange={e => handleInputChange('nome', e.target.value)}
                    />
                    <div className="border-b border-black w-full h-px"></div>
                    <div className="border-b border-black w-full h-px"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center w-full mt-20">
              <div className="border-2 border-black p-6 w-full max-w-md h-32 flex items-end justify-center">
                <div className="flex items-center gap-2 w-full justify-center">
                  <span className="text-xs font-bold uppercase whitespace-nowrap">PROCESSO INDIVIDUAL Nº</span>
                  <input 
                    type="text" 
                    className="w-full border-b border-dotted border-black outline-none font-bold text-center"
                    value={formData.processoIndividualNo}
                    onChange={e => handleInputChange('processoIndividualNo', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 text-sm">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">NOME:</span>
                  <input type="text" className="flex-grow border-b border-black outline-none" value={formData.nome} onChange={e => handleInputChange('nome', e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Género:</span>
                  <select 
                    className="flex-grow border-b border-black outline-none bg-transparent"
                    value={formData.genero}
                    onChange={e => handleInputChange('genero', e.target.value)}
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Filiação:</span>
                  <input type="text" className="flex-grow border-b border-black outline-none" value={formData.filiacao} onChange={e => handleInputChange('filiacao', e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">NUIT:</span>
                  <input type="text" className="flex-grow border-b border-black outline-none" value={formData.nuit} onChange={e => handleInputChange('nuit', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Estado Civil:</span>
                  <SearchableSelect 
                    className="flex-grow"
                    options={ESTADOS_CIVIS}
                    value={formData.estadoCivil}
                    onChange={(val) => handleInputChange('estadoCivil', val)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Naturalidade:</span>
                  <SearchableSelect 
                    className="flex-grow"
                    options={PROVINCIAS_LIST}
                    value={formData.naturalidade}
                    onChange={(val) => handleInputChange('naturalidade', val)}
                  />
                </div>
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Data de Nascimento:</span>
                  <input type="date" className="flex-grow border-b border-black outline-none" value={formData.dataNascimento} onChange={e => handleInputChange('dataNascimento', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">B.I. Nº:</span>
                  <input type="text" className="flex-grow border-b border-black outline-none" value={formData.biNo} onChange={e => handleInputChange('biNo', e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Emitido a:</span>
                  <input type="text" className="flex-grow border-b border-black outline-none" value={formData.biEmitidoA} onChange={e => handleInputChange('biEmitidoA', e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">em:</span>
                  <input type="date" className="flex-grow border-b border-black outline-none" value={formData.biEm} onChange={e => handleInputChange('biEm', e.target.value)} />
                </div>
              </div>
              <div className="flex gap-2">
                <span className="font-bold uppercase whitespace-nowrap">Habilitações Literárias:</span>
                <SearchableSelect 
                  className="flex-grow"
                  options={NIVEIS_ACADEMICOS}
                  value={formData.habilitacoesLiterarias}
                  onChange={(val) => handleInputChange('habilitacoesLiterarias', val)}
                />
              </div>
              <div className="flex gap-2">
                <span className="font-bold uppercase whitespace-nowrap">Habilitações Profissionais:</span>
                <SearchableSelect 
                  className="flex-grow"
                  options={HABILITACOES_PROFISSIONAIS_LIST}
                  value={formData.habilitacoesProfissionais}
                  onChange={(val) => handleInputChange('habilitacoesProfissionais', val)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Carteira Profissional Nº:</span>
                  <input type="text" className="flex-grow border-b border-black outline-none" value={formData.carteiraProfissionalNo} onChange={e => handleInputChange('carteiraProfissionalNo', e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Sócio do Sindicato Nº:</span>
                  <input type="text" className="flex-grow border-b border-black outline-none" value={formData.socioSindicatoNo} onChange={e => handleInputChange('socioSindicatoNo', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="mt-8 relative">
              <h3 className="text-center font-bold uppercase mb-2">EMPRESA OU SERVIÇOS TRABALHOU ANTERIORMENTE</h3>
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-1 w-20">Ano</th>
                    <th className="border border-black p-1">Empresa ou Serviço</th>
                    <th className="border border-black p-1">Observações</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.trabalhoAnterior.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-black p-0"><input type="number" min="1900" max="2100" className="w-full p-1 outline-none" value={item.ano} onChange={e => handleTableChange('trabalhoAnterior', idx, 'ano', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.empresa} onChange={e => handleTableChange('trabalhoAnterior', idx, 'empresa', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.observacoes} onChange={e => handleTableChange('trabalhoAnterior', idx, 'observacoes', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-2">
                <button 
                  onClick={() => addRow('trabalhoAnterior', { ano: '', empresa: '', observacoes: '' })}
                  className="bg-blue-900 text-white px-4 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-blue-800 transition-colors"
                >
                  <Plus size={12} /> + coluna
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="flex gap-2">
                <span className="font-bold uppercase whitespace-nowrap">Morada:</span>
                <input type="text" className="flex-grow border-b border-black outline-none" value={formData.morada} onChange={e => handleInputChange('morada', e.target.value)} />
              </div>
              <div className="grid grid-cols-5 gap-4">
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Célula:</span>
                  <input type="text" className="flex-grow border-b border-black outline-none" value={formData.celula} onChange={e => handleInputChange('celula', e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Quarteirão nº:</span>
                  <input type="text" className="flex-grow border-b border-black outline-none" value={formData.quarteiraoNo} onChange={e => handleInputChange('quarteiraoNo', e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Casa nº:</span>
                  <input type="text" className="flex-grow border-b border-black outline-none" value={formData.casaNo} onChange={e => handleInputChange('casaNo', e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Telefone:</span>
                  <input type="text" className="flex-grow border-b border-black outline-none" value={formData.telefone} onChange={e => handleInputChange('telefone', e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <span className="font-bold uppercase whitespace-nowrap">Nº Filhos:</span>
                  <input type="number" className="flex-grow border-b border-black outline-none" value={formData.totalFilhos} onChange={e => handleInputChange('totalFilhos', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold uppercase mb-2">Filhos menores</h3>
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-1 w-10">Nº</th>
                    <th className="border border-black p-1 w-32">Data de Nascimento</th>
                    <th className="border border-black p-1">Nome</th>
                    <th className="border border-black p-1 w-24">Nº de Filhos</th>
                    <th className="border border-black p-1 w-10">Nº</th>
                    <th className="border border-black p-1 w-32">Data de Nascimento</th>
                    <th className="border border-black p-1">Nome</th>
                    <th className="border border-black p-1 w-24">Nº de Filhos</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const numRows = Math.ceil(formData.filhosMenores.length / 2);
                    return Array.from({ length: numRows }).map((_, rowIndex) => {
                      const idx1 = rowIndex;
                      const idx2 = rowIndex + numRows;
                      return (
                        <tr key={rowIndex}>
                          <td className="border border-black p-1 text-center font-bold">{idx1 + 1}</td>
                          <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={formData.filhosMenores[idx1]?.dataNascimento || ''} onChange={e => handleTableChange('filhosMenores', idx1, 'dataNascimento', e.target.value)} /></td>
                          <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={formData.filhosMenores[idx1]?.nome || ''} onChange={e => handleTableChange('filhosMenores', idx1, 'nome', e.target.value)} /></td>
                          <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={formData.filhosMenores[idx1]?.numeroFilho || ''} onChange={e => handleTableChange('filhosMenores', idx1, 'numeroFilho', e.target.value)} /></td>
                          
                          {idx2 < formData.filhosMenores.length ? (
                            <>
                              <td className="border border-black p-1 text-center font-bold">{idx2 + 1}</td>
                              <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={formData.filhosMenores[idx2]?.dataNascimento || ''} onChange={e => handleTableChange('filhosMenores', idx2, 'dataNascimento', e.target.value)} /></td>
                              <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={formData.filhosMenores[idx2]?.nome || ''} onChange={e => handleTableChange('filhosMenores', idx2, 'nome', e.target.value)} /></td>
                              <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={formData.filhosMenores[idx2]?.numeroFilho || ''} onChange={e => handleTableChange('filhosMenores', idx2, 'numeroFilho', e.target.value)} /></td>
                            </>
                          ) : (
                            <>
                              <td className="border border-black p-1"></td>
                              <td className="border border-black p-1"></td>
                              <td className="border border-black p-1"></td>
                              <td className="border border-black p-1"></td>
                            </>
                          )}
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
              <div className="flex justify-end mt-2">
                <button 
                  onClick={() => {
                    addRow('filhosMenores', { dataNascimento: '', nome: '', numeroFilho: '' });
                    addRow('filhosMenores', { dataNascimento: '', nome: '', numeroFilho: '' });
                  }}
                  className="bg-blue-900 text-white px-4 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-blue-800 transition-colors"
                >
                  <Plus size={12} /> + coluna
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex gap-2">
                <span className="font-bold uppercase whitespace-nowrap">Data de Admissão:</span>
                <input type="date" className="flex-grow border-b border-black outline-none" value={formData.dataAdmissao} onChange={e => handleInputChange('dataAdmissao', e.target.value)} />
              </div>
              <div className="flex gap-2">
                <span className="font-bold uppercase whitespace-nowrap">Categoria:</span>
                <SearchableSelect 
                  className="flex-grow"
                  options={CATEGORIAS_FUNCIONARIOS}
                  value={formData.categoria}
                  onChange={(val) => handleInputChange('categoria', val)}
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-center font-bold uppercase mb-2">EVOLUÇÃO DE HABILITAÇÕES PROFISSIONAIS</h3>
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-1 w-10">Nº</th>
                    <th className="border border-black p-1 w-32">DATA</th>
                    <th className="border border-black p-1">DESCRIÇÃO</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.evolucaoHabilitacoesProfissionais.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-black p-1 text-center font-bold">{idx + 1}</td>
                      <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.data} onChange={e => handleTableChange('evolucaoHabilitacoesProfissionais', idx, 'data', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.descricao} onChange={e => handleTableChange('evolucaoHabilitacoesProfissionais', idx, 'descricao', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-2">
                <button 
                  onClick={() => addRow('evolucaoHabilitacoesProfissionais', { data: '', descricao: '' })}
                  className="bg-blue-900 text-white px-4 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-blue-800 transition-colors"
                >
                  <Plus size={12} /> + coluna
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-center font-bold uppercase mb-2">EVOLUÇÃO DE HABILITAÇÕES LITERÁRIAS</h3>
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-1 w-10">Nº</th>
                    <th className="border border-black p-1 w-32">DATA</th>
                    <th className="border border-black p-1">DESCRIÇÃO</th>
                    <th className="border border-black p-1">INSTITUIÇÃO</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.evolucaoHabilitacoesLiterarias.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-black p-1 text-center font-bold">{idx + 1}</td>
                      <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.data} onChange={e => handleTableChange('evolucaoHabilitacoesLiterarias', idx, 'data', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.descricao} onChange={e => handleTableChange('evolucaoHabilitacoesLiterarias', idx, 'descricao', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.instituicao} onChange={e => handleTableChange('evolucaoHabilitacoesLiterarias', idx, 'instituicao', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-2">
                <button 
                  onClick={() => addRow('evolucaoHabilitacoesLiterarias', { data: '', descricao: '', instituicao: '' })}
                  className="bg-blue-900 text-white px-4 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-blue-800 transition-colors"
                >
                  <Plus size={12} /> + coluna
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 text-[10px]">
            <div>
              <h3 className="text-center font-bold uppercase mb-2">VARIAÇÕES DE CATEGORIAS E VENCIMENTOS</h3>
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-1">DATA</th>
                    <th className="border border-black p-1">CATEGORIA</th>
                    <th className="border border-black p-1">VENCIMENTO</th>
                    <th className="border border-black p-1">DATA</th>
                    <th className="border border-black p-1">CATEGORIA</th>
                    <th className="border border-black p-1">VENCIMENTO</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.variacoesCategoriasVencimentos.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.data} onChange={e => handleTableChange('variacoesCategoriasVencimentos', idx, 'data', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.categoria} onChange={e => handleTableChange('variacoesCategoriasVencimentos', idx, 'categoria', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.vencimento} onChange={e => handleTableChange('variacoesCategoriasVencimentos', idx, 'vencimento', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.data2} onChange={e => handleTableChange('variacoesCategoriasVencimentos', idx, 'data2', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.categoria2} onChange={e => handleTableChange('variacoesCategoriasVencimentos', idx, 'categoria2', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.vencimento2} onChange={e => handleTableChange('variacoesCategoriasVencimentos', idx, 'vencimento2', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-center font-bold uppercase mb-2">MOVIMENTO DE FÉRIAS</h3>
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th rowSpan={2} className="border border-black p-1">Férias relativas ao Período de</th>
                    <th rowSpan={2} className="border border-black p-1">Dias</th>
                    <th colSpan={2} className="border border-black p-1">FALTAS AO SERVIÇO</th>
                    <th rowSpan={2} className="border border-black p-1">Dias a gozar</th>
                    <th colSpan={2} className="border border-black p-1">GOZO DE FÉRIAS</th>
                    <th rowSpan={2} className="border border-black p-1">Rubrica</th>
                  </tr>
                  <tr>
                    <th className="border border-black p-1">Justificadas</th>
                    <th className="border border-black p-1">Não Justificadas</th>
                    <th className="border border-black p-1">Início</th>
                    <th className="border border-black p-1">Término</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.movimentoFerias.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.periodo} onChange={e => handleTableChange('movimentoFerias', idx, 'periodo', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.dias} onChange={e => handleTableChange('movimentoFerias', idx, 'dias', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.diasGozar} onChange={e => handleTableChange('movimentoFerias', idx, 'diasGozar', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.inicio} onChange={e => handleTableChange('movimentoFerias', idx, 'inicio', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.termino} onChange={e => handleTableChange('movimentoFerias', idx, 'termino', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.rubrica} onChange={e => handleTableChange('movimentoFerias', idx, 'rubrica', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-center font-bold uppercase mb-2">FALTAS ANUAIS</h3>
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-1">DATA</th>
                    <th className="border border-black p-1">CATEGORIA</th>
                    <th className="border border-black p-1">VENCIMENTO</th>
                    <th className="border border-black p-1">DATA</th>
                    <th className="border border-black p-1">CATEGORIA</th>
                    <th className="border border-black p-1">VENCIMENTO</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.faltasAnuais.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.data} onChange={e => handleTableChange('faltasAnuais', idx, 'data', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.categoria} onChange={e => handleTableChange('faltasAnuais', idx, 'categoria', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.vencimento} onChange={e => handleTableChange('faltasAnuais', idx, 'vencimento', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.data2} onChange={e => handleTableChange('faltasAnuais', idx, 'data2', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.categoria2} onChange={e => handleTableChange('faltasAnuais', idx, 'categoria2', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.vencimento2} onChange={e => handleTableChange('faltasAnuais', idx, 'vencimento2', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <span className="font-bold uppercase">Observações:</span>
              <textarea 
                className="w-full border border-black mt-2 p-2 h-32 outline-none"
                value={formData.observacoesPag3}
                onChange={e => handleInputChange('observacoesPag3', e.target.value)}
              ></textarea>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 text-[10px]">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h3 className="text-center font-bold uppercase mb-2">PUNIÇÕES</h3>
                <table className="w-full border-collapse border border-black">
                  <thead>
                    <tr>
                      <th className="border border-black p-1 w-24">DATA</th>
                      <th className="border border-black p-1">DESCRIÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.punicoes.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.data} onChange={e => handleTableChange('punicoes', idx, 'data', e.target.value)} /></td>
                        <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.descricao} onChange={e => handleTableChange('punicoes', idx, 'descricao', e.target.value)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-center font-bold uppercase mb-2 leading-tight">DESCONTOS ANUAIS<br/><span className="text-[8px]">(por punições, faltas ou acumulação de atrasos)</span></h3>
                <table className="w-full border-collapse border border-black">
                  <thead>
                    <tr>
                      <th className="border border-black p-1">DATA</th>
                      <th className="border border-black p-1">DESCRIÇÃO</th>
                      <th className="border border-black p-1">ANO</th>
                      <th className="border border-black p-1">DESCRIÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.descontosAnuais.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.data} onChange={e => handleTableChange('descontosAnuais', idx, 'data', e.target.value)} /></td>
                        <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.descricao} onChange={e => handleTableChange('descontosAnuais', idx, 'descricao', e.target.value)} /></td>
                        <td className="border border-black p-0"><input type="number" min="1900" max="2100" className="w-full p-1 outline-none" value={item.ano} onChange={e => handleTableChange('descontosAnuais', idx, 'ano', e.target.value)} /></td>
                        <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.descricao2} onChange={e => handleTableChange('descontosAnuais', idx, 'descricao2', e.target.value)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div>
                <h3 className="text-center font-bold uppercase mb-2">LOUVORES</h3>
                <table className="w-full border-collapse border border-black">
                  <thead>
                    <tr>
                      <th className="border border-black p-1 w-24">DATA</th>
                      <th className="border border-black p-1">DESCRIÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.louvores.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.data} onChange={e => handleTableChange('louvores', idx, 'data', e.target.value)} /></td>
                        <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.descricao} onChange={e => handleTableChange('louvores', idx, 'descricao', e.target.value)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-center font-bold uppercase mb-2">GRATIFICAÇÕES</h3>
                <table className="w-full border-collapse border border-black">
                  <thead>
                    <tr>
                      <th rowSpan={2} className="border border-black p-1">DATA</th>
                      <th colSpan={2} className="border border-black p-1">GRATIFICAÇÕES</th>
                      <th rowSpan={2} className="border border-black p-1">DATA</th>
                      <th colSpan={2} className="border border-black p-1">GRATIFICAÇÕES</th>
                    </tr>
                    <tr>
                      <th className="border border-black p-1">Normal</th>
                      <th className="border border-black p-1">Especial</th>
                      <th className="border border-black p-1">Normal</th>
                      <th className="border border-black p-1">Especial</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.gratificacoes.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.data} onChange={e => handleTableChange('gratificacoes', idx, 'data', e.target.value)} /></td>
                        <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.normal} onChange={e => handleTableChange('gratificacoes', idx, 'normal', e.target.value)} /></td>
                        <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.especial} onChange={e => handleTableChange('gratificacoes', idx, 'especial', e.target.value)} /></td>
                        <td className="border border-black p-0"><input type="date" className="w-full p-1 outline-none" value={item.data2} onChange={e => handleTableChange('gratificacoes', idx, 'data2', e.target.value)} /></td>
                        <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.normal2} onChange={e => handleTableChange('gratificacoes', idx, 'normal2', e.target.value)} /></td>
                        <td className="border border-black p-0"><input type="text" className="w-full p-1 outline-none" value={item.especial2} onChange={e => handleTableChange('gratificacoes', idx, 'especial2', e.target.value)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-center font-bold uppercase mb-4 text-xl">RELAÇÃO DE DOCUMENTOS ANEXOS</h3>
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-2 w-32">DATA</th>
                    <th className="border border-black p-2">DESCRIÇÃO DOS DOCUMENTOS</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.documentosAnexos.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-black p-0"><input type="date" className="w-full p-2 outline-none" value={item.data} onChange={e => handleTableChange('documentosAnexos', idx, 'data', e.target.value)} /></td>
                      <td className="border border-black p-0"><input type="text" className="w-full p-2 outline-none" value={item.descricao} onChange={e => handleTableChange('documentosAnexos', idx, 'descricao', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-8 rounded-3xl border-2 border-dashed border-blue-200">
              <h4 className="text-blue-900 font-bold mb-4 flex items-center gap-2">
                <Upload size={20} /> Upload de Ficheiros Complementares
              </h4>
              <div className="flex flex-wrap gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 bg-white rounded-2xl border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                  <Plus size={32} className="text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-500 mt-2">Adicionar</span>
                  <input type="file" className="hidden" multiple onChange={handleFileUpload} />
                </label>
                {formData.ficheiros.map((file, idx) => (
                  <div key={idx} className="w-32 h-32 bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center p-2 text-center relative group">
                    <FileText size={32} className="text-blue-600 mb-2" />
                    <span className="text-[8px] font-bold text-gray-700 truncate w-full">{file.name}</span>
                    <button 
                      onClick={() => setFormData(prev => ({ ...prev, ficheiros: prev.ficheiros.filter((_, i) => i !== idx) }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <AlertCircle size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-5xl h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
      >
        <header className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div>
              <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">Processo Individual</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Página {currentPage} de 5</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(p => (
              <button 
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </header>

        <main className="flex-grow overflow-auto p-10 bg-[#f8fafc]">
          <div className="bg-white shadow-sm border border-gray-100 rounded-[2rem] p-12 min-h-full mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <footer className="p-6 border-t border-gray-100 flex items-center justify-between bg-white">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-all"
          >
            <ArrowLeft size={20} /> Anterior
          </button>
          
          {currentPage < 5 ? (
            <button 
              onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
            >
              Próxima Página <ArrowRight size={20} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-10 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Processando...</>
              ) : (
                <>Submeter Processo <Save size={20} /></>
              )}
            </button>
          )}
        </footer>
      </motion.div>
    </div>
  );
}
