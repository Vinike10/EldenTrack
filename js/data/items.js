/* ==========================================================================
   ELDENTRACK - COMPREHENSIVE DATABASE (PT-BR / EN) - EXPANDED CATALOG (70+ ITEMS)
   Enriched with step-by-step walkthroughs, nearest graces, combat scaling,
   missable warnings, exact navigation instructions and YouTube video guide queries.
   ========================================================================== */

export const ITEMS_DATA = [
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
    youtubeQuery: 'elden ring dark moon greatsword location guide'
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
    youtubeQuery: 'elden ring rivers of blood location guide'
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
    youtubeQuery: 'elden ring moonveil katana location guide'
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
    youtubeQuery: 'elden ring blasphemous blade location guide'
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
    youtubeQuery: 'elden ring bolt of gransax location missable'
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
    youtubeQuery: 'elden ring sword of night and flame location'
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
    youtubeQuery: 'elden ring bloodhounds fang location guide'
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
    lore: 'Espírito lendário que assume a forma idêntica de quem o invoca. Usa seus frascos, magias e equipamentos em batalha.',
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
