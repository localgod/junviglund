<template>
  <div class="container">
    <div style="height:80vh; width:80vw">
      <!-- https://github.com/Gugustinette/Nuxt-Leaflet -->
      <LMap ref="map" :zoom="zoom" :center="center">
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
        />
        <LGeoJson :geojson="combined" :options-style="geoStyler" :options="{ onEachFeature: onEachFeature }" />
      </LMap>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PointExpression, StyleFunction } from 'leaflet'
const zoom = 17
const center: PointExpression = [55.4097702, 11.8698327]

const matrikel1 = (await useFetch(() => '/api/dataforsyningen/jordstykker?ejerlavkode=211255&matrikelnr=16d')).data.value as GeoJSON.FeatureCollection
const matrikel2 = (await useFetch(() => '/api/dataforsyningen/jordstykker?ejerlavkode=211255&matrikelnr=17a')).data.value as GeoJSON.FeatureCollection
const planting = await queryContent('/planting').findOne() as unknown as GeoJSON.FeatureCollection
const buildings = await queryContent('/buildings').findOne() as unknown as GeoJSON.FeatureCollection
const planning = await queryContent('/planning').findOne() as unknown as GeoJSON.FeatureCollection

const combined: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    ...matrikel1.features,
    ...matrikel2.features,
    ...planting.features,
    ...buildings.features,
    ...planning.features
  ]
}

const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
  if (feature?.properties?.name) {
    const name = feature?.properties?.name ?? 'unknown'
    const hektar = feature?.properties?.hektar ?? 'unknown'
    const sorts = feature?.properties?.sorts ?? 'unknown'
    const l: string[] = []
    if (Array.isArray(sorts)) {
      sorts.forEach((sort: string) => {
        l.push(`<li>${sort}</li>`)
      })
      layer.bindPopup(`<h6>${name}</h6> <p>(${hektar} hektar)</p> <ul>${l.join('')}</ul>`)
    } else {
      layer.bindPopup(`<h6>${name}</h6>`)
    }
  }
}

const geoStyler: StyleFunction = (feature) => {
  return {
    color: feature?.properties?.stroke ?? '#cccccc',
    weight: feature?.properties?.['stroke-width'] ?? 1,
    opacity: feature?.properties?.['stroke-opacity'] ?? 1,
    fillOpacity: feature?.properties?.['fill-opacity'] ?? 0.5,
    fillColor: feature?.properties?.fill ?? '#cccccc'
  }
}

</script>
