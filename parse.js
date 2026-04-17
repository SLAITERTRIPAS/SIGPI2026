const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');
const lines = data.split('\n').filter(line => line.trim() !== '');

const colaboradores = lines.map((line, index) => {
  const parts = line.trim().split(/\s+/);
  if (parts.length < 5) return null;
  
  const idValue = parts[0];
  const nomePartes = [];
  let i = 1;

  // The name is everything between the ID and the Gender
  // Searching for the first occurrence of Gender 
  while (i < parts.length && parts[i] !== 'Masculino' && parts[i] !== 'Femenino' && parts[i] !== 'Femenina') {
    nomePartes.push(parts[i]);
    i++;
  }
  
  const nome = nomePartes.join(' ');
  const genero = parts[i];
  const dataNascimento = parts[i+1];
  const prov = parts[i+2];
  const dist = parts[i+3];
  const nuit = parts[i+4];
  const numBI = parts[i+5];
  const nivelAcademico = parts[i+6];
  
  // The rest is Area, Cat, Contrato, Relacao
  const restante = parts.slice(i+7);
  // This needs robust parsing based on known patterns...
  
  return {
    id: idValue,
    ord: parseInt(idValue),
    nome: nome,
    genero: (genero === 'Femenino' || genero === 'Femenina' || genero === 'F') ? 'F' : 'M',
    dataNascimento: dataNascimento,
    localNascimento: { pais: 'Moçambique', provincia: prov, distrito: dist },
    nuit: nuit,
    numeroBI: numBI,
    nivelAcademico: nivelAcademico,
    areaFormacao: 'Não especificada',
    categoria: 'Não especificada',
    tipoContrato: 'Não especificado',
    tipoRelacaoContractual: 'Não especificada',
    email: `${nomePartes[0].toLowerCase()}.${nomePartes[nomePartes.length-1].toLowerCase()}@isps.ac.mz`,
    tipo: 'Docente',
    efetivo: true,
    unidade: 'Repartição de Pessoal',
    cargo: 'Docente'
  };
}).filter(c => c !== null);

console.log(JSON.stringify(colaboradores, null, 2));
