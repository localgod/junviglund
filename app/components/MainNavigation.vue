<template>
  <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <NuxtLink to="/" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
          Junviglund
        </NuxtLink>
        
        <nav class="flex gap-6">
          <NuxtLink 
            to="/" 
            class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
            active-class="text-green-600 dark:text-green-400"
            exact
          >
            Hjem
          </NuxtLink>
          <NuxtLink 
            to="/mapView"
            class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
            active-class="text-green-600 dark:text-green-400"
          >
            Kort
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>
