"use client"

import { useEffect, useState } from "react"

interface Income {
  id: number
  amount: number
  source: string
  income_date: string

}

export default function IncomesPage() {
  const [incomes, setIncomes] = useState<Income[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [amount, setAmount] = useState("")
  const [source, setSource] = useState("")
  const [incomeDate, setIncomeDate] = useState("")
  const [editingIncomeId, setEditingIncomeId] = useState<number | null>(null)

  useEffect(() => {
  fetchIncomes()
}, [])

  const fetchIncomes = async () => {
    try {
      const token = localStorage.getItem(
        "access_token"
      )

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/incomes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to load expenses"
        )
      }

      setIncomes(data.items)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        Loading incomes...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        {error}
      </div>
    )
  }
  const createIncome = async () => {
  try {
    const token = localStorage.getItem(
      "access_token"
    )

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/incomes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          source: source,
          income_date: incomeDate,
        }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to create income")
    }

    setAmount("")
    setSource("")
    setIncomeDate("")

    fetchIncomes()
  } catch (error) {
    console.error(error)
  }
}
  const updateIncome = async () => {
  try {
    const token = localStorage.getItem(
      "access_token"
    )

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/incomes/${editingIncomeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          source: source,
          income_date: incomeDate,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(
        "Failed to update income"
      )
    }

    setEditingIncomeId(null)

    setAmount("")
    setSource("")
    setIncomeDate("")

    fetchIncomes()
  } catch (error) {
    console.error(error)
  }
}
  const deleteIncome = async (
  incomeId: number
) => {
  try {
    const token = localStorage.getItem(
      "access_token"
    )

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/incomes/${incomeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        "Failed to delete income"
      )
    }

    fetchIncomes()
  } catch (error) {
    console.error(error)
  }
} 
  const handleEdit = (income: Income) => {
  setEditingIncomeId(income.id)

  setAmount(income.amount.toString())
  setSource(income.source)
  setIncomeDate(income.income_date)

}
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Incomes
      </h1>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
  <div className="grid grid-cols-3 gap-4">
    <input
      className="border p-2 rounded"
      placeholder="Amount"
      value={amount}
      onChange={(e) =>
        setAmount(e.target.value)
      }
    />

    <input
      className="border p-2 rounded"
      placeholder="Source"
      value={source}
      onChange={(e) =>
        setSource(e.target.value)
      }
    />

    <input
      type="date"
      className="border p-2 rounded"
      value={incomeDate}
      onChange={(e) =>
        setIncomeDate(e.target.value)
      }
    />
  </div>

  <button
    onClick={() => {
      if (editingIncomeId) {
        updateIncome()
      } else {
        createIncome()
      }
    }}
    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
  >
    {editingIncomeId
  ? "Update Income"
  : "Add Income"}
  </button>
</div>
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">
              Source
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Date
            </th>
            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {incomes.map((income) => (
            <tr
              key={income.id}
              className="border-b"
            >
              <td className="p-4">
                {income.source}
              </td>

              <td className="p-4">
                ₹{income.amount.toLocaleString()}
              </td>

              <td className="p-4">
                {income.income_date}
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleEdit(income)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to delete this income?"
                      )
                    ) {
                      deleteIncome(income.id)
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}