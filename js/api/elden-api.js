/* ==========================================================================
   ELDENTRACK - ELDEN API SERVICE (v4.0)
   Data Provider, Bilingual Search Engine & Roadmap Aggregator
   ========================================================================== */

import { ITEMS_DATA } from '../data/items.js';
import { CATEGORIES } from '../data/categories.js';
import { REGIONS } from '../data/regions.js';

// Dicionário Bilíngue de Sinônimos PT-BR <-> EN
const BILINGUAL_DICTIONARY = {
  'rivers of blood': ['rios de sangue', 'katana sangrenta', 'okina'],
  'moonveil': ['veu da lua', 'véu da lua', 'katana magica'],
  'dark moon greatsword': ['espada grande da lua sombria', 'ranni', 'luar', 'moonlight'],
  'blasphemous blade': ['lamina blasfema', 'lâmina blasfema', 'rykard', 'fogo'],
  'bolt of gransax': ['raio de gransax', 'lança lendaria', 'gransax'],
  'bloodhound fang': ['presa do cao de caça', 'presa do cão de caça', 'darriwil'],
  'greatsword': ['espada colossal', 'guts', 'espada grande'],
  'milady': ['milady', 'espada leve', 'ensis', 'dlc'],
  'backhand blade': ['lamina reversa', 'lâmina reversa', 'dlc'],
  'antspur rapier': ['rapieira de podridão', 'rapieira', 'estocada'],
  'rogiers rapier': ['rapieira de rogier', 'rogier'],
  'radagon soreseal': ['selo doloroso de radagon', 'selo de radagon', 'atributos'],
  'shard of alexander': ['fragmento de alexander', 'pote guerreiro', 'alexander'],
  'erdtree favor': ['favor da tervore', 'favor da térvore'],
  'dragoncrest greatshield': ['brasao do dragao', 'grande escudo do dragao'],
  'comet azur': ['cometa azur', 'raio laser', 'azur'],
  'ranni dark moon': ['lua sombria de ranni', 'lua de ranni'],
  'golden vow': ['voto dourado', 'encantamento dourado', 'buff'],
  'flame grant me strength': ['chama conceda me forca', 'chama conceda-me força', 'buff'],
  'larval tear': ['lagrima larval', 'lágrima larval', 'respec', 'renascimento'],
  'sacred tear': ['lagrima sagrada', 'lágrima sagrada', 'frasco'],
  'scadutree fragment': ['fragmento de scadutree', 'fragmento da tervore das sombras', 'dlc', 'bênção'],
  'malenia': ['malenia', 'espada de miquella', 'podridao escarlate'],
  'radahn': ['radahn', 'flagelo estelar', 'general radahn'],
  'messmer': ['messmer', 'o empalador', 'chama das sombras', 'dlc']
};

export const EldenAPI = {
  /**
   * Busca itens com filtros assíncronos e busca inteligente bilíngue
   */
  async fetchItems({
    category = 'all',
    region = 'all_regions',
    query = '',
    status = 'all',
    acquiredIds = [],
    wishlistIds = [],
    requirements = {},
    simulatedLatency = 0
  } = {}) {
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
      if (category !== 'all' && item.category !== category) return false;

      // 2. Região
      if (region !== 'all_regions' && item.region !== region) return false;

      // 3. Status
      const isAcquired = acquiredIds.includes(item.id);
      const isWishlisted = wishlistIds.includes(item.id);

      if (status === 'acquired' && !isAcquired) return false;
      if (status === 'missing' && isAcquired) return false;
      if (status === 'wishlist' && !isWishlisted) return false;

      // 4. Requisitos de Atributos
      if (requirements.maxStr && item.requirements?.str > requirements.maxStr) return false;
      if (requirements.maxDex && item.requirements?.dex > requirements.maxDex) return false;
      if (requirements.maxInt && item.requirements?.int > requirements.maxInt) return false;
      if (requirements.maxFai && item.requirements?.fai > requirements.maxFai) return false;
      if (requirements.maxArc && item.requirements?.arc > requirements.maxArc) return false;

      // 5. Busca por Texto
      if (cleanQuery) {
        const itemText = `
          ${item.name} 
          ${item.nameEn || ''} 
          ${item.subtype || ''} 
          ${item.location || ''} 
          ${item.nearestGrace || ''} 
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
   * Retorna os itens organizados em seções de categorias
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
   * Retorna os itens organizados pela Rota de Progressão da Campanha
   */
  async fetchRoadmap(filterParams = {}) {
    const { items } = await this.fetchItems({ ...filterParams, region: 'all_regions', simulatedLatency: 0 });
    const validRegions = REGIONS.filter(r => r.id !== 'all_regions').sort((a, b) => (a.order || 0) - (b.order || 0));

    const roadmap = validRegions.map(reg => {
      const regItems = items.filter(item => item.region === reg.id);
      const allInRegion = ITEMS_DATA.filter(i => i.region === reg.id);
      const acquiredCount = allInRegion.filter(i => filterParams.acquiredIds?.includes(i.id)).length;
      const totalCount = allInRegion.length;
      const percentage = totalCount > 0 ? Math.round((acquiredCount / totalCount) * 100) : 0;

      return {
        ...reg,
        items: regItems,
        total: totalCount,
        acquired: acquiredCount,
        percentage
      };
    }).filter(r => r.items.length > 0 || (filterParams.category === 'all' && !filterParams.query && filterParams.status === 'all'));

    return roadmap;
  },

  /**
   * Retorna um item pelo seu ID
   */
  async fetchItemById(id) {
    const item = ITEMS_DATA.find(i => i.id === id);
    if (!item) throw new Error(`Item ${id} não encontrado.`);
    return item;
  },

  getCategories() {
    return CATEGORIES;
  },

  getRegions() {
    return REGIONS;
  }
};
