/** Utilitários de formatação — sempre no padrão brasileiro para data e moeda. */

const LOCALES = { "pt-BR": "pt-BR", en: "en-US" };

function localeOf(lang) {
  return LOCALES[lang] || "pt-BR";
}

export function formatNumber(value, lang) {
  return new Intl.NumberFormat(localeOf(lang)).format(value);
}

export function formatCompact(value, lang) {
  return new Intl.NumberFormat(localeOf(lang), {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** ISO (aaaa-mm-dd) → dd/mm/aaaa */
export function formatDate(iso) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

export function isAvailableNow(iso) {
  if (!iso) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${iso}T00:00:00`) <= today;
}

export function screenArea(screen) {
  return screen.widthM * screen.heightM;
}
