<script setup lang="ts">
import SSGArticle  from './SSGArticle.vue'

defineProps<{ path: string, records }>()
</script>

<template>
<li><details>
  <summary>{{ path }}</summary>
  <ul>
    <template v-for="record in records">
      <SSGDirectory v-if="record.IndexPage !== undefined" :path="record.IndexPage[0]" :records="record.IndexPage[1]"/>
      <SSGArticle v-if="record.Article !== undefined" :node="record.Article"/>
    </template>
  </ul>
</details></li>
</template>
