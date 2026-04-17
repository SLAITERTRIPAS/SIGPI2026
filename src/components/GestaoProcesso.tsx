import React, { useState, useRef } from 'react';
import { Colaborador, ProcessoIndividual } from '../types';
import { Upload, FileIcon, Loader2, CheckCircle } from 'lucide-react';

interface Props {
  colaboradores: Colaborador[];
}

export function GestaoProcesso({ colaboradores }: Props) {
  const [selectedProcesso, setSelectedProcesso] = useState<ProcessoIndividual | null>(null);
  const [isDigitalizing, setIsDigitalizing] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (colaborador: Colaborador) => {
    setSelectedProcesso({
      colaboradorId: colaborador.id,
      dadosPessoais: colaborador,
      documentosAnexos: [],
      formacaoComplementar: [],
      historicoProfissional: [],
      observacoes: '',
      completo: false,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && selectedProcesso) {
      const newDocs = Array.from(files).map((file: any) => ({
        nomeDocumento: file.name,
        url: URL.createObjectURL(file), // Mock URL
      }));
      setSelectedProcesso(prev => prev ? ({
        ...prev,
        documentosAnexos: [...prev.documentosAnexos, ...newDocs]
      }) : null);
    }
  };

  const digitalizeDocument = (docName: string) => {
    setIsDigitalizing(docName);
    setTimeout(() => {
      setIsDigitalizing(null);
      alert(`Documento ${docName} digitalizado com sucesso!`);
    }, 2000);
  };

  if (selectedProcesso) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-bold text-xl mb-4">Processo Individual: {selectedProcesso.dadosPessoais.nome}</h2>
        <div className="space-y-4">
          <p><strong>Cargo:</strong> {selectedProcesso.dadosPessoais.cargo}</p>
          <hr />
          <h3 className="font-bold">Documentos Anexados:</h3>
          <div className="border p-4 rounded bg-gray-50">
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.xlsx,.xls" className="hidden" />
            <button 
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={18} />
              Upload de Documentos (PDF, Excel)
            </button>
            <ul className="mt-4 space-y-2">
              {selectedProcesso.documentosAnexos.map((doc, idx) => (
                <li key={idx} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <FileIcon size={18} className="text-gray-500" />
                    {doc.nomeDocumento}
                  </div>
                  <button 
                    className="text-xs bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1"
                    onClick={() => digitalizeDocument(doc.nomeDocumento)}
                    disabled={!!isDigitalizing}
                  >
                    {isDigitalizing === doc.nomeDocumento ? (
                      <><Loader2 size={14} className="animate-spin" /> Processando...</>
                    ) : (
                      <>Digitalizar</>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setSelectedProcesso(null)}>Guardar e Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-bold text-xl mb-4">Gestão de Processos</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Nome</th>
            <th className="text-left p-2">Cargo</th>
            <th className="text-left p-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.map(c => (
            <tr key={c.id} className="border-b cursor-pointer hover:bg-gray-100" onClick={() => handleEdit(c)}>
              <td className="p-2">{c.nome}</td>
              <td className="p-2">{c.cargo}</td>
              <td className="p-2 text-blue-600">Ver/Editar Processo</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
