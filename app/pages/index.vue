<template>
  <UContainer class="py-8">
    <h1 class="text-4xl font-bold mb-8">
      Junviglund
    </h1>

    <div
      v-if="status === 'pending'"
      class="space-y-8"
      aria-busy="true"
      aria-label="Indlæser blogindlæg"
    >
      <USkeleton
        v-for="index in 2"
        :key="index"
        class="h-96 w-full"
      />
    </div>

    <UAlert
      v-else-if="error"
      color="error"
      variant="subtle"
      title="Blogindlæggene kunne ikke hentes"
      description="Prøv igen nu eller kom tilbage senere."
      icon="i-lucide-circle-alert"
      class="mb-8"
    >
      <template #actions>
        <UButton
          label="Prøv igen"
          color="error"
          variant="soft"
          icon="i-lucide-refresh-cw"
          @click="retryPosts"
        />
      </template>
    </UAlert>

    <div v-else-if="posts?.length">
      <BlogPost v-for="p in posts" :key="p._id" :post="p" />
    </div>

    <UEmpty
      v-else
      icon="i-lucide-newspaper"
      title="Ingen blogindlæg endnu"
      description="Der er ikke udgivet nogen blogindlæg endnu."
    />
  </UContainer>
</template>

<script setup lang="ts">
const { data: posts, error, status, refresh } = await useFetch('/api/post')

const retryPosts = () => refresh()

if (error.value) {
  console.error('Failed to fetch posts:', error.value)
}
</script>
