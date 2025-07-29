"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface MetricsChartProps {
  data: Array<{
    cpu: number
    memory: number
    network: number
    storage: number
    timestamp: Date
  }>
  detailed?: boolean
}

export function MetricsChart({ data, detailed = false }: MetricsChartProps) {
  const chartData = data.slice(-20).map((item) => ({
    time: item.timestamp.toLocaleTimeString(),
    CPU: item.cpu,
    Memory: item.memory,
    Network: item.network,
    Storage: item.storage,
  }))

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="CPU" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Memory" stroke="#ef4444" strokeWidth={2} dot={false} />
          {detailed && (
            <>
              <Line type="monotone" dataKey="Network" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Storage" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
