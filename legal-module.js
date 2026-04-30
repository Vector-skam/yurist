(function() {
    const projectName = document.title || "Maksym Didukh Project";
    const contactEmail = "didukh.maxim@gmail.com";

    const styleId = 'dm-styles-unique';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            #dm-legal-consent, .dm-universal-footer {
                all: initial !important; /* Сброс всех стилей сайта */
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            }
            .dm-lock-screen { overflow: hidden !important; touch-action: none !important; }
            
            #dm-legal-consent {
                position: fixed !important; top: 0 !important; left: 0 !important;
                width: 100vw !important; height: 100vh !important;
                background: rgba(0,0,0,0.98) !important;
                z-index: 2147483647 !important;
                display: flex !important; align-items: center !important; justify-content: center !important;
                backdrop-filter: blur(20px) !important; padding: 20px !important; box-sizing: border-box !important;
            }
            .dm-consent-box {
                background: #161b22 !important; color: #c9d1d9 !important; padding: 30px !important;
                border-radius: 12px !important; max-width: 500px !important; width: 100% !important;
                border: 1px solid #444 !important; text-align: center !important;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5) !important;
            }
            .dm-consent-box h2 { color: #58a6ff !important; font-size: 22px !important; margin-bottom: 15px !important; display: block !important;}
            .dm-consent-box p { font-size: 13px !important; line-height: 1.5 !important; margin: 10px 0 !important; display: block !important; color: #c9d1d9 !important;}
            .dm-project-highlight { color: #238636 !important; font-weight: bold !important; }
            .dm-warning-red { color: #f85149 !important; font-weight: bold !important; margin-top: 15px !important; display: block !important;}
            .dm-btn-group { display: flex !important; gap: 10px !important; justify-content: center !important; margin-top: 20px !important; }
            .dm-btn {
                background: #238636 !important; color: #fff !important; border: none !important;
                padding: 12px 24px !important; border-radius: 6px !important; cursor: pointer !important;
                font-weight: bold !important; font-size: 14px !important;
            }
            .dm-btn-secondary { background: #484f58 !important; }

            .dm-universal-footer {
                position: fixed !important; bottom: 0 !important; left: 0 !important;
                width: 100% !important; background: #0d1117 !important;
                color: #8b949e !important; text-align: center !important;
                padding: 10px 0 !important; font-size: 11px !important;
                z-index: 2147483646 !important; border-top: 1px solid #333 !important;
            }
            .dm-universal-footer a { color: #58a6ff !important; text-decoration: none !important; margin: 0 10px !important; font-weight: bold !important;}
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    function createElements() {
        if (!document.getElementById('dm-legal-consent') && !sessionStorage.getItem('dm-accepted')) {
            const modal = document.createElement('div');
            modal.id = 'dm-legal-consent';
            modal.innerHTML = `
                <div class="dm-consent-box">
                    <h2>Rechtliche Bestätigung</h2>
                    <p>Projekt: <span class="dm-project-highlight">${projectName}</span></p>
                    <p>
                        <a href="https://dmamax.netlify.app/impressum" target="_blank" style="color:#58a6ff">Impressum</a> | 
                        <a href="https://dmamax.netlify.app/datenschutz" target="_blank" style="color:#58a6ff">Datenschutz</a>
                    </p>
                    <div style="text-align: left; background: #0d1117; padding: 15px; border-radius: 6px; border-left: 4px solid #58a6ff;">
                        <p style="font-size: 12px !important;">
                            • <b>Inhalte:</b> Daten werden dauerhaft gespeichert и öffentlich sichtbar.<br><br>
                            • <b>Haftung:</b> iFrame Inhalte (auch 18+) liegen nicht в Verantwortung des Betreibers.<br><br>
                            • <b>Verbot:</b> Rechtswidrige Inhalte sind streng untersagt.<br><br>
                            • <b>Datenschutz:</b> Sie akzeptieren Cookies/LocalStorage.
                        </p>
                    </div>
                    <p class="dm-warning-red">Bedingungen für ${projectName} akzeptieren?</p>
                    <div class="dm-btn-group">
                        <button class="dm-btn" id="accept-dm-legal">Ja, ich akzeptiere</button>
                        <button class="dm-btn dm-btn-secondary" onclick="window.location.href='https://google.com'">Nein</button>
                    </div>
                </div>`;
            document.documentElement.appendChild(modal);
            document.body?.classList.add('dm-lock-screen');

            document.getElementById('accept-dm-legal').onclick = function() {
                sessionStorage.setItem('dm-accepted', 'true');
                modal.remove();
                document.body?.classList.remove('dm-lock-screen');
                addFooter();
            };
        } else if (sessionStorage.getItem('dm-accepted')) {
            addFooter();
        }
    }

    function addFooter() {
        if (!document.querySelector('.dm-universal-footer')) {
            const footer = document.createElement('div');
            footer.className = 'dm-universal-footer';
            footer.innerHTML = `
                &copy; 2026 Maksym Didukh | ${contactEmail} | ${projectName} | 
                <a href="https://dmamax.netlify.app/impressum" target="_blank">Impressum</a> | 
                <a href="https://dmamax.netlify.app/datenschutz" target="_blank">Datenschutz</a>
            `;
            document.documentElement.appendChild(footer);
        }
    }

    // Запуск и защита от удаления
    createElements();
    const observer = new MutationObserver(() => {
        createElements();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

})();
