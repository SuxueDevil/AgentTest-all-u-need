/**
 * Agent API 模块
 * =============================================================================
 * 【Java 类比】≈ 一个 Service 类，封装对 /api/agents 的所有 HTTP 调用
 *   每个方法 ≈ 一个用 @FeignClient 或 RestTemplate 的远程调用
 *
 * 参数和返回值的类型来自 @types（即 src/types/agent.ts），
 * 这样 API 层和业务层的类型保持同步，类似 Java 中共享 DTO 类。
 */
import { get, post, put, del } from '@api/client'
import type { Agent, AgentQueryParams } from '@types'

export const agentApi = {
  /** 分页查询 Agent 列表 */
  list(params: AgentQueryParams) {
    return get<{ data: Agent[]; total: number }>('/agents', { params })
  },
  /** 查询单个 Agent 详情 */
  detail(id: string) {
    return get<Agent>(`/agents/${id}`)
  },
  /** 创建 Agent */
  create(data: Partial<Agent>) {
    return post<Agent>('/agents', data)
  },
  /** 更新 Agent */
  update(id: string, data: Partial<Agent>) {
    return put<Agent>(`/agents/${id}`, data)
  },
  /** 删除 Agent */
  remove(id: string) {
    return del<void>(`/agents/${id}`)
  },
  /** 对 Agent 发起评测 */
  evaluate(id: string, datasetId: string) {
    return post<{ taskId: string }>(`/agents/${id}/evaluate`, { datasetId })
  },
}
