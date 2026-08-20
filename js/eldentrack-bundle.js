/* ==========================================================================
   ELDENTRACK - UNIVERSAL BUNDLE (v4.0)
   Multi-Theme System (Erdtree, Moonlight, Shadow), 4 View Modes (Route, Grid,
   Categories, Checklist), Minimalist Cards, Compendium Side Drawer with Tabs,
   Massive Enriched Database with Walkthroughs, Nearest Graces & Missable Warnings.
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. NORMALIZAÇÃO DE TEXTO, FUZZY MATCH & BUSCA BILÍNGUE ---
  function normalizeText(str) {
    if (!str) return '';
    return str
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function levenshteinDistance(a, b) {
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  // Verifica se a palavra buscada corresponde a algum token do item.
  // REGRA PRINCIPAL: token do item deve CONTER a query (não o contrário, para evitar false positives).
  // Levenshtein só é usado quando os tamanhos são próximos (evita matching de palavras muito diferentes).
  function isFuzzyTokenMatch(queryWord, targetWords) {
    if (!queryWord || queryWord.length < 2) return false;
    const qLen = queryWord.length;

    for (const t of targetWords) {
      if (!t || t.length < 2) continue;

      // 1. O token do item contém a query (ex: "rapieira" contém "rapier" ou "rapieira")
      if (t.includes(queryWord)) return true;

      // 2. Tolerância Levenshtein: só quando os tamanhos são próximos (diferença <= 2)
      //    Isso evita que "rapiera" (7) case com "espada" (6) que tem chars completamente diferentes.
      const lenDiff = Math.abs(qLen - t.length);
      if (qLen >= 5 && t.length >= 5 && lenDiff <= 2) {
        const maxDist = lenDiff <= 1 ? 1 : 2;
        if (levenshteinDistance(queryWord, t) <= maxDist) return true;
      }
    }
    return false;
  }

  function highlightText(text, searchQuery) {
    if (!text || !searchQuery) return text || '';

    const cleanQuery = normalizeText(searchQuery);
    if (!cleanQuery || cleanQuery.length < 2) return text;

    let highlightTerms = [cleanQuery];
    for (const [enKey, ptList] of Object.entries(BILINGUAL_DICTIONARY)) {
      const normEn = normalizeText(enKey);
      const normPts = ptList.map(normalizeText);
      if (normEn.includes(cleanQuery) || cleanQuery.includes(normEn) || normPts.some(pt => pt.includes(cleanQuery) || cleanQuery.includes(pt))) {
        highlightTerms.push(normEn, ...normPts);
      }
    }

    const words = highlightTerms
      .flatMap(t => t.split(/\s+/))
      .map(w => normalizeText(w))
      .filter(w => w && w.length >= 2);

    const uniqueWords = [...new Set(words)].sort((a, b) => b.length - a.length);
    if (uniqueWords.length === 0) return text;

    const pattern = uniqueWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');

    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  const BILINGUAL_DICTIONARY = {
    'rapier': ['rapieira', 'rapiera', 'estocada', 'espadim', 'estoc', 'furadeira', 'formiga', 'antspur', 'rogier', 'agulha congelada'],
    'rapieira': ['rapier', 'rapiera', 'estocada', 'espadim', 'estoc', 'antspur', 'rogier', 'agulha', 'frozen needle'],
    'rapiera': ['rapieira', 'rapier', 'estocada', 'espadim', 'estoc', 'antspur', 'rogier', 'agulha', 'frozen needle', 'godskin stitcher', 'great epee'],
    'estocada': ['rapieira', 'rapier', 'rapiera', 'espadim', 'estoc', 'great epee', 'godskin stitcher', 'espigao'],
    'rivers of blood': ['rios de sangue', 'katana sangrenta', 'okina', 'sangue'],
    'moonveil': ['veu da lua', 'véu da lua', 'katana magica'],
    'dark moon greatsword': ['espada grande da lua sombria', 'ranni', 'luar', 'moonlight'],
    'blasphemous blade': ['lamina blasfema', 'lâmina blasfema', 'rykard', 'fogo'],
    'bolt of gransax': ['raio de gransax', 'lança lendaria', 'gransax', 'gransaks'],
    'bloodhound fang': ['presa do cao de caça', 'presa do cão de caça', 'darriwil'],
    'greatsword': ['espada colossal', 'guts', 'espada grande'],
    'sword of night and flame': ['espada da noite e da chama', 'noite e chama'],
    'nagakiba': ['nagakiba', 'katana longa', 'yura'],
    'eleonoras poleblade': ['lamina dupla de eleonora', 'lâmina dupla de eleonora', 'eleonora'],
    'hand of malenia': ['mao de malenia', 'mão de malenia', 'waterfowl', 'malenia'],
    'mohgwyns sacred spear': ['lança sagrada de mohgwyn', 'tridente de mohg', 'nihil', 'mohg'],
    'sacred relic sword': ['espada sagrada da reliquia', 'espada sagrada da relíquia', 'wave of gold', 'farme'],
    'reduvia': ['reduvia', 'adaga de sangue'],
    'ruins greatsword': ['espada grande das ruinas', 'espada grande das ruínas'],
    'meteorite staff': ['cajado do meteorito', 'pedregulho', 'rock sling'],
    'milady': ['milady', 'milade', 'miladi', 'espada leve', 'ensis', 'dlc'],
    'backhand blade': ['lamina reversa', 'lâmina reversa', 'dlc', 'blind spot'],
    'spear of the impaler': ['lança do empalador', 'lança de messmer', 'messmer', 'dlc'],
    'dragon hunters great katana': ['grande katana de caça dragoes', 'caça dragão', 'dlc'],
    'dryleaf arts': ['artes marciais', 'folha seca', 'luta desarmada', 'dane', 'dlc'],
    'radagon soreseal': ['selo doloroso de radagon', 'selo de radagon', 'atributos'],
    'marika soreseal': ['selo doloroso de marika', 'selo de marika'],
    'shard of alexander': ['fragmento de alexander', 'pote guerreiro', 'alexander', 'alexandre'],
    'erdtree favor': ['favor da tervore', 'favor da térvore'],
    'dragoncrest greatshield': ['brasao do dragao', 'grande escudo do dragao'],
    'godfrey icon': ['icone de godfrey', 'ícone de godfrey'],
    'radagon icon': ['icone de radagon', 'ícone de radagon', 'conjuracao'],
    'lord of bloods exultation': ['exultacao do lorde de sangue', 'exultação do lorde de sangue'],
    'two headed turtle': ['tartaruga de duas cabecas', 'tartaruga de duas cabeças', 'estamina', 'dlc'],
    'golden braid': ['tranca dourada', 'trança dourada', 'defesa sagrada', 'dlc'],
    'comet azur': ['cometa azur', 'raio laser', 'azur'],
    'stars of ruin': ['estrelas da ruina', 'estrelas da ruína', 'lusat'],
    'ranni dark moon': ['lua sombria de ranni', 'lua de ranni'],
    'golden vow': ['voto dourado', 'encantamento dourado', 'buff'],
    'flame grant me strength': ['chama conceda me forca', 'chama conceda-me força', 'buff'],
    'mimic tear': ['lagrima imitadora', 'lágrima imitadora', 'invocacao lendaria', 'clone'],
    'black knife tiche': ['tiche', 'faca negra', 'alecto'],
    'seppuku': ['seppuku', 'sepuku', 'cinza de sangue'],
    'bloodhound step': ['passo do cao de caca', 'passo do cão de caça'],
    'larval tear': ['lagrima larval', 'lágrima larval', 'respec', 'renascimento'],
    'scadutree fragment': ['fragmento de scadutree', 'fragmento da tervore das sombras', 'dlc', 'bênção'],
    'bull goat set': ['touro bode', 'armadura de touro bode', 'poise', 'tragoth'],
    'white mask': ['mascara branca', 'máscara branca', 'varre', 'varré'],
    'malenia': ['malenia', 'milenia', 'melania', 'espada de miquella', 'podridao escarlate'],
    'radahn': ['radahn', 'radan', 'radahan', 'flagelo estelar', 'general radahn'],
    'messmer': ['messmer', 'mesmer', 'o empalador', 'chama das sombras', 'dlc'],
    'bayle the dread': ['bayle', 'o pavoroso', 'pico irado', 'igon', 'dlc'],
    'promised consort radahn': ['consorte prometido radahn', 'radahn dlc', 'chefe final dlc', 'miquella']
  };

  // --- 2. CATEGORIAS ---
  const CATEGORIES = [
    { id: 'all', name: 'Todos os Segredos', icon: '✨', description: 'Catálogo completo de todos os itens, magias e segredos.', color: 'var(--gold-primary)' },
    { id: 'weapons', name: 'Armas & Escudos', icon: '⚔️', description: 'Espadas colossais, katanas, rapieiras, lanças, cajados e escudos.', color: '#e63946' },
    { id: 'talismans', name: 'Talismãs Lendários', icon: '💍', description: 'Acessórios que amplificam atributos e concedem poderes únicos.', color: '#ff9d00' },
    { id: 'spells', name: 'Magias & Encantamentos', icon: '🔮', description: 'Feitiçarias de Raya Lucaria e encantos divinos das Terras Intermédias.', color: '#38bdf8' },
    { id: 'ashes', name: 'Cinzas da Guerra', icon: '🗡️', description: 'Habilidades de combate lendárias e afinidades de armas.', color: '#bd6eff' },
    { id: 'key_items', name: 'Itens Chave & Lágrimas', icon: '🗝️', description: 'Lágrimas larvais (respec), lágrimas sagradas, sementes e Scadutree.', color: '#34d399' },
    { id: 'armor', name: 'Armaduras Notáveis', icon: '🛡️', description: 'Conjuntos pesados lendários e elmos com efeitos passivos.', color: '#a2adb9' },
    { id: 'cookbooks', name: 'Manuais & Pedras de Forja', icon: '📜', description: 'Manuais de artesanato e pedras de forja máxima (+25 / +10).', color: '#10b981' },
    { id: 'bosses', name: 'Chefes & Lembranças', icon: '👑', description: 'Semideuses, portadores de Grandes Runas e ameaças lendárias.', color: '#f59e0b' }
  ];

  // --- 3. REGIÕES (Ordem de Progressão da Campanha) ---
  const REGIONS = [
    { id: 'all_regions', name: 'Todas as Regiões', badge: '🌍', icon: '✨', order: 0, recommendedLevel: 'Níveis 1 — 150+', description: 'Todas as regiões das Terras Intermédias e do Reino das Sombras.' },
    { id: 'limgrave', name: 'Limgrave & Península do Choro', badge: '🌲', icon: '🏰', order: 1, recommendedLevel: 'Níveis 1 — 35', description: 'Ponto de partida. Primeira Graça, Castelo Tempesvéu e Castelo Morne.', accentColor: '#34d399' },
    { id: 'liurnia', name: 'Liurnia dos Lagos', badge: '💧', icon: '🌙', order: 2, recommendedLevel: 'Níveis 35 — 60', description: 'Academia de Raya Lucaria, Mansão Caria e Platô Lunar de Ranni.', accentColor: '#38bdf8' },
    { id: 'caelid', name: 'Caelid & Monte Dragão', badge: '🩸', icon: '☣️', order: 3, recommendedLevel: 'Níveis 50 — 75', description: 'Terras corrompidas pela Podridão, Castelo da Juba Vermelha e Forte Faroth.', accentColor: '#f43f5e' },
    { id: 'altus', name: 'Platô Altus & Monte Gelmir', badge: '🍁', icon: '🌋', order: 4, recommendedLevel: 'Níveis 60 — 85', description: 'Planaltos dourados aos pés da Térvore e Mansão Vulcânica de Rykard.', accentColor: '#f59e0b' },
    { id: 'underground', name: 'Rios Subterrâneos & Nokron', badge: '🌌', icon: '⭐', order: 5, recommendedLevel: 'Níveis 60 — 90', description: 'Rio Siofra, Rio Ainsel e as Cidades Eternas sob as estrelas.', accentColor: '#a855f7' },
    { id: 'leyndell', name: 'Leyndell, Capital Real & Esgotos', badge: '👑', icon: '🏛️', order: 6, recommendedLevel: 'Níveis 80 — 100', description: 'Metrópole do trono de Marika e o Fosso dos Três Dedos.', accentColor: '#dfc076' },
    { id: 'mountaintops', name: 'Montanhas dos Gigantes & Neve', badge: '❄️', icon: '🏔️', order: 7, recommendedLevel: 'Níveis 95 — 120', description: 'Picos gelados, Forja dos Gigantes e Campo de Neve Consagrado.', accentColor: '#93c5fd' },
    { id: 'farum_azula', name: 'Farum Azula Despedaçada', badge: '🌪️', icon: '⚡', order: 8, recommendedLevel: 'Níveis 110 — 135', description: 'Mausoléu celestial atemporal cercado por tempestades e Dragões.', accentColor: '#c084fc' },
    { id: 'haligtree', name: 'Árvore Sacra de Miquella & Elphael', badge: '🌸', icon: '🗡️', order: 9, recommendedLevel: 'Níveis 120 — 150', description: 'O refúgio de Miquella e morada suprema de Malenia.', accentColor: '#ec4899' },
    { id: 'shadow_realm', name: 'Reino das Sombras (DLC Shadow of the Erdtree)', badge: '🌑', icon: '🔥', order: 10, recommendedLevel: 'Níveis 130 — 180+ (Bênção da Scadutree)', description: 'Planície das Sepulturas, Belurat, Fortaleza das Sombras e Enir-Ilim.', accentColor: '#fb7185' }
  ];

  // --- 4. BASE DE DADOS ENRIQUECIDA ---
  const ITEMS_DATA = [
    /* ==========================================================================
       1. ARMAS LENDÁRIAS & EQUIPAMENTOS NOTÁVEIS (Weapons & Armaments)
       ========================================================================== */
    {
      id: 'w_dark_moon_greatsword',
      name: 'Espada Grande da Lua Sombria (Dark Moon Greatsword)',
      nameEn: 'Dark Moon Greatsword',
      category: 'weapons',
      subtype: 'Armas Lendárias',
      region: 'liurnia',
      location: 'Catedral de Manus Celes (Platô Lunar de Liurnia)',
      nearestGrace: 'Catedral de Manus Celes (Após derrotar Astel)',
      rarity: 'legendary',
      icon: '🗡️',
      secretType: 'Quest NPC',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 16, dex: 11, int: 38, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Mágico / Congelamento',
        scaling: 'INT (B), FOR (D), DES (D)',
        skill: 'Luar da Meia-Noite (Moonlight Greatsword)',
        fpCost: '32 FP',
        passive: 'Acúmulo de Congelamento (55)'
      },
      lore: 'A lendária espada de duas mãos concedida pelas rainhas de Caria aos seus nobres consortes. Imbuída com o poder gelado da lua cheia sombria.',
      guide: 'Recompensa final da lendária linha de missões da Bruxa Ranni. Você deve colocar o Anel do Juramento de Luar no corpo de Ranni sob a Catedral de Manus Celes.',
      walkthroughSteps: [
        '1. Inicie a missão de Ranni na Mansão Caria e derrote Radahn para liberar o acesso à Cidade Eterna de Nokron.',
        '2. Obtenha a Lâmina Assassina de Dedos em Nokron e entregue a Ranni para receber a Estátua Invertida de Caria.',
        '3. Atravesse o Lago de Podridão e derrote o chefe Astel, Filho Natural do Vazio.',
        '4. Suba pelo elevador até o Platô Lunar de Liurnia e siga até a Catedral de Manus Celes.',
        '5. Caia no buraco próximo ao ponto de graça e coloque o Anel no dedo da boneca de Ranni.'
      ],
      mapCoords: 'Subsolo da Catedral de Manus Celes, Platô Lunar.',
      youtubeQuery: 'elden ring como pegar espada grande da lua sombria localizacao pt br'
    },
    {
      id: 'w_rivers_of_blood',
      name: 'Rios de Sangue (Rivers of Blood Katana)',
      nameEn: 'Rivers of Blood',
      category: 'weapons',
      subtype: 'Katanas',
      region: 'mountaintops',
      location: 'Igreja do Repouso (Montanhas dos Gigantes)',
      nearestGrace: 'Igreja do Repouso / Lago Congelado',
      rarity: 'rare',
      icon: '⚔️',
      secretType: 'Invasor NPC',
      isMissable: true,
      missableWarning: 'CRÍTICO: Derrotar o Gigante de Fogo antes de pegar a arma impede a invasão de Okina nesta área!',
      requirements: { str: 12, dex: 18, int: 0, fai: 0, arc: 20 },
      combatStats: {
        damageType: 'Físico / Fogo / Sangramento',
        scaling: 'DES (B), ARC (D), FOR (E)',
        skill: 'Empilhador de Cadáveres (Corpse Piler)',
        fpCost: '17 FP (+9 FP sequência)',
        passive: 'Acúmulo de Sangramento (50)'
      },
      lore: 'A temível arma do espadachim Okina da Terra dos Juncos. Quando o próprio Mohg sentiu o corte afiado e a sede de sangue de Okina, ofereceu-lhe a vida de um demônio.',
      guide: 'Derrote o invasor Okina que aparece em frente à Igreja do Repouso nas Montanhas dos Gigantes antes do Gigante de Fogo.',
      walkthroughSteps: [
        '1. Após cruzar a Grande Ponte de Rold, siga para o leste pelas Montanhas dos Gigantes.',
        '2. Suba em direção ao sul contornando o vale até avistar a Igreja do Repouso.',
        '3. Aproxime-se da entrada da igreja a cavalo; a montaria sumirá e Okina invadirá.',
        '4. Derrote Okina para receber a Katana Rios de Sangue e a Máscara de Okina.'
      ],
      mapCoords: 'Entrada da Igreja do Repouso, sudeste do Lago Congelado.',
      youtubeQuery: 'elden ring como pegar rios de sangue localizacao pt br'
    },
    {
      id: 'w_moonveil',
      name: 'Véu da Lua (Moonveil Katana)',
      nameEn: 'Moonveil',
      category: 'weapons',
      subtype: 'Katanas',
      region: 'caelid',
      location: 'Túnel Gael (Fronteira entre Limgrave e Caelid)',
      nearestGrace: 'Entrada Traseira do Túnel Gael',
      rarity: 'rare',
      icon: '🌙',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 12, dex: 18, int: 23, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Mágico',
        scaling: 'INT (B), DES (B), FOR (E)',
        skill: 'Luz Transiente (Transient Moonlight)',
        fpCost: '15 FP (horizontal) / 20 FP (vertical)',
        passive: 'Acúmulo de Sangramento (50)'
      },
      lore: 'Katana forjada de Glintstone cintilante por artesãos de Sellia. Permite desembainhar a lâmina na velocidade da luz disparando rajadas de energia lunar.',
      guide: 'Derrote o Dragão de Magma no final do Túnel Gael na fronteira entre Limgrave e Caelid.',
      walkthroughSteps: [
        '1. Vá até o Túnel Gael descendo o penhasco no oeste de Caelid.',
        '2. Desça pelas plataformas de madeira derrotando os mineradores e soldados de Radahn.',
        '3. Abra a porta dupla de madeira do chefe no final do túnel.',
        '4. Derrote o chefe Dragão de Magma para receber a katana e 1 Coração de Dragão.'
      ],
      mapCoords: 'Sala do Chefe do Túnel Gael, oeste de Caelid.',
      youtubeQuery: 'elden ring como pegar veu da lua localizacao pt br'
    },
    {
      id: 'w_blasphemous_blade',
      name: 'Lâmina Blasfema (Blasphemous Blade)',
      nameEn: 'Blasphemous Blade',
      category: 'weapons',
      subtype: 'Armas Lendárias',
      region: 'altus',
      location: 'Mansão Vulcânica (Monte Gelmir)',
      nearestGrace: 'Mansão Vulcânica / Covil de Rykard',
      rarity: 'legendary',
      icon: '🔥',
      secretType: 'Lembrança',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 22, dex: 15, int: 0, fai: 21, arc: 0 },
      combatStats: {
        damageType: 'Físico / Fogo',
        scaling: 'FÉ (B), FOR (C), DES (C)',
        skill: 'Chamas do Saqueador (Taker\'s Flames)',
        fpCost: '30 FP',
        passive: 'Restaura HP ao derrotar qualquer inimigo (+4% HP +40)'
      },
      lore: 'A espada sagrada do Lorde Rykard, fundida aos corpos de guerreiros devorados pela Serpente Imortal. Dispara ondas devastadoras de fogo sagrado profano que curam quem a empunha.',
      guide: 'Derrote Lorde Rykard na Mansão Vulcânica e troque a Lembrança do Blasfemo com Enia na Mesa-Redonda.',
      walkthroughSteps: [
        '1. Acesse a Mansão Vulcânica no Monte Gelmir completando os contratos ou explorando a masmorra.',
        '2. Pegue o portal de teleporte para a antecâmara da Serpente Devoradora de Deuses.',
        '3. Equipe a Lança Caçadora de Serpentes no início da arena e derrote Rykard em ambas as fases.',
        '4. Teleporte para a Mesa-Redonda e fale com a Leitora de Dedos Enia para resgatar a espada.'
      ],
      mapCoords: 'Templo de Eiglay / Arena de Rykard, Monte Gelmir.',
      youtubeQuery: 'elden ring como pegar lamina blasfema rykard pt br'
    },
    {
      id: 'w_bolt_of_gransax',
      name: 'Raio de Gransax (Bolt of Gransax)',
      nameEn: 'Bolt of Gransax',
      category: 'weapons',
      subtype: 'Armas Lendárias',
      region: 'leyndell',
      location: 'Lança Gigante de Pedra (Leyndell Real)',
      nearestGrace: 'Santuário de Erdtree (Leyndell)',
      rarity: 'legendary',
      icon: '⚡',
      secretType: 'Exploração Secreta',
      isMissable: true,
      missableWarning: 'CRÍTICO: Esta arma LENDÁRIA se torna permanentemente INACESSÍVEL após derrotar Maliketh em Farum Azula (pois a Capital vira cinzas)!',
      requirements: { str: 20, dex: 40, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Raio',
        scaling: 'DES (B), FOR (D)',
        skill: 'Lança de Raio Ancestral (Ancient Lightning Spear)',
        fpCost: '25 FP (carregável)',
        passive: 'Dano extra contra dragões (+20%)'
      },
      lore: 'Armamento lendário talhado a partir da colossal lança do Dragão Ancestral Gransax que quebrou as muralhas intransponíveis de Leyndell na antiguidade.',
      guide: 'Pule e caminhe sobre a gigantesca lança de pedra no coração de Leyndell antes de transformar a capital em cinzas.',
      walkthroughSteps: [
        '1. Teleporte para o Ponto de Graça \'Santuário da Térvore\' após derrotar Godfrey (Fantasma Dourado).',
        '2. Saia pela porta oeste e desça pelo elevador mecânico.',
        '3. Desça a escadaria até a sacada com vista para a cidade e olhe para o corrimão esquerdo.',
        '4. Pule sobre a cerca e caia na haste da colossal lança de pedra fincada no chão.',
        '5. Escale a haste até o topo para coletar a arma brilhante.'
      ],
      mapCoords: 'Topo da Lança de Gransax, centro de Leyndell.',
      youtubeQuery: 'elden ring como pegar raio de gransax localizacao pt br'
    },
    {
      id: 'w_sword_of_night_and_flame',
      name: 'Espada da Noite e da Chama (Sword of Night and Flame)',
      nameEn: 'Sword of Night and Flame',
      category: 'weapons',
      subtype: 'Armas Lendárias',
      region: 'liurnia',
      location: 'Mansão Caria (Norte de Liurnia)',
      nearestGrace: 'Nível Inferior da Mansão Caria',
      rarity: 'legendary',
      icon: '✨',
      secretType: 'Baú Escondido',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 12, dex: 12, int: 24, fai: 24, arc: 0 },
      combatStats: {
        damageType: 'Físico / Mágico / Fogo',
        scaling: 'INT (B), FÉ (B), FOR (D), DES (D)',
        skill: 'Postura da Noite e da Chama (Night-and-Flame Stance)',
        fpCost: '19 FP (raio cometa) / 23 FP (varredura de fogo)',
        passive: 'Dano elemental triplo único no jogo'
      },
      lore: 'Espada lendária forjada na Mansão Caria comemorando a antiga união entre os astrólogos da lua e os gigantes do fogo.',
      guide: 'Pule nos telhados a partir das passarelas elevadas da Mansão Caria e caia pelo alçapão da sala do baú.',
      walkthroughSteps: [
        '1. A partir da Graça \'Nível Inferior da Mansão Caria\', ande pelas passarelas elevadas até o terceiro cruzamento.',
        '2. Olhe para baixo à esquerda e pule no telhado do prédio inferior.',
        '3. Pule para o telhado seguinte com um alçapão e desça pela escada de mão.',
        '4. Abra o baú de madeira no quarto trancado para pegar a espada.'
      ],
      mapCoords: 'Sala trancada sob os telhados da Mansão Caria, Liurnia.',
      youtubeQuery: 'elden ring como pegar espada da noite e da chama pt br'
    },
    {
      id: 'w_bloodhounds_fang',
      name: 'Presa do Cão de Caça (Bloodhound\'s Fang)',
      nameEn: 'Bloodhound\'s Fang',
      category: 'weapons',
      subtype: 'Espadas Curvas Grandes',
      region: 'limgrave',
      location: 'Cadeia Eterna do Cão Solitário (Sul de Limgrave)',
      nearestGrace: 'Ponte do Sacrifício / Lago Agheel Sul',
      rarity: 'rare',
      icon: '🐾',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 18, dex: 17, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Sangramento',
        scaling: 'DES (B), FOR (C)',
        skill: 'Finesse do Cão de Caça (Bloodhound\'s Finesse)',
        fpCost: '8 FP (+12 FP ataque forte)',
        passive: 'Acúmulo de Sangramento (55) / Aceita buffs de graxa e magia'
      },
      lore: 'A afiada espada curva de Darriwil, Cavaleiro Cão de Caça. Possui ataques acrobáticos com finta de teleporte e sangramento devastador.',
      guide: 'Entre na Cadeia Eterna no topo da colina ao sul do Lago Agheel e derrote o Cavaleiro Darriwil.',
      walkthroughSteps: [
        '1. Suba a colina a sudoeste da Ponte do Sacrifício em Limgrave.',
        '2. Interaja com o círculo de pedra no chão para entrar na Cadeia Eterna.',
        '3. (Opcional) Se você falou com Blaidd nas Ruínas de Mistwood, pode invocá-lo usando o sinal no chão.',
        '4. Derrote Darriwil para obter a Presa do Cão de Caça imediatamente.'
      ],
      mapCoords: 'Cadeia Eterna do Cão Solitário, sul de Limgrave.',
      youtubeQuery: 'elden ring como pegar presa do cao de caca pt br'
    },
    {
      id: 'w_guts_greatsword',
      name: 'Espada Grande / Guts (Greatsword Colossal)',
      nameEn: 'Greatsword',
      category: 'weapons',
      subtype: 'Espadas Colossais',
      region: 'caelid',
      location: 'Carruagem Abandonada (Entrada Noroeste de Caelid)',
      nearestGrace: 'Varanda com Vista para a Podridão',
      rarity: 'rare',
      icon: '🗡️',
      secretType: 'Baú Escondido',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 31, dex: 12, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico Pesado / Alto Poise',
        scaling: 'FOR (A - Pesada), DES (D)',
        skill: 'Piso do Selo (Upward Cut) / Aceita Cinzas de Guerra',
        fpCost: '5 FP',
        passive: 'Defesa de Bloqueio Altíssima (67% físico)'
      },
      lore: 'Um colossal pedaço de ferro forjado sem cortes refinados. Uma homenagem explícita ao lendário espadachim negro Guts do mangá Berserk.',
      guide: 'Abra o baú traseiro da carruagem funerária abandonada na estrada principal da entrada de Caelid.',
      walkthroughSteps: [
        '1. A partir da Graça \'Varanda com Vista para a Podridão\' na entrada de Caelid, siga a estrada para o leste.',
        '2. Aviste a carruagem funerária preta guardada por cães mutantes gigantes e corvos.',
        '3. Pule na traseira da carruagem e abra o baú sem precisar lutar contra os monstros.'
      ],
      mapCoords: 'Carruagem na estrada noroeste de Caelid.',
      youtubeQuery: 'elden ring guts greatsword colossal location'
    },
    {
      id: 'w_nagakiba',
      name: 'Nagakiba (Katana Longa de Yura)',
      nameEn: 'Nagakiba',
      category: 'weapons',
      subtype: 'Katanas',
      region: 'altus',
      location: 'Segunda Igreja de Marika (Platô Altus)',
      nearestGrace: 'Encruzilhada da Estrada de Altus',
      rarity: 'rare',
      icon: '⚔️',
      secretType: 'Quest NPC',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 18, dex: 22, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Sangramento',
        scaling: 'DES (A - Afiada), FOR (D)',
        skill: 'Estocada Perfurante (Piercing Fang)',
        fpCost: '9 FP',
        passive: 'Alcance mais longo de todas as katanas / Sangramento (45)'
      },
      lore: 'Katana de lâmina descomunal empunhada por Yura, o Caçador de Dedos Sangrentos. Possui o maior alcance de estocada de sua classe.',
      guide: 'Complete a quest de Yura ou encontre seu corpo caído na Segunda Igreja de Marika no Platô Altus.',
      walkthroughSteps: [
        '1. Ajude Yura em Limgrave (derrotando Nerijus) e na ponte de Raya Lucaria.',
        '2. Vá até a Segunda Igreja de Marika no Platô Altus.',
        '3. Fale com Yura caído no chão e pegue a Nagakiba.',
        '4. Derrote a invasora Eleonora que aparece em seguida.'
      ],
      mapCoords: 'Segunda Igreja de Marika, centro de Altus.',
      youtubeQuery: 'elden ring nagakiba katana location guide'
    },
    {
      id: 'w_eleonoras_poleblade',
      name: 'Lâmina Dupla de Eleonora (Eleonora\'s Poleblade)',
      nameEn: 'Eleonora\'s Poleblade',
      category: 'weapons',
      subtype: 'Lâminas Duplas',
      region: 'altus',
      location: 'Segunda Igreja de Marika (Platô Altus)',
      nearestGrace: 'Segunda Igreja de Marika',
      rarity: 'rare',
      icon: '🩸',
      secretType: 'Invasor NPC',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 12, dex: 21, int: 0, fai: 0, arc: 19 },
      combatStats: {
        damageType: 'Físico / Fogo / Sangramento',
        scaling: 'DES (C), ARC (D), FOR (E)',
        skill: 'Dança da Lâmina de Sangue (Bloodblade Dance)',
        fpCost: '11 FP (+6 FP sequência)',
        passive: 'Acúmulo de Sangramento (33 por golpe rápido)'
      },
      lore: 'Lâmina dupla de aço carmesim imbuída com o sangue amaldiçoado de Mohg. Executa acrobacias aéreas com explosões de chamas de sangue.',
      guide: 'Derrote a invasora Eleonora, Dedo Sangrento Violeta, na Segunda Igreja de Marika no Platô Altus.',
      walkthroughSteps: [
        '1. Vá até a Segunda Igreja de Marika no centro do Platô Altus.',
        '2. Ao entrar na igreja, Eleonora invadirá seu mundo.',
        '3. Derrote Eleonora para receber a Lâmina Dupla e a Lágrima de Cristal Purificadora.'
      ],
      mapCoords: 'Segunda Igreja de Marika, Platô Altus.',
      youtubeQuery: 'elden ring eleonoras poleblade location'
    },
    {
      id: 'w_hand_of_malenia',
      name: 'Mão de Malenia (Hand of Malenia Katana)',
      nameEn: 'Hand of Malenia',
      category: 'weapons',
      subtype: 'Katanas',
      region: 'haligtree',
      location: 'Raízes da Árvore Sacra (Elphael)',
      nearestGrace: 'Raízes da Árvore Sacra (Haligtree)',
      rarity: 'legendary',
      icon: '🌸',
      secretType: 'Lembrança',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 16, dex: 48, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Sangramento',
        scaling: 'DES (B), FOR (E)',
        skill: 'Dança das Aves Aquáticas (Waterfowl Dance)',
        fpCost: '12 FP (+9 FP +9 FP)',
        passive: 'Acúmulo de Sangramento (50)'
      },
      lore: 'A lâmina dourada integrada à prótese de braço da Semideusa Malenia. Permite executar o temido turbilhão de golpes Waterfowl Dance.',
      guide: 'Derrote Malenia na base da Árvore Sacra de Miquella e troque sua Lembrança na Mesa-Redonda.',
      walkthroughSteps: [
        '1. Desça até a câmara mais profunda de Elphael na Árvore Sacra de Miquella.',
        '2. Derrote a chefe Malenia, Espada de Miquella, em ambas as fases.',
        '3. Fale com a Leitora de Dedos Enia na Mesa-Redonda e selecione a Katana.'
      ],
      mapCoords: 'Câmara do Chefe Malenia, Elphael.',
      youtubeQuery: 'elden ring hand of malenia location guide'
    },
    {
      id: 'w_mohgwyns_sacred_spear',
      name: 'Lança Sagrada de Mohgwyn (Mohgwyn\'s Sacred Spear)',
      nameEn: 'Mohgwyn\'s Sacred Spear',
      category: 'weapons',
      subtype: 'Lanças Grandes',
      region: 'underground',
      location: 'Palácio de Mohgwyn (Subsolo do Rio Siofra)',
      nearestGrace: 'Mausoléu da Dinastia Mohgwyn',
      rarity: 'legendary',
      icon: '🔱',
      secretType: 'Lembrança',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 24, dex: 14, int: 0, fai: 0, arc: 27 },
      combatStats: {
        damageType: 'Físico / Fogo / Sangramento',
        scaling: 'ARC (B), FOR (C), DES (D)',
        skill: 'Ritual da Bênção de Sangue (Bloodboon Ritual)',
        fpCost: '20 FP (+20 FP +20 FP)',
        passive: 'Dano de Sangramento em Área (atravessa paredes)'
      },
      lore: 'Tridente colossal de três pontas do Lorde do Sangue Mohg. Canaliza a Mãe Sem Forma para derramar sangue em chamas sobre todos os inimigos ao redor.',
      guide: 'Derrote Mohg, Lorde do Sangue, no Palácio de Mohgwyn e troque sua Lembrança com Enia na Mesa-Redonda.',
      walkthroughSteps: [
        '1. Acesse o Palácio de Mohgwyn pela quest de Varré ou pelo portal de gelo nas Montanhas dos Gigantes.',
        '2. Suba o mausoléu até o topo do elevador.',
        '3. Derrote Mohg (use a Lágrima Purificadora no frasco para anular o Nihil).',
        '4. Troque a Lembrança do Lorde do Sangue na Mesa-Redonda.'
      ],
      mapCoords: 'Arena de Mohg, Palácio de Mohgwyn.',
      youtubeQuery: 'elden ring mohgwyn sacred spear location'
    },
    {
      id: 'w_sacred_relic_sword',
      name: 'Espada Sagrada da Relíquia (Sacred Relic Sword)',
      nameEn: 'Sacred Relic Sword',
      category: 'weapons',
      subtype: 'Armas Lendárias',
      region: 'leyndell',
      location: 'Trono de Elden (Chefe Final)',
      nearestGrace: 'Fraturada Marika (Após o Final)',
      rarity: 'legendary',
      icon: '✨',
      secretType: 'Lembrança',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 14, dex: 24, int: 0, fai: 22, arc: 0 },
      combatStats: {
        damageType: 'Físico / Sagrado',
        scaling: 'FÉ (B), DES (B), FOR (D)',
        skill: 'Onda Dourada (Wave of Gold)',
        fpCost: '42 FP',
        passive: 'Melhor arma de farme de Runas do jogo (Palácio Mohgwyn)'
      },
      lore: 'Espada forjada do corpo divino de Radagon pela Fera Primitiva de Elden. Dispara um gigantesco maremoto dourado que varre hordas inteiras de inimigos.',
      guide: 'Derrote a Fera Primitiva de Elden no final do jogo e troque a Lembrança de Elden na Mesa-Redonda.',
      walkthroughSteps: [
        '1. Conclua a queima da Térvore e derrote Godfrey e Radagon.',
        '2. Derrote a Fera Primitiva de Elden para obter a Lembrança de Elden.',
        '3. Vá até a Leitora de Dedos Enia na Mesa-Redonda e forje a espada.'
      ],
      mapCoords: 'Arena Final do Trono de Elden.',
      youtubeQuery: 'elden ring sacred relic sword wave of gold farm'
    },
    {
      id: 'w_reduvia',
      name: 'Reduvia (Adaga de Sangramento)',
      nameEn: 'Reduvia',
      category: 'weapons',
      subtype: 'Adagas',
      region: 'limgrave',
      location: 'Ravina de Agheel (Norte de Limgrave)',
      nearestGrace: 'Caverna de Murkwater / Lago Agheel',
      rarity: 'rare',
      icon: '🗡️',
      secretType: 'Invasor NPC',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 5, dex: 13, int: 0, fai: 0, arc: 13 },
      combatStats: {
        damageType: 'Físico / Sangramento',
        scaling: 'ARC (B), DES (C), FOR (E)',
        skill: 'Lâmina de Sangue da Reduvia (Reduvia Blood Blade)',
        fpCost: '6 FP',
        passive: 'Acúmulo de Sangramento Rápido (50)'
      },
      lore: 'Adaga curva entalhada com dentes irregulares que projeta projéteis cortantes de sangue coagulado.',
      guide: 'Siga pelo riacho ao norte do Lago Agheel e derrote o invasor Dedo Sangrento Nerijus (Yura virá ajudar).',
      walkthroughSteps: [
        '1. Entre na ravina aquática que sobe ao norte do Lago Agheel em Limgrave.',
        '2. O invasor Nerijus surgirá com duas adagas.',
        '3. Sobreviva por alguns segundos até o NPC Yura surgir para ajudar.',
        '4. Derrote Nerijus para receber a adaga Reduvia.'
      ],
      mapCoords: 'Ravina ao norte do Lago Agheel, Limgrave.',
      youtubeQuery: 'elden ring reduvia dagger location guide'
    },
    {
      id: 'w_ruins_greatsword',
      name: 'Espada Grande das Ruínas (Ruins Greatsword)',
      nameEn: 'Ruins Greatsword',
      category: 'weapons',
      subtype: 'Armas Lendárias',
      region: 'caelid',
      location: 'Castelo da Juba Vermelha (Caelid)',
      nearestGrace: 'Praça do Castelo da Juba Vermelha',
      rarity: 'legendary',
      icon: '🪨',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 50, dex: 0, int: 16, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Gravidade',
        scaling: 'FOR (S), INT (D)',
        skill: 'Onda de Destruição (Wave of Destruction)',
        fpCost: '25 FP',
        passive: 'Dano de impacto colossal com escala máxima de Força'
      },
      lore: 'Espada colossal lendária esculpida a partir dos destroços de um templo que caiu do céu após ser atingido por um meteorito.',
      guide: 'Derrote a dupla de chefes Cavaleiro do Crisol e Guerreiro Bastardo na praça do Castelo da Juba Vermelha (quando o festival de Radahn não estiver ativo).',
      walkthroughSteps: [
        '1. Vá até o Castelo da Juba Vermelha antes do festival ou converse com Jerren após derrotar Radahn para resetar a praça.',
        '2. Entre na névoa da praça para enfrentar a dupla de chefes.',
        '3. Derrote ambos para receber a Espada Grande das Ruínas.'
      ],
      mapCoords: 'Praça do Castelo da Juba Vermelha, Caelid.',
      youtubeQuery: 'elden ring ruins greatsword location guide'
    },
    {
      id: 'w_meteorite_staff',
      name: 'Cajado do Meteorito (Meteorite Staff)',
      nameEn: 'Meteorite Staff',
      category: 'weapons',
      subtype: 'Cajados de Feitiçaria',
      region: 'caelid',
      location: 'Pântano de Aeonia / Ruínas da Rua dos Sábios',
      nearestGrace: 'Sul do Pântano de Aeonia',
      rarity: 'rare',
      icon: '🔮',
      secretType: 'Exploração Secreta',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 6, dex: 0, int: 18, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Escalonamento Mágico S NATIVO',
        scaling: 'INT (S - Nativo sem upgrades)',
        skill: 'Sem Cinza de Guerra',
        fpCost: '0 FP',
        passive: 'Aumenta o dano de magias de gravidade (Pedregulho/Rock Sling) em +30%'
      },
      lore: 'Cajado cravado com fragmento de meteorito escuro. O melhor cajado para o início e meio de jogo para magos.',
      guide: 'Em um corpo pendurado na janela das Ruínas da Rua dos Sábios no pântano podre de Caelid.',
      walkthroughSteps: [
        '1. Entre nas Ruínas da Rua dos Sábios no oeste do Pântano de Aeonia em Caelid.',
        '2. Localize a torre em ruínas cercada por plantas venenosas.',
        '3. Pegue o cajado no cadáver pendurado no parapeito da janela.'
      ],
      mapCoords: 'Ruínas da Rua dos Sábios, Caelid.',
      youtubeQuery: 'elden ring meteorite staff and rock sling location'
    },
    {
      id: 'w_antspur_rapier',
      name: 'Rapieira de Espigão de Formiga (Antspur Rapier)',
      nameEn: 'Antspur Rapier',
      category: 'weapons',
      subtype: 'Rapieiras & Estocada',
      region: 'altus',
      location: 'Campos a oeste do Castelo Sombrio (The Shaded Castle)',
      nearestGrace: 'Muralhas do Castelo Sombrio (Oeste)',
      rarity: 'rare',
      icon: '🐜',
      secretType: 'Invasor NPC',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 10, dex: 20, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Podridão Escarlate Nativa',
        scaling: 'DES (C), FOR (D)',
        skill: 'Empurrão com Finta (Aceita Cinzas de Sangue ou Veneno)',
        fpCost: '7 FP',
        passive: 'Podridão Escarlate Nativa (55) + Pode acumular Veneno e Sangramento juntos!'
      },
      lore: 'Rapieira entalhada a partir do ferrão escarlate de uma formiga gigante. Uma das armas mais fortes do jogo por permitir infligir Podridão, Veneno e Sangramento em uma única arma.',
      guide: 'Derrote o invasor NPC Maleigh Marais no descampado a oeste das muralhas do Castelo Sombrio no Platô Altus.',
      walkthroughSteps: [
        '1. Vá para o Platô Altus e desça até o vale pantanoso do Castelo Sombrio.',
        '2. Cavalgue pelos campos abertos a oeste das muralhas externas.',
        '3. O nobre Maleigh Marais invadirá a pé empunhando a rapieira.',
        '4. Derrote Maleigh para obter a Rapieira Antspur e seu conjunto de armadura Marais.'
      ],
      mapCoords: 'Desfiladeiro a oeste de The Shaded Castle, Platô Altus.',
      youtubeQuery: 'elden ring antspur rapier location guide'
    },
    {
      id: 'w_rogiers_rapier',
      name: 'Rapieira de Rogier +8 (Rogier\'s Rapier)',
      nameEn: 'Rogier\'s Rapier',
      category: 'weapons',
      subtype: 'Rapieiras & Estocada',
      region: 'limgrave',
      location: 'Mesa-Redonda (Após derrotar Godrick)',
      nearestGrace: 'Mesa-Redonda (Varanda)',
      rarity: 'rare',
      icon: '🗡️',
      secretType: 'Quest NPC',
      isMissable: true,
      missableWarning: 'Fale com Rogier na capela do Castelo Tempesvéu antes de avançar a quest de Ranni ao ponto de não vê-lo mais.',
      requirements: { str: 8, dex: 17, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Mágico (Refinada +8 de Fábrica)',
        scaling: 'DES (C), FOR (E)',
        skill: 'Falange de Lâminas Pedrilhantes (Glintblade Phalanx)',
        fpCost: '10 FP',
        passive: 'Já vem no nível +8 com cinza de quebra de postura colossal'
      },
      lore: 'A nobre rapieira ricamente adornada do Feiticeiro Rogier. Já vem aprimorada em +8 e equipada com a poderosíssima Cinza Falange de Lâminas.',
      guide: 'Fale com Rogier na Capela do Castelo Tempesvéu e, após derrotar Godrick, converse com ele na sacada da Mesa-Redonda.',
      walkthroughSteps: [
        '1. No Castelo Tempesvéu, visite a capela lateral e converse com Rogier.',
        '2. Derrote o chefe Godrick, o Enxertado.',
        '3. Vá para a Mesa-Redonda e fale com Rogier sentado na sacada.',
        '4. Esgote seus diálogos para receber a Rapieira +8 de presente.'
      ],
      mapCoords: 'Sacada da Mesa-Redonda.',
      youtubeQuery: 'elden ring rogiers rapier location guide'
    },
    {
      id: 'w_frozen_needle',
      name: 'Agulha Congelada / Rapieira de Gelo (Frozen Needle)',
      nameEn: 'Frozen Needle',
      category: 'weapons',
      subtype: 'Rapieiras & Estocada',
      region: 'liurnia',
      location: 'Ruínas de Kingsrealm (Liurnia dos Lagos)',
      nearestGrace: 'Estrada para a Mansão Caria / Kingsrealm',
      rarity: 'rare',
      icon: '❄️',
      secretType: 'Parede/Chão Falso',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 11, dex: 18, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Congelamento / Projétil Gratuito',
        scaling: 'DES (B), FOR (D)',
        skill: 'Empalar (Impaling Thrust)',
        fpCost: '9 FP',
        passive: 'Acúmulo de Congelamento (60) / Ataque forte dispara agulhas de gelo sem gastar FP'
      },
      lore: 'Rapieira forjada em gelo perene que jamais derrete. Seu ataque forte pesado arremessa dardos de gelo puro à distância sem consumir FP.',
      guide: 'Ataque o chão ilusório de tábuas nas Ruínas de Kingsrealm em Liurnia e derrote o chefe Royal Revenant na cripta.',
      walkthroughSteps: [
        '1. Siga pela margem noroeste de Liurnia em direção à Mansão Caria.',
        '2. Nas Ruínas de Kingsrealm, localize o piso oco entre as colunas.',
        '3. Role ou golpeie o chão para revelar a escadaria subterrânea secreta.',
        '4. Derrote o chefe Royal Revenant e abra o baú na câmara dos fundos.'
      ],
      mapCoords: 'Cripta ilusória das Ruínas de Kingsrealm, oeste de Liurnia.',
      youtubeQuery: 'elden ring frozen needle rapier location'
    },
    {
      id: 'w_godskin_stitcher',
      name: 'Costureiro da Pele Nobre (Godskin Stitcher)',
      nameEn: 'Godskin Stitcher',
      category: 'weapons',
      subtype: 'Grandes Espadas de Estocada (Rapieira Pesada)',
      region: 'altus',
      location: 'Templo de Eiglay (Mansão Vulcânica)',
      nearestGrace: 'Templo de Eiglay (Monte Gelmir)',
      rarity: 'rare',
      icon: '🗡️',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 14, dex: 17, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Estocada Pesada',
        scaling: 'DES (B), FOR (C)',
        skill: 'Finesse de Estocada (Impaling Thrust)',
        fpCost: '14 FP',
        passive: 'Excelente alcance de estocada pesada com dano de perfuração crítico'
      },
      lore: 'Espada de estocada pesada em espiral usada pelos Nobres da Pele Divina para costurar e perfurar a carne de deuses.',
      guide: 'Derrote o chefe Nobre da Pele Divina (Godskin Noble) dentro da igreja do Templo de Eiglay na Mansão Vulcânica.',
      walkthroughSteps: [
        '1. Atravesse as masmorras da Mansão Vulcânica no Monte Gelmir até o Templo de Eiglay.',
        '2. Entre na igreja para enfrentar o Nobre da Pele Divina.',
        '3. Derrote o chefe para garantir o drop do Costureiro da Pele Nobre e ativar o elevador.'
      ],
      mapCoords: 'Templo de Eiglay, Mansão Vulcânica.',
      youtubeQuery: 'elden ring godskin stitcher location guide'
    },
    {
      id: 'w_great_epee',
      name: 'Grande Épée (Great Épée - Grande Espada de Estocada)',
      nameEn: 'Great Épée',
      category: 'weapons',
      subtype: 'Grandes Espadas de Estocada',
      region: 'limgrave',
      location: 'Acampamento Inimigo ao sul do Lago Agheel (Limgrave)',
      nearestGrace: 'Lago Agheel Sul (Limgrave)',
      rarity: 'common',
      icon: '⚔️',
      secretType: 'Baú Escondido',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 15, dex: 16, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Estocada e Corte',
        scaling: 'FOR (C), DES (C)',
        skill: 'Investida Empaladora (Impaling Thrust)',
        fpCost: '9 FP',
        passive: 'Pode atacar protegido atrás de escudos'
      },
      lore: 'Grande espada de estocada pesada que combina cortes pesados e estocadas longas. Pode ser obtida logo no começo de Limgrave.',
      guide: 'Em um baú protegido por soldados no pequeno acampamento no topo da colina a sudeste do Lago Agheel.',
      walkthroughSteps: [
        '1. A partir da Graça \'Lago Agheel Sul\', suba a encosta em direção ao leste.',
        '2. Encontre o acampamento de soldados de Godrick.',
        '3. Abra o baú de madeira dentro da tenda no topo da colina.'
      ],
      mapCoords: 'Acampamento ao sul do Lago Agheel, Limgrave.',
      youtubeQuery: 'elden ring great epee location guide'
    },

    /* --- DLC SHADOW OF THE ERDTREE WEAPONS --- */
    {
      id: 'w_milady',
      name: 'Milady (Espada Leve Elegante DLC)',
      nameEn: 'Milady Light Greatsword',
      category: 'weapons',
      subtype: 'Espadas Leves',
      region: 'shadow_realm',
      location: 'Castelo Ensis (Reino das Sombras)',
      nearestGrace: 'Posto Avançado do Castelo Ensis',
      rarity: 'dlc',
      icon: '🗡️',
      secretType: 'Baú Escondido',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 12, dex: 17, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Fluido Elegante',
        scaling: 'DES (A - Afiada), FOR (C)',
        skill: 'Estocada Empaladora (ou Asa Alada / Wing Stance)',
        fpCost: '8 FP',
        passive: 'Nova classe de arma da DLC com combos fluidos contínuos'
      },
      lore: 'Espada leve com empunhadura refinada dos cavaleiros nobres de Ensis. Permite transições acrobáticas ultrarrápidas entre golpes e estocadas.',
      guide: 'No topo da torre de vigia do lado esquerdo do primeiro pátio do Castelo Ensis na DLC.',
      walkthroughSteps: [
        '1. Entre no Castelo Ensis pela ponte principal da Planície das Sepulturas.',
        '2. No primeiro pátio com soldados e cães, suba a escadaria à esquerda.',
        '3. Escale a torre de vigia pela escada de mão e abra o baú no topo.'
      ],
      mapCoords: 'Torre de vigia esquerda do Castelo Ensis, DLC.',
      youtubeQuery: 'elden ring dlc milady location guide'
    },
    {
      id: 'w_backhand_blade',
      name: 'Lâmina Reversa (Backhand Blade DLC)',
      nameEn: 'Backhand Blade',
      category: 'weapons',
      subtype: 'Lâminas Reversas',
      region: 'shadow_realm',
      location: 'Planície das Sepulturas (Reino das Sombras)',
      nearestGrace: 'Planície das Sepulturas (Primeira Graça da DLC)',
      rarity: 'dlc',
      icon: '⚔️',
      secretType: 'Exploração Secreta',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 10, dex: 13, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico Rápido / Acrobático',
        scaling: 'DES (S - Afiada), FOR (D)',
        skill: 'Corte Cego (Blind Spot)',
        fpCost: '9 FP',
        passive: 'Empunhadura dupla automática com esquiva rápida nos flancos'
      },
      lore: 'Lâminas curvas empunhadas na empunhadura invertida. Permite contornar os escudos dos inimigos com investidas laterais ultrarrápidas.',
      guide: 'Em um pequeno mausoléu de pedra a nordeste do primeiro ponto de graça da Planície das Sepulturas na DLC.',
      walkthroughSteps: [
        '1. Inicie a DLC e ative a primeira Graça da Planície das Sepulturas.',
        '2. Cavalgue em linha reta para o nordeste passando pelos espectros nas árvores.',
        '3. Localize uma pequena estrutura funerária de pedra cercada por inquisidores.',
        '4. Pegue o brilho dourado no pedestal diante da tumba.'
      ],
      mapCoords: 'Nordeste da Planície das Sepulturas, Reino das Sombras.',
      youtubeQuery: 'elden ring backhand blade location dlc'
    },
    {
      id: 'w_spear_of_the_impaler',
      name: 'Lança do Empalador (Spear of the Impaler DLC)',
      nameEn: 'Spear of the Impaler',
      category: 'weapons',
      subtype: 'Lanças Grandes',
      region: 'shadow_realm',
      location: 'Fortaleza das Sombras (Câmara Escura)',
      nearestGrace: 'Câmara Escura (Fortaleza das Sombras)',
      rarity: 'dlc',
      icon: '🔥',
      secretType: 'Lembrança',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 14, dex: 35, int: 0, fai: 18, arc: 0 },
      combatStats: {
        damageType: 'Físico / Fogo de Messmer',
        scaling: 'DES (B), FÉ (C), FOR (D)',
        skill: 'Assalto de Messmer (Messmer\'s Assault)',
        fpCost: '15 FP (+9 FP sequência + lanças no chão)',
        passive: 'Ataque forte arremessa a lança como projétil de fogo sem gastar FP'
      },
      lore: 'A formidável lança rubra de Messmer, o Empalador. Pode ser arremessada infinitamente e cria uma floresta de lanças incandescentes do solo.',
      guide: 'Derrote Messmer na Fortaleza das Sombras e troque sua Lembrança na Mesa-Redonda.',
      walkthroughSteps: [
        '1. Escale o Especimeiro da Fortaleza das Sombras até a Câmara Escura.',
        '2. Derrote Messmer em ambas as fases.',
        '3. Vá até Enia na Mesa-Redonda e escolha a Lança do Empalador.'
      ],
      mapCoords: 'Câmara Escura, topo da Fortaleza das Sombras, DLC.',
      youtubeQuery: 'elden ring spear of the impaler messmer location'
    },
    {
      id: 'w_dragon_hunters_great_katana',
      name: 'Grande Katana de Caça-Dragões (Dragon-Hunter\'s Katana DLC)',
      nameEn: 'Dragon-Hunter\'s Great Katana',
      category: 'weapons',
      subtype: 'Grandes Katanas',
      region: 'shadow_realm',
      location: 'Fosso do Dragão (Pico do Dragão)',
      nearestGrace: 'Fosso do Dragão (Reino das Sombras)',
      rarity: 'dlc',
      icon: '🐉',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 15, dex: 20, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Sangramento / Anti-Dragão',
        scaling: 'DES (B), FOR (C)',
        skill: 'Corte do Caçador de Dragões (Dragonwound Slash)',
        fpCost: '18 FP (projétil de ar carregável)',
        passive: 'Dano massivo contra todos os Dragões (+30%) / Sangramento (55)'
      },
      lore: 'Grande Katana forjada para decapitar os dragões gigantescos do Pico Irado. Dispara lâminas de vento cortantes na cabeça das feras.',
      guide: 'Derrote o chefe Homem-Dragão Ancestral na masmorra Fosso do Dragão na DLC.',
      walkthroughSteps: [
        '1. Siga para o sul da Planície das Sepulturas contornando o penhasco até a entrada da caverna Fosso do Dragão.',
        '2. Desça pela masmorra até o grande abismo e pule no precipício.',
        '3. Derrote o chefe Magma Wyrm / Homem-Dragão Ancestral para receber a Grande Katana.'
      ],
      mapCoords: 'Fosso do Dragão, caminho para o Pico de Bayle, DLC.',
      youtubeQuery: 'elden ring dragon hunters great katana location'
    },
    {
      id: 'w_dryleaf_arts',
      name: 'Artes Marciais de Folha Seca (Dryleaf Arts DLC)',
      nameEn: 'Dryleaf Arts (Hand-to-Hand)',
      category: 'weapons',
      subtype: 'Luta Desarmada',
      region: 'shadow_realm',
      location: 'Ruínas de Moorth (Reino das Sombras)',
      nearestGrace: 'Ruínas de Moorth',
      rarity: 'dlc',
      icon: '👊',
      secretType: 'Quest NPC',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 8, dex: 8, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico Contundente / Artes Marciais',
        scaling: 'FOR (B), DES (B)',
        skill: 'Chute da Folha de Palmeira (Palm Blast)',
        fpCost: '14 FP (carregável)',
        passive: 'Combos de socos e chutes ultrarrápidos corpo a corpo'
      },
      lore: 'O estilo de combate desarmado dos monges da seita Dryleaf. Permite lutar apenas com socos, chutes voadores e rajadas de impacto.',
      guide: 'Realize o gesto \'Que o Melhor Vença\' diante do Monge Dane nas Ruínas de Moorth e vença o duelo.',
      walkthroughSteps: [
        '1. Pegue a mensagem e o gesto \'Que o Melhor Vença\' na Graça da Cruz da Estrada de Scadu.',
        '2. Vá até as Ruínas de Moorth e encontre o monge Dryleaf Dane em silêncio.',
        '3. Faça o gesto diante dele para ser transportado para um duelo amigável.',
        '4. Derrote Dane para receber as Artes Marciais e o Chapéu de Folha Seca.'
      ],
      mapCoords: 'Ruínas de Moorth, leste do Castelo Ensis, DLC.',
      youtubeQuery: 'elden ring dryleaf arts hand to hand combat location'
    },

    /* ==========================================================================
       2. TALISMÃS LENDÁRIOS & ESSENCIAIS (Talismans)
       ========================================================================== */
    {
      id: 't_radagon_soreseal',
      name: 'Selo Doloroso de Radagon (Radagon\'s Soreseal)',
      nameEn: 'Radagon\'s Soreseal',
      category: 'talismans',
      subtype: 'Talismãs Lendários',
      region: 'caelid',
      location: 'Forte Faroth (Monte Dragão Greyoll, Caelid)',
      nearestGrace: 'Forte Faroth',
      rarity: 'legendary',
      icon: '💍',
      secretType: 'Baú Escondido',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Buff de Atributos',
        scaling: '+5 Vigor, +5 Tolerância, +5 Força, +5 Destreza (+20 níveis totais)',
        skill: 'Efeito Passivo Universal',
        fpCost: '0 FP',
        passive: 'Aumenta o dano recebido em +15%'
      },
      lore: 'O olho esculpido de Radagon, estampado com o selo solene da Ordem Áurea. Concede poderes físicos titânicos a troco da fragilidade da carne.',
      guide: 'No andar superior do Forte Faroth em Caelid, caia pelas aberturas do teto de madeira e desça pelas vigas.',
      walkthroughSteps: [
        '1. Vá até o Forte Faroth no leste de Caelid (ao lado do dragão gigante Greyoll).',
        '2. Suba a escada de mão na entrada do forte até o telhado.',
        '3. Caia na segunda abertura do teto sobre as vigas de sustentação.',
        '4. Pule sobre a parede divisória matando os ratos gigantes.',
        '5. Desça pela escada de mão até o beco sem saída e abra o baú.'
      ],
      mapCoords: 'Andar secreto das vigas do Forte Faroth, Caelid.',
      youtubeQuery: 'elden ring radagons soreseal location guide'
    },
    {
      id: 't_marika_soreseal',
      name: 'Selo Doloroso de Marika (Marika\'s Soreseal)',
      nameEn: 'Marika\'s Soreseal',
      category: 'talismans',
      subtype: 'Talismãs Lendários',
      region: 'haligtree',
      location: 'Elphael, Suporte da Árvore Sacra',
      nearestGrace: 'Praça da Cidade de Elphael',
      rarity: 'legendary',
      icon: '💍',
      secretType: 'Chave de Espada de Pedra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Buff Mágico & Atributos',
        scaling: '+5 Mente, +5 Inteligência, +5 Fé, +5 Arcano (+20 níveis mágicos)',
        skill: 'Efeito Passivo',
        fpCost: '0 FP',
        passive: 'Aumenta o dano recebido em +15%'
      },
      lore: 'O selo solene da Rainha Marika. Concede uma mente brilhante e poderes místicos divinos supremos.',
      guide: 'Atrás de uma barreira de névoa de Chave de Espada de Pedra no nível inferior de Elphael guardada por um Rejeitado.',
      walkthroughSteps: [
        '1. A partir da Graça \'Praça da Cidade de Elphael\', desça para a rua inferior patrulhada por soldados de Haligtree.',
        '2. Use 1 Chave de Espada de Pedra na estátua de gárgula na sala ao sul.',
        '3. Colete o selo no altar dentro da câmara.'
      ],
      mapCoords: 'Sala trancada no nível inferior de Elphael, Árvore Sacra.',
      youtubeQuery: 'elden ring marikas soreseal location'
    },
    {
      id: 't_shard_of_alexander',
      name: 'Fragmento de Alexander (Shard of Alexander)',
      nameEn: 'Shard of Alexander',
      category: 'talismans',
      subtype: 'Aumento de Dano',
      region: 'farum_azula',
      location: 'Farum Azula Despedaçada',
      nearestGrace: 'Elevador do Templo do Dragão',
      rarity: 'legendary',
      icon: '🏺',
      secretType: 'Quest NPC',
      isMissable: true,
      missableWarning: 'Atenção: Não mate Alexander antes de Farum Azula ou você receberá apenas o fragmento inferior (+10%).',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Amplificação de Habilidade',
        scaling: 'Aumenta o dano de TODAS as Cinzas de Guerra e Habilidades em +15%',
        skill: 'Efeito Passivo Universal',
        fpCost: '0 FP',
        passive: 'Funciona com armas físicas, mágicas, de fogo e sagradas'
      },
      lore: 'O fragmento do nobre guerreiro pote Alexander. Permite canalizar a determinação indômita de um campeão para fortalecer qualquer habilidade de combate.',
      guide: 'Complete a linha de missões de Alexander e aceite duelar com ele no topo de Farum Azula Despedaçada.',
      walkthroughSteps: [
        '1. Ajude Alexander em Limgrave, Festival de Radahn, Liurnia (com óleo) e no Monte Gelmir (lava).',
        '2. Em Farum Azula, use 1 Chave de Espada de Pedra no elevador do Templo do Dragão.',
        '3. Atravesse os pilares flutuantes até encontrar Alexander contemplando as ruínas.',
        '4. Converse com ele, aceite seu desafio honrado e vença o duelo.',
        '5. Colete o Fragmento de Alexander e as Entranhas de Alexander.'
      ],
      mapCoords: 'Plataforma flutuante ao lado do Templo do Dragão, Farum Azula.',
      youtubeQuery: 'elden ring shard of alexander quest guide'
    },
    {
      id: 't_erdtree_favor_2',
      name: 'Favor da Térvore +2 (Erdtree\'s Favor +2)',
      nameEn: 'Erdtree\'s Favor +2',
      category: 'talismans',
      subtype: 'Talismãs Lendários',
      region: 'leyndell',
      location: 'Capital das Cinzas (Leyndell Cinzenta)',
      nearestGrace: 'Leyndell, Capital das Cinzas',
      rarity: 'legendary',
      icon: '🌳',
      secretType: 'Exploração Secreta',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Buff de Sobrevivência',
        scaling: '+4% HP Máximo, +9.5% Estamina Máxima, +8% Carga de Equipamento',
        skill: 'Efeito Passivo',
        fpCost: '0 FP',
        passive: 'Permite carregar armaduras muito mais pesadas com rolamento médio'
      },
      lore: 'O maior talismã abençoado pela Rainha Marika. Concede vigor físico, fôlego infindável e capacidade muscular incomparável.',
      guide: 'No vasto deserto de cinzas de Leyndell após queimar a Térvore, no topo de um tronco de árvore guardado por 3 Espíritos de Verme.',
      walkthroughSteps: [
        '1. Após derrotar Maliketh, teleporte para a Graça \'Leyndell, Capital das Cinzas\'.',
        '2. Pegue o elevador de volta em direção aos portões externos da capital.',
        '3. Desça para o grande pátio coberto de cinzas e evite (ou derrote) os 3 monstros Ulcerated Tree Spirits.',
        '4. Suba na ponta do tronco da árvore caído no centro do lago de cinzas para pegar o talismã.'
      ],
      mapCoords: 'Lago de Cinzas no sul da Capital Cinzenta, Leyndell.',
      youtubeQuery: 'elden ring erdtrees favor 2 location guide'
    },
    {
      id: 't_dragoncrest_greatshield',
      name: 'Talismã do Grande Escudo de Dragão (Dragoncrest Greatshield)',
      nameEn: 'Dragoncrest Greatshield Talisman',
      category: 'talismans',
      subtype: 'Defensivos & Poise',
      region: 'haligtree',
      location: 'Canal de Drenagem (Elphael, Árvore Sacra)',
      nearestGrace: 'Canal de Drenagem (Elphael)',
      rarity: 'legendary',
      icon: '🛡️',
      secretType: 'Baú Escondido',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Negação de Dano Físico',
        scaling: 'Reduz todo o dano físico sofrido em colossais +20%',
        skill: 'Efeito Defensivo Supremo',
        fpCost: '0 FP',
        passive: 'Eficaz contra todos os chefes físicos do jogo'
      },
      lore: 'Talismã com a efígie do Grande Dragão Ancião Placidusax. Concede a durabilidade impenetrável das escamas dracônicas.',
      guide: 'Nas vigas do teto da capela cheia de pragas de insetos antes da arena de Malenia na Árvore Sacra.',
      walkthroughSteps: [
        '1. A partir da Graça \'Canal de Drenagem\' em Elphael, saia pela porta e siga pelos galhos gigantes.',
        '2. Pule nos arcos de pedra e suba até o telhado do edifício principal.',
        '3. Caia cuidadosamente pelas aberturas do teto nas vigas de madeira superiores.',
        '4. Elimine os servos da podridão à distância e abra o baú no mezanino elevado.'
      ],
      mapCoords: 'Mezanino suspenso da capela interna de Elphael, Árvore Sacra.',
      youtubeQuery: 'elden ring dragoncrest greatshield talisman location'
    },
    {
      id: 't_godfrey_icon',
      name: 'Ícone de Godfrey (Godfrey Icon)',
      nameEn: 'Godfrey Icon',
      category: 'talismans',
      subtype: 'Talismãs Lendários',
      region: 'altus',
      location: 'Cadeia Eterna da Linhagem Dourada (Platô Altus)',
      nearestGrace: 'Grande Elevador de Dectus',
      rarity: 'legendary',
      icon: '👑',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Amplificação de Ataques Carregados',
        scaling: 'Aumenta o dano de magias, feitiços e habilidades CARREGADAS em +15%',
        skill: 'Efeito Passivo',
        fpCost: '0 FP',
        passive: 'Essencial para builds de feitiços e Cinzas de Guerra carregáveis'
      },
      lore: 'Talismã retratando o Primeiro Lorde Prístino Godfrey. Concede poder avassalador aos golpes executados com concentração máxima.',
      guide: 'Derrote Godefroy, o Enxertado, na Cadeia Eterna ao sul do Grande Elevador de Dectus no Platô Altus.',
      walkthroughSteps: [
        '1. Após subir o Grande Elevador de Dectus, desça pelo desfiladeiro à direita.',
        '2. Use 1 Chave de Espada de Pedra para entrar na Cadeia Eterna da Linhagem Dourada.',
        '3. Derrote o chefe Godefroy para receber o talismã lendário.'
      ],
      mapCoords: 'Cadeia Eterna da Linhagem Dourada, Platô Altus.',
      youtubeQuery: 'elden ring godfrey icon location guide'
    },
    {
      id: 't_radagon_icon',
      name: 'Ícone de Radagon (Radagon Icon)',
      nameEn: 'Radagon Icon',
      category: 'talismans',
      subtype: 'Talismãs Lendários',
      region: 'liurnia',
      location: 'Academia de Raya Lucaria (Sala de Debates)',
      nearestGrace: 'Sala de Debates (Raya Lucaria)',
      rarity: 'legendary',
      icon: '⚡',
      secretType: 'Baú Escondido',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Velocidade de Conjuração',
        scaling: 'Concede +30 de Destreza Virtual para velocidade de conjuração de magias',
        skill: 'Efeito Passivo',
        fpCost: '0 FP',
        passive: 'Reduz significativamente o tempo de lançamento de qualquer magia ou encanto'
      },
      lore: 'Talismã esculpido com a imagem de Radagon quando estudava as feitiçarias da Lua e os encantamentos da Ordem Áurea.',
      guide: 'No mezanino superior da Sala de Debates após derrotar o Lobo Vermelho de Radagon em Raya Lucaria.',
      walkthroughSteps: [
        '1. A partir da Graça \'Sala de Debates\', saia pela porta para o pátio externo.',
        '2. Vire à direita imediatamente e pule a cerca de ferro para o telhado abaixo.',
        '3. Suba pela escada de mão e entre pela janela quebrada no segundo andar da Sala de Debates.',
        '4. Abra o baú no mezanino de madeira.'
      ],
      mapCoords: 'Mezanino superior da Sala de Debates, Academia de Raya Lucaria.',
      youtubeQuery: 'elden ring radagon icon location guide'
    },
    {
      id: 't_lord_of_bloods_exultation',
      name: 'Exultação do Lorde de Sangue (Lord of Blood\'s Exultation)',
      nameEn: 'Lord of Blood\'s Exultation',
      category: 'talismans',
      subtype: 'Aumento de Dano',
      region: 'leyndell',
      location: 'Catacumbas de Leyndell (Esgotos da Capital)',
      nearestGrace: 'Estrada Subterrânea / Catacumbas de Leyndell',
      rarity: 'rare',
      icon: '🩸',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Buff de Sangramento Massivo',
        scaling: 'Aumenta o Poder de Ataque em +20% por 20 segundos sempre que houver sangramento por perto',
        skill: 'Efeito Passivo',
        fpCost: '0 FP',
        passive: 'O talismã definitivo para qualquer build de Sangramento / Katanas'
      },
      lore: 'Talismã dos sacerdotes de sangue que se banham na glória de Mohgwyn. Qualquer derramamento de sangue incita uma fúria assassina.',
      guide: 'Derrote o chefe Esmar, Sacerdote do Sangue, no final das Catacumbas subterrâneas de Leyndell.',
      walkthroughSteps: [
        '1. Desça nos Esgotos de Leyndell até a Graça \'Catacumbas de Leyndell\'.',
        '2. Atravesse o labirinto de tubos e acione a alavanca do chefe.',
        '3. Derrote Esmar e seus dois cães de sangue na câmara do chefe.'
      ],
      mapCoords: 'Catacumbas no subsolo dos Esgotos de Leyndell.',
      youtubeQuery: 'elden ring lord of bloods exultation location'
    },
    {
      id: 't_two_headed_turtle',
      name: 'Talismã da Tartaruga de Duas Cabeças (Two-Headed Turtle DLC)',
      nameEn: 'Two-Headed Turtle Talisman',
      category: 'talismans',
      subtype: 'Regeneração de Estamina',
      region: 'shadow_realm',
      location: 'Caverna do Rio Ellac (Reino das Sombras)',
      nearestGrace: 'Rio Ellac Caverna (DLC)',
      rarity: 'dlc',
      icon: '🐢',
      secretType: 'Exploração Secreta',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Regeneração de Estamina Suprema',
        scaling: 'Aumenta a velocidade de recuperação de Estamina em colossais +22.5%',
        skill: 'Efeito Passivo',
        fpCost: '0 FP',
        passive: 'Versão suprema do talismã da tartaruga verde clássico'
      },
      lore: 'Talismã raro da DLC com duas cabeças de tartaruga entrelaçadas. Concede fôlego praticamente inesgotável em batalhas intensas.',
      guide: 'Atrás de uma cachoeira na base do Rio Ellac na Planície das Sepulturas na DLC.',
      walkthroughSteps: [
        '1. Desça pelo desfiladeiro do Rio Ellac ao sul da primeira ponte da DLC.',
        '2. Salte pelas plataformas de pedra até a base da cachoeira.',
        '3. Entre na caverna oculta atrás da cortina de água e pegue o talismã no altar.'
      ],
      mapCoords: 'Cachoeira do Rio Ellac, Reino das Sombras.',
      youtubeQuery: 'elden ring two headed turtle talisman location dlc'
    },
    {
      id: 't_golden_braid',
      name: 'Trança Dourada (Golden Braid DLC)',
      nameEn: 'Golden Braid',
      category: 'talismans',
      subtype: 'Defesa Sagrada Máxima',
      region: 'shadow_realm',
      location: 'Vila dos Xamãs (Interior de Hinterland)',
      nearestGrace: 'Vila dos Xamãs (Reino das Sombras)',
      rarity: 'dlc',
      icon: '✨',
      secretType: 'Exploração Secreta',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Negação de Dano Sagrado Supremo',
        scaling: 'Reduz o dano sagrado sofrido em astronômicos +22%',
        skill: 'Efeito Passivo',
        fpCost: '0 FP',
        passive: 'Item ESSENCIAL para sobreviver à fase 2 do chefe final Consorte Radahn'
      },
      lore: 'Uma mecha de cabelo dourado deixada pela própria Marika na árvore de sua vila natal dos xamãs antes de sua ascensão à divindade.',
      guide: 'Dentro do tronco da árvore florida na Vila dos Xamãs (acessada pelo gesto \'Oh Mãe\' na estátua da Fortaleza das Sombras).',
      walkthroughSteps: [
        '1. Obtenha o gesto \'Oh Mãe\' ao norte de Bonny Village.',
        '2. Use o gesto na estátua sem cabeça na sala ao lado da Graça \'Portão Traseiro da Fortaleza das Sombras\'.',
        '3. Atravesse o planalto de Hinterland até a Vila dos Xamãs e pegue o talismã dentro do tronco oco.'
      ],
      mapCoords: 'Árvore no centro da Vila dos Xamãs, Hinterland, DLC.',
      youtubeQuery: 'elden ring golden braid talisman location dlc'
    },

    /* ==========================================================================
       3. MAGIAS, FEITIÇOS & ENCANTAMENTOS (Spells & Incantations)
       ========================================================================== */
    {
      id: 's_comet_azur',
      name: 'Cometa Azur (Comet Azur Feitiço Lendário)',
      nameEn: 'Comet Azur',
      category: 'spells',
      subtype: 'Feitiçarias Lendárias',
      region: 'altus',
      location: 'Vila Hermitão (Monte Gelmir)',
      nearestGrace: 'Primeiro Feiticeiro Azur (Monte Gelmir)',
      rarity: 'legendary',
      icon: '🌠',
      secretType: 'Exploração Secreta',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 60, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Mágico Contínuo / Raio Laser',
        scaling: 'INT (Escala com o Cajado)',
        skill: 'Feitiço de Canalização Contínua',
        fpCost: '40 FP inicial + gasto contínuo',
        passive: 'Capaz de eliminar chefes em segundos com a Lágrima Cerúlea Oculta (FP Infinito)'
      },
      lore: 'Feitiçaria lendária primeva criada pelo Mestre Azur ao contemplar o abismo cósmico. Dispara um canhão torrencial contínuo de energia azul.',
      guide: 'Interaja com o corpo petrificado do Primeiro Feiticeiro Azur no final da Vila do Hermitão no Monte Gelmir.',
      walkthroughSteps: [
        '1. Contorne a base do Monte Gelmir passando pelo Lago de Lava e pela Vila do Hermitão.',
        '2. Derrote a Rainha Demi-Humana Maggie.',
        '3. Ative a Graça logo atrás e fale com o mago de pedra sentado para receber o feitiço.'
      ],
      mapCoords: 'Assento do Mestre Azur, leste do Monte Gelmir.',
      youtubeQuery: 'elden ring comet azur location guide'
    },
    {
      id: 's_stars_of_ruin',
      name: 'Estrelas da Ruína (Stars of Ruin)',
      nameEn: 'Stars of Ruin',
      category: 'spells',
      subtype: 'Feitiçarias Lendárias',
      region: 'caelid',
      location: 'Esconderijo de Sellia (Caverna Secreta de Caelid)',
      nearestGrace: 'Igreja da Praga / Esconderijo de Sellia',
      rarity: 'legendary',
      icon: '🌌',
      secretType: 'Quest NPC',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 43, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Mágico Guiado',
        scaling: 'INT',
        skill: 'Dispara 12 estrelas teleguiadas',
        fpCost: '32 FP',
        passive: 'Projéteis teleguiados de alta precisão impossíveis de esquivar em PvP/PvE'
      },
      lore: 'Feitiçaria lendária do Mestre Lusat. Dispara doze estrelas cadentes que perseguem implacavelmente o alvo.',
      guide: 'Use a chave que Sellen lhe entrega para quebrar a barreira mágica no fundo do Esconderijo de Sellia em Caelid.',
      walkthroughSteps: [
        '1. Avance a quest da Feiticeira Sellen até receber a Chave Quebra-Selos de Sellia.',
        '2. Vá até o cemitério ao norte da Igreja da Praga e golpeie a parede ilusória atrás da lápide.',
        '3. Desça pelos cristais gigantes até a barreira mágica no fundo da caverna.',
        '4. Fale com o Mestre Lusat para obter o feitiço.'
      ],
      mapCoords: 'Esconderijo de Sellia, Caelid.',
      youtubeQuery: 'elden ring stars of ruin location guide'
    },
    {
      id: 's_golden_vow',
      name: 'Voto Dourado (Golden Vow Encantamento)',
      nameEn: 'Golden Vow',
      category: 'spells',
      subtype: 'Encantamentos da Ordem Áurea',
      region: 'altus',
      location: 'Cabana do Cadáver Fedorento (Monte Gelmir)',
      nearestGrace: 'Ponte da Iniquidade',
      rarity: 'rare',
      icon: '✨',
      secretType: 'Exploração Secreta',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 25, arc: 0 },
      combatStats: {
        damageType: 'Buff Universal de Ataque e Defesa',
        scaling: 'FÉ',
        skill: '+15% de Dano em TODOS os Ataques e +10% de Negação de Dano por 80s',
        fpCost: '47 FP',
        passive: 'Acumula com outros buffs como Chama Conceda-me Força'
      },
      lore: 'Encantamento supremo de bênção da Ordem Áurea. Concede bravura inabalável, elevando o ataque e a proteção de quem o conjura e aliados.',
      guide: 'Em um cadáver no chão da Cabana do Cadáver Fedorento no caminho para o Monte Gelmir.',
      walkthroughSteps: [
        '1. A partir da Graça \'Ponte da Iniquidade\' no Monte Gelmir, siga a trilha para o noroeste.',
        '2. Encontre a cabana de madeira infestada de zumbis rastejantes.',
        '3. Pegue o brilho dourado no cadáver dentro da cabana.'
      ],
      mapCoords: 'Cabana do Cadáver Fedorento, Monte Gelmir.',
      youtubeQuery: 'elden ring golden vow incantation location'
    },
    {
      id: 's_flame_grant_me_strength',
      name: 'Chama, Conceda-me Força (Flame, Grant Me Strength)',
      nameEn: 'Flame, Grant Me Strength',
      category: 'spells',
      subtype: 'Encantamentos do Fogo',
      region: 'caelid',
      location: 'Forte Gael (Fronteira de Caelid)',
      nearestGrace: 'Forte Gael Norte',
      rarity: 'rare',
      icon: '🔥',
      secretType: 'Exploração Secreta',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 15, arc: 0 },
      combatStats: {
        damageType: 'Buff Físico e de Fogo',
        scaling: 'FÉ',
        skill: '+20% de Dano Físico e +20% de Dano de Fogo por 30s',
        fpCost: '28 FP',
        passive: 'O buff mais popular e poderoso para builds de Força, Katanas e Fogo'
      },
      lore: 'Encantamento dos monges do fogo que desperta a chama primal adormecida no peito do conjurador.',
      guide: 'Atrás do Forte Gael em Caelid, entre duas carruagens lança-chamas.',
      walkthroughSteps: [
        '1. Vá até o Forte Gael na fronteira oeste de Caelid.',
        '2. Contorne a muralha externa por trás do forte.',
        '3. Colete o encantamento no cadáver localizado entre as duas máquinas de fogo.'
      ],
      mapCoords: 'Traseira do Forte Gael, Caelid.',
      youtubeQuery: 'elden ring flame grant me strength location guide'
    },
    {
      id: 's_rannis_dark_moon',
      name: 'Lua Sombria de Ranni (Ranni\'s Dark Moon)',
      nameEn: 'Ranni\'s Dark Moon',
      category: 'spells',
      subtype: 'Feitiçarias Lendárias',
      region: 'liurnia',
      location: 'Torre de Chelona (Platô Lunar de Liurnia)',
      nearestGrace: 'Platô Lunar / Catedral de Manus Celes',
      rarity: 'legendary',
      icon: '🌙',
      secretType: 'Enigma de Torre',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 68, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Mágico / Congelamento / Redutor de Defesa',
        scaling: 'INT',
        skill: 'Dispara uma lua fria gigante',
        fpCost: '57 FP',
        passive: 'Reduz a resistência mágica do alvo em -10% e causa Congelamento massivo'
      },
      lore: 'Feitiçaria lendária da Princesa Ranni. Invoca a lua cheia escura e fria para absorver magias inimigas e congelar o alvo.',
      guide: 'Resolva o enigma das 3 tartarugas sábias fantasmagóricas ao redor do Platô Lunar para abrir a Torre de Chelona.',
      walkthroughSteps: [
        '1. Suba ao Platô Lunar de Liurnia pela quest de Ranni.',
        '2. Vá até a Torre de Chelona no extremo sul do platô e leia o pedestal.',
        '3. Encontre as 3 tartarugas gigantes (penhasco oeste, voando no ar e penhasco leste).',
        '4. Suba ao topo da torre aberta e abra o baú.'
      ],
      mapCoords: 'Torre de Chelona, sul do Platô Lunar.',
      youtubeQuery: 'elden ring rannis dark moon spell location chelona rise'
    },

    /* ==========================================================================
       4. CINZAS DA GUERRA & INVOCAÇÕES LENDÁRIAS (Ashes of War & Spirits)
       ========================================================================== */
    {
      id: 'a_mimic_tear',
      name: 'Cinza da Lágrima Imitadora (Mimic Tear Spirit)',
      nameEn: 'Mimic Tear Ashes',
      category: 'ashes',
      subtype: 'Espíritos Lendários',
      region: 'underground',
      location: 'Solo Sagrado da Noite (Nokron, Cidade Eterna)',
      nearestGrace: 'Bosque dos Ancestrais (Nokron)',
      rarity: 'legendary',
      icon: '👥',
      secretType: 'Chave de Espada de Pedra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Clone Perfeito do Jogador',
        scaling: 'HP Máximo',
        skill: 'Invoca uma cópia exata do seu personagem com todas as suas armas e magias',
        fpCost: '660 HP (Não gasta FP!)',
        passive: 'A invocação mais poderosa e versátil de todo o jogo'
      },
      lore: 'Espiritu lendário que assume a forma idêntica de quem o invoca. Usa seus frascos, magias e equipamentos em batalha.',
      guide: 'Atrás de uma barreira de Chave de Espada de Pedra no Solo Sagrado da Noite em Nokron.',
      walkthroughSteps: [
        '1. Derrote Radahn e entre na cratera em Limgrave que leva a Nokron.',
        '2. Pule pelos telhados a partir da Graça \'Bosque dos Ancestrais\' até o Solo Sagrado da Noite.',
        '3. Use 1 Chave de Espada de Pedra na estátua de gárgula na sacada.',
        '4. Abra o baú guardado pelo sacerdote Nox.'
      ],
      mapCoords: 'Solo Sagrado da Noite, Nokron Cidade Eterna.',
      youtubeQuery: 'elden ring mimic tear ashes location guide'
    },
    {
      id: 'a_black_knife_tiche',
      name: 'Tiche, a Faca Negra (Black Knife Tiche)',
      nameEn: 'Black Knife Tiche',
      category: 'ashes',
      subtype: 'Espíritos Lendários',
      region: 'liurnia',
      location: 'Cadeia Eterna do Impostor (Platô Lunar de Liurnia)',
      nearestGrace: 'Platô Lunar / Altar do Luar',
      rarity: 'legendary',
      icon: '🗡️',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Dano Sagrado da Morte Destinada',
        scaling: 'FP Máximo',
        skill: 'Projéteis de chama da Morte Destinada que drenam % do HP máximo do chefe',
        fpCost: '132 FP',
        passive: 'Esquivas acrobáticas contínuas que tornam Tiche quase intocável'
      },
      lore: 'A assassina Faca Negra Tiche, filha de Alecto. Seus ataques queimam continuamente a barra de vida dos chefes com a chama da Morte Destinada.',
      guide: 'Derrote Alecto, Líder das Facas Negras, na Cadeia Eterna no noroeste do Platô Lunar.',
      walkthroughSteps: [
        '1. Acesse o Platô Lunar de Liurnia através da linha de missões de Ranni.',
        '2. Cavalgue até o extremo noroeste do platô até a Cadeia Eterna do Impostor.',
        '3. Entre na arena e vença o duelo de alta velocidade contra Alecto.',
        '4. Receba a Cinza de Tiche imediatamente após a vitória.'
      ],
      mapCoords: 'Cadeia Eterna do Impostor, noroeste do Platô Lunar.',
      youtubeQuery: 'elden ring black knife tiche location alecto guide'
    },
    {
      id: 'a_seppuku',
      name: 'Cinza de Guerra: Seppuku (Ash of War: Seppuku)',
      nameEn: 'Ash of War: Seppuku',
      category: 'ashes',
      subtype: 'Cinzas de Guerra',
      region: 'mountaintops',
      location: 'Lago Congelado (Montanhas dos Gigantes)',
      nearestGrace: 'Lago Congelado (Montanhas dos Gigantes)',
      rarity: 'rare',
      icon: '🗡️',
      secretType: 'Escaravelho Invisível',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Buff de Sangramento / Afinidade Sangue',
        scaling: 'Arcano / Destreza',
        skill: 'Perfura o próprio abdômen aumentando o Sangramento (+84) e Ataque (+30)',
        fpCost: '4 FP',
        passive: 'Ativa instantaneamente o buff da Exultação do Lorde de Sangue'
      },
      lore: 'Técnica de suicídio ritual da Terra dos Juncos adaptada para batalha. Cobre a lâmina com o próprio sangue vital para cortes letais.',
      guide: 'Derrote o escaravelho invisível que deixa pegadas brilhantes sobre o gelo no leste do Lago Congelado.',
      walkthroughSteps: [
        '1. Teleporte para a Graça \'Lago Congelado\' nas Montanhas dos Gigantes.',
        '2. Cavalgue para o leste sobre o lago de gelo.',
        '3. Observe as pegadas brilhantes no gelo e fique no caminho delas.',
        '4. Desfira um golpe no momento exato em que o escaravelho passar.'
      ],
      mapCoords: 'Leste do Lago Congelado, Montanhas dos Gigantes.',
      youtubeQuery: 'elden ring seppuku ash of war location guide'
    },
    {
      id: 'a_bloodhound_step',
      name: 'Cinza de Guerra: Passo do Cão de Caça (Bloodhound\'s Step)',
      nameEn: 'Ash of War: Bloodhound\'s Step',
      category: 'ashes',
      subtype: 'Cinzas de Guerra',
      region: 'caelid',
      location: 'Ponte da Torre de Lenne (Monte Dragão, Caelid)',
      nearestGrace: 'Torre de Lenne (Caelid)',
      rarity: 'rare',
      icon: '🐾',
      secretType: 'Chefe Noturno',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Esquiva e Mobilidade Invencível',
        scaling: 'Afinidade Afiada / Físico',
        skill: 'Teleporte com quadros de invencibilidade muito superiores ao rolamento',
        fpCost: '5 FP',
        passive: 'Permite atravessar pântanos de lava e veneno com facilidade'
      },
      lore: 'Técnica de movimentação furtiva dos Cavaleiros Cães de Caça que desvanece o corpo no ar em alta velocidade.',
      guide: 'Derrote a Cavalaria da Noite na pequena ponte de madeira ao lado da Torre de Lenne em Caelid durante a noite.',
      walkthroughSteps: [
        '1. Vá até a Graça \'Torre de Lenne\' no nordeste de Caelid e descanse até a Noite.',
        '2. Monte no cavalo e siga em direção à pequena ponte de madeira ao norte.',
        '3. Enfrente e derrote a Cavalaria da Noite armada com mangual.',
        '4. Receba a Cinza de Guerra Passo do Cão de Caça.'
      ],
      mapCoords: 'Ponte da Torre de Lenne, Monte Dragão Greyoll, Caelid.',
      youtubeQuery: 'elden ring bloodhounds step ash of war location'
    },

    /* ==========================================================================
       5. ITENS CHAVE, LÁGRIMAS, SEMENTES & SCADUTREE (Key Items & Upgrades)
       ========================================================================== */
    {
      id: 'k_larval_tear_liurnia',
      name: 'Lágrima Larval (Respec de Atributos - Renascimento)',
      nameEn: 'Larval Tear',
      category: 'key_items',
      subtype: 'Lágrimas Larvais',
      region: 'liurnia',
      location: 'Vila dos Albináuricos (Liurnia dos Lagos)',
      nearestGrace: 'Vila dos Albináuricos',
      rarity: 'rare',
      icon: '💧',
      secretType: 'Exploração Secreta',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Item de Renascimento',
        scaling: 'Permite redistribuir TODOS os níveis com Rennala na Academia',
        skill: 'Usado na Grande Renascença de Rennala',
        fpCost: '0 FP',
        passive: 'Consumível indispensável para mudar de build'
      },
      lore: 'O núcleo de uma criatura mímica que nunca amadureceu. Permite que o Maculado renasça perfeito pelas mãos da Rainha Rennala.',
      guide: 'No cemitério cercado por fantasmas na Vila dos Albináuricos sob o grande platô de Liurnia.',
      walkthroughSteps: [
        '1. Vá para o sudoeste do lago de Liurnia e entre na caverna sob o rochedo gigante.',
        '2. Suba a rampa até a Graça \'Vila dos Albináuricos\'.',
        '3. Atravesse a ponte de madeira e colete a lágrima no túmulo perto das casas.'
      ],
      mapCoords: 'Cemitério da Vila dos Albináuricos, Liurnia.',
      youtubeQuery: 'elden ring all larval tear locations respec'
    },
    {
      id: 'k_scadutree_fragment_1',
      name: 'Fragmentos de Scadutree (Bênção da Térvore das Sombras DLC)',
      nameEn: 'Scadutree Fragment',
      category: 'key_items',
      subtype: 'Fragmentos da Scadutree',
      region: 'shadow_realm',
      location: 'Igreja da Consolação (Planície das Sepulturas)',
      nearestGrace: 'Igreja da Consolação (Sul da Planície)',
      rarity: 'dlc',
      icon: '🌳',
      secretType: 'Exploração Secreta',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Bênção do Reino das Sombras',
        scaling: 'Aumenta permanentemente o ataque físico/mágico e a negação de dano no DLC',
        skill: 'Bênção da Scadutree no Ponto de Graça',
        fpCost: '0 FP',
        passive: 'Essencial para sobreviver e causar dano nos chefes da expansão'
      },
      lore: 'Estilhaço luminoso que se desprendeu da Térvore das Sombras. Concede a Bênção da Scadutree ao Maculado enquanto estiver no Reino das Sombras.',
      guide: 'Diante da estátua de Marika na Igreja da Consolação, ao sul da Planície das Sepulturas.',
      walkthroughSteps: [
        '1. A partir da primeira Graça da DLC, siga reto para o sul subindo as colinas.',
        '2. Derrote o Cavaleiro Negro que patrulha a entrada da igreja.',
        '3. Colete 2 Fragmentos de Scadutree na estátua da igreja.'
      ],
      mapCoords: 'Estátua da Igreja da Consolação, sul do Reino das Sombras.',
      youtubeQuery: 'elden ring all scadutree fragment locations dlc'
    },

    /* ==========================================================================
       6. ARMADURAS NOTÁVEIS & CONJUNTOS (Armor Sets)
       ========================================================================== */
    {
      id: 'ar_bull_goat_set',
      name: 'Conjunto de Armadura de Touro-Bode (Bull-Goat Set)',
      nameEn: 'Bull-Goat Set',
      category: 'armor',
      subtype: 'Armaduras Pesadas',
      region: 'altus',
      location: 'Mansão Vulcânica / Covil do Dragão de Magma',
      nearestGrace: 'Desfiladeiro Ruinado / Mansão Vulcânica',
      rarity: 'legendary',
      icon: '🛡️',
      secretType: 'Quest NPC',
      isMissable: true,
      missableWarning: 'Atenção: Você deve aceitar a carta de Patches na Mansão Vulcânica antes de derrotar Rykard para invadir Tragoth!',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Equilíbrio e Defesa Máxima',
        scaling: 'O MAIOR Poise (Equilíbrio 100) e Defesa Física de todo o jogo',
        skill: 'Permite ignorar o atordoamento da maioria dos golpes dos chefes',
        fpCost: '0 FP',
        passive: 'Peso elevado: requer alta Tolerância ou talismãs de carga'
      },
      lore: 'Armadura colossal com chifres de touro do Grande Tragoth Tragoth. A armadura mais impenetrável e resistente de todas as Terras Intermédias.',
      guide: 'Invada e derrote o Grande Tragoth na arena do Dragão de Magma Makkar a pedido de Patches na Mansão Vulcânica.',
      walkthroughSteps: [
        '1. Junte-se à Mansão Vulcânica e fale com Patches no corredor.',
        '2. Pegue a carta de contrato de Patches que aponta para Tragoth.',
        '3. Teleporte para a Graça \'Dragão de Magma Makar\' no desfiladeiro de Altus.',
        '4. Interaja com o sinal vermelho no chão, vença Tragoth e pegue o set completo.'
      ],
      mapCoords: 'Arena do Dragão de Magma Makar, Altus.',
      youtubeQuery: 'elden ring bull goat armor set location guide'
    },
    {
      id: 'ar_white_mask',
      name: 'Máscara Branca de Varré (White Mask)',
      nameEn: 'White Mask',
      category: 'armor',
      subtype: 'Elmos com Efeito Especial',
      region: 'underground',
      location: 'Pântano Sangrento (Palácio de Mohgwyn)',
      nearestGrace: 'Entrada do Mausoléu da Dinastia',
      rarity: 'rare',
      icon: '🎭',
      secretType: 'Invasor NPC',
      isMissable: true,
      missableWarning: 'CRÍTICO: Matar Mohg antes de derrotar os invasores Sem-Nome no pântano fará com que eles NÃO apareçam mais!',
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Amplificador de Sangramento',
        scaling: 'Aumenta o Poder de Ataque em +10% por 20 segundos ao causar Sangramento',
        skill: 'Efeito Passivo no Elmo',
        fpCost: '0 FP',
        passive: 'Acumula com o Talismã Exultação do Lorde de Sangue (+32% de dano total!)'
      },
      lore: 'Máscara branca manchada com o sangue de vítimas sacrificadas para a Dinastia Mohgwyn. Essencial para qualquer build de hemorragia.',
      guide: 'Derrote o invasor Máscara Branca Sem Nome no lago de sangue do Palácio Mohgwyn antes de matar o chefe Mohg.',
      walkthroughSteps: [
        '1. Desça até o lago vermelho do Palácio de Mohgwyn.',
        '2. Cavalgue até a área sudeste do lago onde há corvos gigantes.',
        '3. Seja desmontado pela invasão do NPC Máscara Branca.',
        '4. Derrote o invasor para receber o elmo Máscara Branca e o conjunto War Surgeon.'
      ],
      mapCoords: 'Lago vermelho do Palácio Mohgwyn, Siofra Subterrâneo.',
      youtubeQuery: 'elden ring white mask location guide missable'
    },

    /* ==========================================================================
       7. CHEFES PRINCIPAIS & LEMBRANÇAS (Bosses & Remembrances)
       ========================================================================== */
    {
      id: 'b_malenia_blade_of_miquella',
      name: 'Malenia, Espada de Miquella (Malenia Boss)',
      nameEn: 'Malenia, Blade of Miquella',
      category: 'bosses',
      subtype: 'Portadores de Runa',
      region: 'haligtree',
      location: 'Raízes da Árvore Sacra (Elphael)',
      nearestGrace: 'Raízes da Árvore Sacra (Haligtree)',
      rarity: 'legendary',
      icon: '🌸',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Chefe Supremo Opcional',
        scaling: 'Recompensa: 480.000 Runas, Grande Runa de Malenia e Lembrança da Deusa da Podridão',
        skill: 'Permite forjar a Katana Mão de Malenia ou o Encantamento Éon Escarlate',
        fpCost: '0 FP',
        passive: 'Cura a cada golpe que atinge o jogador'
      },
      lore: 'A semideusa invicta em combate e deusa renascida da Podridão Escarlate. O desafio de combate mais famoso e celebrado de Elden Ring.',
      guide: 'Atravesse toda a Árvore Sacra de Miquella e a cidade de Elphael até o elevador final que desce para as Raízes da Árvore.',
      walkthroughSteps: [
        '1. Reúna as duas metades do Medalhão Secreto de Haligtree (Vila dos Albináuricos e Castelo Sol).',
        '2. Use o medalhão no Grande Elevador de Rold para chegar ao Campo de Neve Consagrado.',
        '3. Resolva o enigma litúrgico de Ordina para abrir o portal da Árvore Sacra.',
        '4. Desça por Elphael até a Graça \'Raízes da Árvore Sacra\' e entre na arena de batalha.'
      ],
      mapCoords: 'Câmara mais profunda de Elphael, Árvore Sacra de Miquella.',
      youtubeQuery: 'elden ring malenia boss fight guide how to beat'
    },
    {
      id: 'b_starscourge_radahn',
      name: 'General Radahn, Flagelo Estelar (Radahn Boss)',
      nameEn: 'Starscourge Radahn',
      category: 'bosses',
      subtype: 'Portadores de Runa',
      region: 'caelid',
      location: 'Castelo da Juba Vermelha (Litoral Sul de Caelid)',
      nearestGrace: 'Praça do Castelo da Juba Vermelha',
      rarity: 'legendary',
      icon: '☄️',
      secretType: 'Festival de Combate',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Portador de Runa / Gravidade',
        scaling: 'Recompensa: 70.000 Runas, Grande Runa de Radahn e Lembrança do Flagelo Estelar',
        skill: 'Libera o acesso à Cidade Eterna de Nokron e à DLC (derrotando Mohg)',
        fpCost: '0 FP',
        passive: 'Permite invocar até 8 NPCs aliados repetidamente na arena'
      },
      lore: 'O semideus mais poderoso das Terras Intermédias que conteve o movimento das próprias estrelas no céu com magia gravitacional.',
      guide: 'Ative o Festival de Combate no Castelo da Juba Vermelha (chegando ao Platô Altus ou avançando a quest de Ranni) e use o portal das dunas.',
      walkthroughSteps: [
        '1. Vá para o Castelo da Juba Vermelha no sudeste de Caelid.',
        '2. Converse com Jerren no pátio para anunciar o início do festival.',
        '3. Desça pela capela até o portal de teleporte na praia.',
        '4. Na imensa arena das dunas, invoque os aliados nos sinais brilhantes e derrote Radahn.'
      ],
      mapCoords: 'Dunas do litoral sul de Caelid, Castelo da Juba Vermelha.',
      youtubeQuery: 'elden ring general radahn boss fight guide'
    },
    {
      id: 'b_messmer_the_impaler',
      name: 'Messmer, o Empalador (Messmer Boss DLC)',
      nameEn: 'Messmer the Impaler',
      category: 'bosses',
      subtype: 'Chefes da DLC',
      region: 'shadow_realm',
      location: 'Fortaleza das Sombras (Reino das Sombras)',
      nearestGrace: 'Câmara Escura (Fortaleza das Sombras)',
      rarity: 'dlc',
      icon: '🔥',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Fogo Escuro / Perfuração & Serpente Abissal',
        scaling: 'Recompensa: 400.000 Runas, Lembrança do Empalador e Brasa de Messmer',
        skill: 'Permite queimar a Árvore Seladora para abrir caminho para Enir-Ilim',
        fpCost: '0 FP',
        passive: 'Forja a Lança de Messmer ou o Encantamento Orbe de Messmer'
      },
      lore: 'O filho esquecido de Marika banido para o Reino das Sombras para expurgar os sem-chifres com fogo eterno. Abriga a monstruosa Serpente da Base Abissal.',
      guide: 'Escale o Especimeiro da Fortaleza das Sombras até a Câmara Escura no topo da fortaleza.',
      walkthroughSteps: [
        '1. Entre na Fortaleza das Sombras pelo portão principal derrotando o Hipopótamo Dourado.',
        '2. Suba pelos andares da biblioteca de espécimes manipulando as alavancas centrais.',
        '3. Ative a Graça \'Quarto Escuro\' no sétimo andar.',
        '4. Abra as grandes portas duplas para iniciar a batalha de duas fases contra Messmer.'
      ],
      mapCoords: 'Câmara Escura, topo da Fortaleza das Sombras, DLC.',
      youtubeQuery: 'elden ring messmer the impaler boss guide dlc'
    },
    {
      id: 'b_bayle_the_dread',
      name: 'Bayle, o Pavoroso (Bayle the Dread Boss DLC)',
      nameEn: 'Bayle the Dread',
      category: 'bosses',
      subtype: 'Chefes Supremos da DLC',
      region: 'shadow_realm',
      location: 'Pico Irado (Cume da Montanha de Bayle)',
      nearestGrace: 'Pico Irado Cume (DLC)',
      rarity: 'dlc',
      icon: '🌋',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Fogo de Magma & Raio Carmesim Dracônico',
        scaling: 'Recompensa: 490.000 Runas e Coração de Bayle',
        skill: 'Forja a Tirania de Bayle ou a Chama de Magma de Bayle na Grande Comunhão Dracônica',
        fpCost: '0 FP',
        passive: 'Permite invocar Igon gritando suas lendárias falas de vingança na arena'
      },
      lore: 'O dragão titânico tirano que desafiou o Lorde Dragão Placidusax na antiguidade, decepando duas de suas cabeças antes de fugir para o Pico Irado.',
      guide: 'Suba todo o Pico Irado na DLC enfrentando tempestades de raios e invoque o lendário guerreiro Igon na arena.',
      walkthroughSteps: [
        '1. Siga pela caverna Fosso do Dragão até o Vale dos Dragões.',
        '2. Ajude o guerreiro Igon e pegue seu Dedo de Invocação.',
        '3. Suba o Pico Irado derrotando os Dragões Anciões Senessax e do Pico.',
        '4. Entre no olho do vulcão para a épica batalha contra Bayle.'
      ],
      mapCoords: 'Cume do Pico Irado, Reino das Sombras.',
      youtubeQuery: 'elden ring bayle the dread boss guide igon'
    },
    {
      id: 'b_promised_consort_radahn',
      name: 'Radahn, Consorte Prometido (Chefe Final da DLC)',
      nameEn: 'Promised Consort Radahn',
      category: 'bosses',
      subtype: 'Chefe Final da DLC',
      region: 'shadow_realm',
      location: 'Portão da Divindade (Enir-Ilim)',
      nearestGrace: 'Portão da Divindade (Enir-Ilim)',
      rarity: 'dlc',
      icon: '👑',
      secretType: 'Chefe de Masmorra',
      isMissable: false,
      missableWarning: null,
      requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
      combatStats: {
        damageType: 'Físico / Gravidade / Luz Sagrada de Miquella',
        scaling: 'Recompensa: 500.000 Runas e Lembrança de um Deus e um Lorde',
        skill: 'Forja as Espadas Grandes de Radahn (Lorde / Luz) ou o Encantamento Luz de Miquella',
        fpCost: '0 FP',
        passive: 'O ápice de desafio e velocidade em toda a história dos jogos Soulsborne'
      },
      lore: 'O semideus Radahn ressuscitado em seu auge físico, jurado como Consorte e Lorde pelo jovem deus Miquella diante do Portão da Divindade.',
      guide: 'Queime a Árvore Seladora com a Brasa de Messmer para desbloquear a torre sagrada de Enir-Ilim e suba até o topo.',
      walkthroughSteps: [
        '1. Derrote Messmer e Romina para queimar a árvore seladora.',
        '2. Suba todos os níveis da torre sagrada de Enir-Ilim.',
        '3. Derrote Leda e seus aliados no confronto de NPCs no átrio.',
        '4. Suba a escadaria monumental até o Portão da Divindade para a batalha final.'
      ],
      mapCoords: 'Portão da Divindade, topo de Enir-Ilim, DLC.',
      youtubeQuery: 'elden ring promised consort radahn boss fight guide how to beat'
    }
  ];

  // --- 5. STORAGE MANAGER ---
  const STORAGE_KEY = 'eldentrack_save_data_v1';
  const DEFAULT_SAVE_STATE = {
    version: 1,
    activeCharacterId: 'char_default',
    characters: [
      {
        id: 'char_default',
        name: 'Maculado das Terras Intermédias',
        build: 'Qualidade / Equilibrado',
        acquired: [],
        wishlist: [],
        createdAt: new Date().toISOString()
      }
    ],
    settings: {
      soundEffects: true,
      theme: 'erdtree',
      viewMode: 'route'
    }
  };

  const StorageManager = {
    load() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
          this.save(DEFAULT_SAVE_STATE);
          return DEFAULT_SAVE_STATE;
        }
        const parsed = JSON.parse(data);
        if (!parsed.characters || !Array.isArray(parsed.characters)) {
          return DEFAULT_SAVE_STATE;
        }
        return parsed;
      } catch (err) {
        return DEFAULT_SAVE_STATE;
      }
    },

    save(data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
      } catch (err) {
        return false;
      }
    },

    exportSaveFile(data) {
      try {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `eldentrack_save_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return true;
      } catch (err) {
        return false;
      }
    },

    async importSaveFile(file) {
      return new Promise((resolve, reject) => {
        if (!file) {
          reject(new Error('Nenhum arquivo fornecido.'));
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const content = JSON.parse(event.target.result);
            if (!content.characters || !Array.isArray(content.characters)) {
              throw new Error('Formato de save inválido.');
            }
            this.save(content);
            resolve(content);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = (err) => reject(err);
        reader.readAsText(file);
      });
    },

    resetProgress() {
      this.save(DEFAULT_SAVE_STATE);
      return DEFAULT_SAVE_STATE;
    }
  };

  // --- 6. DATA SERVICE ---
  const DataService = {
    getAllItems() { return ITEMS_DATA; },
    getCategories() { return CATEGORIES; },
    getRegions() { return REGIONS; },

    filterItems({ category = 'all', region = 'all_regions', search = '', query = '', status = 'all', acquiredIds = [], wishlistIds = [] }) {
      const rawQuery = search || query || '';
      const clean = normalizeText(rawQuery);
      // Divide em palavras-chave, ignorando tokens de 1-2 letras (stop words)
      const queryWords = clean ? clean.split(/\s+/).filter(w => w.length >= 2) : [];

      // Monta aliases: apenas frases completas que combinem com a busca (não tokens soltos)
      const matchingAliasGroups = [];
      if (clean && clean.length >= 3) {
        for (const [enKey, ptList] of Object.entries(BILINGUAL_DICTIONARY)) {
          const normEn = normalizeText(enKey);
          const allAliases = [normEn, ...ptList.map(normalizeText)];
          
          // Verifica se a busca bate com ALGUM alias deste grupo
          const groupMatches = allAliases.some(alias => {
            if (alias.length < 3) return false;
            // Match direto (substring nos dois sentidos) ou Levenshtein para queries >= 4 chars
            if (alias.includes(clean) || clean.includes(alias)) return true;
            if (clean.length >= 4 && alias.length >= 4 && levenshteinDistance(clean, alias) <= 1) return true;
            // Testa token a token para frases compostas (ex: "rios de sangue" vs "sangue")
            const aliasWords = alias.split(/\s+/).filter(w => w.length >= 3);
            return aliasWords.some(aw => aw.includes(clean) || clean.includes(aw) || (clean.length >= 4 && aw.length >= 4 && levenshteinDistance(clean, aw) <= 1));
          });

          if (groupMatches) {
            // Guarda todas as frases/tokens relevantes DESTE grupo para busca
            matchingAliasGroups.push(...allAliases);
          }
        }
      }

      return ITEMS_DATA.filter(item => {
        // --- Filtros de categoria, região e status (não dependem da busca) ---
        if (category !== 'all' && item.category !== category) return false;
        if (region !== 'all_regions' && item.region !== region) return false;

        const isAcquired = acquiredIds.includes(item.id);
        const isWishlisted = wishlistIds.includes(item.id);
        if (status === 'acquired' && !isAcquired) return false;
        if (status === 'missing' && isAcquired) return false;
        if (status === 'wishlist' && !isWishlisted) return false;

        // --- Se não há busca ativa, exibir o item ---
        if (!clean || clean.length < 2) return true;

        // --- Texto do item normalizado (corpus completo) ---
        const itemText = normalizeText([
          item.name, item.nameEn || '', item.subtype || '',
          item.location || '', item.nearestGrace || '',
          item.lore || '', item.guide || '',
          item.secretType || '',
          item.combatStats?.skill || '',
          item.combatStats?.damageType || '',
          item.combatStats?.passive || ''
        ].join(' '));

        // --- 1. A QUERY INTEIRA aparece como substring do texto do item (método mais confiável) ---
        if (itemText.includes(clean)) return true;

        // --- 2. Verificar aliases: se a frase do alias aparecer no texto do item ---
        if (matchingAliasGroups.length > 0) {
          for (const alias of matchingAliasGroups) {
            if (!alias || alias.length < 3) continue;
            if (itemText.includes(alias)) return true;
          }
        }

        // --- 3. Fuzzy word-by-word: cada palavra da query bate com algum token do item ---
        //    (só para corrigir erros de digitação, ex: "rapieira" vs "rapiira")
        if (queryWords.length > 0) {
          const itemTokens = itemText.split(/\s+/).filter(w => w.length >= 3);
          const fuzzyMatch = queryWords.every(word => isFuzzyTokenMatch(word, itemTokens));
          if (fuzzyMatch) return true;
        }

        return false;
      });
    },

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

  // --- 7. STATE STORE ---
  class StateStore {
    constructor() {
      this.listeners = new Set();
      const saved = StorageManager.load();
      this.saveData = saved;
      this.activeCharacterId = saved.activeCharacterId || 'char_default';

      const curChar = saved.characters.find(c => c.id === this.activeCharacterId) || saved.characters[0];
      this.acquiredIds = curChar.acquired || [];
      this.wishlistIds = curChar.wishlist || [];

      this.theme = saved.settings?.theme || 'erdtree';
      this.viewMode = saved.settings?.viewMode || 'route';
      document.documentElement.setAttribute('data-theme', this.theme);

      this.activeCategory = 'all';
      this.activeRegion = 'all_regions';
      this.searchQuery = '';
      this.statusFilter = 'all';
      this.activeDrawerTab = 'walkthrough';
      this.isLoading = false;
      this.selectedItem = null;
      this.statsModalOpen = false;

      this.currentItems = [];
      this.currentSections = [];
      this.currentRoadmap = [];
      this._refreshData();
    }

    subscribe(listener) {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    }

    notify(eventName, payload) {
      this.listeners.forEach(listener => {
        try { listener(eventName, this.getState(), payload); } catch (e) {}
      });
    }

    getState() {
      const curChar = this.saveData.characters.find(c => c.id === this.activeCharacterId) || this.saveData.characters[0];
      const stats = DataService.getCounts(this.acquiredIds);

      return {
        theme: this.theme,
        viewMode: this.viewMode,
        activeCategory: this.activeCategory,
        activeRegion: this.activeRegion,
        searchQuery: this.searchQuery,
        statusFilter: this.statusFilter,
        activeDrawerTab: this.activeDrawerTab,
        acquiredIds: this.acquiredIds,
        wishlistIds: this.wishlistIds,
        items: this.currentItems,
        sections: this.currentSections,
        roadmap: this.currentRoadmap,
        stats,
        activeCharacter: curChar,
        isLoading: this.isLoading,
        selectedItem: this.selectedItem,
        statsModalOpen: this.statsModalOpen
      };
    }

    _refreshData() {
      const filterParams = {
        category: this.activeCategory,
        region: this.activeRegion,
        query: this.searchQuery,
        status: this.statusFilter,
        acquiredIds: this.acquiredIds,
        wishlistIds: this.wishlistIds
      };

      const items = DataService.filterItems(filterParams);

      // Seções por Categoria
      const categories = CATEGORIES.filter(c => c.id !== 'all');
      const sections = categories.map(cat => {
        const catItems = items.filter(item => item.category === cat.id);
        const acquiredCount = catItems.filter(i => this.acquiredIds.includes(i.id)).length;
        const totalCount = catItems.length;
        const percentage = totalCount > 0 ? Math.round((acquiredCount / totalCount) * 100) : 0;
        return { ...cat, items: catItems, total: totalCount, acquired: acquiredCount, percentage };
      }).filter(sec => sec.total > 0);

      // Rota de Campanha por Regiões
      const validRegions = REGIONS.filter(r => r.id !== 'all_regions').sort((a, b) => (a.order || 0) - (b.order || 0));
      const roadmap = validRegions.map(reg => {
        const regItems = items.filter(item => item.region === reg.id);
        const allInRegion = ITEMS_DATA.filter(i => i.region === reg.id);
        const acquiredCount = allInRegion.filter(i => this.acquiredIds.includes(i.id)).length;
        const totalCount = allInRegion.length;
        const percentage = totalCount > 0 ? Math.round((acquiredCount / totalCount) * 100) : 0;
        return { ...reg, items: regItems, total: totalCount, acquired: acquiredCount, percentage };
      }).filter(r => r.items.length > 0 || (this.activeCategory === 'all' && !this.searchQuery && this.statusFilter === 'all'));

      this.currentItems = items;
      this.currentSections = sections;
      this.currentRoadmap = roadmap;
    }

    setTheme(themeName) {
      if (this.theme === themeName) return;
      this.theme = themeName;
      document.documentElement.setAttribute('data-theme', themeName);
      if (!this.saveData.settings) this.saveData.settings = {};
      this.saveData.settings.theme = themeName;
      StorageManager.save(this.saveData);
      this.notify('theme_changed', { theme: themeName });
    }

    setViewMode(mode) {
      if (this.viewMode === mode) return;
      this.viewMode = mode;
      if (!this.saveData.settings) this.saveData.settings = {};
      this.saveData.settings.viewMode = mode;
      StorageManager.save(this.saveData);
      this.notify('view_mode_changed', { mode });
    }

    setDrawerTab(tabName) {
      this.activeDrawerTab = tabName;
      this.notify('drawer_tab_changed', { tabName });
    }

    toggleAcquired(itemId) {
      const idx = this.acquiredIds.indexOf(itemId);
      let isNow = false;
      if (idx >= 0) {
        this.acquiredIds.splice(idx, 1);
      } else {
        this.acquiredIds.push(itemId);
        isNow = true;
      }
      this._syncSave();
      this._refreshData();
      this.notify('item_acquired_toggled', { itemId, isNowAcquired: isNow });
    }

    toggleWishlist(itemId) {
      const idx = this.wishlistIds.indexOf(itemId);
      let isWish = false;
      if (idx >= 0) {
        this.wishlistIds.splice(idx, 1);
      } else {
        this.wishlistIds.push(itemId);
        isWish = true;
      }
      this._syncSave();
      this._refreshData();
      this.notify('item_wishlist_toggled', { itemId, isWishlisted: isWish });
    }

    setCategory(categoryId) {
      if (this.activeCategory === categoryId) return;
      this.activeCategory = categoryId;
      this._refreshData();
      this.notify('category_changed', { categoryId });
    }

    setRegion(regionId) {
      if (this.activeRegion === regionId) return;
      this.activeRegion = regionId;
      this._refreshData();
      this.notify('region_changed', { regionId });
    }

    setSearchQuery(query) {
      this.searchQuery = query;
      this._refreshData();
      this.notify('search_changed', { query });
    }

    setStatusFilter(status) {
      if (this.statusFilter === status) return;
      this.statusFilter = status;
      this._refreshData();
      this.notify('status_filter_changed', { status });
    }

    setSelectedItem(item) {
      this.selectedItem = item;
      if (item) this.activeDrawerTab = 'walkthrough';
      this.notify('selected_item_changed', { item });
    }

    toggleStatsModal(open) {
      this.statsModalOpen = typeof open === 'boolean' ? open : !this.statsModalOpen;
      this.notify('stats_modal_toggled', { open: this.statsModalOpen });
    }

    exportSave() {
      return StorageManager.exportSaveFile(this.saveData);
    }

    async importSave(file) {
      const data = await StorageManager.importSaveFile(file);
      this.saveData = data;
      this.activeCharacterId = data.activeCharacterId || data.characters[0].id;
      const curChar = data.characters.find(c => c.id === this.activeCharacterId) || data.characters[0];
      this.acquiredIds = curChar.acquired || [];
      this.wishlistIds = curChar.wishlist || [];
      this._refreshData();
      this.notify('save_imported', { character: curChar });
      return true;
    }

    resetAllProgress() {
      this.saveData = StorageManager.resetProgress();
      this.activeCharacterId = this.saveData.activeCharacterId;
      this.acquiredIds = [];
      this.wishlistIds = [];
      this._refreshData();
      this.notify('progress_reset', {});
    }

    _syncSave() {
      const curChar = this.saveData.characters.find(c => c.id === this.activeCharacterId);
      if (curChar) {
        curChar.acquired = [...this.acquiredIds];
        curChar.wishlist = [...this.wishlistIds];
      }
      this.saveData.activeCharacterId = this.activeCharacterId;
      StorageManager.save(this.saveData);
    }
  }

  const Store = new StateStore();

  // --- 8. TOAST NOTIFICATIONS ---
  const Toast = {
    show({ title, message, icon = '✨', duration = 3200, playSound = false }) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <div class="toast-content">
          <div class="toast-title">${title}</div>
          <div class="toast-desc">${message}</div>
        </div>
      `;

      container.appendChild(toast);

      if (playSound) {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.25); // G5
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.45);
        } catch (e) {}
      }

      setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 260);
      }, duration);
    }
  };

  // --- 9. UI RENDER ENGINE ---
  const UI = {
    renderHeader(state) {
      const stats = state.stats;
      const curChar = state.activeCharacter;
      const curTheme = state.theme || 'erdtree';
      const curView = state.viewMode || 'route';

      const themeLabel = curTheme === 'moonlight' ? '🌙 Luar de Caria' :
                         curTheme === 'shadow' ? '🔥 Chama das Sombras' :
                         '🌟 Graça Dourada';

      return `
        <header class="app-header">
          <div class="brand-container" id="brand-home-btn" title="Voltar ao início">
            <svg class="brand-logo-rune animate-glow-breath" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="3" opacity="0.6"/>
              <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="2"/>
              <path d="M50 8 L50 92 M8 50 L92 50 M20 20 L80 80 M80 20 L20 80" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
              <circle cx="50" cy="50" r="10" fill="currentColor"/>
            </svg>
            <div>
              <h1 class="brand-title">ELDENTRACK</h1>
              <div class="brand-subtitle">Site para meus amigos do Elden ring</div>
            </div>
          </div>

          <div class="header-center">
            <div class="search-wrapper">
              <span class="search-icon">🔍</span>
              <input type="text" 
                     class="search-input" 
                     id="search-input" 
                     placeholder="Buscar armas, magias, talismãs, locais, graças..." 
                     value="${state.searchQuery || ''}" 
                     autocomplete="off" />
              <span class="search-shortcut">Ctrl+K</span>
            </div>
          </div>

          <div class="header-actions">
            <!-- View Modes Bar -->
            <div class="view-modes-bar" role="tablist">
              <button class="view-mode-pill ${curView === 'route' ? 'active' : ''}" data-view="route" title="Modo Rota de Campanha">
                🗺️ Rota
              </button>
              <button class="view-mode-pill ${curView === 'grid' ? 'active' : ''}" data-view="grid" title="Modo Cards">
                🔲 Cards
              </button>
              <button class="view-mode-pill ${curView === 'categories' ? 'active' : ''}" data-view="categories" title="Modo Categorias">
                📑 Categorias
              </button>
              <button class="view-mode-pill ${curView === 'checklist' ? 'active' : ''}" data-view="checklist" title="Modo Checklist Rápido">
                📋 Lista
              </button>
            </div>

            <!-- Theme Switcher Button -->
            <button class="theme-selector-btn" id="theme-toggle-btn" title="Alternar Tema Visual (Graça, Luar, Sombras)">
              ${themeLabel}
            </button>

            <!-- Overall Progress Box -->
            <div class="header-progress-box" id="open-stats-btn" style="cursor: pointer;" title="Abrir Estatísticas">
              <div class="progress-circular-mini">
                <svg viewBox="0 0 36 36" style="width: 100%; height: 100%;">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3.5" />
                  <path id="header-progress-bar-path" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--gold-primary)" stroke-width="3.5" stroke-dasharray="${stats.percentage}, 100" stroke-linecap="round" />
                </svg>
              </div>
              <span class="progress-text-mini" id="header-progress-text">${stats.percentage}%</span>
            </div>

            <!-- Character Profile -->
            <button class="btn btn-secondary" id="save-menu-btn" style="padding: 5px 12px; font-size: 0.82rem;" title="Gerenciar Save">
              🛡️ ${curChar?.name ? curChar.name.split(' ')[0] : 'Maculado'}
            </button>
          </div>
        </header>
      `;
    },

    updateHeader(headerRoot, state, eventName) {
      if (!headerRoot) return;
      if (!headerRoot.querySelector('.app-header')) {
        headerRoot.innerHTML = this.renderHeader(state);
        return;
      }

      const stats = state.stats;
      const curTheme = state.theme || 'erdtree';
      const curView = state.viewMode || 'route';

      // 1. Atualizar botões de modo de exibição
      const pills = headerRoot.querySelectorAll('.view-mode-pill');
      pills.forEach(pill => {
        if (pill.dataset.view === curView) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });

      // 2. Atualizar botão de tema
      const themeBtn = headerRoot.querySelector('#theme-toggle-btn');
      if (themeBtn) {
        themeBtn.textContent = curTheme === 'moonlight' ? '🌙 Luar de Caria' :
                               curTheme === 'shadow' ? '🔥 Chama das Sombras' :
                               '🌟 Graça Dourada';
      }

      // 3. Atualizar progresso circular
      const progressPath = headerRoot.querySelector('#header-progress-bar-path');
      if (progressPath) {
        progressPath.setAttribute('stroke-dasharray', `${stats.percentage}, 100`);
      }
      const progressText = headerRoot.querySelector('#header-progress-text');
      if (progressText) {
        progressText.textContent = `${stats.percentage}%`;
      }

      // 4. Sincronizar input de busca caso venha de evento externo (ex: limpar)
      const searchInput = headerRoot.querySelector('#search-input');
      if (searchInput && eventName !== 'search_changed') {
        if (searchInput.value !== (state.searchQuery || '')) {
          searchInput.value = state.searchQuery || '';
        }
      }
    },

    renderHeroBar(state) {
      const viewTitle = state.viewMode === 'route' ? '🗺️ Rota de Campanha' :
                        state.viewMode === 'categories' ? '📑 Compêndio por Categorias' :
                        state.viewMode === 'checklist' ? '📋 Checklist Rápido de Jogo' :
                        '🔲 Catálogo de Segredos';

      const viewDesc = state.viewMode === 'route' ? 'Progressão natural das Terras Intermédias ao Reino das Sombras.' :
                       state.viewMode === 'categories' ? 'Armas, talismãs, magias, itens chave e chefes separados por taxonomia.' :
                       state.viewMode === 'checklist' ? 'Lista compacta para marcar itens rapidamente durante sua jogatina.' :
                       'Explore os segredos mais poderosos das Terras Intermédias.';

      return `
        <div class="slim-hero-bar">
          <div class="hero-left-info">
            <div class="hero-badge-icon">✨</div>
            <div>
              <h2 class="hero-title">${viewTitle}</h2>
              <div class="hero-subtitle">${viewDesc}</div>
            </div>
          </div>

          <div class="hero-stats-strip">
            <div class="hero-stat-chip">
              <span style="color: var(--status-acquired);">✓</span>
              <span>Obtidos: <strong>${state.stats.acquired}</strong></span>
            </div>
            <div class="hero-stat-chip">
              <span style="color: var(--status-missing);">○</span>
              <span>Faltantes: <strong>${state.stats.missing}</strong></span>
            </div>
            <div class="hero-stat-chip">
              <span style="color: var(--gold-primary);">★</span>
              <span>Favoritos: <strong>${state.wishlistIds.length}</strong></span>
            </div>
          </div>
        </div>
      `;
    },

    renderFilterBar(state) {
      const categories = DataService.getCategories();
      const regions = DataService.getRegions();
      const stats = state.stats;

      const categoryChips = categories.map(cat => {
        const isActive = state.activeCategory === cat.id;
        const count = stats.byCategory[cat.id]?.total || 0;
        const acquired = stats.byCategory[cat.id]?.acquired || 0;
        return `
          <button class="category-chip ${isActive ? 'active' : ''}" data-category-id="${cat.id}">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
            <span class="count-badge">${acquired}/${count}</span>
          </button>
        `;
      }).join('');

      const regionOptions = regions.map(reg => {
        const isSelected = state.activeRegion === reg.id ? 'selected' : '';
        const regStat = stats.byRegion[reg.id];
        const countLabel = regStat ? ` (${regStat.acquired}/${regStat.total})` : '';
        return `<option value="${reg.id}" ${isSelected}>${reg.badge || ''} ${reg.name}${countLabel}</option>`;
      }).join('');

      const hasActiveFilters = state.activeCategory !== 'all' || 
                              state.activeRegion !== 'all_regions' || 
                              state.statusFilter !== 'all' || 
                              state.searchQuery !== '';

      return `
        <div class="filter-container">
          <div class="categories-scroll" id="categories-scroll-container">
            ${categoryChips}
          </div>

          <div class="sub-filters-row">
            <div class="status-pills">
              <button class="status-pill ${state.statusFilter === 'all' ? 'active' : ''}" data-status="all">
                Todos (${stats.total})
              </button>
              <button class="status-pill ${state.statusFilter === 'acquired' ? 'active' : ''}" data-status="acquired">
                ✓ Obtidos (${stats.acquired})
              </button>
              <button class="status-pill ${state.statusFilter === 'missing' ? 'active' : ''}" data-status="missing">
                ○ Faltantes (${stats.missing})
              </button>
              <button class="status-pill ${state.statusFilter === 'wishlist' ? 'active' : ''}" data-status="wishlist">
                ★ Favoritos (${state.wishlistIds.length})
              </button>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <select class="custom-select" id="region-select" aria-label="Filtrar por Região">
                ${regionOptions}
              </select>

              ${hasActiveFilters ? `
                <button class="btn btn-ghost" id="clear-filters-btn" style="padding: 5px 10px; font-size: 0.78rem;" title="Limpar filtros">
                  ✕ Limpar
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    },

    renderItemCard(item, state) {
      const isAcquired = state.acquiredIds.includes(item.id);
      const isWishlisted = state.wishlistIds.includes(item.id);
      const rarityClass = `rarity-${item.rarity || 'common'}`;
      const acquiredClass = isAcquired ? 'is-acquired' : '';
      
      const nameDisplay = highlightText(item.name, state.searchQuery);
      const graceDisplay = highlightText(item.nearestGrace || item.location, state.searchQuery);
      const subtypeDisplay = highlightText(item.subtype || item.category, state.searchQuery);
      
      // Query em PT-BR direcionada para criadores brasileiros
      const rawYtQuery = item.youtubeQuery || (
        item.category === 'bosses'
          ? `elden ring como derrotar ${item.name} pt br`
          : `elden ring como pegar ${item.name} localizacao pt br`
      );
      const ptBrQuery = rawYtQuery.toLowerCase().includes('pt br') ? rawYtQuery : `${rawYtQuery} pt br`;
      const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(ptBrQuery)}&sp=EgIQAQ%253D%253D&gl=BR&hl=pt`;

      return `
        <div class="item-card stagger-item ${rarityClass} ${acquiredClass}" data-item-id="${item.id}">
          <div class="card-top">
            <div class="item-icon-wrapper">${item.icon || '⚔️'}</div>
            
            <div class="card-info">
              <h3 class="item-title" title="${item.name}">${nameDisplay}</h3>
              
              <div class="item-meta-badges">
                <span class="badge-tag">${subtypeDisplay}</span>
                ${item.isMissable ? `<span class="badge-tag missable">⚠️ Perdível</span>` : ''}
                ${item.secretType ? `<span class="badge-tag">${item.secretType}</span>` : ''}
              </div>
            </div>

            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    data-action="wishlist" 
                    data-id="${item.id}"
                    title="${isWishlisted ? 'Remover dos favoritos' : 'Favoritar item'}">
              ${isWishlisted ? '★' : '☆'}
            </button>
          </div>

          <div class="card-location-snippet" title="${item.nearestGrace || item.location}">
            <span>📍</span>
            <span>${graceDisplay}</span>
          </div>

          <div class="card-footer">
            <button class="grace-check-btn ${isAcquired ? 'checked' : ''}" 
                    data-action="toggle-acquired" 
                    data-id="${item.id}">
              ${isAcquired ? '✓ Obtido' : '○ Obter Item'}
            </button>
            
            <div style="display: flex; align-items: center; gap: 6px;">
              <a href="${ytUrl}" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="youtube-badge-btn" 
                 title="▶ Ver o 1º vídeo guia em Português (PT-BR) no YouTube"
                 onclick="event.stopPropagation();">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                <span>▶ Vídeo BR</span>
              </a>

              <button class="btn btn-ghost" style="padding: 4px 8px; font-size: 0.78rem;" data-action="details" data-id="${item.id}">
                Guia ➔
              </button>
            </div>
          </div>
        </div>
      `;
    },

    renderChecklistRow(item, state) {
      const isAcquired = state.acquiredIds.includes(item.id);
      const isWishlisted = state.wishlistIds.includes(item.id);

      const nameDisplay = highlightText(item.name, state.searchQuery);
      const graceDisplay = highlightText(item.nearestGrace || item.location, state.searchQuery);
      const subtypeDisplay = highlightText(item.subtype || item.category, state.searchQuery);

      const rawYtQuery = item.youtubeQuery || (
        item.category === 'bosses'
          ? `elden ring como derrotar ${item.name} pt br`
          : `elden ring como pegar ${item.name} localizacao pt br`
      );
      const ptBrQuery = rawYtQuery.toLowerCase().includes('pt br') ? rawYtQuery : `${rawYtQuery} pt br`;
      const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(ptBrQuery)}&sp=EgIQAQ%253D%253D&gl=BR&hl=pt`;

      return `
        <div class="checklist-row ${isAcquired ? 'is-acquired' : ''}" data-item-id="${item.id}">
          <div class="checklist-left">
            <div class="checklist-icon">${item.icon || '⚔️'}</div>
            <div style="min-width: 0;">
              <div class="checklist-name">${nameDisplay}</div>
              <div class="checklist-details">📍 ${graceDisplay} &bull; ${subtypeDisplay}</div>
            </div>
          </div>

          <div class="checklist-actions">
            ${item.isMissable ? `<span class="badge-tag missable">⚠️ Perdível</span>` : ''}

            <a href="${ytUrl}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="youtube-badge-btn" 
               title="Ver tutorial em vídeo no YouTube"
               onclick="event.stopPropagation();">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <span>Vídeo</span>
            </a>

            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-action="wishlist" data-id="${item.id}">
              ${isWishlisted ? '★' : '☆'}
            </button>

            <button class="grace-check-btn ${isAcquired ? 'checked' : ''}" data-action="toggle-acquired" data-id="${item.id}">
              ${isAcquired ? '✓' : '○'}
            </button>

            <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" data-action="details" data-id="${item.id}">
              Guia
            </button>
          </div>
        </div>
      `;
    },

    renderRoadmapView(roadmap, state) {
      if (!roadmap || roadmap.length === 0) {
        return `
          <div class="empty-state">
            <div class="empty-icon">🕯️</div>
            <div class="empty-title">Nenhum Segredo Encontrado</div>
            <p class="empty-desc">Nenhum item corresponde aos filtros selecionados ${state.searchQuery ? `ou à busca "${state.searchQuery}"` : ''}.</p>
            ${state.searchQuery ? `
              <button class="btn btn-secondary" id="clear-search-empty-btn" style="margin-top: 14px;">
                ✕ Limpar Busca
              </button>
            ` : ''}
          </div>
        `;
      }

      const blocksHtml = roadmap.map(reg => {
        const cardsHtml = reg.items.map(item => UI.renderItemCard(item, state)).join('');
        return `
          <div class="roadmap-region-block" id="region-block-${reg.id}">
            <div class="roadmap-region-header" data-toggle-region="${reg.id}">
              <div class="roadmap-title-area">
                <div class="roadmap-region-icon">${reg.icon || '🏰'}</div>
                <div>
                  <h3 class="roadmap-region-name">${reg.name}</h3>
                  <div class="roadmap-region-desc">
                    ${reg.recommendedLevel ? `<span style="color: var(--gold-light); font-weight: 500;">${reg.recommendedLevel}</span> &bull; ` : ''}
                    ${reg.description || ''}
                  </div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                  <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--gold-light);">
                    ${reg.acquired} / ${reg.total} (${reg.percentage}%)
                  </span>
                  <div class="progress-bar-bg" style="width: 100px;">
                    <div class="progress-bar-fill" style="width: ${reg.percentage}%;"></div>
                  </div>
                </div>
                <button class="section-collapse-btn" title="Recolher / Expandir">▾</button>
              </div>
            </div>

            <div class="roadmap-region-content" id="region-content-${reg.id}">
              <div class="items-grid">${cardsHtml}</div>
            </div>
          </div>
        `;
      }).join('');

      return `<div class="route-roadmap-container">${blocksHtml}</div>`;
    },

    renderCategoriesView(sections, state) {
      if (!sections || sections.length === 0) {
        return `
          <div class="empty-state">
            <div class="empty-icon">🕯️</div>
            <div class="empty-title">Nenhum Segredo Encontrado</div>
            <p class="empty-desc">Nenhum item corresponde aos filtros selecionados ${state.searchQuery ? `ou à busca "${state.searchQuery}"` : ''}.</p>
            ${state.searchQuery ? `
              <button class="btn btn-secondary" id="clear-search-empty-btn" style="margin-top: 14px;">
                ✕ Limpar Busca
              </button>
            ` : ''}
          </div>
        `;
      }

      const navAnchors = sections.map(sec => `
        <a href="#cat-section-${sec.id}" class="category-chip" style="font-size: 0.78rem;">
          <span>${sec.icon}</span>
          <span>${sec.name.split(' ')[0]}</span>
          <span class="count-badge">${sec.acquired}/${sec.total}</span>
        </a>
      `).join('');

      const blocks = sections.map(sec => {
        const cardsHtml = sec.items.map(item => UI.renderItemCard(item, state)).join('');
        return `
          <div class="category-section-block" id="cat-section-${sec.id}">
            <div class="section-header" data-toggle-cat="${sec.id}">
              <div class="section-title-group">
                <span class="section-icon">${sec.icon}</span>
                <div>
                  <h3 class="section-heading">${sec.name}</h3>
                  <div class="section-subtext">${sec.description || ''}</div>
                </div>
              </div>

              <div class="section-meta-group">
                <div class="section-progress-widget">
                  <span class="section-progress-label">${sec.acquired} / ${sec.total} (${sec.percentage}%)</span>
                  <div class="progress-bar-bg" style="width: 100px;">
                    <div class="progress-bar-fill" style="width: ${sec.percentage}%;"></div>
                  </div>
                </div>
                <button class="section-collapse-btn">▾</button>
              </div>
            </div>

            <div class="section-content" id="cat-content-${sec.id}">
              <div class="items-grid">${cardsHtml}</div>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="section-view-wrapper">
          <div class="categories-scroll" style="padding-bottom: 8px;">${navAnchors}</div>
          <div style="display: flex; flex-direction: column; gap: 18px;">${blocks}</div>
        </div>
      `;
    },

    renderChecklistView(items, state) {
      if (!items || items.length === 0) {
        return `
          <div class="empty-state">
            <div class="empty-icon">🕯️</div>
            <div class="empty-title">Nenhum Item Encontrado</div>
            <p class="empty-desc">Nenhum item corresponde aos filtros ${state.searchQuery ? `ou à busca "${state.searchQuery}"` : ''}.</p>
            ${state.searchQuery ? `
              <button class="btn btn-secondary" id="clear-search-empty-btn" style="margin-top: 14px;">
                ✕ Limpar Busca
              </button>
            ` : ''}
          </div>
        `;
      }
      return `<div class="checklist-container">${items.map(i => UI.renderChecklistRow(i, state)).join('')}</div>`;
    },

    renderCompendiumDrawer(item, state) {
      if (!item) return '';

      const isAcquired = state.acquiredIds.includes(item.id);
      const isWishlisted = state.wishlistIds.includes(item.id);
      const activeTab = state.activeDrawerTab || 'walkthrough';
      const reqs = item.requirements || {};
      const combat = item.combatStats || {};

      // Query PT-BR direcionada para criadores brasileiros
      const rawYtQuery = item.youtubeQuery || (
        item.category === 'bosses'
          ? `elden ring como derrotar ${item.name} pt br`
          : `elden ring como pegar ${item.name} localizacao pt br`
      );
      const ptBrQuery = rawYtQuery.toLowerCase().includes('pt br') ? rawYtQuery : `${rawYtQuery} pt br`;

      // sp=EgIQAQ== filtra por "Vídeos" e gl=BR&hl=pt fixa o YouTube no Brasil em Português
      const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(ptBrQuery)}&sp=EgIQAQ%253D%253D&gl=BR&hl=pt`;
      // URL de embed via busca do YouTube — exibe o 1º vídeo do resultado em PT-BR
      const ytEmbedUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(ptBrQuery)}&autoplay=0`;
      // Descrição coerente de contexto para o vídeo em português
      const ytVideoDesc = item.videoDescription || (
        item.category === 'bosses'
          ? `Vídeo em PT-BR: Como derrotar ${item.name} com estratégias e fases da batalha.`
          : item.category === 'spells'
          ? `Vídeo em PT-BR: Como obter a magia "${item.name}" — localização e guia completo.`
          : item.category === 'talismans'
          ? `Vídeo em PT-BR: Onde encontrar o talismã "${item.name}" — mapa e rota em português.`
          : item.category === 'ashes'
          ? `Vídeo em PT-BR: Como conseguir a Cinza de Guerra / Invocação "${item.name}".`
          : item.category === 'key_items'
          ? `Vídeo em PT-BR: Onde obter "${item.name}" — localização e utilidade no jogo.`
          : `Vídeo em PT-BR: Como pegar "${item.name}" — rota exata no mapa passo a passo.`
      );

      const stepsHtml = (item.walkthroughSteps && item.walkthroughSteps.length > 0)
        ? item.walkthroughSteps.map((step, idx) => `
            <div class="walkthrough-step-card">
              <div class="step-number">${idx + 1}</div>
              <div class="step-text">${step}</div>
            </div>
          `).join('')
        : `
            <div class="walkthrough-step-card">
              <div class="step-number">1</div>
              <div class="step-text">${item.guide || 'Explore a área indicada.'}</div>
            </div>
          `;

      return `
        <div class="drawer-overlay active" id="item-drawer-overlay">
          <aside class="drawer-panel" role="dialog" aria-modal="true">
            <div class="drawer-header">
              <div class="drawer-icon-box">${item.icon || '⚔️'}</div>
              <div style="flex: 1; min-width: 0; padding-right: 32px;">
                <h2 class="drawer-title">${item.name}</h2>
                <div style="display: flex; gap: 6px; align-items: center; margin-top: 6px; flex-wrap: wrap;">
                  <span class="badge-tag">${item.subtype || item.category}</span>
                  ${item.isMissable ? `<span class="badge-tag missable">⚠️ Perdível</span>` : ''}
                  <span style="font-size: 0.78rem; color: var(--gold-muted);">📍 ${item.nearestGrace || item.location}</span>
                </div>
              </div>
              <button class="drawer-close-btn" id="drawer-close-btn" title="Fechar (Esc)">&times;</button>
            </div>

            <nav class="drawer-tabs-nav">
              <button class="drawer-tab-btn ${activeTab === 'walkthrough' ? 'active' : ''}" data-tab="walkthrough">
                🧭 Como Obter (Rota)
              </button>
              <button class="drawer-tab-btn ${activeTab === 'combat' ? 'active' : ''}" data-tab="combat">
                ⚔️ Combate & Atributos
              </button>
              <button class="drawer-tab-btn ${activeTab === 'lore' ? 'active' : ''}" data-tab="lore">
                📜 Lore & História
              </button>
              ${item.isMissable || item.missableWarning ? `
                <button class="drawer-tab-btn ${activeTab === 'warnings' ? 'active' : ''}" data-tab="warnings" style="color: var(--status-missable);">
                  ⚠️ Alertas de Quest
                </button>
              ` : ''}
            </nav>

            <div class="drawer-body">
              <!-- TAB 1: ROTA -->
              <div class="tab-pane ${activeTab === 'walkthrough' ? 'active' : ''}" id="tab-walkthrough">
                <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 12px 16px;">
                  <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--gold-muted); letter-spacing: 1px;">Ponto de Graça Mais Próximo</div>
                  <div style="font-size: 1rem; color: var(--gold-light); font-weight: 600; margin-top: 2px;">📍 ${item.nearestGrace || item.location}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Local Exato: ${item.mapCoords || item.location}</div>
                </div>

                <!-- YouTube Video Guide — Mini Player Embutido (1º Resultado) -->
                <div class="youtube-guide-card" style="flex-direction: column; gap: 0; overflow: hidden; padding: 0; cursor: default;">
                  <div style="display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: rgba(255,0,0,0.12); border-bottom: 1px solid rgba(255,0,0,0.2);">
                    <div class="youtube-play-icon" style="width: 32px; height: 32px; flex-shrink: 0;">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <div style="flex: 1; min-width: 0;">
                      <div class="youtube-guide-title" style="margin-bottom: 2px;">🎬 Vídeo Guia — Primeiro Resultado</div>
                      <div class="youtube-guide-desc" style="font-size: 0.75rem;">${ytVideoDesc}</div>
                    </div>
                    <a href="${ytUrl}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();"
                       style="flex-shrink: 0; background: #ff0000; color: #fff; border-radius: 6px; padding: 5px 10px; font-size: 0.72rem; font-weight: 700; text-decoration: none; white-space: nowrap;">
                      Abrir no YT ↗
                    </a>
                  </div>
                  <div style="position: relative; width: 100%; padding-bottom: 56.25%; background: #000; border-radius: 0 0 10px 10px; overflow: hidden;">
                    <iframe
                      src="${ytEmbedUrl}"
                      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      loading="lazy"
                      title="Vídeo guia: ${item.name}"
                    ></iframe>
                  </div>
                </div>

                ${item.missableWarning ? `
                  <div class="warning-callout">
                    <span style="font-size: 1.2rem;">⚠️</span>
                    <div>
                      <strong>Aviso Crítico de Perda:</strong>
                      <div style="font-size: 0.82rem; margin-top: 2px;">${item.missableWarning}</div>
                    </div>
                  </div>
                ` : ''}

                <div style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--gold-light); margin-top: 4px;">
                  Passo a Passo de Chegada:
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${stepsHtml}
                </div>
              </div>

              <!-- TAB 2: COMBATE -->
              <div class="tab-pane ${activeTab === 'combat' ? 'active' : ''}" id="tab-combat">
                <div style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--gold-light);">Requisitos Mínimos:</div>
                <div class="stat-grid-box">
                  <div class="stat-cell"><div class="stat-cell-lbl">Força</div><div class="stat-cell-val">${reqs.str || '-'}</div></div>
                  <div class="stat-cell"><div class="stat-cell-lbl">Destreza</div><div class="stat-cell-val">${reqs.dex || '-'}</div></div>
                  <div class="stat-cell"><div class="stat-cell-lbl">Inteligência</div><div class="stat-cell-val">${reqs.int || '-'}</div></div>
                  <div class="stat-cell"><div class="stat-cell-lbl">Fé</div><div class="stat-cell-val">${reqs.fai || '-'}</div></div>
                  <div class="stat-cell"><div class="stat-cell-lbl">Arcano</div><div class="stat-cell-val">${reqs.arc || '-'}</div></div>
                </div>

                <div style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--gold-light); margin-top: 8px;">Propriedades de Batalha:</div>
                <div style="background: var(--bg-surface); border: 1px solid var(--glass-border-subtle); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; gap: 10px;">
                  <div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Tipo de Dano</div>
                    <div style="font-size: 0.9rem; color: var(--text-primary); font-weight: 500;">${combat.damageType || 'Físico / Padrão'}</div>
                  </div>
                  <div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Escalonamento Principal</div>
                    <div style="font-size: 0.9rem; color: var(--gold-light); font-weight: 600;">${combat.scaling || 'N/A'}</div>
                  </div>
                  <div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Habilidade Exclusiva / Cinza de Guerra</div>
                    <div style="font-size: 0.9rem; color: var(--text-primary); font-weight: 500;">
                      ${combat.skill || 'Ataque Padrão'}
                      ${combat.fpCost ? `<span style="color: var(--accent-magic); font-size: 0.8rem; margin-left: 6px;">(${combat.fpCost})</span>` : ''}
                    </div>
                  </div>
                  ${combat.passive ? `
                    <div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">Efeito Passivo</div>
                      <div style="font-size: 0.88rem; color: var(--status-acquired); font-weight: 500;">${combat.passive}</div>
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- TAB 3: LORE -->
              <div class="tab-pane ${activeTab === 'lore' ? 'active' : ''}" id="tab-lore">
                <div style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--gold-light);">Descrição Oficial:</div>
                <div class="lore-quote">"${item.lore || 'Sem registros nos arquivos de Leyndell.'}"</div>
                <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 12px 16px; border: 1px solid rgba(255,255,255,0.05); font-size: 0.82rem; color: var(--text-muted);">
                  <strong>Tipo:</strong> ${item.secretType || 'Exploração'}<br>
                  <strong>Região:</strong> ${item.region}
                </div>
              </div>

              <!-- TAB 4: ALERTAS -->
              ${item.isMissable || item.missableWarning ? `
                <div class="tab-pane ${activeTab === 'warnings' ? 'active' : ''}" id="tab-warnings">
                  <div class="warning-callout">
                    <span style="font-size: 1.5rem;">⚠️</span>
                    <div>
                      <strong style="font-size: 0.95rem;">Atenção com a Linha do Tempo da Campanha:</strong>
                      <p style="margin-top: 6px; font-size: 0.88rem; line-height: 1.5;">
                        ${item.missableWarning || 'Este item pode se tornar inacessível se certas áreas forem concluídas antes da sua coleta.'}
                      </p>
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>

            <div class="drawer-footer">
              <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" id="drawer-wishlist-toggle" style="font-size: 1.2rem; display: flex; align-items: center; gap: 6px;">
                <span>${isWishlisted ? '★' : '☆'}</span>
                <span style="font-size: 0.82rem; font-family: var(--font-sans);">${isWishlisted ? 'Favorito' : 'Favoritar'}</span>
              </button>

              <button class="btn ${isAcquired ? 'btn-secondary' : 'btn-gold'}" id="drawer-acquired-toggle">
                ${isAcquired ? '✓ Marcado como Obtido' : '✨ Marcar como Obtido'}
              </button>
            </div>
          </aside>
        </div>
      `;
    },

    renderStatsModal(state) {
      if (!state.statsModalOpen) return '';
      const s = state.stats;
      const categories = DataService.getCategories().filter(c => c.id !== 'all');
      const regions = DataService.getRegions().filter(r => r.id !== 'all_regions');

      const catBars = categories.map(cat => {
        const cStat = s.byCategory[cat.id] || { total: 0, acquired: 0, percentage: 0 };
        return `
          <div class="stats-card" style="cursor: pointer;" data-jump-category="${cat.id}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 500; color: var(--text-primary); font-size: 0.85rem;">${cat.icon} ${cat.name}</span>
              <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--gold-light);">${cStat.acquired}/${cStat.total} (${cStat.percentage}%)</span>
            </div>
            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${cStat.percentage}%;"></div></div>
          </div>
        `;
      }).join('');

      const regBars = regions.map(reg => {
        const rStat = s.byRegion[reg.id] || { total: 0, acquired: 0, percentage: 0 };
        return `
          <div class="stats-card" style="cursor: pointer;" data-jump-region="${reg.id}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 500; color: var(--text-primary); font-size: 0.85rem;">${reg.badge || '📍'} ${reg.name}</span>
              <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--gold-light);">${rStat.acquired}/${rStat.total} (${rStat.percentage}%)</span>
            </div>
            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${rStat.percentage}%;"></div></div>
          </div>
        `;
      }).join('');

      return `
        <div class="modal-overlay active" id="stats-dashboard-overlay">
          <div class="modal-content" style="max-width: 800px;">
            <button class="modal-close-btn" id="stats-modal-close">&times;</button>
            <div class="modal-header">
              <div class="modal-icon">📊</div>
              <div>
                <h2 class="modal-title">Progresso da Jornada</h2>
                <div style="font-size: 0.82rem; color: var(--text-muted);">Estatísticas das Terras Intermédias e Reino das Sombras</div>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, rgba(223,192,118,0.12) 0%, rgba(20,25,36,0.95) 100%); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); padding: 20px; display: flex; align-items: center; justify-content: space-around; margin-bottom: 20px; flex-wrap: wrap; gap: 16px;">
              <div style="text-align: center;">
                <div style="font-family: var(--font-serif); font-size: 2rem; color: var(--gold-light); font-weight: 700;">${s.percentage}%</div>
                <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted);">Concluído</div>
              </div>
              <div style="display: flex; gap: 12px;">
                <div class="hero-stat-chip"><span style="color: var(--status-acquired);">✓</span> Obtidos: <strong>${s.acquired}</strong></div>
                <div class="hero-stat-chip"><span style="color: var(--status-missing);">○</span> Faltantes: <strong>${s.missing}</strong></div>
                <div class="hero-stat-chip"><span style="color: var(--gold-primary);">★</span> Total: <strong>${s.total}</strong></div>
              </div>
            </div>

            <div class="modal-section-title" style="font-size: 0.95rem;">🗺️ Conclusão por Região</div>
            <div class="dashboard-grid" style="margin-bottom: 20px;">${regBars}</div>

            <div class="modal-section-title" style="font-size: 0.95rem;">⚔️ Conclusão por Categoria</div>
            <div class="dashboard-grid">${catBars}</div>
          </div>
        </div>
      `;
    }
  };

  // --- 10. APP CONTROLLER & ATTACH EVENTS ---
  function initApp() {
    const headerRoot = document.getElementById('header-root');
    const heroBarRoot = document.getElementById('hero-bar-root');
    const filterBarRoot = document.getElementById('filter-bar-root');
    const itemsGridView = document.getElementById('items-grid-view');
    const modalRoot = document.getElementById('modal-root');
    const statsModalRoot = document.getElementById('stats-modal-root');

    function renderApp(state, eventName) {
      // Atualização inteligente do header que preserva o input de busca e o foco do usuário
      UI.updateHeader(headerRoot, state, eventName);

      if (heroBarRoot) {
        heroBarRoot.innerHTML = UI.renderHeroBar(state);
      }
      if (filterBarRoot) {
        filterBarRoot.innerHTML = UI.renderFilterBar(state);
      }

      if (itemsGridView) {
        if (state.viewMode === 'route') {
          itemsGridView.innerHTML = UI.renderRoadmapView(state.roadmap, state);
        } else if (state.viewMode === 'categories') {
          itemsGridView.innerHTML = UI.renderCategoriesView(state.sections, state);
        } else if (state.viewMode === 'checklist') {
          itemsGridView.innerHTML = UI.renderChecklistView(state.items, state);
        } else {
          // Grid
          if (state.items.length === 0) {
            itemsGridView.innerHTML = `
              <div class="empty-state">
                <div class="empty-icon">🕯️</div>
                <div class="empty-title">Nenhum Segredo Encontrado</div>
                <p class="empty-desc">Nenhum item corresponde à busca "${state.searchQuery || ''}".</p>
                ${state.searchQuery ? `
                  <button class="btn btn-secondary" id="clear-search-empty-btn" style="margin-top: 14px;">
                    ✕ Limpar Busca
                  </button>
                ` : ''}
              </div>
            `;
          } else {
            itemsGridView.innerHTML = `<div class="items-grid">${state.items.map(i => UI.renderItemCard(i, state)).join('')}</div>`;
          }
        }
      }

      if (modalRoot) {
        modalRoot.innerHTML = UI.renderCompendiumDrawer(state.selectedItem, state);
      }

      if (statsModalRoot) {
        statsModalRoot.innerHTML = UI.renderStatsModal(state);
      }
    }

    // Subscribe
    Store.subscribe((eventName, state) => {
      renderApp(state, eventName);
    });

    // Global Event Delegation
    document.body.addEventListener('click', (e) => {
      // 0. Limpar busca no estado vazio
      if (e.target.id === 'clear-search-empty-btn') {
        Store.setSearchQuery('');
        const sInput = document.getElementById('search-input');
        if (sInput) {
          sInput.value = '';
          sInput.focus();
        }
        return;
      }

      // 1. Alternador de Modo de Visualização
      const viewBtn = e.target.closest('[data-view]');
      if (viewBtn) {
        const mode = viewBtn.dataset.view;
        Store.setViewMode(mode);
        return;
      }

      // 2. Alternador de Tema Visual
      if (e.target.closest('#theme-toggle-btn')) {
        const curTheme = Store.getState().theme || 'erdtree';
        const nextTheme = curTheme === 'erdtree' ? 'moonlight' :
                          curTheme === 'moonlight' ? 'shadow' : 'erdtree';
        Store.setTheme(nextTheme);
        Toast.show({
          title: 'Estética Alterada',
          message: nextTheme === 'moonlight' ? 'Tema Luar de Caria ativado.' :
                   nextTheme === 'shadow' ? 'Tema Chama das Sombras ativado.' :
                   'Tema Graça da Térvore ativado.',
          icon: nextTheme === 'moonlight' ? '🌙' : nextTheme === 'shadow' ? '🔥' : '🌟'
        });
        return;
      }

      // 3. Abrir Estatísticas
      if (e.target.closest('#open-stats-btn')) {
        Store.toggleStatsModal(true);
        return;
      }

      if (e.target.id === 'stats-modal-close' || e.target.id === 'stats-dashboard-overlay') {
        Store.toggleStatsModal(false);
        return;
      }

      const jumpCat = e.target.closest('[data-jump-category]');
      if (jumpCat) {
        Store.setCategory(jumpCat.dataset.jumpCategory);
        Store.toggleStatsModal(false);
        return;
      }

      const jumpReg = e.target.closest('[data-jump-region]');
      if (jumpReg) {
        Store.setRegion(jumpReg.dataset.jumpRegion);
        Store.toggleStatsModal(false);
        return;
      }

      // 4. Marcação de Obtido
      const toggleAcquiredBtn = e.target.closest('[data-action="toggle-acquired"]') || e.target.closest('#drawer-acquired-toggle');
      if (toggleAcquiredBtn) {
        e.stopPropagation();
        const id = toggleAcquiredBtn.dataset.id || Store.getState().selectedItem?.id;
        if (id) {
          const item = ITEMS_DATA.find(i => i.id === id);
          Store.toggleAcquired(id);
          const isNowAcquired = Store.getState().acquiredIds.includes(id);
          Toast.show({
            title: isNowAcquired ? '✨ Graça Descoberta!' : 'Item Desmarcado',
            message: isNowAcquired ? `${item?.name || 'Item'} registrado em sua jornada.` : `${item?.name || 'Item'} removido do inventário.`,
            icon: isNowAcquired ? '🌟' : '↩️',
            playSound: isNowAcquired
          });
        }
        return;
      }

      // 5. Marcação de Favorito
      const wishlistBtn = e.target.closest('[data-action="wishlist"]') || e.target.closest('#drawer-wishlist-toggle');
      if (wishlistBtn) {
        e.stopPropagation();
        const id = wishlistBtn.dataset.id || Store.getState().selectedItem?.id;
        if (id) {
          const item = ITEMS_DATA.find(i => i.id === id);
          Store.toggleWishlist(id);
          const isWish = Store.getState().wishlistIds.includes(id);
          Toast.show({
            title: isWish ? '⭐ Adicionado aos Favoritos' : 'Removido dos Favoritos',
            message: `${item?.name || 'Item'} atualizado.`,
            icon: isWish ? '⭐' : '☆'
          });
        }
        return;
      }

      // 6. Abertura do Compêndio / Detalhes
      const detailsBtn = e.target.closest('[data-action="details"]');
      const card = e.target.closest('.item-card') || e.target.closest('.checklist-row');
      if (detailsBtn || card) {
        const id = detailsBtn ? detailsBtn.dataset.id : card.dataset.itemId;
        const item = ITEMS_DATA.find(i => i.id === id);
        if (item) {
          Store.setSelectedItem(item);
        }
        return;
      }

      // 7. Fechar Drawer
      if (e.target.id === 'drawer-close-btn' || e.target.id === 'item-drawer-overlay') {
        Store.setSelectedItem(null);
        return;
      }

      // 8. Alternar Abas do Drawer
      const tabBtn = e.target.closest('[data-tab]');
      if (tabBtn) {
        Store.setDrawerTab(tabBtn.dataset.tab);
        return;
      }

      // 9. Recolher / Expandir Região na Rota
      const regHeader = e.target.closest('[data-toggle-region]');
      if (regHeader) {
        const regId = regHeader.dataset.toggleRegion;
        const content = document.getElementById(`region-content-${regId}`);
        const btn = regHeader.querySelector('.section-collapse-btn');
        if (content) {
          content.classList.toggle('collapsed');
          if (btn) {
            btn.style.transform = content.classList.contains('collapsed') ? 'rotate(-90deg)' : 'rotate(0deg)';
          }
        }
        return;
      }

      // 10. Recolher / Expandir Categoria
      const catHeader = e.target.closest('[data-toggle-cat]');
      if (catHeader) {
        const catId = catHeader.dataset.toggleCat;
        const content = document.getElementById(`cat-content-${catId}`);
        const btn = catHeader.querySelector('.section-collapse-btn');
        if (content) {
          content.classList.toggle('collapsed');
          if (btn) {
            btn.style.transform = content.classList.contains('collapsed') ? 'rotate(-90deg)' : 'rotate(0deg)';
          }
        }
        return;
      }

      // 11. Filtro de Categoria
      const chip = e.target.closest('[data-category-id]');
      if (chip) {
        Store.setCategory(chip.dataset.categoryId);
        return;
      }

      // 12. Filtro de Status
      const statusPill = e.target.closest('[data-status]');
      if (statusPill) {
        Store.setStatusFilter(statusPill.dataset.status);
        return;
      }

      // 13. Limpar Filtros
      if (e.target.id === 'clear-filters-btn' || e.target.closest('#brand-home-btn')) {
        Store.setCategory('all');
        Store.setRegion('all_regions');
        Store.setStatusFilter('all');
        Store.setSearchQuery('');
        const sInput = document.getElementById('search-input');
        if (sInput) sInput.value = '';
        return;
      }

      // 14. Save Menu
      if (e.target.closest('#save-menu-btn')) {
        openSaveModal();
        return;
      }
    });

    // Input de Busca em tempo real com debounce leve (50ms)
    let searchTimeout = null;
    document.body.addEventListener('input', (e) => {
      if (e.target.id === 'search-input') {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          Store.setSearchQuery(e.target.value);
          // Sobe ao topo para mostrar os resultados destacados assim que a busca é feita
          if (e.target.value && e.target.value.trim().length > 0) {
            const itemsGridView = document.getElementById('items-grid-view');
            if (itemsGridView) {
              itemsGridView.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        }, 50);
      }
    });

    // Seletor de Região
    document.body.addEventListener('change', (e) => {
      if (e.target.id === 'region-select') {
        Store.setRegion(e.target.value);
      }
    });

    // Atalhos de Teclado
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
      if (e.key === 'Escape' && Store.getState().selectedItem) {
        Store.setSelectedItem(null);
      }
    });

    function openSaveModal() {
      const state = Store.getState();
      const modalHtml = `
        <div class="modal-overlay active" id="save-manager-overlay">
          <div class="modal-content" style="max-width: 500px;">
            <button class="modal-close-btn" id="save-modal-close">&times;</button>
            <div class="modal-header">
              <div class="modal-icon">📜</div>
              <div>
                <h2 class="modal-title">Gestão de Save & Maculado</h2>
                <div style="font-size: 0.82rem; color: var(--text-muted);">Backup seguro do seu progresso</div>
              </div>
            </div>
            <div style="margin-bottom: 18px;">
              <div class="modal-section-title" style="font-size: 0.95rem;">Personagem Ativo</div>
              <div style="background: rgba(0,0,0,0.35); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--glass-border); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong style="color: var(--gold-light); font-size: 1rem;">${state.activeCharacter.name}</strong>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">${state.activeCharacter.build}</div>
                </div>
                <span class="category-chip" style="font-size: 0.75rem;">${state.stats.acquired} coletados</span>
              </div>
            </div>
            <div class="modal-section-title" style="font-size: 0.95rem;">Backup & Sincronização</div>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
              <button class="btn btn-gold" id="export-save-btn" style="flex: 1;">💾 Exportar Save (JSON)</button>
              <label class="btn btn-secondary" style="flex: 1; cursor: pointer; text-align: center;">
                📥 Importar Save
                <input type="file" id="import-save-input" accept=".json" style="display: none;" />
              </label>
            </div>
            <div class="modal-section-title" style="font-size: 0.95rem; color: var(--status-missing);">Zona de Risco</div>
            <button class="btn btn-secondary" id="reset-progress-btn" style="width: 100%; border-color: rgba(244, 63, 94, 0.4); color: var(--status-missing);">
              ⚠️ Redefinir Todo o Progresso
            </button>
          </div>
        </div>
      `;

      const wrapper = document.createElement('div');
      wrapper.id = 'save-modal-wrapper';
      wrapper.innerHTML = modalHtml;
      document.body.appendChild(wrapper);

      wrapper.addEventListener('click', (e) => {
        if (e.target.id === 'save-modal-close' || e.target.id === 'save-manager-overlay') {
          wrapper.remove();
        }
        if (e.target.id === 'export-save-btn') {
          Store.exportSave();
          Toast.show({ title: '💾 Save Exportado', message: 'Arquivo JSON gerado.', icon: '✨' });
        }
        if (e.target.id === 'reset-progress-btn') {
          if (confirm('Tem certeza de que deseja resetar todo o progresso?')) {
            Store.resetAllProgress();
            wrapper.remove();
            Toast.show({ title: 'Progresso Redefinido', message: 'Todas as graças reiniciadas.', icon: '↩️' });
          }
        }
      });

      wrapper.addEventListener('change', async (e) => {
        if (e.target.id === 'import-save-input') {
          const file = e.target.files[0];
          if (file) {
            try {
              await Store.importSave(file);
              wrapper.remove();
              Toast.show({ title: '✨ Save Importado!', message: 'Progresso restaurado.', playSound: true });
            } catch (err) {
              alert('Falha ao importar o arquivo.');
            }
          }
        }
      });
    }

    // Renderização inicial
    renderApp(Store.getState(), 'initial_mount');
  }

  // Auto-init no DOMContentLoaded ou imediatamente se já carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
