<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content';

const props = defineProps<{
  project: ProjectsCollectionItem
}>()

const isMediumScreen = useMediaQuery('(min-width: 768px)')
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
          <button v-if="isMediumScreen && hasDescription" @click="handleToggle">
            <img v-if="descToggled" src="~/assets/icons/times-white.svg" alt="" />
            <img v-else src="~/assets/icons/cross-white.svg" alt="" />
          </button>
        </ClientOnly>
      </h2>
      <div>
        <p v-if="descToggled">{{ project.description }}</p>
        <p v-else>{{ project.shortDescription }}</p>
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
      <img :src="project.image" :alt="project.title" />
      <img v-if="popupImageToggled" :src="project.popupImage" :alt="project.title" />
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
  font-size: 18px;
  line-height: 20px;;
}

h2 {
  padding: var(--space-2) 0 0;
  display: flex;
  gap: var(--space-2);
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

header > div {
  padding-left: var(--space-5);
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
  padding: var(--space-1) var(--space-2);
}

.popup-close {
  width: 28px;
}

.trigger-additional {
  font-family: var(--font-accent);
  background: transparent;
  color: var(--primary-color);
  border-radius: 16px;
  border: 2px solid var(--primary-color);
  font-size: var(--text-lg);
  line-height: var(--leading-tight);
  transform: rotate(-2.6deg);
  text-decoration: none;
}

@media (min-width: 768px) {
  .trigger-additional {
    border-radius: 20px;
  }
}

@media (min-width: 1024px) {
  h2 button img {
    width: 14px;
  }

  .popup-close,
  .trigger-additional {
    padding: var(--space-2) var(--space-2);
  }

  .trigger-additional {
    border-radius: 24px;
  }
}
</style>