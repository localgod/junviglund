<template>
  <b-container>
    <div>
      <b-jumbotron
        header="Junviglund"
        lead="Byggeprojekt nær Nordrup ved Ringsted"
      >
        <p>Her kan du følge processen.</p>
      </b-jumbotron>
    </div>

    <div id="map-wrap" style="height: 100vh">
      <no-ssr>
        <l-map :zoom="19" :center="[55.4097702, 11.8698327]">
          <l-control position="topright">
            <b-btn @click="addGeoJson">Vis lag</b-btn>
            <b-btn @click="hideGeoJson">Skjul lag</b-btn>
          </l-control>
          <l-control-layers position="topright"></l-control-layers>

          <l-tile-layer
            name="Sattelit"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg"
            visible="false"
            layer-type="base"
            attribution="World Imagery"
          ></l-tile-layer>

          <l-tile-layer
            name="Kort"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            visible="false"
            layer-type="base"
            attribution="http://osm.org/copyright"
          ></l-tile-layer>

          <l-geo-json v-if="geojson" :geojson="geojson" />
        </l-map>
      </no-ssr>
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
export default {
  async asyncData({ $cloudinary, $content, params }) {
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
      geojson: undefined,
    }
  },
  methods: {
    async addGeoJson() {
      this.geojson = await this.$content('geo').fetch()
    },
    hideGeoJson() {
      this.geojson = undefined
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
