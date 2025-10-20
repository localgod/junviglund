<template>
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
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import imageUrlBuilder from '@sanity/image-url'
import type { Post, SanityImage } from '~/types/sanity'

const props = defineProps<{
  post?: Post
}>()

const runtimeConfig = useRuntimeConfig()
const modal = useModal()

const builder = imageUrlBuilder({
  projectId: runtimeConfig.public.sanityProjectId,
  dataset: runtimeConfig.public.sanityDataset
})

const openModal = (img: SanityImage) => {
  modal.open({
    component: defineAsyncComponent(() => import('~/components/ImageModal.vue')),
    props: {
      imageUrl: builder.image(img).width(1600).fit('scale').url(),
      title: props.post?.title || 'Image'
    }
  })
}
</script>


