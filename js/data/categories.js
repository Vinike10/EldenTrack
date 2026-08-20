/* ==========================================================================
   ELDENTRACK - CATEGORIES TAXONOMY
   ========================================================================== */

export const CATEGORIES = [
  {
    id: 'all',
    name: 'Todos os Segredos',
    icon: '✨',
    description: 'Catálogo unificado de armas, talismãs, magias, itens chave e chefes.',
    color: 'var(--gold-primary)'
  },
  {
    id: 'weapons',
    name: 'Armas & Escudos',
    icon: '⚔️',
    description: 'Espadas colossais, katanas, rapieiras, lanças, cajados e escudos lendários.',
    color: '#e63946',
    subcategories: ['Armas Lendárias', 'Katanas', 'Rapieiras & Estocadas', 'Espadas Colossais', 'Lanças & Hastes', 'Cajados & Selos', 'Escudos Grandes']
  },
  {
    id: 'talismans',
    name: 'Talismãs Lendários',
    icon: '💍',
    description: 'Acessórios lendários que amplificam atributos, reduzem consumo e concedem poderes únicos.',
    color: '#ff9d00',
    subcategories: ['Talismãs Lendários', 'Aumento de Dano', 'Defensivos & Poise', 'Cura & FP', 'Atributos & Vigor']
  },
  {
    id: 'spells',
    name: 'Magias & Encantamentos',
    icon: '🔮',
    description: 'Feitiçarias primevas de Raya Lucaria, encantamentos de dragão e linhagem divina.',
    color: '#38bdf8',
    subcategories: ['Feitiçarias Primevas', 'Encantamentos dos Dragões', 'Chama Frenética', 'Linhagem da Térvore', 'Gravidade']
  },
  {
    id: 'ashes',
    name: 'Cinzas da Guerra',
    icon: '🗡️',
    description: 'Habilidades de combate lendárias e afinidades elementais para armas.',
    color: '#bd6eff',
    subcategories: ['Afinidade Pesada/Afiada', 'Afinidade Sangue/Veneno', 'Afinidade Mágica/Gelo', 'Afinidade Sagrada/Fogo']
  },
  {
    id: 'key_items',
    name: 'Itens Chave & Lágrimas',
    icon: '🗝️',
    description: 'Lágrimas larvais (respec), lágrimas sagradas, sementes douradas e fragmentos de Scadutree.',
    color: '#34d399',
    subcategories: ['Lágrimas Larvais (Respec)', 'Lágrimas Sagradas', 'Sementes Douradas', 'Fragmentos da Scadutree', 'Cinzas de Espírito Reverenciadas', 'Chaves de Espada']
  },
  {
    id: 'armor',
    name: 'Armaduras Notáveis',
    icon: '🛡️',
    description: 'Conjuntos pesados lendários, mantos arcanos e elmos com efeitos passivos.',
    color: '#a2adb9',
    subcategories: ['Conjuntos Pesados', 'Mantos Arcanos', 'Elmos Especiais']
  },
  {
    id: 'cookbooks',
    name: 'Manuais & Pedras de Forja',
    icon: '📜',
    description: 'Manuais de criação de consumíveis e pedras dragão ancião (+25 / +10).',
    color: '#10b981',
    subcategories: ['Pedras Draconianas (+25/+10)', 'Manuais de Artesão', 'Manuais de Guerreiro']
  },
  {
    id: 'bosses',
    name: 'Chefes & Lembranças',
    icon: '👑',
    description: 'Portadores de Grande Runa, Semideuses e ameaças supremas das Terras Intermédias.',
    color: '#f59e0b',
    subcategories: ['Portadores de Runa', 'Lembranças', 'Chefes de Masmorra', 'Chefes da DLC']
  }
];
