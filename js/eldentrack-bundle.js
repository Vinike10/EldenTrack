/* ==========================================================================
   ELDENTRACK - UNIVERSAL STANDALONE BUNDLE
   Zero-dependency, CORS-safe bundle that runs instantly on file:/// and HTTP
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. CATEGORIES DATA ---
  const CATEGORIES = [
    {
      id: 'all',
      name: 'Todos os Segredos',
      icon: '✨',
      description: 'Catálogo unificado de todos os itens, magias e segredos.',
      color: '#d4af37'
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

  // --- 2. REGIONS DATA ---
  const REGIONS = [
    {
      id: 'all_regions',
      name: 'Todas as Regiões',
      badge: '🌍',
      description: 'Todas as regiões das Terras Intermédias e do Reino das Sombras.'
    },
    {
      id: 'limgrave',
      name: 'Limgrave & Península do Choro',
      badge: '🌲',
      description: 'O ponto de partida dos Maculados. Castelo Tempesvéu, Primeira Graça e Castelo Morne.',
      icon: '🏰',
      accentColor: '#4ade80'
    },
    {
      id: 'liurnia',
      name: 'Liurnia dos Lagos',
      badge: '💧',
      description: 'A terra das névoas aquáticas e da Academia de Feitiçaria de Raya Lucaria.',
      icon: '🌙',
      accentColor: '#38bdf8'
    },
    {
      id: 'caelid',
      name: 'Caelid & Monte Dragão Greyoll',
      badge: '🩸',
      description: 'Terras corrompidas pela Podridão Escarlate e arena do General Radahn.',
      icon: '☣️',
      accentColor: '#ef4444'
    },
    {
      id: 'altus',
      name: 'Platô Altus & Monte Gelmir',
      badge: '🍁',
      description: 'Planaltos dourados aos pés da Térvore e o covil herético da Mansão Vulcânica.',
      icon: '🌋',
      accentColor: '#f59e0b'
    },
    {
      id: 'leyndell',
      name: 'Leyndell, Capital Real',
      badge: '👑',
      description: 'A gloriosa metrópole do trono de Marika e o Santuário da Térvore.',
      icon: '🏛️',
      accentColor: '#d4af37'
    },
    {
      id: 'mountaintops',
      name: 'Montanhas dos Gigantes & Neve Consagrada',
      badge: '❄️',
      description: 'Picos gélidos onde arde a Forja dos Gigantes e caminhos secretos para a Árvore Sacra.',
      icon: '🏔️',
      accentColor: '#93c5fd'
    },
    {
      id: 'underground',
      name: 'Subterrâneo (Siofra, Ainsel & Deeproot)',
      badge: '🌌',
      description: 'Cidades Eternas de Nokron e Nokstella sob o firmamento estelar subterrâneo.',
      icon: '⭐',
      accentColor: '#a78bfa'
    },
    {
      id: 'farum_azula',
      name: 'Farum Azula Despedaçada',
      badge: '🌪️',
      description: 'Templo flutuante ancestral cercado por furacões e Dragões Antigos.',
      icon: '⚡',
      accentColor: '#c084fc'
    },
    {
      id: 'haligtree',
      name: 'Árvore Sacra de Miquella',
      badge: '🌸',
      description: 'O refúgio de Miquella e morada de Malenia, a Espada de Miquella.',
      icon: '🗡️',
      accentColor: '#f472b6'
    },
    {
      id: 'shadow_realm',
      name: 'Reino das Sombras (DLC)',
      badge: '🌑',
      description: 'Planície das Sepulturas, Belurat, Fortaleza das Sombras e Pináculo de Rauh.',
      icon: '🔥',
      accentColor: '#e63946'
    }
  ];

  // --- 3. ITEMS DATA ---
  const ITEMS_DATA = [
    {
      id: 'w_dark_moon_greatsword',
      name: 'Espada Grande da Lua Sombria',
      nameEn: 'Dark Moon Greatsword',
      category: 'weapons',
      subtype: 'Espadas Colossais',
      region: 'liurnia',
      location: 'Catedral de Manus Celes (Platô Lunar)',
      rarity: 'legendary',
      icon: '🗡️',
      secretType: 'Quest NPC',
      requirements: { str: 16, dex: 11, int: 38, fai: 0, arc: 0 },
      lore: 'Uma espada de luz lunar legada pelas rainhas de Caria aos seus consortes. Imbuída com o gelo místico da lua.',
      guide: 'Recompensa final da lendária linha de missões da Bruxa Ranni. Após derrotar Astel Filho das Estrelas Naturais, suba pelo elevador até o Platô Lunar, desça no buraco da Catedral de Manus Celes e coloque o Anel da Lua Sombria no dedo de Ranni.',
      mapCoords: 'Sul do Platô de Liurnia, acessível apenas via missão subterrânea.'
    },
    {
      id: 'w_rivers_of_blood',
      name: 'Rios de Sangue (Rivers of Blood)',
      nameEn: 'Rivers of Blood',
      category: 'weapons',
      subtype: 'Katanas',
      region: 'mountaintops',
      location: 'Igreja do Repouso (Montanha dos Gigantes)',
      rarity: 'rare',
      icon: '⚔️',
      secretType: 'Invasor NPC',
      requirements: { str: 12, dex: 18, int: 0, fai: 0, arc: 20 },
      lore: 'Arma do espadachim Okina da Terra dos Juncos. Sua habilidade Empilhador de Cadáveres desencadeia lâminas de sangue que dilaceram a carne.',
      guide: 'Ao se aproximar da Igreja do Repouso a leste das Montanhas dos Gigantes (pouco antes da Forja dos Gigantes), o invasor Sangrento Okina atacará você. Derrote-o para obter a Katana e a Máscara de Okina (faça antes de derrotar o Gigante de Fogo).',
      mapCoords: 'Leste do Lago Congelado, Montanha dos Gigantes.'
    },
    {
      id: 'w_blasphemous_blade',
      name: 'Lâmina Blasfema (Blasphemous Blade)',
      nameEn: 'Blasphemous Blade',
      category: 'weapons',
      subtype: 'Espadas Colossais',
      region: 'altus',
      location: 'Mansão Vulcânica (Monte Gelmir)',
      rarity: 'legendary',
      icon: '🔥',
      secretType: 'Lembrança',
      requirements: { str: 22, dex: 15, int: 0, fai: 21, arc: 0 },
      lore: 'Espada sagrada de Rykard, outrora Lorde Praetor, agora mesclada com a Serpente Devoradora de Deuses. Drena a vitalidade dos inimigos abatidos.',
      guide: 'Derrote Rykard, Senhor da Blasfêmia na Mansão Vulcânica para receber a Lembrança do Blasfemo. Troque-a com Enia na Mesa-Redonda.',
      mapCoords: 'Profundezas da Mansão Vulcânica, Monte Gelmir.'
    },
    {
      id: 'w_bolt_of_gransax',
      name: 'Raio de Gransax (Bolt of Gransax)',
      nameEn: 'Bolt of Gransax',
      category: 'weapons',
      subtype: 'Lanças Pesadas',
      region: 'leyndell',
      location: 'Lança Monumental de Gransax (Leyndell Real)',
      rarity: 'legendary',
      icon: '⚡',
      secretType: 'Exploração Secreta',
      requirements: { str: 20, dex: 40, int: 0, fai: 0, arc: 0 },
      lore: 'Armamento lendário talhado da própria lança do Dragão Ancestral Gransax que destruiu as muralhas de Leyndell.',
      guide: 'ATENÇÃO: Item perdível! Antes de queimar a Térvore e transformar a capital em cinzas, suba no corrimão da sacada do Santuário da Térvore, desça pelas asas da lança de pedra colossal fincada na cidade.',
      mapCoords: 'Centro de Leyndell, na gigantesca lança de pedra.'
    },
    {
      id: 'w_greatsword_guts',
      name: 'Espada Grande (Greatsword / Guts)',
      nameEn: 'Greatsword',
      category: 'weapons',
      subtype: 'Espadas Colossais',
      region: 'caelid',
      location: 'Carruagem Abandonada de Caelid',
      rarity: 'rare',
      icon: '🗡️',
      secretType: 'Baú Escondido',
      requirements: { str: 31, dex: 12, int: 0, fai: 0, arc: 0 },
      lore: 'Pedaço de ferro bruto e colossal em homenagem ao lendário espadachim negro Guts de Berserk.',
      guide: 'Dentro do baú traseiro da carruagem preta abandonada na estrada principal de Caelid, cercada por Corvos Monstruosos e Cães Mutantes.',
      mapCoords: 'Estrada a noroeste de Caelid, próximo à Graça \'Varanda com Vista para a Podridão\'.'
    },
    {
      id: 'w_bloodhounds_fang',
      name: 'Presa do Cão de Caça (Bloodhound\'s Fang)',
      nameEn: 'Bloodhound\'s Fang',
      category: 'weapons',
      subtype: 'Espadas Curvas Grandes',
      region: 'limgrave',
      location: 'Cadeia Eterna do Cão Solitário (Limgrave)',
      rarity: 'rare',
      icon: '🐾',
      secretType: 'Chefe de Masmorra',
      requirements: { str: 18, dex: 17, int: 0, fai: 0, arc: 0 },
      lore: 'Espada curva afiada como garras de besta com sangramento inato e ataque de finta com salto acrobático devastador.',
      guide: 'Derrote o Cavaleiro do Cão de Caça Darriwil na Cadeia Eterna ao sul de Limgrave. Chame Blaidd nas Ruínas de Mistwood para auxílio.',
      mapCoords: 'Colina ao sul de Limgrave, antes da ponte para a Península do Choro.'
    },
    {
      id: 'w_fingerprint_shield',
      name: 'Escudo de Pedra da Digital',
      nameEn: 'Fingerprint Stone Shield',
      category: 'weapons',
      subtype: 'Escudos Grandes',
      region: 'leyndell',
      location: 'Fosso dos Três Dedos (Subterrâneo da Capital)',
      rarity: 'legendary',
      icon: '🛡️',
      secretType: 'Exploração Secreta',
      requirements: { str: 48, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'O escudo mais resistente de todo o jogo, feito de uma lápide colossal queimada pela Chama Frenética dos Três Dedos.',
      guide: 'Após derrotar Mohg o Agouro nos Esgotos de Leyndell, ataque o altar atrás dele para revelar uma passagem secreta e desça pelas lápides.',
      mapCoords: 'Profundezas dos Esgotos de Leyndell.'
    },
    {
      id: 'w_backhand_blade',
      name: 'Lâmina Reversa (Backhand Blade)',
      nameEn: 'Backhand Blade',
      category: 'weapons',
      subtype: 'Lâminas Reversas',
      region: 'shadow_realm',
      location: 'Planície das Sepulturas (DLC)',
      rarity: 'dlc',
      icon: '⚔️',
      secretType: 'Exploração Secreta',
      requirements: { str: 10, dex: 13, int: 0, fai: 0, arc: 0 },
      lore: 'Lâminas empunhadas ao contrário com ataques acrobáticos de esquiva e estocada veloz no flanco dos adversários.',
      guide: 'Em um pequeno mausoléu ao ar livre a nordeste do primeiro Ponto de Graça da Planície das Sepulturas no Reino das Sombras.',
      mapCoords: 'Nordeste da Planície das Sepulturas.'
    },

    // Talismãs
    {
      id: 't_radagon_soreseal',
      name: 'Selo Doloroso de Radagon (Radagon\'s Soreseal)',
      nameEn: 'Radagon\'s Soreseal',
      category: 'talismans',
      subtype: 'Lendários',
      region: 'caelid',
      location: 'Forte Faroth (Monte Dragão de Greyoll)',
      rarity: 'legendary',
      icon: '💍',
      secretType: 'Baú Escondido',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Talismã lendário com o brasão de Radagon. Concede +5 em Vigor, Tolerância, Força e Destreza ao custo de receber +15% de dano.',
      guide: 'Entre no Forte Faroth em Caelid. Suba as escadas para o telhado, pule na abertura com tábuas e desça pelas vigas até a sala dos ratos.',
      mapCoords: 'Forte Faroth, leste do Monte Dragão Greyoll.'
    },
    {
      id: 't_shard_of_alexander',
      name: 'Fragmento de Alexander (Shard of Alexander)',
      nameEn: 'Shard of Alexander',
      category: 'talismans',
      subtype: 'Aumento de Dano',
      region: 'farum_azula',
      location: 'Farum Azula Despedaçada',
      rarity: 'rare',
      icon: '🏺',
      secretType: 'Quest NPC',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Fragmento do Guerreiro Pote Alexander. Aumenta o poder de ataque de todas as Habilidades de Armas (Cinzas da Guerra) em 15%.',
      guide: 'Complete a linha de missões de Alexander e duele com ele no topo da arena em ruínas de Farum Azula.',
      mapCoords: 'Templo dos Dragões, Farum Azula Despedaçada.'
    },
    {
      id: 't_bull_goats_talisman',
      name: 'Talismã do Bode-Touro (Bull-Goat\'s Talisman)',
      nameEn: 'Bull-Goat\'s Talisman',
      category: 'talismans',
      subtype: 'Defensivos',
      region: 'caelid',
      location: 'Caverna do Dragão (Caelid)',
      rarity: 'rare',
      icon: '🐐',
      secretType: 'Baú Escondido',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Aumenta o Equilíbrio (Poise) do usuário em +33%, impedindo interrupção de ataques.',
      guide: 'Encontrado na Caverna do Dragão no norte do Monte Dragão Greyoll, protegido por ursos gigantes.',
      mapCoords: 'Caverna do Dragão, norte de Caelid.'
    },
    {
      id: 't_green_turtle_talisman',
      name: 'Talismã da Tartaruga Verde (Green Turtle Talisman)',
      nameEn: 'Green Turtle Talisman',
      category: 'talismans',
      subtype: 'Cura & FP',
      region: 'limgrave',
      location: 'Vila Summonwater (Limgrave)',
      rarity: 'uncommon',
      icon: '🐢',
      secretType: 'Baú Escondido',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Aumenta a velocidade de recuperação de Vigor (Stamina) em 17%.',
      guide: 'Na Vila Summonwater em Limgrave, desça pelo porão trancado com estátua de espada de pedra (use 1 Chave) e abra o baú.',
      mapCoords: 'Leste de Limgrave, Vila Summonwater.'
    },

    // Magias & Feitiços
    {
      id: 's_comet_azur',
      name: 'Cometa Azur (Comet Azur)',
      nameEn: 'Comet Azur',
      category: 'spells',
      subtype: 'Feitiçarias Primevas',
      region: 'altus',
      location: 'Monte Gelmir (Ermitão Primevo Azur)',
      rarity: 'legendary',
      icon: '🌠',
      secretType: 'Quest NPC',
      requirements: { str: 0, dex: 0, int: 60, fai: 0, arc: 0 },
      lore: 'Feitiçaria primeva lendária que dispara um feixe contínuo avassalador de energia estelar.',
      guide: 'Contorne o Monte Gelmir pela base. Próximo à Graça \'Primeval Sorcerer Azur\', interaja com o corpo do Mestre Azur.',
      mapCoords: 'Acampamento do Eremita, sul do Monte Gelmir.'
    },
    {
      id: 's_golden_vow',
      name: 'Voto Dourado (Golden Vow)',
      nameEn: 'Golden Vow',
      category: 'spells',
      subtype: 'Linhagem Divina',
      region: 'altus',
      location: 'Cabana do Cadáver Fedorento (Monte Gelmir)',
      rarity: 'rare',
      icon: '☀️',
      secretType: 'Exploração Secreta',
      requirements: { str: 0, dex: 0, int: 0, fai: 25, arc: 0 },
      lore: 'Concede +15% de poder de ataque e +10% de defesa por 80 segundos.',
      guide: 'Em um cadáver dentro da Cabana do Cadáver Fedorento no Monte Gelmir.',
      mapCoords: 'Nordeste do Monte Gelmir.'
    },
    {
      id: 's_rotten_breath',
      name: 'Sopro Podre (Rotten Breath)',
      nameEn: 'Rotten Breath',
      category: 'spells',
      subtype: 'Encantamentos dos Dragões',
      region: 'caelid',
      location: 'Catedral da Comunhão do Dragão (Caelid)',
      rarity: 'rare',
      icon: '☣️',
      secretType: 'Altar de Dragão',
      requirements: { str: 0, dex: 0, int: 0, fai: 15, arc: 12 },
      lore: 'Expide uma névoa densa de Podridão Escarlate que devora a vida dos chefes.',
      guide: 'Troque 1 Coração de Dragão no Altar da Catedral da Comunhão do Dragão em Caelid.',
      mapCoords: 'Sul de Caelid, Catedral da Comunhão do Dragão.'
    },

    // Cinzas da Guerra
    {
      id: 'a_lions_claw',
      name: 'Garra do Leão (Lion\'s Claw)',
      nameEn: 'Lion\'s Claw',
      category: 'ashes',
      subtype: 'Afinidade Pesada',
      region: 'caelid',
      location: 'Forte Gael (Caelid)',
      rarity: 'rare',
      icon: '🦁',
      secretType: 'Chefe de Masmorra',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Golpe com cambalhota mortal frontal que quebra a postura dos inimigos.',
      guide: 'Derrote o Leão Guardião no pátio interno do Forte Gael em Caelid.',
      mapCoords: 'Pátio interno do Forte Gael, sudoeste de Caelid.'
    },
    {
      id: 'a_flame_of_the_redmanes',
      name: 'Chamas dos Redmanes (Flame of the Redmanes)',
      nameEn: 'Flame of the Redmanes',
      category: 'ashes',
      subtype: 'Afinidade Fogo',
      region: 'caelid',
      location: 'Forte Gael (Arredores de Caelid)',
      rarity: 'rare',
      icon: '🔥',
      secretType: 'Escaravelho Invisível',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Dispara um leque largo de chamas ardentes com alto dano de postura.',
      guide: 'Ataque o Escaravelho Invisível que corre em círculos em frente ao Forte Gael.',
      mapCoords: 'Frente do Forte Gael, Caelid.'
    },

    // Itens Chave
    {
      id: 'k_flask_of_wondrous_physick',
      name: 'Frasco de Elixir Magnífico (Flask of Wondrous Physick)',
      nameEn: 'Flask of Wondrous Physick',
      category: 'key_items',
      subtype: 'Frascos Sagrados',
      region: 'limgrave',
      location: 'Terceira Igreja de Marika (Limgrave)',
      rarity: 'legendary',
      icon: '🧪',
      secretType: 'Exploração Secreta',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Recipiente sagrado capaz de combinar Lágrimas Cristalinas para efeitos milagrosos.',
      guide: 'No altar diante da estátua de Marika na Terceira Igreja de Marika a leste de Limgrave.',
      mapCoords: 'Leste de Limgrave, Terceira Igreja de Marika.'
    },
    {
      id: 'k_sacred_tear_pilgrimage',
      name: 'Lágrima Sagrada (Igreja da Peregrinação)',
      nameEn: 'Sacred Tear',
      category: 'key_items',
      subtype: 'Lágrimas Sagradas',
      region: 'limgrave',
      location: 'Igreja da Peregrinação (Península do Choro)',
      rarity: 'rare',
      icon: '💧',
      secretType: 'Exploração Secreta',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Aumenta permanentemente a potência de recuperação dos Frascos de Vida e FP.',
      guide: 'No altar diante da estátua na Igreja da Peregrinação, topo da colina norte da Península.',
      mapCoords: 'Península do Choro, Igreja da Peregrinação.'
    },
    {
      id: 'k_golden_seed_stormveil',
      name: 'Semente Dourada (Castelo Tempesvéu)',
      nameEn: 'Golden Seed',
      category: 'key_items',
      subtype: 'Sementes Douradas',
      region: 'limgrave',
      location: 'Pátio de Tempesvéu (Castelo Tempesvéu)',
      rarity: 'rare',
      icon: '🌱',
      secretType: 'Broto da Térvore',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Aumenta permanentemente a quantidade máxima de Frascos que você pode carregar.',
      guide: 'Na base do broto brilhante da Térvore no pátio antes da sala do chefe Godrick.',
      mapCoords: 'Pátio interno do Castelo Tempesvéu.'
    },
    {
      id: 'k_larval_tear_village',
      name: 'Lágrima Larval (Vila dos Albináuricos)',
      nameEn: 'Larval Tear',
      category: 'key_items',
      subtype: 'Lágrimas Larvais',
      region: 'liurnia',
      location: 'Vila dos Albináuricos (Liurnia)',
      rarity: 'rare',
      icon: '💧',
      secretType: 'Exploração Secreta',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Item místico requerido por Rennala para redistribuir todos os atributos (Respec).',
      guide: 'Em um cadáver no cemitério da Vila dos Albináuricos, após cruzar a ponte de madeira.',
      mapCoords: 'Vila dos Albináuricos, sudoeste de Liurnia.'
    },
    {
      id: 'k_scadutree_fragment_church',
      name: 'Fragmento da Térvore das Sombras (DLC)',
      nameEn: 'Scadutree Fragment',
      category: 'key_items',
      subtype: 'Fragmentos de Scadutree',
      region: 'shadow_realm',
      location: 'Igreja da Consolação (Planície das Sepulturas)',
      rarity: 'dlc',
      icon: '🌳',
      secretType: 'Exploração Secreta',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Aumenta permanentemente o poder de ataque e defesa no Reino das Sombras.',
      guide: 'Diante da estátua de Marika na Igreja da Consolação, ao sul da Planície das Sepulturas.',
      mapCoords: 'Sul da Planície das Sepulturas, Igreja da Consolação.'
    },

    // Armaduras
    {
      id: 'ar_bull_goat_set',
      name: 'Conjunto do Bode-Touro (Bull-Goat Set)',
      nameEn: 'Bull-Goat Set',
      category: 'armor',
      subtype: 'Conjuntos Pesados',
      region: 'altus',
      location: 'Ruínas do Vale das Tumbas (Mansão Vulcânica)',
      rarity: 'legendary',
      icon: '🛡️',
      secretType: 'Quest NPC',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'A armadura mais pesada e com maior defesa física e equilíbrio (100 Poise) do jogo.',
      guide: 'Durante as missões da Mansão Vulcânica, invada o mundo de Tragoth no Desfiladeiro de Ruína.',
      mapCoords: 'Arena do Dragão de Magma, Desfiladeiro de Ruína.'
    },
    {
      id: 'ar_black_knife_set',
      name: 'Conjunto da Faca Negra (Black Knife Set)',
      nameEn: 'Black Knife Set',
      category: 'armor',
      subtype: 'Mantos Especiais',
      region: 'mountaintops',
      location: 'Ordina, Cidade Litúrgica (Neve Consagrada)',
      rarity: 'rare',
      icon: '🗡️',
      secretType: 'Baú Escondido',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Armadura que silencia completamente todos os passos e ruídos do jogador.',
      guide: 'Em um cadáver sob o arco da ponte congelada nos fundos da cidade de Ordina.',
      mapCoords: 'Abaixo da ponte de Ordina, Campo de Neve Consagrado.'
    },

    // Chefes
    {
      id: 'b_malenia_blade_of_miquella',
      name: 'Malenia, Espada de Miquella',
      nameEn: 'Malenia, Blade of Miquella',
      category: 'bosses',
      subtype: 'Portadores de Runa',
      region: 'haligtree',
      location: 'Raízes da Árvore Sacra (Elphael)',
      rarity: 'legendary',
      icon: '🌸',
      secretType: 'Chefe de Masmorra',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'A semideusa jamais derrotada em combate, portadora da Podridão Escarlate.',
      guide: 'Navegue por toda a Árvore Sacra de Miquella e Elphael até as Raízes da Árvore.',
      mapCoords: 'Câmara mais profunda de Elphael, Árvore Sacra.'
    },
    {
      id: 'b_bayle_the_dread',
      name: 'Bayle, o Pavoroso (DLC)',
      nameEn: 'Bayle the Dread',
      category: 'bosses',
      subtype: 'Dragões Antigos',
      region: 'shadow_realm',
      location: 'Pico Irregular (Reino das Sombras)',
      rarity: 'dlc',
      icon: '🐲',
      secretType: 'Chefe de Masmorra',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'O dragão tirânico ancestral que mutilou o Senhor dos Dragões Placidusax.',
      guide: 'Escale todo o Pico Irregular enfrentando tempestades até o cume supremo com Igon.',
      mapCoords: 'Cume do Pico Irregular, sudeste do Reino das Sombras.'
    }
  ];

  // --- 4. DATA SERVICE & COUNTS ---
  const DataService = {
    getCategories() { return CATEGORIES; },
    getRegions() { return REGIONS; },
    getAllItems() { return ITEMS_DATA; },
    getCounts(acquiredIds = []) {
      const total = ITEMS_DATA.length;
      const acquired = acquiredIds.filter(id => ITEMS_DATA.some(item => item.id === id)).length;
      const percentage = total > 0 ? Math.round((acquired / total) * 100) : 0;

      const byCategory = {};
      CATEGORIES.forEach(cat => {
        if (cat.id === 'all') {
          byCategory['all'] = { total, acquired, percentage };
          return;
        }
        const catItems = ITEMS_DATA.filter(i => i.category === cat.id);
        const catAcquired = catItems.filter(i => acquiredIds.includes(i.id)).length;
        byCategory[cat.id] = {
          total: catItems.length,
          acquired: catAcquired,
          percentage: catItems.length > 0 ? Math.round((catAcquired / catItems.length) * 100) : 0
        };
      });

      const byRegion = {};
      REGIONS.forEach(reg => {
        if (reg.id === 'all_regions') {
          byRegion['all_regions'] = { total, acquired, percentage };
          return;
        }
        const regItems = ITEMS_DATA.filter(i => i.region === reg.id);
        const regAcquired = regItems.filter(i => acquiredIds.includes(i.id)).length;
        byRegion[reg.id] = {
          total: regItems.length,
          acquired: regAcquired,
          percentage: regItems.length > 0 ? Math.round((regAcquired / regItems.length) * 100) : 0
        };
      });

      return { total, acquired, missing: total - acquired, percentage, byCategory, byRegion };
    }
  };

  // --- 5. STORAGE & STATE ---
  const STORAGE_KEY = 'eldentrack_save_data_v1';
  const StorageManager = {
    load() {
      try {
        const d = localStorage.getItem(STORAGE_KEY);
        if (!d) return this.getDefault();
        const p = JSON.parse(d);
        return (p && p.characters && Array.isArray(p.characters)) ? p : this.getDefault();
      } catch (e) {
        return this.getDefault();
      }
    },
    save(data) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return true; } catch (e) { return false; }
    },
    getDefault() {
      return {
        version: 1,
        activeCharacterId: 'char_default',
        characters: [{ id: 'char_default', name: 'Maculado das Terras Intermédias', build: 'Qualidade / Equilibrado', acquired: [], wishlist: [] }]
      };
    },
    exportSaveFile(data) {
      const b = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const u = URL.createObjectURL(b);
      const a = document.createElement('a');
      a.href = u;
      a.download = `eldentrack_save_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(u);
    }
  };

  // --- 6. TOAST NOTIFICATIONS ---
  const Toast = {
    show({ title, message, icon = '✨', duration = 3000, playSound = false }) {
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }
      const t = document.createElement('div');
      t.className = 'toast';
      t.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
          <div class="toast-title">${title}</div>
          <div class="toast-desc">${message}</div>
        </div>
      `;
      container.appendChild(t);
      if (playSound) this.playGraceSound();
      setTimeout(() => {
        t.classList.add('toast-exit');
        setTimeout(() => t.remove(), 300);
      }, duration);
    },
    playGraceSound() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      } catch (e) {}
    }
  };

  // --- 7. BILINGUAL SEARCH & FILTERING ---
  function filterItemsData({ category, region, query, status, acquiredIds, wishlistIds }) {
    const cleanQuery = (query || '').trim().toLowerCase();

    return ITEMS_DATA.filter(item => {
      if (category !== 'all' && item.category !== category) return false;
      if (region !== 'all_regions' && item.region !== region) return false;

      const isAcquired = acquiredIds.includes(item.id);
      const isWishlisted = wishlistIds.includes(item.id);

      if (status === 'acquired' && !isAcquired) return false;
      if (status === 'missing' && isAcquired) return false;
      if (status === 'wishlist' && !isWishlisted) return false;

      if (cleanQuery) {
        const text = `${item.name} ${item.nameEn || ''} ${item.subtype || ''} ${item.location || ''} ${item.lore || ''} ${item.guide || ''}`.toLowerCase();
        if (!text.includes(cleanQuery)) return false;
      }
      return true;
    });
  }

  // --- 8. STATE STORE ---
  class StoreClass {
    constructor() {
      this.listeners = new Set();
      this.saveData = StorageManager.load();
      this.activeCharacterId = this.saveData.activeCharacterId || 'char_default';
      const curChar = this.saveData.characters.find(c => c.id === this.activeCharacterId) || this.saveData.characters[0];
      this.acquiredIds = curChar.acquired || [];
      this.wishlistIds = curChar.wishlist || [];

      this.viewMode = 'grid';
      this.activeCategory = 'all';
      this.activeRegion = 'all_regions';
      this.searchQuery = '';
      this.statusFilter = 'all';
      this.isLoading = false;
      this.selectedItem = null;
      this.statsModalOpen = false;
    }

    subscribe(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
    notify(event) { this.listeners.forEach(fn => fn(event, this.getState())); }

    getState() {
      const curChar = this.saveData.characters.find(c => c.id === this.activeCharacterId) || this.saveData.characters[0];
      const stats = DataService.getCounts(this.acquiredIds);
      const filtered = filterItemsData({
        category: this.activeCategory,
        region: this.activeRegion,
        query: this.searchQuery,
        status: this.statusFilter,
        acquiredIds: this.acquiredIds,
        wishlistIds: this.wishlistIds
      });

      // Seções
      const sections = CATEGORIES.filter(c => c.id !== 'all').map(cat => {
        const catItems = filterItemsData({
          category: cat.id,
          region: this.activeRegion,
          query: this.searchQuery,
          status: this.statusFilter,
          acquiredIds: this.acquiredIds,
          wishlistIds: this.wishlistIds
        });
        const catAcquired = catItems.filter(i => this.acquiredIds.includes(i.id)).length;
        return {
          id: cat.id,
          name: cat.name,
          icon: cat.icon,
          description: cat.description,
          items: catItems,
          total: catItems.length,
          acquired: catAcquired,
          percentage: catItems.length > 0 ? Math.round((catAcquired / catItems.length) * 100) : 0
        };
      }).filter(s => s.total > 0);

      return {
        viewMode: this.viewMode,
        activeCategory: this.activeCategory,
        activeRegion: this.activeRegion,
        searchQuery: this.searchQuery,
        statusFilter: this.statusFilter,
        acquiredIds: this.acquiredIds,
        wishlistIds: this.wishlistIds,
        items: filtered,
        sections,
        stats,
        activeCharacter: curChar,
        isLoading: this.isLoading,
        selectedItem: this.selectedItem,
        statsModalOpen: this.statsModalOpen
      };
    }

    toggleAcquired(id) {
      const idx = this.acquiredIds.indexOf(id);
      let isAcq = false;
      if (idx >= 0) { this.acquiredIds.splice(idx, 1); isAcq = false; }
      else { this.acquiredIds.push(id); isAcq = true; }
      this._sync();
      this.notify('item_acquired_toggled');
    }

    toggleWishlist(id) {
      const idx = this.wishlistIds.indexOf(id);
      let isWish = false;
      if (idx >= 0) { this.wishlistIds.splice(idx, 1); isWish = false; }
      else { this.wishlistIds.push(id); isWish = true; }
      this._sync();
      this.notify('item_wishlist_toggled');
    }

    setViewMode(mode) { this.viewMode = mode; this._triggerLoading(); this.notify('view_mode_changed'); }
    setCategory(cat) { this.activeCategory = cat; this._triggerLoading(); this.notify('category_changed'); }
    setRegion(reg) { this.activeRegion = reg; this._triggerLoading(); this.notify('region_changed'); }
    setSearchQuery(q) { this.searchQuery = q; this.notify('search_changed'); }
    setStatusFilter(st) { this.statusFilter = st; this._triggerLoading(); this.notify('status_filter_changed'); }
    setSelectedItem(item) { this.selectedItem = item; this.notify('selected_item_changed'); }
    toggleStatsModal(open) { this.statsModalOpen = typeof open === 'boolean' ? open : !this.statsModalOpen; this.notify('stats_modal_toggled'); }

    _sync() {
      const curChar = this.saveData.characters.find(c => c.id === this.activeCharacterId);
      if (curChar) { curChar.acquired = [...this.acquiredIds]; curChar.wishlist = [...this.wishlistIds]; }
      StorageManager.save(this.saveData);
    }

    _triggerLoading() {
      this.isLoading = true;
      this.notify('loading_start');
      setTimeout(() => { this.isLoading = false; this.notify('loading_end'); }, 180);
    }
  }

  const Store = new StoreClass();

  // --- 9. UI RENDERERS ---
  const UI = {
    renderHeader(state) {
      const s = state.stats;
      return `
        <header class="app-header">
          <div class="brand-container" id="brand-home-btn">
            <svg class="brand-logo-rune animate-glow-breath" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="3" opacity="0.6"/>
              <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="2"/>
              <path d="M50 8 L50 92 M8 50 L92 50 M20 20 L80 80 M80 20 L20 80" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
              <circle cx="50" cy="50" r="10" fill="currentColor"/>
            </svg>
            <div>
              <h1 class="brand-title">ELDENTRACK</h1>
              <div class="brand-subtitle">Rastreador de Segredos & Graça</div>
            </div>
          </div>

          <div class="header-center">
            <div class="search-wrapper">
              <span class="search-icon">🔍</span>
              <input type="text" class="search-input" id="search-input" placeholder="Buscar armas, feitiços, talismãs, locais..." value="${state.searchQuery || ''}" autocomplete="off" />
              <span class="search-shortcut">Ctrl+K</span>
            </div>
          </div>

          <div class="header-actions">
            <div class="header-progress-box" id="open-stats-btn" style="cursor: pointer;" title="Abrir Dashboard de Estatísticas">
              <div class="progress-circular-mini">
                <svg viewBox="0 0 36 36" style="width: 100%; height: 100%;">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3.5" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--gold-primary)" stroke-width="3.5" stroke-dasharray="${s.percentage}, 100" stroke-linecap="round" />
                </svg>
              </div>
              <span class="progress-text-mini">${s.percentage}%</span>
            </div>
            <button class="btn btn-secondary" id="save-menu-btn" title="Backup e Save">
              🛡️ ${state.activeCharacter?.name || 'Maculado'}
            </button>
          </div>
        </header>
      `;
    },

    renderFilterBar(state) {
      const cats = CATEGORIES.map(c => `
        <button class="category-chip ${state.activeCategory === c.id ? 'active' : ''}" data-category-id="${c.id}">
          <span>${c.icon}</span>
          <span>${c.name}</span>
          <span class="count-badge">${state.stats.byCategory[c.id]?.acquired || 0}/${state.stats.byCategory[c.id]?.total || 0}</span>
        </button>
      `).join('');

      const regs = REGIONS.map(r => `
        <option value="${r.id}" ${state.activeRegion === r.id ? 'selected' : ''}>${r.badge || ''} ${r.name}</option>
      `).join('');

      return `
        <div class="filter-container">
          <div class="categories-scroll">${cats}</div>
          <div class="sub-filters-row">
            <div class="status-pills">
              <button class="status-pill ${state.statusFilter === 'all' ? 'active' : ''}" data-status="all">Todos (${state.stats.total})</button>
              <button class="status-pill ${state.statusFilter === 'acquired' ? 'active' : ''}" data-status="acquired">✓ Obtidos (${state.stats.acquired})</button>
              <button class="status-pill ${state.statusFilter === 'missing' ? 'active' : ''}" data-status="missing">○ Faltantes (${state.stats.missing})</button>
              <button class="status-pill ${state.statusFilter === 'wishlist' ? 'active' : ''}" data-status="wishlist">★ Favoritos (${state.wishlistIds.length})</button>
            </div>

            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <div class="view-mode-toggle">
                <button class="view-mode-btn ${state.viewMode === 'grid' ? 'active' : ''}" data-view-mode="grid">🔲 Grid</button>
                <button class="view-mode-btn ${state.viewMode === 'sections' ? 'active' : ''}" data-view-mode="sections">📑 Seções</button>
              </div>
              <select class="custom-select" id="region-select">${regs}</select>
              ${(state.activeCategory !== 'all' || state.activeRegion !== 'all_regions' || state.statusFilter !== 'all' || state.searchQuery) ? `
                <button class="btn btn-ghost" id="clear-filters-btn" style="padding: 6px 10px; font-size: 0.8rem;">✕ Limpar</button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    },

    renderItemCard(item, isAcquired, isWishlisted) {
      const reqs = item.requirements || {};
      const reqPills = [];
      if (reqs.str > 0) reqPills.push(`<span class="req-pill active">FOR ${reqs.str}</span>`);
      if (reqs.dex > 0) reqPills.push(`<span class="req-pill active">DES ${reqs.dex}</span>`);
      if (reqs.int > 0) reqPills.push(`<span class="req-pill active">INT ${reqs.int}</span>`);
      if (reqs.fai > 0) reqPills.push(`<span class="req-pill active">FÉ ${reqs.fai}</span>`);
      if (reqs.arc > 0) reqPills.push(`<span class="req-pill active">ARC ${reqs.arc}</span>`);

      return `
        <div class="item-card stagger-item rarity-${item.rarity || 'common'} ${isAcquired ? 'is-acquired' : ''}" data-item-id="${item.id}">
          <div class="card-top">
            <div class="item-icon-wrapper">${item.icon || '⚔️'}</div>
            <div class="card-info">
              <h3 class="item-title" title="${item.name}">${item.name}</h3>
              <div class="item-meta"><span class="region-tag">${item.location}</span></div>
            </div>
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-action="wishlist" data-id="${item.id}">
              ${isWishlisted ? '★' : '☆'}
            </button>
          </div>
          <div class="card-body"><p>${item.lore || item.guide}</p></div>
          ${reqPills.length > 0 ? `<div class="req-pills">${reqPills.join('')}</div>` : ''}
          <div class="card-footer">
            <button class="grace-check-btn ${isAcquired ? 'checked' : ''}" data-action="toggle-acquired" data-id="${item.id}">
              ${isAcquired ? '✓ Obtido' : '○ Obter Item'}
            </button>
            <button class="btn btn-ghost" style="padding: 4px 10px; font-size: 0.8rem;" data-action="details" data-id="${item.id}">
              Ver Guia ➔
            </button>
          </div>
        </div>
      `;
    },

    renderSectionView(sections, acquiredIds, wishlistIds) {
      if (!sections || sections.length === 0) {
        return `<div class="empty-state"><div class="empty-icon">🕯️</div><div class="empty-title">Nenhum Segredo Encontrado</div><p class="empty-desc">Nenhum item corresponde aos filtros.</p></div>`;
      }

      const nav = sections.map(s => `
        <a href="#sec-${s.id}" class="section-nav-pill">
          <span>${s.icon}</span>
          <span>${s.name.split(' ')[0]}</span>
          <span class="count-badge">${s.acquired}/${s.total}</span>
        </a>
      `).join('');

      const blocks = sections.map(s => `
        <div class="category-section-block" id="sec-${s.id}">
          <div class="section-header" data-toggle-sec="${s.id}">
            <div class="section-title-group">
              <span class="section-icon">${s.icon}</span>
              <div>
                <h3 class="section-heading">${s.name}</h3>
                <div class="section-subtext">${s.description || ''}</div>
              </div>
            </div>
            <div class="section-meta-group">
              <div class="section-progress-widget">
                <span class="section-progress-label">${s.acquired} / ${s.total} (${s.percentage}%)</span>
                <div class="progress-bar-bg" style="width: 110px;">
                  <div class="progress-bar-fill" style="width: ${s.percentage}%;"></div>
                </div>
              </div>
              <button class="section-collapse-btn">▾</button>
            </div>
          </div>
          <div class="section-content" id="sec-content-${s.id}">
            <div class="items-grid">
              ${s.items.map(i => UI.renderItemCard(i, acquiredIds.includes(i.id), wishlistIds.includes(i.id))).join('')}
            </div>
          </div>
        </div>
      `).join('');

      return `
        <div class="section-view-wrapper">
          <nav class="section-anchor-nav">${nav}</nav>
          <div class="sections-container">${blocks}</div>
        </div>
      `;
    },

    renderModal(item, isAcquired, isWishlisted) {
      if (!item) return '';
      const reqs = item.requirements || {};
      return `
        <div class="modal-overlay active" id="item-modal-overlay">
          <div class="modal-content">
            <button class="modal-close-btn" id="modal-close-btn">&times;</button>
            <div class="modal-header">
              <div class="modal-icon">${item.icon || '⚔️'}</div>
              <div>
                <h2 class="modal-title">${item.name}</h2>
                <div style="display: flex; gap: 8px; align-items: center; margin-top: 4px; flex-wrap: wrap;">
                  <span class="category-chip" style="padding: 2px 8px; font-size: 0.75rem;">${item.subtype || item.category}</span>
                  <span style="font-size: 0.8rem; color: var(--gold-muted);">📍 ${item.location}</span>
                </div>
              </div>
            </div>
            <div class="modal-section-title">📜 Descrição & Lore</div>
            <div class="lore-quote">"${item.lore || item.guide}"</div>
            <div class="modal-section-title">🧭 Como Encontrar (Passo a Passo)</div>
            <div class="guide-step-box">${item.guide}</div>
            <div class="modal-section-title">🗺️ Ponto de Referência</div>
            <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: var(--radius-md); font-size: 0.88rem; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px;">
              <strong style="color: var(--gold-bright);">Local:</strong> ${item.mapCoords || item.location}
            </div>
            <div style="display: flex; gap: 12px; justify-content: flex-end; align-items: center; border-top: 1px solid rgba(212,175,55,0.18); padding-top: 14px;">
              <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" id="modal-wishlist-toggle" style="font-size: 1.3rem;">
                ${isWishlisted ? '★ Favorito' : '☆ Favoritar'}
              </button>
              <button class="btn ${isAcquired ? 'btn-secondary' : 'btn-gold'}" id="modal-acquired-toggle">
                ${isAcquired ? '✓ Marcado como Obtido' : '✨ Marcar como Obtido'}
              </button>
            </div>
          </div>
        </div>
      `;
    },

    renderStatsModal(state) {
      if (!state.statsModalOpen) return '';
      const s = state.stats;
      return `
        <div class="modal-overlay active" id="stats-dashboard-overlay">
          <div class="modal-content" style="max-width: 800px;">
            <button class="modal-close-btn" id="stats-modal-close">&times;</button>
            <div class="modal-header">
              <div class="modal-icon">📊</div>
              <div>
                <h2 class="modal-title">Progresso da Jornada</h2>
                <div style="font-size: 0.85rem; color: var(--text-muted);">Estatísticas das Terras Intermédias</div>
              </div>
            </div>
            <div style="background: linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(18,21,28,0.9) 100%); border: 1px solid var(--gold-primary); border-radius: var(--radius-xl); padding: 20px; display: flex; align-items: center; justify-content: space-around; margin-bottom: 20px; flex-wrap: wrap; gap: 16px;">
              <div style="text-align: center;">
                <div style="font-family: var(--font-serif); font-size: 2rem; color: var(--gold-bright);">${s.percentage}%</div>
                <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Concluído</div>
              </div>
              <div style="display: flex; gap: 12px;">
                <div class="stat-pill-box"><div class="stat-pill-val" style="color: var(--status-acquired);">${s.acquired}</div><div class="stat-pill-lbl">Obtidos</div></div>
                <div class="stat-pill-box"><div class="stat-pill-val" style="color: var(--status-missing);">${s.missing}</div><div class="stat-pill-lbl">Faltantes</div></div>
                <div class="stat-pill-box"><div class="stat-pill-val">${s.total}</div><div class="stat-pill-lbl">Total</div></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  };

  // --- 10. APP INITIALIZER ---
  function initApp() {
    console.log('[EldenTrack] Inicializando aplicativo...');
    const headerRoot = document.getElementById('header-root');
    const bannerStatsRoot = document.getElementById('banner-stats-root');
    const filterBarRoot = document.getElementById('filter-bar-root');
    const itemsGridView = document.getElementById('items-grid-view');
    const modalRoot = document.getElementById('modal-root');
    const statsModalRoot = document.getElementById('stats-modal-root');

    function renderApp() {
      const state = Store.getState();

      if (headerRoot) headerRoot.innerHTML = UI.renderHeader(state);
      if (bannerStatsRoot) {
        bannerStatsRoot.innerHTML = `
          <div class="stat-pill-box"><div class="stat-pill-val" style="color: var(--status-acquired);">${state.stats.acquired}</div><div class="stat-pill-lbl">Obtidos</div></div>
          <div class="stat-pill-box"><div class="stat-pill-val" style="color: var(--status-missing);">${state.stats.missing}</div><div class="stat-pill-lbl">Faltantes</div></div>
          <div class="stat-pill-box"><div class="stat-pill-val">${state.stats.percentage}%</div><div class="stat-pill-lbl">Progresso</div></div>
        `;
      }
      if (filterBarRoot) filterBarRoot.innerHTML = UI.renderFilterBar(state);

      if (itemsGridView) {
        if (state.viewMode === 'sections') {
          itemsGridView.innerHTML = UI.renderSectionView(state.sections, state.acquiredIds, state.wishlistIds);
        } else {
          if (state.items.length === 0) {
            itemsGridView.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;"><div class="empty-icon">🕯️</div><div class="empty-title">Nenhum Segredo Encontrado</div><p class="empty-desc">Nenhum item corresponde aos filtros selecionados ou à busca "${state.searchQuery}".</p></div>`;
          } else {
            const cardsHtml = state.items.map(item => UI.renderItemCard(item, state.acquiredIds.includes(item.id), state.wishlistIds.includes(item.id))).join('');
            itemsGridView.innerHTML = `<div id="items-grid" class="items-grid">${cardsHtml}</div>`;
          }
        }
      }

      if (modalRoot) {
        modalRoot.innerHTML = state.selectedItem ? UI.renderModal(state.selectedItem, state.acquiredIds.includes(state.selectedItem.id), state.wishlistIds.includes(state.selectedItem.id)) : '';
      }

      if (statsModalRoot) {
        statsModalRoot.innerHTML = UI.renderStatsModal(state);
      }
    }

    // Event Delegation
    document.body.addEventListener('click', (e) => {
      // Toggle Acquired
      const acqBtn = e.target.closest('[data-action="toggle-acquired"]');
      if (acqBtn) {
        e.stopPropagation();
        const id = acqBtn.dataset.id;
        const item = ITEMS_DATA.find(i => i.id === id);
        Store.toggleAcquired(id);
        const isAcq = Store.getState().acquiredIds.includes(id);
        Toast.show({
          title: isAcq ? '✨ Item Descoberto!' : 'Item Desmarcado',
          message: `${item?.name || 'Item'} atualizado.`,
          playSound: isAcq
        });
        return;
      }

      // Toggle Wishlist
      const wishBtn = e.target.closest('[data-action="wishlist"]');
      if (wishBtn) {
        e.stopPropagation();
        const id = wishBtn.dataset.id;
        Store.toggleWishlist(id);
        return;
      }

      // Details Modal
      const detBtn = e.target.closest('[data-action="details"]');
      const card = e.target.closest('.item-card');
      if (detBtn || card) {
        const id = detBtn ? detBtn.dataset.id : card.dataset.itemId;
        const item = ITEMS_DATA.find(i => i.id === id);
        if (item) Store.setSelectedItem(item);
        return;
      }

      // Category Chip
      const chip = e.target.closest('[data-category-id]');
      if (chip) { Store.setCategory(chip.dataset.categoryId); return; }

      // Status Pill
      const statusPill = e.target.closest('[data-status]');
      if (statusPill) { Store.setStatusFilter(statusPill.dataset.status); return; }

      // View Mode Toggle
      const vmBtn = e.target.closest('[data-view-mode]');
      if (vmBtn) { Store.setViewMode(vmBtn.dataset.viewMode); return; }

      // Section Toggle
      const secHeader = e.target.closest('[data-toggle-sec]');
      if (secHeader) {
        const secId = secHeader.dataset.toggleSec;
        const c = document.getElementById(`sec-content-${secId}`);
        if (c) c.classList.toggle('collapsed');
        return;
      }

      // Modals Close
      if (e.target.id === 'modal-close-btn' || e.target.id === 'item-modal-overlay') { Store.setSelectedItem(null); return; }
      if (e.target.id === 'stats-modal-close' || e.target.id === 'stats-dashboard-overlay') { Store.toggleStatsModal(false); return; }

      // Open Stats
      if (e.target.closest('#open-stats-btn')) { Store.toggleStatsModal(true); return; }

      // Clear Filters
      if (e.target.id === 'clear-filters-btn' || e.target.closest('#brand-home-btn')) {
        Store.setCategory('all');
        Store.setRegion('all_regions');
        Store.setStatusFilter('all');
        Store.setSearchQuery('');
        const s = document.getElementById('search-input');
        if (s) s.value = '';
        return;
      }

      // Modal inner buttons
      if (e.target.id === 'modal-acquired-toggle') {
        const item = Store.getState().selectedItem;
        if (item) {
          Store.toggleAcquired(item.id);
          const isAcq = Store.getState().acquiredIds.includes(item.id);
          Toast.show({ title: isAcq ? '✨ Item Descoberto!' : 'Item Desmarcado', message: `${item.name} atualizado.`, playSound: isAcq });
        }
        return;
      }
      if (e.target.id === 'modal-wishlist-toggle') {
        const item = Store.getState().selectedItem;
        if (item) Store.toggleWishlist(item.id);
        return;
      }
    });

    // Inputs & Selects
    document.body.addEventListener('input', (e) => {
      if (e.target.id === 'search-input') {
        Store.setSearchQuery(e.target.value);
      }
    });

    document.body.addEventListener('change', (e) => {
      if (e.target.id === 'region-select') {
        Store.setRegion(e.target.value);
      }
    });

    // Keyboard shortcut Ctrl+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const s = document.getElementById('search-input');
        if (s) { s.focus(); s.select(); }
      }
      if (e.key === 'Escape') {
        Store.setSelectedItem(null);
        Store.toggleStatsModal(false);
      }
    });

    Store.subscribe(() => renderApp());
    renderApp();
    console.log('[EldenTrack] Renderização concluída com sucesso!');
  }

  // Auto-inicializar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
