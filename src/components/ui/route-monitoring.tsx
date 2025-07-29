"use client"

import { AlertTriangle, CheckCircle, Clock, Code, TrendingDown, TrendingUp } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"

interface RouteMonitoringProps {
  routes: Array<{
    path: string
    method: string
    avgResponseTime: number
    requestCount: number
    errorRate: number
    status: "healthy" | "warning" | "critical"
    lastTested: string
  }>
}

export function RouteMonitoring({ routes }: RouteMonitoringProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "default"
      case "warning":
        return "secondary"
      default:
        return "destructive"
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "POST":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "PUT":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "DELETE":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600" />
            API Route Performance
          </CardTitle>
          <CardDescription>Real-time monitoring of your backend endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map((route, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge className={getMethodColor(route.method)}>{route.method}</Badge>
                    <code className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {route.path}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(route.status)}
                    <Badge variant={getStatusColor(route.status) as any}>{route.status}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Avg Response Time</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="font-semibold">{route.avgResponseTime}ms</span>
                      {route.avgResponseTime < 200 ? (
                        <TrendingDown className="w-3 h-3 text-green-600" />
                      ) : (
                        <TrendingUp className="w-3 h-3 text-red-600" />
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Request Count</p>
                    <span className="font-semibold">{route.requestCount.toLocaleString()}</span>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Error Rate</p>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${route.errorRate > 5 ? "text-red-600" : "text-green-600"}`}>
                        {route.errorRate}%
                      </span>
                      <Progress value={route.errorRate} className="w-16 h-2" />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Last Tested</p>
                    <span className="text-sm">{route.lastTested}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Performance trend: {route.avgResponseTime < 200 ? "Improving" : "Needs attention"}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Logs
                    </Button>
                    <Button size="sm" variant="outline">
                      Test Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
