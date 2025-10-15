/**
 * Shared TypeScript types for Sanity CMS data structures
 */

export interface SanityReference {
  _ref: string
  _type: string
}

export type SanityAsset = SanityReference

export interface SanityImage {
  _type: string
  _key: string
  asset: SanityAsset
}

export interface SanitySlug {
  current: string
  _type: string
}

export interface PortableTextMarkDef {
  _key: string
  _type: string
  [key: string]: unknown
}

export interface PortableTextChild {
  _key: string
  _type: string
  marks: string[]
  text: string
}

export interface PortableTextBlock {
  _type: string
  style: string
  _key: string
  markDefs: PortableTextMarkDef[]
  children: PortableTextChild[]
}

/**
 * Sanity Post document type
 */
export interface Post {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  title: string
  slug: SanitySlug
  author: SanityReference
  mainImage: SanityImage
  images: SanityImage[]
  categories: SanityReference[]
  body: PortableTextBlock[]
}
