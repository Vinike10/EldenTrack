# EldenTrack - Project Issues & Milestones

Este documento cataloga todas as Issues e entregas do projeto **EldenTrack**, estabelecendo critérios de aceitação, dependências e status de cada etapa.

---

## 📋 Milestones & Issues

### [Issue #01] - Design System, Motion Tokens & Layout Base
- **Status**: 🟢 Completed
- **Branch/PR**: `pr-01-design-system-and-tokens`
- **Descrição**: Estabelecer os tokens de design temáticos de Elden Ring (*Golden Grace & Obsidian Velvet*), tipografia com Google Fonts (*Cinzel* e *Outfit*), sistema de física e curvas de animação (`cubic-bezier`), regras de skeleton shimmer e componentes CSS modulares.
- **Critérios de Aceitação**:
  - [x] Definição de paleta dourada, escura e acentos de raridade em CSS variables.
  - [x] Criação de keyframes para stagger animations, glow effects, grace pulse e shimmer.
  - [x] Classes utilitárias para glassmorphism e micro-interações.

---

### [Issue #02] - Base de Dados de Itens, Regiões e Segredos
- **Status**: 🟢 Completed
- **Branch/PR**: `pr-02-database-and-items-catalog`
- **Descrição**: Construir a base de dados relacional de itens de Elden Ring (Jogo Base + Expansão Shadow of the Erdtree), contendo armas, armaduras, talismãs lendários, magias, cinzas da guerra, itens chave, fragmentos de scadutree e chefes, com guias detalhados de localização.
- **Critérios de Aceitação**:
  - [x] Definição das categorias e subcategorias com ícones temáticos.
  - [x] Estrutura das regiões das Terras Intermédias e Reino das Sombras.
  - [x] Catálogo completo e enriquecido com requisitos de atributos, lore, raridade e coordenadas/guias de obtenção.

---

### [Issue #03] - Motor de Estado Reativo e Persistência de Save
- **Status**: 🟢 Completed
- **Branch/PR**: `pr-03-state-store-and-save-manager`
- **Descrição**: Criar a camada de gerenciamento de estado com padrão Pub/Sub e persistência no `localStorage`, incluindo suporte para múltiplos perfis/builds de personagens e exportação/importação de save em formato JSON.
- **Critérios de Aceitação**:
  - [x] Store reativo com notificações instantâneas a cada alteração.
  - [x] Persistência segura em `localStorage` com controle de versão.
  - [x] Funções de exportar e importar arquivo de save JSON.

---

### [Issue #04] - Skeleton Loading System & Lazy Loading Visual
- **Status**: 🟢 Completed
- **Branch/PR**: `pr-04-skeleton-loading-engine`
- **Descrição**: Implementar o sistema visual de carregamento preguiçoso (*skeleton lazy loading*) com reflexo rúnico dourado em todos os elementos da interface (cards, modal de detalhes, painel de estatísticas e filtros).
- **Critérios de Aceitação**:
  - [x] Componente renderizador de skeletons para grids de cards e modais.
  - [x] Transição suave em crossfade do skeleton para o conteúdo carregado.
  - [x] Simulação de carregamento dinâmico em filtros e buscas rápidas.

---

### [Issue #05] - Componentes de Interface, Cards Interativos & Modal de Detalhes
- **Status**: 🟢 Completed
- **Branch/PR**: `pr-05-ui-components-and-modal`
- **Descrição**: Desenvolver os componentes visuais: Header com contador global, Barra de Filtros multifacetada com busca instantânea (`Ctrl+K`), Cards interativos com micro-animação de obtenção e Modal/Drawer de detalhes com guias de localização e lore.
- **Critérios de Aceitação**:
  - [x] Header com barra de progresso global e seletor de personagens.
  - [x] Barra de busca com debounce e filtros de categoria, região e status.
  - [x] ItemCard com animação 3D tilt no hover e checkbox rúnico estilizado.
  - [x] ItemModal com exibição rica de atributos, passo a passo para encontrar e mapa temático.
  - [x] Sistema de Toasts de Graça ("*Grace Discovered*") com animação de entrada e saída.

---

### [Issue #06] - Dashboard de Estatísticas & Progresso por Região/Categoria
- **Status**: 🟢 Completed
- **Branch/PR**: `pr-06-stats-and-completion-dashboard`
- **Descrição**: Implementar painel analítico com anéis de progresso circulares e barras de conclusão detalhadas por região e categoria de itens.
- **Critérios de Aceitação**:
  - [x] Anel de progresso SVG animado para o progresso geral.
  - [x] Breakdown por região e por tipo de item com porcentagens em tempo real.
  - [x] Filtro rápido ao clicar em uma região ou categoria no dashboard.

---

### [Issue #07] - Shell HTML5, Integração Final & Validação Visual
- **Status**: 🟢 Completed
- **Branch/PR**: `pr-07-app-bootstrap-and-verification`
- **Descrição**: Unificar todos os módulos no `index.html` e `js/app.js`, otimizar acessibilidade, metatags e executar validação completa no navegador.
- **Critérios de Aceitação**:
  - [x] Carregamento inicial ultra-rápido com zero erros no console.
  - [x] Responsividade em desktop, tablet e mobile.
  - [x] Gravação de demonstração no navegador.
