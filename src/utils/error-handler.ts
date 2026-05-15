/**
 * 全局错误处理
 * =============================================================================
 * 【Java 类比】≈ Spring 的 @ControllerAdvice + @ExceptionHandler
 *   集中捕获未处理异常，统一日志和降级处理。
 *
 * 【TS 语法 — import type】
 *   import type { App } from 'vue'
 *   type 关键字 = "我只需要类型信息，不需要运行时值"
 *   编译后该 import 会被完全删除，减小打包体积。
 *   就像 Java 中 import 一个类只用作泛型参数，不实例化。
 */
import type { App } from 'vue'

/**
 * 安装 Vue 全局错误处理器
 * ---------------------------------------------------------------------------
 * 捕获 Vue 组件渲染、生命周期钩子中的未处理错误。
 * 参数中的 _instance 前面加 _ 表示该参数未使用但必须保留位置。
 */
export function setupErrorHandler(app: App) {
  app.config.errorHandler = (err, _instance, info) => {
    console.error(`[Vue Error] ${info}:`, err)
  }

  app.config.warnHandler = (msg, _instance, _trace) => {
    if (import.meta.env.DEV) {
      console.warn(`[Vue Warn]: ${msg}`)
    }
  }
}

/**
 * 将 API 调用中捕获的 unknown 错误转为可读字符串
 * ---------------------------------------------------------------------------
 * 【TS 特性 — unknown vs any】
 *   unknown = "不知道类型，使用前必须先判断"（类型安全，推荐）
 *   any     = "关闭类型检查"（不安全，尽量避免）
 *   类似于 Java 中 Object 和 raw type 的区别。
 *
 *   instanceof 检查 ≈ Java 的 instanceof
 *   typeof 检查    ≈ 运行时类型判断，Java 中无直接对应
 */
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return '未知错误'
}
