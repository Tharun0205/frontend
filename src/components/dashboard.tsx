"use client"

import { calculateHealthScores, generateAIInsights, generateAlerts, generateMockData } from "../lib/mock-data"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  Code,
  Cpu,
  Database,
  Download,
  Eye,
  Filter,
  Globe,
  HardDrive,
  Monitor,
  Network,
  RefreshCw,
  Search,
  Server,
  TrendingUp,
} from "lucide-react"
import { useEffect, useState } from "react"
import { AIInsights } from "../components/ui/ai-insights"
import { AlertCenter } from "../components/ui/alert-center"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { HealthScores } from "../components/ui/health-scores"
import { MetricsDashboard } from "../components/ui/metrics-dashboard"
import { NotificationCenter } from "../components/ui/notification-center"
import { PerformanceCharts } from "../components/ui/performance-charts"
import { Progress } from "../components/ui/progress"
import { RouteMonitoring } from "../components/ui/route-monitoring"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ThemeProvider } from "../components/ui/theme-provider"
import { ThemeToggle } from "../components/ui/theme-toggle"
import { UserProfile } from "../components/ui/user-profile"

export default function StackPilotDashboard() {
  const [data, setData] = useState(generateMockData())
  const [healthScores, setHealthScores] = useState(calculateHealthScores(data))
  const [aiInsights, setAIInsights] = useState(generateAIInsights(data))
  const [alerts, setAlerts] = useState(generateAlerts(data))
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData()
      setData(newData)
      setHealthScores(calculateHealthScores(newData))
      setAIInsights(generateAIInsights(newData))
      setAlerts(generateAlerts(newData))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newData = generateMockData()
    setData(newData)
    setHealthScores(calculateHealthScores(newData))
    setAIInsights(generateAIInsights(newData))
    setAlerts(generateAlerts(newData))
    setIsRefreshing(false)
  }

  const getHealthColor = (score: number) => {
    if (score >= 85) return "text-emerald-600 dark:text-emerald-400"
    if (score >= 70) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
  }

  const getHealthBadgeVariant = (score: number) => {
    if (score >= 85) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
  }

  const criticalAlerts = alerts.filter((a) => a.severity === "critical" && !a.resolved).length
  const warningAlerts = alerts.filter((a) => a.severity === "warning" && !a.resolved).length

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
        {/* Enhanced Header */}
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    StackPilot
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Enterprise Observability Platform</p>
                </div>
              </div>

              {/* Enhanced Navigation */}
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Live</span>
                </div>

                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-lg text-sm font-medium"
                >
                  <option value="1h">Last Hour</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="gap-2 bg-transparent"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-3">
                <NotificationCenter alerts={alerts} />

                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  Export
                </Button>

                <ThemeToggle />
                <UserProfile />
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          {/* Enhanced Health Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Overall Health Score */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900/50">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
              <CardHeader className="relative pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  Overall Health
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-4xl font-bold ${getHealthColor(healthScores.overall)}`}>
                    {healthScores.overall}
                  </span>
                  <Badge variant={getHealthBadgeVariant(healthScores.overall)} className="text-xs px-3 py-1">
                    {healthScores.overall >= 85 ? "Excellent" : healthScores.overall >= 70 ? "Good" : "Critical"}
                  </Badge>
                </div>
                <Progress value={healthScores.overall} className="mb-3 h-2" />
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>+2.3% from yesterday</span>
                </div>
              </CardContent>
            </Card>

            {/* Frontend Health */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900/50">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"></div>
              <CardHeader className="relative pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-4xl font-bold ${getHealthColor(healthScores.frontend)}`}>
                    {healthScores.frontend}
                  </span>
                  <Badge variant={getHealthBadgeVariant(healthScores.frontend)} className="text-xs px-3 py-1">
                    {healthScores.frontend >= 85 ? "Fast" : healthScores.frontend >= 70 ? "Good" : "Slow"}
                  </Badge>
                </div>
                <Progress value={healthScores.frontend} className="mb-3 h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Load Time</p>
                    <p className="font-semibold">{Math.round(data.frontend.loadTime)}ms</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Lighthouse</p>
                    <p className="font-semibold">{data.frontend.lighthouseScore}/100</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backend Health */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900/50">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10"></div>
              <CardHeader className="relative pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg">
                    <Server className="w-5 h-5 text-white" />
                  </div>
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-4xl font-bold ${getHealthColor(healthScores.backend)}`}>
                    {healthScores.backend}
                  </span>
                  <Badge variant={getHealthBadgeVariant(healthScores.backend)} className="text-xs px-3 py-1">
                    {healthScores.backend >= 85 ? "Optimal" : healthScores.backend >= 70 ? "Stable" : "Issues"}
                  </Badge>
                </div>
                <Progress value={healthScores.backend} className="mb-3 h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Response</p>
                    <p className="font-semibold">{Math.round(data.backend.avgResponseTime)}ms</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Error Rate</p>
                    <p className="font-semibold">{data.backend.errorRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Database Health */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900/50">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
              <CardHeader className="relative pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  Database
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-4xl font-bold ${getHealthColor(healthScores.database)}`}>
                    {healthScores.database}
                  </span>
                  <Badge variant={getHealthBadgeVariant(healthScores.database)} className="text-xs px-3 py-1">
                    {healthScores.database >= 85 ? "Efficient" : healthScores.database >= 70 ? "Good" : "Slow"}
                  </Badge>
                </div>
                <Progress value={healthScores.database} className="mb-3 h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Query Time</p>
                    <p className="font-semibold">{Math.round(data.database.avgQueryTime)}ms</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Cache Hit</p>
                    <p className="font-semibold">{data.database.cacheHitRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-3 sm:grid-cols-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-lg">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger
                  value="performance"
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Performance</span>
                </TabsTrigger>
                <TabsTrigger
                  value="routes"
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  <Code className="w-4 h-4" />
                  <span className="hidden sm:inline">Routes</span>
                </TabsTrigger>
                <TabsTrigger
                  value="ai-insights"
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">AI Insights</span>
                </TabsTrigger>
                <TabsTrigger
                  value="alerts"
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span className="hidden sm:inline">Alerts</span>
                  {criticalAlerts + warningAlerts > 0 && (
                    <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
                      {criticalAlerts + warningAlerts}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="health"
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                >
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Health</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <MetricsDashboard data={data} />
                </div>
                <div className="space-y-6">
                  <AIInsights insights={aiInsights.slice(0, 3)} />
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="w-5 h-5 text-blue-500" />
                        Live Monitoring
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">System Status</span>
                        </div>
                        <Badge variant="default" className="bg-emerald-500">
                          Operational
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">CPU Usage</span>
                        </div>
                        <span className="font-semibold">45%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-medium">Memory</span>
                        </div>
                        <span className="font-semibold">67%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Network className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium">Network I/O</span>
                        </div>
                        <span className="font-semibold">234 MB/s</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <PerformanceCharts data={data} />
            </TabsContent>

            <TabsContent value="routes" className="space-y-6">
              <RouteMonitoring routes={data.routes} />
            </TabsContent>

            <TabsContent value="ai-insights" className="space-y-6">
              <AIInsights insights={aiInsights} detailed />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <AlertCenter alerts={alerts} />
            </TabsContent>

            <TabsContent value="health" className="space-y-6">
              <HealthScores data={data} healthScores={healthScores} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  )
}
