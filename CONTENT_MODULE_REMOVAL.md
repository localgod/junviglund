# Removal of @nuxt/content Module

## Summary

Removed the `@nuxt/content` module from the project as it's no longer needed.

## Why It Was Removed

After migrating to Nuxt 4's directory structure, we switched from using Nuxt Content's `queryContent` API to direct JSON imports for GeoJSON files. This approach is:

1. **Simpler** - No async queries, just standard imports
2. **More reliable** - No auto-import issues with Nuxt 4
3. **Faster** - Files are bundled at build time
4. **Type-safe** - TypeScript validates JSON structure directly

## What Changed

### Before (with @nuxt/content)
```typescript
// Using queryContent (had auto-import issues)
const planting = await queryContent('/planting').findOne()
```

### After (direct imports)
```typescript
// Direct JSON import
import plantingData from '../../content/planting.json'
const planting = plantingData as MapFeatureCollection
```

## Changes Made

**1. Removed from `nuxt.config.ts`:**
```diff
- modules: ['@nuxt/content', '@nuxt/eslint', '@nuxtjs/leaflet', '@nuxt/image'],
+ modules: ['@nuxt/eslint', '@nuxtjs/leaflet', '@nuxt/image'],
```

**2. Updated `app/pages/mapView.vue`:**
- Removed `queryContent` usage
- Added direct JSON imports with relative paths

**3. Updated documentation:**
- `AGENTS.md` - Updated tech stack and data sources
- `README.md` - Updated GeoJSON storage description

## Benefits

- ✅ No more "queryContent is not defined" errors
- ✅ No more Nuxt Content configuration warnings
- ✅ Simpler codebase with fewer dependencies
- ✅ Better performance (no runtime queries)
- ✅ Clearer code (explicit imports)

## Optional: Uninstall the Package

If you want to completely remove the unused dependency:

```bash
npm uninstall @nuxt/content
```

This will reduce your `node_modules` size and remove the unused package.

## Files That Still Use JSON Data

The following files import GeoJSON data directly:
- `app/pages/mapView.vue` - Imports `planting.json`, `buildings.json`, `planning.json`

The JSON files remain in the `/content` directory but are now treated as static assets rather than Nuxt Content documents.

---

**Date:** October 15, 2025  
**Reason:** Simplified architecture after Nuxt 4 migration
