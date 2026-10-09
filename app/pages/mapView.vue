<template>
  <UContainer class="py-8">
    <h1 class="sr-only">
      Kort over Junviglund
    </h1>

    <USkeleton
      v-if="isLoading"
      class="h-[80dvh] w-full"
      aria-label="Indlæser kortdata"
    />

    <template v-else>
      <UAlert
        v-if="hasError"
        color="warning"
        variant="subtle"
        title="Nogle kortdata kunne ikke hentes"
        description="Kortet kan være ufuldstændigt. Du kan prøve at hente dataene igen."
        icon="i-lucide-triangle-alert"
        class="mb-4"
      >
        <template #actions>
          <UButton
            label="Prøv igen"
            color="warning"
            variant="soft"
            icon="i-lucide-refresh-cw"
            @click="refreshMapData"
          />
        </template>
      </UAlert>

      <div
        class="h-[80dvh] w-full overflow-hidden rounded-lg shadow-lg"
        role="region"
        aria-label="Interaktivt kort over Junviglund"
      >
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
    </template>
  </UContainer>
</template>

<script setup lang="ts">
import { LMap, LTileLayer, LGeoJson } from '@vue-leaflet/vue-leaflet'
import type { Layer, PointExpression, StyleFunction } from 'leaflet'
import type { MapFeatureCollection, MapFeature } from '../../types/geojson'

// Import GeoJSON files directly from root content directory
// Using relative paths: app/pages/mapView.vue -> ../../content/
import plantingData from '../../content/planting.json'
import buildingsData from '../../content/buildings.json'
import planningData from '../../content/planning.json'

const zoom = 17
const center: PointExpression = [55.4097702, 11.8698327]

// Fetch cadastral data from external API
const [matrikel1Request, matrikel2Request] = await Promise.all([
  useFetch('/api/dataforsyningen/jordstykker', {
    query: { ejerlavkode: 211255, matrikelnr: '16d' }
  }),
  useFetch('/api/dataforsyningen/jordstykker', {
    query: { ejerlavkode: 211255, matrikelnr: '17a' }
  })
])

const { data: matrikel1, error: error1, status: status1, refresh: refresh1 } = matrikel1Request
const { data: matrikel2, error: error2, status: status2, refresh: refresh2 } = matrikel2Request

// Use imported GeoJSON data
const planting = plantingData as MapFeatureCollection
const buildings = buildingsData as MapFeatureCollection
const planning = planningData as MapFeatureCollection

// Check for errors
const hasError = computed(() => Boolean(error1.value || error2.value))
const isLoading = computed(() => status1.value === 'pending' || status2.value === 'pending')
const refreshMapData = () => Promise.all([refresh1(), refresh2()])

if (hasError.value) {
  console.error('Failed to fetch cadastral data:', error1.value || error2.value)
}

// Combine all features
const combined = computed<MapFeatureCollection>(() => ({
  type: 'FeatureCollection',
  features: [
    ...(matrikel1.value?.features || []),
    ...(matrikel2.value?.features || []),
    ...planting.features,
    ...buildings.features,
    ...planning.features
  ]
}))

useSeoMeta({
  title: 'Kort',
  description: 'Interaktivt kort over Junviglund med bygninger, beplantning og matrikeldata.'
})

const onEachFeature = (feature: MapFeature, layer: Layer) => {
  if (feature?.properties?.name) {
    const name = feature.properties.name
    const hektar = feature.properties.hektar ?? 'ukendt'
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
