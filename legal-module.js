(function() {
    // Проверка на дубликаты, чтобы не спамить окнами при перезагрузке скрипта
    if (document.getElementById('dm-legal-wrapper')) return;

    const projectName = document.title || "Maksym Didukh Project";

    // 1. СТИЛИ (Максимальная изоляция и приоритет)
    const style = document.createElement('style');
    style.innerHTML = `
        /* Обертка на весь экран */
        #dm-legal-wrapper {
            position: fixed !important; top: 0 !important; left: 0 !important;
            width: 100vw !important; height: 100vh !important;
            z-index: 2147483647 !important; /* Выше всех Canvas и UI */
            background: rgba(0, 0, 0, 0.85) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            display: flex !important; align-items: center !important; justify-content: center !important;
            margin: 0 !important; padding: 0 !important;
            pointer-events: all !important; /* Гарантирует кликабельность */
        }

        /* Контейнер модального окна */
        .dm-modal-card {
            background: #0d1117 !important;
            color: #c9d1d9 !important;
            border: 1px solid #30363d !important;
            border-radius: 12px !important;
            width: 90% !important;
            max-width: 450px !important;
            padding: 25px !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.7) !important;
            font-family: -apple-system, system-ui, "Segoe UI", Roboto, sans-serif !important;
            text-align: center !important;
        }

        .dm-title { color: #58a6ff !important; font-size: 22px !important; font-weight: bold !important; margin-bottom: 15px !important; }
        
        /* Скролл-зона с правилами */
        .dm-rules-box {
            background: #161b22 !important;
            border-radius: 8px !important;
            padding: 15px !important;
            text-align: left !important;
            font-size: 13px !important;
            line-height: 1.6 !important;
            margin-bottom: 20px !important;
            max-height: 180px !important;
            overflow-y: auto !important;
            border-left: 4px solid #238636 !important;
        }

        /* Кнопки */
        .dm-actions { display: flex !important; gap: 10px !important; justify-content: center !important; margin-top: 20px !important; }
        .dm-btn {
            padding: 12px 24px !important;
            border-radius: 6px !important;
            border: none !important;
            font-weight: bold !important;
            cursor: pointer !important;
            font-size: 14px !important;
            transition: transform 0.1s, background 0.2s !important;
            pointer-events: all !important;
        }
        .dm-btn-accept { background: #238636 !important; color: white !important; }
        .dm-btn-accept:hover { background: #2ea043 !important; transform: scale(1.03) !important; }
        
        .dm-btn-cancel { background: #484f58 !important; color: white !important; }
        .dm-btn-cancel:hover { background: #6e7681 !important; }

        /* Ссылки */
        .dm-link { color: #58a6ff !important; text-decoration: none !important; font-size: 12px !important; margin: 0 10px !important; }
        .dm-link:hover { text-decoration: underline !important; }

        /* Футер (всегда внизу) */
        .dm-footer-bar {
            position: fixed !important; bottom: 0 !important; left: 0 !important; width: 100% !important;
            background: rgba(13, 17, 23, 0.9) !important;
            border-top: 1px solid #30363d !important;
            padding: 10px 0 !important;
            color: #8b949e !important;
            font-size: 11px !important;
            text-align: center !important;
            z-index: 2147483646 !important;
            pointer-events: all !important;
        }
    `;
    document.head.appendChild(style);

    // 2. СОЗДАНИЕ HTML
    const wrapper = document.createElement('div');
    wrapper.id = 'dm-legal-wrapper';

    wrapper.innerHTML = `
        <div class="dm-modal-card">
            <div class="dm-title">Bestätigung erforderlich</div>
            <p style="font-size: 13px; color: #8b949e; margin-bottom: 15px;">Projekt: ${projectName}</p>
            
            <div class="dm-rules-box">
                • <b>Daten-Speicherung:</b> Alle Interaktionen werden dauerhaft gespeichert.<br>
                • <b>Haftung:</b> Der Betreiber haftet nicht für externe Inhalte (iFrames).<br>
                • <b>Verhalten:</b> Respektloses или illegales Verhalten ist untersagt.<br>
                • <b>Technik:</b> Wir nutzen LocalStorage zur Speicherung Ihrer Auswahl.
            </div>

            <div>
                <a href="https://dmamax.netlify.app/impressum" target="_blank" class="dm-link">Impressum</a>
                <a href="https://dmamax.netlify.app/datenschutz" target="_blank" class="dm-link">Datenschutz</a>
            </div>

            <div class="dm-actions">
                <button id="dm-btn-ok" class="dm-btn dm-btn-accept">Akzeptieren & Starten</button>
                <button onclick="window.location.href='https://google.com'" class="dm-btn dm-btn-cancel">Ablehnen</button>
            </div>
        </div>
    `;

    const footer = document.createElement('div');
    footer.className = 'dm-footer-bar';
    footer.innerHTML = `
        &copy; 2026 Maksym Didukh | didukh.maxim@gmail.com | Project: ${projectName} 
        <a href="https://dmamax.netlify.app/impressum" target="_blank" style="color:#58a6ff; margin-left:15px; text-decoration:none;">Rechtliches</a>
    `;

    // 3. ВНЕДРЕНИЕ И ЛОГИКА
    document.body.appendChild(wrapper);
    document.body.appendChild(footer);

    // Блокируем прокрутку страницы пока не нажата кнопка
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.getElementById('dm-btn-ok').onclick = function(e) {
        e.stopPropagation(); // Чтобы клик не ушел в игру
        wrapper.remove();
        document.body.style.overflow = originalOverflow;
        
        // Сигнал для игровых движков (если нужно)
        window.dispatchEvent(new Event('dm_legal_accepted'));
        console.log("Consent accepted by user.");
    };

})();
      
