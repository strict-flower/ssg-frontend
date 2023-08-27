<script setup lang="ts">
import { type PageIndexJson } from '../pagenode.ts'

const props = defineProps<{
    index: PageIndexJson
}>();
</script>

<template>
    <h2 v-if="props.index.indexes?.length !== 0">Subdirectories</h2>
    <ul v-if="props.index.indexes?.length !== 0">
        <li v-for="record in props.index.indexes">
            <router-link :to="`/` + record.replace(`index.json`, ``)">{{ record.replace(`/index.json`, ``)
            }}</router-link>
        </li>
    </ul>
    <h2 v-if="props.index.articles?.length !== 0">Articles</h2>
    <ul v-if="props.index.articles?.length !== 0">
        <li v-for="record in props.index.articles">
            <router-link :to="`/` + record.path">{{ record.title
            }}</router-link>
        </li>
    </ul>
</template>