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
      <img v-if="popupImageToggled" class="popup-close" src="~/assets/icons/times-bazaar-white.svg" alt="" @click="popupImageToggled = false"  />
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
  text-decoration: underline;
  color: var(--primary-color);
}

header {
  display: flex;
  flex-direction: column;
}

.popup-close,
.trigger-additional {
  cursor: pointer;
  align-self: flex-end;
  margin-top: var(--space-3);
  box-sizing: border-box;
}

.popup-close {
  height: 20px;
  width: 20px;
}

.trigger-additional {
  font-family: var(--font-accent);
  background: transparent;
  color: var(--primary-color);
  border-radius: 16px;
  border: 2px solid var(--primary-color);
  font-size: 18px;
  line-height: 1;
  padding: var(--space-1) var(--space-3);
  transform: rotate(-2.6deg);
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.trigger-additional:hover {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  text-decoration: none;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
}

@media (min-width: 768px) {
  .popup-close {
    height: 24px;
    width: 24px;
  }

  .trigger-additional {
    border-radius: 20px;
    font-size: 18px;
  }

  h2 {
    gap: var(--space-3);
  }

  header > div {
    padding-left: var(--space-6);
  }

  .image-wrap > img {
    margin-bottom: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .popup-close {
    height: 28px;
    width: 28px;
  }

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
}

@media (min-width: 1536px) {
  .popup-close {
    height: 32px;
    width: 32px;
  }

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

  .trigger-additional {
    font-size: 26px;
  }
}

@media (min-width: 1920px) {
  .popup-close {
    height: 36px;
    width: 36px;
  }

  .trigger-additional {
    font-size: 30px;
  }
}
</style>