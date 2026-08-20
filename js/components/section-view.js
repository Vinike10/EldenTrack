/* ==========================================================================
   ELDENTRACK - SECTION VIEW COMPONENT
   Dedicated Categorized Sections with Anchor Navigation and Collapse
   ========================================================================== */

import { ItemCard } from './item-card.js';

export const SectionView = {
  render(sections, acquiredIds = [], wishlistIds = []) {
    if (!sections || sections.length === 0) {
      return `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🕯️</div>
          <div class="empty-title">Nenhum Segredo Encontrado</div>
          <p class="empty-desc">Nenhum item corresponde aos filtros selecionados.</p>
        </div>
      `;
    }

    // Quick Anchor Navigation Bar
    const navAnchors = sections.map(sec => `
      <a href="#section-${sec.id}" class="section-nav-pill">
        <span>${sec.icon}</span>
        <span>${sec.name.split(' ')[0]}</span>
        <span class="count-badge">${sec.acquired}/${sec.total}</span>
      </a>
    `).join('');

    // Render Cada Seção Separada
    const sectionBlocks = sections.map(sec => {
      const cardsHtml = sec.items.map(item => {
        const isAcquired = acquiredIds.includes(item.id);
        const isWishlisted = wishlistIds.includes(item.id);
        return ItemCard.render(item, isAcquired, isWishlisted);
      }).join('');

      return `
        <div class="category-section-block" id="section-${sec.id}">
          <div class="section-header" data-toggle-section="${sec.id}">
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
                <div class="progress-bar-bg" style="width: 110px;">
                  <div class="progress-bar-fill" style="width: ${sec.percentage}%;"></div>
                </div>
              </div>
              <button class="section-collapse-btn" title="Recolher / Expandir Seção">▾</button>
            </div>
          </div>

          <div class="section-content" id="section-content-${sec.id}">
            <div class="items-grid">
              ${cardsHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="section-view-wrapper">
        <!-- Floating / Sticky Section Nav Anchors -->
        <nav class="section-anchor-nav" aria-label="Navegação rápida por categoria">
          ${navAnchors}
        </nav>

        <!-- All Category Sections -->
        <div class="sections-container">
          ${sectionBlocks}
        </div>
      </div>
    `;
  },

  attachEvents(container) {
    container.addEventListener('click', (e) => {
      const header = e.target.closest('[data-toggle-section]');
      if (header) {
        const secId = header.dataset.toggleSection;
        const content = document.getElementById(`section-content-${secId}`);
        const btn = header.querySelector('.section-collapse-btn');
        if (content) {
          content.classList.toggle('collapsed');
          if (btn) {
            btn.style.transform = content.classList.contains('collapsed') ? 'rotate(-90deg)' : 'rotate(0deg)';
          }
        }
      }

      const anchor = e.target.closest('.section-nav-pill');
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }
};
