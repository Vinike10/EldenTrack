/* ==========================================================================
   ELDENTRACK - ITEM CARD COMPONENT
   Interactive card with micro-interactions, 3D tilt and grace check
   ========================================================================== */

import { Store } from '../store/state.js';
import { Toast } from './toast.js';

export const ItemCard = {
  render(item, isAcquired, isWishlisted) {
    const rarityClass = `rarity-${item.rarity || 'common'}`;
    const acquiredClass = isAcquired ? 'is-acquired' : '';

    // Badges de requisitos
    const reqs = item.requirements || {};
    const reqPills = [];
    if (reqs.str > 0) reqPills.push(`<span class="req-pill active">FOR ${reqs.str}</span>`);
    if (reqs.dex > 0) reqPills.push(`<span class="req-pill active">DES ${reqs.dex}</span>`);
    if (reqs.int > 0) reqPills.push(`<span class="req-pill active">INT ${reqs.int}</span>`);
    if (reqs.fai > 0) reqPills.push(`<span class="req-pill active">FÉ ${reqs.fai}</span>`);
    if (reqs.arc > 0) reqPills.push(`<span class="req-pill active">ARC ${reqs.arc}</span>`);

    return `
      <div class="item-card stagger-item ${rarityClass} ${acquiredClass}" data-item-id="${item.id}">
        <div class="card-top">
          <div class="item-icon-wrapper">${item.icon || '⚔️'}</div>
          <div class="card-info">
            <h3 class="item-title" title="${item.name}">${item.name}</h3>
            <div class="item-meta">
              <span class="region-tag">${item.location}</span>
            </div>
          </div>
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  data-action="wishlist" 
                  data-id="${item.id}"
                  title="${isWishlisted ? 'Remover dos favoritos' : 'Favoritar item'}">
            ${isWishlisted ? '★' : '☆'}
          </button>
        </div>

        <div class="card-body">
          <p>${item.lore || item.guide}</p>
        </div>

        ${reqPills.length > 0 ? `<div class="req-pills">${reqPills.join('')}</div>` : ''}

        <div class="card-footer">
          <button class="grace-check-btn ${isAcquired ? 'checked' : ''}" 
                  data-action="toggle-acquired" 
                  data-id="${item.id}">
            ${isAcquired ? '✓ Obtido' : '○ Obter Item'}
          </button>
          
          <button class="btn btn-ghost" style="padding: 4px 10px; font-size: 0.8rem;" data-action="details" data-id="${item.id}">
            Ver Guia ➔
          </button>
        </div>
      </div>
    `;
  },

  attachEvents(container) {
    container.addEventListener('click', (e) => {
      const toggleAcquiredBtn = e.target.closest('[data-action="toggle-acquired"]');
      if (toggleAcquiredBtn) {
        e.stopPropagation();
        const id = toggleAcquiredBtn.dataset.id;
        const item = Store.getState().items.find(i => i.id === id);
        Store.toggleAcquired(id);
        
        const isNowAcquired = Store.getState().acquiredIds.includes(id);
        Toast.show({
          title: isNowAcquired ? '✨ Item Descoberto!' : 'Item Desmarcado',
          message: isNowAcquired ? `${item?.name || 'Item'} registrado em sua jornada.` : `${item?.name || 'Item'} removido do inventário.`,
          icon: isNowAcquired ? '🌟' : '↩️',
          playSound: isNowAcquired
        });
        return;
      }

      const wishlistBtn = e.target.closest('[data-action="wishlist"]');
      if (wishlistBtn) {
        e.stopPropagation();
        const id = wishlistBtn.dataset.id;
        const item = Store.getState().items.find(i => i.id === id);
        Store.toggleWishlist(id);
        const isWish = Store.getState().wishlistIds.includes(id);
        Toast.show({
          title: isWish ? '⭐ Adicionado aos Favoritos' : 'Removido dos Favoritos',
          message: `${item?.name || 'Item'} atualizado.`,
          icon: isWish ? '⭐' : '☆'
        });
        return;
      }

      const detailsBtn = e.target.closest('[data-action="details"]');
      const card = e.target.closest('.item-card');
      if (detailsBtn || card) {
        const id = detailsBtn ? detailsBtn.dataset.id : card.dataset.itemId;
        const item = Store.getState().items.find(i => i.id === id);
        if (item) {
          Store.setSelectedItem(item);
        }
      }
    });
  }
};
