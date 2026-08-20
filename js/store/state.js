/* ==========================================================================
   ELDENTRACK - REACTIVE STATE STORE (Pub/Sub)
   ========================================================================== */

import { StorageManager } from './storage.js';
import { DataService } from '../data/items-index.js';

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
    this.activeCategory = 'all';
    this.activeRegion = 'all_regions';
    this.searchQuery = '';
    this.statusFilter = 'all'; // 'all', 'acquired', 'missing', 'wishlist'
    this.sortBy = 'default';
    this.isLoading = false;
    this.selectedItem = null;
    this.statsModalOpen = false;
    this.helpModalOpen = false;
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

    const filteredItems = DataService.filterItems({
      category: this.activeCategory,
      region: this.activeRegion,
      search: this.searchQuery,
      status: this.statusFilter,
      acquiredIds: this.acquiredIds,
      wishlistIds: this.wishlistIds
    });

    const stats = DataService.getCounts(this.acquiredIds);

    return {
      activeCategory: this.activeCategory,
      activeRegion: this.activeRegion,
      searchQuery: this.searchQuery,
      statusFilter: this.statusFilter,
      sortBy: this.sortBy,
      acquiredIds: this.acquiredIds,
      wishlistIds: this.wishlistIds,
      items: filteredItems,
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

  // --- Actions ---

  toggleAcquired(itemId) {
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
    this.notify('item_acquired_toggled', { itemId, isNowAcquired });
  }

  toggleWishlist(itemId) {
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
    this.notify('item_wishlist_toggled', { itemId, isWishlisted });
  }

  setCategory(categoryId) {
    if (this.activeCategory === categoryId) return;
    this.activeCategory = categoryId;
    this._triggerLoading();
    this.notify('category_changed', { categoryId });
  }

  setRegion(regionId) {
    if (this.activeRegion === regionId) return;
    this.activeRegion = regionId;
    this._triggerLoading();
    this.notify('region_changed', { regionId });
  }

  setSearchQuery(query) {
    this.searchQuery = query;
    this.notify('search_changed', { query });
  }

  setStatusFilter(status) {
    if (this.statusFilter === status) return;
    this.statusFilter = status;
    this._triggerLoading();
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

  createCharacter(name, build) {
    const newChar = {
      id: 'char_' + Date.now(),
      name: name || 'Novo Maculado',
      build: build || 'Híbrido',
      acquired: [],
      wishlist: [],
      createdAt: new Date().toISOString()
    };
    this.saveData.characters.push(newChar);
    this.activeCharacterId = newChar.id;
    this.acquiredIds = [];
    this.wishlistIds = [];
    this._syncSaveData();
    this.notify('character_created', { character: newChar });
  }

  switchCharacter(charId) {
    const char = this.saveData.characters.find(c => c.id === charId);
    if (!char) return;
    this.activeCharacterId = charId;
    this.acquiredIds = char.acquired || [];
    this.wishlistIds = char.wishlist || [];
    this.saveData.activeCharacterId = charId;
    StorageManager.save(this.saveData);
    this._triggerLoading();
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
      this.notify('save_imported', { character: curChar });
      return true;
    } catch (err) {
      console.error('[EldenTrack State] Erro ao importar save:', err);
      throw err;
    }
  }

  resetAllProgress() {
    this.saveData = StorageManager.resetProgress();
    this.activeCharacterId = this.saveData.activeCharacterId;
    const curChar = this.saveData.characters[0];
    this.acquiredIds = [];
    this.wishlistIds = [];
    this._triggerLoading();
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
