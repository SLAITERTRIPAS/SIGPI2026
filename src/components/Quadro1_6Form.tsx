import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import FormContainer from './ui/FormContainer';
import { PROVINCIAS } from '../constants/formOptions';

const cursosData = [
  { nome: 'Engenharia Eléctrica', areas: ['Engenharia, Produção e Construção'], subareas: ['Produção e Processamento'] },
  { nome: 'Engenharia Hidráulica', areas: ['Engenharia, Produção e Construção'], subareas: ['Produção e Processamento'] },
  { nome: 'Engenharia Termotécnica', areas: ['Engenharia, Produção e Construção'], subareas: ['Produção e Processamento'] },
  { nome: 'Engenharia e Gestão de Energias Renováveis', areas: ['Engenharia, Produção e Construção'], subareas: ['Produção e Processamento'] },
  { nome: 'Engenharia Electrónica e de Telecomunicações', areas: ['Engenharia, Produção e Construção'], subareas: ['Produção e Processamento'] },
  { nome: 'Engenharia Mecânica', areas: ['Engenharia, Produção e Construção'], subareas: ['Produção e Processamento'] },
  { nome: 'Engenharia de Construção Civil', areas: ['Engenharia, Produção e Construção'], subareas: ['Produção e Processamento'] },
];

export default function Quadro1_6Form() {
  const [rows, setRows] = useState([{ 
    id: 1, 
    curso: cursosData[0], 
    regime: 'Laboral', 
    provincia: '',
    distrito: '',
    grau: 'Licenciatura', 
    cadeirantesH: 0, cadeirantesM: 0, cadeirantesHM: 0,
    visualH: 0, visualM: 0, visualHM: 0,
    auditivaH: 0, auditivaM: 0, auditivaHM: 0,
    falaH: 0, falaM: 0, falaHM: 0
  }]);

  const addRow = () => {
    setRows([...rows, { 
      id: Date.now(), 
      curso: cursosData[0], 
      regime: 'Laboral', 
      provincia: '',
      distrito: '',
      grau: 'Licenciatura', 
      cadeirantesH: 0, cadeirantesM: 0, cadeirantesHM: 0,
      visualH: 0, visualM: 0, visualHM: 0,
      auditivaH: 0, auditivaM: 0, auditivaHM: 0,
      falaH: 0, falaM: 0, falaHM: 0
    }]);
  };

  const totalCadeirantesH = rows.reduce((acc, row) => acc + row.cadeirantesH, 0);
  const totalCadeirantesM = rows.reduce((acc, row) => acc + row.cadeirantesM, 0);
  const totalCadeirantesHM = rows.reduce((acc, row) => acc + row.cadeirantesHM, 0);
  
  const totalVisualH = rows.reduce((acc, row) => acc + row.visualH, 0);
  const totalVisualM = rows.reduce((acc, row) => acc + row.visualM, 0);
  const totalVisualHM = rows.reduce((acc, row) => acc + row.visualHM, 0);
  
  const totalAuditivaH = rows.reduce((acc, row) => acc + row.auditivaH, 0);
  const totalAuditivaM = rows.reduce((acc, row) => acc + row.auditivaM, 0);
  const totalAuditivaHM = rows.reduce((acc, row) => acc + row.auditivaHM, 0);

  const totalFalaH = rows.reduce((acc, row) => acc + row.falaH, 0);
  const totalFalaM = rows.reduce((acc, row) => acc + row.falaM, 0);
  const totalFalaHM = rows.reduce((acc, row) => acc + row.falaHM, 0);

  return (
    <FormContainer 
      title="QUADRO 1.6 NÚMERO DE ESTUDANTES COM NECESSIDADES ESPECIAIS POR CURSO, GRAU E SEXO" 
      description="Preenchimento de dados estatísticos"
      onEnviar={() => alert('Quadro 1.6 enviado para a Repartição de Estatística!')}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-max border border-gray-200">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-widest">
              <th className="p-4 border border-gray-200" rowSpan={2}>NOME DO CURSO</th>
              <th className="p-4 border border-gray-200" colSpan={2}>ISPS - 2025</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>REGIME-CURSO</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>PROVÍNCIA</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>DISTRITO</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>GRAU</th>
              <th className="p-4 border border-gray-200" colSpan={3}>CADEIRANTES</th>
              <th className="p-4 border border-gray-200" colSpan={3}>VISUAL</th>
              <th className="p-4 border border-gray-200" colSpan={3}>AUDITIVA</th>
              <th className="p-4 border border-gray-200" colSpan={3}>FALA</th>
            </tr>
            <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-widest">
              <th className="p-2 border border-gray-200">ÁREAS</th>
              <th className="p-2 border border-gray-200">SUB-ÁREAS</th>
              <th className="p-2 border border-gray-200">H</th>
              <th className="p-2 border border-gray-200">M</th>
              <th className="p-2 border border-gray-200">HM</th>
              <th className="p-2 border border-gray-200">H</th>
              <th className="p-2 border border-gray-200">M</th>
              <th className="p-2 border border-gray-200">HM</th>
              <th className="p-2 border border-gray-200">H</th>
              <th className="p-2 border border-gray-200">M</th>
              <th className="p-2 border border-gray-200">HM</th>
              <th className="p-2 border border-gray-200">H</th>
              <th className="p-2 border border-gray-200">M</th>
              <th className="p-2 border border-gray-200">HM</th>
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
                <td className="p-2 border border-gray-200">
                  <select className="w-full p-2 border border-gray-200 rounded-lg text-xs" value={row.provincia} onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].provincia = e.target.value;
                    newRows[index].distrito = ''; // Reset distrito when provincia changes
                    setRows(newRows);
                  }}>
                    <option value="">Selecione...</option>
                    {Object.keys(PROVINCIAS).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </td>
                <td className="p-2 border border-gray-200">
                  <select className="w-full p-2 border border-gray-200 rounded-lg text-xs" value={row.distrito} onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].distrito = e.target.value;
                    setRows(newRows);
                  }} disabled={!row.provincia}>
                    <option value="">Selecione...</option>
                    {row.provincia && PROVINCIAS[row.provincia as keyof typeof PROVINCIAS].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </td>
                <td className="p-2 border border-gray-200 text-xs text-center">{row.grau}</td>
                
                {/* Cadeirantes */}
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.cadeirantesH} onChange={(e) => { const newRows = [...rows]; newRows[index].cadeirantesH = parseInt(e.target.value) || 0; newRows[index].cadeirantesHM = newRows[index].cadeirantesH + newRows[index].cadeirantesM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.cadeirantesM} onChange={(e) => { const newRows = [...rows]; newRows[index].cadeirantesM = parseInt(e.target.value) || 0; newRows[index].cadeirantesHM = newRows[index].cadeirantesH + newRows[index].cadeirantesM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200 text-xs text-center font-bold">{row.cadeirantesHM}</td>

                {/* Visual */}
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.visualH} onChange={(e) => { const newRows = [...rows]; newRows[index].visualH = parseInt(e.target.value) || 0; newRows[index].visualHM = newRows[index].visualH + newRows[index].visualM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.visualM} onChange={(e) => { const newRows = [...rows]; newRows[index].visualM = parseInt(e.target.value) || 0; newRows[index].visualHM = newRows[index].visualH + newRows[index].visualM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200 text-xs text-center font-bold">{row.visualHM}</td>

                {/* Auditiva */}
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.auditivaH} onChange={(e) => { const newRows = [...rows]; newRows[index].auditivaH = parseInt(e.target.value) || 0; newRows[index].auditivaHM = newRows[index].auditivaH + newRows[index].auditivaM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.auditivaM} onChange={(e) => { const newRows = [...rows]; newRows[index].auditivaM = parseInt(e.target.value) || 0; newRows[index].auditivaHM = newRows[index].auditivaH + newRows[index].auditivaM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200 text-xs text-center font-bold">{row.auditivaHM}</td>

                {/* Fala */}
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.falaH} onChange={(e) => { const newRows = [...rows]; newRows[index].falaH = parseInt(e.target.value) || 0; newRows[index].falaHM = newRows[index].falaH + newRows[index].falaM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.falaM} onChange={(e) => { const newRows = [...rows]; newRows[index].falaM = parseInt(e.target.value) || 0; newRows[index].falaHM = newRows[index].falaH + newRows[index].falaM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200 text-xs text-center font-bold">{row.falaHM}</td>
              </tr>
            ))}
            
            {/* Totals Row */}
            <tr className="bg-gray-100 font-bold">
              <td className="p-3 border border-gray-200 text-xs uppercase tracking-widest" colSpan={7}>HM</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalCadeirantesH}</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalCadeirantesM}</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalCadeirantesHM}</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalVisualH}</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalVisualM}</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalVisualHM}</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalAuditivaH}</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalAuditivaM}</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalAuditivaHM}</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalFalaH}</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalFalaM}</td>
              <td className="p-3 border border-gray-200 text-xs text-center">{totalFalaHM}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={addRow} className="mt-6 flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
          <Plus size={16} /> Adicionar Linha
        </button>
      </div>
    </FormContainer>
  );
}
