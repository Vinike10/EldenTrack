/* ==========================================================================
   ELDENTRACK - REACTIVE STATE STORE (Pub/Sub with EldenAPI Integration)
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

    // Filtros e UI
    this.viewMode = 'grid'; // 'grid' ou 'sections'
    this.activeCategory = 'all';
    this.activeRegion = 'all_regions';
    this.searchQuery = '';
    this.statusFilter = 'all'; // 'all', 'acquired', 'missing', 'wishlist'
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
    this.helpModalOpen = false;

    // Inicialização síncrona inicial para evitar tela vazia
    this.currentItems = DataService.filterItems({
      category: this.activeCategory,
      region: this.activeRegion,
      search: this.searchQuery,
      status: this.statusFilter,
      acquiredIds: this.acquiredIds,
      wishlistIds: this.wishlistIds
    });
    this.currentSections = [];
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
      viewMode: this.viewMode,
      activeCategory: this.activeCategory,
      activeRegion: this.activeRegion,
      searchQuery: this.searchQuery,
      statusFilter: this.statusFilter,
      requirements: this.requirements,
      sortBy: this.sortBy,
      acquiredIds: this.acquiredIds,
      wishlistIds: this.wishlistIds,
      items: this.currentItems,
      sections: this.currentSections,
      totalItemCount: DataService.getAllItems().length,
      stats,
      activeCharacter: curChar,
      characters: this.saveData.characters,
      isLoading: this.isLoading,
      selectedItem: this.selectedItem,
      statsModalOpen: this.statsModalOpen,
      helpModalOpen: this.helpModalOpen
    };
  }

  async _refreshData() {
    const { items } = await EldenAPI.fetchItems({
      category: this.activeCategory,
      region: this.activeRegion,
      query: this.searchQuery,
      status: this.statusFilter,
      acquiredIds: this.acquiredIds,
      wishlistIds: this.wishlistIds,
      requirements: this.requirements,
      simulatedLatency: 0
    });

    const sections = await EldenAPI.fetchSections({
      region: this.activeRegion,
      query: this.searchQuery,
      status: this.statusFilter,
      acquiredIds: this.acquiredIds,
      wishlistIds: this.wishlistIds,
      requirements: this.requirements
    });

    this.currentItems = items;
    this.currentSections = sections;
  }

  // --- Actions ---

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

  setViewMode(mode) {
    if (this.viewMode === mode) return;
    this.viewMode = mode;
    this._triggerLoading();
    this.notify('view_mode_changed', { mode });
  }

  async setCategory(categoryId) {
    if (this.activeCategory === categoryId) return;
    this.activeCategory = categoryId;
    this._triggerLoading();
    await this._refreshData();
    this.notify('category_changed', { categoryId });
  }

  async setRegion(regionId) {
    if (this.activeRegion === regionId) return;
    this.activeRegion = regionId;
    this._triggerLoading();
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
    this._triggerLoading();
    await this._refreshData();
    this.notify('status_filter_changed', { status });
  }

  setSelectedItem(item) {
    this.selectedItem = item;
    this.notify('selected_item_changed', { item });
  }

  toggleStatsModal(open) {
    this.statsModalOpen = typeof open === 'boolean' ? open : !this.statsModalOpen;
    this.notify('stats_modal_toggled', { open: this.statsModalOpen });
  }

  toggleHelpModal(open) {
    this.helpModalOpen = typeof open === 'boolean' ? open : !this.helpModalOpen;
    this.notify('help_modal_toggled', { open: this.helpModalOpen });
  }

  async switchCharacter(charId) {
    const char = this.saveData.characters.find(c => c.id === charId);
    if (!char) return;
    this.activeCharacterId = charId;
    this.acquiredIds = char.acquired || [];
    this.wishlistIds = char.wishlist || [];
    this.saveData.activeCharacterId = charId;
    StorageManager.save(this.saveData);
    this._triggerLoading();
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
      this._triggerLoading();
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
    this._triggerLoading();
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

  _triggerLoading(duration = 200) {
    this.isLoading = true;
    this.notify('loading_started', {});
    setTimeout(() => {
      this.isLoading = false;
      this.notify('loading_ended', {});
    }, duration);
  }
}

export const Store = new StateStore();
