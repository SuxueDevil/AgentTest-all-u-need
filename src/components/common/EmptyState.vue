<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon?: Component
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20">
    <div v-if="icon" class="mb-4 text-gray-600">
      <component :is="icon" :size="48" />
    </div>
    <h3 class="text-lg font-medium text-gray-400">{{ title || '暂无数据' }}</h3>
    <p class="mt-1 text-sm text-gray-500">{{ description || '当前没有可显示的内容' }}</p>
    <slot />
  </div>
</template>
