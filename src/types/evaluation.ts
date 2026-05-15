/**
 * 评测相关的类型定义
 * =============================================================================
 */

/** 评测任务 */
export interface EvaluationTask {
  id: string
  name: string
  datasetId: string
  datasetName: string
  /** 参与评测的 Agent ID 列表 */
  agentIds: string[]
  agentNames: string[]
  status: TaskStatus
  /** 进度 0-100 */
  progress: number
  /** 各项评测指标 */
  metrics: EvalMetrics[]
  createdAt: string
  /** ? 表示可选 — 任务未完成时为 undefined */
  completedAt?: string
}

/** 任务状态 */
export type TaskStatus = 'pending' | 'running' | 'completed' | 'cancelled' | 'failed'

/** 评测指标维度 */
export interface EvalMetrics {
  name: string
  /** 得分 0-1 */
  score: number
  /** 权重 0-1，所有指标权重之和为 1 */
  weight: number
  /** 通过阈值 0-1 */
  threshold: number
}

/** 评测结果 — 单次评测的输出 */
export interface EvalResult {
  id: string
  taskId: string
  agentId: string
  agentName: string
  /** 综合得分 0-1 */
  score: number
  /** 排名 */
  rank: number
  /**
   * 详细得分明细
   * Record<string, number> = 键值对 { [key: string]: number }
   * 【Java 类比】≈ Map<String, Double>
   * 【Python 类比】≈ dict[str, float]
   */
  details: Record<string, number>
  /** 延迟 (ms) */
  latency: number
  /** Token 消耗量 */
  tokens: number
  /** 是否通过评测 */
  passed: boolean
  evaluatedAt: string
}

/** 数据集 */
export interface Dataset {
  id: string
  name: string
  description: string
  category: DatasetCategory
  /** 数据集条目数量 */
  itemCount: number
  /** 难度等级 */
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  createdAt: string
}

/** 数据集类别 */
export type DatasetCategory =
  | 'reasoning'
  | 'coding'
  | 'qa'
  | 'translation'
  | 'summarization'
  | 'tool-calling'
