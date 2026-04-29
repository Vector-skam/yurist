(function() {
    // 1. ОПРЕДЕЛЕНИЕ ПЕРЕМЕННЫХ
    const projectName = document.title || "Maksym Didukh Project E-mail: didukh.maxim@gmail.com";

    // 2. ДОБАВЛЕНИЕ СТИЛЕЙ (Футер и Модальное окно)
    const style = document.createElement('style');
    style.innerHTML = `
        /* Стили футера */
        .dm-universal-footer {
            position: fixed; bottom: 0; left: 0; width: 100%; 
            background: rgba(10, 10, 10, 0.95); color: #8b949e; 
            text-align: center; padding: 10px 0; font-family: -apple-system, sans-serif; 
            font-size: 11px; z-index: 99999; backdrop-filter: blur(5px);
            border-top: 1px solid #333;
        }
        .dm-universal-footer a { color: #58a6ff; text-decoration: none; margin: 0 10px; font-weight: bold; }
        .dm-universal-footer a:hover { text-decoration: underline; }

        /* Стили окна согласия */
        #dm-legal-consent {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.92); z-index: 999999; display: flex;
            align-items: center; justify-content: center; backdrop-filter: blur(15px);
            padding: 20px; box-sizing: border-box;
        }
        .dm-consent-box {
            background: #161b22; color: #c9d1d9; padding: 30px; border-radius: 12px;
            max-width: 550px; width: 100%; border: 1px solid #444; text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            font-family: -apple-system, sans-serif;
        }
        .dm-consent-box h2 { color: #58a6ff; margin-top: 0; font-size: 22px; }
        .dm-consent-box p { font-size: 13px; line-height: 1.6; text-align: left; margin-bottom: 15px; }
        .dm-project-highlight { color: #238636; font-weight: bold; }
        .dm-warning-red { color: #f85149; font-weight: bold; margin-bottom: 20px; }
        
        .dm-btn-group { display: flex; gap: 15px; justify-content: center; margin-top: 20px; }
        
        .dm-btn {
            background: #238636; color: white; border: none; padding: 14px 30px;
            border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px;
            transition: background 0.2s, transform 0.1s;
        }
        .dm-btn:hover { background: #2ea043; transform: translateY(-1px); }
        .dm-btn-secondary { background: #484f58; }
        .dm-btn-secondary:hover { background: #6e7681; }
        
        /* Скрытие основного контента при активном окне */
        body.modal-open { overflow: hidden; }
    `;
    document.head.appendChild(style);

    // 3. СОЗДАНИЕ ОКНА ПОДТВЕРЖДЕНИЯ (Всегда при входе)
    const modal = document.createElement('div');
    modal.id = 'dm-legal-consent';
    modal.innerHTML = `
        <div class="dm-consent-box">
            <h2>Rechtliche Bestätigung</h2>
            <p>Sie nutzen gerade das Projekt: <span class="dm-project-highlight">${projectName}</span></p>
<br>
<a href="https://dmamax.netlify.app/impressum" target="_blank">Impressum</a> | 
        <a href="https://dmamax.netlify.app/datenschutz" target="_blank">Datenschutz</a
        <br>
            
            <p>Bitte bestätigen Sie die Nutzungsbedingungen für diesen Dienst:</p>
            
            <div style="text-align: left; background: #0d1117; padding: 15px; border-radius: 6px; border-left: 4px solid #58a6ff; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 12px;">
                    • <b>Inhalte:</b> Erstellte Zeichnungen, Nachrichten и Daten werden dauerhaft gespeichert и sind für andere Nutzer öffentlich sichtbar.<br><br>
                    • <b>Haftung (iFrame):</b> Dieses Projekt kann externe Webseiten (auch unzensierte/18+) via iFrame laden. Der Betreiber übernimmt <u>keine Verantwortung</u> für diese fremden Inhalte.<br><br>
                    • <b>Verbot:</b> Das Teilen von rechtswidrigen, gewaltverherrlichenden oder beleidigenden Inhalten ist streng untersagt.<br><br>
                    • <b>Datenschutz:</b> Sie akzeptieren die Speicherung von technischen Logs durch Netlify и LocalStorage.
                </p>
            </div>
            
            <p class="dm-warning-red">Akzeptieren Sie diese Bedingungen für <b>${projectName}</b>?</p>
            
            <div class="dm-btn-group">
                <button class="dm-btn" id="accept-dm-legal">Ja, ich akzeptiere</button>
                <button class="dm-btn dm-btn-secondary" onclick="window.location.href='https://google.com'">Nein, verlassen</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');

    // Логика кнопки принятия
    document.getElementById('accept-dm-legal').onclick = function() {
        modal.remove();
        document.body.classList.remove('modal-open');
    };

    // 4. ДОБАВЛЕНИЕ УНИВЕРСАЛЬНОГО ФУТЕРА
    const footer = document.createElement('footer');
    footer.className = 'dm-universal-footer';
    footer.innerHTML = `
        &copy; 2026 Maksym Didukh | Contact E-mail didukh.maxim@gmail.com <span>${projectName}</span> | 
        <a href="https://dmamax.netlify.app/impressum" target="_blank">Impressum</a> | 
        <a href="https://dmamax.netlify.app/datenschutz" target="_blank">Datenschutz</a>
    `;
    document.body.appendChild(footer);

})();
