/* ==========================================================================
   ELDENTRACK - TOAST NOTIFICATIONS & GRACE CHIME
   ========================================================================== */

export const Toast = {
  _container: null,

  _getContainer() {
    if (!this._container) {
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }
      this._container = container;
    }
    return this._container;
  },

  // Efeito sonoro místico gerado via Web Audio API (suave toque de sino de Graça)
  playGraceSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 (Golden tone)
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.45); // D6

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      // Áudio silenciado pelo navegador se não houver interação prévia
    }
  },

  show({ title, message, icon = '✨', duration = 3200, playSound = false }) {
    const container = this._getContainer();
    const toast = document.createElement('div');
    toast.className = 'toast';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    if (playSound) {
      this.playGraceSound();
    }

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }
};
