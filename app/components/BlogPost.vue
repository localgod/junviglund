<template>
  <article>
    <UCard class="mb-8">
      <template #header>
        <h2 class="text-2xl font-bold">
          {{ post?.title }}
        </h2>
      </template>

      <NuxtImg
        v-if="post?.mainImage"
        provider="sanity"
        :src="post.mainImage.asset._ref"
        width="1200"
        sizes="100vw lg:1200px"
        loading="lazy"
        class="mb-6 w-full rounded-lg"
        :alt="post?.title || 'Billede til blogindlæg'"
      />

      <div class="prose dark:prose-invert max-w-none mb-6">
        <PortableText :value="post?.body || []" />
      </div>

      <div
        v-if="post?.images?.length"
        class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6"
      >
        <button
          v-for="(img, index) in post.images"
          :key="img._key"
          type="button"
          class="group cursor-pointer rounded-lg outline-primary/25 focus-visible:outline-3"
          :aria-label="`Vis billede ${index + 1} i stort format`"
          @click="openModal(img)"
        >
          <NuxtImg
            provider="sanity"
            :src="img.asset._ref"
            width="190"
            height="190"
            fit="inside"
            loading="lazy"
            class="h-auto w-full rounded-lg transition-opacity group-hover:opacity-80 group-focus-visible:opacity-80 motion-reduce:transition-none"
            :alt="`${post?.title || 'Blogindlæg'}, billede ${index + 1}`"
          />
        </button>
      </div>
    </UCard>

    <UModal
      v-model:open="isModalOpen"
      :title="post?.title || 'Billedvisning'"
      description="Forstørret billede fra galleriet"
      :ui="{ content: 'max-w-7xl' }"
    >
      <template #body>
        <div class="flex items-center justify-center">
          <NuxtImg
            v-if="selectedImage"
            provider="sanity"
            :src="selectedImage.asset._ref"
            width="1600"
            fit="inside"
            class="max-h-[80dvh] max-w-full object-contain"
            :alt="`${post?.title || 'Blogindlæg'} i stort format`"
          />
        </div>
      </template>
    </UModal>
  </article>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { Serialize } from 'nuxt/app'
import type { Post, SanityImage } from '../../types/sanity'

defineProps<{
  post?: Serialize<Post>
}>()

const isModalOpen = ref(false)
const selectedImage = ref<Serialize<SanityImage> | null>(null)

const openModal = (img: Serialize<SanityImage>) => {
  selectedImage.value = img
  isModalOpen.value = true
}
</script>
