<script setup lang="ts">
// import { useRoute } from 'vue-router';
import { onUpdated, onUnmounted } from 'vue';
import { type Article } from '../pagenode.ts'
import { initMathJax, renderByMathjax } from 'mathjax-vue3'

// const route = useRoute();
const renderContent = () => {
    const el = document.getElementById('content');
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
    <div id="content">
        <article v-html="props.article.body" />
    </div>
</template>