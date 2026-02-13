// === Config básico ===
// IMPORTANTE: poné el teléfono con código país para WhatsApp (Argentina: 54 + área + número)
// Ejemplo: +54 3465 481345 -> "543465481345"
const PHONE_E164 = "543465481345";
const PHONE_PRETTY = "3465 481345";
const DEFAULT_MESSAGE = "Hola! Quisiera cotizar matafuegos y recargas. ¿Me pasás precios y disponibilidad?";

function waLink(text) {
  const msg = encodeURIComponent(text);
  return `https://wa.me/${PHONE_E164}?text=${msg}`;
}

function setLinks() {
  const waCta = document.getElementById("waCta");
  const waContact = document.getElementById("waContact");
  const waFloat = document.getElementById("waFloat");
  const stampPhone = document.getElementById("stampPhone");
  const year = document.getElementById("year");
  const phoneLink = document.getElementById("phoneLink");
  const heroLogoLink = document.getElementById("heroLogoLink");

  if (waCta) waCta.href = waLink(DEFAULT_MESSAGE);
  if (waContact) waContact.href = waLink(DEFAULT_MESSAGE);
  if (waFloat) waFloat.href = waLink(DEFAULT_MESSAGE);
  if (stampPhone) stampPhone.textContent = PHONE_PRETTY;
  if (phoneLink) phoneLink.href = `tel:+${PHONE_E164}`;
  if (year) year.textContent = new Date().getFullYear();
  if (heroLogoLink) heroLogoLink.href = waLink(DEFAULT_MESSAGE);
}

function bindProductButtons() {
  document.querySelectorAll("button[data-product]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.getAttribute("data-product");
      const text = `Hola! Quisiera consultar por: ${product}. ¿Precio y disponibilidad?`;
      window.open(waLink(text), "_blank", "noopener");
    });
  });
}

function bindQuickForm() {
  const send = document.getElementById("sendMsg");
  if (!send) return;

  send.addEventListener("click", () => {
    const name = (document.getElementById("name")?.value || "").trim();
    const msg = (document.getElementById("msg")?.value || "").trim();

    const text =
      `Hola! ${name ? "Soy " + name + ". " : ""}` +
      (msg ? msg : DEFAULT_MESSAGE);

    window.open(waLink(text), "_blank", "noopener");
  });
}

setLinks();
bindProductButtons();
bindQuickForm();

// Scroll Reveal
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .feature-item, .hero__content, .hero__image').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

