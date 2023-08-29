<script setup lang="ts">
import config from '../../config.json'
</script>

<template>
    <header>
        <div id="header-top">
            <router-link to="/">
                <h1>{{ config["title"] }}</h1>
            </router-link>
        </div>
        <div id="header-bottom">{{ config["subtitle"] }}</div>
    </header>
</template>

<style lang="scss">
#content header {
    border-bottom: 3px solid $color-matblack;

    #header-top {
        border-bottom: 1px solid $color-matblack;
        padding: 0 0 20px 0;
        position: relative;
    }

    #header-top h1 {
        display: inline-block;
        color: $color-matblack;
        font-family: Georgia, Merriweather, $fonts-serif;
        font-size: 3.5em;
        font-weight: normal;
        letter-spacing: -3px;
        text-decoration: none;
        margin: 0;
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
}
</style>