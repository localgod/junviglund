import { createError, defineEventHandler, getValidatedQuery } from 'nuxt/server'
import type { MapFeatureCollection } from '../../../types/geojson'

const matrikelnrPattern = /^[\p{L}\p{N} .-]+$/u

const getCadastralData = async (ejerlavkode: number, matrikelnr: string): Promise<MapFeatureCollection> => {
  const url = new URL('https://api.dataforsyningen.dk/jordstykker')
  url.search = new URLSearchParams({
    ejerlavkode: String(ejerlavkode),
    matrikelnr,
    format: 'geojson'
  }).toString()

  return await $fetch<MapFeatureCollection>(url.toString())
}

export default defineEventHandler(async (event): Promise<MapFeatureCollection> => {
  const { ejerlavkode, matrikelnr } = await getValidatedQuery(event, (query) => {
    if (typeof query.ejerlavkode !== 'string' || typeof query.matrikelnr !== 'string') {
      throw createError({
        status: 400,
        statusText: 'ejerlavkode and matrikelnr must each be provided once'
      })
    }

    const parsedEjerlavkode = Number(query.ejerlavkode)
    if (!Number.isSafeInteger(parsedEjerlavkode) || parsedEjerlavkode <= 0) {
      throw createError({
        status: 400,
        statusText: 'ejerlavkode must be a positive integer'
      })
    }

    if (!matrikelnrPattern.test(query.matrikelnr)) {
      throw createError({
        status: 400,
        statusText: 'matrikelnr contains invalid characters'
      })
    }

    return {
      ejerlavkode: parsedEjerlavkode,
      matrikelnr: query.matrikelnr
    }
  })

  try {
    return await getCadastralData(ejerlavkode, matrikelnr)
  } catch (error) {
    console.error('Failed to fetch cadastral data:', error)
    throw createError({
      status: 502,
      statusText: 'Failed to fetch data from Dataforsyningen API'
    })
  }
})
