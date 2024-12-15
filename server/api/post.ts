import { createClient, SanityClient } from '@sanity/client'

class CMS {
  client: SanityClient

  constructor() {
    const runtimeConfig = useRuntimeConfig()
    this.client = createClient({
      projectId: runtimeConfig.public.sanityProjectId,
      dataset: runtimeConfig.public.sanityDataset,
      useCdn: true, // set to `false` to bypass the edge cache
      apiVersion: new Date().toISOString().split('T')[0] // use current date (YYYY-MM-DD) to target the latest API version
      // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
    })
  }

  async getPost() {
    return await this.client.fetch('*[_type == "post"]')
  }
}

export default defineEventHandler(async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': 'Same-Origin',
    'crossOriginResourcePolicy': 'same-origin',
    'crossOriginOpenerPolicy': 'same-origin',
    'crossOriginEmbedderPolicy': 'require-corp',
    'contentSecurityPolicy': "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
    'X-XSS-Protection': 1
  }
  setHeaders(event, headers)
  const cms = new CMS()
  return await cms.getPost()
})
