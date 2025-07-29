"use client"

import { AlertTriangle, CheckCircle, Clock, Info, TrendingUp, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

interface AlertCenterProps {
  alerts: Array<{
    id: string
    title: string
    description: string
    severity: "critical" | "warning" | "info"
    category: "frontend" | "backend" | "database" | "security"
    timestamp: Date
    resolved: boolean
  }>
}

export function AlertCenter({ alerts }: AlertCenterProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      case "warning":
        return <Info className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "warning":
        return "default"
      default:
        return "secondary"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "backend":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "database":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    }
  }

  const activeAlerts = alerts.filter((alert) => !alert.resolved)
  const resolvedAlerts = alerts.filter((alert) => alert.resolved)

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {activeAlerts.filter((a) => a.severity === "critical").length}
                </p>
                <p className="text-sm text-slate-600">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {activeAlerts.filter((a) => a.severity === "warning").length}
                </p>
                <p className="text-sm text-slate-600">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{resolvedAlerts.length}</p>
                <p className="text-sm text-slate-600">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">98.5%</p>
                <p className="text-sm text-slate-600">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Active Alerts
            </span>
            <Badge variant="outline">{activeAlerts.length} active</Badge>
          </CardTitle>
          <CardDescription>Current issues requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.length > 0 ? (
              activeAlerts.map((alert) => (
                <Alert key={alert.id} variant={getSeverityColor(alert.severity) as any}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(alert.severity)}
                      <div className="flex-1">
                        <AlertTitle className="flex items-center gap-2">
                          {alert.title}
                          <Badge className={getCategoryColor(alert.category)}>{alert.category}</Badge>
                        </AlertTitle>
                        <AlertDescription className="mt-1">{alert.description}</AlertDescription>
                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.timestamp.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Investigate
                      </Button>
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Alert>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <p>No active alerts</p>
                <p className="text-sm">Your application is running smoothly</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {resolvedAlerts.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Recently Resolved
            </CardTitle>
            <CardDescription>Recently resolved alerts and issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resolvedAlerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-slate-600">{alert.timestamp.toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    Resolved
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
