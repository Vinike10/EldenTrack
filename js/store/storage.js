/* ==========================================================================
   ELDENTRACK - STORAGE & SAVE MANAGER
   LocalStorage, Backup/Export, JSON Import and Profiles
   ========================================================================== */

const STORAGE_KEY = 'eldentrack_save_data_v1';

const DEFAULT_SAVE_STATE = {
  version: 1,
  activeCharacterId: 'char_default',
  characters: [
    {
      id: 'char_default',
      name: 'Maculado das Terras Intermédias',
      build: 'Qualidade / Equilibrado',
      acquired: [],
      wishlist: [],
      createdAt: new Date().toISOString()
    }
  ],
  settings: {
    soundEffects: true,
    compactView: false,
    theme: 'golden_grace'
  }
};

export const StorageManager = {
  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.save(DEFAULT_SAVE_STATE);
        return DEFAULT_SAVE_STATE;
      }
      const parsed = JSON.parse(data);
      if (!parsed.characters || !Array.isArray(parsed.characters)) {
        return DEFAULT_SAVE_STATE;
      }
      return parsed;
    } catch (err) {
      console.error('[EldenTrack Storage] Falha ao carregar save:', err);
      return DEFAULT_SAVE_STATE;
    }
  },

  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (err) {
      console.error('[EldenTrack Storage] Falha ao salvar:', err);
      return false;
    }
  },

  exportSaveFile(data) {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `eldentrack_save_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    } catch (err) {
      console.error('[EldenTrack Storage] Falha na exportação:', err);
      return false;
    }
  },

  async importSaveFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('Nenhum arquivo fornecido.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = JSON.parse(event.target.result);
          if (!content.characters || !Array.isArray(content.characters)) {
            throw new Error('Formato de save inválido.');
          }
          this.save(content);
          resolve(content);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
    });
  },

  resetProgress() {
    this.save(DEFAULT_SAVE_STATE);
    return DEFAULT_SAVE_STATE;
  }
};
