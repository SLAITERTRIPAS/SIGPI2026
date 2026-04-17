export const UNIDADES_ORGANICAS_SISTEMA = [
  {
    id: 'odg',
    nome: 'Órgãos de Direção e Gestão',
    direcoes: ['DIRETOR-GERAL', 'CONSELHO DE REPRESENTANTES', 'CONSELHO ADMINISTRATIVO E DE GESTÃO', 'CONSELHO TÉCNICO E DE QUALIDADE', 'SECRETARIA GERAL']
  },
  {
    id: 'uo',
    nome: 'Unidades Orgânicas',
    direcoes: ['Divisão de Engenharia', 'Centro de Incubação de Empresas', 'Centros']
  },
  {
    id: 'sc',
    nome: 'Serviços Centrais',
    direcoes: ['DICOSAFA', 'DICOSSER']
  }
];

export const UNIDADES_CENTRAIS = [
  'Direção central',
  'CAS',
  'CR',
  'Gabinete do Diretor Geral'
];

export const UNIDADES_ORGANICAS = [
  'Divisão de Engenharia',
  'Centro de Incubação de Empresas',
  'Centros'
];

export const SERVICOS_CENTRAIS = [
  'DICOSAFA',
  'DICOSSER'
];

export const DEPARTAMENTOS: Record<string, string[]> = {
  'DIRETOR-GERAL': [
    'Diretor Geral',
    'Conselheiro Executivo',
    'Chefe do GDG',
    'Secretaria Executiva',
    'Departamento de Planificação, Estudos e Projetos',
    'Unidade Gestora e Executora de Aquisições',
    'Departamento de Cooperação e Relações Exteriores',
    'Departamento de Controlo Técnico e de Qualidade'
  ],
  'Gabinete do Diretor Geral': [
    'Diretor Geral',
    'Conselheiro Executivo',
    'Chefe do GDG',
    'Secretaria Executiva',
    'Departamento de Planificação, Estudos e Projetos',
    'Unidade Gestora e Executora de Aquisições',
    'Departamento de Cooperação e Relações Exteriores',
    'Departamento de Controlo Técnico e de Qualidade'
  ],
  'Divisão de Engenharia': [
    'Diretor da Divisão de Engenharias',
    'Diretor Adjunto da Divisão de Engenharias',
    'Departamento de Pesquisa e Extensão',
    'Departamento de Engenharia Eletrotécnica',
    'Departamento de Engenharia de Construção Civil',
    'Departamento de Engenharia Construção Mecânica',
    'Departamento de Cadeiras Gerais',
    'Departamento Técnico e de Apoio'
  ],
  'DICOSAFA': [
    'Diretor da DICOSAFA',
    'Departamento de Recursos Humanos',
    'Departamento de Finanças',
    'Departamento de Património',
    'Secretaria Geral',
    'Departamento TIC',
    'Departamento Lar de Estudantes',
    'Departamento de Produção Alimentar'
  ],
  'DICOSSER': [
    'Diretor da DICOSSER',
    'Departamento de Registo Académico',
    'Departamento de Assuntos Estudantis',
    'Departamento de Biblioteca'
  ],
  'Departamento de Biblioteca': [
    'Chefe de DBA',
    'Biblioteca',
    'Repartição de Documentos',
    'Repartição de Arquivo'
  ],
  'Centro de Incubação de Empresas': [
    'Diretor do CIE',
    'Departamento de C. E. P. E. A. Fundos',
    'Departamento de P. O. Negócios e Emprego',
    'Departamento de PGNDE'
  ],
  'Centros': []
};

export const REPARTICOES: Record<string, string[]> = {
  'Departamento de Biblioteca': [
    'Repartição de Documentos',
    'Reparticiao de Arquivo'
  ]
};

export const CURSOS: Record<string, string[]> = {
  'Departamento de Pesquisa e Extensão': [
    'Pesquisa Científica',
    'Extensão Universitária'
  ],
  'Departamento de Engenharia Eletrotécnica': [
    'Engenharia Elétrica',
    'Engenharia Eletrotécnica e de Telecomunicações',
    'Engenharia de Energias Renováveis'
  ],
  'Departamento de Engenharia Civil': [
    'Engenharia de Construção Civil',
    'Engenharia Hidráulica'
  ],
  'Departamento de Engenharia Mecânica': [
    'Engenharia de Construção Mecânica',
    'Engenharia Termotécnica'
  ],
  'Departamento de Cadeiras Gerais': [
    'Matemática',
    'Física',
    'Química'
  ],
  'Departamento Técnico e de Apoio': [
    'Laboratórios',
    'Oficinas'
  ],
  'Departamento de Recursos Humanos': [
    'Gestão de RH'
  ],
  'Departamento de Finanças': [
    'Contabilidade',
    'Gestão Financeira'
  ],
  'Departamento de Património': [
    'Gestão de Património'
  ],
  'Departamento TIC': [
    'Informática',
    'Redes'
  ],
  'Departamento Lar de Estudantes': [
    'Gestão de Alojamento'
  ],
  'Departamento de Produção Alimentar': [
    'Gestão de Cantinas'
  ],
  'Departamento de Registo Académico': [
    'Gestão Académica'
  ],
  'Departamento de Assuntos Estudantis': [
    'Apoio ao Estudante'
  ],
  'Departamento de Biblioteca': [
    'Gestão de Informação'
  ],
  'Departamento de C. E. P. E. A. Fundos': [
    'Gestão de Fundos'
  ],
  'Departamento de P. O. Negócios e Emprego': [
    'Empreendedorismo'
  ],
  'Departamento de PGNDE': [
    'Gestão de Negócios'
  ]
};

export const DISTANCIAS_SONGO: Record<string, number> = {
  'TETE': 150,
  'MANICA': 400,
  'SOFALA': 600,
  'ZAMBÉZIA': 800,
  'NIASSA': 1200,
  'NAMPULA': 1600,
  'CABO_DELGADO': 1800,
  'INHAMBANE': 1100,
  'GAZA': 1400,
  'MAPUTO_PROVINCIA': 1600,
  'MAPUTO_CIDADE': 1600
};

export const PROVINCIAS: Record<string, string[]> = {
  'MAPUTO_PROVINCIA': ['Boane', 'Magude', 'Manhiça', 'Marracuene', 'Matutuíne', 'Moamba', 'Namaacha', 'Matola'],
  'MAPUTO_CIDADE': ['Central', 'Munhava', 'KaMavota'],
  'GAZA': ['Bilene', 'Chibuto', 'Chigubo', 'Chókwè', 'Chonguene', 'Guijá', 'Limpopo', 'Mabalane', 'Mandlakazi', 'Massangena', 'Massingir'],
  'INHAMBANE': ['Funhalouro', 'Govuro', 'Homoíne', 'Inharrime', 'Inhassoro', 'Jangamo', 'Mabote', 'Massinga', 'Maxixe', 'Morrumbene', 'Panda', 'Vilankulo'],
  'MANICA': ['Bárue', 'Chimoio', 'Gondola', 'Guro', 'Macate', 'Machaze', 'Macossa', 'Manica', 'Mossurize', 'Sussundenga', 'Tambara', 'Vanduzi'],
  'TETE': ['Angónia', 'Cahora Bassa', 'Changara', 'Chifunde', 'Chiuta', 'Dôa', 'Macanga', 'Mágoè', 'Marávia', 'Moatize', 'Mutarara', 'Tsangano', 'Tete', 'Zumbo', 'Marara'],
  'SOFALA': ['Búzi', 'Caia', 'Chemba', 'Cheringoma', 'Chibabava', 'Dondo', 'Gorongosa', 'Machanga', 'Marínguè', 'Marromeu', 'Muanza', 'Nhamatanda', 'Beira'],
  'ZAMBÉZIA': ['Alto Molócuè', 'Chinde', 'Derre', 'Gilé', 'Gurué', 'Ile', 'Inhassunge', 'Lugela', 'Maganja da Costa', 'Milange', 'Mocuba', 'Mopeia', 'Morrumbala', 'Namacurra', 'Namarroi', 'Pebane'],
  'NAMPULA': ['Angoche', 'Eráti', 'Ilha de Moçambique', 'Lalaua', 'Larde', 'Malema', 'Meconta', 'Mecubúri', 'Memba', 'Mogincual', 'Mogovolas', 'Moma', 'Monapo', 'Mossuril', 'Muecate', 'Murrupula', 'Nacala-à-Velha', 'Nacala-Porto', 'Nacarôa', 'Nampula', 'Rapale', 'Ribáuè', 'Liúpo'],
  'NIASSA': ['Chimbonila', 'Cuamba', 'Lago', 'Lichinga', 'Majune', 'Mandimba', 'Marrupa', 'Maúa', 'Mavago', 'Mecanhelas', 'Mecula', 'Metarica', 'Muembe', 'N\'gauma', 'Nipepe', 'Sanga'],
  'CABO_DELGADO': ['Ancuabe', 'Balama', 'Chiúre', 'Ibo', 'Macomia', 'Mecúfi', 'Meluco', 'Metuge', 'Mocímboa da Praia', 'Montepuez', 'Mueda', 'Muidumbe', 'Namuno', 'Nangade', 'Palma', 'Quissanga']
};

export const RUBRICAS = [
  'Demais despesas com o pessoal 112',
  'Bens 121',
  'Serviços 122',
  'Demais transferências a famílias 1434',
  'Exercícios findos 12'
];

export const NECESSIDADES: Record<string, string[]> = {
  'Demais despesas com o pessoal 112': [
    '112101 - Ajuda de custo dentro do país para pessoal civil',
    '112102 - Ajuda de custo fora do país para pessoal civil',
    '112103 - Auxílio ao pessoal civil estrangeiro',
    '112104 - Renda de casa para pessoal civil',
    '112105 - Representação para pessoal civil',
    '112106 - Subsídio de combustível e manutenção de viaturas',
    '112107 - Suplemento de salários e remunerações para pessoal civil',
    '112108 - Subsídio de funeral para pessoal civil',
    '112109 - Subsídio de telefone celular para pessoal civil',
    '112110 - Remunerações extraordinárias de pessoal civil',
    '112111 - Contratação por tempo determinado de pessoal civil',
    '112199 - Outras despesas com pessoal'
  ],
  'Bens 121': [
    '121001 - Combustíveis e lubrificantes',
    '121002 - Material para manutenção e reparação de bens imóveis',
    '121003 - Material para manutenção e reparação de bens móveis',
    '121005 - Material de consumo para escritório',
    '121006 - Material duradouro de escritório',
    '121007 - Fardamentos e calçados',
    '121008 - Sobressalentes para equipamentos máquinas e motores',
    '121009 - Medicamentos e apósitos',
    '121010 - Géneros alimentícios',
    '121011 - Material de limpeza e higiene',
    '121014 - Ferramentas de uso durouro',
    '121015 - Material de consumo para ensino e formação',
    '121016 - Material duradouro para ensino e formação',
    '121017 - Material de consumo para desporto',
    '121018 - Material duradouro para desporto',
    '121020 - Material de representação',
    '121021 - Material de festividades, homenagens e premiação',
    '121022 - Material de consumo para informática',
    '121023 - Material duradouro para informática',
    '121024 - Software de base',
    '121026 - Material de consumo para copa e cozinha',
    '121027 - Material duradouro para copa e cozinha',
    '121028 - Sementes, plantas e insumos',
    '121029 - Material para conservação de estradas e vias',
    '121030 - Bandeiras e flâmulas',
    '121031 - Material para conservação de rede de eletrificação',
    '121032 - Material de aplicação restritiva',
    '121033 - Material para aplicação em projetos sociais e assistência social',
    '121034 - Material para conservação de rede de água e esgoto',
    '121098 - Outros bens de consumo',
    '121099 - Outros bens duradouros'
  ],
  'Serviços 122': [
    '122001 - Comunicações em geral',
    '122002 - Passagens dentro do país',
    '122003 - Passagens fora do país',
    '122004 - Renda de instalações',
    '122005 - Manutenção e reparação de bens imóveis',
    '122006 - Manutenção e reparação de bens móveis',
    '122007 - Manutenção e reparação de veículos',
    '122008 - transporte e carga',
    '122009 - Seguros',
    '122010 - Representação',
    '122011 - Festividades homenagens e premiações',
    '122012 - Água',
    '122013 - Energia elétrica',
    '122021 - Limpeza e conservação',
    '122022 - Serviços de segurança',
    '122023 - Transporte de funcionários',
    '122024 - Serviços gráficos',
    '122025 - Serviços para atender a projetos sociais e assistência social',
    '122026 - Manutenção e reparação de estradas e pontes',
    '122027 - Manutenção e reparação de rede de eletrificação',
    '122028 - Manutenção e reparação de rede de água e esgoto',
    '122099 - Outros serviços'
  ],
  'Demais transferências a famílias 1434': [
    '143401 - Bolsa de estudos no país',
    '143402 - Bolsa de estudos no exterior',
    '143405 - Subsídio de reintegração',
    '143406 - Subsídio de funeral',
    '143107 - Transferências a comunidade local',
    '143499 - Outras transferências a famílias'
  ],
  'Exercícios findos 12': [
    '161000 - Retractivos salariais',
    '161001 - Retractivos salariais de exercícios anteriores para pessoal civil',
    '161002 - Remunerações extraordinárias de exercícios anteriores para pessoal civil',
    '162003 - Pagamento de exercícios anteriores relativos a serviços'
  ]
};

export const FONTES_RECEITA = [
  'Tesouro Público',
  'Receitas Próprias',
  'Donativos',
  'Créditos Externos'
];

export const PRIORIDADES = ['Baixa', 'Média', 'Alta', 'Urgente'];

export const TRIMESTRES = ['1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre'];

export const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const VIATURAS = [
  'Toyota Hilux (AAB 123 MC)',
  'Nissan Hardbody (ABC 456 MC)',
  'Mitsubishi L200 (MMA 789 MC)',
  'Ford Ranger (FRD 001 MC)'
];

export const ESTADOS_CIVIS = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União de Facto'];

export const NIVEIS_ACADEMICOS = [
  'Ensino Primário (1º Grau)',
  'Ensino Primário (2º Grau)',
  'Ensino Básico',
  'Ensino Médio / Técnico Médio',
  'Bacharelato',
  'Licenciatura',
  'Pós-Graduação',
  'Mestrado',
  'Doutoramento'
];

export const CATEGORIAS_FUNCIONARIOS = [
  'Docente Universitário',
  'Técnico Superior',
  'Técnico Profissional',
  'Assistente Técnico',
  'Auxiliar Administrativo',
  'Operário Qualificado',
  'Motorista',
  'Agente de Serviço'
];

export const PROVINCIAS_LIST = [
  'Cabo Delgado',
  'Gaza',
  'Inhambane',
  'Manica',
  'Maputo Cidade',
  'Maputo Província',
  'Nampula',
  'Niassa',
  'Sofala',
  'Tete',
  'Zambézia'
];

export const SECOES = [
  'Recursos Humanos',
  'Finanças',
  'Património',
  'Registo Académico',
  'Biblioteca',
  'Ação Social',
  'Direção Geral',
  'Secretaria Geral'
];

export const HABILITACOES_PROFISSIONAIS_LIST = [
  'Formação Pedagógica',
  'Gestão de Projetos',
  'Informática Avançada',
  'Contabilidade Pública',
  'Administração Escolar',
  'Secretariado Executivo',
  'Manutenção Industrial',
  'Logística e Aprovisionamento'
];

export const FUNCIONARIOS: { nome: string; cargo: string }[] = [];
