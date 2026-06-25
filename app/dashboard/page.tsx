"use client"
import SummaryCard from "@/components/summary-card"
import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"
import RecentExpenses from "@/components/recent-expenses"
import {
  getDashboardSummary,
  getRecentExpenses,
} from "@/services/dashboard"
import {
  DashboardSummary,
  RecentExpense,
} from "@/types/dashboard"

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

  useEffect(() => {
  fetchDashboardData()
  fetchRecentExpenses()
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

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        {/* First Row */}
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
          <div className="mt-8">
          <RecentExpenses
            expenses={recentExpenses}
          />
        </div>
                </div>
     </main>
  </div>
  )
}