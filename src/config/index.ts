/**
 * 应用配置常量
 * =============================================================================
 * 【Java 类比】≈ @ConfigurationProperties 或 application.yml 的类型化映射
 *
 * import.meta.env 是 Vite 构建工具注入的环境变量对象。
 * .env 文件中的 VITE_xxx 变量会被自动读取到这里。
 * 相当于 Spring Boot 中通过 @Value("${xxx}") 注入配置项。
 */

export const appConfig = {
  /** 应用标题，对应 .env 中 VITE_APP_TITLE */
  title: import.meta.env.VITE_APP_TITLE || 'agent-test-all-u-need',
  /** 版本号 */
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  /** API 基础路径 */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
}

/** 分页默认配置 */
export const paginationConfig = {
  defaultPageSize: 20,
  pageSizes: [10, 20, 50, 100],
}

/** 图表调色板 — 8 种颜色循环使用 */
export const chartColors = [
  '#7C3AED',
  '#06B6D4',
  '#22C55E',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#3B82F6',
]
