/* ==========================================================================
   ELDENTRACK - MAIN APPLICATION BOOTSTRAP (v4.1)
   Multi-Theme, 4 View Modes, Minimalist Cards & Compendium Side Drawer
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
    this.heroBarRoot = document.getElementById('hero-bar-root');
    this.filterBarRoot = document.getElementById('filter-bar-root');
    this.skeletonGridView = document.getElementById('skeleton-grid-view');
    this.itemsGridView = document.getElementById('items-grid-view');
    this.modalRoot = document.getElementById('modal-root');
    this.statsModalRoot = document.getElementById('stats-modal-root');

    this.init();
  }

  init() {
    // 1. Renderizar Skeletons no início
    if (this.skeletonGridView) {
      this.skeletonGridView.innerHTML = SkeletonLoader.renderCardSkeletons(8);
    }
    
    // 2. Anexar Eventos globais
    ItemCard.attachEvents(this.itemsGridView);
    SectionView.attachEvents(this.itemsGridView);
    FilterBar.attachEvents(this.filterBarRoot);
    ItemModal.attachEvents(this.modalRoot);
    StatsDashboard.attachEvents(this.statsModalRoot);

    // 3. Inscrever aplicação ao Store de Estado
    Store.subscribe((eventName, state) => {
      this.render(state, eventName);
    });

    // 4. Renderização inicial com leve transição de montagem
    this.showSkeletons(true);
    setTimeout(() => {
      this.render(Store.getState(), 'initial_mount');
      this.showSkeletons(false);
    }, 200);
  }

  showSkeletons(show) {
    if (!this.skeletonGridView || !this.itemsGridView) return;
    if (show) {
      this.skeletonGridView.classList.remove('hidden');
      this.itemsGridView.classList.remove('active');
    } else {
      this.skeletonGridView.classList.add('hidden');
      this.itemsGridView.classList.add('active');
    }
  }

  render(state, eventName) {
    // 1. Header & Theme Setup (Atualização estável que preserva o foco do input de busca)
    Header.update(this.headerRoot, state, eventName);

    // 2. Slim Contextual Hero Bar
    const viewTitle = state.viewMode === 'route' ? '🗺️ Rota de Campanha' :
                      state.viewMode === 'categories' ? '📑 Compêndio por Categorias' :
                      state.viewMode === 'checklist' ? '📋 Checklist Rápido de Jogo' :
                      '🔲 Catálogo de Segredos';

    const viewDesc = state.viewMode === 'route' ? 'Progressão natural das Terras Intermédias ao Reino das Sombras.' :
                     state.viewMode === 'categories' ? 'Armas, talismãs, magias, itens chave e chefes separados por taxonomia.' :
                     state.viewMode === 'checklist' ? 'Lista compacta para marcar itens rapidamente durante sua jogatina.' :
                     'Explore os segredos mais poderosos das Terras Intermédias.';

    if (this.heroBarRoot) {
      this.heroBarRoot.innerHTML = `
        <div class="slim-hero-bar">
          <div class="hero-left-info">
            <div class="hero-badge-icon">✨</div>
            <div>
              <h2 class="hero-title">${viewTitle}</h2>
              <div class="hero-subtitle">${viewDesc}</div>
            </div>
          </div>

          <div class="hero-stats-strip">
            <div class="hero-stat-chip">
              <span style="color: var(--status-acquired);">✓</span>
              <span>Obtidos: <strong>${state.stats.acquired}</strong></span>
            </div>
            <div class="hero-stat-chip">
              <span style="color: var(--status-missing);">○</span>
              <span>Faltantes: <strong>${state.stats.missing}</strong></span>
            </div>
            <div class="hero-stat-chip">
              <span style="color: var(--gold-primary);">★</span>
              <span>Favoritos: <strong>${state.wishlistIds.length}</strong></span>
            </div>
          </div>
        </div>
      `;
    }

    // 3. Filter Bar
    if (this.filterBarRoot) {
      this.filterBarRoot.innerHTML = FilterBar.render(state);
    }

    // 4. Skeleton vs Loaded Items
    if (state.isLoading) {
      this.showSkeletons(true);
      return;
    }

    this.showSkeletons(false);

    // 5. Renderização do Conteúdo de acordo com viewMode
    if (state.viewMode === 'route') {
      // Modo Rota de Campanha por Região
      this.itemsGridView.innerHTML = SectionView.renderRoadmap(state.roadmap, state.acquiredIds, state.wishlistIds);
    } else if (state.viewMode === 'categories') {
      // Modo Seções por Categoria
      this.itemsGridView.innerHTML = SectionView.renderCategories(state.sections, state.acquiredIds, state.wishlistIds);
    } else if (state.viewMode === 'checklist') {
      // Modo Checklist Compacto
      this.itemsGridView.innerHTML = SectionView.renderChecklist(state.items, state.acquiredIds, state.wishlistIds);
    } else {
      // Modo Grid Tradicional de Cards
      if (state.items.length === 0) {
        this.itemsGridView.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-icon">🕯️</div>
            <div class="empty-title">Nenhum Segredo Encontrado</div>
            <p class="empty-desc">Nenhum item corresponde à busca "${state.searchQuery || ''}".</p>
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

    // 6. Modal / Side Drawer de Detalhes
    if (state.selectedItem) {
      const isAcquired = state.acquiredIds.includes(state.selectedItem.id);
      const isWishlisted = state.wishlistIds.includes(state.selectedItem.id);
      this.modalRoot.innerHTML = ItemModal.render(state.selectedItem, isAcquired, isWishlisted);
    } else {
      this.modalRoot.innerHTML = '';
    }

    // 7. Modal de Estatísticas
    if (this.statsModalRoot) {
      this.statsModalRoot.innerHTML = StatsDashboard.render(state);
    }
  }
}

// Inicializar após carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  window.__eldentrack_app = new Application();
});
