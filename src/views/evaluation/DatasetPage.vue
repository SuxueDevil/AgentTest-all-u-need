<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { formatDate } from '@utils/format'
const datasets = ref<any[]>([])

const columns = [
  { key: 'name', label: '数据集名称', width: '2fr' },
  { key: 'category', label: '类别', width: '1.5fr' },
  { key: 'itemCount', label: '样本数', width: '1fr' },
  { key: 'difficulty', label: '难度', width: '1fr' },
  { key: 'createdAt', label: '创建时间', width: '1.5fr' },
]

const categoryLabels: Record<string, string> = {
  reasoning: '推理能力', coding: '编程能力', qa: '问答能力',
  translation: '翻译能力', summarization: '摘要能力', 'tool-calling': '工具调用',
}

const diffLabels: Record<string, string> = { easy: '简单', medium: '中等', hard: '困难', mixed: '混合' }

onMounted(() => {
  datasets.value = [
    { id: '1', name: 'ReasonBench', description: '综合推理能力评测集', category: 'reasoning', itemCount: 5000, difficulty: 'hard', createdAt: '2026-04-01' },
    { id: '2', name: 'CodeEval', description: '代码生成与调试评测集', category: 'coding', itemCount: 3000, difficulty: 'medium', createdAt: '2026-04-10' },
    { id: '3', name: 'TransTest', description: '多语言翻译质量评测', category: 'translation', itemCount: 8000, difficulty: 'mixed', createdAt: '2026-04-15' },
    { id: '4', name: 'ToolCallBench', description: '工具调用与API使用评测', category: 'tool-calling', itemCount: 2000, difficulty: 'hard', createdAt: '2026-05-01' },
  ]
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-heading">数据集</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">评测数据集管理</p>
      </div>
    </div>
    <DataTable :columns="columns" :data="datasets">
      <template #cell-name="{ value }">
        <span class="font-medium text-gray-700 dark:text-gray-200">{{ value }}</span>
      </template>
      <template #cell-category="{ value }">
        <span class="text-gray-500 dark:text-gray-400">{{ categoryLabels[value as string] || value }}</span>
      </template>
      <template #cell-difficulty="{ value }">
        <span class="badge-info">{{ diffLabels[value as string] || value }}</span>
      </template>
      <template #cell-createdAt="{ value }">
        <span class="text-sm text-gray-400 dark:text-gray-500">{{ formatDate(value) }}</span>
      </template>
    </DataTable>
  </div>
</template>
