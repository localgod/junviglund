<template>
  <b-card :title="post.title" no-body class="overflow-hidden post">
    <b-row no-gutters>
      <b-col md="4">
        <b-card-img
          :src="urlFor(post.mainImage.asset._ref).url()"
          alt="Image"
          class="rounded-0"
        ></b-card-img>
      </b-col>
      <b-col md="8">
        <b-card-body :title="post.title">
          <b-card-text>
            <SanityContent :blocks="post.body" />
            <b-button class="float-right" size="sm" to="/">Tilbage</b-button>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import imageUrlBuilder from '@sanity/image-url'
import { groq } from '@nuxtjs/sanity'
import { SanityContent } from '@nuxtjs/sanity/dist/components/sanity-content'
export default {
  components: { SanityContent },
  async asyncData({ params, $sanity }) {
    const query = groq`*[_type == "post" && slug.current == "${params.slug}"]`
    return $sanity.fetch(query).then((response) => {
      return { post: response[0] }
    })
  },
  methods: {
    urlFor(source) {
      const builder = imageUrlBuilder(this.$sanity.config)
      return builder.image(source).auto('format')
    },
  },
}
</script>
