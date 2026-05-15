/**
 * Agent 相关的类型定义
 * =============================================================================
 * 【Java 对照】
 *   interface  ≈  Java 的 interface（但 TS 的 interface 也可以描述数据形状）
 *   type       ≈  Java 的 enum（字符串字面量联合类型）或 typedef/alias
 *
 * 【Python 对照】
 *   interface  ≈  Python 的 Protocol 或 TypedDict
 *   type       ≈  Python 的 Literal 类型联合
 *
 * TS 核心概念：
 *   ? 标记 = 可选属性，相当于 Java 的 @Nullable 或 Python 的 Optional
 *   string[] = 字符串数组，相当于 Java 的 List<String> 或 Python 的 list[str]
 */

/** Agent 实体 — 系统中评测的基本单元 */
export interface Agent {
  id: string
  name: string
  description: string
  model: string
  /** Agent 类型，限定为预定义的几种类型之一 */
  type: AgentType
  /** Agent 当前状态 */
  status: AgentStatus
  /** 评测指标，嵌套对象 */
  metrics: AgentMetrics
  /** 标签列表，string[] = 字符串数组 */
  tags: string[]
  createdAt: string
  updatedAt: string
}

/**
 * Agent 类型 — 字面量联合类型 (Union Type)
 * ---------------------------------------------------------------------------
 * 【核心概念】这是一种"字符串枚举"的轻量写法：
 *   - 变量只能是这几个字符串值之一
 *   - 编译器会做穷尽性检查（switch 漏了分支会报错）
 *
 * 【Java 类比】相当于一个 String 类型的 enum:
 *   enum AgentType { LLM, MULTI_MODAL, TOOL_USE, CODE_GEN, RAG }
 *
 * 【Python 类比】相当于 typing.Literal:
 *   AgentType = Literal["llm", "multi-modal", "tool-use", "code-gen", "rag"]
 */
export type AgentType = 'llm' | 'multi-modal' | 'tool-use' | 'code-gen' | 'rag'

/** Agent 状态 */
export type AgentStatus = 'active' | 'inactive' | 'evaluating' | 'error'

/** Agent 评测指标 — 5 个维度的评分 */
export interface AgentMetrics {
  /** 准确率 0-1 */
  accuracy: number
  /** 响应延迟 (ms) */
  latency: number
  /** 推理能力 0-1 */
  reasoning: number
  /** 创造性 0-1 */
  creativity: number
  /** 鲁棒性 0-1 */
  robustness: number
  /** 综合评分 0-1 */
  overall: number
}

/**
 * Agent 查询参数 — 列表接口的请求参数
 * ---------------------------------------------------------------------------
 * 带 ? 的属性是可选的，传不传都可以。
 * 【Java 类比】相当于一个 Request DTO + @Nullable 注解
 * 【Python 类比】相当于给函数传 **kwargs，有些 key 可以省略
 */
export interface AgentQueryParams {
  page: number
  pageSize: number
  keyword?: string
  type?: AgentType
  status?: AgentStatus
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
