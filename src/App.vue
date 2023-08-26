<script setup lang="ts">
import data from './assets/data.json';
import SSGArticle from './components/SSGArticle.vue';
import SSGDirectory from './components/SSGDirectory.vue';
</script>

<template>
  <ul>
    <SSGDirectory :path="data.IndexPage[0]" :records="data.IndexPage[1]" />
  </ul>
</template>
