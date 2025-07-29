// lib/metrics/collector.ts

import { getFCP, getTTFB, getLCP, getCLS, getFID, ReportHandler } from 'web-vitals';
import os from 'os'
import process from 'process'
import fs from 'fs'
import readline from 'readline'

export class FrontendMetricsCollector {
  static async collectWebVitals(): Promise<Record<string, number>> {
    const metrics: Record<string, number> = {
      cls: 0,
      fid: 0,
      fcp: 0,
      lcp: 0,
      ttfb: 0,
    }

    getCLS(metric => (metrics.cls = metric.value))
    getFID(metric => (metrics.fid = metric.value))
    getFCP(metric => (metrics.fcp = metric.value))
    getLCP(metric => (metrics.lcp = metric.value))
    getTTFB(metric => (metrics.ttfb = metric.value))

    return new Promise((resolve) => setTimeout(() => resolve(metrics), 1000))
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

  static async getLighthouseScore(url: string) {
    const API_KEY = process.env.NEXT_PUBLIC_PAGESPEED_API_KEY
    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${API_KEY}&category=performance`
    )
    const data = await res.json()

    return {
      performance: data?.lighthouseResult?.categories?.performance?.score * 100,
      accessibility: data?.lighthouseResult?.categories?.accessibility?.score * 100,
      bestPractices: data?.lighthouseResult?.categories?.['best-practices']?.score * 100,
      seo: data?.lighthouseResult?.categories?.seo?.score * 100,
    }
  }
}

export class BackendMetricsCollector {
  static createMetricsMiddleware() {
    const metrics = new Map()

    return {
      middleware: (req: any, res: any, next: any) => {
        const start = Date.now()
        const route = `${req.method} ${req.route?.path || req.path}`

        res.on('finish', () => {
          const duration = Date.now() - start
          const status = res.statusCode

          if (!metrics.has(route)) {
            metrics.set(route, {
              totalRequests: 0,
              totalResponseTime: 0,
              errorCount: 0,
              statusCodes: {},
            })
          }

          const data = metrics.get(route)
          data.totalRequests++
          data.totalResponseTime += duration
          data.statusCodes[status] = (data.statusCodes[status] || 0) + 1
          if (status >= 400) data.errorCount++
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

  static async getPM2Metrics() {
    const pm2 = await import('pm2')

    return new Promise((resolve, reject) => {
      pm2.list((err, list) => {
        if (err) return reject(err)
        resolve(
          list.map(proc => ({
            name: proc.name,
            status: proc.pm2_env.status,
            cpu: proc.monit.cpu,
            memory: proc.monit.memory,
            restarts: proc.pm2_env.restart_time,
            uptime: Date.now() - proc.pm2_env.pm_uptime,
          }))
        )
      })
    })
  }
}

export class DatabaseMetricsCollector {
  static async getMongoMetrics(db: any) {
    const stats = await db.stats()
    const server = await db.admin().serverStatus()

    return {
      collections: stats.collections,
      dataSize: stats.dataSize,
      indexSize: stats.indexSize,
      connections: server.connections,
      opcounters: server.opcounters,
      memory: server.mem,
      network: server.network,
    }
  }

  static async getSlowQueries(db: any) {
    await db.setProfilingLevel(1, { slowms: 100 })
    const recent = await db
      .collection('system.profile')
      .find({ ts: { $gte: new Date(Date.now() - 3600000) } })
      .sort({ ts: -1 })
      .limit(50)
      .toArray()

    return recent.map(entry => ({
      command: entry.command,
      duration: entry.millis,
      timestamp: entry.ts,
      namespace: entry.ns,
    }))
  }

  static async getPostgreSQLMetrics(client: any) {
    const queries = [
      "SELECT count(*) as active_connections FROM pg_stat_activity WHERE state = 'active'",
      "SELECT pg_size_pretty(pg_database_size(current_database())) as db_size",
      `SELECT query, mean_time, calls, total_time FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10`,
      `SELECT sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) * 100 as cache_hit_ratio FROM pg_statio_user_tables`,
    ]

    const results = await Promise.all(queries.map(q => client.query(q)))

    return {
      activeConnections: results[0].rows[0].active_connections,
      databaseSize: results[1].rows[0].db_size,
      slowQueries: results[2].rows,
      cacheHitRatio: results[3].rows[0].cache_hit_ratio,
    }
  }
}

export class ThirdPartyIntegrations {
  static async getNewRelicMetrics() {
    const API_KEY = process.env.NEW_RELIC_API_KEY

    const res = await fetch('https://api.newrelic.com/v2/applications.json', {
      headers: {
        'X-Api-Key': API_KEY!,
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    return data.applications.map((app: any) => ({
      name: app.name,
      health_status: app.health_status,
      application_summary: app.application_summary,
    }))
  }

  static async getDatadogMetrics() {
    const API_KEY = process.env.DATADOG_API_KEY
    const APP_KEY = process.env.DATADOG_APP_KEY

    const res = await fetch(`https://api.datadoghq.com/api/v1/query?query=avg:system.cpu.user{*}`, {
      headers: {
        'DD-API-KEY': API_KEY!,
        'DD-APPLICATION-KEY': APP_KEY!,
      },
    })

    return await res.json()
  }

  static async getVercelAnalytics() {
    const token = process.env.VERCEL_ACCESS_TOKEN
    const teamId = process.env.VERCEL_TEAM_ID

    const res = await fetch(`https://api.vercel.com/v1/analytics?teamId=${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return await res.json()
  }
}

export class LogAnalyzer {
  static async analyzeErrorLogs(logFilePath: string) {
    const rl = readline.createInterface({
      input: fs.createReadStream(logFilePath),
      crlfDelay: Infinity,
    })

    const errorPatterns = /ERROR|FATAL|Exception|Error:/i
    const logs: any[] = []

    for await (const line of rl) {
      if (errorPatterns.test(line)) {
        logs.push({
          timestamp: this.extractTimestamp(line),
          message: line,
          level: this.extractLogLevel(line),
        })
      }
    }

    return this.categorizeErrors(logs)
  }

  private static extractTimestamp(line: string): Date {
    const match = line.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    return match ? new Date(match[0]) : new Date()
  }

  private static extractLogLevel(line: string): string {
    const match = line.match(/(ERROR|FATAL|WARN|INFO|DEBUG)/i)
    return match ? match[1].toUpperCase() : 'UNKNOWN'
  }

  private static categorizeErrors(errors: any[]) {
    const categories = {
      database: [],
      authentication: [],
      network: [],
      validation: [],
      other: [],
    }

    for (const e of errors) {
      if (/database|sql|mongo|postgres/i.test(e.message)) categories.database.push(e)
      else if (/auth|login|token|unauthorized/i.test(e.message)) categories.authentication.push(e)
      else if (/network|timeout|connection|socket/i.test(e.message)) categories.network.push(e)
      else if (/validation|invalid|required|missing/i.test(e.message)) categories.validation.push(e)
      else categories.other.push(e)
    }

    return categories
  }
}
