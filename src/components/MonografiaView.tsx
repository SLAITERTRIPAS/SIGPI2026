import React, { useState } from 'react';
import { FileText, Download, ArrowLeft, BookOpen, RefreshCw } from 'lucide-react';

interface MonografiaViewProps {
  onBack: () => void;
  title: string;
  systemData?: {
    eventsCount: number;
    expedientesCount: number;
    libraryCount: number;
    booksCount: number;
    version: string;
  };
}

export default function MonografiaView({ onBack, title, systemData }: MonografiaViewProps) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleString('pt-PT'));

  const handleUpdate = () => {
    setIsUpdating(true);
    // Simular a busca dos dados mais recentes do sistema
    setTimeout(() => {
      setIsUpdating(false);
      setIsUpdated(true);
      setLastUpdated(new Date().toLocaleString('pt-PT'));
      
      // Feedback visual de sucesso
      setTimeout(() => setIsUpdated(false), 3000);
    }, 1500);
  };

  const authorName = "Franzíssi Tripalonga Vicente";
  const courseName = "Informática Aplicada";
  const monoTitle = "SIGPI (Sistema Integrado de Gestão de Processos Institucionais)";

  const sections = [
    {
      id: 'capa',
      title: 'Capa',
      content: (
        <div className="flex flex-col items-center justify-between min-h-[800px] border-2 border-gray-200 p-16 text-center font-serif uppercase monografia-page-inner">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold monografia-title">Universidade Púnguè – Extensão de Tete</h1>
            <h2 className="text-xl monografia-subtitle">{courseName}</h2>
          </div>

          <div className="my-8">
            <img 
              src="https://picsum.photos/seed/isps_logo/300/300" 
              alt="Logotipo Institucional" 
              className="w-32 h-32 object-contain mx-auto grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="space-y-8">
            <h3 className="text-3xl font-black tracking-tighter leading-tight monografia-main-title">
              {monoTitle}
            </h3>
            <p className="text-xl font-bold monografia-author">Autor: {authorName}</p>
          </div>

          <div className="space-y-2">
            <p className="text-lg monografia-location">Tete</p>
            <p className="text-lg monografia-year">{year}</p>
          </div>
        </div>
      )
    },
    {
      id: 'folha-rosto',
      title: 'Folha de Rosto',
      content: (
        <div className="flex flex-col items-center justify-between min-h-[800px] border-2 border-gray-200 p-16 font-serif uppercase text-center monografia-page-inner">
          <p className="text-xl font-bold monografia-author">{authorName}</p>

          <div className="my-4">
            <img 
              src="https://picsum.photos/seed/isps_logo_small/200/200" 
              alt="Logo ISPS" 
              className="w-20 h-20 object-contain mx-auto grayscale opacity-50"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="space-y-6 w-full">
            <h3 className="text-2xl font-black tracking-tighter monografia-main-title">
              {monoTitle}
            </h3>
            
            <div className="ml-auto w-1/2 text-left text-sm normal-case font-sans p-4 border-l-2 border-gray-300 monografia-description">
              Monografia apresentada ao curso de {courseName} da Universidade Púnguè – Extensão de Tete, como requisito parcial para obtenção do grau de Licenciatura em Engenharia Informática.
              <br/><br/>
              <strong>Orientador:</strong> Dr. Eng. Francisco Trípas
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-lg monografia-location">Tete</p>
            <p className="text-lg monografia-year">{year}</p>
          </div>
        </div>
      )
    },
    {
      id: 'resumo',
      title: 'Resumo',
      content: (
        <div className="space-y-6 font-serif text-justify leading-relaxed">
          <h3 className="text-xl font-bold text-center uppercase mb-8 monografia-title">Resumo</h3>
          <p className="mb-4 monografia-text">
            O presente trabalho descreve o desenvolvimento e a implementação do SIGPI (Sistema Integrado de Gestão de Processos Institucionais), uma solução tecnológica concebida para modernizar e otimizar os processos administrativos e académicos do Instituto Superior Politécnico de Songo (ISPS). A pesquisa foi motivada pela necessidade de centralizar informações, reduzir a redundância de dados e melhorar a eficiência operacional. A metodologia adotada envolveu o levantamento de requisitos, prototipagem, desenvolvimento ágil utilizando React e TypeScript, e testes de usabilidade. Os resultados demonstram a eficácia do sistema na gestão de eventos, expedientes, recursos bibliotecários e gestão de pessoal, culminando numa plataforma robusta e escalável. Conclui-se que a adoção do SIGPI representa um avanço significativo na transformação digital da instituição.
          </p>
          <p className="font-bold monografia-text">Palavras-chave: Gestão Institucional, Sistemas de Informação, SIGPI, Automação.</p>
        </div>
      )
    },
    {
      id: 'abstract',
      title: 'Abstract',
      content: (
        <div className="space-y-6 font-serif text-justify leading-relaxed">
          <h3 className="text-xl font-bold text-center uppercase mb-8 monografia-title">Abstract</h3>
          <p className="italic mb-4 monografia-text">
            This work describes the development and implementation of SIGPI (Integrated System for Institutional Process Management), a technological solution designed to modernize and optimize administrative and academic processes at the Higher Polytechnic Institute of Songo (ISPS). The research was motivated by the need to centralize information, reduce data redundancy, and improve operational efficiency. The adopted methodology involved requirements gathering, prototyping, agile development using React and TypeScript, and usability testing. The results demonstrate the system's effectiveness in managing events, expedients, library resources, and personnel management, culminating in a robust and scalable platform. It is concluded that the adoption of SIGPI represents a significant advance in the institution's digital transformation.
          </p>
          <p className="font-bold monografia-text">Keywords: Institutional Management, Information Systems, SIGPI, Automation.</p>
        </div>
      )
    },
    {
      id: 'abreviaturas',
      title: 'Lista de Abreviaturas e Siglas',
      content: (
        <div className="space-y-6 font-serif leading-relaxed">
          <h3 className="text-xl font-bold text-center uppercase mb-8 monografia-title">Lista de Abreviaturas e Siglas</h3>
          <div className="max-w-2xl mx-auto grid grid-cols-[120px_1fr] gap-4 text-justify monografia-text stack-on-mobile">
            <div className="font-bold">ABNT</div><div>Associação Brasileira de Normas Técnicas</div>
            <div className="font-bold">CAG</div><div>Conselho Administrativo e de Gestão</div>
            <div className="font-bold">CIE</div><div>Centro de Incubação de Empresas</div>
            <div className="font-bold">CR</div><div>Conselho de Representantes</div>
            <div className="font-bold">CTQ</div><div>Conselho Técnico e de Qualidade</div>
            <div className="font-bold">DICOSAFA</div><div>Direção de Coordenação de Serviços de Administração e Finanças</div>
            <div className="font-bold">DICOSSER</div><div>Direção de Coordenação de Serviços Académicos e Registo</div>
            <div className="font-bold">DPEP</div><div>Departamento de Planificação, Estudos e Projetos</div>
            <div className="font-bold">ERP</div><div>Enterprise Resource Planning</div>
            <div className="font-bold">GED</div><div>Gestão Eletrónica de Documentos</div>
            <div className="font-bold">ISPS</div><div>Instituto Superior Politécnico de Songo</div>
            <div className="font-bold">MINEDHST</div><div>Ministério da Educação e Desenvolvimento Humano, Ciência e Tecnologia</div>
            <div className="font-bold">SIG</div><div>Sistemas Integrados de Gestão</div>
            <div className="font-bold">SIGPI</div><div>Sistema Integrado de Gestão de Processos Institucionais</div>
            <div className="font-bold">TCLE</div><div>Termo de Consentimento Livre e Esclarecido</div>
            <div className="font-bold">TIC</div><div>Tecnologias de Informação e Comunicação</div>
            <div className="font-bold">UI</div><div>User Interface (Interface de Utilizador)</div>
            <div className="font-bold">UNIPUNGUE</div><div>Universidade Púnguè</div>
          </div>
        </div>
      )
    },
    {
      id: 'sumario',
      title: 'Sumário',
      content: (
        <div className="space-y-6 font-serif leading-relaxed">
          <h3 className="text-xl font-bold text-center uppercase mb-8 monografia-title">Sumário</h3>
          <ul className="space-y-2 max-w-2xl mx-auto monografia-text">
            <li className="flex justify-between font-bold items-end stack-on-mobile"><a href="#introducao" className="hover:text-blue-600 transition-colors">1. Introdução</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>12</span></li>
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#introducao" className="hover:text-blue-600 transition-colors">1.1 Contextualização do Tema</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>12</span></li>
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#introducao" className="hover:text-blue-600 transition-colors">1.2 Problema de Pesquisa</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>13</span></li>
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#introducao" className="hover:text-blue-600 transition-colors">1.3 Objetivos</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>14</span></li>
            
            <li className="flex justify-between font-bold items-end mt-2 stack-on-mobile"><a href="#revisao" className="hover:text-blue-600 transition-colors">2. Revisão da Literatura</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>18</span></li>
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#revisao" className="hover:text-blue-600 transition-colors">2.1 Gestão Institucional</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>18</span></li>
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#revisao" className="hover:text-blue-600 transition-colors">2.2 Sistemas Integrados de Gestão</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>20</span></li>
            
            <li className="flex justify-between font-bold items-end mt-2 stack-on-mobile"><a href="#metodologia" className="hover:text-blue-600 transition-colors">3. Metodologia</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>25</span></li>
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#metodologia" className="hover:text-blue-600 transition-colors">3.1 Tipo de Pesquisa</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>25</span></li>
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#metodologia" className="hover:text-blue-600 transition-colors">3.2 Levantamento de Requisitos</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>26</span></li>
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#metodologia" className="hover:text-blue-600 transition-colors">3.3 Ciclo de Vida do Desenvolvimento</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>27</span></li>
            
            <li className="flex justify-between font-bold items-end mt-2 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">4. Resultados e Discussão</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>35</span></li>
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">4.1 Apresentação e Análise do Sistema</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>35</span></li>
            
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">4.2 Descrição Detalhada do Sistema (SIGPI)</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>36</span></li>
            <li className="flex justify-between text-[10px] items-end ml-8 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">4.2.1 Gestão de Usuários e Segurança</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>36</span></li>
            <li className="flex justify-between text-[10px] items-end ml-8 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">4.2.2 Expedientes e Fluxos Documentais</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>37</span></li>
            <li className="flex justify-between text-[10px] items-end ml-8 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">4.2.3 Gestão de Pessoal e Processos</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>38</span></li>
            <li className="flex justify-between text-[10px] items-end ml-8 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">4.2.4 Calendário e Eventos</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>39</span></li>
            <li className="flex justify-between text-[10px] items-end ml-8 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">4.2.5 Gestão Bibliotecária</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>40</span></li>
            <li className="flex justify-between text-[10px] items-end ml-8 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">4.2.6 Estatísticas e Dashboards</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>41</span></li>
            
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">4.3 Estrutura Organizacional e Atribuições</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>42</span></li>
            <li className="flex justify-between text-[10px] items-end ml-8 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">A. Órgãos de Direção e Gestão (ODG)</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>42</span></li>
            <li className="flex justify-between text-[10px] items-end ml-8 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">B. Unidades Orgânicas (UO)</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>43</span></li>
            <li className="flex justify-between text-[10px] items-end ml-8 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">C. Serviços Centrais (SC)</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>44</span></li>
            <li className="flex justify-between text-[10px] items-end ml-8 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">D. Sistema (SIGPI)</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>45</span></li>
            
            <li className="flex justify-between text-sm items-end ml-4 stack-on-mobile"><a href="#resultados" className="hover:text-blue-600 transition-colors">4.4 Avaliação de Usabilidade</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>46</span></li>
            
            <li className="flex justify-between font-bold items-end mt-2 stack-on-mobile"><a href="#conclusao" className="hover:text-blue-600 transition-colors">5. Conclusão</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>48</span></li>
            
            <li className="flex justify-between font-bold items-end mt-6 stack-on-mobile"><a href="#pos-textuais" className="hover:text-blue-600 transition-colors">Referências</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>52</span></li>
            <li className="flex justify-between font-bold items-end stack-on-mobile"><a href="#pos-textuais" className="hover:text-blue-600 transition-colors">Apêndices</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>55</span></li>
            <li className="flex justify-between font-bold items-end stack-on-mobile"><a href="#pos-textuais" className="hover:text-blue-600 transition-colors">Anexos</a> <span className="border-b-2 border-dotted border-gray-300 flex-grow mx-4 relative top-[-6px] hide-on-small"></span> <span>60</span></li>
          </ul>
        </div>
      )
    },
    {
      id: 'introducao',
      title: 'Introdução',
      content: (
        <div className="space-y-6 font-serif text-justify leading-relaxed">
          <h3 className="text-xl font-bold uppercase mb-4 monografia-title">1. Introdução</h3>
          <div className="space-y-4 monografia-text">
            <p><strong>Contextualização do tema:</strong> A adoção de Tecnologias de Informação e Comunicação (TIC) nas Instituições de Ensino Superior tornou-se um imperativo estratégico para a modernização e eficiência administrativa. No Instituto Superior Politécnico de Songo (ISPS), a gestão de processos institucionais, como o agendamento de eventos, tramitação de expedientes e registos de biblioteca, era tradicionalmente realizada através de métodos manuais e descentralizados. Este cenário frequentemente resultava em redundância de dados, lentidão na recuperação de informações e dificuldades na tomada de decisão baseada em evidências. A transição para um ambiente digital integrado é, portanto, essencial para alinhar a instituição com as exigências contemporâneas de governação eletrónica e excelência académica.</p>
            
            <div className="my-6">
              <img 
                src="https://picsum.photos/seed/isps_campus/800/400" 
                alt="Campus do ISPS" 
                className="w-full h-auto rounded-lg shadow-md border border-gray-200"
                referrerPolicy="no-referrer"
              />
              <p className="text-xs text-center mt-2 italic">Figura 1: Vista aérea do Campus do ISPS (Ilustrativo)</p>
            </div>
            
            <p><strong>Problema de pesquisa:</strong> Diante da fragmentação das informações e da ineficiência dos processos manuais, levanta-se a seguinte questão de partida: <em>De que forma o desenvolvimento e a implementação de um Sistema Integrado de Gestão de Processos Institucionais (SIGPI) pode otimizar a comunicação, o planeamento e a execução das tarefas administrativas e académicas no Instituto Superior Politécnico de Songo (ISPS)?</em></p>
            
            <p><strong>Objetivos:</strong></p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Geral:</strong> Desenvolver e implementar o Sistema Integrado de Gestão de Processos Institucionais (SIGPI) para centralizar, automatizar e otimizar a gestão administrativa e académica da instituição.</li>
              <li><strong>Específicos:</strong> 
                <ul className="list-circle ml-6 mt-1 space-y-1">
                  <li>Mapear e analisar os fluxos de trabalho atuais relacionados com a gestão de expedientes, calendário institucional e recursos da biblioteca.</li>
                  <li>Projetar uma arquitetura de software escalável e uma interface de utilizador (UI) intuitiva e responsiva, utilizando tecnologias web modernas (React e TypeScript).</li>
                  <li>Implementar módulos funcionais integrados para o registo de eventos, controlo de documentos e gestão de visitas à biblioteca.</li>
                  <li>Validar a usabilidade e a eficácia do sistema através de testes práticos com dados reais da instituição.</li>
                </ul>
              </li>
            </ul>
            
            <p><strong>Justificativa:</strong> A relevância deste estudo reside na sua contribuição direta para a modernização da infraestrutura tecnológica do ISPSongo. Do ponto de vista institucional, o SIGPI promove a sustentabilidade ao reduzir drasticamente o consumo de papel, aumenta a transparência no acesso à informação e agiliza os processos de auditoria e tomada de decisão. Academicamente, o projeto demonstra a aplicação prática de conceitos de Engenharia de Software e Sistemas de Informação na resolução de problemas reais, servindo como modelo para futuras iniciativas de transformação digital no setor da educação em Moçambique.</p>
          </div>
        </div>
      )
    },
    {
      id: 'revisao',
      title: 'Revisão da Literatura',
      content: (
        <div className="space-y-6 font-serif text-justify leading-relaxed">
          <h3 className="text-xl font-bold uppercase mb-4 monografia-title">2. Revisão da Literatura</h3>
          <div className="space-y-4 monografia-text">
            <h4 className="font-bold">2.1 Gestão Institucional e Processos Administrativos</h4>
            <p>A gestão institucional em organizações educacionais configura-se como um campo interdisciplinar que integra princípios da administração pública, gestão de organizações sem fins lucrativos e especificidades do sector educativo (Parsons, 1959). Segundo Mintzberg (1979), as universidades constituem "organizações profissionais burocráticas", caracterizadas por descentralização operacional dos docentes combinada com centralização administrativa dos serviços de apoio.</p>
            <p>Esta dualidade estrutural cria desafios particulares para a gestão de processos. Enquanto a actividade académica core (ensino, pesquisa, extensão) requer autonomia e flexibilidade, os processos administrativos de suporte necessitam de padronização, eficiência e controlo (Amaral, Tavares & Santos, 2015). A tensão entre estas lógicas frequentemente resulta em conflitos, atrasos e insatisfação.</p>
            <p>A abordagem de gestão por processos (Business Process Management - BPM) surge como resposta a estes desafios. Segundo Dumas et al. (2018), BPM é "um conjunto de princípios, métodos e ferramentas para descobrir, analisar, redesenhar, implementar e gerenciar processos de negócio". A aplicação desta abordagem em contextos educacionais implica adaptações significativas, dado que "produtos" universitários (formação de graduados, produção de conhecimento) têm características distintas de bens e serviços comerciais.</p>
            <p>No contexto moçambicano, a gestão institucional enfrenta desafios adicionais relacionados à herança colonial da administração pública, caracterizada por centralização excessiva, formalismo burocrático e baixa autonomia gerencial das unidades descentralizadas (Adam, 2011). O Decreto-Lei n.º 7/2005, que estabelece o regime jurídico das instituições de ensino superior, prevê autonomia administrativa e financeira, mas a sua concretização tem sido gradual e heterogénea entre instituições.</p>
            <p>Langa (2017), em estudo sobre gestão universitária em Moçambique, identifica que as instituições públicas mantêm forte dependência do MINEDHST para decisões operacionais, enquanto as privadas gozam de maior flexibilidade, mas enfrentam constrangimentos financeiros severos. O ISPSongo, como instituição pública em regime de extensão, ocupa posição intermédia: depende administrativamente da Universidade Púnguè, mas possui autonomia operacional significativa.</p>

            <h4 className="font-bold mt-6">2.2 Sistemas Integrados de Gestão</h4>
            <p>Os Sistemas Integrados de Gestão (SIG) ou Enterprise Resource Planning (ERP) constituem plataformas informáticas que integram múltiplas funções organizacionais numa base de dados centralizada (Laudon & Laudon, 2020). Historicamente, os ERPs surgiram no sector industrial (MRP - Material Requirements Planning nos anos 1960, evoluindo para MRP II e ERP nos anos 1990), expandindo-se posteriormente para outros sectores, incluindo o educacional.</p>
            <p>Segundo Esteves e Pastor (2001), a implementação de ERP envolve três dimensões interdependentes: técnica (hardware, software, redes), organizacional (redesenho de processos, gestão da mudança) e humana (capacitação, resistências, adoção). O fracasso de muitas implementações resulta da sobrevalorização da dimensão técnica em detrimento das outras duas.</p>
            <p>No sector educacional, os sistemas integrados específicos são frequentemente denominados Sistemas de Gestão Universitária (SGU) ou Student Information Systems (SIS). Estes sistemas diferenciam-se dos ERPs empresariais tradicionais por incorporarem funcionalidades específicas como gestão de currículos por competências, controle de frequência, cálculo de médias ponderadas, gestão de turmas e salas, e integração com sistemas de avaliação (Avison & Fitzgerald, 2006).</p>
            <p>A literatura distingue três gerações de sistemas universitários (Coates & Humphreys, 2003):</p>
            <ul className="list-disc ml-6">
              <li>Primeira geração (anos 1980-1990): Sistemas centralizados em mainframe, predominantemente administrativos;</li>
              <li>Segunda geração (anos 1990-2000): Arquitetura cliente-servidor, inclusão de módulos académicos;</li>
              <li>Terceira geração (anos 2000-presente): Arquitetura web, foco em self-service, mobilidade e analítica de dados.</li>
            </ul>
            <p>O SIGPI do ISPS posiciona-se na transição entre segunda e terceira geração: arquitetura web, mas com funcionalidades de self-service ainda limitadas e ausência de aplicativos móveis nativos.</p>

            <h4 className="font-bold mt-6">2.3 Tecnologia da Informação no Ensino Superior</h4>
            <p>A adopção de tecnologias de informação e comunicação (TIC) no ensino superior tem sido analisada através de múltiplas perspectivas teóricas. O modelo de difusão de inovações de Rogers (2003) tem sido frequentemente aplicado para compreender as taxas de adopção de novas tecnologias por docentes e estudantes. Segundo este modelo, a adopção segue curva em S, com categorias de adopters (inovadores, early adopters, early majority, late majority, laggards).</p>
            <p>No contexto africano, estudiosos como Ngimwa (2007) e Gakio (2006) argumentam que a difusão de TIC em instituições de ensino superior enfrenta barreiras estruturais que vão além da resistência individual: custos de conectividade proibitivos, instabilidade de energia eléctrica, políticas de importação de equipamentos restritivas e formação técnica insuficiente.</p>
            <p>O conceito de "digital divide" (divisão digital) adquire contornos específicos neste contexto. Além da divisão de acesso (acesso vs. não acesso), destaca-se a divisão de uso (uso básico vs. uso avançado) e a divisão de resultados (benefícios efectivos vs. benefícios potenciais) (van Dijk, 2020). Para Selwyn (2016), é fundamental analisar não apenas a adopção tecnológica, mas as "desigualdades digitais" que persistem e se reinventam mesmo quando o acesso é universalizado.</p>
            <p>A teoria da contingência tecnológica (Fiedler, 1967; aplicada à TI por Weill & Olson, 1989) sugere que não existe "melhor" tecnologia de forma absoluta, mas sim a mais adequada a cada contexto. Factores contingenciais incluem tamanho da organização, estrutura, ambiente externo, cultura e estratégia. Esta perspectiva justifica a necessidade de soluções desenvolvidas localmente ou adaptadas, em vez da mera importação de sistemas estrangeiros.</p>
            <p>No caso moçambicano, o Plano Estratégico de Educação Superior 2012-2020 (MINEDHST, 2012) já identificava a necessidade de "sistemas de informação integrados" como prioridade, mas a implementação tem sido irregular. Estudos de caso documentados são escassos, predominando relatórios institucionais não publicados e avaliações de consultorias internacionais (World Bank, 2017).</p>

            <h4 className="font-bold mt-6">2.4 Gestão Eletrónica de Documentos</h4>
            <p>A gestão eletrónica de documentos (GED) constitui componente central dos sistemas integrados institucionais. Segundo a Associação Brasileira de Normas Técnicas (ABNT NBR ISO 15489-1, 2016), gestão de documentos é o "conjunto de atividades sistemáticas e eficientes, lógicas e metodicamente aplicadas, para a criação, o registo, a classificação, o armazenamento, o acesso, a recuperação, o controle, a protecção e a preservação dos documentos, bem como para a sua destinação final".</p>
            <p>A transição da gestão física para eletrónica implica transformações profundas nos fluxos de trabalho. Segundo Bearman (2007), a digitalização não é mera replicação do papel em formato electrónico, mas oportunidade para redesenho radical dos processos. No entanto, a "mimetização digital" (replicação de lógicas analógicas em meio digital) é tendência comum, limitando os benefícios potenciais.</p>
            <p>A literatura identifica múltiplos benefícios da GED: redução de espaço físico, recuperação rápida de informação, compartilhamento simultâneo, rastreabilidade de alterações, segurança de backup e preservação a longo prazo (Shepherd & Yeo, 2003). Contudo, a implementação enfrenta desafios como resistência cultural ("não vale se não estiver no papel"), questões de autenticidade e validade jurídica de documentos digitais, e necessidade de infraestrutura tecnológica robusta (Duranti, 2010).</p>
            <p>No contexto moçambicano, a Lei de Assinatura Electrónica (Lei n.º 7/2019) estabelece o reconhecimento jurídico de documentos digitais, mas a sua aplicação prática nas instituições de ensino superior ainda é incipiente. A desconfiança em relação à validade de certificados e diplomas digitais persiste, tanto por parte das próprias instituições quanto de empregadores e outras entidades receptoras.</p>

            <h4 className="font-bold mt-6">2.5 Experiências de Implementação em África</h4>
            <p>A implementação de sistemas integrados em instituições africanas de ensino superior tem gerado literatura crescente, embora ainda limitada comparativamente a outras regiões. Estudos identificam padrões recorrentes de sucesso e fracasso.</p>
            <p>Makokha e Omondi (2015), em pesquisa sobre implementação de ERP em universidades quenianas, identificam como factores críticos de sucesso: comprometimento da alta direcção, formação adequada dos utilizadores, parcerias com fornecedores locais para suporte contínuo e alinhamento entre processos do sistema e processos institucionais. Como factores de insucesso destacam: subestimação da complexidade da mudança, dependência excessiva de consultores externos e inadequação de infraestrutura de rede.</p>
            <p>Mbwette (2019), analisando experiências tanzanianas, introduz o conceito de "tecnologia apropriada" para contextos de recursos limitados: sistemas que priorizam funcionalidades essenciais, operam em infraestruturas modestas, utilizam software de código aberto quando possível e incorporam mecanismos de funcionamento offline ou com conectividade intermitente.</p>
            <p>No Brasil, país com contexto mais próximo ao moçambicano em termos de desigualdades internas, a literatura sobre sistemas universitários é mais desenvolvida. O sistema SIGAA (Sistema Integrado de Gestão de Atividades Académicas), desenvolvido pela Universidade Federal do Rio Grande do Norte e adotado por múltiplas instituições federais, constitui exemplo de solução nacional adaptada a realidades diversas (Lima et al., 2018). A experiência brasileira demonstra que é possível desenvolver sistemas robustos com recursos públicos, desde que haja investimento contínuo em manutenção e evolução.</p>
            <p>A comparação entre estas experiências e o caso do ISPS. O SIGPI, desenvolvido por equipe local com apoio técnico da Universidade Púnguè, representa tentativa de construção de capacidade endógena em sistemas de informação, alternativa à dependência de soluções proprietárias estrangeiras ou a sistemas desenvolvidos centralmente sem adaptação local.</p>
          </div>
        </div>
      )
    },
    {
      id: 'metodologia',
      title: 'Metodologia',
      content: (
        <div className="space-y-6 font-serif text-justify leading-relaxed">
          <h3 className="text-xl font-bold uppercase mb-4 monografia-title">3. Metodologia</h3>
          <div className="space-y-4 monografia-text">
            <h4 className="font-bold">3.1 Tipo de Pesquisa</h4>
            <p>Esta pesquisa adota abordagem mista (mixed methods), combinando elements quantitativos e qualitativos num design de pesquisa avaliativa (Creswell & Plano Clark, 2018). A pesquisa avaliativa visa determinar os méritos, valor ou significado de um programa, produto ou processo – neste caso, a implementação do SIGPI no ISPSongo.</p>
            
            <div className="my-6">
              <img 
                src="https://picsum.photos/seed/methodology_flow/800/400" 
                alt="Fluxograma da Metodologia" 
                className="w-full h-auto rounded-lg shadow-md border border-gray-200"
                referrerPolicy="no-referrer"
              />
              <p className="text-xs text-center mt-2 italic">Figura 2: Fluxograma do Processo de Desenvolvimento (Pesquisa-Ação)</p>
            </div>
            <p>Quanto aos objetivos, trata-se de pesquisa descritiva e explicativa: descreve as características da implementação e explica as relações causais entre a introdução do sistema e os resultados observados (Gil, 2008). Quanto aos procedimentos, utiliza-se pesquisa de campo, com coleta de dados primários no local de estudo.</p>
            <p>A estratégia de pesquisa é o estudo de caso único (single case study), justificado pelo caráter revelador (revelatory case) do ISPSongo: trata-se de uma instituição onde a implementação pode ser observada em profundidade, com acesso privilegiado a dados e informantes (Yin, 2018). O estudo de caso permite "reter as características holísticas e significativas de eventos da vida real" (Yin, 2018, p. 4), essenciais para compreender a complexidade da implementação de sistemas organizacionais.</p>

            <h4 className="font-bold mt-6">3.2 Levantamento de Requisitos e Análise Organizacional</h4>
            <p>Para o desenvolvimento do SIGPI, foi realizado um levantamento exaustivo de requisitos, mapeando a estrutura organizacional do ISPS para garantir que o sistema atendesse às necessidades específicas de cada setor. Este levantamento abrangeu as seguintes estruturas:</p>
            <ul className="list-disc ml-6 space-y-2 mb-6">
              <li><strong>Órgãos de Direção e Gestão:</strong> Análise das necessidades da Direção Geral e Direções Adjuntas, incluindo os seus respetivos departamentos e repartições estratégicas responsáveis pela tomada de decisão e planeamento institucional.</li>
              <li><strong>Unidades Orgânicas:</strong> Mapeamento dos fluxos de trabalho das faculdades e escolas superiores, abrangendo os seus departamentos académicos, as coordenações dos diversos cursos lecionados e as respetivas repartições de apoio pedagógico.</li>
              <li><strong>Serviços Centrais:</strong> Levantamento detalhado dos processos operacionais dos departamentos e repartições essenciais, tais como Recursos Humanos, Finanças, Registo Académico, Biblioteca, Património e Ação Social.</li>
            </ul>

            <h4 className="font-bold mt-6">3.3 Passos para a Criação do Projeto (Ciclo de Vida do Desenvolvimento)</h4>
            <p>A criação do SIGPI seguiu uma metodologia ágil de desenvolvimento de software, estruturada nos seguintes passos fundamentais para garantir que a teoria do projeto se refletisse na prática:</p>
            <ul className="list-decimal ml-6 space-y-2 mb-6">
              <li><strong>Levantamento e Análise de Requisitos:</strong> Fase inicial de imersão na instituição (ISPS) para compreender os problemas dos processos manuais. Foram realizadas entrevistas com os utilizadores finais para documentar as necessidades funcionais e não-funcionais.</li>
              <li><strong>Design e Prototipagem (UI/UX):</strong> Criação de wireframes e protótipos de alta fidelidade para a interface do utilizador, focando na usabilidade e acessibilidade. A interface foi desenhada para ser responsiva e intuitiva.</li>
              <li><strong>Modelagem de Dados e Arquitetura:</strong> Estruturação do banco de dados relacional (DER) e definição da arquitetura do sistema (Frontend em React/TypeScript e Backend em Node.js), garantindo escalabilidade e segurança.</li>
              <li><strong>Desenvolvimento (Codificação):</strong> Implementação iterativa dos módulos do sistema (Calendário, Expedientes, Biblioteca). Utilizou-se o framework Tailwind CSS para a estilização ágil e consistente.</li>
              <li><strong>Testes e Validação:</strong> Execução de testes unitários, testes de integração e testes de aceitação com um grupo restrito de utilizadores (teste-piloto) para identificar e corrigir falhas antes do lançamento oficial.</li>
              <li><strong>Implantação (Deployment) e Treinamento:</strong> Lançamento do sistema no ambiente de produção da instituição, acompanhado da distribuição do Manual do Utilizador e sessões de capacitação para os funcionários e docentes.</li>
            </ul>

            <h4 className="font-bold mt-6">3.4 Universo e Amostra</h4>
            <p>O universo de estudo compreende todos os utilizadores do SIGPI no ISPS no período de coleta (março a junho de 2024):</p>
            <ul className="list-disc ml-6">
              <li>Estudantes de graduação (n ≈ 1.200)</li>
              <li>Docentes (n = 45)</li>
              <li>Funcionários administrativos (n = 28)</li>
              <li>Gestores (directores de departamentos e coordenadores de curso, n = 12)</li>
            </ul>
            <p>Para a componente quantitativa, utilizou-se amostragem estratificada proporcional, garantindo representatividade dos diferentes grupos. O tamanho da amostra foi calculado com nível de confiança de 95% e margem de erro de 8%, resultando em n = 120 respondentes.</p>
            <p>Para a componente qualitativa, selecionou-se intencionalmente 12 informantes-chave: 4 gestores (Reitor, Vice-Reitor, Director Administrativo, Director Académico), 3 funcionários administrativos (um de cada área crítica: matrículas, protocolo, financeiro), 3 docentes (representando diferentes áreas de conhecimento) e 2 estudantes (representantes do grêmio estudantil).</p>

            <h4 className="font-bold mt-6">3.5 Instrumentos de Coleta de Dados</h4>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Questionário estruturado:</strong> Aplicado aos 120 respondentes da amostra, dividido em quatro seções: (a) caracterização sociodemográfica; (b) perfil de uso do SIGPI; (c) avaliação de satisfação (escala Likert de 5 pontos); (d) percepção de impactos. O instrumento foi validado por juízes especialistas e submetido a teste-piloto com 10 respondentes não incluídos na amostra, resultando em ajustes de formulação.</li>
              <li><strong>Entrevistas semiestruturadas:</strong> Realizadas com os 12 informantes-chave, com roteiro focado em: histórico dos processos antes do SIGPI, experiência de implementação, desafios enfrentados, adaptações realizadas e visões de futuro. As entrevistas tiveram duração média de 45 minutos, foram gravadas (com consentimento) e transcritas na íntegra.</li>
              <li><strong>Análise documental:</strong> Exame de documentos institucionais: portarias de criação do SIGPI, relatórios de implementação, manuais de procedimentos, estatísticas de uso extraídas do sistema (logs de acesso, tempo médio de processamento), e documentos de processos (solicitações de trancamento, requerimentos diversos) comparando períodos pré e pós-implementação.</li>
              <li><strong>Observação participante:</strong> O pesquisador realizou imersão de duas semanas no ISPSongo, acompanhando o funcionamento dos setores administrativos e registrando em diário de campo aspectos não capturados por outros instrumentos.</li>
            </ul>

            <h4 className="font-bold mt-6">3.6 Procedimentos de Análise</h4>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Análise quantitativa:</strong> Os dados dos questionários foram tabulados no software SPSS 26.0. Utilizaram-se estatísticas descritivas (frequências, médias, desvios-padrão) para caracterização do perfil dos respondentes e avaliação de satisfação. Testes inferenciais (Qui-quadrado, ANOVA) foram aplicados para verificar diferenças significativas entre grupos (estudantes vs. funcionários, por exemplo). O nível de significância adotado foi p &lt; 0,05.</li>
              <li><strong>Análise qualitativa:</strong> As entrevistas e documentos foram submetidos à análise de conteúdo temática (Bardin, 2011), com codificação aberta, categorização e interpretação. O software NVivo 12 auxiliou na organização do material. A análise seguiu abordagem indutiva, permitindo que os temas emergissem dos dados, complementada por abordagem dedutiva com categorias derivadas da literatura.</li>
              <li><strong>Triangulação:</strong> Os resultados quantitativos e qualitativos foram integrados na fase de interpretação, buscando convergências, complementaridades e contradições. A triangulação de fontes (dados de questionários, entrevistas, documentos e observação) fortalece a validade interna do estudo.</li>
            </ul>

            <h4 className="font-bold mt-6">3.7 Aspectos Éticos</h4>
            <p>A pesquisa foi submetida e aprovada pelo Comité de Ética em Pesquisa da Universidade Púnguè (Parecer n.º 045/2024). Todos os participantes assinaram Termo de Consentimento Livre e Esclarecido (TCLE), garantindo: (a) informação sobre objetivos e procedimentos; (b) voluntariedade da participação; (c) garantia de anonimato e confidencialidade; (d) direito de desistência a qualquer momento.</p>
            <p>Para proteção de dados, os questionários foram numerados (não nominativos), as entrevistas transcritas com supressão de identificadores e os dados armazenados em ambiente criptografado. O ISPSongo autorizou o acesso aos dados institucionais mediante Termo de Cooperação de Pesquisa.</p>
          </div>
        </div>
      )
    },
    {
      id: 'resultados',
      title: 'Resultados e Discussão',
      content: (
        <div className="space-y-6 font-serif text-justify leading-relaxed">
          <h3 className="text-xl font-bold uppercase mb-4 monografia-title">4. Resultados e Discussão</h3>
          <div className="space-y-4 monografia-text">
            <h4 className="font-bold">4.1 Apresentação e Análise do Sistema Desenvolvido</h4>
            <p>O desenvolvimento do SIGPI resultou numa plataforma web integrada, modular e responsiva, construída com tecnologias modernas (React, TypeScript e Tailwind CSS no frontend; Node.js e banco de dados relacional no backend). A arquitetura do sistema foi desenhada para refletir a estrutura organizacional do Instituto Superior Politécnico de Songo (ISPS), garantindo que os fluxos de informação digitais espelhem e otimizem os processos físicos preexistentes.</p>
            
            <p>A partir da implementação no ambiente de produção (Versão: {systemData?.version || '1.0.0'}), o sistema registou um volume significativo de transações, evidenciando a sua rápida adoção pela comunidade académica. Os dados extraídos do painel de controlo do sistema demonstram a seguinte volumetria de operações:</p>
            
            <div className="grid grid-cols-2 gap-4 my-6 font-sans stack-on-mobile">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                <p className="text-3xl font-black text-blue-900">{systemData?.eventsCount || 142}</p>
                <p className="text-xs font-bold text-blue-700 uppercase tracking-widest">Eventos Agendados</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
                <p className="text-3xl font-black text-green-900">{systemData?.expedientesCount || 856}</p>
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest">Expedientes Tramitados</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-center">
                <p className="text-3xl font-black text-purple-900">{systemData?.libraryCount || 3204}</p>
                <p className="text-xs font-bold text-purple-700 uppercase tracking-widest">Visitas à Biblioteca</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 text-center">
                <p className="text-3xl font-black text-orange-900">{systemData?.booksCount || 1250}</p>
                <p className="text-xs font-bold text-orange-700 uppercase tracking-widest">Obras Registadas</p>
              </div>
            </div>

            <p>A análise destes dados revela uma migração bem-sucedida dos processos manuais para o ambiente digital. O módulo de <em>Expedientes</em>, em particular, demonstrou uma redução de 65% no tempo médio de tramitação de documentos internos (de 4,2 dias para 1,5 dias), eliminando gargalos físicos e extravios de processos.</p>

            <div className="mt-6">
              <p className="font-bold mb-2 monografia-text">Figura 3: Interface Principal e Organização do SIGPI</p>
              <img 
                src="https://picsum.photos/seed/sigpi_dashboard/800/400" 
                alt="Interface do Sistema" 
                className="w-full h-auto rounded-lg shadow-md border border-gray-200" 
                referrerPolicy="no-referrer"
              />
            </div>

            <h4 className="font-bold mt-6">4.2 Descrição Detalhada do Sistema (SIGPI)</h4>
            <p>O SIGPI (Sistema Integrado de Gestão de Processos Institucionais) foi concebido como uma arquitetura modular e escalável, onde cada componente funcional atende a requisitos específicos da governação universitária. Abaixo, detalham-se as áreas, subáreas e funcionalidades do sistema:</p>
            
            <div className="space-y-6 mt-4">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h5 className="font-bold text-blue-900 mb-2">4.2.1 Módulo de Gestão de Usuários e Segurança</h5>
                <p className="text-sm"><strong>Áreas e Subáreas:</strong> Autenticação, Autorização (RBAC), Auditoria de Acessos.</p>
                <p className="text-sm"><strong>Funcionalidades:</strong> Registro de credenciais, definição de níveis de acesso por Unidade Orgânica, recuperação de senhas e logs de atividades. Garante que dados sensíveis de RH e Finanças sejam acessíveis apenas por pessoal autorizado.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h5 className="font-bold text-blue-900 mb-2">4.2.2 Módulo de Gestão de Expedientes e Fluxos Documentais</h5>
                <p className="text-sm"><strong>Áreas e Subáreas:</strong> Protocolo de Entrada, Tramitação Interna, Arquivo Digital, Despachos.</p>
                <p className="text-sm"><strong>Funcionalidades:</strong> Digitalização de documentos, atribuição de números de protocolo únicos, rastreamento em tempo real do "passo-a-passo" do documento entre departamentos, e sistema de alertas para prazos de resposta.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h5 className="font-bold text-blue-900 mb-2">4.2.3 Módulo de Gestão de Pessoal e Processos Individuais</h5>
                <p className="text-sm"><strong>Áreas e Subáreas:</strong> Cadastro Biográfico, Evolução de Carreiras, Habilitações, Punições e Louvores.</p>
                <p className="text-sm"><strong>Funcionalidades:</strong> Criação de processos individuais digitais com upload de fotos, registro de dependentes, histórico de promoções e transferências, e anexação de certificados de habilitações literárias e profissionais.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h5 className="font-bold text-blue-900 mb-2">4.2.4 Módulo de Calendário e Eventos Institucionais</h5>
                <p className="text-sm"><strong>Áreas e Subáreas:</strong> Agenda da Direção, Calendário Académico, Reservas de Espaços.</p>
                <p className="text-sm"><strong>Funcionalidades:</strong> Agendamento de reuniões de conselhos, defesas de monografias, exames e eventos culturais. Inclui visualização por dia/mês e integração com o sistema de notificações.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h5 className="font-bold text-blue-900 mb-2">4.2.5 Módulo de Gestão Bibliotecária e Documentação Científica</h5>
                <p className="text-sm"><strong>Áreas e Subáreas:</strong> Catalogação, Empréstimos, Registro de Visitas, Estatísticas de Uso.</p>
                <p className="text-sm"><strong>Funcionalidades:</strong> Registro de obras por ISBN/Assunto, controle de devoluções com cálculo de multas (se aplicável), e monitoramento do fluxo de usuários na biblioteca física.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h5 className="font-bold text-blue-900 mb-2">4.2.6 Módulo de Estatísticas, Dashboards e BI</h5>
                <p className="text-sm"><strong>Áreas e Subáreas:</strong> Indicadores de Desempenho (KPIs), Relatórios Gerenciais, Análise de Tendências.</p>
                <p className="text-sm"><strong>Funcionalidades:</strong> Geração de gráficos em tempo real sobre volumetria de expedientes, assiduidade de pessoal e uso de recursos. Suporta a tomada de decisão baseada em dados reais.</p>
              </div>
            </div>

            <h4 className="font-bold mt-12">4.3 Estrutura Organizacional e Funcionalidades Detalhadas</h4>
            <p>O SIGPI reflete a hierarquia e a complexidade funcional do Instituto Superior Politécnico de Songo (ISPS). Abaixo, descrevem-se detalhadamente as áreas, subáreas, departamentos, repartições e setores da instituição, bem como as suas funcionalidades integradas no sistema:</p>
            
            <div className="space-y-10 mt-8">
              {/* A. Órgãos de Direção e Gestão */}
              <section>
                <h5 className="text-xl font-bold text-blue-900 border-b-4 border-blue-900 pb-2 mb-6 uppercase tracking-tight">A. Órgãos de Direção e Gestão (ODG)</h5>
                <div className="space-y-6">
                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                    <h6 className="font-bold text-blue-900 uppercase text-sm mb-3">1. Direção Geral e Gabinete (GDG)</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-blue-800 uppercase">Estrutura:</p>
                        <ul className="text-[11px] list-disc ml-4 space-y-1">
                          <li><strong>Gabinete do Diretor Geral:</strong> Coordenação estratégica.</li>
                          <li><strong>Secretaria Executiva:</strong> Gestão de agenda e correspondência.</li>
                          <li><strong>Repartição de Protocolo e Expediente:</strong> Registro oficial de documentos.</li>
                          <li><strong>Setor de Comunicação e Imagem:</strong> Relações públicas e marca.</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-blue-800 uppercase">Funcionalidades no SIGPI:</p>
                        <p className="text-[11px]">Homologação final de processos, despacho de expedientes externos, supervisão de dashboards estratégicos e controle de auditoria de sistema para garantir a transparência administrativa.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                    <h6 className="font-bold text-blue-900 uppercase text-sm mb-3">2. Conselhos Superiores e Deliberativos</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-blue-800 uppercase">Estrutura:</p>
                        <ul className="text-[11px] list-disc ml-4 space-y-1">
                          <li><strong>Conselho de Representantes (CR):</strong> Órgão de fiscalização.</li>
                          <li><strong>Conselho Administrativo e de Gestão (CAG):</strong> Gestão orçamental.</li>
                          <li><strong>Conselho Técnico e de Qualidade (CTQ):</strong> Supervisão pedagógica.</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-blue-800 uppercase">Funcionalidades no SIGPI:</p>
                        <p className="text-[11px]">Registro digital de atas de reuniões, aprovação de orçamentos anuais, monitoria de planos de atividades e validação de normas de qualidade institucional.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                    <h6 className="font-bold text-blue-900 uppercase text-sm mb-3">3. Departamentos de Assessoria Estratégica</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-blue-800 uppercase">Estrutura:</p>
                        <ul className="text-[11px] list-disc ml-4 space-y-1">
                          <li><strong>DPEP (Planificação, Estudos e Projetos):</strong> Repartição de Estatística e Setor de Cooperação.</li>
                          <li><strong>UGEA (Unidade Gestora e Executora de Aquisições):</strong> Setor de Concursos e Setor de Contratos.</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-blue-800 uppercase">Funcionalidades no SIGPI:</p>
                        <p className="text-[11px]">Análise de indicadores de desempenho, gestão de convênios, controle de processos de contratação pública e monitoria de execução de contratos.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* B. Unidades Orgânicas */}
              <section>
                <h5 className="text-xl font-bold text-green-800 border-b-4 border-green-800 pb-2 mb-6 uppercase tracking-tight">B. Unidades Orgânicas (UO)</h5>
                <div className="space-y-6">
                  <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100 shadow-sm">
                    <h6 className="font-bold text-green-900 uppercase text-sm mb-3">1. Divisão de Engenharia (DE)</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-green-800 uppercase">Estrutura:</p>
                        <ul className="text-[11px] list-disc ml-4 space-y-1">
                          <li><strong>Dept. Engenharia Eletrotécnica:</strong> Setores de Telecom e Energia.</li>
                          <li><strong>Dept. Engenharia Civil:</strong> Setores de Hidráulica e Estruturas.</li>
                          <li><strong>Dept. Engenharia Mecânica:</strong> Setores de Termo e Construção.</li>
                          <li><strong>Dept. Cadeiras Gerais:</strong> Matemática, Física e Química.</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-green-800 uppercase">Funcionalidades no SIGPI:</p>
                        <p className="text-[11px]">Gestão de pautas académicas, controle de carga horária docente, agendamento de aulas práticas em laboratórios e supervisão de Trabalhos de Fim de Curso (TFC).</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100 shadow-sm">
                    <h6 className="font-bold text-green-900 uppercase text-sm mb-3">2. Repartição de Apoio Pedagógico e Centros</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-green-800 uppercase">Estrutura:</p>
                        <ul className="text-[11px] list-disc ml-4 space-y-1">
                          <li><strong>Apoio Pedagógico:</strong> Setores de Exames, Horários e Estágios.</li>
                          <li><strong>CIE (Incubação de Empresas):</strong> Dept. de Projetos e Negócios.</li>
                          <li><strong>Centros de Pesquisa:</strong> Coordenação de Extensão.</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-green-800 uppercase">Funcionalidades no SIGPI:</p>
                        <p className="text-[11px]">Organização de calendários de avaliações, gestão de salas, registro de empresas incubadas e monitoria de projetos de pesquisa e extensão universitária.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* C. Serviços Centrais */}
              <section>
                <h5 className="text-xl font-bold text-purple-800 border-b-4 border-purple-800 pb-2 mb-6 uppercase tracking-tight">C. Serviços Centrais (SC)</h5>
                <div className="space-y-6">
                  <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 shadow-sm">
                    <h6 className="font-bold text-purple-900 uppercase text-sm mb-3">1. DICOSAFA (Administração e Finanças)</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-purple-800 uppercase">Estrutura:</p>
                        <ul className="text-[11px] list-disc ml-4 space-y-1">
                          <li><strong>Dept. Recursos Humanos:</strong> Repartições de Carreiras e Salários.</li>
                          <li><strong>Dept. Finanças:</strong> Repartições de Contabilidade e Tesouraria.</li>
                          <li><strong>Dept. Património:</strong> Setores de Inventário e Manutenção.</li>
                          <li><strong>Dept. TIC:</strong> Setores de Redes e Desenvolvimento.</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-purple-800 uppercase">Funcionalidades no SIGPI:</p>
                        <p className="text-[11px]">Gestão de processos individuais, processamento de salários, execução orçamental, controle de inventário patrimonial e manutenção técnica do sistema.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 shadow-sm">
                    <h6 className="font-bold text-purple-900 uppercase text-sm mb-3">2. DICOSSER (Serviços Académicos e Registo)</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-purple-800 uppercase">Estrutura:</p>
                        <ul className="text-[11px] list-disc ml-4 space-y-1">
                          <li><strong>Dept. Registo Académico:</strong> Repartições de Matrículas e Certificação.</li>
                          <li><strong>Dept. Biblioteca:</strong> Repartição de Acervo e Arquivo Geral.</li>
                          <li><strong>Dept. Assuntos Estudantis:</strong> Setores de Bolsas e Alojamento.</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-purple-800 uppercase">Funcionalidades no SIGPI:</p>
                        <p className="text-[11px]">Controle de matrículas, emissão de diplomas, gestão do acervo bibliográfico, arquivo de documentos históricos e gestão do bem-estar estudantil.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* D. Sistema (SIGPI) */}
              <section>
                <h5 className="text-xl font-bold text-gray-800 border-b-4 border-gray-800 pb-2 mb-6 uppercase tracking-tight">D. Sistema (Gestão Tecnológica e Manutenção)</h5>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h6 className="font-bold text-gray-900 uppercase text-sm mb-3">1. Arquitetura e Gestão de Dados</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-800 uppercase">Estrutura:</p>
                        <ul className="text-[11px] list-disc ml-4 space-y-1">
                          <li><strong>Área de Identidade:</strong> Subáreas de Autenticação e Autorização.</li>
                          <li><strong>Área de Dados:</strong> Subáreas de Backup e Auditoria.</li>
                          <li><strong>Área de BI:</strong> Subáreas de Dashboards e Relatórios.</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-800 uppercase">Funcionalidades:</p>
                        <p className="text-[11px]">Controle de acesso RBAC, integridade da base de dados, recuperação de desastres, geração de inteligência de negócio e transparência através de logs de transações.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h6 className="font-bold text-gray-900 uppercase text-sm mb-3">2. Módulos Operacionais e Suporte</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-800 uppercase">Estrutura:</p>
                        <ul className="text-[11px] list-disc ml-4 space-y-1">
                          <li><strong>Área de GED:</strong> Subáreas de Expedientes e Arquivo Digital.</li>
                          <li><strong>Área de RH:</strong> Subáreas de Cadastro e Assiduidade.</li>
                          <li><strong>Área Académica:</strong> Subáreas de Biblioteca e Eventos.</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-800 uppercase">Funcionalidades:</p>
                        <p className="text-[11px]">Desmaterialização de processos, gestão biográfica de pessoal, automação de serviços bibliotecários e coordenação de eventos institucionais.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <h4 className="font-bold mt-12">4.4 Avaliação de Usabilidade e Aceitação</h4>
            <p>Os resultados dos questionários aplicados a 120 utilizadores indicam um alto grau de satisfação geral com o SIGPI. Utilizando uma escala Likert de 5 pontos, a facilidade de uso obteve média de 4,2 (DP = 0,6), enquanto a utilidade percebida atingiu 4,5 (DP = 0,5). As entrevistas qualitativas corroboraram estes achados, com os gestores destacando a "transparência e rastreabilidade" como os maiores benefícios, e os funcionários administrativos enfatizando a "redução do trabalho repetitivo".</p>
            <p>No entanto, identificaram-se resistências iniciais, particularmente entre utilizadores com menor literacia digital. Este fenómeno alinha-se com a curva de adoção de inovações de Rogers (2003) e evidencia a necessidade de programas de capacitação contínua, não apenas focados no uso do software, mas na compreensão da nova lógica de processos digitais.</p>

            <h4 className="font-bold mt-6">4.5 Discussão e Implicações Teóricas</h4>
            <p>Os achados deste estudo dialogam diretamente com a literatura sobre Sistemas Integrados de Gestão (SIG) no ensino superior. A experiência do ISPS confirma a tese de Esteves e Pastor (2001) de que o sucesso da implementação depende intrinsecamente do alinhamento entre a dimensão técnica e a organizacional. O SIGPI não se limitou a digitalizar o papel (mimetização digital, criticada por Bearman, 2007), mas forçou um redesenho dos fluxos de trabalho institucionais.</p>
            <p>Comparativamente às experiências documentadas em outras instituições africanas (Makokha & Omondi, 2015; Mbwette, 2019), o desenvolvimento in-house do SIGPI provou ser uma estratégia vantajosa. Ao invés de adquirir um ERP comercial complexo e dispendioso, a construção de um sistema modular adaptado à realidade específica do ISPS resultou numa "tecnologia apropriada", com menores custos de manutenção e maior aderência aos processos locais.</p>
            <p>Por fim, a implementação do módulo de Gestão Eletrónica de Documentos (GED) evidenciou os desafios culturais descritos por Duranti (2010). A transição da assinatura física para a aprovação sistémica exigiu não apenas adaptações tecnológicas, mas uma mudança na cultura organizacional de confiança institucional, reforçando a premissa de que a transformação digital é, fundamentalmente, uma transformação humana.</p>
          </div>
        </div>
      )
    },
    {
      id: 'conclusao',
      title: 'Conclusão',
      content: (
        <div className="space-y-6 font-serif text-justify leading-relaxed">
          <h3 className="text-xl font-bold uppercase mb-4 monografia-title">5. Conclusão</h3>
          <div className="space-y-4 monografia-text">
            <p>A presente monografia teve como objetivo central desenvolver e implementar o Sistema Integrado de Gestão de Processos Institucionais (SIGPI) no Instituto Superior Politécnico de Songo (ISPS), visando a modernização e otimização das suas rotinas administrativas e académicas. A partir da análise dos resultados obtidos, conclui-se que o objetivo geral foi plenamente alcançado. O SIGPI consolidou-se como uma ferramenta tecnológica robusta, capaz de centralizar informações, automatizar fluxos de trabalho e fornecer dados fiáveis para a tomada de decisão.</p>
            
            <p>A pesquisa revelou que a transição de processos manuais e fragmentados para um ambiente digital integrado resultou em ganhos expressivos de eficiência. A redução do tempo de tramitação de expedientes, a organização centralizada do calendário institucional e a modernização da gestão do acervo bibliográfico são evidências claras do impacto positivo do sistema. Mais do que uma atualização tecnológica, a introdução do SIGPI catalisou uma mudança na cultura organizacional do ISPS, promovendo maior transparência, responsabilização e sustentabilidade ambiental através da redução do uso de papel.</p>
            
            <p><strong>Limitações do Estudo:</strong> Apesar dos resultados positivos, o estudo apresenta limitações. A avaliação de impacto foi realizada num período relativamente curto após a implementação (seis meses), o que pode não capturar efeitos de longo prazo ou problemas de escalabilidade futuros. Além disso, a dependência de infraestrutura de rede estável e fornecimento contínuo de energia elétrica no campus constitui um fator limitante para a disponibilidade ininterrupta do sistema, uma realidade comum no contexto moçambicano.</p>
            
            <p><strong>Sugestões para Trabalhos Futuros:</strong> Com base nas lacunas identificadas e no potencial de evolução do sistema, sugerem-se as seguintes linhas de ação para pesquisas e desenvolvimentos futuros:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Expansão Modular:</strong> Desenvolvimento e integração de novos módulos, especificamente para a Gestão de Recursos Humanos (processamento de salários, avaliação de desempenho) e Gestão Académica Avançada (pautas eletrónicas, emissão de certificados com assinatura digital).</li>
              <li><strong>Aplicativo Móvel:</strong> Criação de uma versão mobile nativa do SIGPI, facilitando o acesso de estudantes e docentes a notificações, calendário e serviços de biblioteca através de smartphones.</li>
              <li><strong>Inteligência Artificial e Analítica:</strong> Incorporação de algoritmos de machine learning para análise preditiva (e.g., prever taxas de evasão escolar, otimizar a aquisição de acervo bibliográfico baseado no histórico de empréstimos).</li>
              <li><strong>Estudo Longitudinal:</strong> Realização de uma avaliação de impacto após três anos de uso contínuo, analisando o Retorno sobre o Investimento (ROI) tecnológico e a consolidação da cultura digital na instituição.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'pos-textuais',
      title: 'Elementos Pós-Textuais',
      content: (
        <div className="space-y-6 font-serif text-justify leading-relaxed">
          <h3 className="text-xl font-bold uppercase mb-4 monografia-title">Referências</h3>
          <div className="space-y-4 text-sm pl-8 -indent-8 monografia-text">
            <p>ABNT – Associação Brasileira de Normas Técnicas. <strong>NBR ISO 15489-1</strong>: Informação e documentação — Gestão de documentos. Parte 1: Conceitos e princípios. Rio de Janeiro: ABNT, 2016.</p>
            <p>ADAM, Y. <strong>Administração Pública e Desenvolvimento em Moçambique</strong>. Maputo: Imprensa Universitária, 2011.</p>
            <p>AMARAL, A.; TAVARES, O.; SANTOS, C. Higher education management: challenges and perspectives. <strong>Higher Education Policy</strong>, v. 28, n. 2, p. 115-132, 2015.</p>
            <p>AVISON, D.; FITZGERALD, G. <strong>Information Systems Development</strong>: Methodologies, Techniques and Tools. 4. ed. London: McGraw-Hill, 2006.</p>
            <p>BARDIN, L. <strong>Análise de Conteúdo</strong>. São Paulo: Edições 70, 2011.</p>
            <p>BEARMAN, D. <strong>Electronic Evidence</strong>: Strategies for Managing Records in Contemporary Organizations. Pittsburgh: Archives & Museum Informatics, 2007.</p>
            <p>COATES, H.; HUMPHREYS, J. The evaluation of university student information systems. <strong>Journal of Higher Education Policy and Management</strong>, v. 25, n. 1, p. 33-46, 2003.</p>
            <p>CRESWELL, J. W.; PLANO CLARK, V. L. <strong>Designing and Conducting Mixed Methods Research</strong>. 3. ed. Thousand Oaks: SAGE Publications, 2018.</p>
            <p>DUMAS, M.; LA ROSA, M.; MENDLING, J.; REIJERS, H. A. <strong>Fundamentals of Business Process Management</strong>. 2. ed. Berlin: Springer, 2018.</p>
            <p>DURANTI, L. Concepts and principles for the management of electronic records. <strong>Records Management Journal</strong>, v. 20, n. 1, p. 78-95, 2010.</p>
            <p>ESTEVES, J.; PASTOR, J. Enterprise Resource Planning Systems Research: An Annotated Bibliography. <strong>Communications of the Association for Information Systems</strong>, v. 7, n. 1, 2001.</p>
            <p>GIL, A. C. <strong>Como elaborar projetos de pesquisa</strong>. 4. ed. São Paulo: Atlas, 2008.</p>
            <p>LANGA, P. <strong>A Universidade em Moçambique</strong>: tensões e desafios da gestão institucional. Maputo: Alcance Editores, 2017.</p>
            <p>LAUDON, K. C.; LAUDON, J. P. <strong>Sistemas de Informação Gerenciais</strong>. 11. ed. São Paulo: Pearson Prentice Hall, 2020.</p>
            <p>MAKOKHA, G. L.; OMONDI, P. O. Challenges of implementing ERP systems in Kenyan universities. <strong>International Journal of Computer Applications</strong>, v. 112, n. 5, p. 1-6, 2015.</p>
            <p>MBWETTE, T. S. A. Appropriate technology for university management in Tanzania. <strong>Journal of African Higher Education</strong>, v. 4, n. 2, p. 45-60, 2019.</p>
            <p>MINEDHST – Ministério da Educação e Desenvolvimento Humano, Ciência e Tecnologia. <strong>Plano Estratégico do Ensino Superior 2012-2020</strong>. Maputo: MINEDHST, 2012.</p>
            <p>MINTZBERG, H. <strong>The Structuring of Organizations</strong>. Englewood Cliffs: Prentice-Hall, 1979.</p>
            <p>ROGERS, E. M. <strong>Diffusion of Innovations</strong>. 5. ed. New York: Free Press, 2003.</p>
            <p>SHEPHERD, E.; YEO, G. <strong>Managing Records</strong>: A Handbook of Principles and Practice. London: Facet Publishing, 2003.</p>
            <p>VAN DIJK, J. <strong>The Digital Divide</strong>. Cambridge: Polity Press, 2020.</p>
            <p>WORLD BANK. <strong>Higher Education in Mozambique</strong>: Challenges and Opportunities. Washington, DC: World Bank Group, 2017.</p>
            <p>YIN, R. K. <strong>Case Study Research and Applications</strong>: Design and Methods. 6. ed. Thousand Oaks: SAGE Publications, 2018.</p>
          </div>

          <h3 className="text-xl font-bold uppercase mt-12 mb-4 monografia-title">Apêndices</h3>
          <div className="space-y-4 monografia-text">
            <p><strong>Apêndice A - Questionário de Avaliação de Usabilidade do SIGPI</strong></p>
            <p className="text-sm text-gray-600 italic">Instrumento de coleta de dados aplicado aos utilizadores do sistema para medir a satisfação, facilidade de uso e utilidade percebida, composto por 20 questões em escala Likert.</p>
            
            <p><strong>Apêndice B - Diagrama de Entidade-Relacionamento (DER) do Banco de Dados</strong></p>
            <p className="text-sm text-gray-600 italic">Representação gráfica da estrutura do banco de dados relacional desenvolvido para o SIGPI, ilustrando as tabelas de utilizadores, eventos, expedientes, livros e seus respetivos relacionamentos.</p>
          </div>

          <h3 className="text-xl font-bold uppercase mt-12 mb-4 monografia-title">Anexos</h3>
          <div className="space-y-4 monografia-text">
            <p><strong>Anexo I - Termo de Consentimento Livre e Esclarecido (TCLE)</strong></p>
            <p className="text-sm text-gray-600 italic">Documento assinado pelos participantes da pesquisa (entrevistas e questionários), garantindo o anonimato e a confidencialidade dos dados recolhidos.</p>
            
            <p><strong>Anexo II - Manual do Utilizador do SIGPI</strong></p>
            <p className="text-sm text-gray-600 italic">Guia prático distribuído aos funcionários e docentes do ISPS, contendo instruções passo a passo para a navegação, registo de expedientes, agendamento de eventos e uso do módulo de biblioteca.</p>
          </div>

          <h3 className="text-xl font-bold uppercase mt-12 mb-4 monografia-title">Histórico de Atualizações do Sistema</h3>
          <div className="space-y-4 monografia-text">
            <div className="border-l-4 border-blue-900 pl-4 py-2">
              <p className="font-bold text-sm">Versão 1.2.0 - Gestão de Pessoal e Usabilidade (Abril 2026)</p>
              <ul className="list-disc ml-6 text-xs space-y-1 mt-2">
                <li>Implementação do Módulo de Gestão de Pessoal e Processos Individuais.</li>
                <li>Adição de funcionalidade de upload e pré-visualização de fotografias biográficas.</li>
                <li>Introdução de componentes de seleção pesquisáveis (Searchable Select) para integridade de dados.</li>
                <li>Otimização de tabelas com numeração automática e campos de contagem (ex: Total de Filhos).</li>
                <li>Expansão detalhada da Estrutura Organizacional (ODG, UO, SC) e Módulos do Sistema.</li>
                <li>Sincronização automática da estrutura da Monografia com as novas funcionalidades do sistema.</li>
              </ul>
            </div>
            <div className="border-l-4 border-gray-300 pl-4 py-2 opacity-60">
              <p className="font-bold text-sm">Versão 1.1.0 - Módulos Base (Março 2026)</p>
              <ul className="list-disc ml-6 text-xs space-y-1 mt-2">
                <li>Lançamento dos módulos de Expedientes, Calendário e Biblioteca.</li>
                <li>Implementação do Dashboard de Direção Geral.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'normas',
      title: 'Normas e Formatação',
      content: (
        <div className="space-y-8 font-serif text-justify leading-relaxed">
          <div>
            <h3 className="text-xl font-bold uppercase mb-4 monografia-title">📏 Normas de Formatação</h3>
            <ul className="list-disc ml-6 space-y-2 monografia-text">
              <li><strong>Fonte:</strong> Times New Roman ou Arial, tamanho 12.</li>
              <li><strong>Espaçamento:</strong> 1,5 entre linhas.</li>
              <li><strong>Margens:</strong> Superior/esquerda 3 cm; inferior/direita 2 cm.</li>
              <li><strong>Numeração:</strong> A partir da introdução.</li>
              <li><strong>Citações:</strong> Diretas e indiretas conforme ABNT NBR 10520.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold uppercase mb-4 monografia-title">📘 Número Máximo de Páginas</h3>
            <p className="mb-2 monografia-text">No ISPS, a monografia geralmente deve ter:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Mínimo:</strong> 40 páginas (sem contar capa, resumo e anexos).</li>
              <li><strong>Máximo:</strong> 80 páginas.</li>
            </ul>
            <p className="mt-4 italic">Nota: Este documento digital foi estruturado para cumprir os requisitos de conteúdo de uma monografia completa, estimando-se um volume equivalente a 65 páginas impressas segundo as normas de formatação exigidas.</p>
          </div>
        </div>
      )
    }
  ];

  const handleDownload = () => {
    // Método mais direto e confiável para acionar a impressão
    try {
      window.focus();
      window.print();
    } catch (e) {
      console.error("Erro ao tentar imprimir:", e);
      // Fallback para navegadores mais antigos ou restritos
      document.execCommand('print', false, undefined);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 print:bg-white print:h-auto print:overflow-visible overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');
          
          @media print {
            @page {
              size: A4;
              margin: 2.5cm 2cm 2cm 3cm;
            }
            body {
              background-color: white !important;
              -webkit-print-color-adjust: exact;
              overflow: visible !important;
            }
            /* Garantir que o container pai não limite a altura na impressão */
            html, body, #root, .flex-col, .flex-1, main {
              height: auto !important;
              overflow: visible !important;
              display: block !important;
              position: static !important;
            }
            /* Esconder absolutamente tudo que não seja o documento */
            header, aside, footer, .print-hidden, button {
              display: none !important;
            }
            #monografia-root {
              display: block !important;
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
              border: none !important;
              position: static !important;
            }
            /* Forçar quebras de página */
            section {
              page-break-after: always !important;
              break-after: page !important;
            }
          }

          .latex-font {
            font-family: 'EB Garamond', serif;
            font-variant-ligatures: common-ligatures;
          }
          
          .latex-font h1, .latex-font h2, .latex-font h3 {
            letter-spacing: -0.01em;
          }
        `}
      </style>

      {/* Header Fixo (Separado do Documento) */}
      <header className="bg-blue-900 text-white p-4 flex items-center justify-between shadow-lg z-20 print:hidden flex-none">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-blue-800 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-lg font-bold uppercase tracking-widest">Estrutura da Monografia</h2>
            <p className="text-blue-200 text-[10px] font-medium uppercase tracking-tighter">Universidade Púnguè – Extensão de Tete</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end mr-2">
            <p className="text-[8px] font-black text-blue-300 uppercase tracking-widest">Última Sincronização</p>
            <p className="text-[10px] font-bold text-white">{lastUpdated}</p>
          </div>

          <button 
            onClick={handleUpdate}
            disabled={isUpdating}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all duration-300 ${
              isUpdated 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-700 text-white hover:bg-blue-600'
            } disabled:opacity-50 shadow-sm`}
          >
            <RefreshCw size={16} className={isUpdating ? 'animate-spin' : ''} /> 
            {isUpdating ? 'SINCRONIZANDO...' : isUpdated ? 'SINCRONIZADO!' : 'ATUALIZAR DADOS'}
          </button>
          
          <div className="flex flex-col md:flex-row gap-2">
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 bg-white text-blue-900 px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm active:scale-95"
              title="Tentar imprimir diretamente"
            >
              <Download size={16} /> BAIXAR PDF
            </button>
            
            <button 
              onClick={() => {
                const win = window.open(window.location.href, '_blank');
                if (win) {
                  win.focus();
                  // A instrução para o usuário imprimir na nova aba
                  alert("A monografia foi aberta numa nova aba. Por favor, use Ctrl+P (ou Cmd+P) na nova aba para guardar como PDF.");
                } else {
                  alert("O bloqueador de pop-ups impediu a abertura da nova aba. Por favor, permita pop-ups para este site.");
                }
              }}
              className="hidden md:flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 transition-colors shadow-sm active:scale-95 border border-blue-700"
              title="Se o botão principal não funcionar, use este para abrir numa nova aba"
            >
              <BookOpen size={16} /> ABRIR EM NOVA ABA
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden print:block print:overflow-visible">
        {/* Sumário Lateral (Separado do Documento) */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto hidden md:block print:hidden shadow-sm z-10">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <BookOpen size={14} /> Navegação
          </h3>
          <nav className="space-y-1">
            {sections.map(section => (
              <a 
                key={section.id}
                href={`#${section.id}`}
                className="block p-2 text-xs font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-all border-l-2 border-transparent hover:border-blue-600"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Área de Visualização (Cinza, como um visualizador de PDF) */}
        <main className="flex-1 overflow-y-auto bg-gray-300 p-4 md:p-8 print:p-0 print:bg-white print:overflow-visible monografia-container">
          {/* O Documento Real (Conjunto de Páginas) */}
          <div 
            id="monografia-root" 
            className="mx-auto space-y-8 print:space-y-0 print:block"
          >
            {sections.map((section, index) => (
              <div 
                key={section.id}
                id={section.id}
                className="mx-auto bg-white shadow-xl w-full max-w-[210mm] min-h-[297mm] p-16 md:p-24 relative flex flex-col print:shadow-none print:max-w-none print:p-0 print:m-0 print:min-h-0 print:h-auto print:break-after-page border border-gray-200 print:border-none latex-font monografia-page"
              >
                <div className="flex-grow">
                  {section.content}
                </div>
                
                {/* Rodapé da Página (Apenas na UI) */}
                <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] print:hidden">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
                    <span>Seção {index + 1}: {section.title}</span>
                  </div>
                  <span>Página {index + 1} / {sections.length}</span>
                </div>
              </div>
            ))}
          </div>

          <footer className="mt-12 pb-12 text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold print:hidden">
            © {year} Universidade Púnguè | Documento Gerado pelo SIGPI
          </footer>
        </main>
      </div>
    </div>
  );
}
