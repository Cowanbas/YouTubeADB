# Youtube.js - Script de Bloqueio e Pulo de Anúncios

Este repositório contém o script `Youtube.js` (Youtube ADB), um UserScript desenvolvido em JavaScript projetado para remover anúncios e pulá-los automaticamente nos vídeos do YouTube[cite: 2].

## O que este script faz?

O script executa em segundo plano no navegador, monitorando a página para interceptar e neutralizar propagandas[cite: 2]. Abaixo estão as principais ações realizadas:

*   **Ocultação de Elementos (CSS):** Injeta regras de estilo para esconder banners de anúncios, anúncios de barra lateral, painéis de engajamento patrocinados e *overlays* visuais sobre os vídeos (`#masthead-ad`, `#player-ads`, etc.)[cite: 2].
*   **Pulo Automático:** Detecta anúncios em vídeo e clica automaticamente no botão de pular assim que ele se torna disponível[cite: 2].
*   **Avanço Rápido (Fallback):** Caso o anúncio não possua o botão de pular de imediato, o script muta o áudio, acelera a velocidade de reprodução em 16x e avança o tempo para o final do anúncio (duração - 0.1s)[cite: 2].
*   **Contorno de Bloqueios:** Identifica e remove pop-ups de interrupção ou de detecção de Adblock (`tp-yt-iron-overlay-backdrop`, `ytd-enforcement-message-view-model`), retomando a reprodução do vídeo automaticamente caso tenha sido pausado[cite: 2].
*   **Monitoramento Contínuo:** Utiliza um `MutationObserver` e verificações em loop (a cada 500ms) para garantir que o pulo de anúncios e as regras de CSS continuem funcionando enquanto você navega pelo site[cite: 2].

## Como usar

1.  Instale uma extensão de gerenciamento de UserScripts no seu navegador (como **Tampermonkey**, **Violentmonkey** ou **Greasemonkey**).
2.  Abra o painel da extensão e selecione a opção para "Criar um novo script" (ou "Adicionar novo script").
3.  Copie todo o conteúdo do arquivo `Youtube.js` e cole no editor da extensão, substituindo qualquer código padrão.
4.  Salve o script.
5.  Acesse o YouTube normalmente. O script será acionado automaticamente em todas as páginas do site, conforme definido pela regra `@match *://*.youtube.com/*`[cite: 2].

## Avisos Importantes

*   **Atualizações da Plataforma:** O YouTube atualiza frequentemente as classes e identificadores do seu layout. Pode ser necessário atualizar a lista constante na variável `adSelectors` caso o YouTube mude a forma como os anúncios são carregados[cite: 2].
*   **Desempenho e Conflitos:** O script utiliza otimizações com *flags* (`anti-ad-style-flag`, `script-initialized-flag`) para evitar injetar o mesmo código múltiplas vezes na página, garantindo um funcionamento mais leve[cite: 2].
