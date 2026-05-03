(function() {
    const projectName = document.title || "Maksym Didukh Project";
    const contactEmail = "didukh.maxim@gmail.com";

    const styleId = 'dm-styles-integrated';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            #dm-legal-consent, .dm-universal-footer {
                all: initial !important;
                font-family: -apple-system, sans-serif !important;
                box-sizing: border-box !important;
            }
            .dm-lock-hard {
                overflow: hidden !important;
                height: 100% !important;
                width: 100% !important;
                position: fixed !important;
            }
            #dm-legal-consent {
                position: fixed !important; top: 0 !important; left: 0 !important;
                width: 100% !important; height: 100% !important;
                background: rgba(0,0,0,0.98) !important;
                z-index: 2147483647 !important;
                display: flex !important; align-items: center !important; justify-content: center !important;
                backdrop-filter: blur(15px) !important;
                padding: 5px !important;
            }
            .dm-consent-box {
                background: #161b22 !important; color: #c9d1d9 !important; 
                padding: 15px !important;
                border-radius: 8px !important; 
                max-width: 550px !important; 
                width: 100% !important;
                max-height: 95vh !important; /* Ограничение по высоте */
                overflow-y: auto !important; /* Прокрутка если экран крошечный */
                border: 1px solid #30363d !important; 
                text-align: center !important;
                box-shadow: 0 10px 40px rgba(0,0,0,1) !important;
            }
            .dm-btn-group { 
                display: flex !important; 
                flex-wrap: wrap !important; /* Кнопки встанут друг под друга на узких экранах */
                gap: 8px !important; 
                justify-content: center !important; 
                margin-top: 15px !important; 
            }
            .dm-btn {
                background: #238636 !important; color: #fff !important; border: none !important;
                padding: 10px 15px !important; border-radius: 6px !important; cursor: pointer !important;
                font-weight: bold !important; font-size: 13px !important; 
                flex: 1 1 auto !important; /* Кнопки растягиваются */
                min-width: 120px !important;
            }
            .dm-btn:hover { background: #2ea043 !important; }
            .dm-btn-secondary { background: #484f58 !important; }
            
            .dm-universal-footer {
                position: fixed !important; bottom: 0 !important; left: 0 !important; width: 100% !important;
                background: rgba(13, 17, 23, 0.95) !important; color: #8b949e !important; text-align: center !important;
                padding: 5px !important; font-size: 10px !important; z-index: 2147483646 !important;
                border-top: 1px solid #30363d !important;
                display: flex !important; flex-wrap: wrap !important; justify-content: center !important; align-items: center !important;
            }
            .dm-universal-footer a { color: #58a6ff !important; text-decoration: none !important; margin: 2px 5px !important; }
            
            /* Адаптивность для экстремально маленьких экранов */
            @media (max-width: 200px) {
                .dm-consent-box { padding: 8px !important; }
                h2 { font-size: 16px !important; }
                .dm-btn { font-size: 11px !important; padding: 8px !important; }
                .dm-universal-footer { position: relative !important; font-size: 9px !important; }
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    let isAccepted = false;

    function mount() {
        if (isAccepted || document.getElementById('dm-legal-consent')) return;
        document.documentElement.classList.add('dm-lock-hard');

        const modal = document.createElement('div');
        modal.id = 'dm-legal-consent';
        modal.innerHTML = `
            <div class="dm-consent-box">
                <h2 style="color:#58a6ff !important; margin:0 0 8px 0 !important; font-size:18px !important; font-weight:bold !important;">Rechtliches</h2>
                <p style="color:#c9d1d9 !important; margin-bottom:10px !important; font-size:12px !important;">
                    Projekt: <b style="color:#238636 !important;">${projectName}</b>
                </p>
                
                <div style="margin-bottom:10px !important; font-size:11px !important;">
                    <a href="https://dmamax.netlify.app/impressum" target="_blank" style="color:#58a6ff !important;">Impressum</a> | 
                    <a href="https://dmamax.netlify.app/datenschutz" target="_blank" style="color:#58a6ff !important;">Datenschutz</a>
                </div>

                <div style="text-align:left !important; background:#0d1117 !important; padding:10px !important; border-radius:6px !important; border-left:3px solid #58a6ff !important; font-size:11px !important; line-height:1.4 !important; color:#c9d1d9 !important; margin-bottom:15px !important;">
                    • <b>Daten:</b> Öffentlich sichtbar.<br>
                    • <b>iFrame:</b> Keine Haftung für externe Inhalte.<br>
                    • <b>Verbot:</b> Keine illegalen Inhalte.<br>
                    • <b>Cookies:</b> LocalStorage Nutzung.
                </div>

                <div class="dm-btn-group">
                    <button class="dm-btn" id="dm-ok-btn">Akzeptieren</button>
                    <button class="dm-btn dm-btn-secondary" onclick="window.location.href='https://google.com'">Verlassen</button>
                </div>
            </div>`;
        
        document.documentElement.appendChild(modal);

        document.getElementById('dm-ok-btn').addEventListener('click', function() {
            isAccepted = true;
            const el = document.getElementById('dm-legal-consent');
            if (el) el.remove();
            document.documentElement.classList.remove('dm-lock-hard');
            addFooter();
        });
    }

    function addFooter() {
        if (!isAccepted || document.querySelector('.dm-universal-footer')) return;
        const footer = document.createElement('div');
        footer.className = 'dm-universal-footer';
        footer.innerHTML = `
            <span>&copy; 2026 Maksym Didukh</span>
            <a href="https://dmamax.netlify.app/impressum" target="_blank">Impressum</a>
            <a href="https://dmamax.netlify.app/datenschutz" target="_blank">Datenschutz</a>
        `;
        document.documentElement.appendChild(footer);
    }

    setInterval(() => {
        if (!isAccepted) mount();
        else addFooter();
    }, 1000);

    mount();
})();
          
