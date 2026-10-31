import { initI18n } from "../i18n/i18n.js";
import { mountChrome } from "./ui.js";

async function boot() {
  await initI18n();
  mountChrome({});
}

boot().catch((error) => console.error("[not-found]", error));
