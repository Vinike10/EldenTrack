/* ==========================================================================
   ELDENTRACK - DATA SERVICE & INDEXER (v4.2)
   Indexers for Items, Categories, Roadmap Routes, Bilingual Fuzzy Search
   & Typo-Tolerant Matching (Levenshtein + Stemming + Alias Expansion)
   ========================================================================== */

import { CATEGORIES } from './categories.js';
import { REGIONS } from './regions.js';
import { ITEMS_DATA } from './items.js';

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
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function isFuzzyTokenMatch(queryWord, targetWords) {
  if (!queryWord) return true;
  const qLen = queryWord.length;

  for (const t of targetWords) {
    if (!t) continue;
    // 1. O token do item t contém o termo buscado (ex: "rapieira" contém "rapier")
    if (t.includes(queryWord)) return true;

    // 2. Se ambos os termos tiverem tamanho relevante (>= 4), aceita se queryWord contém t
    if (qLen >= 4 && t.length >= 4 && queryWord.includes(t)) return true;

    // 3. Tolerância a erros de digitação via Levenshtein (ex: "rapiera" vs "rapieira", dist = 1)
    if (qLen >= 4 && t.length >= 4) {
      const maxAllowedDist = qLen >= 7 ? 2 : 1;
      const dist = levenshteinDistance(queryWord, t);
      if (dist <= maxAllowedDist) return true;
    }
  }
  return false;
}

export function highlightText(text, searchQuery) {
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

  /**
   * Retorna os itens organizados por Região na ordem natural da Campanha
   */
  getItemsByRoadmap(acquiredIds = [], wishlistIds = [], filterParams = {}) {
    const validRegions = REGIONS.filter(r => r.id !== 'all_regions').sort((a, b) => (a.order || 0) - (b.order || 0));

    return validRegions.map(reg => {
      const filteredForRegion = this.filterItems({
        ...filterParams,
        region: reg.id,
        acquiredIds,
        wishlistIds
      });

      const allInRegion = ITEMS_DATA.filter(i => i.region === reg.id);
      const acquiredCount = allInRegion.filter(i => acquiredIds.includes(i.id)).length;
      const totalCount = allInRegion.length;
      const percentage = totalCount > 0 ? Math.round((acquiredCount / totalCount) * 100) : 0;

      return {
        ...reg,
        items: filteredForRegion,
        total: totalCount,
        acquired: acquiredCount,
        percentage
      };
    }).filter(group => group.items.length > 0 || (filterParams.category === 'all' && !filterParams.search && filterParams.status === 'all' && (filterParams.region === 'all_regions' || !filterParams.region)));
  },

  filterItems({ category = 'all', region = 'all_regions', search = '', query = '', status = 'all', acquiredIds = [], wishlistIds = [] }) {
    const rawQuery = search || query || '';
    const clean = normalizeText(rawQuery);
    const queryWords = clean ? clean.split(/\s+/).filter(Boolean) : [];

    let aliasTerms = [];
    if (clean) {
      for (const [enKey, ptList] of Object.entries(BILINGUAL_DICTIONARY)) {
        const normEn = normalizeText(enKey);
        if (normEn.includes(clean) || clean.includes(normEn) || (clean.length >= 4 && levenshteinDistance(clean, normEn) <= 2)) {
          aliasTerms.push(normEn, ...ptList.map(normalizeText));
        }
        for (const pt of ptList) {
          const normPt = normalizeText(pt);
          if (normPt.includes(clean) || clean.includes(normPt) || (clean.length >= 4 && levenshteinDistance(clean, normPt) <= 2)) {
            aliasTerms.push(normEn, normPt);
          }
        }
      }
    }
    aliasTerms = [...new Set(aliasTerms.filter(Boolean))];

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

      // 4. Busca por Texto Multitermo Bilíngue & Fuzzy
      if (clean) {
        const rawItemText = `
          ${item.name} ${item.nameEn || ''} ${item.subtype || ''} ${item.location || ''}
          ${item.nearestGrace || ''} ${item.lore || ''} ${item.guide || ''} ${item.region || ''}
          ${item.secretType || ''} ${item.combatStats?.skill || ''} ${item.combatStats?.damageType || ''}
          ${item.combatStats?.passive || ''}
        `;
        const itemText = normalizeText(rawItemText);
        const itemTokens = itemText.split(/\s+/).filter(Boolean);

        // A. Match direto de frase ou palavras
        const allWordsMatch = queryWords.length > 0 && queryWords.every(word => isFuzzyTokenMatch(word, itemTokens));
        
        // B. Match de Sinônimos / Dicionário Bilíngue
        const aliasMatch = aliasTerms.length > 0 && aliasTerms.some(term => {
          const termWords = term.split(/\s+/).filter(Boolean);
          return termWords.some(tw => isFuzzyTokenMatch(tw, itemTokens));
        });

        if (!allWordsMatch && !aliasMatch) return false;
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
