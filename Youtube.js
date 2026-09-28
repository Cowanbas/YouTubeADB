// ==UserScript==
// @name            Youtube ADB
// @description     Remove anúncios e os pula automaticamente nos videos.
// @license         GPL-3.0
// @version         1.0
// @author          Cowanbas
// @match           *://*.youtube.com/*
// @run-at          document-start
// ==/UserScript==

(function() {
    'use strict';

    const adSelectors = [
        '#masthead-ad', 'ytd-ad-slot-renderer', 'ytd-rich-item-renderer #content:has(.ytd-display-ad-renderer)',
        '.video-ads.ytp-ad-module', '.ytp-ad-overlay-container', 'tp-yt-paper-dialog:has(yt-mealbar-promo-renderer)',
        'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"]',
        '#player-ads', 'ad-slot-renderer', 'ytm-companion-ad-renderer', '#panels-ad'
    ];
    // Flag
    function checkRunFlag(id) {
        if (document.getElementById(id)) return true;
        let flag = document.createElement('div');
        flag.id = id;
        flag.style.display = 'none';
        (document.head || document.documentElement).appendChild(flag);
        return false;
    }
    const injectCSS = () => {
        // Não repete a flag (Caso outra ja existir)
        if (checkRunFlag('anti-ad-style-flag')) return;

        const style = document.createElement('style');
        style.id = 'anti-ad-style';
        style.textContent = adSelectors.map(sel => `${sel} { display: none !important; }`).join(' ');
        (document.head || document.documentElement).appendChild(style);
    };
    const handleVideoAds = () => {
        const video = document.querySelector('video.html5-main-video');
        const adShowing = document.querySelector('.ad-showing, .ad-interrupting');
        const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button');

        if (adShowing && video) {
            // Pular pelo botão
            if (skipButton) {
                skipButton.click();
            } else {
                // Pular sem o botão
                video.muted = true;
                video.playbackRate = 16; 
                video.currentTime = video.duration - 0.1; // Vai para o final
            }
        }
        // Remove mensagems "Adblock detectado"
        const overlay = document.querySelector('tp-yt-iron-overlay-backdrop, ytd-enforcement-message-view-model');
        if (overlay) {
            overlay.remove();
            if (video && video.paused) video.play();
        }
    };
    const init = () => {
        // Confere a existencia do "Observer" 
        if (checkRunFlag('script-initialized-flag')) return;
        injectCSS();

        const observer = new MutationObserver(() => {
            handleVideoAds();
            // Verifição do Element
            if (!document.getElementById('anti-ad-style')) {
                // Remoção e adição da nova flag
                const oldFlag = document.getElementById('anti-ad-style-flag');
                if (oldFlag) oldFlag.remove();
                injectCSS();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        setInterval(handleVideoAds, 500);
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
