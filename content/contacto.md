---
section: "contact"
title: "Contacto | Asociación Autismo y Neurodiversidad Esplugues"
lang: es
css: "styles.css"
---

## Contacto

Puedes contactarnos a través de las siguientes vías:

[![Email](images/email.svg)](mailto:autismoneurodiesplugues@gmail.com)
[![Instagram](images/Instagram.svg)](https://www.instagram.com/autismo_neurodiv_esplugues)

o directamente mediante el formulario:

```{=html}
<div class="form-container">
    <h2>Formulario de contacto</h2>
    <form id="contactForm" action="https://api.web3forms.com/submit" method="POST">
        <input type="hidden" name="access_key" value="cb8f9c5f-ed05-4059-8076-d3b91b8641ba">
        <input type="hidden" name="redirect" value="https://web3forms.com/success">
        <input type="hidden" name="subject" value="New message from website">
        <input type="hidden" name="from_name" value="Autismo esplugues">
        <div class="form-group">
            <label for="name">Nombre completo</label>
            <input type="text" id="name" name="name" autocomplete="on" required>
        </div>
        <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" name="email" autocomplete="on" required>
        </div>
        <div class="form-group">
            <label for="subject">Asunto</label>
            <input type="text" id="subject" name="subject" required>
        </div>
        <div class="form-group">
            <label for="message">Mensaje</label>
            <textarea id="message" name="message" required placeholder="Escriba su mensaje..."></textarea>
        </div>
        <input type="checkbox" name="botcheck" style="display: none;">
        <button type="submit" class="submit-btn">Enviar mensaje</button>
    </form>
</div>
```
