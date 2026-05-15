<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed } from 'vue'

const props = defineProps<{
  columns: { key: string; label: string; width?: string; sortable?: boolean }[]
  data: T[]
  loading?: boolean
  emptyText?: string
}>()

const emit = defineEmits<{
  sort: [key: string]
  rowClick: [row: T]
}>()

const gridTemplate = computed(() =>
  props.columns.map((c) => c.width || '1fr').join(' '),
)
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 dark:border-ai-border">
    <!-- Header -->
    <div
      class="grid items-center gap-4 border-b border-gray-200 dark:border-ai-border bg-white/70 dark:bg-ai-card px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400"
      :style="{ gridTemplateColumns: gridTemplate }"
    >
      <div
        v-for="col in columns"
        :key="col.key"
        class="flex items-center gap-1"
        :class="{ 'cursor-pointer select-none': col.sortable }"
        @click="col.sortable && emit('sort', col.key)"
      >
        {{ col.label }}
      </div>
    </div>

    <!-- Body -->
    <div class="divide-y divide-gray-200 dark:divide-ai-border">
      <div
        v-for="(row, idx) in data"
        :key="idx"
        class="grid items-center gap-4 px-4 py-3 text-sm transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
        :class="{ 'cursor-pointer': !!emit }"
        :style="{ gridTemplateColumns: gridTemplate }"
        @click="emit('rowClick', row)"
      >
        <div v-for="col in columns" :key="col.key" class="truncate">
          <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
            {{ row[col.key] }}
          </slot>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-if="!loading && data.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
      <span class="text-4xl mb-3">📋</span>
      <span class="text-sm">{{ emptyText || '暂无数据' }}</span>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-16">
      <LoadingSpinner />
    </div>
  </div>
</template>
