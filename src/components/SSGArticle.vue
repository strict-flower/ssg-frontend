<script setup lang="ts">
defineProps<{ node }>()

</script>

<template>
  <li><a :href="node[0]"> /{{ node[0] }} </a> (Last modified: {{ node[2] }})</li>
</template>
