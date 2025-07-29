// Real-time data collection service

import { FrontendMetricsCollector } from "../lib/data-collectors"
import { BackendMetricsCollector } from "../lib/data-collectors"

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

  // Start collecting real-time data
  async startCollection() {
    // 1. Setup WebSocket for real-time updates
    if (this.config.websocketUrl) {
      this.setupWebSocket()
    }

    // 2. Start periodic metric collection
    this.metricsInterval = setInterval(async () => {
      await this.collectAllMetrics()
    }, this.config.collectInterval || 30000) // Every 30 seconds

    // 3. Setup browser performance observer (frontend only)
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
      // Reconnect after 5 seconds
      setTimeout(() => this.setupWebSocket(), 5000)
    }
  }

  private setupPerformanceObserver() {
    // Observe navigation timing
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const navEntry = entry as PerformanceNavigationTiming
          this.notifyCallbacks("navigation", {
            loadTime: navEntry.loadEventEnd - navEntry.fetchStart,
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.fetchStart,
            firstByte: navEntry.responseStart - navEntry.fetchStart,
          })
        }
      })

    navObserver.observe({ entryTypes: ["navigation"] })

      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming
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

    // Collect frontend metrics
    if (this.config.enableFrontendMetrics && typeof window !== "undefined") {
      metrics.frontend = await FrontendMetricsCollector.collectPerformanceMetrics()
    }

    // Collect backend metrics (server-side only)
    if (this.config.enableBackendMetrics && typeof window === "undefined") {
      metrics.backend = await BackendMetricsCollector.getSystemMetrics()
    }

    // Collect database metrics (server-side only)
    if (this.config.enableDatabaseMetrics && typeof window === "undefined") {
      // This would connect to your actual database
      // metrics.database = await DatabaseMetricsCollector.getMongoMetrics(db)
    }

    this.notifyCallbacks("metrics", metrics)
  }

  // Subscribe to specific metric types
  subscribe(type: string, callback: Function) {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, [])
    }
    this.callbacks.get(type)!.push(callback)
  }

  private notifyCallbacks(type: string, data: any) {
    const callbacks = this.callbacks.get(type) || []
    callbacks.forEach((callback) => callback(data))
  }

  // Stop collection and cleanup
  stopCollection() {
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval)
    }
    if (this.wsConnection) {
      this.wsConnection.close()
    }
  }
}
