/**
 * 仪表盘 API 模块
 * =============================================================================
 */
import { get } from '@api/client'
import type { DashboardStats } from '@types'

export const dashboardApi = {
  /** 获取仪表盘总览数据 */
  stats() {
    return get<DashboardStats>('/dashboard/stats')
  },
  /**
   * 获取评测趋势数据
   * @param range 时间范围：7天 / 30天 / 90天
   */
  trend(range: '7d' | '30d' | '90d') {
    return get<{ data: { date: string; avgScore: number; evalCount: number }[] }>('/dashboard/trend', {
      params: { range },
    })
  },
}
