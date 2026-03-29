export function initializeCookiePanel() {
    const cookiePanel = document.getElementById('cookiePanel');
    if (!localStorage.getItem('cookiesAccepted')) {
        cookiePanel.classList.add('active');
    }
}

export function setupCookiePanelListeners(getCookieContent) {
    const cookiePanel = document.getElementById('cookiePanel');
    
    document.getElementById('acceptCookies').addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'all');
        cookiePanel.classList.remove('active');
    });

    document.getElementById('rejectCookies').addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'none');
        cookiePanel.classList.remove('active');
    });

    document.getElementById('configureCookies').addEventListener('click', function() {
        const currentLang = document.documentElement.getAttribute('lang');
        alert(currentLang === 'es' ? 
            'Panel de configuración avanzada de cookies.\n\nEn una implementación real, aquí se mostrarían las opciones:\n- Cookies técnicas (siempre activas)\n- Cookies de preferencias\n- Cookies de estadísticas\n- Cookies de marketing' :
            'Panell de configuració avançada de galetes.\n\nEn una implementació real, aquí es mostrarien les opcions:\n- Galetes tècniques (sempre actives)\n- Galetes de preferències\n- Galetes d\'estadístiques\n- Galetes de màrqueting');
    });

    document.getElementById('open-cookie-settings').addEventListener('click', function(e) {
        e.preventDefault();
        cookiePanel.classList.add('active');
    });
}

export function updateCookiePanelContent(cookieContent) {
    document.querySelector('#cookiePanel p strong').textContent = cookieContent.title;
    document.querySelector('#cookiePanel p:nth-of-type(2)').textContent = cookieContent.text;
    document.getElementById('acceptCookies').textContent = cookieContent.accept;
    document.getElementById('configureCookies').textContent = cookieContent.configure;
    document.getElementById('rejectCookies').textContent = cookieContent.reject;
}
