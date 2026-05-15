<script setup lang="ts">
import { Settings, Server, Shield, Palette } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold font-heading">系统设置</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">平台配置与管理</p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="bento-card space-y-3">
        <div class="flex items-center gap-2">
          <Server :size="18" class="text-ai-purple-light" />
          <h3 class="font-medium">API配置</h3>
        </div>
        <p class="text-sm text-gray-400 dark:text-gray-500">配置外部Agent API端点和认证信息</p>
      </div>
      <div class="bento-card space-y-3">
        <div class="flex items-center gap-2">
          <Shield :size="18" class="text-eval-pass" />
          <h3 class="font-medium">安全设置</h3>
        </div>
        <p class="text-sm text-gray-400 dark:text-gray-500">管理访问控制和数据安全策略</p>
      </div>
      <div class="bento-card space-y-3">
        <div class="flex items-center gap-2">
          <Palette :size="18" class="text-eval-warn" />
          <h3 class="font-medium">界面定制</h3>
        </div>
        <p class="text-sm text-gray-400 dark:text-gray-500">自定义仪表盘布局和主题配色</p>
      </div>
      <div class="bento-card space-y-3">
        <div class="flex items-center gap-2">
          <Settings :size="18" class="text-gray-400" />
          <h3 class="font-medium">系统日志</h3>
        </div>
        <p class="text-sm text-gray-400 dark:text-gray-500">查看平台运行日志和错误追踪</p>
      </div>
    </div>
  </div>
</template>
