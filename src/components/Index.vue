<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { type PageIndexJson, type Article } from '../pagenode.ts'
import SsgArticle from './SsgArticle.vue'
import SsgIndexes from './SsgIndexes.vue'

const route = useRoute();

const api_response = ref({ state: "init", index: {} as PageIndexJson, article: {} as Article });

const fetch_data = async () => {
    if (route.fullPath.endsWith("/")) {
        let data = await fetch("/json" + route.fullPath + "index.json");
        if (!data.ok) {
            api_response.value.state = "error";
            return;
        }
        api_response.value.state = "index";
        api_response.value.index = await data.json() as PageIndexJson;
    } else { // article json
        let data = await fetch("/json/" + route.fullPath + ".json");
        if (!data.ok) {
            api_response.value.state = "error";
            return;
        }
        api_response.value.state = "article";
        api_response.value.article = await data.json() as Article;
    }
};

onBeforeMount(fetch_data);
watch(
    () => route.fullPath,
    fetch_data,
);
</script>

<template>
    <SsgIndexes v-if="api_response.state === `index`" :index="api_response.index" />
    <SsgArticle v-else-if="api_response.state === `article`" :article="api_response.article" />
    <template v-else>
        Error
    </template>
</template>
