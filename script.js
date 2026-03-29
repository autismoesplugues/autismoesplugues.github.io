// --- Language and Section Loading Logic ---
const mainContent = document.getElementById('main-content');
const langButtons = document.querySelectorAll('.lang-btn');
const navLinks = document.querySelectorAll('nav ul li a');
const htmlElement = document.documentElement; // Get the HTML element

// Define sections and their order
const sectionsOrder = [
    'quienes-somos',
    'historia',
    'servicios',
    'apoyo', // Note: 'apoyo' also includes the sticker-container in its HTML file.
    'voluntariado',
    'sede',
    'contacto'
];

// Content for cookie panel based on language
const cookiePanelContent = {
    es: {
        title: "Política de Cookies",
        text: "Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación, analizar el uso de la web y mostrarte contenido relacionado con tus preferencias. Puedes configurar o rechazar las cookies mediante el panel de configuración.",
        accept: "Aceptar todas",
        configure: "Configurar",
        reject: "Rechazar todas"
    },
    ca: {
        title: "Política de Galetes",
        text: "Utilitzem galetes pròpies i de tercers per millorar la teva experiència de navegació, analitzar l'ús del web i mostrar-te contingut relacionat amb les teves preferències. Pots configurar o rebutjar les galetes mitjançant el panell de configuració.",
        accept: "Acceptar totes",
        configure: "Configurar",
        reject: "Rebutjar totes"
    }
};

// Bank data for copy function based on language
const bankData = {
    es: {
        text: "IBAN: ES21 0128 0456 7890 1234 5678\nCuenta: 0128-0456-78-0123456789\nTitular: Asociación ANE\nConcepto: Donación ANE",
        alertSuccess: "Datos bancarios copiados al portapapeles",
        alertFail: "No se pudo copiar automáticamente. Los datos son:\n"
    },
    ca: {
        text: "IBAN: ES21 0128 0456 7890 1234 5678\nCompte: 0128-0456-78-0123456789\nTitular: Associació ANE\nConcepte: Donació ANE",
        alertSuccess: "Dades bancàries copiades al porta-retalls",
        alertFail: "No s'ha pogut copiar automàticament. Les dades són:\n"
    }
};

let currentLang = localStorage.getItem('ane_lang') || 'es'; // Default to Spanish

/**
 * Loads a single section's HTML content into the main content area.
 * @param {string} sectionId - The ID of the section to load (e.g., 'quienes-somos').
 * @param {string} lang - The language to load ('es' or 'ca').
 */
async function loadSection(sectionId, lang) {
    try {
        const response = await fetch(`sections/${lang}/${sectionId}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load section ${sectionId} for language ${lang}: ${response.statusText}`);
        }
        const html = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const sectionElement = tempDiv.firstElementChild; // Assuming each file contains a single <section>
        
        // Append section in correct order
        const targetSectionIndex = sectionsOrder.indexOf(sectionId);
        let inserted = false;
        for (let i = 0; i < mainContent.children.length; i++) {
            const existingSectionId = mainContent.children[i].id;
            const existingSectionIndex = sectionsOrder.indexOf(existingSectionId);
            if (existingSectionIndex > targetSectionIndex) {
                mainContent.insertBefore(sectionElement, mainContent.children[i]);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            mainContent.appendChild(sectionElement);
        }

    } catch (error) {
        console.error(error);
        mainContent.innerHTML += `<p>Error loading ${sectionId} content.</p>`;
    }
}

/**
 * Loads all sections for the given language.
 * @param {string} lang - The language to load ('es' or 'ca').
 */
async function loadAllSections(lang) {
    mainContent.innerHTML = ''; // Clear existing content
    for (const sectionId of sectionsOrder) {
        await loadSection(sectionId, lang);
    }
    // After loading all sections, re-attach event listeners that might be on dynamic content
    reinitializeDynamicListeners();
    updateHeaderNavLinks(lang);
    updateFooterNavLinks(lang);
    updateCookiePanelContent(lang);
    updateOtherStaticElements(lang);
}

function updateHeaderNavLinks(lang) {
    const navItems = {
        'quienes-somos': { es: 'Quiénes somos', ca: 'Qui som' },
        'historia': { es: 'Historia', ca: 'Història' },
        'servicios': { es: 'Servicios', ca: 'Serveis' },
        'apoyo': { es: 'Apóyanos', ca: 'Dona suport' },
        'voluntariado': { es: 'Voluntariado', ca: 'Voluntariat' },
        'sede': { es: '📌 Nuestra sede', ca: '📌 La nostra seu' },
        'contacto': { es: 'Contacto', ca: 'Contacte' }
    };
    navLinks.forEach(link => {
        const id = link.getAttribute('href').substring(1); // Remove '#'
        if (navItems[id]) {
            link.textContent = navItems[id][lang];
        }
    });

    // Update main logo description
    const logoP = document.querySelector('.logo p');
    if (logoP) {
        logoP.textContent = lang === 'es' ? 'Asociación Autismo y Neurodiversidad Esplugues' : 'Associació Autisme i Neurodiversitat Esplugues';
    }
}

function updateFooterNavLinks(lang) {
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

    // Quick links in footer
    document.querySelectorAll('footer .footer-section:nth-child(2) p a').forEach(link => {
        const id = link.getAttribute('href').substring(1);
        if (footerNavItems[id]) {
            link.textContent = footerNavItems[id][lang];
        }
    });

    // Legal links in footer
    // Note: The original HTML had generic href="#" for legal links. If these link to specific static files,
    // those files would also need language versions or dynamic content. For now, we only update text.
    document.querySelector('footer .footer-section:nth-child(3) p:nth-child(2) a').textContent = footerNavItems['aviso-legal'][lang];
    document.querySelector('footer .footer-section:nth-child(3) p:nth-child(3) a').textContent = footerNavItems['politica-privacidad'][lang];
    document.querySelector('footer .footer-section:nth-child(3) p:nth-child(4) a').textContent = footerNavItems['politica-cookies'][lang];

    // Subvenciones text
    document.querySelector('footer .footer-section:nth-child(4) p').textContent = footerNavItems['subvenciones-text'][lang];

    // Copyright text
    document.querySelector('footer .footer-bottom p').textContent = footerNavItems['copyright-text'][lang];
}


function updateCookiePanelContent(lang) {
    const content = cookiePanelContent[lang];
    document.querySelector('#cookiePanel p strong').textContent = content.title;
    document.querySelector('#cookiePanel p:nth-of-type(2)').textContent = content.text;
    document.getElementById('acceptCookies').textContent = content.accept;
    document.getElementById('configureCookies').textContent = content.configure;
    document.getElementById('rejectCookies').textContent = content.reject;
}

function updateOtherStaticElements(lang) {
    // Update header logo <p> tag
    const logoP = document.querySelector('.logo p');
    if (logoP) {
        logoP.textContent = lang === 'es' ? 'Asociación Autismo y Neurodiversidad Esplugues' : 'Associació Autisme i Neurodiversitat Esplugues';
    }
    // Update footer h4 title
    const footerTitle = document.querySelector('footer .footer-section:first-child h4');
    if (footerTitle) {
        footerTitle.textContent = 'ANE'; // Stays the same, but good to check
    }
    // Update footer first description
    const footerDesc = document.querySelector('footer .footer-section:first-child p:nth-child(2)');
    if (footerDesc) {
        footerDesc.textContent = lang === 'es' ? 'Autismo y Neurodiversidad Esplugues' : 'Autisme i Neurodiversitat Esplugues';
    }
    // Update footer second description
    const footerDesc2 = document.querySelector('footer .footer-section:first-child p:nth-child(3)');
    if (footerDesc2) {
        footerDesc2.textContent = lang === 'es' ? 'Trabajando por una comunidad más inclusiva.' : 'Treballant per una comunitat més inclusiva.';
    }
    // Update footer quick links title
    const footerQuickLinksTitle = document.querySelector('footer .footer-section:nth-child(2) h4');
    if (footerQuickLinksTitle) {
        footerQuickLinksTitle.textContent = lang === 'es' ? 'Enlaces rápidos' : 'Enllaços ràpids';
    }
    // Update footer legal title
    const footerLegalTitle = document.querySelector('footer .footer-section:nth-child(3) h4');
    if (footerLegalTitle) {
        footerLegalTitle.textContent = lang === 'es' ? 'Legal' : 'Legal';
    }
    // Update footer grants title
    const footerGrantsTitle = document.querySelector('footer .footer-section:nth-child(4) h4');
    if (footerGrantsTitle) {
        footerGrantsTitle.textContent = lang === 'es' ? 'Subvenciones' : 'Subvencions';
    }
}


/**
 * Sets the active language and reloads content.
 * @param {string} lang - The language to set ('es' or 'ca').
 */
function setLanguage(lang) {
    if (currentLang === lang) return; // No change needed

    currentLang = lang;
    localStorage.setItem('ane_lang', lang);
    htmlElement.setAttribute('lang', lang); // Update lang attribute of <html>

    langButtons.forEach(button => {
        if (button.dataset.lang === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    loadAllSections(lang);
}

// Event listeners for language switcher buttons
langButtons.forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

// Initial load: Set language and load all sections
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});

// --- Cookie panel logic ---
const cookiePanel = document.getElementById('cookiePanel');

function initializeCookiePanel() {
    if (!localStorage.getItem('cookiesAccepted')) {
        cookiePanel.classList.add('active');
    }
}

// Attach event listeners using event delegation for dynamically loaded content where needed
function reinitializeDynamicListeners() {
    // Ensure copyBankData button listener is active
    const copyBankBtn = document.querySelector('.donacion-btn');
    if (copyBankBtn) {
        copyBankBtn.onclick = null; // Remove old listener if exists
        copyBankBtn.addEventListener('click', copyBankData);
    }
    // Re-attach smooth scrolling listeners
    attachSmoothScrolling();
}


// Function to copy bank data
function copyBankData() {
    const data = bankData[currentLang];
    navigator.clipboard.writeText(data.text).then(() => {
        alert(data.alertSuccess);
    }).catch(() => {
        alert(data.alertFail + data.text);
    });
}

window.copyBankData = copyBankData; // Make it globally accessible for inline onclick (though delegation is preferred)


// --- SMOOTH SCROLLING WITH OFFSET FOR FIXED HEADER ---
function attachSmoothScrolling() {
    // Remove existing listeners to avoid duplicates on re-initialization
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

function handleSmoothScroll(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;

    // Special case for cookie settings link
    if (targetId === "#open-cookie-settings") {
        e.preventDefault();
        cookiePanel.classList.add('active');
        return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        e.preventDefault();

        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang); // This will call loadAllSections and reinitializeDynamicListeners
    initializeCookiePanel();
});


// Cookie panel event listeners (these are on static elements, so they don't need re-attaching)
document.getElementById('acceptCookies').addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'all');
    cookiePanel.classList.remove('active');
});

document.getElementById('rejectCookies').addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'none');
    cookiePanel.classList.remove('active');
});

document.getElementById('configureCookies').addEventListener('click', function() {
    alert(currentLang === 'es' ? 
          'Panel de configuración avanzada de cookies.\n\nEn una implementación real, aquí se mostrarían las opciones:\n- Cookies técnicas (siempre activas)\n- Cookies de preferencias\n- Cookies de estadísticas\n- Cookies de marketing' :
          'Panell de configuració avançada de galetes.\n\nEn una implementació real, aquí es mostrarien les opcions:\n- Galetes tècniques (sempre actives)\n- Galetes de preferències\n- Galetes d\'estadístiques\n- Galetes de màrqueting');
});

document.getElementById('open-cookie-settings').addEventListener('click', function(e) {
    e.preventDefault();
    cookiePanel.classList.add('active');
});
