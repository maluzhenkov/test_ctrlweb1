<template>
  <div class="default-layout">
    <TheHeader />
    <Nuxt />
  </div>
</template>

<style lang="scss">
.default-layout {
  padding-top: rem(56);
  @media (max-width: $md) {
    padding-top: 0;
  }
}
</style>
