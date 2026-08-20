/* ==========================================================================
   ELDENTRACK - FILTER BAR COMPONENT (with View Mode Toggle & Clear)
   ========================================================================== */

import { Store } from '../store/state.js';
import { DataService } from '../data/items-index.js';

export const FilterBar = {
  render(state) {
    const categories = DataService.getCategories();
    const regions = DataService.getRegions();
    const stats = state.stats;

    // Categorias Scroll
    const categoryChips = categories.map(cat => {
      const isActive = state.activeCategory === cat.id;
      const count = stats.byCategory[cat.id]?.total || 0;
      const acquired = stats.byCategory[cat.id]?.acquired || 0;

      return `
        <button class="category-chip ${isActive ? 'active' : ''}" data-category-id="${cat.id}">
          <span>${cat.icon}</span>
          <span>${cat.name}</span>
          <span class="count-badge">${acquired}/${count}</span>
        </button>
      `;
    }).join('');

    // Regiões Select
    const regionOptions = regions.map(reg => {
      const isSelected = state.activeRegion === reg.id ? 'selected' : '';
      const regStat = stats.byRegion[reg.id];
      const countLabel = regStat ? ` (${regStat.acquired}/${regStat.total})` : '';
      return `<option value="${reg.id}" ${isSelected}>${reg.badge || ''} ${reg.name}${countLabel}</option>`;
    }).join('');

    return `
      <div class="filter-container">
        <!-- Categories Scroll (visível apenas em Grid ou como atalho) -->
        <div class="categories-scroll" id="categories-scroll-container">
          ${categoryChips}
        </div>

        <!-- Sub Filters Row -->
        <div class="sub-filters-row">
          <!-- Status Pills -->
          <div class="status-pills">
            <button class="status-pill ${state.statusFilter === 'all' ? 'active' : ''}" data-status="all">
              Todos (${stats.total})
            </button>
            <button class="status-pill ${state.statusFilter === 'acquired' ? 'active' : ''}" data-status="acquired">
              ✓ Obtidos (${stats.acquired})
            </button>
            <button class="status-pill ${state.statusFilter === 'missing' ? 'active' : ''}" data-status="missing">
              ○ Faltantes (${stats.missing})
            </button>
            <button class="status-pill ${state.statusFilter === 'wishlist' ? 'active' : ''}" data-status="wishlist">
              ★ Favoritos (${state.wishlistIds.length})
            </button>
          </div>

          <!-- Region Dropdown & View Mode Switcher -->
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <!-- View Mode Switcher -->
            <div class="view-mode-toggle">
              <button class="view-mode-btn ${state.viewMode === 'grid' ? 'active' : ''}" data-view-mode="grid" title="Visualização em Grid Único">
                🔲 Grid
              </button>
              <button class="view-mode-btn ${state.viewMode === 'sections' ? 'active' : ''}" data-view-mode="sections" title="Visualização por Seções Separadas de Categorias">
                📑 Seções
              </button>
            </div>

            <!-- Region Select -->
            <select class="custom-select" id="region-select">
              ${regionOptions}
            </select>

            ${(state.activeCategory !== 'all' || state.activeRegion !== 'all_regions' || state.statusFilter !== 'all' || state.searchQuery) ? `
              <button class="btn btn-ghost" id="clear-filters-btn" style="padding: 6px 10px; font-size: 0.8rem;" title="Limpar todos os filtros">
                ✕ Limpar
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(container) {
    // Categorias e Status
    container.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-category-id]');
      if (chip) {
        const catId = chip.dataset.categoryId;
        Store.setCategory(catId);
      }

      const statusPill = e.target.closest('[data-status]');
      if (statusPill) {
        const status = statusPill.dataset.status;
        Store.setStatusFilter(status);
      }

      const viewModeBtn = e.target.closest('[data-view-mode]');
      if (viewModeBtn) {
        const mode = viewModeBtn.dataset.viewMode;
        Store.setViewMode(mode);
      }

      if (e.target.id === 'clear-filters-btn') {
        Store.setCategory('all');
        Store.setRegion('all_regions');
        Store.setStatusFilter('all');
        Store.setSearchQuery('');
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';
      }
    });

    // Seletor de Região
    container.addEventListener('change', (e) => {
      if (e.target.id === 'region-select') {
        Store.setRegion(e.target.value);
      }
    });
  }
};
