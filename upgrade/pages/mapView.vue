<template>
  
  <div class="container">
    <p>https://github.com/Gugustinette/Nuxt-Leaflet</p>
    <div style="height:100vh; width:100vw">
    <LMap 
      ref="map"
      :zoom="17"
      :center="[55.4097702, 11.8698327]"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LGeoJson :geojson="data" />
    </LMap>
  </div>
    <code>
      {{ data }}
    </code>


  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('geo', () => queryContent('/geo').findOne())
</script>
