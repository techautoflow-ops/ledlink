import { getLang, initI18n, onLangChange, t } from "../i18n/i18n.js";
import { formatCompact, screenArea } from "../lib/format.js";
import { filterScreens, getAllScreens, listCities } from "../services/screens.js";
import { escapeHtml, mountChrome } from "./ui.js";

let screens = [];

const filters = {
  q: "",
  city: "",
  type: "",
  size: "",
  audience: "",
};

const els = {};

function cacheElements() {
  els.q = document.getElementById("q");
  els.city = document.getElementById("city");
  els.type = document.getElementById("type");
  els.size = document.getElementById("size");
  els.audience = document.getElementById("audience");
  els.clear = document.getElementById("clear");
  els.clearEmpty = document.getElementById("clear-empty");
  els.results = document.getElementById("results");
  els.grid = document.getElementById("grid");
  els.empty = document.getElementById("empty");
}

function option(value, label, selected) {
  return `<option value="${escapeHtml(value)}"${selected ? " selected" : ""}>${escapeHtml(
    label
  )}</option>`;
}

function fillSelects() {
  els.city.innerHTML =
    option("", t("catalog.optionAll"), filters.city === "") +
    listCities(screens)
      .map((city) => option(city, city, filters.city === city))
      .join("");

  els.type.innerHTML =
    option("", t("catalog.optionAllTypes"), filters.type === "") +
    option("outdoor", t("type.outdoor"), filters.type === "outdoor") +
    option("indoor", t("type.indoor"), filters.type === "indoor");

  els.size.innerHTML =
    option("", t("catalog.sizeAny"), filters.size === "") +
    option("small", t("catalog.sizeSmall"), filters.size === "small") +
    option("medium", t("catalog.sizeMedium"), filters.size === "medium") +
    option("large", t("catalog.sizeLarge"), filters.size === "large");

  els.audience.innerHTML =
    option("", t("catalog.audienceAny"), filters.audience === "") +
    option("low", t("catalog.audienceLow"), filters.audience === "low") +
    option("mid", t("catalog.audienceMid"), filters.audience === "mid") +
    option("high", t("catalog.audienceHigh"), filters.audience === "high");
}

function cardMarkup(screen) {
  const lang = getLang();
  const area = screenArea(screen);
  const location = [screen.neighborhood, `${screen.city}/${screen.state}`]
    .filter(Boolean)
    .join(" · ");

  return `<a class="card" href="tela.html?id=${encodeURIComponent(screen.id)}">
    <div class="card-media">
      <span class="badge badge-${screen.type}">${t(`type.${screen.type}`)}</span>
      <span class="media-label">${screen.widthM} × ${screen.heightM} m</span>
    </div>
    <div class="card-body">
      <h3>${escapeHtml(screen.name)}</h3>
      <p class="card-location">${escapeHtml(location)}</p>
      <p class="card-specs">
        <span class="chip">${screen.widthPx} × ${screen.heightPx} px</span>
        <span class="chip">${formatCompact(area, lang)} m²</span>
      </p>
      <div class="card-footer">
        <span class="audience">
          <strong>${formatCompact(screen.audiencePerDay, lang)}</strong>
          ${t("card.audience")}
        </span>
        <span class="btn btn-ghost btn-sm">${t("card.view")}</span>
      </div>
    </div>
  </a>`;
}

function renderResults() {
  const results = filterScreens(screens, filters);
  const hasResults = results.length > 0;

  els.results.textContent =
    results.length === 1
      ? t("catalog.resultsOne")
      : t("catalog.results", { count: results.length });

  els.grid.innerHTML = results.map(cardMarkup).join("");
  els.grid.hidden = !hasResults;
  els.empty.hidden = hasResults;
}

function renderAll() {
  mountChrome({ active: "catalog" });
  fillSelects();
  renderResults();
}

function readInputs() {
  filters.q = els.q.value;
  filters.city = els.city.value;
  filters.type = els.type.value;
  filters.size = els.size.value;
  filters.audience = els.audience.value;
}

function clearFilters() {
  filters.q = "";
  filters.city = "";
  filters.type = "";
  filters.size = "";
  filters.audience = "";

  els.q.value = "";
  els.city.value = "";
  els.type.value = "";
  els.size.value = "";
  els.audience.value = "";

  renderResults();
  els.q.focus();
}

function bindEvents() {
  els.q.addEventListener("input", () => {
    readInputs();
    renderResults();
  });

  [els.city, els.type, els.size, els.audience].forEach((select) => {
    select.addEventListener("change", () => {
      readInputs();
      renderResults();
    });
  });

  els.clear.addEventListener("click", clearFilters);
  els.clearEmpty.addEventListener("click", clearFilters);
}

async function boot() {
  await initI18n();
  cacheElements();

  try {
    screens = await getAllScreens();
  } catch (error) {
    console.error("[catalog]", error);
    els.results.textContent = t("catalog.emptyText");
    return;
  }

  renderAll();
  bindEvents();
  onLangChange(renderAll);
}

boot().catch((error) => console.error("[catalog]", error));
