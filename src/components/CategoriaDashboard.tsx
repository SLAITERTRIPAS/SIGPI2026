import React from 'react';
import { Colaborador } from '../types';

interface Props {
  colaboradores: Colaborador[];
}

export function CategoriaDashboard({ colaboradores }: Props) {
  const docentesQuadro = colaboradores.filter(c => c.tipo === 'Docente' && c.tipoRelacaoContractual === 'Pertence ao quadro');
  const docentesNaoQuadro = colaboradores.filter(c => c.tipo === 'Docente' && c.tipoRelacaoContractual !== 'Pertence ao quadro');
  const ctaQuadro = colaboradores.filter(c => c.tipo === 'CTA');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-2">Efetivo Docente (Quadro)</h2>
        <p className="text-3xl">{docentesQuadro.length}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-2">Efetivo Docente (Não Quadro)</h2>
        <p className="text-3xl">{docentesNaoQuadro.length}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-2">Efetivo CTA</h2>
        <p className="text-3xl">{ctaQuadro.length}</p>
      </div>
    </div>
  );
}
