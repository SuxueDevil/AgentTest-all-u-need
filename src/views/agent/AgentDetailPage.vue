<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Play } from 'lucide-vue-next'
import type { Agent } from '@types'
import StatusBadge from '@components/common/StatusBadge.vue'

const route = useRoute()
const router = useRouter()
const agent = ref<Agent | null>(null)

onMounted(() => {
  // Mock data
  agent.value = {
    id: route.params.id as string,
    name: 'Claude Opus 4',
    description: 'Anthropic最强推理模型，在复杂推理、编程和创造性任务中表现卓越。支持扩展上下文和高级工具调用。',
    model: 'claude-opus-4-7',
    type: 'llm',
    status: 'active',
    metrics: { accuracy: 0.96, latency: 0.88, reasoning: 0.97, creativity: 0.94, robustness: 0.93, overall: 0.936 },
    tags: ['LLM', '推理', '编程', '企业级'],
    createdAt: '2026-03-15',
    updatedAt: '2026-05-12',
  }
})

const metricLabels: Record<string, string> = {
  accuracy: '准确率', latency: '响应速度', reasoning: '推理能力', creativity: '创造性', robustness: '鲁棒性', overall: '综合得分',
}
</script>

<template>
  <div v-if="agent" class="space-y-6">
    <button class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" @click="router.back()">
      <ArrowLeft :size="16" />
      返回列表
    </button>

    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-start gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ai-purple to-ai-cyan">
          <span class="text-2xl font-bold text-white">{{ agent.name.charAt(0) }}</span>
        </div>
        <div>
          <h1 class="text-2xl font-bold font-heading">{{ agent.name }}</h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-lg">{{ agent.description }}</p>
          <div class="flex items-center gap-2 mt-2">
            <StatusBadge :status="agent.status" type="agent" />
            <span class="text-xs text-gray-400 dark:text-gray-500">{{ agent.model }}</span>
          </div>
        </div>
      </div>
      <button class="btn-primary">
        <Play :size="16" />
        开始评测
      </button>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="(val, key) in agent.metrics"
        :key="key"
        class="bento-card-hover flex flex-col items-center p-5"
      >
        <span class="text-xs text-gray-400 dark:text-gray-500 mb-2">{{ metricLabels[key] }}</span>
        <span class="stat-value text-3xl">{{ (val * 100).toFixed(1) }}%</span>
        <div class="mt-3 h-1.5 w-full rounded-full bg-gray-200 dark:bg-ai-surface overflow-hidden">
          <div
            class="h-full rounded-full"
            :class="val >= 0.9 ? 'bg-eval-pass' : val >= 0.8 ? 'bg-eval-warn' : 'bg-eval-fail'"
            :style="{ width: `${val * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
