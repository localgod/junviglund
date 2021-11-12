<template>
  <b-container>
    <div>
      <b-jumbotron
        header="Junviglund"
        lead="Byggeprojekt nær Nordrup ved Ringsted"
      >
        <p>Her kan du følge processen.</p>
      </b-jumbotron>
      <div>
        <div class="text-center">
          <b-spinner v-if="!blog" label="Spinning"></b-spinner>
        </div>
        <b-card v-for="item in blog" :key="item"
          :title="item.title"
          :img-src="urlFor(item.mainImage.asset._ref).url()"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text>
            <SanityContent :blocks="item.body" />
          </b-card-text>
        </b-card>
      </div>
    </div>
  </b-container>
</template>

<script>
import imageUrlBuilder from '@sanity/image-url'
import { groq } from '@nuxtjs/sanity'
import { SanityContent } from '@nuxtjs/sanity/dist/components/sanity-content'

export default {
  components: { SanityContent },
  data() {
    return {
      blog: undefined,
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.fetch()
    })
  },
  methods: {
    async fetch() {
      const q = groq`*[_type == "post"]`
      this.blog = await this.$sanity.fetch(q)
    },
    urlFor(source) {
      const builder = imageUrlBuilder(this.$sanity.config)
      return builder.image(source)
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
