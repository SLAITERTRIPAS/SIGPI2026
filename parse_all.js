const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');
const lines = data.split('\n').filter(line => line.trim() !== '');

const colaboradores = [];

for (const line of lines) {
  const parts = line.trim().split(/\s+/);
  if (parts.length < 5) continue;

  const id = parts[0];
  
  // Find where metadata fields start:
  // After name, comes Gender, Date, Province, District...
  const genderIndex = parts.findIndex(p => p === 'Masculino' || p === 'Feminino' || p === 'Femenino' || p === 'Femenina' || p === 'F' || p === 'M');
  if (genderIndex === -1) continue;

  const nome = parts.slice(1, genderIndex).join(' ');
  const genero = parts[genderIndex];
  const dataNascimento = parts[genderIndex+1];
  const prov = parts[genderIndex+2];
  const dist = parts[genderIndex+3];
  const nuit = parts[genderIndex+4];
  const numeroBI = parts[genderIndex+5];
  const resto = parts.slice(genderIndex+6);
  
  // A crude guess for the rest since exact mapping is hard
  const nivelAcademico = resto[0];
  const categoria = resto.slice(1, -4).join(' ');
  const tipoContrato = resto.slice(-3, -1).join(' ');
  const tipoRelacaoContractual = resto.slice(-1).join(' ');
  
  colaboradores.push({
    id: id,
    ord: parseInt(id),
    nome: nome,
    genero: (genero === 'Femenino' || genero === 'Femenina' || genero === 'F') ? 'F' : 'M',
    dataNascimento: dataNascimento,
    localNascimento: { pais: 'Moçambique', provincia: prov, distrito: dist },
    nuit: nuit,
    numeroBI: numeroBI,
    nivelAcademico: nivelAcademico,
    areaFormacao: 'Não especificada',
    categoria: categoria,
    tipoContrato: tipoContrato,
    tipoRelacaoContractual: tipoRelacaoContractual,
    email: `${nome.split(' ')[0].toLowerCase()}.${nome.split(' ')[nome.split(' ').length - 1].toLowerCase()}@isps.ac.mz`,
    tipo: 'Docente',
    efetivo: true,
    unidade: 'Repartição de Pessoal',
    cargo: 'Docente'
  });
}

console.log(JSON.stringify(colaboradores, null, 2));
