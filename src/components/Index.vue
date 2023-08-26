<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { type PageIndexJson, type Article } from '../pagenode.ts'
import SsgArticle from './SsgArticle.vue'

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
    <div id="content">
        <div v-if="api_response.state === `index`">
            <h2 v-if="api_response.index.indexes?.length !== 0">Subdirectories</h2>
            <ul v-if="api_response.index.indexes?.length !== 0">
                <template v-for="record in api_response.index.indexes">
                    <li><router-link :to="`/` + record.replace(`index.json`, ``)">{{ record.replace(`/index.json`, ``)
                    }}</router-link>
                    </li>
                </template>
            </ul>
            <h2 v-if="api_response.index.articles?.length !== 0">Articles</h2>
            <ul v-if="api_response.index.articles?.length !== 0">
                <template v-for="record in api_response.index.articles">
                    <li><router-link :to="`/` + record.path">{{ record.title
                    }}</router-link></li>
                </template>
            </ul>
        </div>
        <SsgArticle v-else-if="api_response.state === `article`" :article="api_response.article" />
        <div v-else>
            Error
        </div>
    </div>
</template>
