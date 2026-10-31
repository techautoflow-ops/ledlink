/**
 * Elementos compartilhados de interface: cabeçalho, rodapé, avisos e links de contato.
 */

import { CONFIG } from "../config.js";
import { availableLangs, getLang, setLang, t } from "../i18n/i18n.js";

const LOGO = `
  <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <rect x="1.5" y="1.5" width="29" height="29" rx="8" fill="none" stroke="#00E5FF" stroke-opacity=".55" stroke-width="2"/>
    <rect x="8" y="8" width="7" height="7" rx="1.5" fill="#00E5FF"/>
    <rect x="17" y="8" width="7" height="7" rx="1.5" fill="#00E5FF" fill-opacity=".35"/>
    <rect x="8" y="17" width="7" height="7" rx="1.5" fill="#FF2E88" fill-opacity=".35"/>
    <rect x="17" y="17" width="7" height="7" rx="1.5" fill="#FF2E88"/>
  </svg>`;

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function brandMarkup() {
  return `<a class="brand" href="index.html">
    ${LOGO}
    <span class="brand-name">Led<span class="brand-accent">Link</span></span>
  </a>`;
}

function navLink(href, key, isActive) {
  const current = isActive ? ' aria-current="page"' : "";
  return `<a href="${href}"${current}>${t(key)}</a>`;
}

function langToggleMarkup() {
  const current = getLang();
  const buttons = availableLangs()
    .map((lang) => {
      const label = lang === "pt-BR" ? "PT" : "EN";
      const pressed = lang === current ? "true" : "false";
      return `<button type="button" data-set-lang="${lang}" aria-pressed="${pressed}">${label}</button>`;
    })
    .join("");

  return `<div class="lang-toggle" role="group" aria-label="${t("nav.lang")}">${buttons}</div>`;
}

function headerMarkup(active) {
  return `<div class="container header-inner">
    ${brandMarkup()}
    <nav class="main-nav" aria-label="${t("nav.aria")}">
      ${navLink("catalogo.html", "nav.catalog", active === "catalog")}
      ${navLink("index.html#como-funciona", "nav.how", active === "how")}
      ${navLink("index.html#para-donos", "nav.owners", active === "owners")}
    </nav>
    <div class="header-actions">
      ${langToggleMarkup()}
      <a class="btn btn-primary btn-sm" href="catalogo.html">${t("nav.cta")}</a>
    </div>
  </div>`;
}

function footerMarkup() {
  return `<div class="container footer-grid">
    <div>
      ${brandMarkup()}
      <p>${t("footer.tagline")}</p>
    </div>
    <div>
      <h3>${t("footer.product")}</h3>
      <ul class="footer-links">
        <li><a href="catalogo.html">${t("footer.catalog")}</a></li>
        <li><a href="index.html#como-funciona">${t("footer.how")}</a></li>
        <li><a href="index.html#para-donos">${t("footer.owners")}</a></li>
      </ul>
    </div>
    <div>
      <h3>${t("footer.legal")}</h3>
      <p>${t("footer.legalNote")}</p>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>${t("footer.rights", { year: new Date().getFullYear() })}</span>
    <span>${t("footer.demo")}</span>
  </div>`;
}

export function mountChrome({ active } = {}) {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header) {
    header.className = "site-header";
    header.innerHTML = headerMarkup(active);
    header.querySelectorAll("[data-set-lang]").forEach((button) => {
      button.addEventListener("click", () => setLang(button.dataset.setLang));
    });
  }

  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = footerMarkup();
  }
}

let toastTimer = null;

export function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  if (toastTimer) clearTimeout(toastTimer);

  const element = document.createElement("div");
  element.className = "toast";
  element.setAttribute("role", "status");
  element.textContent = message;
  document.body.appendChild(element);

  toastTimer = setTimeout(() => element.remove(), 5200);
}

export function whatsappUrl(screen) {
  const number = String(CONFIG.whatsappNumber || "").replace(/\D/g, "");
  if (!number) return null;

  const message = t("detail.interestMessage", {
    name: screen.name,
    city: screen.city,
  });

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function contactUrl() {
  if (CONFIG.contactEmail) return `mailto:${CONFIG.contactEmail}`;
  return null;
}
