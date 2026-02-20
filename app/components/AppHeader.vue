<script setup lang="ts">
const isLargeScreen = useMediaQuery('(min-width: 1024px)')

const appConfig = useAppConfig()
const { height } = useWindowSize()

const  scrollThreshold = computed(() => {    
  return Math.round(height.value * 0.68);
})

const { isScrolled } = useScroll(scrollThreshold.value)
</script>

<template>
  <header class="app-header" id="top">
    <img class="brand-logo" src="~/assets/images/brand-logo.svg" :alt="`${appConfig.title} - Logo`" />
    <div>
      <h1>
        <img class="brand" src="~/assets/images/brand-compact.svg" alt="" />
        <span class="sr-only">{{ appConfig.title }}</span>
      </h1>
      <div>
        <p>{{ appConfig.description }}</p>
        <p>{{ appConfig.description2 }}</p>
      </div>
    </div>
  </header>
  <header class="app-header--sticky" v-if="isScrolled">
    <img src="~/assets/images/brand.svg" :alt="appConfig.title" />
    <nav aria-label="Main navigation">
      <NuxtLink to="#about">
        <img class="arrow-icon" src="~/assets/icons/arrow-down-black.svg" alt="" />
        About
      </NuxtLink>
      <NuxtLink v-if="isLargeScreen" to="#top">
        <img class="arrow-icon" src="~/assets/icons/arrow-up-black.svg" alt="" />
        Back on top
      </NuxtLink>
    </nav>
  </header>
</template>

<style lang="css" scoped>
@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.app-header {
  display: grid;
  padding: var(--space-12) var(--space-8);
  height: 68vh;
  box-sizing: border-box;
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

.app-header > * {
  grid-row: 1;
  grid-column: 1;
}

.app-header > div {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-self: end;
}

.app-header--sticky {
  display: flex;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  position: fixed;
  top: 0;
  width: 100%;
  height: 34px;
  padding: var(--space-3) var(--space-4);
  align-items: center;
  animation: slideDown 0.3s ease;
  z-index: 10;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.app-header--sticky img {
  height: 11px;
}

.brand-logo {
  justify-self: end;
  align-self: start;
  width: 135px;
}

h1 {
  margin: 0;
  padding: 0;
  line-height: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.brand {
  width: 300px;
}

nav {
  display: flex;
  gap: var(--space-10);
  margin-left: auto;
}

a {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  color: inherit;
  font-size: var(--text-sm);
}

p {
  font-size: var(--text-lg);
  line-height: 24px;
}

@media (min-width: 768px) {
  .app-header {
    height: 56.25vw;
  }

  .app-header > div > div {
    display: flex;
    flex-direction: row;
    gap: var(--space-1);
  }

  .brand {
    width: 332px;
  }

  .brand-logo {
    width: 168px;
  }
}

@media (min-width: 1024px) {
  .app-header--sticky {
    height: 64px;
    padding: var(--space-4) var(--space-16);
  }

  .app-header--sticky img {
    height: 24px;
  }

  .brand-logo {
    width: 228px;
  }

  .brand {
    width: 460px;
  }
}

@media (min-width: 1536px) {
  .brand-logo {
    width: 340px;
  }

  .brand {
    width: 688px;
  }
}

@media (min-width: 1920px) {
  .brand-logo {
    width: 447px;
  }

  .brand {
    width: 892px;
  }
}
</style>