export function copyBankData(bankData) {
    navigator.clipboard.writeText(bankData.text).then(() => {
        alert(bankData.alertSuccess);
    }).catch(() => {
        alert(bankData.alertFail + bankData.text);
    });
}

export function attachSmoothScrolling() {
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

    if (targetId === "#open-cookie-settings") {
        e.preventDefault();
        document.getElementById('cookiePanel').classList.add('active');
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

export function reinitializeDynamicListeners(copyBankDataCallback) {
    const copyBankBtn = document.querySelector('.donacion-btn');
    if (copyBankBtn) {
        copyBankBtn.onclick = null;
        copyBankBtn.addEventListener('click', copyBankDataCallback);
    }
    attachSmoothScrolling();
}
