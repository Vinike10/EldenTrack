/* ==========================================================================
   ELDENTRACK - REACTIVE STATE STORE (v4.0)
   Multi-Theme, View Modes (Route, Grid, Categories, Checklist) & Save Sync
   ========================================================================== */

import { StorageManager } from './storage.js';
import { DataService } from '../data/items-index.js';
import { EldenAPI } from '../api/elden-api.js';

class StateStore {
  constructor() {
    this.listeners = new Set();
    const saved = StorageManager.load();

    this.saveData = saved;
    this.activeCharacterId = saved.activeCharacterId || 'char_default';

    const curChar = saved.characters.find(c => c.id === this.activeCharacterId) || saved.characters[0];
    this.acquiredIds = curChar.acquired || [];
    this.wishlistIds = curChar.wishlist || [];

    // Configurações & Tema
    this.theme = saved.settings?.theme || 'erdtree';
    this.viewMode = saved.settings?.viewMode || 'route'; // 'route', 'grid', 'categories', 'checklist'

    // Aplica o tema imediatamente no HTML root
    document.documentElement.setAttribute('data-theme', this.theme);

    // Filtros e UI
    this.activeCategory = 'all';
    this.activeRegion = 'all_regions';
    this.searchQuery = '';
    this.statusFilter = 'all'; // 'all', 'acquired', 'missing', 'wishlist'
    this.activeDrawerTab = 'walkthrough'; // 'walkthrough', 'combat', 'lore', 'warnings'
    this.requirements = {
      maxStr: null,
      maxDex: null,
      maxInt: null,
      maxFai: null,
      maxArc: null
    };
    this.sortBy = 'default';
    this.isLoading = false;
    this.selectedItem = null;
    this.statsModalOpen = false;

    // Inicialização síncrona
    this.currentItems = DataService.filterItems({
      category: this.activeCategory,
      region: this.activeRegion,
      search: this.searchQuery,
      status: this.statusFilter,
      acquiredIds: this.acquiredIds,
      wishlistIds: this.wishlistIds
    });
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
      try {
        listener(eventName, this.getState(), payload);
      } catch (err) {
        console.error('[EldenTrack State] Erro em listener:', err);
      }
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
      requirements: this.requirements,
      sortBy: this.sortBy,
      acquiredIds: this.acquiredIds,
      wishlistIds: this.wishlistIds,
      items: this.currentItems,
      sections: this.currentSections,
      roadmap: this.currentRoadmap,
      totalItemCount: DataService.getAllItems().length,
      stats,
      activeCharacter: curChar,
      characters: this.saveData.characters,
      isLoading: this.isLoading,
      selectedItem: this.selectedItem,
      statsModalOpen: this.statsModalOpen
    };
  }

  async _refreshData() {
    const filterParams = {
      category: this.activeCategory,
      region: this.activeRegion,
      query: this.searchQuery,
      status: this.statusFilter,
      acquiredIds: this.acquiredIds,
      wishlistIds: this.wishlistIds,
      requirements: this.requirements,
      simulatedLatency: 0
    };

    const { items } = await EldenAPI.fetchItems(filterParams);
    const sections = await EldenAPI.fetchSections(filterParams);
    const roadmap = await EldenAPI.fetchRoadmap(filterParams);

    this.currentItems = items;
    this.currentSections = sections;
    this.currentRoadmap = roadmap;
  }

  // --- Ações do Estado ---

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
    this._triggerLoading(120);
    this.notify('view_mode_changed', { mode });
  }

  setDrawerTab(tabName) {
    this.activeDrawerTab = tabName;
    this.notify('drawer_tab_changed', { tabName });
  }

  async toggleAcquired(itemId) {
    const idx = this.acquiredIds.indexOf(itemId);
    let isNowAcquired = false;

    if (idx >= 0) {
      this.acquiredIds.splice(idx, 1);
      isNowAcquired = false;
    } else {
      this.acquiredIds.push(itemId);
      isNowAcquired = true;
    }

    this._syncSaveData();
    await this._refreshData();
    this.notify('item_acquired_toggled', { itemId, isNowAcquired });
  }

  async toggleWishlist(itemId) {
    const idx = this.wishlistIds.indexOf(itemId);
    let isWishlisted = false;

    if (idx >= 0) {
      this.wishlistIds.splice(idx, 1);
      isWishlisted = false;
    } else {
      this.wishlistIds.push(itemId);
      isWishlisted = true;
    }

    this._syncSaveData();
    await this._refreshData();
    this.notify('item_wishlist_toggled', { itemId, isWishlisted });
  }

  async setCategory(categoryId) {
    if (this.activeCategory === categoryId) return;
    this.activeCategory = categoryId;
    this._triggerLoading(120);
    await this._refreshData();
    this.notify('category_changed', { categoryId });
  }

  async setRegion(regionId) {
    if (this.activeRegion === regionId) return;
    this.activeRegion = regionId;
    this._triggerLoading(120);
    await this._refreshData();
    this.notify('region_changed', { regionId });
  }

  async setSearchQuery(query) {
    this.searchQuery = query;
    await this._refreshData();
    this.notify('search_changed', { query });
  }

  async setStatusFilter(status) {
    if (this.statusFilter === status) return;
    this.statusFilter = status;
    this._triggerLoading(120);
    await this._refreshData();
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

  async switchCharacter(charId) {
    const char = this.saveData.characters.find(c => c.id === charId);
    if (!char) return;
    this.activeCharacterId = charId;
    this.acquiredIds = char.acquired || [];
    this.wishlistIds = char.wishlist || [];
    this.saveData.activeCharacterId = charId;
    StorageManager.save(this.saveData);
    this._triggerLoading(150);
    await this._refreshData();
    this.notify('character_switched', { character: char });
  }

  exportSave() {
    return StorageManager.exportSaveFile(this.saveData);
  }

  async importSave(file) {
    try {
      const data = await StorageManager.importSaveFile(file);
      this.saveData = data;
      this.activeCharacterId = data.activeCharacterId || data.characters[0].id;
      const curChar = data.characters.find(c => c.id === this.activeCharacterId) || data.characters[0];
      this.acquiredIds = curChar.acquired || [];
      this.wishlistIds = curChar.wishlist || [];
      this._triggerLoading(150);
      await this._refreshData();
      this.notify('save_imported', { character: curChar });
      return true;
    } catch (err) {
      console.error('[EldenTrack State] Erro ao importar save:', err);
      throw err;
    }
  }

  async resetAllProgress() {
    this.saveData = StorageManager.resetProgress();
    this.activeCharacterId = this.saveData.activeCharacterId;
    this.acquiredIds = [];
    this.wishlistIds = [];
    this._triggerLoading(150);
    await this._refreshData();
    this.notify('progress_reset', {});
  }

  _syncSaveData() {
    const curChar = this.saveData.characters.find(c => c.id === this.activeCharacterId);
    if (curChar) {
      curChar.acquired = [...this.acquiredIds];
      curChar.wishlist = [...this.wishlistIds];
    }
    this.saveData.activeCharacterId = this.activeCharacterId;
    StorageManager.save(this.saveData);
  }

  _triggerLoading(duration = 150) {
    this.isLoading = true;
    this.notify('loading_started', {});
    setTimeout(() => {
      this.isLoading = false;
      this.notify('loading_ended', {});
    }, duration);
  }
}

export const Store = new StateStore();
