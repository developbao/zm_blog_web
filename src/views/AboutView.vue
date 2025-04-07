<script setup>
import AboutContent from '../components/about/index.vue'
</script>

<template>
  <div class="about">
    <AboutContent />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
