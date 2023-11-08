<script setup lang="ts">
import { ref, watch } from 'vue';
import config from '../../config.json'
import { basename, scrollTop } from '../util.ts'
import { useRoute } from 'vue-router';

const route = useRoute();

const parentPath = ref("");

watch(
    () => route.path,
    () => {
        parentPath.value = basename(route.path.substring(0, route.path.length - (route.path.endsWith("/") ? 1 : 0)));
    },
);
</script>

<template>
    <header>
        <section id="header-top">
            <h1><router-link to="/">
                    {{ config["title"] }}
                </router-link>
            </h1>
            <nav>
                <router-link :to="parentPath" class="button" v-if="route.path !== `/`"
                    @click="scrollTop">Parent</router-link>
            </nav>
        </section>
        <div id="header-bottom">{{ config["subtitle"] }}</div>
    </header>
</template>

<style lang="scss">
#content>header {
    border-bottom: 3px solid $color-matblack;

    section#header-top {
        border-bottom: 1px solid $color-matblack;
        padding: 0 0 20px 0;
        display: flex;
        justify-content: space-between;

        h1 {
            display: block;
            font-family: Georgia, Merriweather, $fonts-serif;
            font-size: 3.5em;
            font-weight: normal;
            letter-spacing: -3px;
            text-decoration: none;
            margin: 0;
            width: 50%;

            a {
                color: $color-matblack;
                line-height: 1em;

                &:hover {
                    color: $color-matblack;
                }
            }
        }

        nav {
            width: 50%;
            text-align: right;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
        }

        a.button {
            line-height: 1em;
            font-size: 0.8em;
        }
    }
}

#header-bottom {
    font-size: 0.9em;
    padding: 8px 0;
    display: block;
    font-family: 'Dosis', $fonts-serif;
    text-align: center;

    a {
        color: #447777;
        font-weight: bold;
        text-decoration: none;
    }
}
</style>