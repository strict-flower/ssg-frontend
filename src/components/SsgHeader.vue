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