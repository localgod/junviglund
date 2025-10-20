<template>
  <UContainer class="py-8">
    <h1 class="text-4xl font-bold mb-8">
      Junviglund
    </h1>
    
    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      title="Error loading blog posts"
      description="Failed to load blog posts. Please try again later."
      icon="i-heroicons-exclamation-triangle"
      class="mb-8"
    />
    
    <div v-else-if="posts">
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
