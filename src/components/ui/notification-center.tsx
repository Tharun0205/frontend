"use client"

import { AlertTriangle, Bell, CheckCircle, Info, X } from "lucide-react"
import { useState } from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

interface NotificationCenterProps {
  alerts: Array<{
    id: string
    title: string
    description: string
    severity: "critical" | "warning" | "info"
    timestamp: Date
    resolved: boolean
  }>
}

export function NotificationCenter({ alerts }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const unreadAlerts = alerts.filter((alert) => !alert.resolved)

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <Info className="h-4 w-4 text-amber-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative gap-2 bg-transparent">
          <Bell className="w-4 h-4" />
          {unreadAlerts.length > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
              {unreadAlerts.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </span>
              <Badge variant="outline">{unreadAlerts.length} new</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {unreadAlerts.length > 0 ? (
                unreadAlerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 border-b last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(alert.severity)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{alert.title}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                          {alert.description}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">{alert.timestamp.toLocaleTimeString()}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-emerald-500" />
                  <p>No new notifications</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              )}
            </div>
            {unreadAlerts.length > 5 && (
              <div className="p-4 border-t">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View All Notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
