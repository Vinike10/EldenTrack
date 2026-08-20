/* ==========================================================================
   ELDENTRACK - FILTER BAR COMPONENT (v4.0)
   Compact Faceted Filters: Category Chips, Region Dropdown & Status Pills
   ========================================================================== */

import { Store } from '../store/state.js';
import { DataService } from '../data/items-index.js';

export const FilterBar = {
  render(state) {
    const categories = DataService.getCategories();
    const regions = DataService.getRegions();
    const stats = state.stats;

    // Chips de Categoria
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

    // Opções de Região
    const regionOptions = regions.map(reg => {
      const isSelected = state.activeRegion === reg.id ? 'selected' : '';
      const regStat = stats.byRegion[reg.id];
      const countLabel = regStat ? ` (${regStat.acquired}/${regStat.total})` : '';
      return `<option value="${reg.id}" ${isSelected}>${reg.badge || ''} ${reg.name}${countLabel}</option>`;
    }).join('');

    const hasActiveFilters = state.activeCategory !== 'all' || 
                            state.activeRegion !== 'all_regions' || 
                            state.statusFilter !== 'all' || 
                            state.searchQuery !== '';

    return `
      <div class="filter-container">
        <!-- Barra Superior de Categorias -->
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

          <!-- Region Dropdown & Clear Filters -->
          <div style="display: flex; align-items: center; gap: 8px;">
            <select class="custom-select" id="region-select" aria-label="Filtrar por Região">
              ${regionOptions}
            </select>

            ${hasActiveFilters ? `
              <button class="btn btn-ghost" id="clear-filters-btn" style="padding: 5px 10px; font-size: 0.78rem;" title="Limpar todos os filtros">
                ✕ Limpar
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(container) {
    container.addEventListener('click', (e) => {
      // Categoria
      const chip = e.target.closest('[data-category-id]');
      if (chip) {
        const catId = chip.dataset.categoryId;
        Store.setCategory(catId);
        return;
      }

      // Status
      const statusPill = e.target.closest('[data-status]');
      if (statusPill) {
        const status = statusPill.dataset.status;
        Store.setStatusFilter(status);
        return;
      }

      // Limpar Filtros
      if (e.target.id === 'clear-filters-btn') {
        Store.setCategory('all');
        Store.setRegion('all_regions');
        Store.setStatusFilter('all');
        Store.setSearchQuery('');
        const sInput = document.getElementById('search-input');
        if (sInput) sInput.value = '';
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
