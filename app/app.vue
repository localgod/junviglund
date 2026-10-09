<script setup lang="ts">
import { da } from '@nuxt/ui/locale'

useHead({
  titleTemplate: title => title ? `${title} · Junviglund` : 'Junviglund'
})

if (import.meta.server) {
  useSeoMeta({
    description: 'Historier, billeder og kort fra Junviglund.',
    ogDescription: 'Historier, billeder og kort fra Junviglund.',
    ogSiteName: 'Junviglund',
    ogType: 'website'
  })
}
</script>

<template>
  <UApp :locale="da">
    <MainNavigation />
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
