"use client"

import { Activity, Database, Globe, Server, Zap } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"

interface HealthScoresProps {
  data: any
  healthScores: {
    frontend: number
    backend: number
    database: number
    overall: number
  }
}

export function HealthScores({ data, healthScores }: HealthScoresProps) {
  const healthData = [
    { name: "Frontend", value: healthScores.frontend, color: "#3b82f6" },
    { name: "Backend", value: healthScores.backend, color: "#10b981" },
    { name: "Database", value: healthScores.database, color: "#8b5cf6" },
  ]

  const detailedMetrics = [
    {
      category: "Frontend",
      icon: <Globe className="w-5 h-5 text-blue-600" />,
      metrics: [
        {
          name: "Load Time",
          value: data.frontend.loadTime,
          unit: "ms",
          target: 1000,
          score: data.frontend.loadTime < 1000 ? 100 : 60,
        },
        {
          name: "Lighthouse Score",
          value: data.frontend.lighthouseScore,
          unit: "/100",
          target: 90,
          score: data.frontend.lighthouseScore,
        },
        {
          name: "Bundle Size",
          value: Number.parseFloat(data.frontend.bundleSize),
          unit: "KB",
          target: 500,
          score: Number.parseFloat(data.frontend.bundleSize) < 500 ? 100 : 70,
        },
        { name: "CLS Score", value: 0.05, unit: "", target: 0.1, score: 95 },
      ],
    },
    {
      category: "Backend",
      icon: <Server className="w-5 h-5 text-green-600" />,
      metrics: [
        {
          name: "Response Time",
          value: data.backend.avgResponseTime,
          unit: "ms",
          target: 200,
          score: data.backend.avgResponseTime < 200 ? 100 : 75,
        },
        {
          name: "Error Rate",
          value: data.backend.errorRate,
          unit: "%",
          target: 1,
          score: data.backend.errorRate < 1 ? 100 : 60,
        },
        { name: "Throughput", value: data.backend.requestsPerSecond, unit: "req/s", target: 1000, score: 85 },
        { name: "CPU Usage", value: 45, unit: "%", target: 70, score: 90 },
      ],
    },
    {
      category: "Database",
      icon: <Database className="w-5 h-5 text-purple-600" />,
      metrics: [
        {
          name: "Query Time",
          value: data.database.avgQueryTime,
          unit: "ms",
          target: 50,
          score: data.database.avgQueryTime < 50 ? 100 : 80,
        },
        {
          name: "Cache Hit Rate",
          value: data.database.cacheHitRate,
          unit: "%",
          target: 95,
          score: data.database.cacheHitRate,
        },
        { name: "Connection Pool", value: 85, unit: "%", target: 90, score: 85 },
        { name: "Index Efficiency", value: 92, unit: "%", target: 95, score: 92 },
      ],
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
  }

  return (
    <div className="space-y-6">
      {/* Overall Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Overall Health Score
            </CardTitle>
            <CardDescription>Comprehensive application health assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className={`text-6xl font-bold ${getScoreColor(healthScores.overall)}`}>{healthScores.overall}</div>
              <Badge variant={getScoreBadge(healthScores.overall)} className="mt-2">
                {healthScores.overall >= 90 ? "Excellent" : healthScores.overall >= 70 ? "Good" : "Needs Improvement"}
              </Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {healthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Performance Breakdown
            </CardTitle>
            <CardDescription>Detailed health metrics by component</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {detailedMetrics.map((category, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.icon}
                {category.category} Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {metric.value}
                          {metric.unit}
                        </span>
                        <Badge variant={getScoreBadge(metric.score)} className="text-xs">
                          {metric.score}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                    <p className="text-xs text-slate-500">
                      Target: {metric.target}
                      {metric.unit}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
