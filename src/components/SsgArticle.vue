<script setup lang="ts">
import { onUpdated, onUnmounted } from 'vue';
import { type Article } from '../pagenode.ts'
import { initMathJax, renderByMathjax } from '../mathjax.ts'

const renderContent = () => {
    const el = document.getElementById('content');
    if (el === null) {
        return;
    }
    renderByMathjax(el);
};

const mathjax_conf = {
    loader: {
        load: ['[custom]/xypic.js', '[tex]/bussproofs', '[tex]/boldsymbol'],
        paths: { custom: 'https://cdn.jsdelivr.net/gh/sonoisa/XyJax-v3@3.0.1/build/' }
    },
    tex: {
        packages: { '[+]': ['xypic', 'bussproofs', 'boldsymbol'] },
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        macros: {
            llbracket: '\\mathopen{\\lbrack\\!\\lbrack}',
            rrbracket: '\\mathclose{\\rbrack\\!\\rbrack}',
            phi: '\\varphi',
        }
    }
};

const props = defineProps<{
    article: Article
}>();

const convertToPostDate = (unixtime: number) => {
    const date = new Date((unixtime + 9 * 3600) * 1000);
    // let x = date.toISOString().split("T");
    const month_strings = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    return `${month_strings[date.getMonth() - 1]} ${("0" + date.getDate()).slice(-2)}, ${date.getFullYear()}`;
};

onUpdated(() => {
    if (!window.MathJax) {
        initMathJax(mathjax_conf, renderContent);
    } else {
        renderContent();
    }
});


onUnmounted(() => {
    if (!window.MathJax) {
        return;
    }
    window.MathJax.typesetClear();
});
</script>

<template>
    <article>
        <div class="date">{{ convertToPostDate(props.article.created_at) }}</div>
        <router-link :to="`/` + props.article.url" class="h2 title">
            {{ props.article.title }}
        </router-link>
        <div v-html="props.article.body" class="body"></div>
    </article>
</template>
