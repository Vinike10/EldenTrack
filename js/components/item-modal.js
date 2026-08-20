/* ==========================================================================
   ELDENTRACK - COMPENDIUM SIDE DRAWER & DETAIL MODAL (v4.1)
   Multi-Tab Deep Dive: Step-by-Step Route, Combat Stats, Lore, Missables
   & YouTube Video Guide Integration
   ========================================================================== */

import { Store } from '../store/state.js';
import { Toast } from './toast.js';

export const ItemModal = {
  render(item, isAcquired, isWishlisted) {
    if (!item) return '';

    const activeTab = Store.getState().activeDrawerTab || 'walkthrough';
    const reqs = item.requirements || {};
    const combat = item.combatStats || {};

    // Geração do link de busca oficial no YouTube
    const ytSearchTerm = item.youtubeQuery || `elden ring como pegar ${item.nameEn || item.name} localizacao`;
    const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(ytSearchTerm)}`;

    // Passos numerados de como conseguir
    const stepsHtml = (item.walkthroughSteps && item.walkthroughSteps.length > 0)
      ? item.walkthroughSteps.map((step, idx) => `
          <div class="walkthrough-step-card">
            <div class="step-number">${idx + 1}</div>
            <div class="step-text">${step}</div>
          </div>
        `).join('')
      : `
          <div class="walkthrough-step-card">
            <div class="step-number">1</div>
            <div class="step-text">${item.guide || 'Explore a área indicada para coletar este segredo.'}</div>
          </div>
        `;

    return `
      <div class="drawer-overlay active" id="item-drawer-overlay">
        <aside class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-item-title">
          
          <!-- Header -->
          <div class="drawer-header">
            <div class="drawer-icon-box">${item.icon || '⚔️'}</div>
            
            <div style="flex: 1; min-width: 0; padding-right: 32px;">
              <h2 class="drawer-title" id="drawer-item-title">${item.name}</h2>
              <div style="display: flex; gap: 6px; align-items: center; margin-top: 6px; flex-wrap: wrap;">
                <span class="badge-tag">${item.subtype || item.category}</span>
                ${item.isMissable ? `<span class="badge-tag missable">⚠️ Perdível</span>` : ''}
                <span style="font-size: 0.78rem; color: var(--gold-muted);">📍 ${item.nearestGrace || item.location}</span>
              </div>
            </div>

            <button class="drawer-close-btn" id="drawer-close-btn" title="Fechar (Esc)">&times;</button>
          </div>

          <!-- Navigation Tabs -->
          <nav class="drawer-tabs-nav">
            <button class="drawer-tab-btn ${activeTab === 'walkthrough' ? 'active' : ''}" data-tab="walkthrough">
              🧭 Como Obter (Rota)
            </button>
            <button class="drawer-tab-btn ${activeTab === 'combat' ? 'active' : ''}" data-tab="combat">
              ⚔️ Combate & Atributos
            </button>
            <button class="drawer-tab-btn ${activeTab === 'lore' ? 'active' : ''}" data-tab="lore">
              📜 Lore & História
            </button>
            ${item.isMissable || item.missableWarning ? `
              <button class="drawer-tab-btn ${activeTab === 'warnings' ? 'active' : ''}" data-tab="warnings" style="color: var(--status-missable);">
                ⚠️ Alertas de Quest
              </button>
            ` : ''}
          </nav>

          <!-- Body / Tab Content -->
          <div class="drawer-body">
            
            <!-- TAB 1: ROTA PASSO A PASSO -->
            <div class="tab-pane ${activeTab === 'walkthrough' ? 'active' : ''}" id="tab-walkthrough">
              
              <!-- Card de Ponto de Graça -->
              <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 12px 16px;">
                <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--gold-muted); letter-spacing: 1px;">Ponto de Graça Mais Próximo</div>
                <div style="font-size: 1rem; color: var(--gold-light); font-weight: 600; margin-top: 2px;">📍 ${item.nearestGrace || item.location}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Local Exato: ${item.mapCoords || item.location}</div>
              </div>

              <!-- YouTube Video Guide Action Card -->
              <a href="${ytUrl}" target="_blank" rel="noopener noreferrer" class="youtube-guide-card" title="Abrir vídeo tutorial no YouTube">
                <div class="youtube-play-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div class="youtube-guide-content">
                  <div class="youtube-guide-title">
                    <span>Assistir Guia em Vídeo (YouTube)</span>
                    <span style="font-size: 0.8rem;">↗</span>
                  </div>
                  <div class="youtube-guide-desc">
                    Veja a rota exata de "${item.name}" em vídeo passo a passo
                  </div>
                </div>
              </a>

              ${item.missableWarning ? `
                <div class="warning-callout">
                  <span style="font-size: 1.2rem;">⚠️</span>
                  <div>
                    <strong>Aviso Crítico de Perda:</strong>
                    <div style="font-size: 0.82rem; margin-top: 2px;">${item.missableWarning}</div>
                  </div>
                </div>
              ` : ''}

              <div style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--gold-light); margin-top: 4px;">
                Passo a Passo de Chegada:
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${stepsHtml}
              </div>
            </div>

            <!-- TAB 2: COMBATE & REQUISITOS -->
            <div class="tab-pane ${activeTab === 'combat' ? 'active' : ''}" id="tab-combat">
              <div style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--gold-light);">
                Requisitos Mínimos de Atributos:
              </div>

              <div class="stat-grid-box">
                <div class="stat-cell">
                  <div class="stat-cell-lbl">Força</div>
                  <div class="stat-cell-val" style="color: ${reqs.str > 0 ? 'var(--gold-light)' : 'var(--text-muted)'};">${reqs.str || '-'}</div>
                </div>
                <div class="stat-cell">
                  <div class="stat-cell-lbl">Destreza</div>
                  <div class="stat-cell-val" style="color: ${reqs.dex > 0 ? 'var(--gold-light)' : 'var(--text-muted)'};">${reqs.dex || '-'}</div>
                </div>
                <div class="stat-cell">
                  <div class="stat-cell-lbl">Inteligência</div>
                  <div class="stat-cell-val" style="color: ${reqs.int > 0 ? 'var(--gold-light)' : 'var(--text-muted)'};">${reqs.int || '-'}</div>
                </div>
                <div class="stat-cell">
                  <div class="stat-cell-lbl">Fé</div>
                  <div class="stat-cell-val" style="color: ${reqs.fai > 0 ? 'var(--gold-light)' : 'var(--text-muted)'};">${reqs.fai || '-'}</div>
                </div>
                <div class="stat-cell">
                  <div class="stat-cell-lbl">Arcano</div>
                  <div class="stat-cell-val" style="color: ${reqs.arc > 0 ? 'var(--gold-light)' : 'var(--text-muted)'};">${reqs.arc || '-'}</div>
                </div>
              </div>

              <div style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--gold-light); margin-top: 8px;">
                Propriedades de Batalha:
              </div>

              <div style="background: var(--bg-surface); border: 1px solid var(--glass-border-subtle); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; gap: 10px;">
                <div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Tipo de Dano / Categoria</div>
                  <div style="font-size: 0.9rem; color: var(--text-primary); font-weight: 500;">${combat.damageType || 'Padrão / Físico'}</div>
                </div>
                <div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Escalonamento Principal</div>
                  <div style="font-size: 0.9rem; color: var(--gold-light); font-weight: 600;">${combat.scaling || 'N/A'}</div>
                </div>
                <div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Habilidade Exclusiva / Cinza de Guerra</div>
                  <div style="font-size: 0.9rem; color: var(--text-primary); font-weight: 500;">
                    ${combat.skill || 'Ataque Padrão'}
                    ${combat.fpCost ? `<span style="color: var(--accent-magic); font-size: 0.8rem; margin-left: 6px;">(${combat.fpCost})</span>` : ''}
                  </div>
                </div>
                ${combat.passive ? `
                  <div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Efeito Passivo / Acúmulo</div>
                    <div style="font-size: 0.88rem; color: var(--status-acquired); font-weight: 500;">${combat.passive}</div>
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- TAB 3: LORE -->
            <div class="tab-pane ${activeTab === 'lore' ? 'active' : ''}" id="tab-lore">
              <div style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--gold-light);">
                Descrição Oficial do Item:
              </div>

              <div class="lore-quote">
                "${item.lore || 'Sem registros adicionais nos arquivos sagrados de Leyndell.'}"
              </div>

              <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 12px 16px; border: 1px solid rgba(255,255,255,0.05); font-size: 0.82rem; color: var(--text-muted);">
                <strong>Tipo de Segredo:</strong> ${item.secretType || 'Exploração'}<br>
                <strong>Região:</strong> ${item.region}
              </div>
            </div>

            <!-- TAB 4: ALERTAS & DICAS -->
            ${item.isMissable || item.missableWarning ? `
              <div class="tab-pane ${activeTab === 'warnings' ? 'active' : ''}" id="tab-warnings">
                <div class="warning-callout">
                  <span style="font-size: 1.5rem;">⚠️</span>
                  <div>
                    <strong style="font-size: 0.95rem;">Atenção com a Linha do Tempo da Campanha:</strong>
                    <p style="margin-top: 6px; font-size: 0.88rem; line-height: 1.5;">
                      ${item.missableWarning || 'Este item pode se tornar inacessível se certas áreas do jogo forem concluídas antes da sua coleta.'}
                    </p>
                  </div>
                </div>

                <div style="background: var(--bg-surface); border: 1px solid var(--glass-border-subtle); border-radius: var(--radius-md); padding: 14px; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                  💡 <strong>Recomendação do Rastreador:</strong> Colete este item assim que alcançar a região de ${item.region}, antes de derrotar chefes de gatilho de mundo (como Maliketh ou Rykard).
                </div>
              </div>
            ` : ''}

          </div>

          <!-- Footer Actions -->
          <div class="drawer-footer">
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" id="drawer-wishlist-toggle" style="font-size: 1.3rem; padding: 6px 12px; display: flex; align-items: center; gap: 6px;">
              <span>${isWishlisted ? '★' : '☆'}</span>
              <span style="font-size: 0.82rem; font-family: var(--font-sans);">${isWishlisted ? 'Favorito' : 'Favoritar'}</span>
            </button>

            <button class="btn ${isAcquired ? 'btn-secondary' : 'btn-gold'}" id="drawer-acquired-toggle">
              ${isAcquired ? '✓ Marcado como Obtido' : '✨ Marcar como Obtido'}
            </button>
          </div>

        </aside>
      </div>
    `;
  },

  attachEvents(container) {
    container.addEventListener('click', (e) => {
      // Fechar Gaveta
      if (e.target.id === 'drawer-close-btn' || e.target.id === 'item-drawer-overlay') {
        Store.setSelectedItem(null);
        return;
      }

      // Alternar Abas
      const tabBtn = e.target.closest('[data-tab]');
      if (tabBtn) {
        const tab = tabBtn.dataset.tab;
        Store.setDrawerTab(tab);
        return;
      }

      // Marcar como Obtido no Drawer
      if (e.target.closest('#drawer-acquired-toggle')) {
        const item = Store.getState().selectedItem;
        if (item) {
          Store.toggleAcquired(item.id);
          const isAcquired = Store.getState().acquiredIds.includes(item.id);
          Toast.show({
            title: isAcquired ? '✨ Graça Descoberta!' : 'Item Desmarcado',
            message: `${item.name} atualizado.`,
            icon: isAcquired ? '🌟' : '↩️',
            playSound: isAcquired
          });
        }
        return;
      }

      // Favoritar no Drawer
      if (e.target.closest('#drawer-wishlist-toggle')) {
        const item = Store.getState().selectedItem;
        if (item) {
          Store.toggleWishlist(item.id);
          const isWish = Store.getState().wishlistIds.includes(item.id);
          Toast.show({
            title: isWish ? '⭐ Adicionado aos Favoritos' : 'Removido dos Favoritos',
            message: `${item.name} atualizado.`,
            icon: isWish ? '⭐' : '☆'
          });
        }
        return;
      }
    });

    // Fechar com ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && Store.getState().selectedItem) {
        Store.setSelectedItem(null);
      }
    });
  }
};
