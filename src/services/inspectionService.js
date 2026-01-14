import { Inspection } from '@/models/Inspection'

const API_URL =
  'https://my-json-server.typicode.com/ChrisBprog/inspection-api/inspections'

export async function getInspections() {
  const response = await fetch(API_URL)
  const data = await response.json()

  return data.map(item => new Inspection(item))
}
