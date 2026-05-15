<script setup lang="ts">
import { FileText, TrendingUp } from 'lucide-vue-next'

const reports = [
  { id: '1', name: '2026年5月评测月报', taskCount: 12, avgScore: 0.891, createdAt: '2026-05-14' },
  { id: '2', name: 'Claude Opus 4 vs GPT-4o 深度对比', taskCount: 4, avgScore: 0.932, createdAt: '2026-05-10' },
  { id: '3', name: '代码生成能力专项报告', taskCount: 6, avgScore: 0.876, createdAt: '2026-05-05' },
  { id: '4', name: '2026年Q2季度综合报告', taskCount: 28, avgScore: 0.902, createdAt: '2026-04-30' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold font-heading">评测报告</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">评测结果分析与报告导出</p>
    </div>

    <div class="space-y-3">
      <div
        v-for="r in reports"
        :key="r.id"
        class="bento-card-hover flex items-center gap-4 p-5"
      >
        <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-ai-purple/15">
          <FileText :size="22" class="text-ai-purple-light" />
        </div>
        <div class="flex-1">
          <h3 class="font-medium text-gray-700 dark:text-gray-200">{{ r.name }}</h3>
          <div class="flex items-center gap-4 mt-1 text-xs text-gray-400 dark:text-gray-500">
            <span>{{ r.taskCount }} 个任务</span>
            <span class="flex items-center gap-1">
              <TrendingUp :size="12" class="text-eval-pass" />
              均分 {{ (r.avgScore * 100).toFixed(1) }}%
            </span>
          </div>
        </div>
        <span class="text-xs text-gray-400 dark:text-gray-500">{{ r.createdAt }}</span>
        <button class="btn-secondary text-xs">查看</button>
      </div>
    </div>
  </div>
</template>
