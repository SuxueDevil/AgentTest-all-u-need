<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useAppStore } from '@stores'
import type { TrendPoint } from '@types'

const props = defineProps<{ data: TrendPoint[] }>()
const chartRef = ref<HTMLDivElement>()
const appStore = useAppStore()

let chart: echarts.ECharts | null = null

function getOptions(): echarts.EChartsOption {
  const isDark = appStore.theme === 'dark'
  return {
    grid: { left: 75, right: 65, top: 30, bottom: 45 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? '#1A1A2E' : '#FFFFFF',
      borderColor: isDark ? '#2D2D4A' : '#E5E7EB',
      textStyle: { color: isDark ? '#E2E8F0' : '#1F2937' },
    },
    xAxis: {
      type: 'category',
      data: props.data.map((d) => d.date.slice(5)),
      axisLine: { lineStyle: { color: isDark ? '#2D2D4A' : '#E5E7EB' } },
      axisTick: { show: false },
      axisLabel: { color: '#64748B', fontSize: 11 },
    },
    yAxis: [
      {
        type: 'value',
        name: '得分',
        min: 0.6,
        max: 1.0,
        splitLine: { lineStyle: { color: isDark ? '#1E1E3A' : '#F3F4F6' } },
        axisLabel: { color: '#64748B', fontSize: 11, formatter: (v: number) => (v * 100).toFixed(0) + '%' },
      },
      {
        type: 'value',
        name: '次数',
        splitLine: { show: false },
        axisLabel: { color: '#64748B', fontSize: 11 },
      },
    ],
    series: [
      {
        name: '平均得分',
        type: 'line',
        smooth: true,
        data: props.data.map((d) => +(d.avgScore * 100).toFixed(1)),
        lineStyle: { color: '#A78BFA', width: 3 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(124, 58, 237, 0.3)' },
            { offset: 1, color: 'rgba(124, 58, 237, 0.02)' },
          ]),
        },
        itemStyle: { color: '#A78BFA' },
        symbol: 'circle',
        symbolSize: 4,
      },
      {
        name: '评测次数',
        type: 'bar',
        yAxisIndex: 1,
        data: props.data.map((d) => d.evalCount),
        barWidth: 8,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#06B6D4' },
            { offset: 1, color: 'rgba(6, 182, 212, 0.1)' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
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
  <div ref="chartRef" class="h-full w-full"></div>
</template>
