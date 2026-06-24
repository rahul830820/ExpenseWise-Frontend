"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"

export default function DashboardPage() {

  const [totalIncome, setTotalIncome] =
    useState(0)

  const [totalExpense, setTotalExpense] =
    useState(0)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
  try {
    const token =
      localStorage.getItem("access_token")

    const incomeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/incomes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const expenseResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/expenses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const incomeData =
      await incomeResponse.json()

    const expenseData =
      await expenseResponse.json()

    const incomeTotal =
      incomeData.items.reduce(
        (sum: number, income: any) =>
          sum + income.amount,
        0
      )

    const expenseTotal =
      expenseData.items.reduce(
        (sum: number, expense: any) =>
          sum + expense.amount,
        0
      )

    setTotalIncome(incomeTotal)
    setTotalExpense(expenseTotal)

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

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">
              Total Balance
            </h2>

            <p className="text-2xl font-bold">
              ₹{(totalIncome - totalExpense).toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">
              Total Income
            </h2>

            <p className="text-2xl font-bold text-green-600">
              ₹{totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">
              Total Expense
            </h2>

            <p className="text-2xl font-bold text-red-600">
              ₹{totalExpense.toLocaleString()}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}