<template>
  <b-card
    :title="article.title"
    :img-src="img"
    :img-alt="article.alt"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      <nuxt-content :document="article" />
      <p>Post last updated: {{ formatDate(article.updatedAt) }}</p>
    </b-card-text>
    <prev-next :prev="prev" :next="next" />
  </b-card>
</template>

<script>
export default {
  async asyncData ({ $cloudinary, $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    const img = $cloudinary.image.url(article.img, {
      crop: 'scale',
      width: 200,
    })

    return {
      img,
      article,
      prev,
      next,
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>

<style scoped>
article {
  background-color: gray;
}
</style>
