/**
 * Agent Store — Agent 数据的集中管理
 * =============================================================================
 * 【Java 类比】≈ @Service + Repository 的组合体
 *   既管理 Agent 列表的状态（类似缓存），又封装 API 调用（类似 Service 层）
 *
 * 【TS 特性 — ref<Agent[]>([])】
 *   ref 包裹的类型是 Agent[]（Agent 数组），初始值是空数组。
 *   相当于 Java 中：AtomicReference<List<Agent>> agents = new AtomicReference<>(List.of())
 *   但 ref 有响应式：agents.value = newData 会自动触发 UI 更新。
 *
 * 【TS 特性 — computed】
 *   computed ≈ Java 中带缓存的计算属性 / @Memoized 方法
 *   每次 agents 变化时，computed 自动重新计算并缓存结果。
 *   相当于：每次 setAgents() 后自动调用 getActiveAgents() 并缓存。
 *
 * 【TS 特性 — async/await】
 *   ≈ Java 的 CompletableFuture + async/await（写法上是同步风格，实际异步）
 *   try/finally ≈ Java 的 try/finally（无论成功失败，finally 都执行）
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Agent, AgentQueryParams } from '@types'
import { agentApi } from '@api'

export const useAgentStore = defineStore('agent', () => {
  // ===== 状态（State）=====
  /** Agent 列表 */
  const agents = ref<Agent[]>([])
  /** 总数量（分页用） */
  const total = ref(0)
  /** 加载状态：true = 请求进行中 */
  const loading = ref(false)
  /** 当前选中的 Agent 详情 */
  const currentAgent = ref<Agent | null>(null)

  /** 当前查询条件 */
  const queryParams = ref<AgentQueryParams>({
    page: 1,
    pageSize: 20,
  })

  // ===== 计算属性（Getters）=====
  /** 过滤出状态为 active 的 Agent */
  const activeAgents = computed(() => agents.value.filter((a) => a.status === 'active'))

  // ===== 操作方法（Actions）=====
  /**
   * 获取 Agent 列表
   * ---------------------------------------------------------------------------
   * Partial<AgentQueryParams> = 把 AgentQueryParams 所有字段变为可选
   * 相当于 Java 中用一个 Map 传参，只传需要修改的字段
   *
   * ...queryParams.value, ...params = 展开运算符（spread）
   *   把两个对象的字段合并，后面的覆盖前面的。
   *   相当于 Java 中：new HashMap<>(old); result.putAll(new);
   */
  async function fetchAgents(params?: Partial<AgentQueryParams>) {
    loading.value = true
    try {
      if (params) {
        queryParams.value = { ...queryParams.value, ...params }
      }
      const res = await agentApi.list(queryParams.value)
      agents.value = res.data
      total.value = res.total
    } finally {
      loading.value = false
    }
  }

  /** 获取 Agent 详情 */
  async function fetchAgentDetail(id: string) {
    currentAgent.value = await agentApi.detail(id)
  }

  return {
    agents,
    total,
    loading,
    currentAgent,
    queryParams,
    activeAgents,
    fetchAgents,
    fetchAgentDetail,
  }
})
