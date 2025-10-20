<template>
  <div>
    <UCard class="mb-8">
      <template #header>
        <h2 class="text-2xl font-bold">
          {{ post?.title }}
        </h2>
      </template>

      <img 
        v-if="post?.mainImage" 
        :src="builder.image(post.mainImage).width(1200).fit('crop').url()" 
        class="w-full rounded-lg mb-6" 
        :alt="post?.title || 'Blog post image'"
      >

      <div class="prose dark:prose-invert max-w-none mb-6">
        <PortableText :value="post?.body || []" />
      </div>

      <div v-if="post?.images" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="img in post.images" :key="img._key">
          <img
            :src="builder.image(img).width(190).height(190).fit('clip').url()"
            class="w-full h-auto rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            :alt="`${post?.title || 'Blog post'} gallery image`"
            @click="openModal(img)"
          >
        </div>
      </div>
    </UCard>

    <Teleport to="body">
      <UModal v-if="isModalOpen" v-model="isModalOpen" fullscreen>
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold">
                {{ post?.title }}
              </h3>
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                @click="isModalOpen = false"
              />
            </div>
          </template>

          <div class="flex items-center justify-center p-4">
            <img 
              v-if="selectedImage"
              :src="builder.image(selectedImage).width(1600).fit('scale').url()" 
              class="max-w-full max-h-[80vh] object-contain"
              :alt="`${post?.title || 'Blog post'} full size image`"
            >
          </div>
        </UCard>
      </UModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import imageUrlBuilder from '@sanity/image-url'
import type { Post, SanityImage } from '~/types/sanity'

defineProps<{
  post?: Post
}>()

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
</script>


