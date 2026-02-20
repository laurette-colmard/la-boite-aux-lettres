<script setup lang="ts">
const appConfig = useAppConfig()

const contact = {
  name: appConfig.author,
  street: '29 rue Colonel Bougault',
  postalCode: '38100',
  city: 'Grenoble',
  country: 'FR',
}

useSchemaOrg([
  {
    '@type': 'Person',
    'name': contact.name,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': contact.street,
      'postalCode': contact.postalCode,
      'addressLocality': contact.city,
      'addressCountry': contact.country,
    },
  },
])

onMounted(() => {
  const protectedEmail = document.getElementById('protected-email') as HTMLAnchorElement

  if (protectedEmail) {
    const email = 'laurette.colmard' + '@' + 'gmail' + '.' + 'com'
    protectedEmail.href = 'mailto:' + email
    protectedEmail.innerHTML = 'moc.' + 'liamg' + '@' + 'dramloc.' + 'etterual'
  }
})
</script>

<template>
  <footer>
    <div class="wrapper">
      <img src="~/assets/images/brand-compact.svg" :alt="appConfig.title"></img>
      <address>
        {{ contact.name }}<br>
        {{ contact.street }}, {{ contact.postalCode }} {{ contact.city }} ({{ contact.country }})<br>
        <a id="protected-email" class="protected"></a>
      </address>
    </div>
  </footer>
</template>

<style lang="css" scoped>
.protected {
  unicode-bidi: bidi-override;
  direction: rtl;
  color: inherit;
}

footer {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 0 var(--space-6);
}

.wrapper {
  display: flex;
  align-items: flex-end;
  gap: var(--space-6);
  padding: var(--space-6) 0;
}

address {
  font-size: var(--text-xs);
  line-height: 14.5px
}

img {
  height: 64px;
}

@media (min-width: 768px) {
  .wrapper {
    gap: var(--space-12);
  }

  img {
    height: 104px;
  }
}

@media (min-width: 1024px) {
  .wrapper {
    gap: var(--space-16);
  }

  img {
    height: 120px;
  }
}

@media (min-width: 1536px) {
  .wrapper {
    gap: 20rem;
  }

  img {
    height: 146px;
  }
}

@media (min-width: 1920px) {
  .wrapper {
    gap: 28rem;
  }

  img {
    height: 155px;
  }
}
</style>