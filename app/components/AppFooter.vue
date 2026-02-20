<script setup lang="ts">
const appConfig = useAppConfig()

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
        Laurette Colmard<br>
        29 rue Colonel Bougault, 38100 Grenoble (FR)<br>
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