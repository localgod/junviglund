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
  <UHeader
    title="Junviglund"
    to="/"
    :ui="{ title: 'text-2xl' }"
  >
    <UNavigationMenu :items="items" />

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="w-full"
      />
    </template>
  </UHeader>
</template>
