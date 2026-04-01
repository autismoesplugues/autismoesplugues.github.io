export function renderEmailLink(elementId, user, domain) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const email = `${user}@${domain}`;

    el.href = `mailto:${email}`;
}

export function renderBankIban(bankData) {
    const el = document.getElementById('iban-value');
    if (!el) return;

    el.textContent = bankData.iban;
}

export function copyBankData(bankData) {
    const text = bankData.iban;

    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text)
            .catch(() => fallbackCopy(text, bankData));
    } else {
        fallbackCopy(text, bankData);
    }
}

function fallbackCopy(text, bankData) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();

    try {
        const success = document.execCommand("copy");
        if (!success) throw new Error();
    } catch {
        alert(bankData.alertFail + text);
    }

    document.body.removeChild(textarea);
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
