<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { type PageIndexJson, type Article } from '../pagenode.ts'
import SsgArticle from './SsgArticle.vue'
import SsgIndexes from './SsgIndexes.vue'
import config from '../../config.json'

const route = useRoute();

const DEFAULT_TITLE = config["title"] as string;

const api_response = ref({ state: "init", index: {} as PageIndexJson, article: {} as Article });

const fetch_data = async () => {
    if (route.path.endsWith("/")) {
        let data = await fetch("/json" + route.path + "index.json");
        if (!data.ok) {
            api_response.value.state = "error";
            return;
        }
        api_response.value.state = "index";
        api_response.value.index = await data.json() as PageIndexJson;
    } else { // article json
        let data = await fetch("/json/" + route.path + ".json");
        if (!data.ok) {
            api_response.value.state = "error";
            return;
        }
        api_response.value.state = "article";
        api_response.value.article = await data.json() as Article;

        document.title = `${api_response.value.article.title} - ${DEFAULT_TITLE}`;
    }
};

onBeforeMount(fetch_data);
watch(
    () => route.path,
    fetch_data,
);
</script>

<template>
    <SsgIndexes v-if="api_response.state === `index`" :index="api_response.index" />
    <SsgArticle v-else-if="api_response.state === `article`" :article="api_response.article" />
    <template v-else>
        Loading...
    </template>
</template>

<style lang="scss">
#content {
    min-width: 900px;
    width: 65%;
    margin: 0 auto;
    font-family: Georgia, Merriweather, $fonts-serif;
    font-size: 1em;
    line-height: 1.6em;

    a {
        color: $color-link;
        text-decoration: none;

        &:hover {
            color: $color-link-hover;
        }
    }
}
</style>