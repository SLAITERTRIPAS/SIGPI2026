import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import FormContainer from './ui/FormContainer';

const cursosData = [
  { nome: 'Engenharia Eletrica', areas: ['Energia', 'Sistemas'], subareas: ['Potência', 'Automação'] },
  { nome: 'Engenharia Eletrónica e de Telecomunicações', areas: ['Telecom', 'Eletrónica'], subareas: ['Redes', 'Sinais'] },
  { nome: 'Engenharia de Energia Renováveis', areas: ['Energia', 'Ambiente'], subareas: ['Solar', 'Eólica'] },
  { nome: 'Engenharia de Construção Civil', areas: ['Estruturas', 'Geotecnia'], subareas: ['Betão', 'Solos'] },
  { nome: 'Engenharia Hidráulica', areas: ['Hidráulica', 'Recursos Hídricos'], subareas: ['Barragens', 'Saneamento'] },
  { nome: 'Engenharia de construção Mecânicas', areas: ['Mecânica', 'Materiais'], subareas: ['Fabrico', 'Manutenção'] },
  { nome: 'Engenharia Termotecnica', areas: ['Termodinâmica', 'Energia'], subareas: ['Refrigeração', 'Combustão'] },
];

const paises = [
  'Angola', 'África do Sul', 'Brasil', 'Cabo Verde', 'Eswatini', 'Guiné-Bissau', 'Portugal', 'São Tomé e Príncipe', 'Zâmbia', 'Zimbabwe', 'Outro'
];

export default function Quadro1_5Form() {
  const [rows, setRows] = useState([{ 
    id: 1, 
    curso: cursosData[0], 
    regime: 'Laboral', 
    pais: paises[0], 
    grau: 'Licenciatura', 
    niH: 0, niM: 0, niHM: 0,
    matH: 0, matM: 0, matHM: 0,
    gradH: 0, gradM: 0, gradHM: 0
  }]);

  const addRow = () => {
    setRows([...rows, { 
      id: Date.now(), 
      curso: cursosData[0], 
      regime: 'Laboral', 
      pais: paises[0], 
      grau: 'Licenciatura', 
      niH: 0, niM: 0, niHM: 0,
      matH: 0, matM: 0, matHM: 0,
      gradH: 0, gradM: 0, gradHM: 0
    }]);
  };

  return (
    <FormContainer 
      title="QUADRO 1.5 - NÚMERO DE ESTUDANTES ESTRANGEIROS, NOVOS INGRESSOS, MATRICULADOS E GRADUADOS POR CURSO, GRAU E SEXO" 
      description="Preenchimento de dados estatísticos"
      onEnviar={() => alert('Quadro 1.5 enviado para a Repartição de Estatística!')}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-max border border-gray-200">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-widest">
              <th className="p-4 border border-gray-200" rowSpan={2}>Nome do curso</th>
              <th className="p-4 border border-gray-200" colSpan={2}>ISPS - 2025</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>Regime-Curso</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>*País de proveniência</th>
              <th className="p-4 border border-gray-200" rowSpan={2}>Grau</th>
              <th className="p-4 border border-gray-200" colSpan={3}>Novos Ingressos</th>
              <th className="p-4 border border-gray-200" colSpan={3}>Matriculados</th>
              <th className="p-4 border border-gray-200" colSpan={3}>Graduados</th>
            </tr>
            <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-widest">
              <th className="p-2 border border-gray-200">Áreas</th>
              <th className="p-2 border border-gray-200">Sub-áreas</th>
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
                  <select className="w-full p-2 border border-gray-200 rounded-lg text-xs" value={row.pais} onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].pais = e.target.value;
                    setRows(newRows);
                  }}>
                    {paises.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </td>
                <td className="p-2 border border-gray-200 text-xs text-center">{row.grau}</td>
                
                {/* Novos Ingressos */}
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.niH} onChange={(e) => { const newRows = [...rows]; newRows[index].niH = parseInt(e.target.value) || 0; newRows[index].niHM = newRows[index].niH + newRows[index].niM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.niM} onChange={(e) => { const newRows = [...rows]; newRows[index].niM = parseInt(e.target.value) || 0; newRows[index].niHM = newRows[index].niH + newRows[index].niM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200 text-xs text-center font-bold">{row.niHM}</td>

                {/* Matriculados */}
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.matH} onChange={(e) => { const newRows = [...rows]; newRows[index].matH = parseInt(e.target.value) || 0; newRows[index].matHM = newRows[index].matH + newRows[index].matM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.matM} onChange={(e) => { const newRows = [...rows]; newRows[index].matM = parseInt(e.target.value) || 0; newRows[index].matHM = newRows[index].matH + newRows[index].matM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200 text-xs text-center font-bold">{row.matHM}</td>

                {/* Graduados */}
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.gradH} onChange={(e) => { const newRows = [...rows]; newRows[index].gradH = parseInt(e.target.value) || 0; newRows[index].gradHM = newRows[index].gradH + newRows[index].gradM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200"><input type="number" className="w-12 p-2 border border-gray-200 rounded-lg text-xs" value={row.gradM} onChange={(e) => { const newRows = [...rows]; newRows[index].gradM = parseInt(e.target.value) || 0; newRows[index].gradHM = newRows[index].gradH + newRows[index].gradM; setRows(newRows); }} /></td>
                <td className="p-2 border border-gray-200 text-xs text-center font-bold">{row.gradHM}</td>
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
