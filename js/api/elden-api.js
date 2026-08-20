/* ==========================================================================
   ELDENTRACK - ELDEN API SERVICE (Fextralife Data Provider & PT-BR Engine)
   ========================================================================== */

import { ITEMS_DATA } from '../data/items.js';
import { CATEGORIES } from '../data/categories.js';
import { REGIONS } from '../data/regions.js';

// Dicionário Bilíngue de Termos e Sinônimos PT-BR <-> EN
const BILINGUAL_DICTIONARY = {
  // Armas & Equipamentos
  'rivers of blood': ['rios de sangue', 'katana sangrenta', 'okina'],
  'moonveil': ['veu da lua', 'véu da lua', 'katana magica'],
  'dark moon greatsword': ['espada grande da lua sombria', 'ranni', 'luar'],
  'blasphemous blade': ['lamina blasfema', 'lâmina blasfema', 'rykard'],
  'grafted blade': ['espada enxertada', 'morne'],
  'bolt of gransax': ['raio de gransax', 'lança lendaria'],
  'sacred relic sword': ['espada da reliquia sagrada', 'reliquia sagrada', 'elden beast'],
  'bloodhound fang': ['presa do cao de caça', 'presa do cão de caça', 'darriwil'],
  'greatsword': ['espada colossal', 'guts', 'espada grande'],
  'fingerprint shield': ['escudo da digital', 'escudo de pedra da digital'],
  'milady': ['milady', 'espada leve', 'ensis'],
  'backhand blade': ['lamina reversa', 'lâmina reversa'],
  
  // Talismãs
  'radagon soreseal': ['selo doloroso de radagon', 'selo de radagon'],
  'shard of alexander': ['fragmento de alexander', 'pote guerreiro', 'alexander'],
  'erdtree favor': ['favor da tervore', 'favor da térvore'],
  'dragoncrest greatshield': ['brasao do dragao', 'brasão do dragão', 'grande escudo do dragao'],
  'bull goat': ['bode touro', 'touro bode'],
  'green turtle': ['tartaruga verde', 'vigor'],
  'lord of blood': ['exultacao do senhor do sangue', 'exultação do sangue'],
  'rotten winged sword': ['insignia da espada alada podre', 'insígnia alada'],

  // Magias & Feitiços
  'comet azur': ['cometa azur', 'raio laser', 'azur'],
  'ranni dark moon': ['lua sombria de ranni', 'lua de ranni'],
  'ancient dragons lightning': ['golpe de raio dos dragoes antigos', 'raio vermelho'],
  'flame grant me strength': ['chama conceda me forca', 'chama conceda-me força'],
  'terra magica': ['terra magica', 'circulo magico'],
  'stars of ruin': ['estrelas da ruina', 'estrelas da ruína'],
  'rotten breath': ['sopro podre', 'dragao podre', 'podridão'],
  'golden vow': ['voto dourado', 'encantamento dourado'],

  // Cinzas da Guerra
  'bloodhound step': ['passo do cao de caça', 'passo do cão de caça', 'esquiva'],
  'seppuku': ['seppuku', 'sangramento'],
  'flame of the redmanes': ['chamas dos redmanes', 'chama da juba vermelha'],
  'giant hunt': ['caca ao gigante', 'caça ao gigante'],
  'lions claw': ['garra do leao', 'garra do leão', 'artorias'],

  // Itens Chave
  'larval tear': ['lagrima larval', 'lágrima larval', 'respec', 'renascimento'],
  'scadutree fragment': ['fragmento de scadutree', 'fragmento da tervore das sombras', 'dlc'],
  'memory stone': ['pedra de memoria', 'pedra de memória', 'slot de magia'],
  'sacred tear': ['lagrima sagrada', 'lágrima sagrada', 'aumento de cura'],
  'golden seed': ['semente dourada', 'frasco'],
  'stonesword key': ['chave de espada de pedra', 'chave de nevoeiro'],
  'smithing stone': ['pedra de forja', 'forja'],
  'somber smithing stone': ['pedra de forja sombria'],

  // Chefes
  'malenia': ['malenia', 'espada de miquella', 'podridao escarlate'],
  'radahn': ['radahn', 'flagelo estelar', 'general radahn', 'consorte prometido'],
  'messmer': ['messmer', 'o empalador', 'chama das sombras'],
  'mohg': ['mohg', 'senhor do sangue', 'palacio de mohgwyn'],
  'maliketh': ['maliketh', 'lamina negra', 'morte destinada']
};

export const EldenAPI = {
  _cache: new Map(),

  /**
   * Busca itens com suporte a filtros assíncronos e busca bilíngue PT-BR / EN
   */
  async fetchItems({
    category = 'all',
    region = 'all_regions',
    query = '',
    status = 'all',
    acquiredIds = [],
    wishlistIds = [],
    requirements = {},
    simulatedLatency = 80
  } = {}) {
    // Simula tempo de resposta assíncrono para o skeleton loader
    if (simulatedLatency > 0) {
      await new Promise(resolve => setTimeout(resolve, simulatedLatency));
    }

    const cleanQuery = query.trim().toLowerCase();

    // Expansão de sinônimos bilíngues
    let searchTerms = [cleanQuery];
    if (cleanQuery) {
      for (const [enKey, ptList] of Object.entries(BILINGUAL_DICTIONARY)) {
        if (enKey.includes(cleanQuery) || cleanQuery.includes(enKey)) {
          searchTerms.push(...ptList, enKey);
        }
        for (const pt of ptList) {
          if (pt.includes(cleanQuery) || cleanQuery.includes(pt)) {
            searchTerms.push(enKey, ...ptList);
          }
        }
      }
    }
    searchTerms = [...new Set(searchTerms.filter(Boolean))];

    const results = ITEMS_DATA.filter(item => {
      // 1. Categoria
      if (category !== 'all' && item.category !== category) {
        return false;
      }

      // 2. Região
      if (region !== 'all_regions' && item.region !== region) {
        return false;
      }

      // 3. Status (Obtido / Faltante / Favorito)
      const isAcquired = acquiredIds.includes(item.id);
      const isWishlisted = wishlistIds.includes(item.id);

      if (status === 'acquired' && !isAcquired) return false;
      if (status === 'missing' && isAcquired) return false;
      if (status === 'wishlist' && !isWishlisted) return false;

      // 4. Requisitos de Atributos (se especificados no filtro)
      if (requirements.maxStr && item.requirements?.str > requirements.maxStr) return false;
      if (requirements.maxDex && item.requirements?.dex > requirements.maxDex) return false;
      if (requirements.maxInt && item.requirements?.int > requirements.maxInt) return false;
      if (requirements.maxFai && item.requirements?.fai > requirements.maxFai) return false;
      if (requirements.maxArc && item.requirements?.arc > requirements.maxArc) return false;

      // 5. Busca Bilíngue por Texto
      if (cleanQuery) {
        const itemText = `
          ${item.name} 
          ${item.subtype || ''} 
          ${item.location || ''} 
          ${item.lore || ''} 
          ${item.guide || ''} 
          ${item.region || ''}
          ${item.secretType || ''}
        `.toLowerCase();

        const matchesTerm = searchTerms.some(term => itemText.includes(term));
        if (!matchesTerm) return false;
      }

      return true;
    });

    return {
      items: results,
      totalFound: results.length,
      timestamp: Date.now()
    };
  },

  /**
   * Retorna todas as seções categorizadas para o modo de exibição estruturado
   */
  async fetchSections(filterParams = {}) {
    const { items } = await this.fetchItems({ ...filterParams, category: 'all', simulatedLatency: 0 });
    const categories = CATEGORIES.filter(c => c.id !== 'all');

    const sections = categories.map(cat => {
      const catItems = items.filter(item => item.category === cat.id);
      const acquiredCount = catItems.filter(i => filterParams.acquiredIds?.includes(i.id)).length;
      const totalCount = catItems.length;
      const percentage = totalCount > 0 ? Math.round((acquiredCount / totalCount) * 100) : 0;

      return {
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
        color: cat.color,
        items: catItems,
        total: totalCount,
        acquired: acquiredCount,
        percentage
      };
    }).filter(sec => sec.total > 0);

    return sections;
  },

  /**
   * Retorna um item pelo seu ID com informações completas
   */
  async fetchItemById(id) {
    const item = ITEMS_DATA.find(i => i.id === id);
    if (!item) throw new Error(`Item ${id} não encontrado.`);
    return item;
  },

  /**
   * Retorna a lista de categorias disponíveis
   */
  getCategories() {
    return CATEGORIES;
  },

  /**
   * Retorna a lista de regiões disponíveis
   */
  getRegions() {
    return REGIONS;
  }
};
