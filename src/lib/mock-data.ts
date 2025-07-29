// Mock data generation and AI logic for demonstration
export type RouteStatus = "healthy" | "warning" | "critical"

export function generateMockMetrics() {
  const now = new Date()
  const metrics = []

  for (let i = 0; i < 50; i++) {
    const timestamp = new Date(now.getTime() - (49 - i) * 60000) // 1 minute intervals

    // Generate realistic metrics with some randomness and trends
    const baseTime = timestamp.getHours() + timestamp.getMinutes() / 60
    const workloadFactor = Math.sin(((baseTime - 9) * Math.PI) / 12) * 0.3 + 0.7 // Business hours pattern

    metrics.push({
      cpu: Math.max(
        0,
        Math.min(
          100,
          workloadFactor * 60 + Math.random() * 30 + (Math.random() > 0.95 ? 40 : 0), // Occasional spikes
        ),
      ),
      memory: Math.max(0, Math.min(100, workloadFactor * 70 + Math.random() * 20)),
      network: Math.max(0, workloadFactor * 50 + Math.random() * 30),
      storage: Math.max(
        0,
        Math.min(
          100,
          65 + Math.random() * 10, // Slowly growing storage
        ),
      ),
      timestamp,
    })
  }

  return metrics
}

export function detectAnomalies(metrics: any[]) {
  const alerts = []
  const latest = metrics[metrics.length - 1]

  if (latest.cpu > 85) {
    alerts.push({
      id: `cpu-${Date.now()}`,
      title: "High CPU Usage Detected",
      description: `CPU usage has reached ${latest.cpu.toFixed(1)}%. Consider scaling up your instances.`,
      severity: "high",
      timestamp: new Date(),
      type: "Performance",
    })
  }

  if (latest.memory > 90) {
    alerts.push({
      id: `memory-${Date.now()}`,
      title: "Memory Pressure Warning",
      description: `Memory usage is at ${latest.memory.toFixed(1)}%. Risk of application slowdown.`,
      severity: "high",
      timestamp: new Date(),
      type: "Performance",
    })
  }

  // Check for unusual patterns (simplified anomaly detection)
  if (metrics.length >= 10) {
    const recent = metrics.slice(-10)
    const avgCpu = recent.reduce((sum, m) => sum + m.cpu, 0) / recent.length
    const currentCpu = latest.cpu

    if (currentCpu > avgCpu * 1.5) {
      alerts.push({
        id: `anomaly-${Date.now()}`,
        title: "CPU Anomaly Detected",
        description: `Unusual CPU spike detected. Current usage is ${((currentCpu / avgCpu) * 100 - 100).toFixed(0)}% above normal.`,
        severity: "medium",
        timestamp: new Date(),
        type: "Anomaly",
      })
    }
  }

  return alerts
}

export function generateRecommendations(metrics: any[]) {
  const recommendations = []
  const latest = metrics[metrics.length - 1]

  if (latest.cpu > 75) {
    recommendations.push({
      id: "cpu-scale",
      title: "Scale Up CPU Resources",
      description:
        "Your CPU usage is consistently high. Consider upgrading to a larger instance type or adding more instances to your cluster.",
      impact: "high",
      category: "performance",
      savings: "$200/mo in efficiency gains",
    })
  }

  if (latest.storage > 80) {
    recommendations.push({
      id: "storage-optimize",
      title: "Optimize Storage Usage",
      description: "Storage is approaching capacity. Consider implementing data archiving or upgrading storage tier.",
      impact: "medium",
      category: "cost",
      savings: "$150/mo",
    })
  }

  // Always include some general recommendations
  recommendations.push({
    id: "cost-optimize",
    title: "Right-size Instances",
    description:
      "Analysis shows some instances are underutilized. Consider downsizing to save costs while maintaining performance.",
    impact: "medium",
    category: "cost",
    savings: "$300/mo",
  })

  if (Math.random() > 0.7) {
    recommendations.push({
      id: "security-update",
      title: "Security Patch Available",
      description: "New security updates are available for your instances. Schedule maintenance to apply patches.",
      impact: "high",
      category: "security",
    })
  }

  return recommendations
}

// Comprehensive mock data generation for StackPilot
// ✅ Updated mock data generator with correct RouteStatus typing
export function generateMockData() {
  return {
    frontend: {
      loadTime: Math.random() * 1000 + 500, // 500-1500ms
      lighthouseScore: Math.floor(Math.random() * 20 + 80), // 80-100
      bundleSize: (Math.random() * 200 + 300).toFixed(1) + "KB",
      activeUsers: Math.floor(Math.random() * 500 + 200),
      coreWebVitals: {
        cls: (Math.random() * 0.1).toFixed(3),
        fid: Math.random() * 50 + 10,
        lcp: Math.random() * 1000 + 1000,
      },
    },
    backend: {
      avgResponseTime: Math.random() * 200 + 100,
      errorRate: (Math.random() * 5).toFixed(1),
      requestsPerSecond: Math.floor(Math.random() * 500 + 200),
      totalRequests: Math.floor(Math.random() * 100000 + 500000),
      uptime: 99.9,
    },
    database: {
      avgQueryTime: Math.random() * 50 + 20,
      slowQueries: Math.floor(Math.random() * 10 + 2),
      cacheHitRate: Math.floor(Math.random() * 10 + 90),
      activeConnections: Math.floor(Math.random() * 50 + 20),
      indexEfficiency: Math.floor(Math.random() * 10 + 90),
    },
    routes: [
      {
        path: "/api/users",
        method: "GET",
        avgResponseTime: Math.random() * 100 + 50,
        requestCount: Math.floor(Math.random() * 10000 + 5000),
        errorRate: Math.random() * 2,
        status: getRandomStatus(),
        lastTested: "2 minutes ago",
      },
      {
        path: "/api/auth/login",
        method: "POST",
        avgResponseTime: Math.random() * 200 + 100,
        requestCount: Math.floor(Math.random() * 5000 + 2000),
        errorRate: Math.random() * 3,
        status: getRandomStatus(),
        lastTested: "1 minute ago",
      },
      {
        path: "/api/orders",
        method: "GET",
        avgResponseTime: Math.random() * 300 + 150,
        requestCount: Math.floor(Math.random() * 8000 + 3000),
        errorRate: Math.random() * 1.5,
        status: getRandomStatus(),
        lastTested: "3 minutes ago",
      },
      {
        path: "/api/checkout",
        method: "POST",
        avgResponseTime: Math.random() * 500 + 200,
        requestCount: Math.floor(Math.random() * 3000 + 1000),
        errorRate: Math.random() * 4,
        status: getRandomStatus(),
        lastTested: "5 minutes ago",
      },
      {
        path: "/api/products",
        method: "GET",
        avgResponseTime: Math.random() * 150 + 80,
        requestCount: Math.floor(Math.random() * 15000 + 8000),
        errorRate: Math.random() * 1,
        status: getRandomStatus(),
        lastTested: "1 minute ago",
      },
      {
        path: "/api/analytics",
        method: "GET",
        avgResponseTime: Math.random() * 400 + 300,
        requestCount: Math.floor(Math.random() * 2000 + 500),
        errorRate: Math.random() * 2.5,
        status: getRandomStatus(),
        lastTested: "4 minutes ago",
      },
    ],
  }
}
function getRandomStatus(): RouteStatus {
  const statuses: RouteStatus[] = ["healthy", "warning", "critical"]
  return statuses[Math.floor(Math.random() * statuses.length)]
}
export function calculateHealthScores(data: any) {
  // Frontend health calculation
  const frontendScore = Math.floor(
    data.frontend.lighthouseScore * 0.4 +
      ((2000 - data.frontend.loadTime) / 2000) * 100 * 0.3 +
      ((600 - Number.parseFloat(data.frontend.bundleSize)) / 600) * 100 * 0.3,
  )

  // Backend health calculation
  const backendScore = Math.floor(
    ((300 - data.backend.avgResponseTime) / 300) * 100 * 0.5 +
      ((5 - Number.parseFloat(data.backend.errorRate)) / 5) * 100 * 0.3 +
      data.backend.uptime * 0.2,
  )

  // Database health calculation
  const databaseScore = Math.floor(
    ((100 - data.database.avgQueryTime) / 100) * 100 * 0.4 +
      data.database.cacheHitRate * 0.3 +
      ((15 - data.database.slowQueries) / 15) * 100 * 0.3,
  )

  const overall = Math.floor((frontendScore + backendScore + databaseScore) / 3)

  return {
    frontend: Math.max(0, Math.min(100, frontendScore)),
    backend: Math.max(0, Math.min(100, backendScore)),
    database: Math.max(0, Math.min(100, databaseScore)),
    overall: Math.max(0, Math.min(100, overall)),
  }
}

export function generateAIInsights(data: any) {
  const insights = []

  // Frontend insights
  if (data.frontend.loadTime > 1000) {
    insights.push({
      id: "frontend-load-time",
      title: "Optimize Frontend Load Time",
      description: `Your page load time is ${data.frontend.loadTime.toFixed(0)}ms, which is above the recommended 1000ms threshold.`,
      category: "frontend",
      priority: "high",
      impact: "30% improvement in user engagement",
      recommendation:
        "Consider implementing code splitting, lazy loading, and optimizing your bundle size. Remove unused JavaScript and CSS to reduce initial load time.",
      confidence: 92,
    })
  }

  if (Number.parseFloat(data.frontend.bundleSize) > 400) {
    insights.push({
      id: "frontend-bundle-size",
      title: "Reduce Bundle Size",
      description: `Your JavaScript bundle is ${data.frontend.bundleSize}, which may impact loading performance.`,
      category: "frontend",
      priority: "medium",
      impact: "15% faster initial page load",
      recommendation:
        "Use tree shaking, code splitting, and dynamic imports. Consider using a bundler analyzer to identify large dependencies that can be optimized or replaced.",
      confidence: 88,
    })
  }

  // Backend insights
  if (data.backend.avgResponseTime > 200) {
    insights.push({
      id: "backend-response-time",
      title: "Optimize API Response Time",
      description: `Average API response time is ${data.backend.avgResponseTime.toFixed(0)}ms, which is above optimal levels.`,
      category: "backend",
      priority: "high",
      impact: "25% improvement in user experience",
      recommendation:
        "Implement caching strategies, optimize database queries, and consider using a CDN. Review slow endpoints and add database indexes where needed.",
      confidence: 95,
    })
  }

  if (Number.parseFloat(data.backend.errorRate) > 2) {
    insights.push({
      id: "backend-error-rate",
      title: "Reduce API Error Rate",
      description: `Your API error rate is ${data.backend.errorRate}%, which indicates potential stability issues.`,
      category: "backend",
      priority: "critical",
      impact: "Improved system reliability",
      recommendation:
        "Review error logs to identify common failure patterns. Implement better error handling, input validation, and consider adding circuit breakers for external dependencies.",
      confidence: 90,
    })
  }

  // Database insights
  if (data.database.avgQueryTime > 50) {
    insights.push({
      id: "database-query-time",
      title: "Optimize Database Performance",
      description: `Average database query time is ${data.database.avgQueryTime.toFixed(0)}ms, which may cause bottlenecks.`,
      category: "database",
      priority: "high",
      impact: "40% faster data retrieval",
      recommendation:
        "Add indexes to frequently queried columns, optimize complex queries using EXPLAIN plans, and consider query result caching. Review N+1 query patterns in your application.",
      confidence: 93,
    })
  }

  if (data.database.slowQueries > 5) {
    insights.push({
      id: "database-slow-queries",
      title: "Address Slow Database Queries",
      description: `You have ${data.database.slowQueries} slow queries that need optimization.`,
      category: "database",
      priority: "medium",
      impact: "20% improvement in overall response time",
      recommendation:
        "Identify and optimize the slowest queries. Consider adding composite indexes, rewriting complex joins, or implementing query result caching for frequently accessed data.",
      confidence: 87,
    })
  }

  // Security insights
  if (Math.random() > 0.7) {
    insights.push({
      id: "security-headers",
      title: "Enhance Security Headers",
      description:
        "Your application is missing some important security headers that could improve protection against common attacks.",
      category: "security",
      priority: "medium",
      impact: "Enhanced security posture",
      recommendation:
        "Implement Content Security Policy (CSP), X-Frame-Options, and X-Content-Type-Options headers. Consider adding HSTS for HTTPS enforcement.",
      confidence: 85,
    })
  }

  // Performance insights
  if (data.frontend.lighthouseScore < 90) {
    insights.push({
      id: "lighthouse-optimization",
      title: "Improve Lighthouse Score",
      description: `Your Lighthouse score is ${data.frontend.lighthouseScore}/100. There's room for improvement in web performance metrics.`,
      category: "frontend",
      priority: "medium",
      impact: "Better SEO and user experience",
      recommendation:
        "Focus on Core Web Vitals: optimize Largest Contentful Paint (LCP), reduce Cumulative Layout Shift (CLS), and minimize First Input Delay (FID).",
      confidence: 91,
    })
  }

  return insights
}

export function generateAlerts(data: any) {
  const alerts = []

  // Critical alerts
  if (data.backend.avgResponseTime > 500) {
    alerts.push({
      id: "critical-response-time",
      title: "Critical: High API Response Time",
      description: `API response time has reached ${data.backend.avgResponseTime.toFixed(0)}ms, significantly impacting user experience.`,
      severity: "critical",
      category: "backend",
      timestamp: new Date(Date.now() - Math.random() * 3600000),
      resolved: false,
    })
  }

  if (Number.parseFloat(data.backend.errorRate) > 5) {
    alerts.push({
      id: "critical-error-rate",
      title: "Critical: High Error Rate Detected",
      description: `API error rate has spiked to ${data.backend.errorRate}%. Immediate investigation required.`,
      severity: "critical",
      category: "backend",
      timestamp: new Date(Date.now() - Math.random() * 1800000),
      resolved: false,
    })
  }

  // Warning alerts
  if (data.frontend.loadTime > 2000) {
    alerts.push({
      id: "warning-load-time",
      title: "Warning: Slow Page Load Time",
      description: `Frontend load time is ${data.frontend.loadTime.toFixed(0)}ms, which may affect user satisfaction.`,
      severity: "warning",
      category: "frontend",
      timestamp: new Date(Date.now() - Math.random() * 7200000),
      resolved: false,
    })
  }

  if (data.database.slowQueries > 8) {
    alerts.push({
      id: "warning-slow-queries",
      title: "Warning: Multiple Slow Database Queries",
      description: `${data.database.slowQueries} slow queries detected. Database performance may be degraded.`,
      severity: "warning",
      category: "database",
      timestamp: new Date(Date.now() - Math.random() * 5400000),
      resolved: false,
    })
  }

  // Info alerts
  if (data.database.cacheHitRate < 85) {
    alerts.push({
      id: "info-cache-rate",
      title: "Info: Low Cache Hit Rate",
      description: `Database cache hit rate is ${data.database.cacheHitRate}%. Consider optimizing caching strategy.`,
      severity: "info",
      category: "database",
      timestamp: new Date(Date.now() - Math.random() * 10800000),
      resolved: false,
    })
  }

  // Add some resolved alerts for demonstration
  alerts.push({
    id: "resolved-memory-usage",
    title: "High Memory Usage Resolved",
    description: "Memory usage has returned to normal levels after optimization.",
    severity: "warning",
    category: "backend",
    timestamp: new Date(Date.now() - Math.random() * 86400000),
    resolved: true,
  })

  alerts.push({
    id: "resolved-ssl-cert",
    title: "SSL Certificate Renewed",
    description: "SSL certificate has been successfully renewed and is valid for another year.",
    severity: "info",
    category: "security",
    timestamp: new Date(Date.now() - Math.random() * 172800000),
    resolved: true,
  })

  return alerts
}
