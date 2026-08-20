/* ==========================================================================
   ELDENTRACK - STATS DASHBOARD MODAL
   Visual completion analytics, regional breakdown and category progress
   ========================================================================== */

import { Store } from '../store/state.js';
import { DataService } from '../data/items-index.js';

export const StatsDashboard = {
  render(state) {
    if (!state.statsModalOpen) return '';

    const stats = state.stats;
    const categories = DataService.getCategories().filter(c => c.id !== 'all');
    const regions = DataService.getRegions().filter(r => r.id !== 'all_regions');

    // Categorias Bars
    const categoryBars = categories.map(cat => {
      const cStat = stats.byCategory[cat.id] || { total: 0, acquired: 0, percentage: 0 };
      return `
        <div class="stats-card" style="cursor: pointer;" data-jump-category="${cat.id}">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 500; color: var(--text-primary);">${cat.icon} ${cat.name}</span>
            <span style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--gold-bright);">${cStat.acquired} / ${cStat.total} (${cStat.percentage}%)</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${cStat.percentage}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Regiões Bars
    const regionBars = regions.map(reg => {
      const rStat = stats.byRegion[reg.id] || { total: 0, acquired: 0, percentage: 0 };
      return `
        <div class="stats-card" style="cursor: pointer;" data-jump-region="${reg.id}">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 500; color: var(--text-primary);">${reg.badge || '📍'} ${reg.name}</span>
            <span style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--gold-bright);">${rStat.acquired} / ${rStat.total} (${rStat.percentage}%)</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${rStat.percentage}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="modal-overlay active" id="stats-dashboard-overlay">
        <div class="modal-content" style="max-width: 840px;">
          <button class="modal-close-btn" id="stats-modal-close" title="Fechar">&times;</button>
          
          <div class="modal-header">
            <div class="modal-icon">📊</div>
            <div>
              <h2 class="modal-title">Progresso da Jornada</h2>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Estatísticas das Terras Intermédias e Reino das Sombras</div>
            </div>
          </div>

          <!-- Hero Progress Box -->
          <div style="background: linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(18,21,28,0.9) 100%); border: 1px solid var(--gold-primary); border-radius: var(--radius-xl); padding: 24px; display: flex; align-items: center; justify-content: space-around; margin-bottom: 24px; flex-wrap: wrap; gap: 20px;">
            <div style="text-align: center;">
              <div style="width: 120px; height: 120px; margin: 0 auto; position: relative;">
                <svg viewBox="0 0 36 36" style="width: 100%; height: 100%;">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--gold-bright)" stroke-width="3" stroke-dasharray="${stats.percentage}, 100" stroke-linecap="round" />
                </svg>
                <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <span style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700; color: var(--gold-bright);">${stats.percentage}%</span>
                  <span style="font-size: 0.68rem; text-transform: uppercase; color: var(--text-muted);">Completo</span>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 16px;">
              <div class="stat-pill-box">
                <div class="stat-pill-val" style="color: var(--status-acquired);">${stats.acquired}</div>
                <div class="stat-pill-lbl">Obtidos</div>
              </div>
              <div class="stat-pill-box">
                <div class="stat-pill-val" style="color: var(--status-missing);">${stats.missing}</div>
                <div class="stat-pill-lbl">Faltantes</div>
              </div>
              <div class="stat-pill-box">
                <div class="stat-pill-val">${stats.total}</div>
                <div class="stat-pill-lbl">Total</div>
              </div>
            </div>
          </div>

          <div class="modal-section-title">🗺️ Conclusão por Região</div>
          <div class="dashboard-grid" style="margin-bottom: 24px;">
            ${regionBars}
          </div>

          <div class="modal-section-title">⚔️ Conclusão por Categoria</div>
          <div class="dashboard-grid">
            ${categoryBars}
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(container) {
    container.addEventListener('click', (e) => {
      if (e.target.id === 'stats-modal-close' || e.target.id === 'stats-dashboard-overlay') {
        Store.toggleStatsModal(false);
      }

      const jumpCat = e.target.closest('[data-jump-category]');
      if (jumpCat) {
        const catId = jumpCat.dataset.jumpCategory;
        Store.setCategory(catId);
        Store.toggleStatsModal(false);
      }

      const jumpReg = e.target.closest('[data-jump-region]');
      if (jumpReg) {
        const regId = jumpReg.dataset.jumpRegion;
        Store.setRegion(regId);
        Store.toggleStatsModal(false);
      }
    });
  }
};
