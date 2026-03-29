// Cookie panel logic
const cookiePanel = document.getElementById('cookiePanel');

if (!localStorage.getItem('cookiesAccepted')) {
    cookiePanel.classList.add('active');
}

document.getElementById('acceptCookies').addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'all');
    cookiePanel.classList.remove('active');
});

document.getElementById('rejectCookies').addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'none');
    cookiePanel.classList.remove('active');
});

document.getElementById('configureCookies').addEventListener('click', function() {
    alert('Panel de configuración avanzada de cookies.\n\nEn una implementación real, aquí se mostrarían las opciones:\n- Cookies técnicas (siempre activas)\n- Cookies de preferencias\n- Cookies de estadísticas\n- Cookies de marketing');
});

document.getElementById('open-cookie-settings').addEventListener('click', function(e) {
    e.preventDefault();
    cookiePanel.classList.add('active');
});

// SMOOTH SCROLLING CON OFFSET PARA COMPENSAR EL HEADER FIJO
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();

            // Altura del header fijo (puedes ajustar este valor según tu header)
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // 20px de margen extra

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Function to copy bank data
function copyBankData() {
    const bankText = "IBAN: ES21 0128 0456 7890 1234 5678\nCuenta: 0128-0456-78-0123456789\nTitular: Asociación ANE\nConcepto: Donación ANE";
    navigator.clipboard.writeText(bankText).then(() => {
        alert("Datos bancarios copiados al portapapeles");
    }).catch(() => {
        alert("No se pudo copiar automáticamente. Los datos son:\n" + bankText);
    });
}

window.copyBankData = copyBankData;
