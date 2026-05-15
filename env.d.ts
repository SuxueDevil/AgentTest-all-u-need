/**
 * env.d.ts — TypeScript 环境声明文件
 * =============================================================================
 * 【Java 对照】
 *   .d.ts 文件 ≈ Java 的 "头文件" 或接口定义 — 只声明类型，不包含实现代码。
 *   它告诉 TS 编译器："这些东西存在，类型是这样的，相信我。"
 *
 * 【Python 对照】
 *   .d.ts ≈ Python 的 .pyi stub 文件，用于静态类型检查。
 */

/// <reference types="vite/client" />
// ↑ 三斜线指令 = 引入 Vite 客户端类型声明（如 import.meta.env 的类型）
//   类似 Python 的 import 或 Java 的 import，但只作用于类型层面

/**
 * 声明 .vue 文件的类型
 * ---------------------------------------------------------------------------
 * 【为什么需要？】TypeScript 默认只认识 .ts/.tsx/.js 文件，
 *   遇到 `import App from './App.vue'` 会报"找不到模块"。
 *   这段声明告诉 TS：.vue 文件是一个 Vue 组件，可以安全导入。
 *
 * 【Java 类比】就像告诉编译器一个 .class 文件的接口长什么样。
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // DefineComponent 是 Vue 组件的 TS 类型
  // 相当于 Java 的：public class MyComponent extends Component<Vue>
  const component: DefineComponent<object, object, unknown>
  export default component
}

/**
 * 扩展 import.meta.env 的类型
 * ---------------------------------------------------------------------------
 * Vite 在构建时会把 .env 文件中的变量注入到 import.meta.env 对象。
 * 这里声明这些变量的类型，让 IDE 有智能提示。
 *
 * 【Python 类比】就像 os.environ 的类型化包装，明确知道有哪些 key。
 * 【Java 类比】相当于给一个 Map<String, String> 定义了固定的 key 集。
 */
interface ImportMetaEnv {
  /** 应用标题，对应 .env 中的 VITE_APP_TITLE */
  readonly VITE_APP_TITLE: string
  /** API 基础路径，对应 .env 中的 VITE_API_BASE_URL */
  readonly VITE_API_BASE_URL: string
  /** 应用版本号，对应 .env 中的 VITE_APP_VERSION */
  readonly VITE_APP_VERSION: string
}

/**
 * 扩展 ImportMeta 接口，添加 env 字段
 * ---------------------------------------------------------------------------
 * ImportMeta 是 ES 模块规范中的标准接口（对应 import.meta）。
 * 这里通过"接口合并"（declaration merging）给它加上 env 属性。
 *
 * 【TS 特性 — 接口合并】同名 interface 会自动合并，不需要 extends。
 *   这是 TS 独有的能力，Java/Python 都没有直接对应的概念。
 */
interface ImportMeta {
  readonly env: ImportMetaEnv
}
