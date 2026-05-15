<script setup lang="ts">
import type { EvalActivity } from '@types'
import StatusBadge from '@components/common/StatusBadge.vue'

defineProps<{ activities: EvalActivity[] }>()
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="act in activities"
      :key="act.id"
      class="flex items-center gap-3 text-sm pr-2"
    >
      <div class="relative flex h-2 w-2 shrink-0">
        <span
          class="absolute h-full w-full rounded-full"
          :class="{
            'bg-eval-pass': act.status === 'completed',
            'bg-ai-purple animate-pulse': act.status === 'running',
            'bg-eval-fail': act.status === 'failed',
            'bg-eval-warn': act.status === 'pending',
          }"
        ></span>
      </div>
      <div class="flex-1 min-w-0">
        <p class="truncate text-gray-600 dark:text-gray-300">{{ act.agentName }}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">{{ act.taskName }}</p>
      </div>
      <span class="text-xs text-gray-400 dark:text-gray-500 shrink-0">{{ act.timestamp }}</span>
    </div>
  </div>
</template>
