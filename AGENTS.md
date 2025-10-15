# Agent Instructions for Junviglund Frontend

This document provides context and instructions for AI agents working on the Junviglund project.

## Project Overview

This is a **Nuxt 4** personal webpage project that combines:
- Blog content from **Sanity CMS**
- Interactive geospatial mapping with **Leaflet**
- GeoJSON data stored via **@nuxt/content**
- Deployed to **Cloudflare Pages** via GitHub Actions

## Tech Stack

- **Framework:** Nuxt 4.1.3 (Vue 3, TypeScript)
- **CMS:** Sanity (headless CMS for blog posts)
- **Mapping:** Leaflet via @nuxtjs/leaflet
- **Content:** Direct JSON imports (GeoJSON files)
- **Styling:** Bootstrap 5.3 (via CDN)
- **Deployment:** Cloudflare Pages
- **Node Version:** >= 22

## Key Configuration Details

### Environment Variables Required

```bash
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
```

These are configured in `nuxt.config.ts` under `runtimeConfig.public`.

### Dev Container

The project includes a dev container configuration (`.devcontainer/`) with:
- **Base Image:** Ubuntu 24.04
- **Node.js:** LTS version via nvm
- **Docker-in-Docker:** For containerized workflows
- **GitHub CLI:** Pre-installed for PR creation and GitHub operations
- **VS Code Extensions:** Markdown linting, error lens

### Development Server in Gitpod

The Nuxt dev server is configured to work in Gitpod environments.

**Configuration in `nuxt.config.ts`:**
```typescript
vite: {
  server: {
    hmr: {
      clientPort: 443,
      protocol: 'wss'
    },
    allowedHosts: [
      '.gitpod.dev',
      '.gitpod.io'
    ]
  }
},
devServer: {
  host: '0.0.0.0',
  port: 3000
}
```

**Start the dev server:**
```bash
npm run dev
```

The server will be available at the Gitpod preview URL (port 3000).

**Note:** The configuration ensures:
- Server binds to `0.0.0.0` (accessible externally)
- HMR (Hot Module Replacement) works over WebSocket Secure (wss)
- Gitpod domains (`.gitpod.dev` and `.gitpod.io`) are in the allowed hosts list
- Gitpod's proxy handles the connection properly

**Important:** After changing `nuxt.config.ts`, you must restart the dev server for changes to take effect.


## Branch Protection and Pull Request Workflow

**This repository enforces branch protection on the `main` branch.**

### What This Means

- Direct pushes to `main` are blocked
- All changes must go through Pull Requests
- CI checks (linting, build) must pass before merging
- Code review may be required (depending on configuration)

### Workflow for Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/descriptive-name
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

3. **Push to the feature branch:**
   ```bash
   git push origin feature/descriptive-name
   ```

4. **Create a Pull Request:**
   ```bash
   gh pr create --title "Title" --body "Description"
   ```

5. **Wait for CI checks and review**

6. **Merge the PR** (via GitHub UI or CLI)

### For Repository Owners

If you need to make quick changes without PR workflow:
1. Temporarily disable branch protection in repository settings
2. Make and push changes
3. Re-enable branch protection

Or use the PR workflow even for your own changes (recommended).

## Project Structure

**This project uses Nuxt 4's new directory structure** with `app/` as the default srcDir.

```
/workspaces/junviglund/
├── app/                       # Application source directory (srcDir)
│   ├── app.vue               # Root application component
│   ├── pages/                # File-based routing
│   │   ├── index.vue         # Home page (blog posts from Sanity)
│   │   └── mapView.vue       # Interactive map with GeoJSON layers
│   ├── components/           # Reusable Vue components
│   │   ├── BlogPost.vue      # Blog post card with image gallery
│   │   └── MainNavigation.vue # Top navigation bar
│   ├── composables/          # Composable functions
│   └── assets/               # Assets (CSS, images)
│       └── css/
│           └── main.css      # Global styles
├── server/                   # Server-side code (resolved from rootDir)
│   ├── api/
│   │   ├── post.ts           # Fetches blog posts from Sanity
│   │   └── dataforsyningen/  # Danish cadastral data API proxy
│   └── utils/
│       └── sanity.ts         # Shared Sanity client
├── content/                  # Static GeoJSON files (resolved from rootDir)
│   ├── buildings.json        # Building polygons
│   ├── planning.json         # Planning areas
│   └── planting.json         # Planting zones
├── types/                    # Shared TypeScript types (resolved from rootDir)
│   ├── sanity.ts             # Sanity CMS types
│   └── geojson.ts            # GeoJSON types
├── public/                   # Static assets (resolved from rootDir)
├── nuxt.config.ts            # Nuxt configuration
└── tsconfig.json             # TypeScript configuration
```

### Path Resolution

- `~` alias points to `app/` (the srcDir)
- `~/components` resolves to `app/components/`
- `~/pages` resolves to `app/pages/`
- `@/assets` resolves to `app/assets/`
- For files outside `app/` (like `content/`), use relative paths

## Common Tasks

### Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview
```

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lintfix

# Markdown linting
npm run mdlint
```

## Data Sources

### Sanity CMS
- **Purpose:** Blog posts with rich text and images
- **API Route:** `/api/post`
- **Client:** `@sanity/client` initialized in `server/api/post.ts`
- **Image Optimization:** `@sanity/image-url` builder

### Local GeoJSON Content
- **Location:** `/content/*.json` (root directory, not in `app/`)
- **Access:** Direct JSON imports using relative paths (e.g., `import data from '../../content/planting.json'`)
- **Format:** Standard GeoJSON FeatureCollections with custom properties
- **Note:** We use direct JSON imports (not `@nuxt/content` module) for simplicity and better compatibility with Nuxt 4

### External API
- **Dataforsyningen:** Danish cadastral data (property boundaries)
- **Proxy Route:** `/api/dataforsyningen/jordstykker`
- **Parameters:** `ejerlavkode` (number), `matrikelnr` (string)

## Code Patterns and Conventions

### TypeScript
- **Strict typing:** Use explicit types, avoid `any`
- **Shared types:** Located in `/types` directory
- **Composition API:** All components use `<script setup lang="ts">`

### Vue Components
- **Naming:** PascalCase for components, kebab-case for pages
- **Props:** Use `defineProps<Type>()` with TypeScript
- **Composables:** Use Nuxt auto-imports (`useFetch`, `useRuntimeConfig`, etc.)

### API Routes
- **Pattern:** Use `defineEventHandler` for all routes
- **Error Handling:** Use `createError()` for HTTP errors
- **Validation:** Always validate query parameters and inputs

### Data Fetching
```typescript
// Client-side: Use useFetch with error handling
const { data, error, pending } = await useFetch<Type>('/api/endpoint')

// Server-side: Use $fetch or Sanity client
const data = await $fetch('https://external-api.com/data')
```

### GeoJSON Structure
All GeoJSON files follow this pattern:
```json
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "name": "Feature name",
      "stroke": "#555555",
      "stroke-width": 2,
      "fill": "#555555",
      "fill-opacity": 0.5
    },
    "geometry": { ... }
  }]
}
```

## Important Notes for Agents

1. **NEVER commit or push changes unless explicitly asked to do so by the user.** This is critical - always wait for explicit permission before committing.

2. **This repository uses branch protection rules.** Direct pushes to the `main` branch are not allowed. All changes must go through Pull Requests. When the user asks to commit changes, remind them that they'll need to create a PR or temporarily disable branch protection.

3. **Type Safety:** Always use shared types from `/types` directory. Do not duplicate type definitions.

4. **Error Handling:** All data fetching operations must include error handling and loading states.

5. **Accessibility:** Always provide descriptive `alt` text for images and proper ARIA labels.

6. **Environment Variables:** Never hardcode sensitive data. Use `runtimeConfig` for configuration.

## Common Issues and Solutions

### Issue: "Blocked request" error in Gitpod
**Symptom:** Browser shows "This host is not allowed" when accessing Gitpod preview URL.

**Cause:** Vite's host checking blocks the Gitpod domain by default.

**Solution:** The `nuxt.config.ts` includes proper Gitpod configuration:
- `devServer.host: '0.0.0.0'` - Binds to all interfaces
- `vite.server.hmr` - Configures WebSocket for HMR

If you still see this error, restart the dev server.

### Issue: "queryContent is not defined" error (RESOLVED)
**Symptom:** Error when accessing pages that use `queryContent`.

**Cause:** Nuxt Content's `queryContent` auto-import not working with Nuxt 4 structure.

**Solution:** Changed to direct JSON imports instead of using Nuxt Content's query API.

The GeoJSON files are now imported directly in `mapView.vue` using relative paths:
```typescript
import plantingData from '../../content/planting.json'
import buildingsData from '../../content/buildings.json'
import planningData from '../../content/planning.json'
```

From `app/pages/mapView.vue`, we go up two directories (`../../`) to reach the root, then into `content/`.

This is simpler and more reliable for static JSON files.

### Issue: "Cannot find module" errors
**Solution:** Run `npm install` and `nuxt prepare` to regenerate type definitions.

### Issue: Sanity images not loading
**Solution:** Verify `SANITY_PROJECT_ID` and `SANITY_DATASET` environment variables are set.

### Issue: Map not rendering
**Solution:** Check that all GeoJSON files in `/content` are valid and properly formatted.

### Issue: TypeScript errors in components
**Solution:** Ensure shared types are imported from `/types` directory.

## Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Leaflet Documentation](https://leafletjs.com/)
- [GeoJSON Specification](https://geojson.org/)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)

## Repository Information

- **Repository:** https://github.com/localgod/junviglund
- **Owner:** localgod

## Deployment

### Cloudflare Pages
- **Production:** Automatic deployment on merge to `main` branch
- **Preview:** Automatic deployment on pull requests
- **Build Command:** `npm run generate`
- **Output Directory:** `.output/public`

### CI/CD Pipeline
GitHub Actions runs:
1. ESLint checks
2. Build verification
3. Deployment to Cloudflare Pages

All checks must pass before merging to `main`.

## Last Updated

2025-10-15

