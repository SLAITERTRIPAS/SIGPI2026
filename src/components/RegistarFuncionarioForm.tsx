import React, { useState } from 'react';
import { UserPlus, Calendar, CreditCard, FileText, Building, BookOpen, GraduationCap } from 'lucide-react';

const PROVINCIAS_DISTRITOS: Record<string, string[]> = {
  'Maputo Cidade': ['KaMpfumo', 'Nlhamankulu', 'KaMaxakeni', 'KaMavota', 'KaMubukwana', 'KaTembe', 'KaNyaka'],
  'Maputo': ['Boane', 'Magude', 'Manhiça', 'Marracuene', 'Matola', 'Matutuíne', 'Moamba', 'Namaacha'],
  'Gaza': ['Bilene', 'Chibuto', 'Chicualacuala', 'Chigubo', 'Chókwè', 'Chonguene', 'Guijá', 'Limpopo', 'Mabalane', 'Macia', 'Mandlakazi', 'Mapai', 'Massangena', 'Massingir', 'Xai-Xai'],
  'Inhambane': ['Funhalouro', 'Govuro', 'Homoíne', 'Inhambane', 'Inharrime', 'Inhassoro', 'Jangamo', 'Mabote', 'Massinga', 'Maxixe', 'Morrumbene', 'Panda', 'Vilankulo', 'Zavala'],
  'Sofala': ['Beira', 'Búzi', 'Caia', 'Chemba', 'Cheringoma', 'Chibabava', 'Dondo', 'Gorongosa', 'Machanga', 'Maringué', 'Muanza', 'Nhamatanda'],
  'Manica': ['Bárue', 'Chimoio', 'Gondola', 'Guro', 'Macate', 'Machaze', 'Macossa', 'Manica', 'Mossurize', 'Sussundenga', 'Tambara', 'Vanduzi'],
  'Tete': ['Angónia', 'Cahora-Bassa', 'Changara', 'Chifunde', 'Chiúta', 'Dôa', 'Macanga', 'Magoé', 'Marávia', 'Moatize', 'Mutarara', 'Tete', 'Tsangano', 'Zumbo'],
  'Zambézia': ['Alto Molócuè', 'Chinde', 'Derre', 'Gilé', 'Gurué', 'Ile', 'Inhassunge', 'Luabo', 'Lugela', 'Maganja da Costa', 'Milange', 'Mocuba', 'Mocubela', 'Molumbo', 'Mopeia', 'Morrumbala', 'Mulevala', 'Namacurra', 'Namarroi', 'Nicoadala', 'Pebane', 'Quelimane'],
  'Nampula': ['Angoche', 'Eráti', 'Ilha de Moçambique', 'Lalaua', 'Larde', 'Liúpo', 'Macomia', 'Mecubúri', 'Memba', 'Mogincual', 'Mogovolas', 'Moma', 'Monapo', 'Mossuril', 'Muecate', 'Murrupula', 'Nacala-a-Velha', 'Nacala Porto', 'Nampula', 'Rapale', 'Ribáuè'],
  'Cabo Delgado': ['Ancuabe', 'Balama', 'Chiúre', 'Ibo', 'Macomia', 'Mecúfi', 'Meluco', 'Metuge', 'Mocímboa da Praia', 'Montepuez', 'Mueda', 'Muidumbe', 'Namuno', 'Nangade', 'Palma', 'Pemba', 'Quissanga'],
  'Niassa': ['Chimbonila', 'Cuamba', 'Lago', 'Lichinga', 'Majune', 'Mandimba', 'Marrupa', 'Maúa', 'Mavago', 'Mecanhelas', 'Mecula', 'Metarica', 'Muembe', 'N\'gauma', 'Nipepe', 'Sanga']
};

export default function RegistarFuncionarioForm({ onCancel }: { onCancel: () => void }) {
  const [genero, setGenero] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [provincia, setProvincia] = useState('');
  const [distrito, setDistrito] = useState('');

  const handleGeneroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenero = e.target.value;
    setGenero(selectedGenero);
    if (selectedGenero === 'M') {
      setNacionalidade('Moçambicano');
    } else if (selectedGenero === 'F') {
      setNacionalidade('Moçambicana');
    } else {
      setNacionalidade('');
    }
  };

  const handleProvinciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvincia(e.target.value);
    setDistrito('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-[90%] max-w-none mx-auto border border-gray-200">
      <div className="bg-blue-900 text-white p-6 flex items-center gap-4">
        <UserPlus size={32} />
        <div>
          <h2 className="text-2xl font-bold">Registo de Funcionário</h2>
          <p className="text-blue-100 text-sm">Preencha os dados abaixo para registar o colaborador no sistema.</p>
        </div>
      </div>
      
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-blue-900 mb-2">NOME COMPLETO</label>
            <input type="text" placeholder="Ex: António Manuel" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">GÉNERO</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={genero}
              onChange={handleGeneroChange}
            >
              <option value="">Selecione...</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">DATA DE NASCIMENTO</label>
            <input type="date" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>

          <div className="md:col-span-2">
            <h3 className="text-md font-bold text-gray-700 mb-4 border-b pb-2">Local de Nascimento</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">NACIONALIDADE</label>
                <input 
                  type="text" 
                  placeholder="Ex: Moçambicano" 
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50" 
                  value={nacionalidade}
                  onChange={(e) => setNacionalidade(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">NATURALIDADE (PROVÍNCIA)</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={provincia}
                  onChange={handleProvinciaChange}
                >
                  <option value="">Selecione...</option>
                  {Object.keys(PROVINCIAS_DISTRITOS).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">DISTRITO</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  disabled={!provincia}
                >
                  <option value="">Selecione...</option>
                  {provincia && PROVINCIAS_DISTRITOS[provincia]?.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">NUIT</label>
            <input type="text" placeholder="Ex: 123456789" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">NÚMERO DE BI / PASSAPORTE</label>
            <input type="text" placeholder="Ex: 123456789012A" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">NÍVEL ACADÉMICO</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option>Selecione o nível...</option>
              <option>Médio</option>
              <option>Licenciatura</option>
              <option>Mestrado</option>
              <option>Doutoramento</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">ÁREA DE FORMAÇÃO</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Selecione a área...</option>
              <optgroup label="Engenharias">
                <option>Engenharia Civil</option>
                <option>Engenharia Eletrotécnica</option>
                <option>Engenharia Mecânica</option>
                <option>Engenharia Informática</option>
                <option>Engenharia Química</option>
              </optgroup>
              <optgroup label="Ciências Exatas">
                <option>Matemática</option>
                <option>Física</option>
                <option>Química</option>
                <option>Estatística</option>
              </optgroup>
              <optgroup label="Pesquisa">
                <option>Metodologia de Pesquisa</option>
                <option>Análise de Dados</option>
                <option>Gestão de Projetos de Investigação</option>
              </optgroup>
              <optgroup label="Empreendedorismo">
                <option>Gestão de Negócios</option>
                <option>Inovação e Startups</option>
                <option>Marketing Digital</option>
                <option>Finanças</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">CATEGORIA</label>
            <input type="text" placeholder="Ex: Professor Auxiliar" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">TIPO DE CONTRATO</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Selecione...</option>
              <option>A Prazo Certo</option>
              <option>Por Tempo Indeterminado</option>
              <option>Prestação de Serviços</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-blue-900 mb-2">TIPO DE RELAÇÃO CONTRATUAL</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Selecione...</option>
              <option>Nomeação Definitiva</option>
              <option>Nomeação Provisória</option>
              <option>Contrato</option>
              <option>Comissão de Serviço</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">EMAIL</label>
            <input type="email" placeholder="exemplo@email.com" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-900 mb-2">DEPARTAMENTO / UNIDADE</label>
            <input type="text" placeholder="Ex: Recursos Humanos" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-blue-900 mb-2">ENQUADRAMENTO</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option>Docente</option>
              <option>Técnico</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button onClick={onCancel} className="px-6 py-3 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50">Cancelar</button>
          <button className="px-6 py-3 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 flex items-center gap-2">
            <UserPlus size={20} />
            Submeter o Registo
          </button>
        </div>

        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg flex items-start gap-3 text-orange-800 text-sm">
          <FileText className="flex-shrink-0" size={20} />
          <p><strong>Nota:</strong> O registo do docente será validado pela Direção Académica antes de ser incluído na alocação de horários.</p>
        </div>
      </div>
    </div>
  );
}
