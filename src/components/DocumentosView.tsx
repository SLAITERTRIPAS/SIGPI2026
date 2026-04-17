import React, { useState } from 'react';
import { FileText, Folder, Trash2, Upload } from 'lucide-react';

export default function DocumentosView({ title }: { title: string }) {
  const [documentos, setDocumentos] = useState<any[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold text-blue-900">Gestão de Documentos Normativos - {title}</h3>
        <label className="w-full sm:w-auto bg-blue-900 text-white px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors cursor-pointer">
          <Upload size={18} />
          Upload PDF
          <input type="file" accept=".pdf" className="hidden" />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {documentos.map(doc => (
          <div key={doc.id} className={`p-6 rounded-2xl shadow-sm border ${doc.isRascunho ? 'bg-gray-100 border-gray-200' : 'bg-white border-blue-100'}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl ${doc.isRascunho ? 'bg-gray-200 text-gray-600' : 'bg-blue-50 text-blue-600'}`}>
                {doc.isRascunho ? <Folder size={24} /> : <FileText size={24} />}
              </div>
              <div>
                <p className="font-bold text-gray-900">{doc.nome}</p>
                <p className="text-xs text-gray-500 uppercase">{doc.tipo} • {doc.formato.toUpperCase()}</p>
              </div>
            </div>
            {doc.isRascunho && (
              <p className="text-xs text-gray-500 italic mb-4">Documento de prova (Rascunho - Não editável/apagável)</p>
            )}
            <div className="flex justify-end gap-2">
              {!doc.isRascunho && (
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 size={18} />
                </button>
              )}
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Upload size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
