/**
 * 题库 Store — Pinia 状态管理。
 * 管理问题列表、分页参数和 CRUD 操作。
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Question, QuestionQueryParams } from '@types'
import { questionApi } from '@api'

export const useQuestionStore = defineStore('question', () => {
  // ==================== 状态 ====================

  /** 问题列表（当前页数据） */
  const questions = ref<Question[]>([])
  /** 符合条件的总记录数 */
  const total = ref(0)
  /** 请求进行中的标识 */
  const loading = ref(false)
  /** 列表查询参数 */
  const queryParams = ref<QuestionQueryParams>({ page: 1, pageSize: 20 })

  // ==================== 操作方法 ====================

  /** 获取问题列表，传入 params 时合并到当前 queryParams 后重新请求 */
  async function fetchQuestions(params?: Partial<QuestionQueryParams>) {
    loading.value = true
    try {
      if (params) queryParams.value = { ...queryParams.value, ...params }
      const res = await questionApi.list(queryParams.value)
      questions.value = res.data
      total.value = res.total
    } finally {
      loading.value = false
    }
  }

  /** 创建问题，成功后自动刷新列表 */
  async function createQuestion(data: Partial<Question>) {
    await questionApi.create(data)
    await fetchQuestions()
  }

  /** 更新问题 */
  async function updateQuestion(id: number, data: Partial<Question>) {
    await questionApi.update(id, data)
    await fetchQuestions()
  }

  /** 删除问题 */
  async function deleteQuestion(id: number) {
    await questionApi.remove(id)
    await fetchQuestions()
  }

  /** 批量删除 */
  async function batchDeleteQuestions(ids: number[]) {
    await questionApi.batchRemove(ids)
    await fetchQuestions()
  }

  return {
    questions, total, loading, queryParams,
    fetchQuestions, createQuestion, updateQuestion, deleteQuestion, batchDeleteQuestions,
  }
})
