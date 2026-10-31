/**
 * Internacionalização (pt-BR padrão, en secundário).
 *
 * Uso no HTML:
 *   <h1 data-i18n="chave.do.texto"></h1>
 *   <p data-i18n-html="chave.com.html"></p>
 *   <meta name="description" data-i18n-content="chave" />
 *   <input data-i18n-placeholder="chave" />
 *   <button data-i18n-aria="chave"></button>
 *
 * Uso no JS:
 *   import { t } from "../i18n/i18n.js";
 *   t("catalog.results", { count: 3 });
 */

const LANGS = ["pt-BR", "en"];
const DEFAULT_LANG = "pt-BR";
const STORAGE_KEY = "ledlink:lang";

let dict = {};
let current = DEFAULT_LANG;
const listeners = new Set();

export function getLang() {
  return current;
}

export function availableLangs() {
  return LANGS.slice();
}

export function t(key, vars) {
  const value = key
    .split(".")
    .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);

  if (typeof value !== "string") {
    if (typeof console !== "undefined") console.warn(`[i18n] chave ausente: ${key}`);
    return key;
  }

  if (!vars) return value;

  return value.replace(/\{(\w+)\}/g, (_, name) =>
    vars[name] !== undefined ? String(vars[name]) : ""
  );
}

async function loadDictionary(lang) {
  const url = new URL(`${lang}.json`, import.meta.url);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`[i18n] não foi possível carregar ${lang}`);
  return response.json();
}

function applyAttributes(root) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  root.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  root.querySelectorAll("[data-i18n-content]").forEach((el) => {
    el.setAttribute("content", t(el.dataset.i18nContent));
  });

  root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });

  root.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  root.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.dataset.i18nTitle));
  });
}

export function applyStatic(root = document) {
  document.documentElement.lang = current;
  applyAttributes(root);
}

function detectLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (LANGS.includes(saved)) return saved;

  const browser = (navigator.language || DEFAULT_LANG).toLowerCase();
  return browser.startsWith("en") ? "en" : DEFAULT_LANG;
}

export async function initI18n() {
  current = detectLang();
  dict = await loadDictionary(current);
  applyStatic();
  return current;
}

export async function setLang(lang) {
  if (!LANGS.includes(lang) || lang === current) return;
  current = lang;
  dict = await loadDictionary(lang);
  localStorage.setItem(STORAGE_KEY, lang);
  applyStatic();
  listeners.forEach((fn) => fn(lang));
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
