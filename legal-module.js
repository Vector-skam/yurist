(function() {
    // 1. ПАРАМЕТРЫ
    const projectName = document.title || "Maksym Didukh Project";
    const contactEmail = "didukh.maxim@gmail.com";

    // 2. СТИЛИ (Максимальная изоляция через all: initial)
    const styleId = 'dm-strict-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            #dm-legal-consent, .dm-universal-footer {
                all: initial !important; 
                font-family: -apple-system, sans-serif !important;
                visibility: visible !important;
                opacity: 1 !important;
                display: flex !important;
            }
            .dm-lock-page { 
                overflow: hidden !important; 
                height: 100vh !important; 
                pointer-events: none !important; 
            }
            #dm-legal-consent {
                position: fixed !important; top: 0 !important; left: 0 !important;
                width: 100vw !important; height: 100vh !important;
                background: rgba(0,0,0,0.98) !important;
                z-index: 2147483647 !important;
                align-items: center !important; justify-content: center !important;
                backdrop-filter: blur(25px) !important;
                pointer-events: auto !important;
            }
            .dm-consent-box {
                background: #161b22 !important; color: #c9d1d9 !important; padding: 40px !important;
                border-radius: 12px !important; max-width: 550px !important; width: 90% !important;
                border: 1px solid #444 !important; text-align: center !important;
                box-shadow: 0 0 100px rgba(0,0,0,1) !important;
            }
            .dm-consent-box h2 { color: #58a6ff !important; font-size: 24px !important; margin: 0 0 20px 0 !important; display: block !important; }
            .dm-consent-box p { font-size: 14px !important; line-height: 1.6 !important; color: #c9d1d9 !important; display: block !important; margin: 10px 0 !important; }
            .dm-project-highlight { color: #238636 !important; font-weight: bold !important; }
            .dm-warning-red { color: #f85149 !important; font-weight: bold !important; margin: 20px 0 !important; display: block !important; }
            .dm-btn-group { display: flex !important; gap: 15px !important; justify-content: center !important; margin-top: 25px !important; }
            .dm-btn {
                background: #238636 !important; color: #ffffff !important; border: none !important;
                padding: 15px 35px !important; border-radius: 6px !important; cursor: pointer !important;
                font-weight: bold !important; font-size: 15px !important; pointer-events: auto !important;
            }
            .dm-btn-secondary { background: #484f58 !important; }

            .dm-universal-footer {
                position: fixed !important; bottom: 0 !important; left: 0 !important;
                width: 100% !important; background: #0a0a0a !important; color: #8b949e !important;
                text-align: center !important; padding: 12px 0 !important; font-size: 12px !important;
                z-index: 2147483646 !important; border-top: 1px solid #333 !important;
                justify-content: center !important; align-items: center !important;
            }
            .dm-universal-footer a { color: #58a6ff !important; text-decoration: none !important; margin: 0 10px !important; font-weight: bold !important; }
        `;
        document.documentElement.appendChild(style);
    }

    // 3. ФУНКЦИЯ СОЗДАНИЯ ОКНА (Без сохранения состояния)
    function forceShowLegal() {
        if (document.getElementById('dm-legal-consent')) return;

        const modal = document.createElement('div');
        modal.id = 'dm-legal-consent';
        modal.innerHTML = `
            <div class="dm-consent-box">
                <h2>Rechtliche Bestätigung</h2>
                <p>Projekt: <span class="dm-project-highlight">${projectName}</span></p>
                <p>
                    <a href="https://dmamax.netlify.app/impressum" target="_blank" style="color:#58a6ff; text-decoration:underline;">Impressum</a> | 
                    <a href="https://dmamax.netlify.app/datenschutz" target="_blank" style="color:#58a6ff; text-decoration:underline;">Datenschutz</a>
                </p>
                <div style="text-align: left; background: #0d1117; padding: 20px; border-radius: 8px; border-left: 4px solid #58a6ff; margin: 15px 0;">
                    <p style="font-size: 12px !important; margin: 0 !important;">
                        • <b>Inhalte:</b> Daten werden dauerhaft gespeichert и öffentlich sichtbar.<br><br>
                        • <b>Haftung:</b> iFrame Inhalte (auch 18+) liegen nicht в Verantwortung des Betreibers.<br><br>
                        • <b>Verbot:</b> Rechtswidrige Inhalte sind streng untersagt.<br><br>
                        • <b>Datenschutz:</b> Sie akzeptieren Cookies и LocalStorage.
                    </p>
                </div>
                <p class="dm-warning-red">Akzeptieren Sie diese Bedingungen für den Zugriff?</p>
                <div class="dm-btn-group">
                    <button class="dm-btn" id="accept-dm-legal">Ja, ich akzeptiere</button>
                    <button class="dm-btn dm-btn-secondary" onclick="window.location.href='https://google.com'">Nein, verlassen</button>
                </div>
            </div>`;
        
        document.documentElement.appendChild(modal);
        document.documentElement.classList.add('dm-lock-page');

        document.getElementById('accept-dm-legal').onclick = function() {
            modal.remove();
            document.documentElement.classList.remove('dm-lock-page');
            forceShowFooter();
        };
    }

    // 4. ФУНКЦИЯ ФУТЕРА
    function forceShowFooter() {
        if (document.querySelector('.dm-universal-footer')) return;
        const footer = document.createElement('div');
        footer.className = 'dm-universal-footer';
        footer.innerHTML = `
            &copy; 2026 Maksym Didukh | ${contactEmail} | <b>${projectName}</b> | 
            <a href="https://dmamax.netlify.app/impressum" target="_blank">Impressum</a> | 
            <a href="https://dmamax.netlify.app/datenschutz" target="_blank">Datenschutz</a>
        `;
        document.documentElement.appendChild(footer);
    }

    // 5. МОНИТОРИНГ (Защита от удаления и перезапуск при входе)
    forceShowLegal();

    setInterval(() => {
        // Если нет модалки И страница заблокирована (нажатие не произошло) — вернуть модалку
        if (!document.getElementById('dm-legal-consent') && document.documentElement.classList.contains('dm-lock-page')) {
            forceShowLegal();
        }
        // Всегда проверять наличие футера, если окно уже закрыто
        if (!document.getElementById('dm-legal-consent')) {
            forceShowFooter();
        }
    }, 500);

})();
                <p>
                    <a href="https://dmamax.netlify.app/impressum" target="_blank" style="color:#58a6ff; text-decoration:underline;">Impressum</a> | 
                    <a href="https://dmamax.netlify.app/datenschutz" target="_blank" style="color:#58a6ff; text-decoration:underline;">Datenschutz</a>
                </p>
                <div style="text-align: left; background: #0d1117; padding: 20px; border-radius: 8px; border-left: 4px solid #58a6ff; margin: 15px 0;">
                    <p style="font-size: 12px !important; margin: 0 !important;">
                        • <b>Inhalte:</b> Daten werden dauerhaft gespeichert и öffentlich sichtbar.<br><br>
                        • <b>Haftung:</b> iFrame Inhalte (auch 18+) liegen nicht в Verantwortung des Betreibers.<br><br>
                        • <b>Verbot:</b> Rechtswidrige Inhalte sind streng untersagt.<br><br>
                        • <b>Datenschutz:</b> Sie akzeptieren Cookies и LocalStorage.
                    </p>
                </div>
                <p class="dm-warning-red">Akzeptieren Sie diese Bedingungen für den Zugriff?</p>
                <div class="dm-btn-group">
                    <button class="dm-btn" id="accept-dm-legal">Ja, ich akzeptiere</button>
                    <button class="dm-btn dm-btn-secondary" onclick="window.location.href='https://google.com'">Nein, verlassen</button>
                </div>
            </div>`;
        
        document.documentElement.appendChild(modal);
        document.documentElement.classList.add('dm-lock-page');

        document.getElementById('accept-dm-legal').onclick = function() {
            modal.remove();
            document.documentElement.classList.remove('dm-lock-page');
            forceShowFooter();
        };
    }

    // 4. ФУНКЦИЯ ФУТЕРА
    function forceShowFooter() {
        if (document.querySelector('.dm-universal-footer')) return;
        const footer = document.createElement('div');
        footer.className = 'dm-universal-footer';
        footer.innerHTML = `
            &copy; 2026 Maksym Didukh | ${contactEmail} | <b>${projectName}</b> | 
            <a href="https://dmamax.netlify.app/impressum" target="_blank">Impressum</a> | 
            <a href="https://dmamax.netlify.app/datenschutz" target="_blank">Datenschutz</a>
        `;
        document.documentElement.appendChild(footer);
    }

    // 5. МОНИТОРИНГ (Защита от удаления и перезапуск при входе)
    forceShowLegal();

    setInterval(() => {
        // Если нет модалки И страница заблокирована (нажатие не произошло) — вернуть модалку
        if (!document.getElementById('dm-legal-consent') && document.documentElement.classList.contains('dm-lock-page')) {
            forceShowLegal();
        }
        // Всегда проверять наличие футера, если окно уже закрыто
        if (!document.getElementById('dm-legal-consent')) {
            forceShowFooter();
        }
    }, 500);

})();
            
