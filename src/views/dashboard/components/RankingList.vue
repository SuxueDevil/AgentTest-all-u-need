<script setup lang="ts">
import { ArrowUp, ArrowDown, Minus } from 'lucide-vue-next'
import type { AgentRanking } from '@types'

defineProps<{ rankings: AgentRanking[] }>()

const trendIcon = (t: string) => {
  if (t === 'up') return ArrowUp
  if (t === 'down') return ArrowDown
  return Minus
}

const trendColor = (t: string) => {
  if (t === 'up') return 'text-eval-pass'
  if (t === 'down') return 'text-eval-fail'
  return 'text-gray-400'
}
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="item in rankings.slice(0, 6)"
      :key="item.agentId"
      class="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
    >
      <span
        class="flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold"
        :class="{
          'bg-amber-400/20 text-amber-400': item.rank === 1,
          'bg-gray-400/20 text-gray-400': item.rank === 2,
          'bg-orange-400/20 text-orange-400': item.rank === 3,
          'text-gray-500 bg-gray-500/10': item.rank > 3,
        }"
      >
        {{ item.rank }}
      </span>
      <span class="flex-1 truncate text-gray-700 dark:text-gray-200">{{ item.agentName }}</span>
      <span class="font-mono text-xs text-gray-500 dark:text-gray-400">{{ (item.score * 100).toFixed(1) }}%</span>
      <component
        :is="trendIcon(item.trend)"
        :size="14"
        :class="trendColor(item.trend)"
      />
    </div>
  </div>
</template>
