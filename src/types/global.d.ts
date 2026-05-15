/**
 * 全局类型声明
 * =============================================================================
 * 通过 declare global 扩展全局作用域中的类型，
 * 例如给 window 对象添加自定义属性。
 *
 * 【TS 特性 — declare global】
 *   在模块文件中（有 export/import 的就是模块），
 *   需要用 declare global { } 包裹才能修改全局类型。
 *   文件末尾的 export {} 是为了让 TS 把此文件当作模块。
 *
 * 【Java 类比】类似于给一个已有的全局类添加字段（但只影响类型检查）。
 */

declare global {
  interface Window {
    /** 应用版本号，构建时注入到 window 对象上 */
    __APP_VERSION__: string
  }
}

// 让 TS 将此文件视为模块（有 import/export 就是模块）
// 这是 declare global 能够生效的前提
export {}
