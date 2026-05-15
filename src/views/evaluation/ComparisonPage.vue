<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useAppStore } from '@stores'

const chartRef = ref<HTMLDivElement>()
const appStore = useAppStore()
let chart: echarts.ECharts | null = null

const radarData = [
  { name: 'Claude Opus 4', value: [0.96, 0.88, 0.97, 0.94, 0.93], color: '#7C3AED' },
  { name: 'GPT-4o', value: [0.94, 0.91, 0.93, 0.95, 0.91], color: '#06B6D4' },
  { name: 'DeepSeek-V3', value: [0.91, 0.95, 0.92, 0.89, 0.90], color: '#22C55E' },
]

function getOptions(): echarts.EChartsOption {
  const isDark = appStore.theme === 'dark'
  return {
    grid: { left: 80, right: 50, top: 30, bottom: 30 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? '#1A1A2E' : '#FFFFFF',
      borderColor: isDark ? '#2D2D4A' : '#E5E7EB',
      textStyle: { color: isDark ? '#E2E8F0' : '#1F2937' },
    },
    xAxis: {
      type: 'category',
      data: ['准确率', '响应速度', '推理能力', '创造性', '鲁棒性'],
      axisLine: { lineStyle: { color: isDark ? '#2D2D4A' : '#E5E7EB' } },
      axisLabel: { color: isDark ? '#94A3B8' : '#6B7280' },
    },
    yAxis: {
      type: 'value', min: 0.7, max: 1.0,
      splitLine: { lineStyle: { color: isDark ? '#1E1E3A' : '#F3F4F6' } },
      axisLabel: { color: '#64748B', formatter: (v: number) => (v * 100).toFixed(0) + '%' },
    },
    series: radarData.map((agent) => ({
      name: agent.name,
      type: 'radar',
      data: [{ value: agent.value, name: agent.name }],
      lineStyle: { color: agent.color, width: 2 },
      areaStyle: { color: agent.color.replace(')', ', 0.15)').replace('rgb', 'rgba') },
      itemStyle: { color: agent.color },
    })),
  }
}

onMounted(() => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value, appStore.theme === 'dark' ? 'dark' : undefined)
  chart.setOption(getOptions())
  window.addEventListener('resize', () => chart?.resize())
})

watch(() => appStore.theme, () => {
  if (!chart) return
  chart.dispose()
  chart = echarts.init(chartRef.value!, appStore.theme === 'dark' ? 'dark' : undefined)
  chart.setOption(getOptions())
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold font-heading">对比分析</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">多Agent能力雷达图对比</p>
    </div>
    <div class="bento-card">
      <div ref="chartRef" class="h-[500px] w-full"></div>
    </div>
  </div>
</template>
