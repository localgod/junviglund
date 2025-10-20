<template>
  <article class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {{ post?.title }}
      </h2>

      <img 
        v-if="post?.mainImage" 
        :src="builder.image(post.mainImage).width(1200).fit('crop').url()" 
        class="w-full rounded-lg mb-6" 
        :alt="post?.title || 'Blog post image'"
      >

      <div class="prose prose-gray dark:prose-invert max-w-none mb-6 text-gray-700 dark:text-gray-300">
        <PortableText :value="post?.body || []" />
      </div>

      <div v-if="post?.images" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="img in post.images" :key="img._key">
          <img
            :src="builder.image(img).width(190).height(190).fit('clip').url()"
            class="w-full h-auto rounded-lg cursor-pointer hover:opacity-80 transition-opacity border border-gray-200 dark:border-gray-700"
            :alt="`${post?.title || 'Blog post'} gallery image`"
            @click="openModal(img)"
          >
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div 
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      @click="isModalOpen = false"
    >
      <div class="relative max-w-7xl max-h-screen p-4" @click.stop>
        <button
          class="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 z-10"
          @click="isModalOpen = false"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img 
          v-if="selectedImage"
          :src="builder.image(selectedImage).width(1600).fit('scale').url()" 
          class="max-w-full max-h-[90vh] object-contain rounded-lg"
          :alt="`${post?.title || 'Blog post'} full size image`"
        >
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import imageUrlBuilder from '@sanity/image-url'
import type { Post, SanityImage } from '~/types/sanity'

const runtimeConfig = useRuntimeConfig()

const builder = imageUrlBuilder({
  projectId: runtimeConfig.public.sanityProjectId,
  dataset: runtimeConfig.public.sanityDataset
})

const isModalOpen = ref(false)
const selectedImage = ref<SanityImage | null>(null)

const openModal = (img: SanityImage) => {
  selectedImage.value = img
  isModalOpen.value = true
}

defineProps<{
  post?: Post
}>()
</script>


