import { sectionsOrder } from '../config/sections-order.js';
import { cookiePanelContent, bankData } from '../config/translations.js';

let currentLang = localStorage.getItem('ane_lang') || 'es';
const htmlElement = document.documentElement;
const langButtons = document.querySelectorAll('.lang-btn');

export async function loadSection(sectionId, lang, mainContent) {
    try {
        const response = await fetch(`sections/${lang}/${sectionId}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load section ${sectionId} for language ${lang}: ${response.statusText}`);
        }
        const html = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const sectionElement = tempDiv.firstElementChild;
        
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

export async function loadAllSections(lang, mainContent) {
    mainContent.innerHTML = '';
    for (const sectionId of sectionsOrder) {
        await loadSection(sectionId, lang, mainContent);
    }
}

export function setLanguage(lang) {
    if (currentLang === lang) return;

    currentLang = lang;
    localStorage.setItem('ane_lang', lang);
    htmlElement.setAttribute('lang', lang);

    langButtons.forEach(button => {
        if (button.dataset.lang === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    return currentLang;
}

export function getCurrentLang() {
    return currentLang;
}

export function getBankData() {
    return bankData[currentLang];
}

export function getCookieContent() {
    return cookiePanelContent[currentLang];
}
