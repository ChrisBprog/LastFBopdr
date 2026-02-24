import { Inspection } from '@/models/Inspection'

const API_URL =
  'https://my-json-server.typicode.com/ChrisBprog/LastFBopdr/inspections'

export async function getInspections() {
  const response = await fetch(API_URL)
  const data = await response.json()

  return data.map(item => new Inspection(item))
}
export async function addInspection(data) {
  const response = await fetch(`${API_URL}/inspections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  return await response.json()
}

export async function getInspectionById(id) {
  const inspection = await fetch(`${API_URL}/inspections/${id}`).then(r => r.json())
  const damages = await fetch(`${API_URL}/damages?inspectionId=${id}`).then(r => r.json())
  const maintenance = await fetch(`${API_URL}/maintenance?inspectionId=${id}`).then(r => r.json())

  return { inspection, damages, maintenance }
}