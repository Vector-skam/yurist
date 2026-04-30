(function() {
    // 1. ОПРЕДЕЛЕНИЕ ПЕРЕМЕННЫХ
    const projectName = document.title || "Maksym Didukh Project";
    const contactEmail = "didukh.maxim@gmail.com";

    // 2. ДОБАВЛЕНИЕ СТИЛЕЙ
    const style = document.createElement('style');
    style.innerHTML = `
        /* Блокировка прокрутки и взаимодействия с фоном */
        .dm-lock-screen { 
            overflow: hidden !important; 
            height: 100vh !important; 
            width: 100vw !important;
            position: fixed !important;
        }

        /* Максимальный z-index для перекрытия любых UI фреймворков */
        #dm-legal-consent {
            position: fixed !important; 
            top: 0 !important; 
            left: 0 !important; 
            width: 100vw !important; 
            height: 100vh !important;
            background: rgba(0,0,0,0.96) !important; 
            z-index: 2147483647 !important; /* Максимально возможное значение */
            display: flex !important;
            align-items: center !important; 
            justify-content: center !important; 
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px);
            padding: 20px !important; 
            box-sizing: border-box !important;
            margin: 0 !important;
        }

        .dm-consent-box {
            background: #161b22 !important; 
            color: #c9d1d9 !important; 
            padding: 35px !important; 
            border-radius: 16px !important;
            max-width: 550px !important; 
            width: 100% !important; 
            border: 1px solid #30363d !important; 
            text-align: center !important;
            box-shadow: 0 0 100px rgba(0,0,0,1) !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif !important;
        }

        .dm-consent-box h2 { color: #58a6ff !important; margin-top: 0 !important; font-size: 24px !important; }
        .dm-consent-box p { font-size: 14px !important; line-height: 1.6 !important; margin-bottom: 15px !important; }
        .dm-project-highlight { color: #238636 !important; font-weight: bold !important; }
        .dm-warning-red { color: #f85149 !important; font-weight: bold !important; margin: 20px 0 !important; }
        
        .dm-btn-group { display: flex !important; gap: 15px !important; justify-content: center !important; margin-top: 25px !important; }
        
        .dm-btn {
            background: #238636 !important; color: white !important; border: none !important; 
            padding: 14px 28px !important; border-radius: 6px !important; cursor: pointer !important; 
            font-weight: bold !important; font-size: 15px !important; transition: background 0.2s !important;
        }
        .dm-btn:hover { background: #2ea043 !important; }
        .dm-btn-secondary { background: #484f58 !important; }
        .dm-btn-secondary:hover { background: #6e7681 !important; }

        .dm-universal-footer {
            position: fixed !important; bottom: 0 !important; left: 0 !important; width: 100% !important; 
            background: rgba(13, 17, 23, 0.9) !important; color: #8b949e !important; 
            text-align: center !important; padding: 8px 0 !important; font-size: 11px !important; 
            z-index: 2147483646 !important; backdrop-filter: blur(5px) !important;
            border-top: 1px solid #30363d !important; font-family: sans-serif !important;
        }
        .dm-universal-footer a { color: #58a6ff !important; text-decoration: none !important; margin: 0 8px !important; }
    `;
    document.head.appendChild(style);

    // 3. ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ (чтобы сработало даже если DOM еще не готов)
    function initLegalCheck() {
        if (document.getElementById('dm-legal-consent')) return;

        const modal = document.createElement('div');
        modal.id = 'dm-legal-consent';
        modal.innerHTML = `
            <div class="dm-consent-box">
                <h2>Rechtliche Bestätigung</h2>
                <p>Projekt: <span class="dm-project-highlight">${projectName}</span></p>
                <div style="margin-bottom: 15px;">
                    <a href="https://dmamax.netlify.app/impressum" target="_blank" style="color:#58a6ff">Impressum</a> | 
                    <a href="https://dmamax.netlify.app/datenschutz" target="_blank" style="color:#58a6ff">Datenschutz</a>
                </div>
                
                <div style="text-align: left; background: #0d1117; padding: 15px; border-radius: 8px; border-left: 4px solid #238636; margin-bottom: 15px;">
                    <p style="margin: 0; font-size: 13px;">
                        • <b>Inhalte:</b> Daten werden dauerhaft gespeichert и öffentlich sichtbar.<br>
                        • <b>Haftung:</b> Projekt kann externe iFrames (auch 18+) laden. Keine Haftung für Fremdinhalte.<br>
                        • <b>Verbot:</b> Rechtswidrige Inhalte sind untersagt.<br>
                        • <b>Datenschutz:</b> Sie akzeptieren LocalStorage и Logs.
                    </p>
                </div>
                
                <p class="dm-warning-red">Akzeptieren Sie diese Bedingungen?</p>
                
                <div class="dm-btn-group">
                    <button class="dm-btn" id="accept-dm-legal">Ja, ich akzeptiere</button>
                    <button class="dm-btn dm-btn-secondary" onclick="window.location.href='https://google.com'">Nein, verlassen</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.classList.add('dm-lock-screen');

        // Логика кнопки
        document.getElementById('accept-dm-legal').onclick = function() {
            modal.remove();
            document.body.classList.remove('dm-lock-screen');
            showFooter();
        };
    }

    function showFooter() {
        if (document.querySelector('.dm-universal-footer')) return;
        const footer = document.createElement('footer');
        footer.className = 'dm-universal-footer';
        footer.innerHTML = `
            &copy; 2026 Maksym Didukh | ${contactEmail} | <b>${projectName}</b> | 
            <a href="https://dmamax.netlify.app/impressum" target="_blank">Impressum</a> | 
            <a href="https://dmamax.netlify.app/datenschutz" target="_blank">Datenschutz</a>
        `;
        document.body.appendChild(footer);
    }

    // Запуск: проверяем готовность body
    if (document.body) {
        initLegalCheck();
    } else {
        window.addEventListener('DOMContentLoaded', initLegalCheck);
    }
})();
