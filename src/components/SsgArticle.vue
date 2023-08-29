<script setup lang="ts">
import { onUpdated, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { type Article } from '../pagenode.ts'
import { initMathJax, renderByMathjax } from '../mathjax.ts'

const route = useRoute();

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
    return `${month_strings[date.getUTCMonth()]} ${("0" + date.getUTCDate()).slice(-2)}, ${date.getUTCFullYear()}`;
};

const convertToPostDateTime = (unixtime: number) => {
    const date = new Date((unixtime + 9 * 3600) * 1000);
    let x = date.toISOString().split("T");
    return `${x[0].replace(/-/g, "/")} ${x[1].substring(0, x[1].lastIndexOf(":"))}`;
};

/* we can't use :target because It won't work on webcomponent */
const updateHashStyle = () => {
    for (const elem of document.getElementsByClassName("fn-active")) {
        elem.classList.remove("fn-active");
    }

    if (!route.hash.startsWith("#fn-")) {
        return;
    }

    const elem = document.getElementById(route.hash.substring(1));
    elem?.classList.add("fn-active");
};

onUpdated(() => {
    if (!window.MathJax) {
        initMathJax(mathjax_conf, renderContent);
    } else {
        renderContent();
    }

    document.querySelectorAll("div.details").forEach((node) => {
        node.outerHTML = "<details>" + node.innerHTML + "</details>"
    });

    updateHashStyle();
});

onUnmounted(() => {
    if (!window.MathJax) {
        return;
    }
    window.MathJax.typesetClear();
});

watch(
    () => route.hash,
    updateHashStyle
);
</script>

<template>
    <article v-if="props.article.body !== undefined">
        <div class="date">{{ convertToPostDate(props.article.created_at) }}</div>
        <router-link :to="`/` + props.article.url" class="h2 title">
            {{ props.article.title }}
        </router-link>
        <div v-html="props.article.body" class="body"></div>
        <div class="bottom">
            Created at: <router-link :to="`/` + props.article.url" class="time">
                {{ convertToPostDateTime(props.article.created_at) }}
            </router-link>
            <div class="tags" v-if="props.article.tags?.length !== 0">
                TAGS:
                <span class="tag" v-for=" tag in props.article.tags">{{ tag }}</span>
            </div>
        </div>
    </article>
</template>

<style lang="scss">
#content article {
    border-top: 1px solid $color-matblack;
    padding: 8px 0 0 0;

    .bottom {
        width: 100%;
        color: #444444;
        font-family: $fonts-sans-serif;
        font-size: 0.7em;
        line-height: 1.8;
        text-transform: uppercase;
        border-top: 1px solid $color-matblack;
        padding-top: 0.3em;

        .tags {
            text-transform: none !important;
            margin: 0 13px 0 0;

            .tag {
                font-weight: 500;

                &:not(:first-child)::before {
                    content: ", ";
                }
            }
        }

        a {
            color: #444444;
            text-transform: none;
            text-decoration: underline;

            &:hover {
                text-decoration: underline;
            }
        }

        .time {
            text-decoration: underline;
            font-weight: bold;
            text-transform: uppercase;
            text-align: right;
        }

    }

    .date {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.8em;
        margin-bottom: 10px;
        font-family: $fonts-sans-serif;
    }

    .footnotes {
        border-top: 1px solid $color-matblack;
        padding: 8px 0 0 0;

        li {

            &,
            & blockquote {
                color: #777;
                cursor: default;
            }

            a {
                color: #5a8296;
            }

            &:hover,
            &.fn-active {
                color: $color-matblack;

                blockquote {
                    color: #555;
                }

                a {
                    color: $color-link;
                }
            }
        }
    }

    a.h2.title {
        color: $color-matblack;
        font-weight: bold;
        font-style: normal !important;
        font-family: 'Noto Serif', $fonts-serif !important;
        letter-spacing: -1px;
        font-size: 1.9em;

        &:hover {
            color: $color-link-hover;
        }
    }

    a:hover {
        color: $color-link-hover;
    }

    blockquote {
        border: 1px rgba(128, 128, 128, 0.2) solid;
        border-left: 10px rgba(30, 255, 30, 0.5) solid;
        margin-left: 0;
        margin-right: 10px;
        padding: 8px 20px 10px 40px;
        color: #555;
        font-size: 1.2em;
        line-height: 1.7em;
        overflow-x: auto;

        span.MathJax {
            font-size: 0.8333em;
        }

        span.texatom span.mo {
            font-size: 120%;
        }

        .red {
            border-left: 10px rgba(255, 31, 31, 0.5) solid;
        }

        div.footnote {
            font-size: 0.6em;
            border-top: black 1px solid;
            margin-top: 30px;
            margin-bottom: -10px;
            /* cancel parent box padding */
        }
    }

    dt {
        font-weight: bold;
        font-size: 1.05em;
    }

    dd {
        padding: 10px;

        p {
            margin: 0;
        }

    }

    dl {
        padding: 20px;
    }

    table.bordered {
        border: black 1px solid;

        td {
            border: black 1px solid;
            padding: 5px !important;
        }
    }

    div.details {
        color: white;
        background-color: white;
        border: black 1px solid;
        padding: 5px;
    }

    details {
        border: black solid 1px;
        padding: 10px;
    }

    hr.half {
        width: 50%;
        margin: 2em auto;
    }

    code {
        font-size: 0.8em;
        background: #D9E5ED;
        font-family: 'Lucida Console', monospace;
        padding: 1px 4px;
    }

    pre {
        background: #fff;
        white-space: pre-wrap;
        padding: 10px 15px;
        border: black 1px solid;
        line-height: 1.2em;


        &>code {
            background: transparent;
            color: #555;
            padding: 0;
            margin: 0;
            font-size: 1.1em;
        }
    }

}

#content figure img {
    width: 100%;
}
</style>