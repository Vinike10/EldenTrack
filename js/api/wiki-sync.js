/* ==========================================================================
   ELDENTRACK - WIKI SYNC & SCHEMA NORMALIZER
   Utilities to parse and normalize wiki items to the EldenTrack schema
   ========================================================================== */

export const WikiSync = {
  /**
   * Normaliza um registro extraído da Wiki Fextralife para o formato do EldenTrack
   */
  normalizeWikiItem(raw) {
    return {
      id: raw.id || `item_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: raw.namePt || raw.nameEn || 'Item Desconhecido',
      nameEn: raw.nameEn || '',
      category: raw.category || 'key_items',
      subtype: raw.subtype || 'Diversos',
      region: raw.region || 'limgrave',
      location: raw.location || 'Localização desconhecida',
      rarity: raw.rarity || 'common',
      icon: raw.icon || '✨',
      secretType: raw.secretType || 'Exploração Secreta',
      requirements: {
        str: raw.requirements?.str || 0,
        dex: raw.requirements?.dex || 0,
        int: raw.requirements?.int || 0,
        fai: raw.requirements?.fai || 0,
        arc: raw.requirements?.arc || 0
      },
      lore: raw.lore || 'Sem registros nos arquivos da Mesa-Redonda.',
      guide: raw.guide || 'Explore a área indicada para obter este segredo.',
      mapCoords: raw.mapCoords || raw.location
    };
  }
};
