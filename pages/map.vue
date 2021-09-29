<template>
  <b-container>
    <div id="map-wrap" style="height: 100vh">
      <no-ssr>
        <l-map :zoom="17" :center="[55.4097702, 11.8698327]">
          <l-control position="topright">
            <b-btn @click="showFeature">Vis lag</b-btn>
            <b-btn @click="hideFeature">Skjul lag</b-btn>
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

          <l-geo-json v-if="estate" :geojson="estate" />
          <l-geo-json v-if="barn" :geojson="barn" />
        </l-map>
      </no-ssr>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      data: undefined,
      estate: { type: 'FeatureCollection', features: [] },
      barn: { type: 'FeatureCollection', features: [] },
    }
  },
  mounted() {
    this.getGeoJson()
  },
  methods: {
    async getGeoJson() {
      this.data = await this.$content('geo').fetch()
    },
    showFeature() {
      const e = this.data.features.filter(item => {
        return item.properties.name === 'estate'
      })

      const b = this.data.features.filter(item => {
        return item.properties.name === 'barn'
      })
      this.barn = b
      this.estate = e
    },
    hideFeature() {
      this.barn = undefined
      this.estate = undefined
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
