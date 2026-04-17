import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PROVINCIAS } from '../constants/formOptions';
import FormContainer from './ui/FormContainer';

const cursosData = [
  { nome: 'Engenharia Eletrica', duracao: '5 anos', areas: ['Energia', 'Sistemas'], subareas: ['Potência', 'Automação'] },
  { nome: 'Engenharia Eletrónica e de Telecomunicações', duracao: '5 anos', areas: ['Telecom', 'Eletrónica'], subareas: ['Redes', 'Sinais'] },
  { nome: 'Engenharia de Energia Renováveis', duracao: '4 anos', areas: ['Energia', 'Ambiente'], subareas: ['Solar', 'Eólica'] },
  { nome: 'Engenharia de Construção Civil', duracao: '5 anos', areas: ['Estruturas', 'Geotecnia'], subareas: ['Betão', 'Solos'] },
  { nome: 'Engenharia Hidráulica', duracao: '5 anos', areas: ['Hidráulica', 'Recursos Hídricos'], subareas: ['Barragens', 'Saneamento'] },
  { nome: 'Engenharia de construção Mecânicas', duracao: '5 anos', areas: ['Mecânica', 'Materiais'], subareas: ['Fabrico', 'Manutenção'] },
  { nome: 'Engenharia Termotecnica', duracao: '4 anos', areas: ['Termodinâmica', 'Energia'], subareas: ['Refrigeração', 'Combustão'] },
];

const provinciaMap: Record<string, string> = {
  'MAPUTO_PROVINCIA': 'Maputo Província',
  'MAPUTO_CIDADE': 'Maputo Cidade',
  'GAZA': 'Gaza',
  'INHAMBANE': 'Inhambane',
  'MANICA': 'Manica',
  'TETE': 'Tete',
  'SOFALA': 'Sofala',
  'ZAMBÉZIA': 'Zambézia',
  'NAMPULA': 'Nampula',
  'NIASSA': 'Niassa',
  'CABO_DELGADO': 'Cabo Delgado',
};

export default function Quadro1_2Form() {
  const [rows, setRows] = useState([{ 
    id: 1, 
    curso: cursosData[0], 
    regime: 'Laboral', 
    nacionalidade: 'Moçambicano', 
    provincia: 'MAPUTO_PROVINCIA', 
    distrito: PROVINCIAS['MAPUTO_PROVINCIA'][0], 
    grau: 'Licenciatura', 
    preenchidas: 0, 
    naoPreenchidas: 0, 
    controlo: 0 
  }]);

  const addRow = () => {
    setRows([...rows, { 
      id: Date.now(), 
      curso: cursosData[0], 
      regime: 'Laboral', 
      nacionalidade: 'Moçambicano', 
      provincia: 'MAPUTO_PROVINCIA', 
      distrito: PROVINCIAS['MAPUTO_PROVINCIA'][0], 
      grau: 'Licenciatura', 
      preenchidas: 0, 
      naoPreenchidas: 0, 
      controlo: 0 
    }]);
  };

  return (
    <FormContainer 
      title="QUADRO 1.2 NÚMERO DE VAGAS PREENCHIDAS" 
      description="Preenchimento de dados estatísticos"
      onEnviar={() => alert('Quadro 1.2 enviado para a Repartição de Estatística!')}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-max border border-gray-200">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-widest">
              <th className="p-4 border border-gray-200" rowSpan={2}>NOME DO CURSO</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>***DURAÇÃO (ANOS)</th>
              <th className="p-4 border border-gray-200" colSpan={2}>ISPS - 2025</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>REGIME-CURSO</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>NACIONALIDADE</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>PROVÍNCIA**</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>DISTRITO*</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>GRAU</th>
              <th className="p-4 border border-gray-200" colSpan={3}>NÚMERO DE VAGAS PREENCHIDAS</th>
            </tr>
            <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-widest">
              <th className="p-2 border border-gray-200">ÁREAS</th>
              <th className="p-2 border border-gray-200">SUB-ÁREAS</th>
              <th className="p-2 border border-gray-200">PREENCHIDAS</th>
              <th className="p-2 border border-gray-200">NÃO PREENCHIDAS</th>
              <th className="p-2 border border-gray-200">CONTROLO INGR &lt; MATR</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-2 border border-gray-200">
                  <select className="w-full p-2 border border-gray-200 rounded-lg text-xs" value={row.curso.nome} onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].curso = cursosData.find(c => c.nome === e.target.value)!;
                    setRows(newRows);
                  }}>
                    {cursosData.map(c => <option key={c.nome} value={c.nome}>{c.nome}</option>)}
                  </select>
                </td>
                <td className="p-2 border border-gray-200 text-xs text-center">{row.curso.duracao}</td>
                <td className="p-2 border border-gray-200 text-xs text-center">{row.curso.areas[0]}</td>
                <td className="p-2 border border-gray-200 text-xs text-center">{row.curso.subareas[0]}</td>
                <td className="p-2 border border-gray-200">
                  <select className="w-full p-2 border border-gray-200 rounded-lg text-xs" value={row.regime} onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].regime = e.target.value;
                    setRows(newRows);
                  }}>
                    <option>Laboral</option>
                    <option>Pós-Laboral</option>
                  </select>
                </td>
                <td className="p-2 border border-gray-200 text-xs text-center">{row.nacionalidade}</td>
                <td className="p-2 border border-gray-200">
                  <select className="w-full p-2 border border-gray-200 rounded-lg text-xs" value={row.provincia} onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].provincia = e.target.value;
                    newRows[index].distrito = PROVINCIAS[e.target.value][0];
                    setRows(newRows);
                  }}>
                    {Object.keys(PROVINCIAS).map(p => <option key={p} value={p}>{provinciaMap[p] || p}</option>)}
                  </select>
                </td>
                <td className="p-2 border border-gray-200">
                  <select className="w-full p-2 border border-gray-200 rounded-lg text-xs" value={row.distrito} onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].distrito = e.target.value;
                    setRows(newRows);
                  }}>
                    {PROVINCIAS[row.provincia].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </td>
                <td className="p-2 border border-gray-200 text-xs text-center">{row.grau}</td>
                <td className="p-2 border border-gray-200"><input type="number" className="w-16 p-2 border border-gray-200 rounded-lg text-xs" value={row.preenchidas} onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].preenchidas = parseInt(e.target.value) || 0;
                    setRows(newRows);
                }} /></td>
                <td className="p-2 border border-gray-200"><input type="number" className="w-16 p-2 border border-gray-200 rounded-lg text-xs" value={row.naoPreenchidas} onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].naoPreenchidas = parseInt(e.target.value) || 0;
                    setRows(newRows);
                }} /></td>
                <td className="p-2 border border-gray-200"><input type="number" className="w-16 p-2 border border-gray-200 rounded-lg text-xs" value={row.controlo} onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].controlo = parseInt(e.target.value) || 0;
                    setRows(newRows);
                }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow} className="mt-6 flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
          <Plus size={16} /> Adicionar Linha
        </button>
      </div>
    </FormContainer>
  );
}
