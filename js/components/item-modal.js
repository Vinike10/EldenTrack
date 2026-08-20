/* ==========================================================================
   ELDENTRACK - ITEM DETAIL MODAL
   Deep lore, step-by-step acquisition walkthrough and map coordinates
   ========================================================================== */

import { Store } from '../store/state.js';
import { Toast } from './toast.js';

export const ItemModal = {
  render(item, isAcquired, isWishlisted) {
    if (!item) return '';

    const reqs = item.requirements || {};
    const reqGrid = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 10px; margin: 12px 0;">
        <div style="background: rgba(0,0,0,0.4); padding: 8px; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.06); text-align: center;">
          <div style="font-size: 0.72rem; color: var(--text-muted);">FORÇA</div>
          <div style="font-family: var(--font-mono); font-size: 1.1rem; color: ${reqs.str > 0 ? 'var(--gold-bright)' : 'var(--text-secondary)'};">${reqs.str || '-'}</div>
        </div>
        <div style="background: rgba(0,0,0,0.4); padding: 8px; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.06); text-align: center;">
          <div style="font-size: 0.72rem; color: var(--text-muted);">DESTREZA</div>
          <div style="font-family: var(--font-mono); font-size: 1.1rem; color: ${reqs.dex > 0 ? 'var(--gold-bright)' : 'var(--text-secondary)'};">${reqs.dex || '-'}</div>
        </div>
        <div style="background: rgba(0,0,0,0.4); padding: 8px; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.06); text-align: center;">
          <div style="font-size: 0.72rem; color: var(--text-muted);">INTELIGÊNCIA</div>
          <div style="font-family: var(--font-mono); font-size: 1.1rem; color: ${reqs.int > 0 ? 'var(--gold-bright)' : 'var(--text-secondary)'};">${reqs.int || '-'}</div>
        </div>
        <div style="background: rgba(0,0,0,0.4); padding: 8px; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.06); text-align: center;">
          <div style="font-size: 0.72rem; color: var(--text-muted);">FÉ</div>
          <div style="font-family: var(--font-mono); font-size: 1.1rem; color: ${reqs.fai > 0 ? 'var(--gold-bright)' : 'var(--text-secondary)'};">${reqs.fai || '-'}</div>
        </div>
        <div style="background: rgba(0,0,0,0.4); padding: 8px; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.06); text-align: center;">
          <div style="font-size: 0.72rem; color: var(--text-muted);">ARCANO</div>
          <div style="font-family: var(--font-mono); font-size: 1.1rem; color: ${reqs.arc > 0 ? 'var(--gold-bright)' : 'var(--text-secondary)'};">${reqs.arc || '-'}</div>
        </div>
      </div>
    `;

    return `
      <div class="modal-overlay active" id="item-modal-overlay">
        <div class="modal-content">
          <button class="modal-close-btn" id="modal-close-btn" title="Fechar">&times;</button>
          
          <div class="modal-header">
            <div class="modal-icon">${item.icon || '⚔️'}</div>
            <div style="flex: 1;">
              <h2 class="modal-title">${item.name}</h2>
              <div style="display: flex; gap: 8px; align-items: center; margin-top: 4px; flex-wrap: wrap;">
                <span class="category-chip" style="padding: 3px 10px; font-size: 0.78rem;">${item.subtype || item.category}</span>
                <span class="category-chip" style="padding: 3px 10px; font-size: 0.78rem; border-color: var(--gold-muted);">${item.secretType || 'Exploração'}</span>
                <span style="font-size: 0.8rem; color: var(--gold-muted);">📍 ${item.location}</span>
              </div>
            </div>
          </div>

          <div class="modal-section-title">📜 Descrição & Lore</div>
          <div class="lore-quote">
            "${item.lore || 'Sem registro adicional nos arquivos de Leyndell.'}"
          </div>

          <div class="modal-section-title">⚔️ Requisitos Mínimos de Atributos</div>
          ${reqGrid}

          <div class="modal-section-title">🧭 Como Encontrar (Passo a Passo)</div>
          <div class="guide-step-box">
            ${item.guide}
          </div>

          <div class="modal-section-title">🗺️ Referência de Localização</div>
          <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 12px; font-size: 0.88rem; color: var(--text-secondary); border: 1px solid rgba(255,255,255,0.05); margin-bottom: 24px;">
            <strong style="color: var(--gold-bright);">Ponto de Referência:</strong> ${item.mapCoords || item.location}
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end; align-items: center; border-top: 1px solid rgba(212,175,55,0.18); padding-top: 16px;">
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" id="modal-wishlist-toggle" style="font-size: 1.4rem; padding: 6px 12px;">
              ${isWishlisted ? '★ Favorito' : '☆ Favoritar'}
            </button>
            <button class="btn ${isAcquired ? 'btn-secondary' : 'btn-gold'}" id="modal-acquired-toggle">
              ${isAcquired ? '✓ Marcado como Obtido' : '✨ Marcar como Obtido'}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(container) {
    container.addEventListener('click', (e) => {
      if (e.target.id === 'modal-close-btn' || e.target.id === 'item-modal-overlay') {
        Store.setSelectedItem(null);
      }

      if (e.target.id === 'modal-acquired-toggle') {
        const item = Store.getState().selectedItem;
        if (item) {
          Store.toggleAcquired(item.id);
          const isAcquired = Store.getState().acquiredIds.includes(item.id);
          Toast.show({
            title: isAcquired ? '✨ Item Descoberto!' : 'Item Desmarcado',
            message: `${item.name} atualizado.`,
            playSound: isAcquired
          });
          // Re-render modal button
          const btn = document.getElementById('modal-acquired-toggle');
          if (btn) {
            btn.className = isAcquired ? 'btn btn-secondary' : 'btn btn-gold';
            btn.innerHTML = isAcquired ? '✓ Marcado como Obtido' : '✨ Marcar como Obtido';
          }
        }
      }

      if (e.target.id === 'modal-wishlist-toggle') {
        const item = Store.getState().selectedItem;
        if (item) {
          Store.toggleWishlist(item.id);
          const isWish = Store.getState().wishlistIds.includes(item.id);
          const btn = document.getElementById('modal-wishlist-toggle');
          if (btn) {
            btn.className = `wishlist-btn ${isWish ? 'active' : ''}`;
            btn.innerHTML = isWish ? '★ Favorito' : '☆ Favoritar';
          }
        }
      }
    });

    // Esc para fechar
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && Store.getState().selectedItem) {
        Store.setSelectedItem(null);
      }
    });
  }
};
