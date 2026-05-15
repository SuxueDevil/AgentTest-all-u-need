<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import type { EvaluationTask, EvalResult } from '@types'
import StatusBadge from '@components/common/StatusBadge.vue'

const route = useRoute()
const router = useRouter()
const task = ref<EvaluationTask | null>(null)
const results = ref<EvalResult[]>([])

onMounted(() => {
  task.value = {
    id: route.params.id as string,
    name: '推理能力综合评测',
    datasetId: 'd1', datasetName: 'ReasonBench',
    agentIds: ['1', '2', '3'], agentNames: ['Claude Opus 4', 'GPT-4o', 'DeepSeek-V3'],
    status: 'running', progress: 65,
    metrics: [{ name: 'reasoning', score: 0.92, weight: 1, threshold: 0.8 }],
    createdAt: '2026-05-14 10:00',
  }

  results.value = [
    { id: '1', taskId: route.params.id as string, agentId: '1', agentName: 'Claude Opus 4', score: 0.936, rank: 1,
      details: { reasoning: 0.97, accuracy: 0.96, creativity: 0.94 }, latency: 1230, tokens: 45000, passed: true, evaluatedAt: '2026-05-14 11:30' },
    { id: '2', taskId: route.params.id as string, agentId: '2', agentName: 'GPT-4o', score: 0.912, rank: 2,
      details: { reasoning: 0.93, accuracy: 0.94, creativity: 0.91 }, latency: 980, tokens: 38000, passed: true, evaluatedAt: '2026-05-14 11:35' },
    { id: '3', taskId: route.params.id as string, agentId: '3', agentName: 'DeepSeek-V3', score: 0.898, rank: 3,
      details: { reasoning: 0.92, accuracy: 0.91, creativity: 0.89 }, latency: 1560, tokens: 52000, passed: true, evaluatedAt: '2026-05-14 11:28' },
  ]
})
</script>

<template>
  <div v-if="task" class="space-y-6">
    <button class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" @click="router.back()">
      <ArrowLeft :size="16" /> 返回列表
    </button>

    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-2xl font-bold font-heading">{{ task.name }}</h1>
        <div class="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span>数据集: {{ task.datasetName }}</span>
          <StatusBadge :status="task.status" type="task" />
        </div>
      </div>
    </div>

    <!-- Results -->
    <div class="space-y-3">
      <h2 class="text-lg font-semibold font-heading">评测结果</h2>
      <div v-for="r in results" :key="r.id" class="bento-card-hover flex items-center gap-4 p-4">
        <span class="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold bg-ai-purple/15 text-ai-purple-light">
          #{{ r.rank }}
        </span>
        <span class="flex-1 font-medium">{{ r.agentName }}</span>
        <div class="flex items-center gap-4 text-sm">
          <span class="font-mono text-eval-pass">{{ (r.score * 100).toFixed(1) }}%</span>
          <span class="text-gray-400 dark:text-gray-500">{{ r.latency }}ms</span>
          <span class="text-gray-400 dark:text-gray-500">{{ (r.tokens / 1000).toFixed(0) }}k tokens</span>
        </div>
        <span :class="r.passed ? 'badge-success' : 'badge-error'">
          {{ r.passed ? '通过' : '未通过' }}
        </span>
      </div>
    </div>
  </div>
</template>
