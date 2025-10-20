<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold">
          {{ title }}
        </h3>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          @click="modal.close()"
        />
      </div>
    </template>

    <div class="flex items-center justify-center p-4">
      <img 
        :src="imageUrl"
        class="max-w-full max-h-[80vh] object-contain"
        :alt="title"
      >
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  imageUrl: string
  title: string
}>()

const modal = useModal()
</script>
