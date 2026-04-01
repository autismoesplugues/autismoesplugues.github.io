export function updateHeaderNavLinks(lang) {
    const navLinks = document.querySelectorAll('nav ul li a');
    const navItems = {
        'quienes-somos': { es: 'Quiénes somos', ca: 'Qui som' },
        'historia': { es: 'Historia', ca: 'Història' },
        'servicios': { es: 'Servicios', ca: 'Serveis' },
        'apoyo': { es: 'Apóyanos', ca: 'Dona suport' },
        'voluntariado': { es: 'Voluntariado', ca: 'Voluntariat' },
        'sede': { es: 'Nuestra sede', ca: 'La nostra seu' },
        'contacto': { es: 'Contacto', ca: 'Contacte' }
    };
    navLinks.forEach(link => {
        const id = link.getAttribute('href').substring(1);
        if (navItems[id]) {
            link.textContent = navItems[id][lang];
        }
    });

    const logoP = document.querySelector('.logo p');
    if (logoP) {
        logoP.textContent = lang === 'es' ? 'Asociación Autismo y Neurodiversidad Esplugues' : 'Associació Autisme i Neurodiversitat Esplugues';
    }
}

export function updateFooterNavLinks(lang) {
    const footerNavItems = {
        'quienes-somos': { es: 'Quiénes somos', ca: 'Qui som' },
        'historia': { es: 'Historia', ca: 'Història' },
        'servicios': { es: 'Servicios', ca: 'Serveis' },
        'apoyo': { es: 'Apóyanos', ca: 'Dona suport' },
        'voluntariado': { es: 'Voluntariado', ca: 'Voluntariat' },
        'sede': { es: 'Nuestra sede', ca: 'La nostra seu' },
        'contacto': { es: 'Contacto', ca: 'Contacte' },
        'aviso-legal': { es: 'Aviso legal', ca: 'Avís legal' },
        'politica-privacidad': { es: 'Política de privacidad', ca: 'Política de privacitat' },
        'politica-cookies': { es: 'Política de cookies', ca: 'Política de galetes' },
        'subvenciones-text': {
            es: 'Proyecto subvencionado por el Ayuntamiento de Esplugues de Llobregat y la Diputación de Barcelona.',
            ca: 'Projecte subvencionat per l\'Ajuntament d\'Esplugues de Llobregat i la Diputació de Barcelona.'
        },
        'copyright-text': {
            es: '© 2026 Asociación Autismo y Neurodiversidad Esplugues (ANE). Todos los derechos reservados.',
            ca: '© 2026 Associació Autisme i Neurodiversitat Esplugues (ANE). Tots els drets reservats.'
        }
    };

    document.querySelectorAll('footer .footer-section:nth-child(2) p a').forEach(link => {
        const id = link.getAttribute('href').substring(1);
        if (footerNavItems[id]) {
            link.textContent = footerNavItems[id][lang];
        }
    });

    document.querySelector('footer .footer-section:nth-child(3) p:nth-child(2) a').textContent = footerNavItems['aviso-legal'][lang];
    document.querySelector('footer .footer-section:nth-child(3) p:nth-child(3) a').textContent = footerNavItems['politica-privacidad'][lang];
    document.querySelector('footer .footer-section:nth-child(3) p:nth-child(4) a').textContent = footerNavItems['politica-cookies'][lang];

    document.querySelector('footer .footer-section:nth-child(4) p').textContent = footerNavItems['subvenciones-text'][lang];

    document.querySelector('footer .footer-bottom p').textContent = footerNavItems['copyright-text'][lang];
}

export function updateOtherStaticElements(lang) {
    const logoP = document.querySelector('.logo p');
    if (logoP) {
        logoP.textContent = lang === 'es' ? 'Asociación Autismo y Neurodiversidad Esplugues' : 'Associació Autisme i Neurodiversitat Esplugues';
    }

    const footerTitle = document.querySelector('footer .footer-section:first-child h4');
    if (footerTitle) {
        footerTitle.textContent = 'ANE';
    }

    const footerDesc = document.querySelector('footer .footer-section:first-child p:nth-child(2)');
    if (footerDesc) {
        footerDesc.textContent = lang === 'es' ? 'Autismo y Neurodiversidad Esplugues' : 'Autisme i Neurodiversitat Esplugues';
    }

    const footerDesc2 = document.querySelector('footer .footer-section:first-child p:nth-child(3)');
    if (footerDesc2) {
        footerDesc2.textContent = lang === 'es' ? 'Trabajando por una comunidad más inclusiva.' : 'Treballant per una comunitat més inclusiva.';
    }

    const footerQuickLinksTitle = document.querySelector('footer .footer-section:nth-child(2) h4');
    if (footerQuickLinksTitle) {
        footerQuickLinksTitle.textContent = lang === 'es' ? 'Enlaces rápidos' : 'Enllaços ràpids';
    }

    const footerLegalTitle = document.querySelector('footer .footer-section:nth-child(3) h4');
    if (footerLegalTitle) {
        footerLegalTitle.textContent = lang === 'es' ? 'Legal' : 'Legal';
    }

    const footerGrantsTitle = document.querySelector('footer .footer-section:nth-child(4) h4');
    if (footerGrantsTitle) {
        footerGrantsTitle.textContent = lang === 'es' ? 'Subvenciones' : 'Subvencions';
    }
}
