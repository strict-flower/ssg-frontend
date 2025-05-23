/**
  * These code are licensed under the MIT License and copyrighted by 龚汉升 (hansonGong). 
  * Thanks to great works!
  * 
  * If you want to check difference from original code, you can check the original code here:
  * https://github.com/hansonGong/mathjax-vue/tree/987465a2dcf141547bccf65b16ff5c65989c6d0b
*/

interface IInjectOptions {
    url?: string
    loadType?: 'async' | 'defer'
}

/**
 * Mathjax to be injected into the document head
 * @param {IInjectOptions} options The script attribute
 * @returns void
 */
function _injectMathJax({ loadType, url }: IInjectOptions = {}): void {
    if (window.MathJax) return
    const script = document.createElement('script')
    script.src =
        url || 'https://cdn.jsdelivr.net/npm/mathjax@3.2.0/es5/tex-chtml-full.js'
    script[loadType || 'async'] = true
    document.head.appendChild(script)
}

/**
 * Global configuration MathJax
 * @param {IMathJaxProps} options Custom MathJax global configuration  reference: http://docs.mathjax.org/en/latest/
 * @param {FnType} callback Mathjax loading is completed, you need to perform the function
 */
export function initMathJax(
    options?: IMathJaxProps & IInjectOptions,
    callback?: FnType,
): void {
    const { loadType, url, ...configs } = options || {}
    _injectMathJax({ loadType, url })
    // Default configuration
    const defaultConfig: IMathJaxProps = {
        tex: {
            inlineMath: [['$', '$']],
            displayMath: [['$$', '$$']],
            processEnvironments: true,
            processRefs: true,
        },
        options: {
            skipHtmlTags: ['noscript', 'style', 'textarea', 'pre', 'code'],
            ignoreHtmlClass: 'tex2jax_ignore',
        },
        startup: {
            pageReady: () => {
                callback && callback()
            },
        },
        svg: {
            fontCache: 'global',
        },
    }
    // Merge configuration
    const mergeConfig = Object.assign({}, defaultConfig, configs)
    window.MathJax = mergeConfig
}

/**
 * Manual rendering formula, returns a Promise
 * @param {HTMLElement} el Need to be mathjax rendered HTMLElement
 * @returns Promise
 */
export function renderByMathjax(el: HTMLElement): Promise<any> {
    if (!window.MathJax || !window.MathJax.typesetPromise) return Promise.reject()

    if (el && !Array.isArray(el)) {
        el = [el] as any
    }

    // Reset TeX state
    // ref. How to reset MathJax instance welly both V2 and V3 #2931 - https://github.com/mathjax/MathJax/issues/2931
    window.MathJax.texReset();
    window.MathJax.typesetClear();

    return window.MathJax.typesetPromise(el)
}