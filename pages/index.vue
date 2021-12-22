<template>
  <b-container>
    <div>
      <b-jumbotron
        header="Junviglund"
        lead="Byggeprojekt nær Nordrup ved Ringsted"
      >
        <p>Her kan du følge processen.</p>
        <p>Vi kalder vores drømmeprojekt Junviglund som en sammentrækning af vores børns navne og adressen.</p>
      </b-jumbotron>
      <div>
        <b-card
          v-for="item in posts"
          :key="item"
          :title="item.title"
          no-body
          class="overflow-hidden post"
       
        >
          <b-row no-gutters>
            <b-col md="4">
              <b-card-img
                :src="urlFor(item.mainImage.asset._ref).url()"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="8">
              <b-card-body :title="item.title">
                <b-card-text>
                  <SanityContent :blocks="item.body" />

                  <b-button class="float-right" size="sm" :to="`/post/${item.slug.current}`">Læs</b-button>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
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
  asyncData({ $sanity }) {
    const query = groq`{ "posts": *[_type == "post"] }`
    return $sanity.fetch(query)
  },
  methods: {
    urlFor(source) {
      const builder = imageUrlBuilder(this.$sanity.config)
      return builder.image(source).auto('format');
    },
  },
}
</script>

<style scoped>
.post {
  margin-top: 10px;
}
</style>
