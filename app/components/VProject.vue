<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content';

const props = defineProps<{
  project: ProjectsCollectionItem
}>()

const isTabletScreen = useMediaQuery('(min-width: 768px)')
const descToggled = ref<boolean>(false)
const popupImageToggled = ref<boolean>(false) 

const hasDescription = computed(() => {
  return props.project.description && props.project.description.length > 0
})

const hasExternalLink = computed(() => {
  return Boolean(props.project.toggleUrl)
})

const hasExtraImage = computed(() => {
  return Boolean(props.project.popupImage)
})

if (props.project.popupImage) {
  useHead({
    link: [{ rel: 'preload', as: 'image', href: props.project.popupImage }],
  })
}

function handleToggle() {
  descToggled.value = !descToggled.value
}
</script>

<template>
  <article class="project">
    <header>
      <h2>
        <img class="arrow-icon" src="~/assets/icons/arrow-down-white.svg" alt="" />
        {{ project.title }}
        <ClientOnly>
          <button v-if="isTabletScreen && hasDescription" @click="handleToggle">
            <img v-if="descToggled" src="~/assets/icons/times-white.svg" alt="" />
            <img v-else src="~/assets/icons/cross-white.svg" alt="" />
          </button>
        </ClientOnly>
      </h2>
      <div>
        <p v-html="project.shortDescription"></p>
        <Transition name="fade">
          <p v-if="descToggled">{{ project.description }}</p>
        </Transition>
      </div>
      <a v-if="hasExternalLink" class="trigger-additional" :href="project.toggleUrl" target="_blank" rel="noopener noreferrer">
        {{ project.toggleText }}
      </a>
      <button v-if="hasExtraImage && !popupImageToggled" type="button" class="trigger-additional" @click="popupImageToggled = true">
        {{ project.toggleText }}
      </button>
      <button v-if="popupImageToggled" class="popup-close" @click="popupImageToggled = false">
        x
      </button>
    </header>
    <div class="image-wrap">
      <img :src="project.image" :alt="`${project.title} — ${project.shortDescription}`" />
      <Transition name="fade">
        <img v-if="popupImageToggled" :src="project.popupImage" :alt="`${project.title} — alternate view`" />
      </Transition>
    </div>
  </article>
</template>

<style lang="css" scoped>
article {
  border-top: 1px solid var(--primary-color);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

header > div,
h2 {
  font-size: 1rem;
}

h2 {
  padding: var(--space-2) 0 0;
  display: flex;
  gap: var(--space-1);
  align-items: center;
}

.image-wrap {
  position: relative;
}

.image-wrap img:nth-child(2) {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

h2 button {
  margin-left: auto;
  background: transparent;
  border: none;
  cursor: pointer;
}

h2 button img {
  width: 12px;
}

.image-wrap > img {
  width: 100%;
  margin-bottom: var(--space-4);
}

article:last-child .image-wrap > img {
  margin-bottom: 0;
}

header > div {
  padding-left: var(--space-4);
}

header > div :deep(a) {
  color: var(--primary-color);
}

header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.popup-close,
.trigger-additional {
  cursor: pointer;
  align-self: flex-end;
  margin-top: var(--space-3);
  box-sizing: border-box;
  font-family: var(--font-accent);
  background: transparent;
  color: var(--primary-color);
  border-radius: 16px;
  border: 2px solid var(--primary-color);
  font-size: 18px;
  line-height: 1;
  padding: 2px var(--space-2);
  transition: background-color 0.2s ease, color 0.2s ease;
  text-decoration: none;
}

.popup-close {
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.trigger-additional {
  transform: rotate(-2.6deg);
}

.popup-close:hover,
.trigger-additional:hover {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
}

@media (min-width: 768px) {
  h2 {
    gap: var(--space-3);
  }

  header > div {
    padding-left: var(--space-6);
  }

  .image-wrap > img {
    margin-bottom: var(--space-8);
  }

  .trigger-additional,
  .popup-close {
    border-radius: 20px;
    font-size: 18px;
  }
}

@media (min-width: 1024px) {
  h2 {
    font-size: var(--text-sm);
    gap: var(--space-2);
  }

  header > div {
    padding-left: var(--space-5);
    font-size: var(--text-sm);
  }

  h2 button img {
    width: 14px;
  }

  .trigger-additional {
    border-radius: 24px;
    font-size: 22px;
    padding: var(--space-1) var(--space-4);
  }

  .popup-close {
    font-size: 22px;
    padding: var(--space-1);
  }
}

@media (min-width: 1536px) {
  h2 {
     gap: var(--space-5);
  }

  header > div {
    padding-left: var(--space-8);
    display: flex;
  }

  header > div p {
    width: 50%;
  }

  .popup-close,
  .trigger-additional {
    font-size: 26px;
  }
}

@media (min-width: 1920px) {
  .popup-close,
  .trigger-additional {
    font-size: 30px;
  }
}
</style>