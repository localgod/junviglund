<template>
  <UContainer>
    <header class="border-b border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between py-4">
        <NuxtLink to="/" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary-500 transition-colors">
          Junviglund
        </NuxtLink>
        
        <nav class="flex gap-6">
          <NuxtLink 
            to="/" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
            active-class="text-primary-500 dark:text-primary-400"
            exact
          >
            Hjem
          </NuxtLink>
          <NuxtLink 
            to="/mapView"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
            active-class="text-primary-500 dark:text-primary-400"
          >
            Kort
          </NuxtLink>
        </nav>
      </div>
    </header>
  </UContainer>
</template>
