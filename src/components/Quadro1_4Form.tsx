import React, { useState } from 'react';
import FormContainer from './ui/FormContainer';

type Categoria = 'novosIngressos' | 'matriculados' | 'graduados';

interface DataRow {
  mocH: number;
  mocM: number;
  estH: number;
  estM: number;
}

export default function Quadro1_4Form() {
  const [data, setData] = useState<Record<Categoria, DataRow>>({
    novosIngressos: { mocH: 0, mocM: 0, estH: 0, estM: 0 },
    matriculados: { mocH: 0, mocM: 0, estH: 0, estM: 0 },
    graduados: { mocH: 0, mocM: 0, estH: 0, estM: 0 },
  });

  const handleInputChange = (categoria: Categoria, field: keyof DataRow, value: string) => {
    const numValue = parseInt(value) || 0;
    setData(prev => ({
      ...prev,
      [categoria]: {
        ...prev[categoria],
        [field]: numValue
      }
    }));
  };

  const renderRow = (categoria: Categoria, label: string) => {
    const rowData = data[categoria];
    const mocHM = rowData.mocH + rowData.mocM;
    const estHM = rowData.estH + rowData.estM;
    const todosH = rowData.mocH + rowData.estH;
    const todosM = rowData.mocM + rowData.estM;
    const todosHM = mocHM + estHM;

    return (
      <tr key={categoria} className="hover:bg-gray-50 transition-colors">
        <td className="p-4 border border-gray-200 text-sm font-bold text-gray-700">{label}</td>
        
        {/* Moçambicana */}
        <td className="p-2 border border-gray-200">
          <input 
            type="number" 
            className="w-full p-2 border border-gray-200 rounded-lg text-sm text-center" 
            value={rowData.mocH || ''} 
            onChange={(e) => handleInputChange(categoria, 'mocH', e.target.value)} 
          />
        </td>
        <td className="p-2 border border-gray-200">
          <input 
            type="number" 
            className="w-full p-2 border border-gray-200 rounded-lg text-sm text-center" 
            value={rowData.mocM || ''} 
            onChange={(e) => handleInputChange(categoria, 'mocM', e.target.value)} 
          />
        </td>
        <td className="p-4 border border-gray-200 text-sm text-center font-bold bg-gray-50">{mocHM}</td>

        {/* Estrangeira */}
        <td className="p-2 border border-gray-200">
          <input 
            type="number" 
            className="w-full p-2 border border-gray-200 rounded-lg text-sm text-center" 
            value={rowData.estH || ''} 
            onChange={(e) => handleInputChange(categoria, 'estH', e.target.value)} 
          />
        </td>
        <td className="p-2 border border-gray-200">
          <input 
            type="number" 
            className="w-full p-2 border border-gray-200 rounded-lg text-sm text-center" 
            value={rowData.estM || ''} 
            onChange={(e) => handleInputChange(categoria, 'estM', e.target.value)} 
          />
        </td>
        <td className="p-4 border border-gray-200 text-sm text-center font-bold bg-gray-50">{estHM}</td>

        {/* Todos */}
        <td className="p-4 border border-gray-200 text-sm text-center font-bold bg-gray-50">{todosH}</td>
        <td className="p-4 border border-gray-200 text-sm text-center font-bold bg-gray-50">{todosM}</td>
        <td className="p-4 border border-gray-200 text-sm text-center font-black bg-gray-100">{todosHM}</td>
      </tr>
    );
  };

  return (
    <FormContainer 
      title="QUADRO 1.4 NÚMERO DE NOVOS INGRESSOS, MATRICULADOS E GRADUADOS POR NACIONALIDADE E SEXO" 
      description="Preenchimento de dados estatísticos"
      onEnviar={() => alert('Quadro 1.4 enviado para a Repartição de Estatística!')}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-max border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-[10px] font-black uppercase tracking-widest">
              <th className="p-4 border border-gray-200" rowSpan={3}>ESTUDANTES</th>
              <th className="p-4 border border-gray-200" colSpan={6}>NACIONALIDADE</th>
              <th className="p-4 border border-gray-200" colSpan={3}>TODOS</th>
            </tr>
            <tr className="bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
              <th className="p-3 border border-gray-200" colSpan={3}>MOÇAMBICANA</th>
              <th className="p-3 border border-gray-200" colSpan={3}>ESTRANGEIRA</th>
              <th className="p-3 border border-gray-200" rowSpan={2}>H</th>
              <th className="p-3 border border-gray-200" rowSpan={2}>M</th>
              <th className="p-3 border border-gray-200" rowSpan={2}>HM</th>
            </tr>
            <tr className="bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
              <th className="p-2 border border-gray-200">H</th>
              <th className="p-2 border border-gray-200">M</th>
              <th className="p-2 border border-gray-200">HM</th>
              <th className="p-2 border border-gray-200">H</th>
              <th className="p-2 border border-gray-200">M</th>
              <th className="p-2 border border-gray-200">HM</th>
            </tr>
          </thead>
          <tbody>
            {renderRow('novosIngressos', 'Novos Ingressos')}
            {renderRow('matriculados', 'Matriculados')}
            {renderRow('graduados', 'Graduados')}
          </tbody>
        </table>
      </div>
    </FormContainer>
  );
}
