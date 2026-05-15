<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: string
  type?: 'agent' | 'task' | 'eval'
}>()

const statusMap: Record<string, { label: string; cls: string }> = {
  active: { label: '运行中', cls: 'badge-success' },
  inactive: { label: '已停用', cls: 'text-gray-400 bg-gray-500/10' },
  evaluating: { label: '评测中', cls: 'badge-info' },
  error: { label: '异常', cls: 'badge-error' },
  pending: { label: '等待中', cls: 'badge-warning' },
  running: { label: '进行中', cls: 'badge-info' },
  completed: { label: '已完成', cls: 'badge-success' },
  cancelled: { label: '已取消', cls: 'text-gray-400 bg-gray-500/10' },
  failed: { label: '失败', cls: 'badge-error' },
}

const display = computed(() => statusMap[props.status] || { label: props.status, cls: 'badge-info' })
</script>

<template>
  <span :class="display.cls">{{ display.label }}</span>
</template>
