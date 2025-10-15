<template>
  <div class="container">
    <h1>Junviglund</h1>
    <div v-if="error" class="alert alert-danger" role="alert">
      Failed to load blog posts. Please try again later.
    </div>
    <div v-else-if="posts" class="row">
      <div v-for="p in posts" :key="p._id" class="col-sm-12">
        <BlogPost :post="p" />
      </div>
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
