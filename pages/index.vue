<template>
  <b-container>
    <div>
      <b-jumbotron
        header="Junviglund"
        lead="Byggeprojekt nær Nordrup ved Ringsted"
      >
        <p>Her kan du følge processen.</p>
        <p>
          Vi kalder vores drømmeprojekt Junviglund som en sammentrækning af
          vores børns navne og adressen.
        </p>
      </b-jumbotron>
      <div>
        <b-card
          v-for="item in posts"
          :key="item.id"
          :title="item.title"
          no-body
          class="overflow-hidden post"
        >
          <b-row no-gutters>
            <b-col md="2">
              <a :href="'/post/' + item.slug.current">
                <b-card-img
                  :src="urlFor(item.mainImage.asset._ref, 150).url()"
                  alt="Læs mere"
                  class=""
                ></b-card-img>
              </a>
            </b-col>
            <b-col md="10">
              <b-card-body :title="item.title">
                <b-card-text>
                  <div class="meta">
                    <div>Oprettet: {{ item._createdAt | formatDate }}</div>
                    <div>Opdateret: {{ item._updatedAt | formatDate }}</div>
                  </div>
                  <p>{{ small(item) }}</p>
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
    const query = groq`{ "posts": *[_type == "post"] | order(_createdAt asc)}`
    return $sanity.fetch(query)
  },
  filters: {
    formatDate: (value) => {
      const d = new Date(value)
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    },
  },
  methods: {
    small(item) {
      return item.body[0].children[0].text
    },
    urlFor(source, width) {
      const builder = imageUrlBuilder(this.$sanity.config)
      if (width) {
        return builder
          .image(source)
          .crop('entropy')
          .size(width, width)
          .fit('crop')
      } else {
        return builder.image(source).auto('format').maxWidth(width)
      }
    },
  },
}
</script>

<style scoped>
.post {
  margin-top: 10px;
}
.meta {
  color: gray;
  position: absolute;
  right: 2px;
  top: 0px;
  text-align: right;
}
</style>
