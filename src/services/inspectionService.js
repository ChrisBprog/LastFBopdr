// src/services/inspectionsservice.js
import { Inspection } from '@/models/Inspection'

const BASE_URL = 'https://my-json-server.typicode.com/ChrisBprog/LastFBopdr'
const STORAGE_KEY = 'inspections'

function safeParse(json, fallback) {
  try { return JSON.parse(json) } catch { return fallback }
}

function persist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export async function loadInspections() {
  // 1) Eerst localStorage (jouw “per sessie” waarheid)
  const stored = safeParse(localStorage.getItem(STORAGE_KEY) || '[]', [])
  if (Array.isArray(stored) && stored.length > 0) {
    return stored.map(item => new Inspection(item))
  }

  // 2) Anders: seed vanuit Web API
  const response = await fetch(`${BASE_URL}/inspections`)
  const data = await response.json()

  const list = (Array.isArray(data) ? data : []).map(item => ({
    ...item,
    // zorg dat status er is
    status: item.status ?? 'open'
  }))

  persist(list)
  return list.map(item => new Inspection(item))
}

// Upsert naar localStorage (werkt voor add + edit)
export function upsertInspection(inspectionLike) {
  const list = safeParse(localStorage.getItem(STORAGE_KEY) || '[]', [])
  const next = Array.isArray(list) ? [...list] : []

  const id = inspectionLike.id ?? Date.now()
  const idx = next.findIndex(x => x.id === id)

  const normalized = { ...inspectionLike, id }

  if (idx >= 0) next[idx] = normalized
  else next.push(normalized)

  persist(next)
  return normalized
}

export function removeInspection(id) {
  const list = safeParse(localStorage.getItem(STORAGE_KEY) || '[]', [])
  const next = (Array.isArray(list) ? list : []).filter(x => x.id !== id)
  persist(next)
  return next
}

export function setInspectionStatus(id, status) {
  const list = safeParse(localStorage.getItem(STORAGE_KEY) || '[]', [])
  const next = Array.isArray(list) ? [...list] : []
  const idx = next.findIndex(x => x.id === id)
  if (idx === -1) return next

  next[idx] = { ...next[idx], status }
  persist(next)
  return next[idx]
}

// Als je details écht uit API wilt trekken:
export async function getInspectionById(id) {
  // LET OP: jouw repo moet deze endpoints echt hebben, anders weglaten.
  const inspection = await fetch(`${BASE_URL}/inspections/${id}`).then(r => r.json())

  // deze endpoints bestaan alleen als je repo ze heeft:
  const damages = await fetch(`${BASE_URL}/damages?inspectionId=${id}`).then(r => r.json())
  const maintenance = await fetch(`${BASE_URL}/maintenance?inspectionId=${id}`).then(r => r.json())

  return { inspection, damages, maintenance }
}
export { loadInspections as getInspections }