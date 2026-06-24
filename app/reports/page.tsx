"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useEffect, useState } from "react"
interface CategoryWiseReport {
  category: string
  total: number
}

interface MonthlyReport {
  month: string
  total: number
}

interface TopCategoryReport {
  category: string
  total: number
}

export default function ReportsPage() {
  const [categoryWise, setCategoryWise] =
  useState<CategoryWiseReport[]>([])

  const [monthlyReport, setMonthlyReport] =
    useState<MonthlyReport[]>([])

  const [topCategories, setTopCategories] =
    useState<TopCategoryReport[]>([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  useEffect(() => {
  fetchReports()
}, [])

  const fetchReports = async () => {
  try {
    const token =
      localStorage.getItem("access_token")

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const [
      categoryResponse,
      monthlyResponse,
      topResponse,
    ] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reports/category-wise`,
        { headers }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reports/monthly`,
        { headers }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reports/top-categories`,
        { headers }
      ),
    ])

    const categoryData =
      await categoryResponse.json()

    const monthlyData =
      await monthlyResponse.json()

    const topData =
      await topResponse.json()

    setCategoryWise(categoryData)
    setMonthlyReport(monthlyData)
    setTopCategories(topData)

  } catch (err: any) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
  if (loading) {
  return <div className="p-8">Loading...</div>
}

if (error) {
  return (
    <div className="p-8 text-red-500">
      {error}
    </div>
  )
}
  console.log("Category Wise", categoryWise)
  console.log("Monthly Report", monthlyReport)
  console.log("Top Categories", topCategories)
  const COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
]
  return (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-6">
      Reports
    </h1>

    {/* Expense Distribution */}
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Expense Distribution
      </h2>

      <div className="h-96">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={categoryWise}
              dataKey="total"
              nameKey="category"
              outerRadius={140}
              label
            >
              {categoryWise.map(
                (_, index) => (
                  <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
                )
              )}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Top Categories */}
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Top Categories
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">
              Rank
            </th>

            <th className="p-2 text-left">
              Category
            </th>

            <th className="p-2 text-left">
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {topCategories.map(
            (item, index) => (
              <tr key={item.category}>
                <td className="p-2">
                  {index + 1}
                </td>

                <td className="p-2">
                  {item.category}
                </td>

                <td className="p-2">
                  ₹{item.total.toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>

    {/* Category Wise */}
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Category Wise Report
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">
              Category
            </th>

            <th className="p-2 text-left">
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {categoryWise.map((item) => (
            <tr key={item.category}>
              <td className="p-2">
                {item.category}
              </td>

              <td className="p-2">
                ₹{item.total.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Monthly Report */}
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        Monthly Report
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">
              Month
            </th>

            <th className="p-2 text-left">
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {monthlyReport.map((item) => (
            <tr key={item.month}>
              <td className="p-2">
                {item.month}
              </td>

              <td className="p-2">
                ₹{item.total.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)
}