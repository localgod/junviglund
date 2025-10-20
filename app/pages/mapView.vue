<template>
  <div class="container mx-auto px-4 py-8">
    <div
      v-if="hasError"
      class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4"
    >
      <div class="flex items-start">
        <svg class="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <div>
          <h3 class="text-sm font-medium text-amber-800 dark:text-amber-200">Warning</h3>
          <p class="text-sm text-amber-700 dark:text-amber-300 mt-1">Some map data could not be loaded. The map may be incomplete.</p>
        </div>
      </div>
    </div>
    
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
  </div>
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
