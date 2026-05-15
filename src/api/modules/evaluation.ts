/**
 * 评测 API 模块
 * =============================================================================
 * 【Java 类比】≈ EvaluationService 类，封装 /api/tasks 和 /api/datasets 的远程调用
 */
import { get, post } from '@api/client'
import type { EvaluationTask, EvalResult, Dataset } from '@types'

export const evaluationApi = {
  /** 分页查询任务列表 */
  listTasks(params: { page: number; pageSize: number; status?: string }) {
    return get<{ data: EvaluationTask[]; total: number }>('/tasks', { params })
  },
  /** 查询任务详情 */
  taskDetail(id: string) {
    return get<EvaluationTask>(`/tasks/${id}`)
  },
  /** 创建评测任务 */
  createTask(data: { name: string; datasetId: string; agentIds: string[] }) {
    return post<EvaluationTask>('/tasks', data)
  },
  /** 取消任务 */
  cancelTask(id: string) {
    return post<void>(`/tasks/${id}/cancel`)
  },
  /** 查询任务结果列表 */
  results(taskId: string) {
    return get<EvalResult[]>(`/tasks/${taskId}/results`)
  },
  /** 对比多个 Agent 的结果 */
  compare(agentIds: string[], datasetId: string) {
    return post<{ results: EvalResult[]; comparison: Record<string, unknown> }>('/tasks/compare', {
      agentIds,
      datasetId,
    })
  },
  /** 分页查询数据集列表 */
  listDatasets(params: { page: number; pageSize: number }) {
    return get<{ data: Dataset[]; total: number }>('/datasets', { params })
  },
}
