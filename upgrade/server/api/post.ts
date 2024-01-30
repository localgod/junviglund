import { createClient, SanityClient } from '@sanity/client'

class CMS {
    client: SanityClient

    constructor() {
        const runtimeConfig = useRuntimeConfig()
        this.client = createClient({
            projectId: runtimeConfig.public.sanityProjectId,
            dataset: runtimeConfig.public.sanityDataset,
            useCdn: true, // set to `false` to bypass the edge cache
            apiVersion: new Date().toISOString().split('T')[0], // use current date (YYYY-MM-DD) to target the latest API version
            // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
        })
    }

    async getPost() {
        return await this.client.fetch('*[_type == "post"]')
    }
}

export default defineEventHandler(async () => {
    const cms = new CMS();
    return await cms.getPost();
});