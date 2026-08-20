/* ==========================================================================
   ELDENTRACK - ADVANCED STANDALONE ENGINE (v2.5)
   Zero-lag Debounced Search, Grace Particles, Build Calculator & Region Strip
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. CATEGORIES DATA ---
  const CATEGORIES = [
    { id: 'all', name: 'Todos os Segredos', icon: '✨', description: 'Catálogo unificado de todos os itens, magias e segredos.', color: '#d4af37' },
    { id: 'weapons', name: 'Armas & Selos', icon: '⚔️', description: 'Espadas colossais, katanas, cajados brilhantes e selos sagrados.', color: '#e63946' },
    { id: 'talismans', name: 'Talismãs Lendários', icon: '💍', description: 'Acessórios lendários que alteram atributos e concedem poderes únicos.', color: '#ff9d00' },
    { id: 'spells', name: 'Magias & Encantamentos', icon: '🔮', description: 'Feitiçarias primordiais de Raya Lucaria e incantações divinas.', color: '#38bdf8' },
    { id: 'ashes', name: 'Cinzas da Guerra', icon: '🗡️', description: 'Habilidades lendárias e afinidades de combate para armas.', color: '#bd6eff' },
    { id: 'key_items', name: 'Itens Chave & Lágrimas', icon: '🗝️', description: 'Lágrimas larvais para renascimento, pedras de memória e chaves de pedra.', color: '#48a9fe' },
    { id: 'armor', name: 'Armaduras & Elmos', icon: '🛡️', description: 'Conjuntos de campeões, armaduras lendárias e elmos especiais.', color: '#a2adb9' },
    { id: 'cookbooks', name: 'Livros & Pedras Draconianas', icon: '📜', description: 'Manuais de artesanato e pedras de forja máxima (+25 / +10).', color: '#10b981' },
    { id: 'bosses', name: 'Chefes & Lembranças', icon: '👑', description: 'Semideuses, portadores de Grandes Runas e ameaças lendárias.', color: '#f59e0b' }
  ];

  // --- 2. REGIONS DATA ---
  const REGIONS = [
    { id: 'all_regions', name: 'Todas as Regiões', badge: '🌍', icon: '✨', description: 'Todas as regiões das Terras Intermédias e Reino das Sombras.' },
    { id: 'limgrave', name: 'Limgrave & Península', badge: '🌲', icon: '🏰', description: 'Castelo Tempesvéu, Primeira Graça e Castelo Morne.', accentColor: '#4ade80' },
    { id: 'liurnia', name: 'Liurnia dos Lagos', badge: '💧', icon: '🌙', description: 'Academia de Feitiçaria de Raya Lucaria e Platô Lunar.', accentColor: '#38bdf8' },
    { id: 'caelid', name: 'Caelid & Greyoll', badge: '🩸', icon: '☣️', description: 'Terras corrompidas pela Podridão e arena de Radahn.', accentColor: '#ef4444' },
    { id: 'altus', name: 'Platô Altus & Gelmir', badge: '🍁', icon: '🌋', description: 'Planaltos dourados e o covil da Mansão Vulcânica.', accentColor: '#f59e0b' },
    { id: 'leyndell', name: 'Leyndell Real', badge: '👑', icon: '🏛️', description: 'A gloriosa metrópole do trono de Marika.', accentColor: '#d4af37' },
    { id: 'mountaintops', name: 'Montanhas & Neve', badge: '❄️', icon: '🏔️', description: 'Picos gélidos, Forja dos Gigantes e Neve Consagrada.', accentColor: '#93c5fd' },
    { id: 'underground', name: 'Subterrâneo (Siofra/Nokron)', badge: '🌌', icon: '⭐', description: 'Cidades Eternas sob o firmamento estelar subterrâneo.', accentColor: '#a78bfa' },
    { id: 'farum_azula', name: 'Farum Azula', badge: '🌪️', icon: '⚡', description: 'Templo flutuante ancestral dos Dragões Antigos.', accentColor: '#c084fc' },
    { id: 'haligtree', name: 'Árvore Sacra', badge: '🌸', icon: '🗡️', description: 'O refúgio de Miquella e morada de Malenia.', accentColor: '#f472b6' },
    { id: 'shadow_realm', name: 'Reino das Sombras (DLC)', badge: '🌑', icon: '🔥', description: 'Planície das Sepulturas e Fortaleza das Sombras.', accentColor: '#e63946' }
  ];

  // --- 3. ITEMS DATABASE ---
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
      guide: 'Recompensa final da linha de missões de Ranni. Após derrotar Astel, suba pelo elevador até o Platô Lunar e coloque o anel no dedo de Ranni.',
      mapCoords: 'Sul do Platô de Liurnia.'
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
      lore: 'Arma de Okina da Terra dos Juncos. Sua habilidade Empilhador de Cadáveres desencadeia lâminas de sangue velozes.',
      guide: 'Ao se aproximar da Igreja do Repouso a leste das Montanhas dos Gigantes, derrote o invasor Okina.',
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
      lore: 'Espada sagrada de Rykard mesclada com a Serpente Devoradora de Deuses. Drena a vitalidade dos inimigos abatidos.',
      guide: 'Derrote Rykard na Mansão Vulcânica e troque a Lembrança com Enia na Mesa-Redonda.',
      mapCoords: 'Profundezas da Mansão Vulcânica, Monte Gelmir.'
    },
    {
      id: 'w_bolt_of_gransax',
      name: 'Raio de Gransax (Bolt of Gransax)',
      nameEn: 'Bolt of Gransax',
      category: 'weapons',
      subtype: 'Lanças Pesadas',
      region: 'leyndell',
      location: 'Lança Monumental de Gransax (Leyndell)',
      rarity: 'legendary',
      icon: '⚡',
      secretType: 'Exploração Secreta',
      requirements: { str: 20, dex: 40, int: 0, fai: 0, arc: 0 },
      lore: 'Armamento lendário talhado da própria lança do Dragão Ancestral Gransax que perfurou as muralhas de Leyndell.',
      guide: 'ATENÇÃO: Pegue antes de queimar a capital! Caminhe sobre a gigantesca lança de pedra fincada no centro da cidade.',
      mapCoords: 'Centro de Leyndell, acima do pátio principal.'
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
      lore: 'Pedaço de ferro bruto e colossal em homenagem ao espadachim negro Guts de Berserk.',
      guide: 'No baú da carruagem preta abandonada na estrada principal no noroeste de Caelid.',
      mapCoords: 'Estrada de Caelid, próximo à Varanda com Vista para a Podridão.'
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
      lore: 'Espada curva com sangramento inato e ataque de salto acrobático devastador.',
      guide: 'Derrote o Cavaleiro Darriwil na Cadeia Eterna ao sul de Limgrave.',
      mapCoords: 'Colina ao sul de Limgrave.'
    },
    {
      id: 'w_fingerprint_shield',
      name: 'Escudo de Pedra da Digital',
      nameEn: 'Fingerprint Stone Shield',
      category: 'weapons',
      subtype: 'Escudos Grandes',
      region: 'leyndell',
      location: 'Fosso dos Três Dedos (Esgotos de Leyndell)',
      rarity: 'legendary',
      icon: '🛡️',
      secretType: 'Exploração Secreta',
      requirements: { str: 48, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'O escudo com maior estabilidade do jogo, forjado em uma lápide queimada pela Chama Frenética.',
      guide: 'Após derrotar Mohg o Agouro nos Esgotos de Leyndell, ataque o altar secreto e desça pelas lápides.',
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
      lore: 'Lâminas empunhadas ao contrário com ataques acrobáticos de esquiva e estocada veloz no flanco.',
      guide: 'Em um pequeno mausoléu ao ar livre a nordeste do primeiro Ponto de Graça da Planície das Sepulturas.',
      mapCoords: 'Nordeste da Planície das Sepulturas, Reino das Sombras.'
    },

    // Talismãs
    {
      id: 't_radagon_soreseal',
      name: 'Selo Doloroso de Radagon (Radagon\'s Soreseal)',
      nameEn: 'Radagon\'s Soreseal',
      category: 'talismans',
      subtype: 'Lendários',
      region: 'caelid',
      location: 'Forte Faroth (Monte Dragão)',
      rarity: 'legendary',
      icon: '💍',
      secretType: 'Baú Escondido',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      lore: 'Concede +5 em Vigor, Tolerância, Força e Destreza ao custo de receber +15% de dano.',
      guide: 'No Forte Faroth em Caelid, pule na abertura do telhado e desça pelas vigas até o baú protegido por ratos.',
      mapCoords: 'Forte Faroth, leste de Caelid.'
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
      lore: 'Aumenta o poder de ataque de todas as Habilidades de Armas (Cinzas da Guerra) em 15%.',
      guide: 'Complete a linha de missões de Alexander e duele com ele no topo da arena em ruínas de Farum Azula.',
      mapCoords: 'Templo dos Dragões, Farum Azula.'
    },
    {
      id: 't_bull_goats_talisman',
      name: 'Talismã do Bode-Touro',
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
      guide: 'Na Caverna do Dragão ao norte de Caelid, em uma câmara com ursos gigantes.',
      mapCoords: 'Caverna do Dragão, norte de Caelid.'
    },
    {
      id: 't_green_turtle_talisman',
      name: 'Talismã da Tartaruga Verde',
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
      guide: 'Na Vila Summonwater, desça pelo porão trancado com estátua de espada de pedra (use 1 Chave) e abra o baú.',
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
      guide: 'Próximo à Graça \'Primeval Sorcerer Azur\' no Monte Gelmir, interaja com o corpo cristalizado do Mestre Azur.',
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
      name: 'Frasco de Elixir Magnífico',
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

  // --- 4. BUILD PRESETS ---
  const BUILD_PRESETS = [
    { id: 'all_build', name: 'Todos os Itens', stats: { str: 99, dex: 99, int: 99, fai: 99, arc: 99 } },
    { id: 'bleed_samurai', name: '🩸 Samurai de Sangue', stats: { str: 18, dex: 50, int: 9, fai: 15, arc: 45 } },
    { id: 'moon_mage', name: '🌙 Mago da Lua', stats: { str: 16, dex: 18, int: 70, fai: 10, arc: 9 } },
    { id: 'colossal_str', name: '🗡️ Guerreiro Colossal', stats: { str: 66, dex: 18, int: 9, fai: 15, arc: 9 } },
    { id: 'golden_paladin', name: '☀️ Paladino Dourado', stats: { str: 30, dex: 15, int: 9, fai: 60, arc: 9 } }
  ];

  // --- 5. DATA COUNTS HELPER ---
  function getCounts(acquiredIds = []) {
    const total = ITEMS_DATA.length;
    const acquired = acquiredIds.filter(id => ITEMS_DATA.some(item => item.id === id)).length;
    const percentage = total > 0 ? Math.round((acquired / total) * 100) : 0;

    const byCategory = {};
    CATEGORIES.forEach(cat => {
      if (cat.id === 'all') { byCategory['all'] = { total, acquired, percentage }; return; }
      const catItems = ITEMS_DATA.filter(i => i.category === cat.id);
      const catAcquired = catItems.filter(i => acquiredIds.includes(i.id)).length;
      byCategory[cat.id] = { total: catItems.length, acquired: catAcquired, percentage: catItems.length > 0 ? Math.round((catAcquired / catItems.length) * 100) : 0 };
    });

    const byRegion = {};
    REGIONS.forEach(reg => {
      if (reg.id === 'all_regions') { byRegion['all_regions'] = { total, acquired, percentage }; return; }
      const regItems = ITEMS_DATA.filter(i => i.region === reg.id);
      const regAcquired = regItems.filter(i => acquiredIds.includes(i.id)).length;
      byRegion[reg.id] = { total: regItems.length, acquired: regAcquired, percentage: regItems.length > 0 ? Math.round((regAcquired / regItems.length) * 100) : 0 };
    });

    return { total, acquired, missing: total - acquired, percentage, byCategory, byRegion };
  }

  // --- 6. FILTERING & SEARCH ---
  function filterItems(state) {
    const q = (state.searchQuery || '').trim().toLowerCase();
    const curStats = state.userStats;

    return ITEMS_DATA.filter(item => {
      if (state.activeCategory !== 'all' && item.category !== state.activeCategory) return false;
      if (state.activeRegion !== 'all_regions' && item.region !== state.activeRegion) return false;

      const isAcq = state.acquiredIds.includes(item.id);
      const isWish = state.wishlistIds.includes(item.id);
      if (state.statusFilter === 'acquired' && !isAcq) return false;
      if (state.statusFilter === 'missing' && isAcq) return false;
      if (state.statusFilter === 'wishlist' && !isWish) return false;

      // Filtro de build (se marcado apenas compatíveis)
      if (state.onlyUsableByBuild && curStats) {
        const req = item.requirements || {};
        if (req.str > curStats.str || req.dex > curStats.dex || req.int > curStats.int || req.fai > curStats.fai || req.arc > curStats.arc) {
          return false;
        }
      }

      if (q) {
        const text = `${item.name} ${item.nameEn || ''} ${item.subtype || ''} ${item.location || ''} ${item.lore || ''} ${item.guide || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }

  // --- 7. STORAGE & STATE ---
  const STORAGE_KEY = 'eldentrack_save_data_v2';
  const Store = {
    saveData: null,
    acquiredIds: [],
    wishlistIds: [],
    activeCategory: 'all',
    activeRegion: 'all_regions',
    searchQuery: '',
    statusFilter: 'all',
    viewMode: 'grid',
    selectedItem: null,
    statsModalOpen: false,
    soundEnabled: true,
    activeBuildId: 'all_build',
    userStats: { str: 99, dex: 99, int: 99, fai: 99, arc: 99 },
    onlyUsableByBuild: false,
    listeners: new Set(),

    init() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          this.saveData = JSON.parse(saved);
          this.acquiredIds = this.saveData.characters?.[0]?.acquired || [];
          this.wishlistIds = this.saveData.characters?.[0]?.wishlist || [];
          this.soundEnabled = this.saveData.soundEnabled !== false;
        } else {
          this.saveData = { characters: [{ name: 'Maculado das Terras Intermédias', build: 'Equilibrado', acquired: [], wishlist: [] }], soundEnabled: true };
        }
      } catch (e) {
        this.saveData = { characters: [{ name: 'Maculado', acquired: [], wishlist: [] }], soundEnabled: true };
      }
    },

    save() {
      try {
        if (this.saveData && this.saveData.characters) {
          this.saveData.characters[0].acquired = this.acquiredIds;
          this.saveData.characters[0].wishlist = this.wishlistIds;
          this.saveData.soundEnabled = this.soundEnabled;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.saveData));
        }
      } catch (e) {}
    },

    subscribe(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
    notify(event, meta) { this.listeners.forEach(fn => fn(event, this.getState(), meta)); },

    getState() {
      const stats = getCounts(this.acquiredIds);
      const items = filterItems(this);

      const sections = CATEGORIES.filter(c => c.id !== 'all').map(cat => {
        const catItems = items.filter(i => i.category === cat.id);
        const catAcq = catItems.filter(i => this.acquiredIds.includes(i.id)).length;
        return {
          id: cat.id,
          name: cat.name,
          icon: cat.icon,
          description: cat.description,
          items: catItems,
          total: catItems.length,
          acquired: catAcq,
          percentage: catItems.length > 0 ? Math.round((catAcq / catItems.length) * 100) : 0
        };
      }).filter(s => s.total > 0);

      return {
        activeCategory: this.activeCategory,
        activeRegion: this.activeRegion,
        searchQuery: this.searchQuery,
        statusFilter: this.statusFilter,
        viewMode: this.viewMode,
        acquiredIds: this.acquiredIds,
        wishlistIds: this.wishlistIds,
        items,
        sections,
        stats,
        soundEnabled: this.soundEnabled,
        activeBuildId: this.activeBuildId,
        userStats: this.userStats,
        onlyUsableByBuild: this.onlyUsableByBuild,
        selectedItem: this.selectedItem,
        statsModalOpen: this.statsModalOpen
      };
    },

    toggleAcquired(id) {
      const idx = this.acquiredIds.indexOf(id);
      let isAcq = false;
      if (idx >= 0) { this.acquiredIds.splice(idx, 1); isAcq = false; }
      else { this.acquiredIds.push(id); isAcq = true; }
      this.save();
      this.notify('item_acquired_toggled', { id, isAcq });
    },

    toggleWishlist(id) {
      const idx = this.wishlistIds.indexOf(id);
      if (idx >= 0) this.wishlistIds.splice(idx, 1);
      else this.wishlistIds.push(id);
      this.save();
      this.notify('item_wishlist_toggled', { id });
    },

    setSearchQuery(q) {
      this.searchQuery = q;
      this.notify('search_query_changed', { isSearch: true });
    },

    setCategory(cat) { this.activeCategory = cat; this.notify('category_changed'); },
    setRegion(reg) { this.activeRegion = reg; this.notify('region_changed'); },
    setStatusFilter(st) { this.statusFilter = st; this.notify('status_filter_changed'); },
    setViewMode(mode) { this.viewMode = mode; this.notify('view_mode_changed'); },
    setSelectedItem(item) { this.selectedItem = item; this.notify('selected_item_changed'); },
    toggleStatsModal(open) { this.statsModalOpen = typeof open === 'boolean' ? open : !this.statsModalOpen; this.notify('stats_modal_toggled'); },
    toggleSound() { this.soundEnabled = !this.soundEnabled; this.save(); this.notify('sound_toggled'); },

    setBuildPreset(presetId) {
      this.activeBuildId = presetId;
      const preset = BUILD_PRESETS.find(p => p.id === presetId);
      if (preset) this.userStats = { ...preset.stats };
      this.notify('build_changed');
    },

    setStat(statKey, val) {
      this.userStats[statKey] = parseInt(val, 10) || 0;
      this.activeBuildId = 'custom';
      this.notify('build_changed');
    },

    toggleOnlyUsable() {
      this.onlyUsableByBuild = !this.onlyUsableByBuild;
      this.notify('build_changed');
    }
  };

  // --- 8. AUDIO FEEDBACK ---
  const AudioEngine = {
    playChime() {
      if (!Store.soundEnabled) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      } catch (e) {}
    },
    playClick() {
      if (!Store.soundEnabled) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } catch (e) {}
    }
  };

  // --- 9. PARTICLES ENGINE (Grace Embers) ---
  function initGraceParticles() {
    let canvas = document.getElementById('grace-particles-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'grace-particles-canvas';
      document.body.prepend(canvas);
    }
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.45 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI
    }));

    function loop() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulse += 0.025;
        const currentOpacity = Math.abs(Math.sin(p.pulse)) * p.opacity;

        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = `rgba(246, 226, 122, ${currentOpacity})`;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    loop();
  }

  // --- 10. UI COMPONENTS RENDERER ---
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
            <button class="sound-toggle-btn" id="sound-toggle-btn" title="Ativar/Desativar Efeitos Sonoros">
              ${state.soundEnabled ? '🔔 Sons: ON' : '🔕 Sons: OFF'}
            </button>
            <div class="header-progress-box" id="open-stats-btn" style="cursor: pointer;" title="Abrir Dashboard de Estatísticas">
              <div class="progress-circular-mini">
                <svg viewBox="0 0 36 36" style="width: 100%; height: 100%;">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3.5" />
                  <path id="header-progress-svg-path" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--gold-primary)" stroke-width="3.5" stroke-dasharray="${s.percentage}, 100" stroke-linecap="round" />
                </svg>
              </div>
              <span class="progress-text-mini" id="header-progress-text">${s.percentage}%</span>
            </div>
          </div>
        </header>
      `;
    },

    renderRegionStrip(state) {
      const cards = REGIONS.map(reg => {
        const isActive = state.activeRegion === reg.id;
        const regStat = state.stats.byRegion[reg.id] || { acquired: 0, total: 0, percentage: 0 };
        return `
          <div class="region-strip-card ${isActive ? 'active' : ''}" data-region-card-id="${reg.id}">
            <div class="region-card-header">
              <span class="region-card-icon">${reg.badge}</span>
              <span class="region-card-name" title="${reg.name}">${reg.name}</span>
            </div>
            <div class="region-card-progress">
              <span>${regStat.acquired}/${regStat.total}</span>
              <span>${regStat.percentage}%</span>
            </div>
            <div class="progress-bar-bg" style="height: 4px;">
              <div class="progress-bar-fill" style="width: ${regStat.percentage}%;"></div>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div style="margin-bottom: 8px;">
          <div style="font-family: var(--font-serif); font-size: 0.88rem; color: var(--gold-light); margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
            <span>🗺️</span><span>Regiões das Terras Intermédias & Reino das Sombras</span>
          </div>
          <div class="region-strip-container">${cards}</div>
        </div>
      `;
    },

    renderBuildBar(state) {
      const presets = BUILD_PRESETS.map(p => `
        <button class="build-preset-btn ${state.activeBuildId === p.id ? 'active' : ''}" data-preset-id="${p.id}">
          ${p.name}
        </button>
      `).join('');

      const s = state.userStats;

      return `
        <div class="build-bar-wrapper">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-family: var(--font-serif); font-size: 0.85rem; color: var(--gold-bright);">⚔️ Requisitos da Sua Build:</span>
            <div class="build-presets-group">${presets}</div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <div class="stat-inputs-group">
              <div class="stat-input-box"><span class="stat-input-label">FOR</span><input type="number" class="stat-input-val" data-stat="str" value="${s.str}" min="1" max="99" /></div>
              <div class="stat-input-box"><span class="stat-input-label">DES</span><input type="number" class="stat-input-val" data-stat="dex" value="${s.dex}" min="1" max="99" /></div>
              <div class="stat-input-box"><span class="stat-input-label">INT</span><input type="number" class="stat-input-val" data-stat="int" value="${s.int}" min="1" max="99" /></div>
              <div class="stat-input-box"><span class="stat-input-label">FÉ</span><input type="number" class="stat-input-val" data-stat="fai" value="${s.fai}" min="1" max="99" /></div>
              <div class="stat-input-box"><span class="stat-input-label">ARC</span><input type="number" class="stat-input-val" data-stat="arc" value="${s.arc}" min="1" max="99" /></div>
            </div>

            <label style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.78rem; color: var(--text-secondary); cursor: pointer;">
              <input type="checkbox" id="only-usable-checkbox" ${state.onlyUsableByBuild ? 'checked' : ''} />
              <span>Apenas Compatíveis</span>
            </label>
          </div>
        </div>
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

      return `
        <div class="filter-container">
          ${this.renderRegionStrip(state)}
          ${this.renderBuildBar(state)}

          <!-- Categories Chips -->
          <div class="categories-scroll">${cats}</div>

          <!-- Sub Filters Row -->
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
              ${(state.activeCategory !== 'all' || state.activeRegion !== 'all_regions' || state.statusFilter !== 'all' || state.searchQuery || state.onlyUsableByBuild) ? `
                <button class="btn btn-ghost" id="clear-filters-btn" style="padding: 6px 10px; font-size: 0.8rem;">✕ Limpar Filtros</button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    },

    renderItemCard(item, state) {
      const isAcquired = state.acquiredIds.includes(item.id);
      const isWishlisted = state.wishlistIds.includes(item.id);
      const curStats = state.userStats;
      const reqs = item.requirements || {};

      // Teste de usabilidade
      let canWield = true;
      let missingList = [];
      if (reqs.str > curStats.str) { canWield = false; missingList.push(`FOR ${reqs.str}`); }
      if (reqs.dex > curStats.dex) { canWield = false; missingList.push(`DES ${reqs.dex}`); }
      if (reqs.int > curStats.int) { canWield = false; missingList.push(`INT ${reqs.int}`); }
      if (reqs.fai > curStats.fai) { canWield = false; missingList.push(`FÉ ${reqs.fai}`); }
      if (reqs.arc > curStats.arc) { canWield = false; missingList.push(`ARC ${reqs.arc}`); }

      const reqPills = [];
      if (reqs.str > 0) reqPills.push(`<span class="req-pill ${curStats.str >= reqs.str ? 'active' : ''}">FOR ${reqs.str}</span>`);
      if (reqs.dex > 0) reqPills.push(`<span class="req-pill ${curStats.dex >= reqs.dex ? 'active' : ''}">DES ${reqs.dex}</span>`);
      if (reqs.int > 0) reqPills.push(`<span class="req-pill ${curStats.int >= reqs.int ? 'active' : ''}">INT ${reqs.int}</span>`);
      if (reqs.fai > 0) reqPills.push(`<span class="req-pill ${curStats.fai >= reqs.fai ? 'active' : ''}">FÉ ${reqs.fai}</span>`);
      if (reqs.arc > 0) reqPills.push(`<span class="req-pill ${curStats.arc >= reqs.arc ? 'active' : ''}">ARC ${reqs.arc}</span>`);

      const hasRequirements = Object.values(reqs).some(v => v > 0);
      const wieldBadge = hasRequirements ? (
        canWield ? `<span class="wieldable-badge can-wield">✓ Pronto para Uso</span>` : `<span class="wieldable-badge cannot-wield">⚠️ Requer ${missingList.join(', ')}</span>`
      ) : '';

      return `
        <div class="item-card stagger-item rarity-${item.rarity || 'common'} ${isAcquired ? 'is-acquired' : ''}" data-item-id="${item.id}">
          <div class="card-top">
            <div class="item-icon-wrapper">${item.icon || '⚔️'}</div>
            <div class="card-info">
              <h3 class="item-title" title="${item.name}">${item.name}</h3>
              <div class="item-meta">
                <span class="region-tag">${item.location}</span>
              </div>
            </div>
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-action="wishlist" data-id="${item.id}">
              ${isWishlisted ? '★' : '☆'}
            </button>
          </div>

          <div class="card-body">
            <p>${item.lore || item.guide}</p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; flex-wrap: wrap; gap: 4px;">
            ${reqPills.length > 0 ? `<div class="req-pills">${reqPills.join('')}</div>` : '<div></div>'}
            ${wieldBadge}
          </div>

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

    renderSectionView(sections, state) {
      if (!sections || sections.length === 0) {
        return `<div class="empty-state"><div class="empty-icon">🕯️</div><div class="empty-title">Nenhum Segredo Encontrado</div><p class="empty-desc">Nenhum item corresponde aos filtros e build atual.</p></div>`;
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
              ${s.items.map(i => UI.renderItemCard(i, state)).join('')}
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

  // --- 11. BOOTSTRAP & DOM EVENT DELEGATION ---
  function initApp() {
    Store.init();
    initGraceParticles();

    const headerRoot = document.getElementById('header-root');
    const bannerStatsRoot = document.getElementById('banner-stats-root');
    const filterBarRoot = document.getElementById('filter-bar-root');
    const itemsGridView = document.getElementById('items-grid-view');
    const modalRoot = document.getElementById('modal-root');
    const statsModalRoot = document.getElementById('stats-modal-root');

    // 1. Renderiza o Header uma única vez para NUNCA perder o foco do input
    if (headerRoot) {
      headerRoot.innerHTML = UI.renderHeader(Store.getState());
    }

    function updateAppView(meta = {}) {
      const state = Store.getState();

      // Atualiza stats do Header sem recriar o input
      const pText = document.getElementById('header-progress-text');
      if (pText) pText.textContent = `${state.stats.percentage}%`;
      const pSvg = document.getElementById('header-progress-svg-path');
      if (pSvg) pSvg.setAttribute('stroke-dasharray', `${state.stats.percentage}, 100`);

      // Banner Stats
      if (bannerStatsRoot) {
        bannerStatsRoot.innerHTML = `
          <div class="stat-pill-box"><div class="stat-pill-val" style="color: var(--status-acquired);">${state.stats.acquired}</div><div class="stat-pill-lbl">Obtidos</div></div>
          <div class="stat-pill-box"><div class="stat-pill-val" style="color: var(--status-missing);">${state.stats.missing}</div><div class="stat-pill-lbl">Faltantes</div></div>
          <div class="stat-pill-box"><div class="stat-pill-val">${state.stats.percentage}%</div><div class="stat-pill-lbl">Progresso</div></div>
        `;
      }

      // Se não for evento de digitação, atualiza a barra de filtros
      if (!meta.isSearch && filterBarRoot) {
        filterBarRoot.innerHTML = UI.renderFilterBar(state);
      }

      // Grid / Seções
      if (itemsGridView) {
        if (state.viewMode === 'sections') {
          itemsGridView.innerHTML = UI.renderSectionView(state.sections, state);
        } else {
          if (state.items.length === 0) {
            itemsGridView.innerHTML = `
              <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">🕯️</div>
                <div class="empty-title">Nenhum Segredo Encontrado</div>
                <p class="empty-desc">Nenhum item corresponde à busca "${state.searchQuery}" ou filtros selecionados.</p>
              </div>
            `;
          } else {
            const cardsHtml = state.items.map(item => UI.renderItemCard(item, state)).join('');
            itemsGridView.innerHTML = `<div id="items-grid" class="items-grid">${cardsHtml}</div>`;
          }
        }
      }

      // Modais
      if (modalRoot) {
        modalRoot.innerHTML = state.selectedItem ? UI.renderModal(state.selectedItem, state.acquiredIds.includes(state.selectedItem.id), state.wishlistIds.includes(state.selectedItem.id)) : '';
      }
      if (statsModalRoot) {
        statsModalRoot.innerHTML = UI.renderStatsModal(state);
      }
    }

    // Debounce no Search Input (sem recriar o input, sem perda de foco)
    let searchTimer = null;
    document.addEventListener('input', (e) => {
      if (e.target.id === 'search-input') {
        clearTimeout(searchTimer);
        const query = e.target.value;
        searchTimer = setTimeout(() => {
          Store.setSearchQuery(query);
        }, 50);
      }

      if (e.target.classList.contains('stat-input-val')) {
        const stat = e.target.dataset.stat;
        Store.setStat(stat, e.target.value);
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'only-usable-checkbox') {
        AudioEngine.playClick();
        Store.toggleOnlyUsable();
      }
    });

    // Global Click Handler
    document.addEventListener('click', (e) => {
      // Toggle Acquired
      const acqBtn = e.target.closest('[data-action="toggle-acquired"]');
      if (acqBtn) {
        e.stopPropagation();
        AudioEngine.playChime();
        Store.toggleAcquired(acqBtn.dataset.id);
        return;
      }

      // Wishlist
      const wishBtn = e.target.closest('[data-action="wishlist"]');
      if (wishBtn) {
        e.stopPropagation();
        AudioEngine.playClick();
        Store.toggleWishlist(wishBtn.dataset.id);
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
      if (chip) {
        AudioEngine.playClick();
        Store.setCategory(chip.dataset.categoryId);
        return;
      }

      // Region Strip Card
      const regCard = e.target.closest('[data-region-card-id]');
      if (regCard) {
        AudioEngine.playClick();
        Store.setRegion(regCard.dataset.regionCardId);
        return;
      }

      // Status Pill
      const statusPill = e.target.closest('[data-status]');
      if (statusPill) {
        AudioEngine.playClick();
        Store.setStatusFilter(statusPill.dataset.status);
        return;
      }

      // View Mode Toggle
      const vmBtn = e.target.closest('[data-view-mode]');
      if (vmBtn) {
        AudioEngine.playClick();
        Store.setViewMode(vmBtn.dataset.viewMode);
        return;
      }

      // Build Preset
      const presetBtn = e.target.closest('[data-preset-id]');
      if (presetBtn) {
        AudioEngine.playClick();
        Store.setBuildPreset(presetBtn.dataset.presetId);
        return;
      }

      // Section Toggle
      const secHeader = e.target.closest('[data-toggle-sec]');
      if (secHeader) {
        const secId = secHeader.dataset.toggleSec;
        const c = document.getElementById(`sec-content-${secId}`);
        if (c) c.classList.toggle('collapsed');
        return;
      }

      // Sound Toggle
      if (e.target.closest('#sound-toggle-btn')) {
        Store.toggleSound();
        const sBtn = document.getElementById('sound-toggle-btn');
        if (sBtn) sBtn.textContent = Store.soundEnabled ? '🔔 Sons: ON' : '🔕 Sons: OFF';
        return;
      }

      // Stats Modal
      if (e.target.closest('#open-stats-btn')) { Store.toggleStatsModal(true); return; }
      if (e.target.id === 'stats-modal-close' || e.target.id === 'stats-dashboard-overlay') { Store.toggleStatsModal(false); return; }

      // Modal Close
      if (e.target.id === 'modal-close-btn' || e.target.id === 'item-modal-overlay') { Store.setSelectedItem(null); return; }

      // Clear Filters
      if (e.target.id === 'clear-filters-btn' || e.target.closest('#brand-home-btn')) {
        AudioEngine.playClick();
        Store.activeCategory = 'all';
        Store.activeRegion = 'all_regions';
        Store.statusFilter = 'all';
        Store.searchQuery = '';
        Store.onlyUsableByBuild = false;
        Store.activeBuildId = 'all_build';
        Store.userStats = { str: 99, dex: 99, int: 99, fai: 99, arc: 99 };
        const sInput = document.getElementById('search-input');
        if (sInput) sInput.value = '';
        Store.notify('filters_cleared');
        return;
      }

      // Modal inner toggle
      if (e.target.id === 'modal-acquired-toggle') {
        const item = Store.getState().selectedItem;
        if (item) {
          AudioEngine.playChime();
          Store.toggleAcquired(item.id);
        }
        return;
      }
      if (e.target.id === 'modal-wishlist-toggle') {
        const item = Store.getState().selectedItem;
        if (item) Store.toggleWishlist(item.id);
        return;
      }
    });

    // Keyboard Shortcuts
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

    Store.subscribe((event, state, meta) => updateAppView(meta));
    updateAppView();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
