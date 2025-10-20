<template>
  <UContainer class="py-8">
    <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
      Junviglund
    </h1>
    
    <UAlert
      v-if="error"
      color="red"
      variant="soft"
      title="Error loading blog posts"
      description="Failed to load blog posts. Please try again later."
      icon="i-heroicons-exclamation-triangle"
    />
    
    <div v-else-if="posts" class="space-y-8">
      <BlogPost v-for="p in posts" :key="p._id" :post="p" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { Post } from '~/types/sanity'

const { data: posts, error } = await useFetch<Post[]>('/api/post')

if (error.value) {
  console.error('Failed to fetch posts:', error.value)
}
</script>

<style lang="css" scoped></style>
