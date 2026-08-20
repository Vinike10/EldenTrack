/* ==========================================================================
   ELDENTRACK - CATEGORIES & TAXONOMY
   ========================================================================== */

export const CATEGORIES = [
  {
    id: 'all',
    name: 'Todos os Segredos',
    icon: '✨',
    description: 'Catálogo unificado de todos os itens, magias e segredos.',
    color: 'var(--gold-primary)'
  },
  {
    id: 'weapons',
    name: 'Armas & Selos',
    icon: '⚔️',
    description: 'Espadas colossais, katanas, cajados brilhantes e selos sagrados.',
    color: '#e63946',
    subcategories: ['Espadas Colossais', 'Katanas', 'Cajados Glintstone', 'Selos Sagrados', 'Adagas', 'Escudos Grandes']
  },
  {
    id: 'talismans',
    name: 'Talismãs Lendários',
    icon: '💍',
    description: 'Acessórios lendários que alteram atributos e concedem poderes únicos.',
    color: '#ff9d00',
    subcategories: ['Lendários', 'Aumento de Dano', 'Defensivos', 'Cura & FP', 'Atributos']
  },
  {
    id: 'spells',
    name: 'Magias & Encantamentos',
    icon: '🔮',
    description: 'Feitiçarias primordiais dos eruditos de Raya Lucaria e incantações divinas.',
    color: '#38bdf8',
    subcategories: ['Feitiçarias Primevas', 'Encantamentos dos Dragões', 'Chama Frenética', 'Gravidade', 'Linhagem Divina']
  },
  {
    id: 'ashes',
    name: 'Cinzas da Guerra',
    icon: '🗡️',
    description: 'Habilidades lendárias e afinidades de combate para armas.',
    color: '#bd6eff',
    subcategories: ['Afinidade Pesada', 'Afinidade Afiada', 'Afinidade Sangue', 'Afinidade Mágica', 'Afinidade Fogo']
  },
  {
    id: 'key_items',
    name: 'Itens Chave & Lágrimas',
    icon: '🗝️',
    description: 'Lágrimas larvais para renascimento, pedras de memória e chaves de pedra.',
    color: '#48a9fe',
    subcategories: ['Lágrimas Larvais', 'Pedras de Memória', 'Fragmentos de Scadutree', 'Chaves de Espada de Pedra', 'Sementes Douradas']
  },
  {
    id: 'armor',
    name: 'Armaduras & Elmos',
    icon: '🛡️',
    description: 'Conjuntos de campeões, armaduras lendárias e elmos com bônus ocultos.',
    color: '#a2adb9',
    subcategories: ['Conjuntos Pesados', 'Mantos de Feiticeiro', 'Elmos Especiais', 'Conjuntos de Chefes']
  },
  {
    id: 'cookbooks',
    name: 'Livros & Pedras Draconianas',
    icon: '📜',
    description: 'Manuais de artesanato e pedras antigas de forja máxima (+25 / +10).',
    color: '#10b981',
    subcategories: ['Pedras Draconianas', 'Manuais de Guerreiro', 'Manuais de Artesão', 'Manuais do DLC']
  },
  {
    id: 'bosses',
    name: 'Chefes & Lembranças',
    icon: '👑',
    description: 'Semideuses, portadores de Grandes Runas e ameaças lendárias.',
    color: '#f59e0b',
    subcategories: ['Portadores de Runa', 'Lembranças', 'Dragões Antigos', 'Chefes do Reino das Sombras']
  }
];
