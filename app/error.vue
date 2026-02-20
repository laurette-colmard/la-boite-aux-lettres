<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    message: string
  }
}>()

const title = computed(() =>
  props.error.statusCode === 404
    ? 'Page not found'
    : 'Something went wrong'
)

useSeoMeta({
  title: title.value,
})
</script>

<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ title }}</p>
    <NuxtLink to="/">Back to home</NuxtLink>
  </div>
</template>

<style lang="css" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  font-family: var(--font-primary);
  gap: var(--space-4);
}

h1 {
  font-size: 6rem;
  line-height: 1;
  margin: 0;
}

p {
  font-size: var(--text-lg);
  margin: 0;
}

a {
  color: var(--secondary-color);
  font-size: var(--text-base);
  text-decoration: underline;
}
</style>
