# Junviglund frontend

## Overview

This repository provided a [frontend](https://junviglund.dk/) designed to integrate seamlessly with Sanity for structured content management. Leveraging the power of Nuxt.js, it focuses on content-driven web development with additional emphasis on geospatial data through the use of GeoJSON stored via `@nuxt/content`. The site employs Leaflet for the interactive display of map information.

## Key Features

### 1. Nuxt.js Framework

Built on [Nuxt.js](https://nuxt.com/), this project benefits from its progressive framework, offering features like server-side rendering, static site generation, and a flexible plugin system.

### 2. Content Management with Sanity

The CMS functionality is deeply integrated with [Sanity](https://www.sanity.io/), utilizing `@sanity/client` for seamless and structured content management.

### 3. GeoJSON Storage

Structured GeoJSON data is stored using `@nuxt/content`, enabling efficient handling and rendering of geospatial information.

### 4. Interactive Maps with Leaflet

Map information is displayed interactively using [Leaflet](https://leafletjs.com/), providing a dynamic and user-friendly mapping experience.

### 5. Development Tools

Development tools include `@nuxt/devtools` for enhanced development experience and various TypeScript dependencies (`@types/node`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`) for static typing.

### 6. Deployment with Cloudflare Pages

The application is hosted and deployed using [Cloudflare Pages](https://pages.cloudflare.com/). Automatic deployments occur in the following scenarios:

- **Pull Request to Test Site:** Any pull request triggers an automatic deployment to the test site, allowing for previewing changes before merging.
- **Merge to Master for Production Site:** Upon merging changes into the master branch, an automatic deployment to the production site takes place, ensuring a seamless transition of updates to the live environment.

## Scripts

The project provides essential scripts for development, building, and linting. Key scripts include:

- `dev`: Run the project in development mode.
- `build`: Build the project for production.
- `generate`: Generate static files.
- `lint`: Lint the code using ESLint.

## Instructions

1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Build for production: `npm run build`
