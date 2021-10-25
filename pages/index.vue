<template>
  <b-container>
    <b-btn @click="fetch()">Fetch</b-btn>
    <SanityContent v-if="blog" :blocks="blog[0].body" />


    <SanityImage v-if="blog"
    project-id="uy0ayswl"
    asset-id="image-db17202e648b39cc20af70baf654914320349a50-601x481-jpg"
    auto="format"
  />
    
    <div>
      <b-jumbotron
        header="Junviglund"
        lead="Byggeprojekt nær Nordrup ved Ringsted"
      >
        <p>Her kan du følge processen.</p>
      </b-jumbotron>
    </div>

    <h1>Blog Posts</h1>
    <b-card
      v-for="article of articles"
      :key="article.slug"
      :title="article.title"
      :img-src="article.img"
      img-alt="Image"
      img-top
      tag="article"
      style=""
      class="mb-2"
    >
      <b-card-text>
        {{ article.description }}
      </b-card-text>

      <b-button
        :to="{ name: 'blog-slug', params: { slug: article.slug } }"
        variant="primary"
        >Læs</b-button
      >
    </b-card>
  </b-container>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { SanityContent } from '@nuxtjs/sanity/dist/components/sanity-content'
import { SanityImage } from '@nuxtjs/sanity/dist/components/sanity-image'

export default {
  components: { SanityContent, SanityImage },
  async asyncData({ $cloudinary, $content, $sanity, params }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch()

    articles.forEach((article, index) => {
      article.img = $cloudinary.image.url(article.img, {
        crop: 'scale',
        width: 800,
      })
    })

    return {
      articles,
    }
  },
  data() {
    return {
      url: this.$cloudinary.image.url('sample', {
        crop: 'scale',
        width: 200,
      }),
      blog : undefined
    }
  },
  methods: {
    async fetch() {
      const q = groq`*[_type == "post"]`
      this.blog = await this.$sanity.fetch(q)
    },
  },
}
</script>

<style scoped>
.main {
  background-color: azure;
  opacity: 0.9;
  text-align: center;
}
</style>
