<template>
  <b-container class="post">
    <h1>{{ post.title }}</h1>
    <b-img
      :src="urlFor(post.mainImage.asset._ref).url()"
      fluid-grow
      alt="Fluid-grow image"
    ></b-img>

    <p><SanityContent :blocks="post.body" /></p>
    <b-container fluid class="" style="overflow: auto">
      <h2>Billeder</h2>
      <b-img
        v-for="image in post.images"
        :key="image"
        thumbnail
        :src="urlFor(image.asset._ref, 200).url()"
        alt="Image 1"
      ></b-img>
    </b-container>
    <p><b-button class="float-right" size="sm" to="/">Tilbage</b-button></p>
  </b-container>
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
  background-color: #ffffff;
  position: absolute;
}
</style>
