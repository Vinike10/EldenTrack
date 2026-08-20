/* ==========================================================================
   ELDENTRACK - SECTION & ROADMAP VIEW COMPONENT (v4.1)
   1. Campaign Roadmap View (By Natural Region Order)
   2. Category Sections View (By Taxonomy)
   3. Fast Checklist View (Ultra-Compact Rows)
   ========================================================================== */

import { ItemCard } from './item-card.js';
import { Store } from '../store/state.js';

export const SectionView = {
  /**
   * Renderiza a Rota de Campanha por Região (Progressão Natural do Jogo)
   */
  renderRoadmap(roadmap, acquiredIds = [], wishlistIds = []) {
    const state = Store.getState();
    if (!roadmap || roadmap.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-icon">🕯️</div>
          <div class="empty-title">Nenhum Segredo Encontrado</div>
          <p class="empty-desc">Nenhum item corresponde aos filtros selecionados ${state.searchQuery ? `ou à busca "${state.searchQuery}"` : ''}.</p>
          ${state.searchQuery ? `
            <button class="btn btn-secondary" id="clear-search-empty-btn" style="margin-top: 14px;">
              ✕ Limpar Busca
            </button>
          ` : ''}
        </div>
      `;
    }

    const blocksHtml = roadmap.map(reg => {
      const cardsHtml = reg.items.map(item => {
        const isAcquired = acquiredIds.includes(item.id);
        const isWishlisted = wishlistIds.includes(item.id);
        return ItemCard.render(item, isAcquired, isWishlisted);
      }).join('');

      return `
        <div class="roadmap-region-block" id="region-block-${reg.id}">
          <div class="roadmap-region-header" data-toggle-region="${reg.id}">
            <div class="roadmap-title-area">
              <div class="roadmap-region-icon">${reg.icon || '🏰'}</div>
              <div>
                <h3 class="roadmap-region-name">${reg.name}</h3>
                <div class="roadmap-region-desc">
                  ${reg.recommendedLevel ? `<span style="color: var(--gold-light); font-weight: 500;">${reg.recommendedLevel}</span> &bull; ` : ''}
                  ${reg.description || ''}
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--gold-light);">
                  ${reg.acquired} / ${reg.total} (${reg.percentage}%)
                </span>
                <div class="progress-bar-bg" style="width: 100px;">
                  <div class="progress-bar-fill" style="width: ${reg.percentage}%;"></div>
                </div>
              </div>
              <button class="section-collapse-btn" title="Recolher / Expandir">▾</button>
            </div>
          </div>

          <div class="roadmap-region-content" id="region-content-${reg.id}">
            <div class="items-grid">
              ${cardsHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="route-roadmap-container">
        ${blocksHtml}
      </div>
    `;
  },

  /**
   * Renderiza Seções por Categoria
   */
  renderCategories(sections, acquiredIds = [], wishlistIds = []) {
    const state = Store.getState();
    if (!sections || sections.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-icon">🕯️</div>
          <div class="empty-title">Nenhum Segredo Encontrado</div>
          <p class="empty-desc">Nenhum item corresponde aos filtros selecionados ${state.searchQuery ? `ou à busca "${state.searchQuery}"` : ''}.</p>
          ${state.searchQuery ? `
            <button class="btn btn-secondary" id="clear-search-empty-btn" style="margin-top: 14px;">
              ✕ Limpar Busca
            </button>
          ` : ''}
        </div>
      `;
    }

    // Quick Anchor Navigation Bar
    const navAnchors = sections.map(sec => `
      <a href="#cat-section-${sec.id}" class="category-chip" style="font-size: 0.78rem;">
        <span>${sec.icon}</span>
        <span>${sec.name.split(' ')[0]}</span>
        <span class="count-badge">${sec.acquired}/${sec.total}</span>
      </a>
    `).join('');

    const blocks = sections.map(sec => {
      const cardsHtml = sec.items.map(item => {
        const isAcquired = acquiredIds.includes(item.id);
        const isWishlisted = wishlistIds.includes(item.id);
        return ItemCard.render(item, isAcquired, isWishlisted);
      }).join('');

      return `
        <div class="category-section-block" id="cat-section-${sec.id}">
          <div class="section-header" data-toggle-cat="${sec.id}">
            <div class="section-title-group">
              <span class="section-icon">${sec.icon}</span>
              <div>
                <h3 class="section-heading">${sec.name}</h3>
                <div class="section-subtext">${sec.description || ''}</div>
              </div>
            </div>

            <div class="section-meta-group">
              <div class="section-progress-widget">
                <span class="section-progress-label">${sec.acquired} / ${sec.total} (${sec.percentage}%)</span>
                <div class="progress-bar-bg" style="width: 100px;">
                  <div class="progress-bar-fill" style="width: ${sec.percentage}%;"></div>
                </div>
              </div>
              <button class="section-collapse-btn">▾</button>
            </div>
          </div>

          <div class="section-content" id="cat-content-${sec.id}">
            <div class="items-grid">
              ${cardsHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="section-view-wrapper">
        <div class="categories-scroll" style="padding-bottom: 8px;">
          ${navAnchors}
        </div>
        <div style="display: flex; flex-direction: column; gap: 18px;">
          ${blocks}
        </div>
      </div>
    `;
  },

  /**
   * Renderiza Modo Checklist Rápido
   */
  renderChecklist(items, acquiredIds = [], wishlistIds = []) {
    const state = Store.getState();
    if (!items || items.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-icon">🕯️</div>
          <div class="empty-title">Nenhum Item Encontrado</div>
          <p class="empty-desc">Nenhum item corresponde aos filtros ${state.searchQuery ? `ou à busca "${state.searchQuery}"` : ''}.</p>
          ${state.searchQuery ? `
            <button class="btn btn-secondary" id="clear-search-empty-btn" style="margin-top: 14px;">
              ✕ Limpar Busca
            </button>
          ` : ''}
        </div>
      `;
    }

    const rowsHtml = items.map(item => {
      const isAcquired = acquiredIds.includes(item.id);
      const isWishlisted = wishlistIds.includes(item.id);
      return ItemCard.renderChecklistRow(item, isAcquired, isWishlisted);
    }).join('');

    return `
      <div class="checklist-container">
        ${rowsHtml}
      </div>
    `;
  },

  attachEvents(container) {
    container.addEventListener('click', (e) => {
      // Botão de Limpar Busca no Estado Vazio
      if (e.target.id === 'clear-search-empty-btn') {
        Store.setSearchQuery('');
        const sInput = document.getElementById('search-input');
        if (sInput) {
          sInput.value = '';
          sInput.focus();
        }
        return;
      }

      // Recolher/Expandir Região
      const regHeader = e.target.closest('[data-toggle-region]');
      if (regHeader) {
        const regId = regHeader.dataset.toggleRegion;
        const content = document.getElementById(`region-content-${regId}`);
        const btn = regHeader.querySelector('.section-collapse-btn');
        if (content) {
          content.classList.toggle('collapsed');
          if (btn) {
            btn.style.transform = content.classList.contains('collapsed') ? 'rotate(-90deg)' : 'rotate(0deg)';
          }
        }
        return;
      }

      // Recolher/Expandir Categoria
      const catHeader = e.target.closest('[data-toggle-cat]');
      if (catHeader) {
        const catId = catHeader.dataset.toggleCat;
        const content = document.getElementById(`cat-content-${catId}`);
        const btn = catHeader.querySelector('.section-collapse-btn');
        if (content) {
          content.classList.toggle('collapsed');
          if (btn) {
            btn.style.transform = content.classList.contains('collapsed') ? 'rotate(-90deg)' : 'rotate(0deg)';
          }
        }
        return;
      }
    });
  }
};
