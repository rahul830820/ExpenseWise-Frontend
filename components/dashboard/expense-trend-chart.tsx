"use client"

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

import {
  ExpenseTrend,
} from "@/types/dashboard"

interface ExpenseTrendChartProps {
  data: ExpenseTrend[]
}

export default function ExpenseTrendChart({
  data,
}: ExpenseTrendChartProps) {

  return (
    <div className="bg-white p-6 rounded-lg shadow">

      <h2 className="text-xl font-semibold mb-4">
        Monthly Expense Trend
      </h2>

      <div className="h-96">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="total"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}