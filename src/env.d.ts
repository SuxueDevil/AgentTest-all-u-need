/**
 * src/env.d.ts — 引入 Vite 客户端类型
 * ---------------------------------------------------------------------------
 * 三斜线指令 reference types="vite/client"
 * 告诉 TS 编译器："请加载 Vite 提供的类型定义"，
 * 这样 import.meta.env 和 .vue 文件导入就有类型支持了。
 *
 * 【Java 类比】≈ 引入一个外部 JAR 的类型声明，不会参与编译输出
 */
/// <reference types="vite/client" />
