<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Search } from 'lucide-vue-next'
import { useAgentStore } from '@stores'
import type { Agent } from '@types'
import StatusBadge from '@components/common/StatusBadge.vue'

const router = useRouter()
const agentStore = useAgentStore()

const columns = [
  { key: 'name', label: 'Agent名称', width: '2fr' },
  { key: 'model', label: '模型', width: '1.5fr' },
  { key: 'type', label: '类型', width: '1fr' },
  { key: 'status', label: '状态', width: '1fr' },
  { key: 'overall', label: '综合得分', width: '1fr' },
  { key: 'updatedAt', label: '更新时间', width: '1.5fr' },
]

const mockAgents: Agent[] = [
  {
    id: '1', name: 'Claude Opus 4', description: 'Anthropic最强模型', model: 'claude-opus-4-7',
    type: 'llm', status: 'active',
    metrics: { accuracy: 0.96, latency: 0.88, reasoning: 0.97, creativity: 0.94, robustness: 0.93, overall: 0.936 },
    tags: ['LLM', '推理'], createdAt: '2026-03-15', updatedAt: '2026-05-12',
  },
  {
    id: '2', name: 'GPT-4o', description: 'OpenAI多模态模型', model: 'gpt-4o',
    type: 'multi-modal', status: 'active',
    metrics: { accuracy: 0.94, latency: 0.91, reasoning: 0.93, creativity: 0.95, robustness: 0.91, overall: 0.928 },
    tags: ['多模态', '通用'], createdAt: '2026-03-20', updatedAt: '2026-05-10',
  },
  {
    id: '3', name: 'DeepSeek-V3', description: '深度求索最强模型', model: 'deepseek-v3',
    type: 'code-gen', status: 'evaluating',
    metrics: { accuracy: 0.91, latency: 0.95, reasoning: 0.92, creativity: 0.89, robustness: 0.90, overall: 0.914 },
    tags: ['代码', '推理'], createdAt: '2026-04-01', updatedAt: '2026-05-14',
  },
  {
    id: '4', name: 'Gemini Ultra', description: 'Google Gemini Ultra', model: 'gemini-ultra-2.0',
    type: 'multi-modal', status: 'active',
    metrics: { accuracy: 0.92, latency: 0.87, reasoning: 0.91, creativity: 0.93, robustness: 0.89, overall: 0.904 },
    tags: ['多模态'], createdAt: '2026-04-10', updatedAt: '2026-05-11',
  },
  {
    id: '5', name: 'Qwen-Max', description: '通义千问旗舰模型', model: 'qwen-max',
    type: 'llm', status: 'inactive',
    metrics: { accuracy: 0.88, latency: 0.92, reasoning: 0.87, creativity: 0.90, robustness: 0.86, overall: 0.886 },
    tags: ['LLM', '中文'], createdAt: '2026-04-15', updatedAt: '2026-05-08',
  },
]

const typeLabels: Record<string, string> = {
  llm: '大语言模型', 'multi-modal': '多模态', 'tool-use': '工具调用',
  'code-gen': '代码生成', rag: 'RAG',
}

onMounted(() => {
  agentStore.agents = mockAgents
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-heading">Agent管理</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">管理待评测的AI Agent</p>
      </div>
      <button class="btn-primary">
        <Plus :size="16" />
        新建Agent
      </button>
    </div>

    <DataTable
      :columns="columns"
      :data="agentStore.agents"
      @row-click="(row: Agent) => router.push(`/agents/${row.id}`)"
    >
      <template #cell-name="{ row }: { row: Agent }">
        <div class="flex items-center gap-2">
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-ai-purple to-ai-cyan">
            <span class="text-xs font-bold text-white">{{ row.name.charAt(0) }}</span>
          </div>
          <span class="font-medium text-gray-700 dark:text-gray-200">{{ row.name }}</span>
        </div>
      </template>
      <template #cell-type="{ value }">
        <span class="text-gray-500 dark:text-gray-400">{{ typeLabels[value as string] || value }}</span>
      </template>
      <template #cell-status="{ value }">
        <StatusBadge :status="value as string" type="agent" />
      </template>
      <template #cell-overall="{ row }: { row: Agent }">
        <span class="font-mono text-sm" :class="row.metrics.overall >= 0.9 ? 'text-eval-pass' : 'text-eval-warn'">
          {{ (row.metrics.overall * 100).toFixed(1) }}%
        </span>
      </template>
      <template #cell-updatedAt="{ value }">
        <span class="text-gray-400 dark:text-gray-500">{{ value }}</span>
      </template>
    </DataTable>
  </div>
</template>
