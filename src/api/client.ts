/**
 * HTTP 客户端 — 基于 Axios 的封装
 * =============================================================================
 * 【Java 类比】≈ RestTemplate / WebClient 的封装类
 *   Axios ≈ RestTemplate（HTTP 请求库）
 *   instance ≈ 配置好的 RestTemplate Bean（带 baseUrl、timeout、拦截器）
 *
 * 【TS 特性 — 泛型 <T>】
 *   function get<T>(url): Promise<T>
 *   相当于 Java 的 public <T> T get(String url)
 *   Promise<T> ≈ CompletableFuture<T>（异步操作的占位符）
 *   调用方通过 await 等待结果，≈ Java 的 .get() 阻塞等待
 */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { appConfig } from '@config'

/**
 * 创建 Axios 实例
 * ---------------------------------------------------------------------------
 * 相当于 Java 中创建一个配置好的 RestTemplate Bean，
 * 所有 HTTP 请求共享这个实例（连接池复用、拦截器统一）。
 */
const instance: AxiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 30000, // 30 秒超时
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 请求拦截器 — 在请求发出前自动附加 Token
 * ---------------------------------------------------------------------------
 * 【Java 类比】≈ Spring 的 ClientHttpRequestInterceptor
 *   每次 HTTP 请求前自动从 localStorage 取 Token 并加到请求头。
 *   config.headers.Authorization = `Bearer ${token}`
 *   相当于给每个请求自动加上 Authorization 头。
 */
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

/**
 * 响应拦截器 — 统一处理响应和错误
 * ---------------------------------------------------------------------------
 * 【Java 类比】≈ Spring 的 ResponseErrorHandler
 *   成功时：自动解包 response.data，调用方拿到的直接就是业务数据
 *   401 时：清除 Token 并跳转登录页（相当于 Spring Security 的认证入口）
 */
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

/**
 * 封装 HTTP 方法 — 统一返回 Promise<T> 方便调用方 await
 * =============================================================================
 * 【泛型说明】
 *   <T = unknown> 中的 = unknown 是"默认类型参数"：
 *   不传 T 时默认 unknown（类型安全的无类型），而不是 any（不安全）。
 *   相当于 Java 的 <T> 如果不指定则默认为 Object。
 *
 *   as Promise<T> 是"类型断言"（Type Assertion）：
 *   告诉 TS 编译器"我知道返回值的实际类型是 T"。
 *   因为 Axios 的类型定义比较宽泛，这里手动收紧。
 *   相当于 Java 的 (T) result 强制转型。
 */
export async function get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.get(url, config) as Promise<T>
}

export async function post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return instance.post(url, data, config) as Promise<T>
}

export async function put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return instance.put(url, data, config) as Promise<T>
}

// del 不是 delete（因为 delete 是 JS 保留关键字）
export async function del<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.delete(url, config) as Promise<T>
}

// 导出配置好的实例，供需要直接使用的场景
export default instance
