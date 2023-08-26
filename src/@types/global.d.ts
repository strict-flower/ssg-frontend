/**
  * These code are licensed under the MIT License and copyrighted by 龚汉升 (hansonGong). 
  * Thanks to great works!
  * 
  * If you want to check difference from original code, you can check the original code here:
  * https://github.com/hansonGong/mathjax-vue/blob/987465a2dcf141547bccf65b16ff5c65989c6d0b/packages/core/lib/index.d.ts
*/

/* Global function declaration */
declare type FnType<T = void, V = unknown> = (...arg: V[]) => T

declare type Indexable<T = any> = Record<string, T>

/** MathJax attribute declaration  */
declare interface IMathJaxProps extends Indexable {
    version?: string
    typesetPromise?: FnType<Promise<any>>
    tex?: Indexable
    options?: Indexable
    startup?: Indexable
    svg?: Indexable
}

declare interface Window {
    MathJax: IMathJaxProps
}