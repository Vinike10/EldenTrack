/* ==========================================================================
   ELDENTRACK - HEADER COMPONENT (v4.1)
   Brand, Search, View Mode Switcher, Theme Switcher & Character Profile
   ========================================================================== */

import { Store } from '../store/state.js';
import { Toast } from './toast.js';

export const Header = {
  render(state) {
    const stats = state.stats;
    const curChar = state.activeCharacter;
    const curTheme = state.theme || 'erdtree';
    const curView = state.viewMode || 'route';

    // Rótulos de tema
    const themeLabel = curTheme === 'moonlight' ? '🌙 Luar de Caria' :
                       curTheme === 'shadow' ? '🔥 Chama das Sombras' :
                       '🌟 Graça Dourada';

    return `
      <header class="app-header">
        <!-- Brand / Logo -->
        <div class="brand-container" id="brand-home-btn" title="Voltar ao início">
          <svg class="brand-logo-rune animate-glow-breath" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="3" opacity="0.6"/>
            <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="2"/>
            <path d="M50 8 L50 92 M8 50 L92 50 M20 20 L80 80 M80 20 L20 80" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
            <circle cx="50" cy="50" r="10" fill="currentColor"/>
          </svg>
          <div>
            <h1 class="brand-title">ELDENTRACK</h1>
            <div class="brand-subtitle">Site para meus amigos do Elden ring</div>
          </div>
        </div>

        <!-- Center Search Bar -->
        <div class="header-center">
          <div class="search-wrapper">
            <span class="search-icon">🔍</span>
            <input type="text" 
                   class="search-input" 
                   id="search-input" 
                   placeholder="Buscar armas, magias, talismãs, locais, graças..." 
                   value="${state.searchQuery || ''}" 
                   autocomplete="off" />
            <span class="search-shortcut">Ctrl+K</span>
          </div>
        </div>

        <!-- Actions: Theme, View Modes, Progress & Profile -->
        <div class="header-actions">
          <!-- View Modes Switcher -->
          <div class="view-modes-bar" role="tablist" aria-label="Modo de Visualização">
            <button class="view-mode-pill ${curView === 'route' ? 'active' : ''}" data-view="route" title="Modo Rota de Campanha (Por Região)">
              🗺️ Rota
            </button>
            <button class="view-mode-pill ${curView === 'grid' ? 'active' : ''}" data-view="grid" title="Modo Grid de Cards">
              🔲 Cards
            </button>
            <button class="view-mode-pill ${curView === 'categories' ? 'active' : ''}" data-view="categories" title="Modo por Categorias">
              📑 Categorias
            </button>
            <button class="view-mode-pill ${curView === 'checklist' ? 'active' : ''}" data-view="checklist" title="Modo Checklist Rápido">
              📋 Lista
            </button>
          </div>

          <!-- Theme Switcher Button -->
          <button class="theme-selector-btn" id="theme-toggle-btn" title="Alternar Tema Visual (Graça, Luar, Sombras)">
            ${themeLabel}
          </button>

          <!-- Overall Progress Mini -->
          <div class="header-progress-box" id="open-stats-btn" style="cursor: pointer;" title="Abrir Estatísticas Detalhadas">
            <div class="progress-circular-mini">
              <svg viewBox="0 0 36 36" style="width: 100%; height: 100%;">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3.5" />
                <path id="header-progress-bar-path" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--gold-primary)" stroke-width="3.5" stroke-dasharray="${stats.percentage}, 100" stroke-linecap="round" />
              </svg>
            </div>
            <span class="progress-text-mini" id="header-progress-text">${stats.percentage}%</span>
          </div>

          <!-- Character Save Menu -->
          <button class="btn btn-secondary" id="save-menu-btn" style="padding: 6px 12px; font-size: 0.82rem;" title="Gerenciar Save & Maculado">
            🛡️ ${curChar?.name ? curChar.name.split(' ')[0] : 'Maculado'}
          </button>
        </div>
      </header>
    `;
  },

  update(headerEl, state, eventName) {
    if (!headerEl || !headerEl.querySelector('.app-header')) {
      headerEl.innerHTML = this.render(state);
      this.attachEvents(headerEl);
      return;
    }

    // Atualiza apenas os elementos sem destruir o input de busca
    const stats = state.stats;
    const curTheme = state.theme || 'erdtree';
    const curView = state.viewMode || 'route';

    // 1. Atualiza pílulas de modo de exibição
    const pills = headerEl.querySelectorAll('.view-mode-pill');
    pills.forEach(pill => {
      if (pill.dataset.view === curView) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // 2. Atualiza botão de tema
    const themeBtn = headerEl.querySelector('#theme-toggle-btn');
    if (themeBtn) {
      themeBtn.textContent = curTheme === 'moonlight' ? '🌙 Luar de Caria' :
                             curTheme === 'shadow' ? '🔥 Chama das Sombras' :
                             '🌟 Graça Dourada';
    }

    // 3. Atualiza progresso
    const progressPath = headerEl.querySelector('#header-progress-bar-path');
    if (progressPath) {
      progressPath.setAttribute('stroke-dasharray', `${stats.percentage}, 100`);
    }
    const progressText = headerEl.querySelector('#header-progress-text');
    if (progressText) {
      progressText.textContent = `${stats.percentage}%`;
    }

    // 4. Sincroniza valor da busca se disparado externamente (ex: botão limpar)
    const searchInput = headerEl.querySelector('#search-input');
    if (searchInput && eventName !== 'search_changed') {
      if (searchInput.value !== (state.searchQuery || '')) {
        searchInput.value = state.searchQuery || '';
      }
    }
  },

  attachEvents(headerEl) {
    // Search input com debounce otimizado (sem recriar o elemento)
    let searchTimeout = null;
    headerEl.addEventListener('input', (e) => {
      if (e.target.id === 'search-input') {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          Store.setSearchQuery(e.target.value);
        }, 50);
      }
    });

    headerEl.addEventListener('click', (e) => {
      // Alternar Modo de Visualização
      const viewBtn = e.target.closest('[data-view]');
      if (viewBtn) {
        const mode = viewBtn.dataset.view;
        Store.setViewMode(mode);
        return;
      }

      // Alternar Tema Visual (Ciclo: erdtree -> moonlight -> shadow -> erdtree)
      if (e.target.closest('#theme-toggle-btn')) {
        const curTheme = Store.getState().theme || 'erdtree';
        const nextTheme = curTheme === 'erdtree' ? 'moonlight' :
                          curTheme === 'moonlight' ? 'shadow' : 'erdtree';
        Store.setTheme(nextTheme);
        Toast.show({
          title: 'Estética Alterada',
          message: nextTheme === 'moonlight' ? 'Tema Luar de Caria ativado.' :
                   nextTheme === 'shadow' ? 'Tema Chama das Sombras ativado.' :
                   'Tema Graça da Térvore ativado.',
          icon: nextTheme === 'moonlight' ? '🌙' : nextTheme === 'shadow' ? '🔥' : '🌟'
        });
        return;
      }

      // Abrir estatísticas
      if (e.target.closest('#open-stats-btn')) {
        Store.toggleStatsModal(true);
        return;
      }

      // Gerenciar save
      if (e.target.closest('#save-menu-btn')) {
        this._showSaveModal();
        return;
      }

      // Resetar filtros no logo
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
        <div class="modal-content" style="max-width: 500px;">
          <button class="modal-close-btn" id="save-modal-close">&times;</button>
          
          <div class="modal-header">
            <div class="modal-icon">📜</div>
            <div>
              <h2 class="modal-title">Gestão de Save & Maculado</h2>
              <div style="font-size: 0.82rem; color: var(--text-muted);">Backup seguro do seu progresso</div>
            </div>
          </div>

          <div style="margin-bottom: 18px;">
            <div class="modal-section-title" style="font-size: 0.95rem;">Personagem Ativo</div>
            <div style="background: rgba(0,0,0,0.35); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--glass-border); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="color: var(--gold-light); font-size: 1rem;">${state.activeCharacter.name}</strong>
                <div style="font-size: 0.78rem; color: var(--text-muted);">${state.activeCharacter.build}</div>
              </div>
              <span class="category-chip" style="font-size: 0.75rem;">${state.stats.acquired} coletados</span>
            </div>
          </div>

          <div class="modal-section-title" style="font-size: 0.95rem;">Backup & Sincronização</div>
          <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button class="btn btn-gold" id="export-save-btn" style="flex: 1;">
              💾 Exportar Save (JSON)
            </button>
            <label class="btn btn-secondary" style="flex: 1; cursor: pointer; text-align: center;">
              📥 Importar Save
              <input type="file" id="import-save-input" accept=".json" style="display: none;" />
            </label>
          </div>

          <div class="modal-section-title" style="font-size: 0.95rem; color: var(--status-missing);">Zona de Risco</div>
          <button class="btn btn-secondary" id="reset-progress-btn" style="width: 100%; border-color: rgba(244, 63, 94, 0.4); color: var(--status-missing);">
            ⚠️ Redefinir Todo o Progresso
          </button>
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.id = 'save-modal-wrapper';
    wrapper.innerHTML = modalHtml;
    document.body.appendChild(wrapper);

    wrapper.addEventListener('click', (e) => {
      if (e.target.id === 'save-modal-close' || e.target.id === 'save-manager-overlay') {
        wrapper.remove();
      }

      if (e.target.id === 'export-save-btn') {
        Store.exportSave();
        Toast.show({
          title: '💾 Save Exportado',
          message: 'Arquivo JSON gerado com sucesso.',
          icon: '✨'
        });
      }

      if (e.target.id === 'reset-progress-btn') {
        if (confirm('Tem certeza de que deseja resetar todo o progresso do rastreador?')) {
          Store.resetAllProgress();
          wrapper.remove();
          Toast.show({
            title: 'Progresso Redefinido',
            message: 'Todas as graças foram reiniciadas.',
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
