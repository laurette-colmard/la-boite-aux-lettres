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

<style lang="css">
html, body, #__nuxt {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>

<style lang="css" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff;
  color: #000;
  font-family: 'Abbiocco Beta', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  gap: 1.5rem;
  text-align: center;
  padding: 2rem;
  box-sizing: border-box;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

h1 {
  font-size: clamp(6rem, 15vw, 12rem);
  line-height: 0.85;
  margin: 0;
  font-family: 'Bazaar', sans-serif;
}

p {
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin: 0;
  letter-spacing: 0.03em;
}

a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #000;
  font-size: 0.9rem;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.arrow-icon {
  width: 12px;
}
</style>
