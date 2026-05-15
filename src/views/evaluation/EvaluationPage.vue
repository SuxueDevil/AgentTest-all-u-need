<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from 'lucide-vue-next'
import type { EvaluationTask } from '@types'
import StatusBadge from '@components/common/StatusBadge.vue'

const router = useRouter()
const tasks = ref<EvaluationTask[]>([])

const columns = [
  { key: 'name', label: '任务名称', width: '2fr' },
  { key: 'datasetName', label: '数据集', width: '1.5fr' },
  { key: 'agentNames', label: '评测Agent', width: '2fr' },
  { key: 'progress', label: '进度', width: '1.5fr' },
  { key: 'status', label: '状态', width: '1fr' },
  { key: 'createdAt', label: '创建时间', width: '1.5fr' },
]

const mockTasks: EvaluationTask[] = [
  {
    id: '1', name: '推理能力综合评测', datasetId: 'd1', datasetName: 'ReasonBench',
    agentIds: ['1', '2', '3'], agentNames: ['Claude Opus 4', 'GPT-4o', 'DeepSeek-V3'],
    status: 'running', progress: 65,
    metrics: [{ name: 'reasoning', score: 0.92, weight: 1, threshold: 0.8 }],
    createdAt: '2026-05-14 10:00',
  },
  {
    id: '2', name: '代码生成能力对比', datasetId: 'd2', datasetName: 'CodeEval',
    agentIds: ['1', '3'], agentNames: ['Claude Opus 4', 'DeepSeek-V3'],
    status: 'completed', progress: 100,
    metrics: [{ name: 'coding', score: 0.88, weight: 1, threshold: 0.8 }],
    createdAt: '2026-05-13 14:30', completedAt: '2026-05-13 16:45',
  },
  {
    id: '3', name: '多语言翻译评测', datasetId: 'd3', datasetName: 'TransTest',
    agentIds: ['2', '4'], agentNames: ['GPT-4o', 'Gemini Ultra'],
    status: 'pending', progress: 0,
    metrics: [{ name: 'translation', score: 0, weight: 1, threshold: 0.85 }],
    createdAt: '2026-05-14 09:00',
  },
]

onMounted(() => {
  tasks.value = mockTasks
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-heading">评测任务</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">管理Agent评测任务</p>
      </div>
      <button class="btn-primary">
        <Plus :size="16" />
        新建任务
      </button>
    </div>

    <DataTable
      :columns="columns"
      :data="tasks"
      @row-click="(row: EvaluationTask) => router.push(`/evaluation/${row.id}`)"
    >
      <template #cell-name="{ value }">
        <span class="font-medium text-gray-700 dark:text-gray-200">{{ value }}</span>
      </template>
      <template #cell-agentNames="{ value }">
        <div class="flex flex-wrap gap-1">
          <span v-for="(name, i) in (value as string[])" :key="i" class="rounded-md bg-ai-purple/10 px-2 py-0.5 text-xs text-ai-purple-light">
            {{ name }}
          </span>
        </div>
      </template>
      <template #cell-progress="{ row }: { row: EvaluationTask }">
        <div class="flex items-center gap-2">
          <div class="h-1.5 flex-1 rounded-full bg-gray-200 dark:bg-ai-surface overflow-hidden">
            <div
              class="h-full rounded-full transition-all"
              :class="row.status === 'completed' ? 'bg-eval-pass' : row.status === 'failed' ? 'bg-eval-fail' : 'bg-ai-purple'"
              :style="{ width: `${row.progress}%` }"
            ></div>
          </div>
          <span class="text-xs text-gray-400 dark:text-gray-500 w-8">{{ row.progress }}%</span>
        </div>
      </template>
      <template #cell-status="{ value }">
        <StatusBadge :status="value as string" type="task" />
      </template>
      <template #cell-createdAt="{ value }">
        <span class="text-gray-400 dark:text-gray-500">{{ value }}</span>
      </template>
    </DataTable>
  </div>
</template>
