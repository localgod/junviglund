import { createClient, type SanityClient } from '@sanity/client'

let client: SanityClient | null = null

/**
 * Get or create a singleton Sanity client instance
 * This prevents creating a new client on every API request
 */
export function getSanityClient(): SanityClient {
  if (!client) {
    const runtimeConfig = useRuntimeConfig()
    
    if (!runtimeConfig.public.sanityProjectId || !runtimeConfig.public.sanityDataset) {
      throw new Error('Missing Sanity configuration: SANITY_PROJECT_ID and SANITY_DATASET must be set')
    }
    
    client = createClient({
      projectId: runtimeConfig.public.sanityProjectId,
      dataset: runtimeConfig.public.sanityDataset,
      useCdn: true,
      apiVersion: '2024-10-02' // Use fixed date from nuxt.config compatibilityDate
    })
  }
  
  return client
}
