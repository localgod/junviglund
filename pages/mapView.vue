<template>
  <b-container>
    <div id="map-wrap" style="height: 100vh">
      <client-only>
        <l-map :zoom="17" :center="[55.4097702, 11.8698327]">
          <l-control position="topright">
            <b-button-group vertical>
              <template v-for="feature in features">
                <b-btn
                  :key="Object.keys(feature)[0]"
                  size="sm"
                  class="text-left"
                  @click="toggleFeature(Object.keys(feature)[0])"
                  >{{ Object.keys(feature)[0] }}</b-btn
                >
              </template>
            </b-button-group>
          </l-control>
          <l-control-layers position="topright"></l-control-layers>

          <l-tile-layer
            name="Satelit"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg"
            :visible="false"
            layer-type="base"
            attribution="World Imagery"
          ></l-tile-layer>

          <l-tile-layer
            name="Kort"
            layer-type="BasemapLayer"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            :visible="true"
            attribution="http://osm.org/copyright"
          ></l-tile-layer>
          <template v-for="feature in features">
            <l-geo-json
              v-if="feature[Object.keys(feature)[0]].data"
              :key="feature"
              :geojson="feature[Object.keys(feature)[0]].data"
              :options-style="{
                weight:
                  feature[Object.keys(feature)[0]].data.properties[
                    'stroke-width'
                  ],
                color:
                  feature[Object.keys(feature)[0]].data.properties['stroke'],
                opacity:
                  feature[Object.keys(feature)[0]].data.properties[
                    'stroke-opacity'
                  ],
                fillColor:
                  feature[Object.keys(feature)[0]].data.properties['fill'],
                fillOpacity:
                  feature[Object.keys(feature)[0]].data.properties[
                    'fill-opacity'
                  ],
              }"
            />
          </template>
        </l-map>
      </client-only>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      data: undefined,
      features: [],
    }
  },
  mounted() {
    this.getGeoJson().then(() => {
      this.getFeatures()
    })
  },
  methods: {
    async getGeoJson() {
      this.data = await this.$content('geo').fetch()
    },
    getFeatures() {
      const features = []
      this.data.features.forEach((item) => {
        const feature = {}
        feature[item.properties.name] = { data: null }

        features.push(feature)
      })
      this.features = features
    },
    toggleFeature(name) {
      const found = this.features.findIndex((element) => {
        if (Object.keys(element)[0] === name) {
          return true
        }
        return false
      })
      if (found !== -1) {
        if (this.features[found][name].data === null) {
          this.showFeature(name)
        } else {
          this.hideFeature(name)
        }
      }
    },
    showFeature(name) {
      const e = this.data.features.filter((item) => {
        return item.properties.name === name
      })[0]

      const found = this.features.findIndex((element) => {
        if (Object.keys(element)[0] === name) {
          return true
        }
        return false
      })
      if (found !== -1) {
        this.features[found][name].data = e
      }
    },
    hideFeature(name) {
      const found = this.features.findIndex((element) => {
        if (Object.keys(element)[0] === name) {
          return true
        }
        return false
      })
      if (found !== -1) {
        this.features[found][name].data = null
      }
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
