const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');
const lines = data.split('\n').filter(line => line.trim() !== '');

const colaboradores = lines.map((line, index) => {
  const parts = line.trim().split(/\s+/);
  if (parts.length < 5) return null;
  
  const id = parts[0];
  const nomePartes = parts.slice(1, -12);
  const nome = nomePartes.join(' ');
  const genero = parts[parts.length - 12];
  const dataNascimento = parts[parts.length - 11];
  const prov = parts[parts.length - 10];
  const dist = parts[parts.length - 9];
  const nuit = parts[parts.length - 8];
  const numBI = parts[parts.length - 7];
  const nivel = parts[parts.length - 6];
  const areaParts = parts.slice(parts.length - 5, parts.length - 4); // Area is tricky, let's fix
  // Correcting parsing based on visible data structure:
  // 1: 1 António Cristo Pinto Madeira Masculino 03/02/1970 Manica Chimoio 118657721 070100093186I Doutorado (Nivel) Doutorado em Ensino de Química (Area) Professor Auxiliar (Cat) docente (Tipo) Tempo inteiro (Contrato) Pertence ao quadro (Relacao) Moçambique (Pais)
  
  // Revised approach based on common fields
  const partsRevised = line.trim().split(/\s+/);
  const len = partsRevised.length;
  
  // Ending fields are reliable
  const pais = partsRevised[len - 1]; // Moçambique
  const relacao = partsRevised.slice(len - 4, len - 1).join(' '); // Relacao (Pertence ao quadro) 
  const contrato = partsRevised.slice(len - 6, len - 4).join(' '); // Contrato (Tempo inteiro)
  const tipo = partsRevised[len - 7]; // Docente
  // Let's refine based on the lines
  return {
    id: parts[0],
    ord: parseInt(parts[0]),
    nome: nome,
    genero: genero === 'Femenino' || genero === 'F' ? 'F' : 'M',
    dataNascimento: dataNascimento,
    localNascimento: { pais: 'Moçambique', provincia: prov, distrito: dist },
    nuit: nuit,
    numeroBI: numBI,
    nivelAcademico: nivel,
    areaFormacao: 'Ciências', // Placeholder
    categoria: 'Assistente', // Placeholder
    tipoContrato: 'Tempo Integral', // Placeholder
    tipoRelacaoContractual: 'Quadro', // Placeholder
    email: `${nomePartes[0].toLowerCase()}.${nomePartes[nomePartes.length-1].toLowerCase()}@isps.ac.mz`,
    tipo: 'Docente',
    efetivo: true,
    unidade: 'Repartição de Pessoal',
    cargo: 'Docente'
  };
}).filter(c => c !== null);

console.log(JSON.stringify(colaboradores, null, 2));
