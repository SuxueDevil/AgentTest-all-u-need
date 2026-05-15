<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  label: string
  value: string | number
  trend?: string
  trendType?: 'up' | 'down' | 'neutral'
  icon: Component
}>()
</script>

<template>
  <div class="bento-card-hover flex items-start gap-4">
    <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-ai-purple/15">
      <component :is="icon" :size="22" class="text-ai-purple-light" />
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ label }}</p>
      <p class="stat-value text-2xl">{{ value }}</p>
      <p v-if="trend" class="mt-1 text-xs" :class="{
        'text-eval-pass': trendType === 'up',
        'text-eval-fail': trendType === 'down',
        'text-gray-400': trendType === 'neutral',
      }">
        {{ trend }}
      </p>
    </div>
  </div>
</template>
