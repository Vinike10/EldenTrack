/* ==========================================================================
   ELDENTRACK - COMPREHENSIVE ITEMS & SECRETS DATABASE
   ========================================================================== */

export const ITEMS_DATA = [
  /* --------------------------------------------------------------------------
     1. ARMAS & SELOS (Armas Lendárias e Icônicas)
     -------------------------------------------------------------------------- */
  {
    id: 'w_dark_moon_greatsword',
    name: 'Espada Grande da Lua Sombria',
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
    category: 'weapons',
    subtype: 'Katanas',
    region: 'mountaintops',
    location: 'Igreja do Repouso (Montanha dos Gigantes)',
    rarity: 'rare',
    icon: '⚔️',
    secretType: 'Invasor NPC',
    requirements: { str: 12, dex: 18, int: 0, fai: 0, arc: 20 },
    lore: 'Arma do espadachim Okina da Terra dos Juncos. Sua habilidade Empilhador de Cadáveres desencadeia lâminas de sangue que dilaceram a carne.',
    guide: 'Ao se aproximar da Igreja do Repouso a leste das Montanhas dos Gigantes (pouco antes da Forja dos Gigantes), o invasor Sangrento Okina atacará você. Derrote-o para obter a Katana e sua Máscara de Okina. (Nota: Faça antes de derrotar o Gigante de Fogo).',
    mapCoords: 'Leste do Lago Congelado, Montanha dos Gigantes.'
  },
  {
    id: 'w_blasphemous_blade',
    name: 'Lâmina Blasfema (Blasphemous Blade)',
    category: 'weapons',
    subtype: 'Espadas Colossais',
    region: 'altus',
    location: 'Mansão Vulcânica (Monte Gelmir)',
    rarity: 'legendary',
    icon: '🔥',
    secretType: 'Lembrança',
    requirements: { str: 22, dex: 15, int: 0, fai: 21, arc: 0 },
    lore: 'Espada sagrada de Rykard, outrora Lorde Praetor, agora mesclada com a Serpente Devoradora de Deuses. Drena a vitalidade dos inimigos abatidos.',
    guide: 'Derrote Rykard, Senhor da Blasfêmia na Mansão Vulcânica para receber a Lembrança do Blasfemo. Troque-a com Enia, a Leitora de Dedos, na Mesa-Redonda.',
    mapCoords: 'Profundezas da Mansão Vulcânica, Monte Gelmir.'
  },
  {
    id: 'w_grafted_blade_greatsword',
    name: 'Espada Enxertada (Grafted Blade Greatsword)',
    category: 'weapons',
    subtype: 'Espadas Colossais',
    region: 'limgrave',
    location: 'Castelo Morne (Península do Choro)',
    rarity: 'legendary',
    icon: '🗡️',
    secretType: 'Chefe de Masmorra',
    requirements: { str: 40, dex: 14, int: 0, fai: 0, arc: 0 },
    lore: 'Uma das armas de armamento lendário. Uma espada colossal forjada a partir dos inúmeros gumes dos derrotados de um reino esquecido.',
    guide: 'Avance até os fundos do Castelo Morne na Península do Choro, atravesse a praia e derrote o chefe Bastardo Leonino.',
    mapCoords: 'Extremo sul da Península do Choro, Castelo Morne.'
  },
  {
    id: 'w_moonveil',
    name: 'Véu da Lua (Moonveil)',
    category: 'weapons',
    subtype: 'Katanas',
    region: 'caelid',
    location: 'Túnel Gael (Fronteira Limgrave/Caelid)',
    rarity: 'rare',
    icon: '🌙',
    secretType: 'Chefe de Masmorra',
    requirements: { str: 12, dex: 18, int: 23, fai: 0, arc: 0 },
    lore: 'Katana forjada com Glintstone brilhante. Sua habilidade Desembainhar Transiente dispara ondas lunares cortantes de alto dano postural.',
    guide: 'Entre no Túnel Gael localizado na fronteira entre Limgrave e Caelid. Atravesse a mina e derrote o chefe Dragão de Magma no final.',
    mapCoords: 'Oeste de Caelid, entrada próxima à colina rochosa de Limgrave.'
  },
  {
    id: 'w_erdtree_seal',
    name: 'Selo da Térvore (Erdtree Seal)',
    category: 'weapons',
    subtype: 'Selos Sagrados',
    region: 'altus',
    location: 'Vila dos Moinhos de Vento (Platô Altus)',
    rarity: 'rare',
    icon: '✨',
    secretType: 'Baú Escondido',
    requirements: { str: 0, dex: 0, int: 0, fai: 40, arc: 0 },
    lore: 'Selo sem peso que amplifica encantos da Linhagem da Térvore com escalonamento puro em Fé de rank S.',
    guide: 'Localizado no Platô Altus, próximo ao fosso que leva à Prisão Subterrânea dos Moinhos. Encontrado no corpo de um Omen próximo à cascata de águas termais.',
    mapCoords: 'Norte do Platô Altus, próximo à Vila Dominula.'
  },
  {
    id: 'w_milady',
    name: 'Milady (Espada Leve)',
    category: 'weapons',
    subtype: 'Espadas Leves',
    region: 'shadow_realm',
    location: 'Castelo Ensis (Reino das Sombras)',
    rarity: 'dlc',
    icon: '🗡️',
    secretType: 'Baú Escondido',
    requirements: { str: 12, dex: 17, int: 0, fai: 0, arc: 0 },
    lore: 'Uma espada graciosa de empunhadura nobre introduzida no Reino das Sombras, com postura veloz e golpes fluidos perfeitos para combos acrobáticos.',
    guide: 'Localizada no topo de uma torre no Castelo Ensis. Suba as escadas de guarda logo após a primeira ponte fortificada e acesse o baú na sacada.',
    mapCoords: 'Castelo Ensis, oeste da Planície das Sepulturas.'
  },
  {
    id: 'w_bloodfiend_arm',
    name: 'Braço do Demônio de Sangue',
    category: 'weapons',
    subtype: 'Armas Colossais',
    region: 'shadow_realm',
    location: 'Vila Prospect (Reino das Sombras)',
    rarity: 'dlc',
    icon: '🦴',
    secretType: 'Exploração Secreta',
    requirements: { str: 28, dex: 11, int: 0, fai: 0, arc: 16 },
    lore: 'Um membro fossilizado usado como clava colossal que causa imenso acúmulo de sangramento em ataques pesados totalmente carregados.',
    guide: 'Drop garantido do Demônio de Sangue líder encontrado no santuário superior da Vila Prospect, a sudeste da Planície das Sepulturas.',
    mapCoords: 'Sul da Planície das Sepulturas, Vila Prospect.'
  },

  /* --------------------------------------------------------------------------
     2. TALISMÃS LENDÁRIOS & ACESSÓRIOS
     -------------------------------------------------------------------------- */
  {
    id: 't_radagon_soreseal',
    name: 'Selo Doloroso de Radagon (Radagon\'s Soreseal)',
    category: 'talismans',
    subtype: 'Lendários',
    region: 'caelid',
    location: 'Forte Faroth (Monte Dragão de Greyoll)',
    rarity: 'legendary',
    icon: '💍',
    secretType: 'Baú Escondido',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Talismã lendário com o brasão do Rei Consorte Radagon. Concede +5 em Vigor, Tolerância, Força e Destreza ao custo de receber +15% de dano.',
    guide: 'Entre no Forte Faroth em Caelid. Suba as escadas para o telhado, pule na abertura do telhado com tábuas de madeira, desça pelas vigas até a sala protegida por ratos gigantes.',
    mapCoords: 'Forte Faroth, leste do Monte Dragão Greyoll.'
  },
  {
    id: 't_shard_of_alexander',
    name: 'Fragmento de Alexander (Shard of Alexander)',
    category: 'talismans',
    subtype: 'Aumento de Dano',
    region: 'farum_azula',
    location: 'Farum Azula Despedaçada',
    rarity: 'rare',
    icon: '🏺',
    secretType: 'Quest NPC',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Fragmento do honrado Guerreiro Pote Alexander. Aumenta o poder de ataque de todas as Habilidades de Armas (Cinzas da Guerra) em massivos 15%.',
    guide: 'Complete a linha de missões de Alexander (Limgrave -> Túnel Gael -> Festival Radahn -> Monte Gelmir -> Farum Azula). Duel com ele no topo da arena em ruínas de Farum Azula e derrote-o honrosamente.',
    mapCoords: 'Templo dos Dragões, Farum Azula Despedaçada.'
  },
  {
    id: 't_erdtree_favor_2',
    name: 'Favor da Térvore +2 (Erdtree\'s Favor +2)',
    category: 'talismans',
    subtype: 'Lendários',
    region: 'leyndell',
    location: 'Leyndell, Capital das Cinzas',
    rarity: 'legendary',
    icon: '🌿',
    secretType: 'Exploração Secreta',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Aumenta significativamente a Vida Máxima (+4%), Vigor (+10%) e Carga Máxima de Equipamento (+8%).',
    guide: 'Acessível apenas após transformar a capital em Cinzas (após queimar a Térvore). Do elevador das Terras Proibidas, volte em direção à capital e desça pelo lago de cinzas guardado por 3 Espíritos das Árvores Ulceradas.',
    mapCoords: 'Pátio coberto de cinzas de Leyndell, Capital das Cinzas.'
  },
  {
    id: 't_dragoncrest_greatshield',
    name: 'Talismã do Grande Escudo do Brasão do Dragão',
    category: 'talismans',
    subtype: 'Defensivos',
    region: 'haligtree',
    location: 'Elphael, Suporte da Árvore Sacra',
    rarity: 'legendary',
    icon: '🛡️',
    secretType: 'Baú Escondido',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Talismã lendário dos campeões dracônicos. Reduz todo o dano físico sofrido em colossais 20%. Essencial para o endgame.',
    guide: 'Na Graça \'Canal de Drenagem\' em Elphael, saia e avance sobre os galhos em direção ao telhado da capela cheia de Pests (Centopeias). Caia nas vigas superiores e abra o baú guardado por três Pests.',
    mapCoords: 'Capela sobre o lago podre, Elphael Árvore Sacra.'
  },
  {
    id: 't_two_handed_sword',
    name: 'Talismã da Espada de Duas Mãos',
    category: 'talismans',
    subtype: 'Lendários',
    region: 'shadow_realm',
    location: 'Ruínas do Templo de Rauh (DLC)',
    rarity: 'dlc',
    icon: '⚔️',
    secretType: 'Baú Escondido',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Aumenta em 15% o dano de todos os ataques desferidos com armas empunhadas com as duas mãos.',
    guide: 'Encontrado no baú da torre mais alta nas Ruínas da Cidade do Templo, ao norte das Ruínas Antigas de Rauh no Reino das Sombras.',
    mapCoords: 'Noroeste do Reino das Sombras, Ruínas da Cidade do Templo.'
  },

  /* --------------------------------------------------------------------------
     3. FEITIÇARIAS & ENCANTAMENTOS PRIMORDIAIS
     -------------------------------------------------------------------------- */
  {
    id: 's_comet_azur',
    name: 'Cometa Azur (Comet Azur)',
    category: 'spells',
    subtype: 'Feitiçarias Primevas',
    region: 'altus',
    location: 'Monte Gelmir (Ermitão Primevo Azur)',
    rarity: 'legendary',
    icon: '🌠',
    secretType: 'Quest NPC',
    requirements: { str: 0, dex: 0, int: 60, fai: 0, arc: 0 },
    lore: 'Feitiçaria primeva lendária criada pelo Mestre Azur ao contemplar o abismo cósmico. Dispara um raio contínuo avassalador de energia estelar.',
    guide: 'Contorne o Monte Gelmir pela base (passando pelo Forte Laiedd e o Dragão de Magma). Próximo à Graça \'Primeval Sorcerer Azur\', interaja com o corpo cristalizado do Mestre Azur para receber a magia.',
    mapCoords: 'Acampamento do Eremita, sul do Monte Gelmir.'
  },
  {
    id: 's_rannis_dark_moon',
    name: 'Lua Sombria de Ranni',
    category: 'spells',
    subtype: 'Feitiçarias Primevas',
    region: 'liurnia',
    location: 'Torre de Chelona (Platô Lunar)',
    rarity: 'legendary',
    icon: '🌙',
    secretType: 'Exploração Secreta',
    requirements: { str: 0, dex: 0, int: 68, fai: 0, arc: 0 },
    lore: 'Invoca uma lua gélida e sombria que dissipa feitiços inimigos ao redor e reduz a resistência mágica do alvo em 10%.',
    guide: 'Na Torre de Chelona (acessível após avançar na missão da Ranni até o Platô Lunar), resolva o enigma das 3 grandes tartarugas sábias espalhadas pela borda do platô para abrir a barreira selada.',
    mapCoords: 'Extremo sul do Platô Lunar de Liurnia.'
  },
  {
    id: 's_ancient_dragons_lightning_strike',
    name: 'Golpe de Raio dos Dragões Antigos',
    category: 'spells',
    subtype: 'Encantamentos dos Dragões',
    region: 'farum_azula',
    location: 'Livro de Oração dos Dragões Antigos',
    rarity: 'legendary',
    icon: '⚡',
    secretType: 'Baú Escondido',
    requirements: { str: 0, dex: 0, int: 0, fai: 26, arc: 0 },
    lore: 'Evoca uma tempestade devastadora de relâmpagos vermelhos ancestrais que atingem o chão repetidamente com dano massivo em chefes gigantescos.',
    guide: 'Encontre o \'Livro de Orações do Dragão Antigo\' em Farum Azula Despedaçada (em um cadáver no salão principal próximo à Graça Núcleo do Templo dos Dragões) e entregue a Miriel, Pastor dos Votos ou Corhyn.',
    mapCoords: 'Farum Azula Despedaçada, salão dos guerreiros homens-fera.'
  },
  {
    id: 's_flame_grant_me_strength',
    name: 'Chama, Conceda-me Força',
    category: 'spells',
    subtype: 'Linhagem Divina',
    region: 'caelid',
    location: 'Forte Gael (Caelid)',
    rarity: 'rare',
    icon: '🔥',
    secretType: 'Exploração Secreta',
    requirements: { str: 0, dex: 0, int: 0, fai: 15, arc: 0 },
    lore: 'Encantamento dos monges de fogo que aumenta o dano de ataques físicos e ataques de fogo em 20% simultaneamente.',
    guide: 'Atrás do Forte Gael em Caelid, entre duas carruagens flamejantes com cabeças de leão no pátio traseiro.',
    mapCoords: 'Traseira externa do Forte Gael, oeste de Caelid.'
  },

  /* --------------------------------------------------------------------------
     4. CINZAS DA GUERRA (Ashes of War)
     -------------------------------------------------------------------------- */
  {
    id: 'a_bloodhounds_step',
    name: 'Passo do Cão de Caça (Bloodhound\'s Step)',
    category: 'ashes',
    subtype: 'Afinidade Afiada',
    region: 'caelid',
    location: 'Torre de Lenne (Monte Dragão de Greyoll)',
    rarity: 'rare',
    icon: '💨',
    secretType: 'Chefe Noturno',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Permite que o usuário se mova a velocidades inacreditáveis em uma esquiva com invulnerabilidade estendida.',
    guide: 'Vá até a ponte ao lado da Torre de Lenne em Caelid durante a NOITE. Derrote o chefe Cavaleiro da Cavalaria da Noite que patrulha a ponte.',
    mapCoords: 'Ponte a nordeste da Torre de Lenne, Monte Dragão Greyoll.'
  },
  {
    id: 'a_seppuku',
    name: 'Seppuku',
    category: 'ashes',
    subtype: 'Afinidade Sangue',
    region: 'mountaintops',
    location: 'Lago Congelado (Montanhas dos Gigantes)',
    rarity: 'rare',
    icon: '🩸',
    secretType: 'Ilusão/Parede Falsa',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Causa dano a si mesmo para banhar a lâmina em sangue, aumentando o dano físico e o acúmulo de sangramento por 60 segundos.',
    guide: 'Localizado no Lago Congelado ao leste das Montanhas dos Gigantes. Procure os rastros luminosos de um Escaravelho Invisível correndo sobre o gelo e ataque no momento certo.',
    mapCoords: 'Extremo leste do Lago Congelado.'
  },

  /* --------------------------------------------------------------------------
     5. ITENS CHAVE, LÁGRIMAS & FRAGMENTOS
     -------------------------------------------------------------------------- */
  {
    id: 'k_larval_tear_village',
    name: 'Lágrima Larval (Vila dos Albináuricos)',
    category: 'key_items',
    subtype: 'Lágrimas Larvais',
    region: 'liurnia',
    location: 'Vila dos Albináuricos (Liurnia)',
    rarity: 'rare',
    icon: '💧',
    secretType: 'Exploração Secreta',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Item místico requerido por Rennala na Grande Biblioteca de Raya Lucaria para redistribuir todos os atributos do personagem (Respec).',
    guide: 'Encontrada em um cadáver no cemitério da Vila dos Albináuricos, logo após cruzar a ponte de madeira e passar pelas cabanas abandonadas.',
    mapCoords: 'Vila sob o platô rochoso no sudoeste de Liurnia.'
  },
  {
    id: 'k_scadutree_fragment_church',
    name: 'Fragmento da Térvore das Sombras (Igreja da Consolação)',
    category: 'key_items',
    subtype: 'Fragmentos de Scadutree',
    region: 'shadow_realm',
    location: 'Igreja da Consolação (Planície das Sepulturas)',
    rarity: 'dlc',
    icon: '🌳',
    secretType: 'Exploração Secreta',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Aumenta permanentemente o poder de ataque e a negação de dano do jogador em todas as regiões do Reino das Sombras.',
    guide: 'Logo no início da expansão, siga para o sul da Planície das Sepulturas até a Igreja da Consolação. O fragmento repousa diante da estátua de Marika.',
    mapCoords: 'Sul da Planície das Sepulturas, Igreja da Consolação.'
  },
  {
    id: 'k_memory_stone_oridys',
    name: 'Pedra de Memória (Torre de Oridys)',
    category: 'key_items',
    subtype: 'Pedras de Memória',
    region: 'limgrave',
    location: 'Península do Choro',
    rarity: 'uncommon',
    icon: '🔮',
    secretType: 'Exploração Secreta',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Aumenta permanentemente o número de espaços para equipar Feitiçarias e Encantamentos (+1 Slot).',
    guide: 'Interaja com o pedestal na Torre de Oridys e elimine as 3 tartarugas sábias espectrais (uma na trilha, uma nos arbustos à esquerda e uma invisível na lagoa). Suba até o topo e abra o baú.',
    mapCoords: 'Colina leste da Península do Choro.'
  },

  /* --------------------------------------------------------------------------
     6. PEDRAS DRACONIANAS & MANUAIS
     -------------------------------------------------------------------------- */
  {
    id: 'c_ancient_dragon_smithing_stone',
    name: 'Pedra de Forja Draconiana Antiga (+25)',
    category: 'cookbooks',
    subtype: 'Pedras Draconianas',
    region: 'farum_azula',
    location: 'Templo dos Dragões (Farum Azula)',
    rarity: 'legendary',
    icon: '💎',
    secretType: 'Chefe de Masmorra',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Pedra lendária banhada no raio dos dragões ancestrais. Aprimora uma arma comum ao seu nível máximo (+25).',
    guide: 'Drop garantido ao derrotar o Dragão Antigo ferido que lança relâmpagos vermelhos na praça aberta logo antes do elevador da Capela de Farum Azula.',
    mapCoords: 'Farum Azula Despedaçada, pátio do Dragão Antigo.'
  },
  {
    id: 'c_somber_ancient_stone_haligtree',
    name: 'Pedra de Forja Sombria Draconiana Antiga (+10)',
    category: 'cookbooks',
    subtype: 'Pedras Draconianas',
    region: 'haligtree',
    location: 'Elphael, Suporte da Árvore Sacra',
    rarity: 'legendary',
    icon: '💠',
    secretType: 'Baú Escondido',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Aprimora uma arma especial lendária ao nível máximo (+10). Existem apenas poucas unidades por ciclo de jogo (NG).',
    guide: 'Em Elphael, próximo à Graça \'Muralha Interior de Elphael\', suba a encosta guardada por um Avatar da Térvore e dois Cavaleiros de Haligtree e abra o baú no pedestal.',
    mapCoords: 'Sacada superior de Elphael, Árvore Sacra de Miquella.'
  },

  /* --------------------------------------------------------------------------
     7. ARMADURAS & ELMOS ESPECIAIS
     -------------------------------------------------------------------------- */
  {
    id: 'ar_raging_wolf_set',
    name: 'Conjunto do Lobo Furioso (Raging Wolf Set)',
    category: 'armor',
    subtype: 'Conjuntos de Campeões',
    region: 'leyndell',
    location: 'Mansão Fortificada (Leyndell)',
    rarity: 'rare',
    icon: '🛡️',
    secretType: 'Quest NPC',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'A lendária armadura de Vargram, o Lobo Furioso, um dos primeiros Maculados a pisar na Mesa-Redonda. Símbolo clássico dos guerreiros de Elden Ring.',
    guide: 'Durante os contratos de assassinato da Mansão Vulcânica, junte-se a Bernahl em Leyndell para invadir o mundo de Vargram e Wilhelm na Mansão Fortificada antes de queimar a capital.',
    mapCoords: 'Salão principal da Mansão Fortificada, Leyndell.'
  },
  {
    id: 'ar_white_mask',
    name: 'Máscara Branca de Varré',
    category: 'armor',
    subtype: 'Elmos Especiais',
    region: 'underground',
    location: 'Palácio de Mohgwyn (Subterrâneo)',
    rarity: 'rare',
    icon: '🎭',
    secretType: 'Invasor NPC',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'Elmo icônico que concede +10% de poder de ataque físico sempre que qualquer sangramento (hemorragia) ocorrer por perto.',
    guide: 'No lago de sangue do Palácio de Mohgwyn, seja invadido pelos 3 NPCs Sem-Nome da Máscara Branca nas águas vermelhas antes de derrotar o chefe Mohg, Senhor do Sangue.',
    mapCoords: 'Pântano carmesim do Palácio de Mohgwyn.'
  },

  /* --------------------------------------------------------------------------
     8. CHEFES LENDÁRIOS & LEMBRANÇAS
     -------------------------------------------------------------------------- */
  {
    id: 'b_malenia_blade_of_miquella',
    name: 'Malenia, Espada de Miquella',
    category: 'bosses',
    subtype: 'Lembranças',
    region: 'haligtree',
    location: 'Raízes da Árvore Sacra (Elphael)',
    rarity: 'legendary',
    icon: '🌸',
    secretType: 'Chefe de Masmorra',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'A semideusa jamais derrotada em batalha, portadora da Podridão Escarlate que travou duelo monumental contra o General Radahn.',
    guide: 'Desça até as raízes mais profundas de Elphael após navegar pela Árvore Sacra de Miquella e passar pela Graça \'Raízes da Árvore Sacra\'.',
    mapCoords: 'Câmara mais profunda de Elphael, Árvore Sacra.'
  },
  {
    id: 'b_starscourge_radahn',
    name: 'General Radahn, o Flagelo Estelar',
    category: 'bosses',
    subtype: 'Portadores de Runa',
    region: 'caelid',
    location: 'Castelo da Juba Vermelha (Caelid)',
    rarity: 'legendary',
    icon: '☄️',
    secretType: 'Festival de Combate',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'O semideus mais poderoso das Terras Intermédias que subjugou as estrelas com magia gravitacional primordial.',
    guide: 'Ative o Grande Elevador de Dectus ou alcance o Platô Altus para iniciar o lendário Festival de Radahn no Castelo da Juba Vermelha em Caelid.',
    mapCoords: 'Dunas do litoral sul de Caelid, acessível pelo portal do castelo.'
  },
  {
    id: 'b_messmer_the_impaler',
    name: 'Messmer, o Empalador (DLC)',
    category: 'bosses',
    subtype: 'Chefes do Reino das Sombras',
    region: 'shadow_realm',
    location: 'Fortaleza das Sombras (Reino das Sombras)',
    rarity: 'dlc',
    icon: '🐍',
    secretType: 'Chefe de Masmorra',
    requirements: { str: 0, dex: 0, int: 0, fai: 0, arc: 0 },
    lore: 'O filho esquecido de Marika que comanda chamas abissais e serpentes aladas no Reino das Sombras.',
    guide: 'Avance pelo Armazém de Especímenes na Fortaleza das Sombras, suba pelos andares superiores até alcançar a câmara escura no pináculo.',
    mapCoords: 'Pináculo da Fortaleza das Sombras, Reino das Sombras.'
  }
];
