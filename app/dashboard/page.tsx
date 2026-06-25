"use client"
import SummaryCard from "@/components/dashboard/summary-card"
import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"
import RecentExpenses from "@/components/dashboard/recent-expenses"
import {
  getDashboardSummary,
  getRecentExpenses,
  getDashboardCharts,
} from "@/services/dashboard"
import {
  DashboardSummary,
  RecentExpense,
  DashboardCharts,
} from "@/types/dashboard"
import ExpenseTrendChart from "@/components/dashboard/expense-trend-chart"
import CategoryDistributionChart from "@/components/dashboard/category-distribution-chart"

export default function DashboardPage() {
  const [dashboard, setDashboard] =
  useState<DashboardSummary>({
    total_income: 0,
    total_expenses: 0,
    savings: 0,
    savings_rate: 0,
    expense_count: 0,
    category_count: 0,
  })

  const [recentExpenses, setRecentExpenses] =
  useState<RecentExpense[]>([])

  const [charts, setCharts] =
  useState<DashboardCharts>({
  expense_trend: [],
  category_distribution: [],
})

  useEffect(() => {
  fetchDashboardData()
  fetchRecentExpenses()
  fetchDashboardCharts()
}, [])

  const fetchDashboardData = async () => {
  try {
    const data =
      await getDashboardSummary()

    setDashboard(data)
  } catch (error) {
    console.error(error)
  }
}

  const fetchRecentExpenses = async () => {
  try {
    const data =
      await getRecentExpenses()

    setRecentExpenses(data)
  } catch (error) {
    console.error(error)
  }
}

  const fetchDashboardCharts = async () => {
  try {
    const data =
      await getDashboardCharts()

    setCharts(data)

  } catch (error) {
    console.error(error)
  }
}

  return (
  <div className="flex min-h-screen bg-slate-100">
    <Sidebar />

    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        <SummaryCard
          title="Total Balance"
          value={`₹${dashboard.savings.toLocaleString()}`}
        />

        <SummaryCard
          title="Total Income"
          value={`₹${dashboard.total_income.toLocaleString()}`}
          valueColor="text-green-600"
        />

        <SummaryCard
          title="Total Expense"
          value={`₹${dashboard.total_expenses.toLocaleString()}`}
          valueColor="text-red-600"
        />

        <SummaryCard
          title="Savings Rate"
          value={`${dashboard.savings_rate}%`}
          valueColor="text-blue-600"
        />

        <SummaryCard
          title="Total Expenses"
          value={dashboard.expense_count.toString()}
        />

        <SummaryCard
          title="Categories"
          value={dashboard.category_count.toString()}
        />

      </div>

      {/* Recent Expenses */}
      <div className="mt-8">
        <RecentExpenses
          expenses={recentExpenses}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        <ExpenseTrendChart
          data={charts.expense_trend}
        />

        <CategoryDistributionChart
          data={charts.category_distribution}
        />

      </div>

    </main>
  </div>
  )
}