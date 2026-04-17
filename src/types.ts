export interface Nota {
  id: string;
  title: string;
  content: string;
  date: string;
  prazo: string;
  remetente: string;
}

export interface Colaborador {
  id: string;
  ord: number;
  nome: string;
  genero: 'M' | 'F';
  dataNascimento: string;
  localNascimento: {
    pais: string;
    provincia: string;
    distrito: string;
  };
  nuit: string;
  numeroBI: string;
  nivelAcademico: string;
  areaFormacao: string;
  categoria: string;
  tipoContrato: string;
  tipoRelacaoContractual: string;
  email: string;
  tipo: 'Docente' | 'CTA';
  efetivo: boolean;
  unidade: string;
  cargo: string;
  cargoChefia?: string;
}

export interface EstudanteDados {
  id: string;
  curso: string;
  departamento: string;
  homens: number;
  mulheres: number;
}

export interface ProcessoIndividual {
  colaboradorId: string;
  dadosPessoais: Colaborador;
  documentosAnexos: {
    nomeDocumento: string;
    url: string;
  }[];
  formacaoComplementar: {
    curso: string;
    instituicao: string;
    ano: string;
  }[];
  historicoProfissional: {
    cargo: string;
    instituicao: string;
    periodo: string;
  }[];
  observacoes: string;
  completo: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO string
  startTime: string;
  endTime: string;
  location: string;
  participants: string;
  type: 'meeting' | 'activity' | 'Data Comemorativa' | 'Feriado Nacional' | 'Feriado Institucional';
  agenda: string;
  preside?: string;
  remetente?: string;
  status?: 'active' | 'archived';
}

export interface Expediente {
  id: string;
  tipo: 'Entrada' | 'Saída' | 'SIC';
  numero: string;
  data: string;
  assunto: string;
  origem: string;
  destino: string;
  status: 'Pendente' | 'Em andamento' | 'Concluído';
  criadoPor: string;
  vistoDigital?: {
    assinadoPor: string;
    data: string;
  };
  historico?: {
    setor: string;
    data: string;
    acao: string;
    parecer?: string;
  }[];
}

export interface ServiceRequest {
  id: string;
  trackingCode: string;
  visitorType: string;
  service: string;
  nome: string;
  curso: string;
  nivel: string;
  descricao: string;
  status: 'Submetido' | 'Na Secretaria Geral' | 'No Atendimento Estudantil' | 'No Chefe do Departamento' | 'No Diretor da Direção' | 'No Diretor Geral' | 'Concluído';
  history: {
    stage: string;
    date: string;
    parecer: string;
    author: string;
  }[];
  createdAt: string;
}

export interface LibraryRegistration {
  id: string;
  nome: string;
  tipoVisitante: string;
  numeroIdentificacao: string;
  curso: string;
  objetivo: string;
  usaComputador: boolean;
  computadorId?: string;
  livrosConsulta: string;
  livrosEmprestimo: string;
  data: string;
  horaEntrada: string;
}

export interface BookRegistration {
  id: string;
  titulo: string;
  subtitulo: string;
  autor: string;
  coautores: string;
  editora: string;
  anoPublicacao: string;
  edicao: string;
  isbn: string;
  issn: string;
  cdd: string;
  cdu: string;
  area: string;
  curso: string;
  genero: string;
  idioma: string;
  numeroPaginas: string;
  exemplares: string;
  localizacao: string;
  prateleira: string;
  estante: string;
  estadoConservacao: string;
  resumo: string;
  palavrasChave: string;
  dataAquisicao: string;
  tipoAquisicao: string;
}

export interface FinancialData {
  id: string;
  ano: string;
  orcamentoAnual: number;
  receitasProprias: number;
  subvencaoEstado: number;
  despesasPessoal: number;
  despesasFuncionamento: number;
  despesasInvestimento: number;
  dataSubmissao: string;
  status: 'Pendente' | 'Validado';
}
