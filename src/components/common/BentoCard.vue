<script setup lang="ts">
defineProps<{
  title?: string
  cols?: number
  rows?: number
  noOverflow?: boolean
}>()
</script>

<template>
  <div
    class="bento-card-hover flex flex-col"
    :class="{ 'overflow-hidden': !noOverflow }"
    :style="{
      gridColumn: cols ? `span ${cols}` : undefined,
      gridRow: rows ? `span ${rows}` : undefined,
    }"
  >
    <div v-if="title" class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400 shrink-0">{{ title }}</div>
    <div class="flex-1 min-h-0" :class="{ 'overflow-y-auto': !noOverflow }">
      <slot />
    </div>
  </div>
</template>
