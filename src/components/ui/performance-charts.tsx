"use client"

import { Clock, Database, Globe, Server, TrendingUp, Users } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

interface PerformanceChartsProps {
  data: any
}

export function PerformanceCharts({ data }: PerformanceChartsProps) {
  // Generate historical performance data
  const performanceHistory = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    frontend: Math.random() * 500 + 300,
    backend: Math.random() * 200 + 100,
    database: Math.random() * 50 + 25,
    users: Math.random() * 1000 + 500,
  }))

  const errorRateData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    frontend: Math.random() * 2,
    backend: Math.random() * 5,
    database: Math.random() * 1,
  }))

  const throughputData = Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    requests: Math.random() * 100000 + 50000,
    users: Math.random() * 10000 + 5000,
  }))

  return (
    <div className="space-y-6">
      {/* Performance Trends */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Performance Trends (30 Days)
          </CardTitle>
          <CardDescription>Historical performance data across your application stack</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="frontend" stroke="#3b82f6" strokeWidth={2} name="Frontend (ms)" />
                <Line type="monotone" dataKey="backend" stroke="#10b981" strokeWidth={2} name="Backend (ms)" />
                <Line type="monotone" dataKey="database" stroke="#8b5cf6" strokeWidth={2} name="Database (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Error Rate Analysis */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-600" />
              Error Rate Analysis (24h)
            </CardTitle>
            <CardDescription>Error rates across different components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={errorRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="frontend"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Frontend %"
                  />
                  <Area
                    type="monotone"
                    dataKey="backend"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                    name="Backend %"
                  />
                  <Area
                    type="monotone"
                    dataKey="database"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                    name="Database %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Throughput Analysis */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Throughput Analysis (12 Months)
            </CardTitle>
            <CardDescription>Request volume and user activity trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={throughputData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="requests" fill="#3b82f6" name="Requests" />
                  <Bar dataKey="users" fill="#10b981" name="Active Users" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component-Specific Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Frontend Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">First Contentful Paint</span>
              <span className="font-semibold">1.2s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Largest Contentful Paint</span>
              <span className="font-semibold">2.1s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Cumulative Layout Shift</span>
              <span className="font-semibold">0.05</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Time to Interactive</span>
              <span className="font-semibold">2.8s</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-green-600" />
              Backend Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">P50 Response Time</span>
              <span className="font-semibold">120ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">P95 Response Time</span>
              <span className="font-semibold">450ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">P99 Response Time</span>
              <span className="font-semibold">1.2s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Apdex Score</span>
              <span className="font-semibold">0.94</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-600" />
              Database Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Avg Query Time</span>
              <span className="font-semibold">{data.database.avgQueryTime}ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Slow Queries</span>
              <span className="font-semibold">{data.database.slowQueries}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Cache Hit Rate</span>
              <span className="font-semibold">{data.database.cacheHitRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Connection Pool</span>
              <span className="font-semibold">85%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
