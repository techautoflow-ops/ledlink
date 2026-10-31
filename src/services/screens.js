/**
 * Camada ÚNICA de acesso aos dados das telas.
 *
 * Fase 1a: lê o arquivo local `src/data/screens.json`.
 * Fase 1b: este é o ÚNICO arquivo que muda — passa a consultar o backend.
 *
 * Nenhuma página deve importar o JSON diretamente.
 */

import { screenArea } from "../lib/format.js";

const DATA_URL = new URL("../data/screens.json", import.meta.url);

let cache = null;

export async function getAllScreens() {
  if (cache) return cache;

  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(`Não foi possível carregar as telas (HTTP ${response.status})`);
  }

  cache = await response.json();
  return cache;
}

export async function getScreenById(id) {
  const screens = await getAllScreens();
  return screens.find((screen) => screen.id === id) || null;
}

export function listCities(screens) {
  return [...new Set(screens.map((screen) => screen.city))].sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );
}

function sizeBand(screen) {
  const area = screenArea(screen);
  if (area < 15) return "small";
  if (area <= 40) return "medium";
  return "large";
}

function audienceBand(screen) {
  const audience = screen.audiencePerDay;
  if (audience < 30000) return "low";
  if (audience <= 100000) return "mid";
  return "high";
}

export function filterScreens(screens, filters = {}) {
  const query = (filters.q || "").trim().toLowerCase();

  return screens.filter((screen) => {
    if (filters.city && screen.city !== filters.city) return false;
    if (filters.type && screen.type !== filters.type) return false;
    if (filters.size && sizeBand(screen) !== filters.size) return false;
    if (filters.audience && audienceBand(screen) !== filters.audience) return false;

    if (query) {
      const haystack = [
        screen.name,
        screen.city,
        screen.state,
        screen.neighborhood,
        screen.reference,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}
