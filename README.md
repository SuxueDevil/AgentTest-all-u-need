# Agent智能评测平台

AI Agent 评估与基准测试平台，支持多 Agent 管理、评测任务调度、数据集管理、对比分析和报告生成。

## 环境要求

| 工具 | 最低版本 | 推荐版本 |
|------|----------|----------|
| Node.js | 18.x | 20.x LTS |
| npm | 9.x | 10.x |

## 快速启动

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 浏览器访问
# http://localhost:5173
```

## 可用命令

```bash
npm run dev          # 开发服务器 (port 5173, hot-reload)
npm run build        # 生产构建
npm run preview      # 预览生产构建
npm run lint         # ESLint 代码检查
npm run format       # Prettier 代码格式化
npm run type-check   # TypeScript 类型检查
```

## 技术栈

Vue 3 + TypeScript + Vite + Pinia + Vue Router + Tailwind CSS + ECharts + Axios

## 文档

- [架构文档](doc/架构.md) — 完整的前端架构、目录结构、路由设计、状态管理、API 层和设计系统说明
