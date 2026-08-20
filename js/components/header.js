/* ==========================================================================
   ELDENTRACK - HEADER COMPONENT
   Brand Logo, Search Bar, Global Progress Widget & Character Selector
   ========================================================================== */

import { Store } from '../store/state.js';
import { Toast } from './toast.js';

export const Header = {
  render(state) {
    const stats = state.stats;
    const curChar = state.activeCharacter;

    return `
      <header class="app-header">
        <!-- Brand / Logo -->
        <div class="brand-container" id="brand-home-btn">
          <svg class="brand-logo-rune animate-glow-breath" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="3" opacity="0.6"/>
            <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="2"/>
            <path d="M50 8 L50 92 M8 50 L92 50 M20 20 L80 80 M80 20 L20 80" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
            <circle cx="50" cy="50" r="10" fill="currentColor"/>
          </svg>
          <div>
            <h1 class="brand-title">ELDENTRACK</h1>
            <div class="brand-subtitle">Rastreador de Segredos & Graça</div>
          </div>
        </div>

        <!-- Center Search Bar -->
        <div class="header-center">
          <div class="search-wrapper">
            <span class="search-icon">🔍</span>
            <input type="text" 
                   class="search-input" 
                   id="search-input" 
                   placeholder="Buscar armas, feitiços, talismãs, locais..." 
                   value="${state.searchQuery || ''}" 
                   autocomplete="off" />
            <span class="search-shortcut">Ctrl+K</span>
          </div>
        </div>

        <!-- Actions & Progress -->
        <div class="header-actions">
          <!-- Overall Progress Mini -->
          <div class="header-progress-box" id="open-stats-btn" style="cursor: pointer;" title="Abrir Dashboard de Estatísticas">
            <div class="progress-circular-mini">
              <svg viewBox="0 0 36 36" style="width: 100%; height: 100%;">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3.5" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--gold-primary)" stroke-width="3.5" stroke-dasharray="${stats.percentage}, 100" stroke-linecap="round" />
              </svg>
            </div>
            <span class="progress-text-mini">${stats.percentage}%</span>
          </div>

          <!-- Character / Save Dropdown -->
          <button class="btn btn-secondary" id="save-menu-btn" title="Gerenciador de Save e Personagens">
            🛡️ ${curChar?.name || 'Maculado'}
          </button>
        </div>
      </header>
    `;
  },

  attachEvents(headerEl) {
    // Search input com debounce
    let searchTimeout = null;
    headerEl.addEventListener('input', (e) => {
      if (e.target.id === 'search-input') {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          Store.setSearchQuery(e.target.value);
        }, 150);
      }
    });

    // Abrir modal de estatísticas
    headerEl.addEventListener('click', (e) => {
      if (e.target.closest('#open-stats-btn')) {
        Store.toggleStatsModal(true);
      }

      if (e.target.closest('#save-menu-btn')) {
        this._showSaveModal();
      }

      if (e.target.closest('#brand-home-btn')) {
        Store.setCategory('all');
        Store.setRegion('all_regions');
        Store.setStatusFilter('all');
        Store.setSearchQuery('');
        const sInput = document.getElementById('search-input');
        if (sInput) sInput.value = '';
      }
    });

    // Atalho global Ctrl+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    });
  },

  _showSaveModal() {
    const state = Store.getState();
    const modalHtml = `
      <div class="modal-overlay active" id="save-manager-overlay">
        <div class="modal-content" style="max-width: 520px;">
          <button class="modal-close-btn" id="save-modal-close">&times;</button>
          
          <div class="modal-header">
            <div class="modal-icon">📜</div>
            <div>
              <h2 class="modal-title">Gestão de Save & Maculado</h2>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Backup de progresso e builds</div>
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <div class="modal-section-title">Personagem Ativo</div>
            <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: var(--radius-md); border: 1px solid rgba(212,175,55,0.15); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="color: var(--gold-bright); font-size: 1.05rem;">${state.activeCharacter.name}</strong>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${state.activeCharacter.build}</div>
              </div>
              <span class="category-chip" style="font-size: 0.78rem;">${state.stats.acquired} itens coletados</span>
            </div>
          </div>

          <div class="modal-section-title">Backup & Sincronização</div>
          <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button class="btn btn-gold" id="export-save-btn" style="flex: 1;">
              💾 Exportar Save (JSON)
            </button>
            <label class="btn btn-secondary" style="flex: 1; cursor: pointer; text-align: center;">
              📥 Importar Save
              <input type="file" id="import-save-input" accept=".json" style="display: none;" />
            </label>
          </div>

          <div class="modal-section-title" style="color: var(--status-missing);">Zona de Risco</div>
          <button class="btn btn-secondary" id="reset-progress-btn" style="width: 100%; border-color: rgba(239, 68, 68, 0.4); color: var(--status-missing);">
            ⚠️ Redefinir Todo o Progresso
          </button>
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.id = 'save-modal-wrapper';
    wrapper.innerHTML = modalHtml;
    document.body.appendChild(wrapper);

    // Eventos do modal de save
    wrapper.addEventListener('click', (e) => {
      if (e.target.id === 'save-modal-close' || e.target.id === 'save-manager-overlay') {
        wrapper.remove();
      }

      if (e.target.id === 'export-save-btn') {
        Store.exportSave();
        Toast.show({
          title: '💾 Save Exportado',
          message: 'Arquivo de backup gerado com sucesso.',
          icon: '✨'
        });
      }

      if (e.target.id === 'reset-progress-btn') {
        if (confirm('Tem certeza de que deseja resetar todo o progresso do rastreador? Esta ação não pode ser desfeita.')) {
          Store.resetAllProgress();
          wrapper.remove();
          Toast.show({
            title: 'Progresso Redefinido',
            message: 'Todas as graças e itens foram reiniciados.',
            icon: '↩️'
          });
        }
      }
    });

    wrapper.addEventListener('change', async (e) => {
      if (e.target.id === 'import-save-input') {
        const file = e.target.files[0];
        if (file) {
          try {
            await Store.importSave(file);
            wrapper.remove();
            Toast.show({
              title: '✨ Save Importado!',
              message: 'Seu progresso foi restaurado com sucesso.',
              playSound: true
            });
          } catch (err) {
            alert('Falha ao importar o arquivo. Verifique se é um arquivo JSON válido do EldenTrack.');
          }
        }
      }
    });
  }
};
