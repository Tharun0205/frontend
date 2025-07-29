"use client"

import { AlertCircle, CheckCircle } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export function CloudProviderStatus() {
  const providers = [
    {
      name: "AWS",
      status: "healthy",
      region: "us-east-1",
      instances: 12,
      cost: "$1,234",
    },
    {
      name: "Azure",
      status: "warning",
      region: "eastus",
      instances: 8,
      cost: "$892",
    },
    {
      name: "GCP",
      status: "healthy",
      region: "us-central1",
      instances: 5,
      cost: "$567",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cloud Providers</CardTitle>
        <CardDescription>Status across all connected cloud accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {providers.map((provider) => (
            <div key={provider.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold">{provider.name[0]}</span>
                </div>
                <div>
                  <p className="font-medium">{provider.name}</p>
                  <p className="text-sm text-muted-foreground">{provider.region}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  {provider.status === "healthy" ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  )}
                  <Badge variant={provider.status === "healthy" ? "default" : "secondary"}>{provider.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {provider.instances} instances • {provider.cost}/mo
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
