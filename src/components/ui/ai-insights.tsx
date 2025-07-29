"use client"

import { AlertTriangle, Brain, CheckCircle, Code, Database, Globe, Lightbulb, TrendingUp } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

interface AIInsightsProps {
  insights: Array<{
    id: string
    title: string
    description: string
    category: "frontend" | "backend" | "database" | "security"
    priority: "high" | "medium" | "low"
    impact: string
    recommendation: string
    confidence: number
  }>
  detailed?: boolean
}

export function AIInsights({ insights, detailed = false }: AIInsightsProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <Globe className="w-4 h-4" />
      case "backend":
        return <Code className="w-4 h-4" />
      case "database":
        return <Database className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
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

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          AI-Powered Insights
        </CardTitle>
        <CardDescription>Smart recommendations to optimize your application</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.length > 0 ? (
            insights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 border rounded-lg bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(insight.category)}`}>
                      {getCategoryIcon(insight.category)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{insight.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{insight.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(insight.priority) as any}>{insight.priority} priority</Badge>
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">AI Recommendation</p>
                      <p className="text-sm text-blue-800 dark:text-blue-200">{insight.recommendation}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>Expected impact: {insight.impact}</span>
                  </div>
                  {detailed && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                      <Button size="sm">Apply Fix</Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <p>No optimization suggestions at this time</p>
              <p className="text-sm">Your application is performing well!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
