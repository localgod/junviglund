<template>
  <UContainer class="py-8">
    <UAlert
      v-if="hasError"
      color="amber"
      variant="soft"
      title="Warning"
      description="Some map data could not be loaded. The map may be incomplete."
      icon="i-heroicons-exclamation-triangle"
      class="mb-4"
    />
    
    <div class="map-container rounded-lg overflow-hidden shadow-lg">
      <!-- https://github.com/Gugustinette/Nuxt-Leaflet -->
      <LMap :zoom="zoom" :center="center" :use-global-leaflet="false">
        <LTileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
          layer-type="base" 
          name="OpenStreetMap" 
        />
        <LGeoJson 
          :geojson="combined" 
          :options-style="geoStyler" 
          :options="{ onEachFeature }" 
        />
      </LMap>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet"
import type { L } from 'leaflet'
import type { PointExpression, StyleFunction } from 'leaflet'
import type { MapFeatureCollection, MapFeature } from '~/types/geojson'

// Import GeoJSON files directly from root content directory
// Using relative paths: app/pages/mapView.vue -> ../../content/
import plantingData from '../../content/planting.json'
import buildingsData from '../../content/buildings.json'
import planningData from '../../content/planning.json'

const zoom = 17
const center: PointExpression = [55.4097702, 11.8698327]

// Fetch cadastral data from external API
const { data: matrikel1, error: error1 } = await useFetch<MapFeatureCollection>(
  '/api/dataforsyningen/jordstykker?ejerlavkode=211255&matrikelnr=16d'
)
const { data: matrikel2, error: error2 } = await useFetch<MapFeatureCollection>(
  '/api/dataforsyningen/jordstykker?ejerlavkode=211255&matrikelnr=17a'
)

// Use imported GeoJSON data
const planting = plantingData as MapFeatureCollection
const buildings = buildingsData as MapFeatureCollection
const planning = planningData as MapFeatureCollection

// Check for errors
const hasError = error1.value || error2.value
if (hasError) {
  console.error('Failed to fetch cadastral data:', error1.value || error2.value)
}

// Combine all features
const combined: MapFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    ...(matrikel1.value?.features || []),
    ...(matrikel2.value?.features || []),
    ...(planting?.features || []),
    ...(buildings?.features || []),
    ...(planning?.features || [])
  ]
}

const onEachFeature = (feature: MapFeature, layer: L.Layer) => {
  if (feature?.properties?.name) {
    const name = feature.properties.name
    const hektar = feature.properties.hektar ?? 'unknown'
    const sorts = feature.properties.sorts
    
    if (Array.isArray(sorts)) {
      const listItems = sorts.map((sort: string) => `<li>${sort}</li>`).join('')
      layer.bindPopup(`<h6>${name}</h6> <p>(${hektar} hektar)</p> <ul>${listItems}</ul>`)
    } else {
      layer.bindPopup(`<h6>${name}</h6>`)
    }
  }
}

const geoStyler: StyleFunction = (feature) => {
  const props = feature?.properties
  return {
    color: props?.stroke ?? '#cccccc',
    weight: props?.['stroke-width'] ?? 1,
    opacity: props?.['stroke-opacity'] ?? 1,
    fillOpacity: props?.['fill-opacity'] ?? 0.5,
    fillColor: props?.fill ?? '#cccccc'
  }
}
</script>

<style scoped>
.map-container {
  height: 80vh;
  width: 80vw;
}
</style>
