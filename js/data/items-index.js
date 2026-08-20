/* ==========================================================================
   ELDENTRACK - DATA SERVICE & INDEXER
   ========================================================================== */

import { CATEGORIES } from './categories.js';
import { REGIONS } from './regions.js';
import { ITEMS_DATA } from './items.js';

export const DataService = {
  getCategories() {
    return CATEGORIES;
  },

  getRegions() {
    return REGIONS;
  },

  getAllItems() {
    return ITEMS_DATA;
  },

  getItemById(id) {
    return ITEMS_DATA.find(item => item.id === id) || null;
  },

  getCategoryById(id) {
    return CATEGORIES.find(cat => cat.id === id) || null;
  },

  getRegionById(id) {
    return REGIONS.find(reg => reg.id === id) || null;
  },

  filterItems({ category = 'all', region = 'all_regions', search = '', status = 'all', acquiredIds = [], wishlistIds = [] }) {
    const query = search.trim().toLowerCase();

    return ITEMS_DATA.filter(item => {
      // 1. Filtro de Categoria
      if (category !== 'all' && item.category !== category) {
        return false;
      }

      // 2. Filtro de Região
      if (region !== 'all_regions' && item.region !== region) {
        return false;
      }

      // 3. Filtro de Status
      const isAcquired = acquiredIds.includes(item.id);
      const isWishlisted = wishlistIds.includes(item.id);

      if (status === 'acquired' && !isAcquired) return false;
      if (status === 'missing' && isAcquired) return false;
      if (status === 'wishlist' && !isWishlisted) return false;

      // 4. Busca por Texto (Nome, Subtipo, Localização, Lore, Requisitos)
      if (query) {
        const matchName = item.name.toLowerCase().includes(query);
        const matchSubtype = item.subtype?.toLowerCase().includes(query);
        const matchLocation = item.location?.toLowerCase().includes(query);
        const matchLore = item.lore?.toLowerCase().includes(query);
        const matchGuide = item.guide?.toLowerCase().includes(query);

        if (!matchName && !matchSubtype && !matchLocation && !matchLore && !matchGuide) {
          return false;
        }
      }

      return true;
    });
  },

  getCounts(acquiredIds = []) {
    const total = ITEMS_DATA.length;
    const acquired = acquiredIds.filter(id => ITEMS_DATA.some(item => item.id === id)).length;
    const percentage = total > 0 ? Math.round((acquired / total) * 100) : 0;

    // Contagem por Categoria
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

    // Contagem por Região
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

    return {
      total,
      acquired,
      missing: total - acquired,
      percentage,
      byCategory,
      byRegion
    };
  }
};
