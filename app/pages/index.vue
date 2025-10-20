<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
      Junviglund
    </h1>
    
    <div
      v-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8"
    >
      <div class="flex items-start">
        <svg class="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <div>
          <h3 class="text-sm font-medium text-red-800 dark:text-red-200">Error loading blog posts</h3>
          <p class="text-sm text-red-700 dark:text-red-300 mt-1">Failed to load blog posts. Please try again later.</p>
        </div>
      </div>
    </div>
    
    <div v-else-if="posts">
      <BlogPost v-for="p in posts" :key="p._id" :post="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/sanity'

const { data: posts, error } = await useFetch<Post[]>('/api/post')

if (error.value) {
  console.error('Failed to fetch posts:', error.value)
}
</script>

<style lang="css" scoped></style>
