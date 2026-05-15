<!-- 通用确认弹窗 — 点击遮罩或取消按钮触发 cancel，确认按钮触发 confirm -->
<script setup lang="ts">
/** 弹窗配置 */
defineProps<{
  /** 是否显示 */
  show: boolean
  /** 标题 */
  title?: string
  /** 提示消息 */
  message?: string
  /** 确认按钮文字，默认"确认" */
  confirmText?: string
  /** 取消按钮文字，默认"取消" */
  cancelText?: string
}>()

/** 事件: confirm — 用户点击确认；cancel — 用户点击取消或遮罩 */
const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <!-- 遮罩层，点击关闭 -->
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="emit('cancel')">
    <div class="bg-white dark:bg-ai-card rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4">
      <!-- 标题 -->
      <h3 class="text-lg font-bold">{{ title || '确认操作' }}</h3>
      <!-- 消息 -->
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ message || '确定要执行此操作吗？' }}</p>
      <!-- 按钮 -->
      <div class="flex justify-end gap-3 pt-2">
        <button class="btn-secondary" @click="emit('cancel')">{{ cancelText || '取消' }}</button>
        <button class="btn-primary bg-red-500 hover:bg-red-600" @click="emit('confirm')">{{ confirmText || '确认' }}</button>
      </div>
    </div>
  </div>
</template>
