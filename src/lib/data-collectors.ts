// UNIFIED METRICS COLLECTION SYSTEM

// === IMPORTS ===
import { getFCP, getTTFB, getLCP, getCLS, getFID } from 'web-vitals'
import os from 'os'
import process from 'process'
import fs from 'fs'
import readline from 'readline'

// === REAL-TIME DATA HANDLER ===
export class RealTimeDataCollector {
  private wsConnection: WebSocket | null = null
  private metricsInterval: NodeJS.Timeout | null = null
  private callbacks: Map<string, Function[]> = new Map()

  constructor(
    private config: {
      websocketUrl?: string
      collectInterval?: number
      enableFrontendMetrics?: boolean
      enableBackendMetrics?: boolean
      enableDatabaseMetrics?: boolean
    },
  ) {}

  async startCollection() {
    if (this.config.websocketUrl) this.setupWebSocket()

    this.metricsInterval = setInterval(() => {
      this.collectAllMetrics()
    }, this.config.collectInterval || 30000)

    if (typeof window !== "undefined" && this.config.enableFrontendMetrics) {
      this.setupPerformanceObserver()
    }
  }

  private setupWebSocket() {
    this.wsConnection = new WebSocket(this.config.websocketUrl!)
    this.wsConnection.onmessage = (event) => {
      const data = JSON.parse(event.data)
      this.notifyCallbacks(data.type, data.payload)
    }
    this.wsConnection.onclose = () => {
      setTimeout(() => this.setupWebSocket(), 5000)
    }
  }

  private setupPerformanceObserver() {
    const navObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as PerformanceNavigationTiming[]) {
        this.notifyCallbacks("navigation", {
          loadTime: entry.loadEventEnd - entry.fetchStart,
          domContentLoaded: entry.domContentLoadedEventEnd - entry.fetchStart,
          firstByte: entry.responseStart - entry.fetchStart,
        })
      }
    })
    navObserver.observe({ entryTypes: ["navigation"] })

    const resourceObserver = new PerformanceObserver((list) => {
      for (const resource of list.getEntries() as PerformanceResourceTiming[]) {
        if (resource.name.includes(".js") || resource.name.includes(".css")) {
          this.notifyCallbacks("resource", {
            name: resource.name,
            size: resource.transferSize,
            loadTime: resource.responseEnd - resource.fetchStart,
          })
        }
      }
    })
    resourceObserver.observe({ entryTypes: ["resource"] })
  }

  private async collectAllMetrics() {
    const metrics: any = {
      timestamp: new Date(),
      frontend: {},
      backend: {},
      database: {},
    }

    if (this.config.enableFrontendMetrics && typeof window !== "undefined") {
      metrics.frontend = await FrontendMetricsCollector.collectPerformanceMetrics()
    }

    if (this.config.enableBackendMetrics && typeof window === "undefined") {
      metrics.backend = await BackendMetricsCollector.getSystemMetrics()
    }

    if (this.config.enableDatabaseMetrics && typeof window === "undefined") {
      // Add DB call if needed
    }

    this.notifyCallbacks("metrics", metrics)
  }

  subscribe(type: string, callback: Function) {
    if (!this.callbacks.has(type)) this.callbacks.set(type, [])
    this.callbacks.get(type)!.push(callback)
  }

  private notifyCallbacks(type: string, data: any) {
    const callbacks = this.callbacks.get(type) || []
    callbacks.forEach(cb => cb(data))
  }

  stopCollection() {
    if (this.metricsInterval) clearInterval(this.metricsInterval)
    if (this.wsConnection) this.wsConnection.close()
  }
}

// === FRONTEND METRICS ===
export class FrontendMetricsCollector {
  static async collectWebVitals(): Promise<Record<string, number>> {
    const metrics: Record<string, number> = { cls: 0, fid: 0, fcp: 0, lcp: 0, ttfb: 0 }
    getCLS(m => (metrics.cls = m.value))
    getFID(m => (metrics.fid = m.value))
    getFCP(m => (metrics.fcp = m.value))
    getLCP(m => (metrics.lcp = m.value))
    getTTFB(m => (metrics.ttfb = m.value))
    return new Promise(resolve => setTimeout(() => resolve(metrics), 1000))
  }

  static async collectPerformanceMetrics() {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[]
    const js = resources.filter(r => r.name.endsWith('.js'))
    const css = resources.filter(r => r.name.endsWith('.css'))

    return {
      loadTime: nav.loadEventEnd - nav.fetchStart,
      domContentLoaded: nav.domContentLoadedEventEnd - nav.fetchStart,
      bundleSize: Math.round(js.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024),
      jsSize: Math.round(js.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024),
      cssSize: Math.round(css.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024),
      resourceCount: resources.length,
    }
  }
}

// === BACKEND METRICS ===
export class BackendMetricsCollector {
  static async getSystemMetrics() {
    return {
      cpuUsage: process.cpuUsage(),
      memoryUsage: process.memoryUsage(),
      systemLoad: os.loadavg(),
      uptime: process.uptime(),
      platform: os.platform(),
      nodeVersion: process.version,
    }
  }

  static createMetricsMiddleware() {
    const metrics = new Map()
    return {
      middleware: (req: any, res: any, next: any) => {
        const start = Date.now()
        const route = `${req.method} ${req.route?.path || req.path}`
        res.on('finish', () => {
          const duration = Date.now() - start
          if (!metrics.has(route)) {
            metrics.set(route, { totalRequests: 0, totalResponseTime: 0, errorCount: 0, statusCodes: {} })
          }
          const data = metrics.get(route)
          data.totalRequests++
          data.totalResponseTime += duration
          data.statusCodes[res.statusCode] = (data.statusCodes[res.statusCode] || 0) + 1
          if (res.statusCode >= 400) data.errorCount++
        })
        next()
      },
      getMetrics: () => {
        return Array.from(metrics.entries()).map(([route, data]: any) => ({
          route,
          avgResponseTime: data.totalResponseTime / data.totalRequests || 0,
          totalRequests: data.totalRequests,
          errorRate: (data.errorCount / data.totalRequests) * 100 || 0,
          statusCodes: data.statusCodes,
        }))
      },
    }
  }
}
