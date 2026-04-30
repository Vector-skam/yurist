(function() {
    const projectName = document.title || "Maksym Didukh Project";
    const contactEmail = "didukh.maxim@gmail.com";

    // 1. СТИЛИ
    const styleId = 'dm-styles-v3';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            #dm-legal-consent, .dm-universal-footer {
                all: initial !important;
                font-family: sans-serif !important;
            }
            html.dm-lock, body.dm-lock {
                overflow: hidden !important;
                height: 100% !important;
                position: fixed !important;
                width: 100% !important;
            }
            #dm-legal-consent {
                position: fixed !important; top: 0 !important; left: 0 !important;
                width: 100vw !important; height: 100vh !important;
                background: rgba(0,0,0,0.98) !important;
                z-index: 2147483647 !important;
                display: flex !important; align-items: center !important; justify-content: center !important;
                backdrop-filter: blur(20px) !important;
            }
            .dm-consent-box {
                background: #161b22 !important; color: #c9d1d9 !important; padding: 30px !important;
                border-radius: 12px !important; max-width: 500px !important; width: 90% !important;
                border: 1px solid #444 !important; text-align: center !important;
                box-shadow: 0 0 50px #000 !important;
            }
            .dm-btn-group { display: flex !important; gap: 15px !important; justify-content: center !important; margin-top: 20px !important; }
            .dm-btn {
                background: #238636 !important; color: #fff !important; border: none !important;
                padding: 14px 28px !important; border-radius: 6px !important; cursor: pointer !important;
                font-weight: bold !important; font-size: 16px !important;
            }
            .dm-btn-secondary { background: #484f58 !important; }
            .dm-universal-footer {
                position: fixed !important; bottom: 0 !important; left: 0 !important; width: 100% !important;
                background: #0d1117 !important; color: #8b949e !important; text-align: center !important;
                padding: 10px 0 !important; font-size: 11px !important; z-index: 2147483646 !important;
                border-top: 1px solid #333 !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    // 2. ФУНКЦИЯ СОЗДАНИЯ
    function mount() {
        if (document.getElementById('dm-legal-consent')) return;

        // Блокируем скролл сразу
        document.documentElement.classList.add('dm-lock');
        document.body?.classList.add('dm-lock');

        const modal = document.createElement('div');
        modal.id = 'dm-legal-consent';
        modal.innerHTML = `
            <div class="dm-consent-box">
                <h2 style="color:#58a6ff !important; margin-bottom:15px !important; font-size:22px !important; display:block !important;">Rechtliche Bestätigung</h2>
                <p style="color:#c9d1d9 !important; display:block !important; margin-bottom:10px !important;">Projekt: <b style="color:#238636 !important;">${projectName}</b></p>
                <div style="margin-bottom:15px !important;">
                    <a href="https://dmamax.netlify.app/impressum" target="_blank" style="color:#58a6ff !important; text-decoration:underline !important;">Impressum</a> | 
                    <a href="https://dmamax.netlify.app/datenschutz" target="_blank" style="color:#58a6ff !important; text-decoration:underline !important;">Datenschutz</a>
                </div>
                <div style="text-align:left !important; background:#0d1117 !important; padding:15px !important; border-radius:6px !important; border-left:4px solid #58a6ff !important; font-size:12px !important; line-height:1.4 !important; color:#c9d1d9 !important;">
                    • <b>Inhalte:</b> Daten werden dauerhaft gespeichert.<br>
                    • <b>Haftung:</b> Keine Verantwortung für iFrame/Fremdinhalte.<br>
                    • <b>Verbot:</b> Rechtswidrige Inhalte streng untersagt.<br>
                    • <b>Technik:</b> Sie akzeptieren LocalStorage & Logs.
                </div>
                <p style="color:#f85149 !important; font-weight:bold !important; margin:15px 0 !important; display:block !important;">Bedingungen akzeptieren?</p>
                <div class="dm-btn-group">
                    <button class="dm-btn" id="dm-accept-trigger">Ja, ich akzeptiere</button>
                    <button class="dm-btn dm-btn-secondary" onclick="window.location.href='https://google.com'">Nein</button>
                </div>
            </div>`;
        
        document.documentElement.appendChild(modal);

        // Используем addEventListener вместо onclick для надежности
        document.getElementById('dm-accept-trigger').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Ставим метку, что принято (только для текущей страницы)
            window.dm_accepted = true;
            
            // Убираем окно и разблокируем сайт
            const el = document.getElementById('dm-legal-consent');
            if (el) el.style.display = 'none'; 
            document.documentElement.classList.remove('dm-lock');
            document.body?.classList.remove('dm-lock');
            
            addFooter();
        }, true);
    }

    function addFooter() {
        if (document.querySelector('.dm-universal-footer')) return;
        const footer = document.createElement('div');
        footer.className = 'dm-universal-footer';
        footer.innerHTML = `
            &copy; 2026 Maksym Didukh | ${contactEmail} | ${projectName} | 
            <a href="https://dmamax.netlify.app/impressum" target="_blank" style="color:#58a6ff !important;">Impressum</a> | 
            <a href="https://dmamax.netlify.app/datenschutz" target="_blank" style="color:#58a6ff !important;">Datenschutz</a>
        `;
        document.documentElement.appendChild(footer);
    }

    // 3. КОНТРОЛЬ
    const checkInterval = setInterval(() => {
        if (!window.dm_accepted) {
            mount();
        } else {
            // Если принято, но кто-то удалил футер - возвращаем футер
            addFooter();
        }
    }, 1000);

    mount();
})();
