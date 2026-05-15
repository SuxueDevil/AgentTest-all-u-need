<!-- 评测任务详情页 — 进度轮询 / 结果列表 / 维度得分 -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Play, Square } from 'lucide-vue-next'
import { useEvaluationStore } from '@stores'
import type { AgentResult } from '@types'
import StatusBadge from '@components/common/StatusBadge.vue'

const route = useRoute()
const router = useRouter()
const evalStore = useEvaluationStore()

/** 轮询定时器 */
let pollTimer: ReturnType<typeof setInterval> | null = null

const taskId = Number(route.params.id)

onMounted(async () => {
  await evalStore.fetchTaskDetail(taskId)
  startPollingIfRunning()
})

onUnmounted(() => {
  stopPolling()
})

/** 如果任务正在运行，启动 3s 轮询 */
function startPollingIfRunning() {
  const task = evalStore.currentTask
  if (task && task.status === 'running') {
    startPolling()
  }
}

function startPolling() {
  if (pollTimer) return
  pollTimer = setInterval(async () => {
    await evalStore.fetchProgress(taskId)
    if (evalStore.progress && evalStore.progress.status !== 'running') {
      stopPolling()
      // 完成后加载结果
      await evalStore.fetchResults(taskId)
      await evalStore.fetchTaskDetail(taskId)
    }
  }, 3000)
}

function stopPolling() {
  if (pollTimer) { clearInterval(pollTimer); pollTimer = null }
}

async function loadResults() {
  await evalStore.fetchResults(taskId)
}

async function handleStart() {
  await evalStore.startTask(taskId)
  await evalStore.fetchTaskDetail(taskId)
  startPolling()
}

async function handleCancel() {
  await evalStore.cancelTask(taskId)
  await evalStore.fetchTaskDetail(taskId)
}

/** 进度百分比 */
const progressPercent = computed(() => {
  const t = evalStore.currentTask
  if (!t || t.questionCount === 0) return 0
  return Math.round((t.completedCount / t.questionCount) * 100)
})

/** 结果按 overallScore 降序排列 */
const sortedResults = computed(() =>
  [...evalStore.results].sort((a, b) => b.overallScore - a.overallScore)
)
</script>

<template>
  <div class="space-y-6">
    <button class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" @click="router.push('/evaluation')">
      <ArrowLeft :size="16" /> 返回列表
    </button>

    <div v-if="evalStore.currentTask" class="space-y-6">
      <!-- 基本信息 -->
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold font-heading">{{ evalStore.currentTask.name }}</h1>
          <p class="text-sm text-gray-500 mt-1">{{ evalStore.currentTask.description }}</p>
          <div class="flex items-center gap-3 mt-2 text-sm text-gray-400">
            <span>{{ evalStore.currentTask.questionCount }} 题 / {{ evalStore.currentTask.agentIds.length }} Agent</span>
            <StatusBadge :status="evalStore.currentTask.status" type="task" />
          </div>
        </div>
        <div class="flex gap-2">
          <button v-if="evalStore.currentTask.status === 'pending'"
            class="btn-primary text-sm" @click="handleStart">
            <Play :size="14" /> 启动评测
          </button>
          <button v-if="evalStore.currentTask.status === 'running'"
            class="btn-secondary text-sm text-yellow-600" @click="handleCancel">
            <Square :size="14" /> 取消
          </button>
          <button v-if="evalStore.currentTask.status === 'completed'"
            class="btn-secondary text-sm" @click="loadResults">
            查看结果
          </button>
        </div>
      </div>

      <!-- 进度条 -->
      <div v-if="evalStore.currentTask.status === 'running'" class="bento-card p-4 space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-500">评测进度</span>
          <span class="font-mono">{{ evalStore.currentTask.completedCount }} / {{ evalStore.currentTask.questionCount }}</span>
        </div>
        <div class="h-2 rounded-full bg-gray-200 dark:bg-ai-surface overflow-hidden">
          <div class="h-full rounded-full bg-ai-purple transition-all duration-500"
            :style="{ width: `${progressPercent}%` }" />
        </div>
      </div>

      <!-- 维度配置 -->
      <div class="bento-card p-4">
        <h3 class="text-sm font-semibold mb-2">评测维度</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="d in evalStore.currentTask.dimensions" :key="d.name"
            class="text-xs bg-gray-100 dark:bg-ai-surface px-3 py-1 rounded-full">
            {{ d.displayName }}（权重 {{ (d.weight * 100).toFixed(0) }}% / 阈值 {{ (d.threshold * 100).toFixed(0) }}%）
          </span>
        </div>
      </div>

      <!-- 结果列表 -->
      <div v-if="evalStore.results.length > 0" class="space-y-3">
        <h2 class="text-lg font-semibold font-heading">评测结果</h2>
        <div v-for="(r, i) in sortedResults" :key="r.agentId"
          class="bento-card-hover p-4 space-y-3"
        >
          <!-- Agent 摘要 -->
          <div class="flex items-center gap-4">
            <span class="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
              :class="i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 dark:bg-ai-surface text-gray-500'">
              #{{ i + 1 }}
            </span>
            <span class="flex-1 font-medium">{{ r.agentName }}</span>
            <div class="flex items-center gap-4 text-sm">
              <span class="font-mono font-bold" :class="r.passed ? 'text-green-500' : 'text-red-500'">
                {{ (r.overallScore * 100).toFixed(1) }}%
              </span>
              <span class="text-gray-400">{{ r.avgLatencyMs }}ms</span>
              <span class="text-gray-400">{{ (r.totalTokens / 1000).toFixed(0) }}k tokens</span>
            </div>
            <span :class="r.passed ? 'badge-success' : 'badge-error'">
              {{ r.passed ? '通过' : '未通过' }}
            </span>
          </div>
          <!-- 维度得分 -->
          <div class="flex flex-wrap gap-2 pl-12">
            <span v-for="ds in r.dimensionScores" :key="ds.dimensionName"
              class="text-xs px-2 py-0.5 rounded-full"
              :class="ds.score >= 0.6 ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'"
            >
              {{ ds.dimensionName }}: {{ (ds.score * 100).toFixed(0) }}%
            </span>
          </div>
          <!-- 逐题明细 -->
          <details v-if="r.items?.length" class="pl-12">
            <summary class="text-xs text-gray-400 cursor-pointer hover:text-gray-600">逐题明细 ({{ r.items.length }} 题)</summary>
            <div class="mt-2 space-y-1">
              <div v-for="item in r.items" :key="item.questionId"
                class="flex items-center justify-between text-xs text-gray-500 py-1"
              >
                <span class="truncate flex-1 mr-4">{{ item.questionTitle }}</span>
                <span class="w-12 text-right">{{ (item.score * 100).toFixed(0) }}%</span>
                <span class="w-16 text-right">{{ item.latencyMs }}ms</span>
                <span :class="item.passed ? 'text-green-500' : 'text-red-500'" class="w-10 text-right">
                  {{ item.passed ? '通过' : '失败' }}
                </span>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>

    <!-- 加载中 -->
    <div v-else class="text-center py-20 text-gray-400">
      <p v-if="evalStore.loading">加载中...</p>
      <p v-else>任务不存在</p>
    </div>
  </div>
</template>
