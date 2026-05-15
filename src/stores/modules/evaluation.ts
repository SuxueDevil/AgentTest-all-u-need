/**
 * 评测 Store — 评测任务和结果的状态管理
 * =============================================================================
 * 【TS 特性 — ref<T | null>(null)】
 *   T | null 是"联合类型"，表示值可以是 T 或者 null。
 *   相当于 Java 的 @Nullable T。
 *   初始值 null 表示"还没有加载"
 *   currentTask.value 在使用前需要判空（但 TS 不强制运行时检查）
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EvaluationTask, EvalResult, Dataset } from '@types'
import { evaluationApi } from '@api'

export const useEvaluationStore = defineStore('evaluation', () => {
  const tasks = ref<EvaluationTask[]>([])
  const taskTotal = ref(0)
  const loading = ref(false)
  const currentTask = ref<EvaluationTask | null>(null)
  const results = ref<EvalResult[]>([])
  const datasets = ref<Dataset[]>([])

  async function fetchTasks(params: { page: number; pageSize: number; status?: string }) {
    loading.value = true
    try {
      const res = await evaluationApi.listTasks(params)
      tasks.value = res.data
      taskTotal.value = res.total
    } finally {
      loading.value = false
    }
  }

  async function fetchTaskDetail(id: string) {
    currentTask.value = await evaluationApi.taskDetail(id)
  }

  async function fetchResults(taskId: string) {
    results.value = await evaluationApi.results(taskId)
  }

  async function createTask(data: { name: string; datasetId: string; agentIds: string[] }) {
    return evaluationApi.createTask(data)
  }

  async function fetchDatasets(params: { page: number; pageSize: number }) {
    const res = await evaluationApi.listDatasets(params)
    datasets.value = res.data
  }

  return {
    tasks,
    taskTotal,
    loading,
    currentTask,
    results,
    datasets,
    fetchTasks,
    fetchTaskDetail,
    fetchResults,
    createTask,
    fetchDatasets,
  }
})
