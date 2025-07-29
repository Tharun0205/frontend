"use client"

import { DollarSign, Lightbulb, TrendingUp, Zap } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

interface AIRecommendationsProps {
  recommendations: Array<{
    id: string
    title: string
    description: string
    impact: "high" | "medium" | "low"
    category: "performance" | "cost" | "security" | "reliability"
    savings?: string
  }>
  detailed?: boolean
}

export function AIRecommendations({ recommendations, detailed = false }: AIRecommendationsProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "performance":
        return <Zap className="w-4 h-4" />
      case "cost":
        return <DollarSign className="w-4 h-4" />
      case "security":
        return <Lightbulb className="w-4 h-4" />
      default:
        return <TrendingUp className="w-4 h-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          AI Recommendations
        </CardTitle>
        <CardDescription>Smart suggestions to optimize your infrastructure</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.length > 0 ? (
            recommendations.map((rec) => (
              <div key={rec.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(rec.category)}
                    <h4 className="font-medium">{rec.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getImpactColor(rec.impact) as any}>{rec.impact} impact</Badge>
                    {rec.savings && (
                      <Badge variant="outline" className="text-green-600">
                        Save {rec.savings}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                {detailed && (
                  <div className="flex gap-2">
                    <Button size="sm">Apply</Button>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <Lightbulb className="w-8 h-8 mx-auto mb-2" />
              <p>No recommendations at this time</p>
              <p className="text-sm">Your infrastructure is well optimized</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
