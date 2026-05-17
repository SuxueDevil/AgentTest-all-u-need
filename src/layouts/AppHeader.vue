<!--
  顶部导航栏 — Logo + 主题切换按钮。
  粘性定位，滚动时始终可见。通过 useAppStore 读写当前主题状态。
-->
<script setup lang="ts">
import { Sun, Moon, Sunset } from 'lucide-vue-next'
import { useAppStore } from '@stores'

const appStore = useAppStore()
</script>

<template>
  <header
    class="sticky top-0 z-30 flex h-16 items-center justify-between border-b px-6 backdrop-blur-xl transition-colors duration-300"
    :class="[
      appStore.theme === 'light'
        ? 'border-gray-200/80 bg-white/60'
        : 'border-ai-border bg-ai-purple-bg/60',
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center">
      <span
        class="text-lg font-semibold font-heading transition-colors"
        :class="appStore.theme === 'light' ? 'text-gray-900' : 'text-white'"
      >
        Test-All-u-Need
      </span>
    </div>

    <!-- 主题切换按钮 — 日间显示月亮(切暗黑)，夜间显示太阳(切明亮) -->
    <button
      class="rounded-xl p-2 transition-all duration-200 hover:bg-white/10"
      :class="appStore.theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-gray-200'"
      @click="appStore.cycleTheme()"
      :title="appStore.theme === 'dark' ? '切换黄昏模式' : appStore.theme === 'dusk' ? '切换亮色模式' : '切换暗色模式'"
    >
      <Sun v-if="appStore.theme === 'light'" :size="22" class="text-amber-400" />
      <Moon v-else-if="appStore.theme === 'dark'" :size="22" class="text-indigo-400" />
      <Sunset v-else :size="22" class="text-orange-400" />
    </button>
  </header>
</template>
