<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Hjem',
    to: '/',
    active: route.path === '/'
  },
  {
    label: 'Kort',
    to: '/mapView',
    active: route.path === '/mapView'
  }
])
</script>

<template>
  <UHeader>
    <template #title>
      <NuxtLink to="/" class="text-2xl font-bold">
        Junviglund
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items" />
  </UHeader>
</template>
