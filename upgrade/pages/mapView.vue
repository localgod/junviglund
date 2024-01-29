<template>
  <div class="container">
    <div style="height:100vh; width:100vw">
      <!-- https://github.com/Gugustinette/Nuxt-Leaflet -->
      <LMap ref="map" :zoom="17" :center="[55.4097702, 11.8698327]">
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base" name="OpenStreetMap" />
        <LGeoJson :geojson="data" :options-style="geostyler" />
      </LMap>
    </div>
    <code>
        {{ data }}
      </code>


  </div>
</template>

<script setup lang="ts">
type Coordinates = [number, number][];

interface Geometry {
  type: string;
  coordinates: Coordinates[];
}

interface Properties {
  stroke: string;
  "stroke-width": number;
  "stroke-opacity": number;
  fill: string;
  "fill-opacity": number;
  name: string;
}

interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

const { data } = await useAsyncData('geo', () => queryContent('/geo').findOne())
const geostyler = (feature: Feature) => ({
  opacity: feature.properties["fill"] = "#cccccc",
})






</script>
