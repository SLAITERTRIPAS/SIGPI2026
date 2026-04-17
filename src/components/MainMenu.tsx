import React, { useMemo } from 'react';
import { LayoutGrid, Building2, Briefcase, Settings, User, Maximize2, LogOut, ArrowLeft, FileText } from 'lucide-react';

export default function MainMenu({ 
  user,
  onNavigate, 
  onShowAlert, 
  onBack, 
  onLogout,
  onGestaoDocumentos
}: { 
  user?: any,
  onNavigate: (title: string, items: { title: string, subItems?: { title: string, accessible?: boolean }[], accessible?: boolean }[]) => void, 
  onShowAlert: (msg: string) => void, 
  onBack: () => void, 
  onLogout: () => void,
  onGestaoDocumentos?: () => void
}) {
  const baseMenuItems = [
    { 
      title: 'Órgãos de Direção e Gestão', 
      icon: LayoutGrid, 
      color: 'bg-blue-900',
      items: [
        { 
          title: 'DIRETOR-GERAL', 
          subItems: [
            { title: 'Diretor-Geral' },
            { 
              title: 'Chefe do GDG',
              subItems: [
                { title: 'Plano do Departamento' },
                { title: 'Plano Individual' }
              ]
            },
            { title: 'Secretaria Executiva' },
            { 
              title: 'Departamento de Planificação, Estudos e Projetos',
              subItems: [
                { title: 'Chefe do DPEP' },
                { title: 'Repartição de Planificação' },
                { title: 'Repartição de Estatística' },
                { title: 'Repartição de Estudos e Projetos' },
                { title: 'Setor de Relatório' },
                { title: 'Setor de Monitoria' },
              ]
            },
            { title: 'Unidade Gestora e Executora de Aquisições' },
            { title: 'Departamento de Cooperação e Relações Exteriores' },
            { title: 'Departamento de Controlo Técnico e de Qualidade' },
            { title: 'Departamento Jurídico' },
          ]
        },
        { title: 'Conselho de Representantes' },
        { title: 'Conselho Administrativo e de Gestão' },
        { title: 'Conselho Técnico e de Qualidade' },
      ]
    },
    { 
      title: 'Unidades Orgânicas', 
      icon: Building2, 
      color: 'bg-red-800', 
      items: [
        { 
          title: 'Divisão de Engenharia',
          subItems: [
            { title: 'Diretor da Divisão de Engenharia' },
            { title: 'Diretor Adjunto Pedagógico' },
            { title: 'Departamento de Pesquisa e Extensão' },
            { 
              title: 'Departamento de Engenharia Eletrotécnica',
              subItems: [
                { title: 'Diretor do Curso de Engenharia Elétrica' },
                { title: 'Diretor do Curso de Engenharia Eletrónica e de Telecomunicações' },
                { title: 'Diretor do Curso de Engenharia de Energias Renováveis' }
              ]
            },
            { 
              title: 'Departamento de Engenharia de Construção Civil',
              subItems: [
                { title: 'Diretor do Curso de Engenharia de Construção Civil' },
                { title: 'Diretor do Curso de Engenharia Hidráulica' }
              ]
            },
            { 
              title: 'Departamento de Engenharia de Construção Mecânica',
              subItems: [
                { title: 'Diretor do Curso de Engenharia de Construção Mecânica' },
                { title: 'Diretor do Curso de Engenharia Termotécnica' }
              ]
            },
            { title: 'Departamento de Disciplinas Gerais' },
            { title: 'Departamento Técnico e de Apoio' }
          ]
        },
        { 
          title: 'Centro de Incubação de Empresas',
          subItems: [
            { title: 'Diretor do CIE' },
            { title: 'Departamento de C. E. P. E. A. Fundos' },
            { title: 'Departamento de P. O. Negócios e Emprego' },
            { title: 'Departamento de PGNDE' }
          ]
        },
        { title: 'Centros' }
      ] 
    },
    { 
      title: 'Serviços Centrais', 
      icon: Briefcase, 
      color: 'bg-gray-600', 
      items: [
        { 
          title: 'Direção de Coordenação de Serviços de Administração e Finanças (DICOSAFA)',
          subItems: [
            { title: 'Diretor da DICOSAFA' },
            { 
              title: 'Departamento de Recursos Humanos',
              subItems: [
                { title: 'Chefe do RH' },
                { title: 'Repartição de Pessoal' },
                { title: 'Gestão de Colaboradores' },
                { title: 'Repartição de Formação' },
                { title: 'Repartição de Apoio Social' }
              ]
            },
            { 
              title: 'Departamento de Finanças',
              subItems: [
                { title: 'Chefe de Finanças' },
                { title: 'Repartição de Plano e Orçamento' },
                { title: 'Repartição de Tesouraria' },
                { title: 'Setor de Estatística' }
              ]
            },
            { 
              title: 'Departamento de Património',
              subItems: [
                { title: 'Chefe de DP' },
                { title: 'E-Património' },
                { title: 'Repartição de Infraestrutura' },
                { title: 'Repartição de Transporte' },
                { title: 'Repartição de Manutenção' },
                { title: 'Repartição de Limpeza e Segurança' }
              ]
            },
            { 
              title: 'Secretaria Geral',
              subItems: [
                { title: 'Chefe da SG' },
                { title: 'Secretaria' },
                { title: 'SIC' }
              ]
            },
            { 
              title: 'Departamento TIC',
              subItems: [
                { title: 'Chefe de DTIC' },
                { title: 'Setor de Rede de Computadores' },
                { title: 'Setor de Manutenção' },
                { title: 'Reprografia' },
                { title: 'Oficina de TIC' }
              ]
            },
            { 
              title: 'Departamento Lar de Estudantes',
              subItems: [
                { title: 'Chefe de DLA' },
                { title: 'Repartição de Alojamento' },
                { title: 'Repartição de Eventos' },
                { title: 'Economato' }
              ]
            },
            { 
              title: 'Departamento de Produção Alimentar',
              subItems: [
                { title: 'Chefe de DPA' },
                { title: 'Repartição de Produção Animal' },
                { title: 'Repartição de Produção Vegetal' },
                { title: 'Armazém de Thaka' }
              ]
            }
          ]
        },
        { 
          title: 'Direção de Coordenação de Serviços Académicos e Registo (DICOSSER)',
          subItems: [
            { title: 'Diretor da DICOSSER' },
            { 
              title: 'Departamento de Registo Académico',
              subItems: [
                { title: 'Chefe do DRA' },
                { title: 'Atendimento Estudantil' },
                { title: 'Repartição de Certificação' },
                { title: 'Repartição de Exames de Admissão' },
                { title: 'Repartição de Matrículas' }
              ]
            },
            { 
              title: 'Departamento de Assuntos Estudantis',
              subItems: [
                { title: 'Chefe do DAE' },
                { title: 'Atendimento estudantil' },
                { title: 'Repartição de Bolsa de Estudos' },
                { title: 'Repartição de Desporto e Recriação' }
              ]
            },
            { 
              title: 'Departamento de Biblioteca',
              subItems: [
                { title: 'Chefe de DBA' },
                { 
                  title: 'Biblioteca',
                  subItems: [
                    { 
                      title: 'Atendimento Estudantil',
                      subItems: [
                        { title: 'Registos de Visitantes' },
                        { title: 'Registo de Obras e Livros' }
                      ]
                    },
                    { title: 'Gestão de Biblioteca' }
                  ]
                },
                { title: 'Repartição de Documentos' },
                { title: 'Repartição de Arquivo' }
              ]
            }
          ]
        }
      ] 
    },
    { title: 'Sistema', icon: Settings, color: 'bg-black', items: [] },
  ];

  const menuItems = useMemo(() => {
    const n = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

    const isMatch = (str1: string, str2: string) => {
      const norm1 = n(str1);
      const norm2 = n(str2);
      return norm1 === norm2 || norm1.includes(norm2) || norm2.includes(norm1);
    };

    const setAllAccessible = (node: any): any => ({
      ...node,
      accessible: true,
      items: node.items?.map(setAllAccessible),
      subItems: node.subItems?.map(setAllAccessible)
    });

    if (!user || user.name === 'Administrador Sistema') {
      return baseMenuItems.map(setAllAccessible);
    }

    const userTokens = [
      n(user.name),
      n(user.departamento || ''),
      n(user.direcao || '')
    ].filter(Boolean);

    const isBoss = user.name.toLowerCase().includes('chefe') || 
                   user.name.toLowerCase().includes('diretor') ||
                   user.name.toLowerCase().includes('secretaria executiva');

    const markMatches = (node: any): any => {
      const titleNode = n(node.title);
      let matchSource = false;
      let isBossHere = false;

      const isDirectMatch = userTokens.some(t => {
        if (isMatch(t, titleNode)) return true;
        return false;
      });

      if (isDirectMatch) {
        matchSource = true;
        if (isBoss && isMatch(titleNode, n(user.departamento || ''))) isBossHere = true;
        if (titleNode.includes('dicossa') && n(user.name) === 'diretordadicosafa') isBossHere = true;
        if (titleNode.includes('dicosser') && n(user.name) === 'diretordadicosser') isBossHere = true;
        if (titleNode === 'divisaodeengenharia' && n(user.name).includes('diretor')) isBossHere = true;
        if (titleNode.includes('secretariageral') && n(user.name).includes('chefe')) isBossHere = true;
      }

      let hasMatchedDescendant = false;
      let newItems = [];
      if (node.items) {
        newItems = node.items.map((c: any) => markMatches(c));
        if (newItems.some((c: any) => c.isDirectMatch || c.hasMatchedDescendant)) hasMatchedDescendant = true;
      }
      let newSubItems = [];
      if (node.subItems) {
        newSubItems = node.subItems.map((c: any) => markMatches(c));
        if (newSubItems.some((c: any) => c.isDirectMatch || c.hasMatchedDescendant)) hasMatchedDescendant = true;
      }

      return {
        ...node,
        items: newItems.length ? newItems : undefined,
        subItems: newSubItems.length ? newSubItems : undefined,
        isDirectMatch: matchSource,
        isBossHere,
        hasMatchedDescendant
      };
    };

    const setPermissions = (node: any, isBossAncestor: boolean, depth: number): any => {
      let isBoss = isBossAncestor || node.isBossHere;
      let isMatchedDirecao = depth === 1 && (node.isDirectMatch || node.hasMatchedDescendant);
      
      let visible = true;
      if (depth === 1) visible = isMatchedDirecao;

      let accessible = isBoss || node.isDirectMatch || node.hasMatchedDescendant;

      const mapChildren = (children?: any[]) => {
        if (!children) return undefined;
        const mapped = children
          .map(c => setPermissions(c, isBoss, depth + 1))
          .filter(c => c.visible);
        return mapped.length ? mapped : undefined;
      };

      return {
        title: node.title,
        icon: node.icon,
        color: node.color,
        accessible,
        visible,
        items: mapChildren(node.items),
        subItems: mapChildren(node.subItems)
      };
    };

    const treeWithMatches = baseMenuItems.map(markMatches);
    return treeWithMatches.map(n => setPermissions(n, false, 0));
  }, [user]);

  const [hasAutoNavigated, setHasAutoNavigated] = React.useState(false);

  React.useEffect(() => {
    if (!user || user.name === 'Administrador Sistema' || hasAutoNavigated) return;

    let targetDirecao = null;
    let targetGroup = null;

    // Look for the specific Direcao (depth = 1) that is matched/accessible
    for (const g of menuItems) {
      if (g.items) {
        for (const d of g.items) {
          if (d.accessible && d.visible !== false) {
            targetDirecao = d;
            targetGroup = g;
            break;
          }
        }
      }
      if (targetDirecao) break;
    }

    if (targetDirecao) {
      setHasAutoNavigated(true);
      
      // Auto-navigate to the Direcao
      onNavigate(targetDirecao.title, targetDirecao.subItems?.map((i: any) => ({
        title: i.title,
        accessible: i.accessible,
        subItems: i.subItems?.map((s: any) => ({ title: s.title, accessible: s.accessible }))
      })) || []);
    }
  }, [user, menuItems, hasAutoNavigated, onNavigate]);

  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden">
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-none">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#6366f1] rounded-xl text-white shadow-sm">
              <LayoutGrid size={20} />
            </div>
            <h1 className="text-xl font-bold text-[#2563eb] font-serif">SIGPI</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <User size={14} className="text-gray-500" />
            <span className="text-xs font-bold text-gray-700">fttripas@gmail.com</span>
          </div>
          <button className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 transition-all">
            <Maximize2 size={18} />
          </button>
          <button 
            onClick={onLogout}
            className="p-2 bg-red-50 rounded-lg text-red-500 hover:bg-red-100 transition-all"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8 overflow-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-blue-900 mb-4 uppercase tracking-tighter font-serif">Menu Principal</h2>
          <p className="text-xl text-gray-500 font-medium font-serif italic">Selecione a área a que deseja aceder</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl mx-auto px-4">
            {[
              { title: 'Órgãos de Direção e Gestão', icon: LayoutGrid, color: 'bg-[#1e3a8a]', items: menuItems[0].items, accessible: menuItems[0].accessible },
              { title: 'Unidades Orgânicas', icon: Building2, color: 'bg-[#991b1b]', items: menuItems[1].items, accessible: menuItems[1].accessible },
              { title: 'Serviços Centrais', icon: Briefcase, color: 'bg-[#4b5563]', items: menuItems[2].items, accessible: menuItems[2].accessible },
              { title: 'Sistema', icon: Settings, color: 'bg-black', items: menuItems[3].items, accessible: menuItems[3].accessible },
            ].map((item: any, index) => (
              <button 
                key={index} 
                onClick={() => {
                  const hasAccessible = item.items?.some((i: any) => i.accessible) || item.accessible;
                if (!hasAccessible && user?.name !== 'Administrador Sistema') {
                  onShowAlert('Área não acessível ao seu perfil.');
                  return;
                }
                onNavigate(item.title, item.items?.map((i: any) => ({ 
                  title: i.title, 
                  accessible: i.accessible,
                  subItems: i.subItems?.map((s: any) => ({ title: s.title, accessible: s.accessible })) 
                })) || []);
              }}
              className={`${item.color} text-white p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-10 h-[32rem] shadow-2xl hover:scale-[1.02] transition-all duration-300 group ${(!item.items?.some((i: any) => i.accessible) && user?.name !== 'Administrador Sistema') ? 'opacity-50 grayscale cursor-not-allowed hover:scale-100' : ''}`}
            >
              <div className="p-6 bg-white/10 rounded-3xl group-hover:bg-white/20 transition-colors">
                <item.icon size={80} strokeWidth={1.5} />
              </div>
              <span className="text-3xl font-black text-center leading-tight font-serif uppercase tracking-tight">{item.title}</span>
            </button>
          ))}
        </div>
      </main>

      <footer className="flex-none bg-[#1e3a8a] text-white text-center py-6 text-sm font-medium tracking-wide">
        Desenvolvido por fttripas - 2025-2026 | @todos os direitos reservados
      </footer>
    </div>
  );
}
