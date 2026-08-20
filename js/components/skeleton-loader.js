/* ==========================================================================
   ELDENTRACK - SKELETON LOADER COMPONENT
   Golden-Ash Shimmer Skeletons for Cards, Lists and Modals
   ========================================================================== */

export const SkeletonLoader = {
  renderCardSkeletons(count = 6) {
    return Array.from({ length: count }, () => `
      <div class="skeleton-card">
        <div class="skeleton-card-header">
          <div class="skeleton skeleton-card-icon"></div>
          <div class="skeleton-card-body">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text short"></div>
          </div>
        </div>
        <div class="skeleton skeleton-text medium"></div>
        <div class="skeleton skeleton-text" style="width: 85%;"></div>
        <div class="skeleton-card-footer">
          <div class="skeleton skeleton-badge" style="width: 80px;"></div>
          <div class="skeleton skeleton-badge" style="width: 32px;"></div>
        </div>
      </div>
    `).join('');
  },

  renderModalSkeleton() {
    return `
      <div class="skeleton-modal-preview" style="padding: 10px;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
          <div class="skeleton skeleton-card-icon" style="width: 64px; height: 64px;"></div>
          <div style="flex: 1;">
            <div class="skeleton skeleton-title" style="width: 70%; height: 28px;"></div>
            <div class="skeleton skeleton-text short"></div>
          </div>
        </div>
        <div class="skeleton skeleton-text" style="height: 60px; margin-bottom: 20px;"></div>
        <div class="skeleton skeleton-title" style="width: 40%; height: 20px;"></div>
        <div class="skeleton skeleton-text" style="height: 48px; margin-bottom: 12px;"></div>
        <div class="skeleton skeleton-text" style="height: 48px;"></div>
      </div>
    `;
  },

  renderStatsSkeletons() {
    return `
      <div class="dashboard-grid">
        ${Array.from({ length: 4 }, () => `
          <div class="stats-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div class="skeleton skeleton-title" style="width: 50%; height: 18px;"></div>
              <div class="skeleton skeleton-badge" style="width: 40px;"></div>
            </div>
            <div class="skeleton skeleton-text" style="height: 8px; border-radius: 999px;"></div>
            <div class="skeleton skeleton-text short" style="height: 12px;"></div>
          </div>
        `).join('')}
      </div>
    `;
  }
};
