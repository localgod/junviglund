class Jordstykker {
  private baseUrl = 'https://api.dataforsyningen.dk/jordstykker'
  public async get (ejerlavkode: number, matrikelnr: string) {
    const url = `${this.baseUrl}?ejerlavkode=${ejerlavkode}&matrikelnr=${matrikelnr}&format=geojson`
    return await $fetch(url, { method: 'get' })
  }
}
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const ejerlavkode = parseInt(query.ejerlavkode as string)
  const matrikelnr = query.matrikelnr as string
  const data = new Jordstykker()
  return await data.get(ejerlavkode, matrikelnr)
})
