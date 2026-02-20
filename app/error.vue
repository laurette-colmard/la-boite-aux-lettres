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
    <div class="error-content">
      <h1>{{ error.statusCode }}</h1>
      <p>{{ title }}</p>
    </div>
    <NuxtLink to="/">
      <img class="arrow-icon" src="~/assets/icons/arrow-up-black.svg" alt="" />
      Back to home
    </NuxtLink>
  </div>
</template>

<style lang="css" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  background-color: #fff;
  color: #000;
  font-family: 'Abbiocco Beta', system-ui, sans-serif;
  gap: 2rem;
  text-align: center;
  padding: 1rem;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

h1 {
  font-size: 8rem;
  line-height: 1;
  margin: 0;
  font-family: 'Bazaar', sans-serif;
}

p {
  font-size: 1.25rem;
  margin: 0;
}

a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #000;
  font-size: 1rem;
}

.arrow-icon {
  width: 12px;
}
</style>
