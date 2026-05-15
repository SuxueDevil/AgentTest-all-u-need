/**
 * main.ts — 应用入口文件
 * =============================================================================
 * 【Java 类比】这是整个前端应用的 public static void main(String[] args)。
 *   在浏览器加载时会首先执行这个文件，它负责：
 *   1. 创建 Vue 应用实例（≈ new SpringApplication()）
 *   2. 注册插件（≈ Spring 的 @Configuration / auto-configuration）
 *   3. 挂载到页面 DOM（≈ 启动内嵌 Tomcat 监听端口）
 *
 * 执行顺序：
 *   createApp → use(插件) → mount('#app')
 *   相当于：SpringApplicationBuilder → .with(Config) → .run(args)
 */

import { createApp } from 'vue'
// import type { App } from 'vue' 的区别：
//   import { App }     = 导入值（运行时存在的东西）
//   import type { App } = 仅导入类型（编译后会被完全删除，不占 JS 体积）
import { createPinia } from 'pinia'
import App from './App.vue'
// @router → 路径别名，由 tsconfig.json 的 paths + vite.config.ts 的 alias 共同定义
import router from '@router'
import { registerGlobalComponents } from '@components'
import { setupErrorHandler } from '@utils/error-handler'
import '@assets/styles/main.css'

/**
 * 创建 Vue 应用实例
 * ---------------------------------------------------------------------------
 * createApp(App) ≈ new SpringApplication(MainConfig.class)
 * App.vue 是根组件，相当于 Spring Boot 的 @SpringBootApplication 主配置类
 */
const app = createApp(App)

/**
 * 注册插件
 * ---------------------------------------------------------------------------
 * app.use() ≈ Spring 的 @EnableXxx 或 .withFeature()
 *
 * createPinia() — 状态管理库，≈ Java 的全局单例 Bean 容器
 *   Pinia 之于 Vue，相当于 Spring 的 ApplicationContext 之于 Java
 *   Store 中的状态是响应式的（reactive），修改状态会自动更新 UI
 *
 * router — 前端路由，≈ Spring MVC 的 @RequestMapping 映射
 *   不同 URL 路径 → 不同页面组件，但全部在浏览器端完成，不请求服务器
 */
app.use(createPinia())
app.use(router)

/**
 * 注册全局组件 — 让所有页面无需 import 就能直接使用 BentoCard 等
 * 【Java 类比】≈ Spring 的 @Bean 注册到全局 ApplicationContext
 */
registerGlobalComponents(app)

/**
 * 全局错误处理器 — 捕获所有未被组件处理的异常
 * 【Java 类比】≈ Spring 的 @ControllerAdvice + @ExceptionHandler
 */
setupErrorHandler(app)

/**
 * 挂载到 DOM
 * ---------------------------------------------------------------------------
 * app.mount('#app')  ≈  SpringApplication.run(args) / 服务器开始监听端口
 * #app 是 index.html 中的 <div id="app"></div>
 * Vue 会接管这个 div 内的所有 DOM 渲染
 */
app.mount('#app')
