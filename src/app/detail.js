import { getLang, initI18n, onLangChange, t } from "../i18n/i18n.js";
import { formatCompact, formatDate, isAvailableNow, screenArea } from "../lib/format.js";
import { getScreenById } from "../services/screens.js";
import { escapeHtml, mountChrome, toast, whatsappUrl } from "./ui.js";

let screen = null;

function renderNotFound() {
  const container = document.getElementById("detail");
  container.innerHTML = `<div class="empty">
    <h2>${t("detail.notFoundTitle")}</h2>
    <p>${t("detail.notFoundText")}</p>
    <a class="btn btn-primary" href="catalogo.html">${t("detail.back")}</a>
  </div>`;
}

function availabilityMarkup() {
  if (isAvailableNow(screen.availableFrom)) {
    return `<span class="badge badge-ok">${t("detail.availableNow")}</span>`;
  }

  return `<span class="badge badge-soon">${t("detail.availableFrom", {
    date: formatDate(screen.availableFrom),
  })}</span>`;
}

function renderDetail() {
  const container = document.getElementById("detail");
  const location = [screen.neighborhood, `${screen.city}/${screen.state}`]
    .filter(Boolean)
    .join(" · ");

  document.title = `${screen.name} — LedLink`;

  container.innerHTML = `<div class="detail">
    <div>
      <div class="detail-media">
        <span class="media-label">${t(`type.${screen.type}`)} · ${screen.widthM} × ${
    screen.heightM
  } m</span>
      </div>
      <p class="detail-note">${t("detail.demo")}</p>
    </div>

    <div>
      <div class="detail-head">
        <span class="badge badge-${screen.type}">${t(`type.${screen.type}`)}</span>
        ${availabilityMarkup()}
      </div>

      <h1>${escapeHtml(screen.name)}</h1>
      <p class="card-location">${escapeHtml(location)}</p>
      <p class="muted">${escapeHtml(screen.reference || "")}</p>

      <table class="specs-table">
        <caption class="visually-hidden">${t("detail.specsTitle")}</caption>
        <tbody>
          <tr><th scope="row">${t("detail.location")}</th><td>${escapeHtml(
    `${screen.neighborhood} · ${screen.city}/${screen.state}`
  )}</td></tr>
          <tr><th scope="row">${t("detail.size")}</th><td>${screen.widthM} × ${
    screen.heightM
  } m (${formatCompact(screenArea(screen), getLang())} m²)</td></tr>
          <tr><th scope="row">${t("detail.resolution")}</th><td>${screen.widthPx} × ${
    screen.heightPx
  } px</td></tr>
          <tr><th scope="row">${t("detail.audience")}</th><td>${formatCompact(
            screen.audiencePerDay,
            getLang()
          )} ${t("card.audience")}</td></tr>
          <tr><th scope="row">${t("detail.availability")}</th><td>${
            isAvailableNow(screen.availableFrom)
              ? t("detail.availableNow")
              : t("detail.availableFrom", { date: formatDate(screen.availableFrom) })
          }</td></tr>
          <tr><th scope="row">${t("detail.price")}</th><td>${t("detail.priceOnRequest")}</td></tr>
        </tbody>
      </table>

      <div class="detail-actions">
        <button class="btn btn-primary" type="button" id="interest">${t("detail.interest")}</button>
        <a class="btn btn-ghost" href="catalogo.html">${t("detail.back")}</a>
      </div>
      <p class="detail-note">${t("detail.interestNote")}</p>
    </div>
  </div>`;

  const interest = document.getElementById("interest");
  interest.addEventListener("click", () => {
    const url = whatsappUrl(screen);
    if (!url) {
      toast(t("toast.contactPending"));
      return;
    }
    window.open(url, "_blank", "noopener");
  });
}

function render() {
  mountChrome({ active: "catalog" });
  if (screen) renderDetail();
  else renderNotFound();
}

async function boot() {
  await initI18n();
  const id = new URLSearchParams(window.location.search).get("id");

  try {
    screen = id ? await getScreenById(id) : null;
  } catch (error) {
    console.error("[detail]", error);
    screen = null;
  }

  render();
  onLangChange(render);
}

boot().catch((error) => console.error("[detail]", error));
