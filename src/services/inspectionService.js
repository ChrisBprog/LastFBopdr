// src/services/inspectionService.js
import { Inspection } from '@/models/Inspection'

const BASE_URL = 'https://my-json-server.typicode.com/ChrisBprog/LastFBopdr'
const STORAGE_KEY = 'inspections'

function safeParse(json, fallback) {
  try { return JSON.parse(json) } catch { return fallback }
}

function persist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

function seedUrl() {
  return `${import.meta.env.BASE_URL}inspections.json`
}

function ensureShape(item) {
  return {
    id: item?.id ?? Date.now(),
    adres: item?.adres ?? '',
    inspecteur: item?.inspecteur ?? '',
    datum: item?.datum ?? '',
    status: item?.status ?? 'open',
    schade: item?.schade ?? {},
    onderhoud: item?.onderhoud ?? {},
    installatie: item?.installatie ?? {},
    modificatie: item?.modificatie ?? {}
  }
}

export async function loadInspections() {
  const stored = safeParse(localStorage.getItem(STORAGE_KEY) || '[]', [])
  if (Array.isArray(stored) && stored.length > 0) {
    return stored.map(x => new Inspection(ensureShape(x)))
  }

  try {
    const r = await fetch(`${BASE_URL}/inspections`, { cache: 'no-store' })
    if (!r.ok) throw new Error(`API HTTP ${r.status}`)
    const apiData = await r.json()

    if (Array.isArray(apiData) && apiData.length > 0) {
      const list = apiData.map(ensureShape)
      persist(list)
      return list.map(x => new Inspection(x))
    }
  } catch (e) {
    console.warn('Web API niet beschikbaar, fallback naar inspections.json', e)
  }

  const r2 = await fetch(seedUrl(), { cache: 'no-store' })
  if (!r2.ok) throw new Error(`Seed fetch failed: ${r2.status}`)
  const jsonData = await r2.json()

  const list = (Array.isArray(jsonData) ? jsonData : []).map(ensureShape)
  persist(list)
  return list.map(x => new Inspection(x))
}

export async function resetToLocalJsonSeed() {
  localStorage.removeItem(STORAGE_KEY)

  const r = await fetch(seedUrl(), { cache: 'no-store' })
  if (!r.ok) throw new Error(`Seed fetch failed: ${r.status}`)
  const jsonData = await r.json()

  const list = (Array.isArray(jsonData) ? jsonData : []).map(ensureShape)
  persist(list)
  return list.map(x => new Inspection(x))
}

export function upsertInspection(inspectionLike) {
  const list = safeParse(localStorage.getItem(STORAGE_KEY) || '[]', [])
  const next = Array.isArray(list) ? [...list] : []

  const normalized = ensureShape(inspectionLike)
  const idx = next.findIndex(x => x.id === normalized.id)

  if (idx >= 0) next[idx] = normalized
  else next.push(normalized)

  persist(next)
  return new Inspection(normalized)
}

export function removeInspection(id) {
  const list = safeParse(localStorage.getItem(STORAGE_KEY) || '[]', [])
  const next = (Array.isArray(list) ? list : []).filter(x => x.id !== id)
  persist(next)
  return next.map(x => new Inspection(ensureShape(x)))
}

export function setInspectionStatus(id, status) {
  const list = safeParse(localStorage.getItem(STORAGE_KEY) || '[]', [])
  const next = Array.isArray(list) ? [...list] : []
  const idx = next.findIndex(x => x.id === id)
  if (idx === -1) return null

  next[idx] = ensureShape({ ...next[idx], status })
  persist(next)
  return new Inspection(next[idx])
}

export { loadInspections as getInspections }