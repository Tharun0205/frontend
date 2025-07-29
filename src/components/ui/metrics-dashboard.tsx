"use client"

import { Clock, TrendingDown, TrendingUp, Users, Zap } from "lucide-react"
import {
  Area,
  AreaChart,
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

interface MetricsDashboardProps {
  data: any
}

export function MetricsDashboard({ data }: MetricsDashboardProps) {
  // Generate time series data for charts
  const performanceData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    frontend: Math.random() * 1000 + 500,
    backend: Math.random() * 500 + 200,
    database: Math.random() * 100 + 50,
  }))

  const trafficData = Array.from({ length: 7 }, (_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    requests: Math.random() * 10000 + 5000,
    users: Math.random() * 1000 + 500,
  }))

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Response Time Trends (24h)
          </CardTitle>
          <CardDescription>Average response times across your stack</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Traffic Overview
            </CardTitle>
            <CardDescription>Weekly traffic and user activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area type="monotone" dataKey="users" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Bundle Size</p>
                  <p className="text-2xl font-bold">{data.frontend.bundleSize}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm">-5.2%</span>
                  </div>
                  <p className="text-xs text-slate-500">vs last week</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">API Throughput</p>
                  <p className="text-2xl font-bold">{data.backend.requestsPerSecond}/s</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+12.3%</span>
                  </div>
                  <p className="text-xs text-slate-500">vs last week</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Cache Hit Rate</p>
                  <p className="text-2xl font-bold">{data.database.cacheHitRate}%</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+2.1%</span>
                  </div>
                  <p className="text-xs text-slate-500">vs last week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
