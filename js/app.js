/* ==========================================================================
   ELDENTRACK - MAIN APPLICATION BOOTSTRAP (Phase 2 with SectionView)
   ========================================================================== */

import { Store } from './store/state.js';
import { Header } from './components/header.js';
import { FilterBar } from './components/filter-bar.js';
import { ItemCard } from './components/item-card.js';
import { SectionView } from './components/section-view.js';
import { ItemModal } from './components/item-modal.js';
import { StatsDashboard } from './components/stats-dashboard.js';
import { SkeletonLoader } from './components/skeleton-loader.js';

class Application {
  constructor() {
    this.headerRoot = document.getElementById('header-root');
    this.bannerStatsRoot = document.getElementById('banner-stats-root');
    this.filterBarRoot = document.getElementById('filter-bar-root');
    this.itemsGrid = document.getElementById('items-grid');
    this.skeletonGridView = document.getElementById('skeleton-grid-view');
    this.itemsGridView = document.getElementById('items-grid-view');
    this.modalRoot = document.getElementById('modal-root');
    this.statsModalRoot = document.getElementById('stats-modal-root');

    this.init();
  }

  init() {
    // 1. Renderizar Skeletons no início
    this.skeletonGridView.innerHTML = SkeletonLoader.renderCardSkeletons(8);
    
    // 2. Anexar Eventos globais de componentes
    ItemCard.attachEvents(this.itemsGridView);
    SectionView.attachEvents(this.itemsGridView);
    FilterBar.attachEvents(this.filterBarRoot);
    ItemModal.attachEvents(this.modalRoot);
    StatsDashboard.attachEvents(this.statsModalRoot);

    // 3. Inscrever aplicação ao Store de Estado
    Store.subscribe((eventName, state) => {
      this.render(state, eventName);
    });

    // 4. Renderização inicial com leve delay para demonstrar o skeleton loading
    this.showSkeletons(true);
    setTimeout(() => {
      this.render(Store.getState(), 'initial_mount');
      this.showSkeletons(false);
    }, 300);
  }

  showSkeletons(show) {
    if (show) {
      this.skeletonGridView.classList.remove('hidden');
      this.itemsGridView.classList.remove('active');
    } else {
      this.skeletonGridView.classList.add('hidden');
      this.itemsGridView.classList.add('active');
    }
  }

  render(state, eventName) {
    // Header
    this.headerRoot.innerHTML = Header.render(state);
    Header.attachEvents(this.headerRoot);

    // Banner Stats Summary
    this.bannerStatsRoot.innerHTML = `
      <div class="stat-pill-box">
        <div class="stat-pill-val" style="color: var(--status-acquired);">${state.stats.acquired}</div>
        <div class="stat-pill-lbl">Obtidos</div>
      </div>
      <div class="stat-pill-box">
        <div class="stat-pill-val" style="color: var(--status-missing);">${state.stats.missing}</div>
        <div class="stat-pill-lbl">Faltantes</div>
      </div>
      <div class="stat-pill-box">
        <div class="stat-pill-val">${state.stats.percentage}%</div>
        <div class="stat-pill-lbl">Progresso</div>
      </div>
    `;

    // Filter Bar
    this.filterBarRoot.innerHTML = FilterBar.render(state);

    // Skeleton vs Loaded Items
    if (state.isLoading) {
      this.showSkeletons(true);
      return;
    }

    this.showSkeletons(false);

    // Render de Conteúdo de acordo com viewMode
    if (state.viewMode === 'sections') {
      this.itemsGridView.innerHTML = SectionView.render(state.sections, state.acquiredIds, state.wishlistIds);
    } else {
      // Modo Grid Unificado
      if (state.items.length === 0) {
        this.itemsGridView.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-icon">🕯️</div>
            <div class="empty-title">Nenhum Segredo Encontrado</div>
            <p class="empty-desc">Nenhum item corresponde aos filtros selecionados ou à busca "${state.searchQuery}".</p>
          </div>
        `;
      } else {
        const cardsHtml = state.items.map(item => {
          const isAcquired = state.acquiredIds.includes(item.id);
          const isWishlisted = state.wishlistIds.includes(item.id);
          return ItemCard.render(item, isAcquired, isWishlisted);
        }).join('');

        this.itemsGridView.innerHTML = `<div id="items-grid" class="items-grid">${cardsHtml}</div>`;
      }
    }

    // Modal de Detalhes
    if (state.selectedItem) {
      const isAcquired = state.acquiredIds.includes(state.selectedItem.id);
      const isWishlisted = state.wishlistIds.includes(state.selectedItem.id);
      this.modalRoot.innerHTML = ItemModal.render(state.selectedItem, isAcquired, isWishlisted);
    } else {
      this.modalRoot.innerHTML = '';
    }

    // Modal de Estatísticas
    this.statsModalRoot.innerHTML = StatsDashboard.render(state);
  }
}

// Inicializar após carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  window.__eldentrack_app = new Application();
});
