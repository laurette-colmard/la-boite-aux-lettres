<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

const PROJECTS_PER_PAGE = 8
const displayCount = ref(PROJECTS_PER_PAGE)

const { data: projects } = await useAsyncData(`projects-${route.path}`, async () => {
  return await queryCollection('projects').order('order', 'ASC').all()
})

const hasMoreProjects = computed(() => (projects.value?.length ?? 0) > displayCount.value)

const loadMore = () => {
  displayCount.value += PROJECTS_PER_PAGE
}

const { data: about } = await useAsyncData(`about-${route.path}`, async () => {
  return await queryCollection('content').path('/about').first()
})

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ],
})

const { url: siteUrl, description: siteDescription } = useSiteConfig()

useSeoMeta({
  title: appConfig.title,
  description: siteDescription,
  ogTitle: appConfig.title,
  ogDescription: siteDescription,
  ogImage: `${siteUrl}/images/og-image.png`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: appConfig.title,
  twitterDescription: siteDescription,
  twitterImage: `${siteUrl}/images/og-image.png`,
})

useSchemaOrg([
  definePerson({
    name: appConfig.author,
    jobTitle: 'Type Designer',
    url: siteUrl,
  }),
  defineWebSite({
    name: appConfig.siteName,
  }),
  defineWebPage(),
  ...(projects.value ?? []).map(project => ({
    '@type': 'CreativeWork',
    'name': project.title,
    'description': project.shortDescription,
    'image': `${siteUrl}${project.image}`,
    'author': { '@type': 'Person', 'name': appConfig.author },
  })),
])
</script>

<template>
  <template v-if="projects?.length">
    <section class="nuxt-content">
      <VProject
        v-for="(project, index) in projects"
        :key="project.title"
        :project="project"
        :class="{ 'visually-hidden': index >= displayCount }"
      />
      <div v-if="hasMoreProjects" class="load-more-wrap">
        <button class="load-more" @click="loadMore">
          <img class="arrow-icon" src="~/assets/icons/arrow-down-white.svg" alt="" />
          See more projects
        </button>
      </div>
    </section>
    <section id="about" v-if="about">
      <article>
        <h2>
          <img class="arrow-icon" src="~/assets/icons/arrow-down-black.svg" alt="" />
          {{ about.title }}
        </h2>
        <div>
          <p>{{ about.description }}</p>
          <p>{{ about.description2 }}</p>
        </div>
      </article>
    </section>
  </template>
  <template v-else>
    <div>No project at the moment ...</div>
  </template>
</template>

<style lang="css" scoped>
.nuxt-content {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  padding: var(--space-4);
}

.load-more-wrap {
  border-top: 1px solid var(--primary-color);
}

.load-more {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: none;
  border: none;
  color: var(--primary-color);
  padding: 0;
}

.load-more:hover {
  cursor: pointer;
  text-decoration: underline;
}

.visually-hidden {
  display: none;
}

#about {
  padding: 0 var(--space-4);
  margin-top: var(--space-4);
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

#about article {
  border-top: 1px solid var(--secondary-color);
  border-bottom: 1px solid var(--secondary-color);
  padding: var(--space-2) 0 var(--space-4) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

#about article > div {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.load-more,
#about article {
  font-size: 1rem;
}

article h2 {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 1rem;
}

@media (min-width: 768px) {
  .nuxt-content {
    padding: var(--space-8);
  }

  #about {
    margin-top: var(--space-8);
    padding: 0 var(--space-8);
  }

  #about article {
    padding-bottom: var(--space-8);
  }

  #about article > div {
    margin-left: 33.333%;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  article h2 {
    gap: var(--space-3);
  }
}

@media (min-width: 1024px) {
  .nuxt-content {
    padding: var(--space-12);
  }

  #about {
    margin-top: var(--space-10);
    padding: 0 var(--space-12);
  }

  #about article {
    padding-bottom: var(--space-10);
  }

  .load-more,
  #about article {
    font-size: var(--text-sm);
  }

  article h2 {
    font-size: var(--text-sm);
    gap: var(--space-2);
  }
}

@media (min-width: 1536px) {
  .nuxt-content {
    padding: var(--space-14);
  }

  article h2 {
    gap: var(--space-5);
  }

  #about {
    padding: 0 var(--space-14);
  }

  #about article > div {
    flex-direction: row;
    gap: var(--space-8);
  }

  #about article > div > p {
    width: 50%;
  }
}

@media (min-width: 1920px) {
  .nuxt-content {
    padding: var(--space-16);
  }

  #about {
    padding: 0 var(--space-16);
  }
}
</style>