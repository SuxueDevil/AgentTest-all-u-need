/**
 * 工具函数 — 格式化 & 日期处理
 * =============================================================================
 * 【Java 类比】≈ 工具类（StringUtils, DateUtils 等）的静态方法集合
 *   TS 中用独立导出的函数代替 Java 的 static method，
 *   实际效果一样：都是无状态的纯函数。
 */
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

// 安装"相对时间"插件（如"3分钟前"）
dayjs.extend(relativeTime)
// 设置为中文
dayjs.locale('zh-cn')

/** 格式化日期 */
export function formatDate(date: string, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date).format(format)
}

/** 相对时间（如"3分钟前"、"1小时前"） */
export function formatRelativeTime(date: string): string {
  return dayjs(date).fromNow()
}

/** 保留小数位 */
export function formatScore(score: number, decimals = 2): string {
  return score.toFixed(decimals)
}

/** 数值转百分比字符串 */
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

/** 大数字格式化（过万显示为 x.x万） */
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`
  }
  return num.toLocaleString()
}
