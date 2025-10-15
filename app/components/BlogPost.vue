<template>
  <div class="card">
    <img 
      v-if="post?.mainImage" 
      :src="builder.image(post.mainImage).width(1200).fit('crop').url()" 
      class="card-img-top" 
      :alt="post?.title || 'Blog post image'"
    >

    <div class="card-body">
      <h5 class="card-title">
        {{ post?.title }}
      </h5>
      <p class="card-text">
        <PortableText :value="post?.body || []" />
      </p>
      <div v-if="post?.images" class="row row-cols-1 row-cols-md-6 g-4">
        <div v-for="img in post.images" :key="img._key" class="col">
          <div class="card">
            <img
              :src="builder.image(img).width(190).height(190).fit('clip').url()"
              class="card-img-top"
              :alt="`${post?.title || 'Blog post'} gallery image`"
              data-bs-toggle="modal"
              :data-bs-target="'#' + img._key"
              role="button"
              tabindex="0"
            >
          </div>
          <div 
            :id="img._key" 
            class="modal fade" 
            tabindex="-1" 
            :aria-labelledby="`modal-title-${img._key}`"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-fullscreen">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 :id="`modal-title-${img._key}`" class="modal-title">
                    {{ post?.title }}
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div class="modal-body">
                  <img 
                    :src="builder.image(img).width(1000).fit('scale').url()" 
                    class="modal-image"
                    :alt="`${post?.title || 'Blog post'} full size image`"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import imageUrlBuilder from '@sanity/image-url'
import type { Post } from '~/types/sanity'

const runtimeConfig = useRuntimeConfig()

const builder = imageUrlBuilder({
  projectId: runtimeConfig.public.sanityProjectId,
  dataset: runtimeConfig.public.sanityDataset
})

defineProps<{
  post?: Post
}>()
</script>

<style lang="css" scoped>
.modal-image {
  max-width: 100%;
  height: auto;
}

.card-img-top[role="button"] {
  cursor: pointer;
}
</style>
