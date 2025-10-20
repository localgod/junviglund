import type { MapFeatureCollection } from '../../../types/geojson'

class Jordstykker {
  private baseUrl = 'https://api.dataforsyningen.dk/jordstykker'
  
  public async get(ejerlavkode: number, matrikelnr: string): Promise<MapFeatureCollection> {
    const url = `${this.baseUrl}?ejerlavkode=${ejerlavkode}&matrikelnr=${matrikelnr}&format=geojson`
    return await $fetch<MapFeatureCollection>(url, { method: 'get' })
  }
}

export default defineEventHandler(async (event): Promise<MapFeatureCollection> => {
  const query = getQuery(event)
  
  // Validate required parameters
  if (!query.ejerlavkode || !query.matrikelnr) {
    throw createError({
      statusCode: 400,
      message: 'Missing required parameters: ejerlavkode and matrikelnr'
    })
  }
  
  // Validate ejerlavkode is a valid number
  const ejerlavkode = parseInt(query.ejerlavkode as string)
  if (isNaN(ejerlavkode)) {
    throw createError({
      statusCode: 400,
      message: 'ejerlavkode must be a valid number'
    })
  }
  
  const matrikelnr = query.matrikelnr as string
  
  try {
    const data = new Jordstykker()
    return await data.get(ejerlavkode, matrikelnr)
  } catch (error) {
    console.error('Failed to fetch cadastral data:', error)
    throw createError({
      statusCode: 502,
      message: 'Failed to fetch data from Dataforsyningen API'
    })
  }
})
