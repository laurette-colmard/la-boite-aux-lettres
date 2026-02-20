<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

const PROJECTS_PER_PAGE = 8
const displayCount = ref(PROJECTS_PER_PAGE)

const { data: projects } = await useAsyncData(`projects-${route.path}`, async () => {
  return await queryCollection('projects').order('order', 'ASC').all()
})

const visibleProjects = computed(() => projects.value?.slice(0, displayCount.value) ?? [])
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

useSeoMeta({
  title: appConfig.title,
  description: appConfig.metaDesc,
  ogTitle: appConfig.title,
  ogDescription: appConfig.metaDesc,
  ogImage: '/images/og-image.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: appConfig.title,
  twitterDescription: appConfig.metaDesc,
  twitterImage: '/images/og-image.png',
})

useSchemaOrg([
  definePerson({
    name: 'Laurette Colmard',
    jobTitle: 'Type Designer',
    url: 'https://laboiteauxlettres.xyz',
  }),
  defineWebSite({
    name: 'La Boîte aux lettres',
  }),
  defineWebPage(),
  ...(projects.value ?? []).map(project => ({
    '@type': 'CreativeWork',
    'name': project.title,
    'description': project.shortDescription,
    'image': `https://laboiteauxlettres.xyz${project.image}`,
    'author': { '@type': 'Person', 'name': 'Laurette Colmard' },
  })),
])
</script>

<template>
  <template v-if="projects?.length">
    <section class="nuxt-content">
      <VProject
        v-for="project in visibleProjects"
        :key="project.title"
        :project="project"
      />
      <button v-if="hasMoreProjects" class="load-more" @click="loadMore">
        <img class="arrow-icon" src="~/assets/icons/arrow-down-white.svg" alt="" />
        See more projects
      </button>
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

.load-more {
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
  line-height: var(--leading-normal);
}

#about article > div {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.load-more,
#about article {
  font-size: 18px;
  line-height: 22px;
}

article h2 {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

@media (min-width: 768px) {
  #about {
    margin-top: var(--space-8);
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
}

@media (min-width: 1024px) {
  #about {
    margin-top: var(--space-10);
  }

  #about article {
    padding-bottom: var(--space-10);
  }

  #about article > div {
    padding-right: var(--space-4);
  }
}

@media (min-width: 1536px) {
  #about article > div {
    flex-direction: row;
    gap: var(--space-8);
    padding-right: var(--space-8);
  }

  #about article > div > p {
    width: 50%;
  }
}
</style>