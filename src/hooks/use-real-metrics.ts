"use client"

// React hook for collecting real metrics

import { useState, useEffect } from "react"
import { RealTimeDataCollector, FrontendMetricsCollector } from "../lib/real-time-collector"

export function useRealMetrics() {
  const [metrics, setMetrics] = useState<any>(null)
  const [collector, setCollector] = useState<RealTimeDataCollector | null>(null)

  useEffect(() => {
    // Initialize the collector
    const dataCollector = new RealTimeDataCollector({
      websocketUrl: process.env.NEXT_PUBLIC_WS_URL,
      collectInterval: 30000,
      enableFrontendMetrics: true,
      enableBackendMetrics: false, // Only on server
      enableDatabaseMetrics: false, // Only on server
    })

    // Subscribe to metrics updates
    dataCollector.subscribe("metrics", (data: any) => {
      setMetrics(data)
    })

    // Start collection
    dataCollector.startCollection()
    setCollector(dataCollector)

    // Cleanup
    return () => {
      dataCollector.stopCollection()
    }
  }, [])

  // Manual metric collection
  const collectNow = async () => {
    if (typeof window !== "undefined") {
      const frontendMetrics = await FrontendMetricsCollector.collectPerformanceMetrics()
      const webVitals = await FrontendMetricsCollector.collectWebVitals()

      // Send to your API
      await fetch("/api/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frontend: frontendMetrics, webVitals }),
      })
    }
  }

  return { metrics, collectNow }
}
