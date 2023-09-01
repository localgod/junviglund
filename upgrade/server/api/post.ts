import { createClient } from '@sanity/client'

class CMS {
    client: SanityClient

    constructor() {
        this.client = createClient({
            projectId: 'uy0ayswl',
            dataset: 'production',
            useCdn: true, // set to `false` to bypass the edge cache
            apiVersion: '2023-08-03', // use current date (YYYY-MM-DD) to target the latest API version
            // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
        })
    }

    async getPost() {
        return await this.client.fetch('*[_type == "post"]')
    }
}

export default defineEventHandler(async () => {
    const gitHubRepositories = new CMS();
    return await gitHubRepositories.getPost();
});