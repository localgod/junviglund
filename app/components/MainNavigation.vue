<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="text-2xl font-bold">
        Junviglund
      </NuxtLink>
    </template>

    <template #right>
      <UHeaderLinks>
        <UHeaderLink to="/" label="Hjem" exact />
        <UHeaderLink to="/mapView" label="Kort" />
      </UHeaderLinks>
    </template>
  </UHeader>
</template>
