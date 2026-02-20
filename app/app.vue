<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="css">
:root {
  /* Colors */
  --primary-color: #fff;
  --secondary-color: #000;

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Typography scale - Mobile first (base) */
  --text-xs: 0.75rem;
  --text-sm: 0.85rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;

  /* Line heights */
  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* Font families */
  --font-primary: 'Abbiocco Beta', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-accent: 'Bazaar', sans-serif;

  /* Breakpoints (for reference - use in media queries as raw values) */
  /* --bp-md: 768px */
  /* --bp-lg: 1024px */
  /* --bp-xl: 1536px */
  /* --bp-2xl: 1920px */
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  :root {
    --text-xs: 0.75rem;
    --text-sm: 0.9rem;
    --text-base: 1rem;
    --text-lg: 1.4rem;
    --text-xl: 1.5rem;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  :root {
    --text-xs: 0.95rem;
    --text-sm: 1.15rem;
    --text-base: 1.15rem;
    --text-lg: 1.75rem;
    --text-xl: 1.8rem;
  }
}

/* Large desktop (1536px+) */
@media (min-width: 1536px) {
  :root {
    --text-xs: 1rem;
    --text-sm: 1.35rem;
    --text-lg: 2.4rem;
  }
}

/* Extra large (1920px+) */
@media (min-width: 1920px) {
  :root {
    --text-xs: 1.15rem;
    --text-lg: 3.2rem;
  }
}

html, body, p, a, button, address, h2 {
  font-family: var(--font-primary);
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

html {
  scroll-behavior: smooth;
}

.arrow-icon {
  width: 12px;
}
</style>