/* ==========================================================================
   ELDENTRACK - ITEM CARD & CHECKLIST ROW (v4.1)
   Minimalist Scannable Card & Fast Gameplay Checklist Row
   ========================================================================== */

import { Store } from '../store/state.js';
import { Toast } from './toast.js';

export const ItemCard = {
  /**
   * Renderiza o Card Minimalista Escaneável (Modo Grid ou Seção)
   */
  render(item, isAcquired, isWishlisted) {
    const rarityClass = `rarity-${item.rarity || 'common'}`;
    const acquiredClass = isAcquired ? 'is-acquired' : '';
    const ytSearchTerm = item.youtubeQuery || `elden ring como pegar ${item.nameEn || item.name} localizacao`;
    const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(ytSearchTerm)}`;

    return `
      <div class="item-card stagger-item ${rarityClass} ${acquiredClass}" data-item-id="${item.id}">
        <div class="card-top">
          <div class="item-icon-wrapper">${item.icon || '⚔️'}</div>
          
          <div class="card-info">
            <h3 class="item-title" title="${item.name}">${item.name}</h3>
            
            <div class="item-meta-badges">
              <span class="badge-tag">${item.subtype || item.category}</span>
              ${item.isMissable ? `<span class="badge-tag missable">⚠️ Perdível</span>` : ''}
              ${item.secretType ? `<span class="badge-tag">${item.secretType}</span>` : ''}
            </div>
          </div>

          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  data-action="wishlist" 
                  data-id="${item.id}"
                  title="${isWishlisted ? 'Remover dos favoritos' : 'Favoritar item'}">
            ${isWishlisted ? '★' : '☆'}
          </button>
        </div>

        <div class="card-location-snippet" title="${item.nearestGrace || item.location}">
          <span>📍</span>
          <span>${item.nearestGrace || item.location}</span>
        </div>

        <div class="card-footer">
          <button class="grace-check-btn ${isAcquired ? 'checked' : ''}" 
                  data-action="toggle-acquired" 
                  data-id="${item.id}">
            ${isAcquired ? '✓ Obtido' : '○ Obter Item'}
          </button>
          
          <div style="display: flex; align-items: center; gap: 6px;">
            <a href="${ytUrl}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="youtube-badge-btn" 
               title="Ver tutorial em vídeo no YouTube"
               onclick="event.stopPropagation();">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <span>Vídeo</span>
            </a>

            <button class="btn btn-ghost" style="padding: 4px 8px; font-size: 0.78rem;" data-action="details" data-id="${item.id}">
              Guia ➔
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza a Linha Compacta do Modo Checklist Rápido
   */
  renderChecklistRow(item, isAcquired, isWishlisted) {
    const ytSearchTerm = item.youtubeQuery || `elden ring como pegar ${item.nameEn || item.name} localizacao`;
    const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(ytSearchTerm)}`;

    return `
      <div class="checklist-row ${isAcquired ? 'is-acquired' : ''}" data-item-id="${item.id}">
        <div class="checklist-left">
          <div class="checklist-icon">${item.icon || '⚔️'}</div>
          <div style="min-width: 0;">
            <div class="checklist-name">${item.name}</div>
            <div class="checklist-details">📍 ${item.nearestGrace || item.location} &bull; ${item.subtype || item.category}</div>
          </div>
        </div>

        <div class="checklist-actions">
          ${item.isMissable ? `<span class="badge-tag missable">⚠️ Perdível</span>` : ''}
          
          <a href="${ytUrl}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="youtube-badge-btn" 
             title="Ver tutorial em vídeo no YouTube"
             onclick="event.stopPropagation();">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            <span>Vídeo</span>
          </a>

          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  data-action="wishlist" 
                  data-id="${item.id}" 
                  style="font-size: 1.1rem;">
            ${isWishlisted ? '★' : '☆'}
          </button>

          <button class="grace-check-btn ${isAcquired ? 'checked' : ''}" 
                  data-action="toggle-acquired" 
                  data-id="${item.id}">
            ${isAcquired ? '✓' : '○'}
          </button>

          <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" data-action="details" data-id="${item.id}">
            Guia
          </button>
        </div>
      </div>
    `;
  },

  attachEvents(container) {
    container.addEventListener('click', (e) => {
      // Toggle de Obtenção
      const toggleAcquiredBtn = e.target.closest('[data-action="toggle-acquired"]');
      if (toggleAcquiredBtn) {
        e.stopPropagation();
        const id = toggleAcquiredBtn.dataset.id;
        const item = Store.getState().items.find(i => i.id === id) || Store.getState().roadmap.flatMap(r => r.items).find(i => i.id === id);
        Store.toggleAcquired(id);
        
        const isNowAcquired = Store.getState().acquiredIds.includes(id);
        Toast.show({
          title: isNowAcquired ? '✨ Graça Descoberta!' : 'Item Desmarcado',
          message: isNowAcquired ? `${item?.name || 'Item'} registrado em sua jornada.` : `${item?.name || 'Item'} removido do inventário.`,
          icon: isNowAcquired ? '🌟' : '↩️',
          playSound: isNowAcquired
        });
        return;
      }

      // Toggle de Favorito
      const wishlistBtn = e.target.closest('[data-action="wishlist"]');
      if (wishlistBtn) {
        e.stopPropagation();
        const id = wishlistBtn.dataset.id;
        const item = Store.getState().items.find(i => i.id === id) || Store.getState().roadmap.flatMap(r => r.items).find(i => i.id === id);
        Store.toggleWishlist(id);
        const isWish = Store.getState().wishlistIds.includes(id);
        Toast.show({
          title: isWish ? '⭐ Adicionado aos Favoritos' : 'Removido dos Favoritos',
          message: `${item?.name || 'Item'} atualizado.`,
          icon: isWish ? '⭐' : '☆'
        });
        return;
      }

      // Abertura do Compêndio / Detalhes
      const detailsBtn = e.target.closest('[data-action="details"]');
      const card = e.target.closest('.item-card') || e.target.closest('.checklist-row');
      if (detailsBtn || card) {
        const id = detailsBtn ? detailsBtn.dataset.id : card.dataset.itemId;
        const state = Store.getState();
        const item = state.items.find(i => i.id === id) || state.roadmap.flatMap(r => r.items).find(i => i.id === id);
        if (item) {
          Store.setSelectedItem(item);
        }
      }
    });
  }
};
