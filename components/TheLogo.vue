<script lang="ts" setup>
  //
</script>

<template>
  <picture class="logo">
    <source
      srcset="~/assets/images/logo-desktop.webp"
      media="(min-width: 680px)"
      width="564"
      height="318"
    />
    <img
      src="~/assets/images/logo-mobile.webp"
      width="300"
      height="169"
      loading="lazy"
      alt="Map traffic sources"
    />
  </picture>
</template>

<style lang="scss" scoped>
  .logo {
    display: flex;
    justify-content: center;
  }
</style>
