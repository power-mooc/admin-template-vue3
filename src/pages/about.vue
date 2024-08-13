<template>
  <div class="about">
    <RouterLink to="/">home</RouterLink>
    <RouterLink to="/about">about</RouterLink>
    <h1>This is an about page</h1>
    <NetIcon url="//at.alicdn.com/t/font_1791095_hy6b9xbrdsk.css" type="qian"></NetIcon>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router/auto';

definePage({
  meta: {
    title: 'pages.about',
    icon: 'mdi:user'
  }
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
