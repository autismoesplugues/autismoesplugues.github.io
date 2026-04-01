import * as LanguageManager from './modules/language-manager.js';
import * as Navigation from './modules/navigation.js';
import * as Cookies from './modules/cookies.js';
import * as Utils from './modules/utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const mainContent = document.getElementById('main-content');
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Initialize language
    const currentLang = LanguageManager.getCurrentLang();
    document.documentElement.setAttribute('lang', currentLang);
    
    // Set active language button
    langButtons.forEach(button => {
        if (button.dataset.lang === currentLang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Load initial content
    await LanguageManager.loadAllSections(currentLang, mainContent);
    
    // Update navigation
    Navigation.updateHeaderNavLinks(currentLang);
    Navigation.updateFooterNavLinks(currentLang);
    Navigation.updateOtherStaticElements(currentLang);
    
    // Update cookie panel
    Cookies.updateCookiePanelContent(LanguageManager.getCookieContent());
    
    // Setup cookie panel
    Cookies.initializeCookiePanel();
    Cookies.setupCookiePanelListeners(LanguageManager.getCookieContent);
    
    // Setup smooth scrolling
    Utils.attachSmoothScrolling();
    
    // Reinitialize dynamic listeners
    Utils.reinitializeDynamicListeners(() => {
        Utils.copyBankData(LanguageManager.getBankData());
    });

    // Render bank data
    Utils.renderBankIban(LanguageManager.getBankData());
    Utils.renderEmailLink("email-link", "autismoneurodiesplugues", "gmail.com");
    
    // Language switcher event listeners
    langButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const newLang = button.dataset.lang;
            const lang = LanguageManager.setLanguage(newLang);
            
            // Reload content for new language
            await LanguageManager.loadAllSections(newLang, mainContent);
            
            // Update navigation
            Navigation.updateHeaderNavLinks(newLang);
            Navigation.updateFooterNavLinks(newLang);
            Navigation.updateOtherStaticElements(newLang);

            // Render bank data
            Utils.renderBankIban(LanguageManager.getBankData());

            // Update cookie panel
            Cookies.updateCookiePanelContent(LanguageManager.getCookieContent());
            
            // Reinitialize dynamic listeners
            Utils.reinitializeDynamicListeners(() => {
                Utils.copyBankData(LanguageManager.getBankData());
            });
        });
    });
});
