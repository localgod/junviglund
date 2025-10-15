/**
 * Extended GeoJSON types with custom properties used in this project
 */

import type { FeatureCollection, Feature, Geometry } from 'geojson'

/**
 * Custom properties for map features
 */
export interface MapFeatureProperties {
  name?: string
  stroke?: string
  'stroke-width'?: number
  'stroke-opacity'?: number
  fill?: string
  'fill-opacity'?: number
  hektar?: number | string
  sorts?: string[]
  [key: string]: unknown
}

/**
 * Feature with custom properties
 */
export type MapFeature = Feature<Geometry, MapFeatureProperties>

/**
 * FeatureCollection with custom properties
 */
export type MapFeatureCollection = FeatureCollection<Geometry, MapFeatureProperties>
