import { getLang, initI18n, onLangChange, t } from "../i18n/i18n.js";
import { formatCompact, formatNumber } from "../lib/format.js";
import { getAllScreens } from "../services/screens.js";
import { mountChrome, toast } from "./ui.js";

let screens = [];

function renderStats() {
  const container = document.getElementById("hero-stats");
  if (!container) return;

  const lang = getLang();
  const cities = new Set(screens.map((screen) => screen.city));
  const audience = screens.reduce((total, screen) => total + screen.audiencePerDay, 0);

  container.innerHTML = `
    <div>
      <dt>${t("stats.screens")}</dt>
      <dd>${formatNumber(screens.length, lang)}</dd>
    </div>
    <div>
      <dt>${t("stats.cities")}</dt>
      <dd>${formatNumber(cities.size, lang)}</dd>
    </div>
    <div>
      <dt>${t("stats.audience")}</dt>
      <dd>${formatCompact(audience, lang)}</dd>
    </div>`;
}

function render() {
  mountChrome({ active: "home" });
  renderStats();
}

function bindOwnerCta() {
  const button = document.querySelector('[data-action="owner-signup"]');
  if (!button) return;

  button.addEventListener("click", () => {
    toast(t("toast.signupPending"));
  });
}

async function boot() {
  await initI18n();
  screens = await getAllScreens();
  render();
  bindOwnerCta();
  onLangChange(render);
}

boot().catch((error) => console.error("[home]", error));
