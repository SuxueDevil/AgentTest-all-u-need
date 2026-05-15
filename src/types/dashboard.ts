/**
 * 仪表盘相关的类型定义
 * =============================================================================
 * 仪表盘是数据聚合页面，这些接口描述聚合后的数据结构。
 */

/** 仪表盘总览数据 — 页面顶层数据结构 */
export interface DashboardStats {
  totalAgents: number
  activeEvals: number
  completedEvals: number
  avgScore: number
  /** 趋势图数据点数组 */
  trendData: TrendPoint[]
  /** 排行榜列表 */
  agentRankings: AgentRanking[]
  /** 最近活动列表 */
  evalActivity: EvalActivity[]
}

/** 趋势图数据点 — 每天一条 */
export interface TrendPoint {
  /** 日期 YYYY-MM-DD */
  date: string
  /** 当日平均得分 0-1 */
  avgScore: number
  /** 当日评测次数 */
  evalCount: number
}

/** Agent 排行榜条目 */
export interface AgentRanking {
  rank: number
  agentId: string
  agentName: string
  score: number
  /** 排名趋势：上升/下降/稳定 */
  trend: 'up' | 'down' | 'stable'
}

/** 最近活动记录 */
export interface EvalActivity {
  id: string
  agentName: string
  taskName: string
  status: string
  timestamp: string
}

/** 图表通用数据格式 — 用于饼图、柱状图等 */
export interface ChartData {
  name: string
  value: number
  /** ? 可选的颜色覆盖 */
  color?: string
}
