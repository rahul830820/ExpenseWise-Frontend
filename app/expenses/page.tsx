"use client"

import { useEffect, useState } from "react"

interface Expense {
  id: number
  amount: number
  description: string
  expense_date: string
  category_id: number
}
interface Category {
  id: number
  name: string
}
export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [expenseDate, setExpenseDate] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null)

  useEffect(() => {
  fetchExpenses()
  fetchCategories()
  }, [])

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem(
        "access_token"
      )

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses`,
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

      setExpenses(data.items)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
  try {
    const token = localStorage.getItem(
      "access_token"
    )

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    setCategories(data.items)
  } catch (error) {
    console.error(error)
  }
}

  if (loading) {
    return (
      <div className="p-8">
        Loading expenses...
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
  const createExpense = async () => {
  try {
    const token = localStorage.getItem(
      "access_token"
    )

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/expenses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          description,
          expense_date: expenseDate,
          category_id: Number(categoryId),
        }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to create expense")
    }

    setAmount("")
    setDescription("")
    setExpenseDate("")
    setCategoryId("")

    fetchExpenses()
  } catch (error) {
    console.error(error)
  }
}
  const updateExpense = async () => {
  try {
    const token = localStorage.getItem(
      "access_token"
    )

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/expenses/${editingExpenseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          description,
          expense_date: expenseDate,
          category_id: Number(categoryId),
        }),
      }
    )

    if (!response.ok) {
      throw new Error(
        "Failed to update expense"
      )
    }

    setEditingExpenseId(null)

    setAmount("")
    setDescription("")
    setExpenseDate("")
    setCategoryId("")

    fetchExpenses()
  } catch (error) {
    console.error(error)
  }
}
  const deleteExpense = async (
  expenseId: number
) => {
  try {
    const token = localStorage.getItem(
      "access_token"
    )

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/expenses/${expenseId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        "Failed to delete expense"
      )
    }

    fetchExpenses()
  } catch (error) {
    console.error(error)
  }
} 
  const handleEdit = (expense: Expense) => {
  setEditingExpenseId(expense.id)

  setAmount(expense.amount.toString())
  setDescription(expense.description)
  setExpenseDate(expense.expense_date)
  setCategoryId(expense.category_id.toString())
}
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Expenses
      </h1>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
  <div className="grid grid-cols-4 gap-4">
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
      placeholder="Description"
      value={description}
      onChange={(e) =>
        setDescription(e.target.value)
      }
    />

    <input
      type="date"
      className="border p-2 rounded"
      value={expenseDate}
      onChange={(e) =>
        setExpenseDate(e.target.value)
      }
    />

    <select
      className="border p-2 rounded"
      value={categoryId}
      onChange={(e) =>
        setCategoryId(e.target.value)
      }
    >
      <option value="">
        Select Category
      </option>

      {categories.map((category) => (
        <option
          key={category.id}
          value={category.id}
        >
          {category.name}
        </option>
  ))}
</select>
  </div>

  <button
    onClick={() => {
      if (editingExpenseId) {
        updateExpense()
      } else {
        createExpense()
      }
    }}
    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
  >
    {editingExpenseId
  ? "Update Expense"
  : "Add Expense"}
  </button>
</div>
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">
              Description
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
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b"
            >
              <td className="p-4">
                {expense.description}
              </td>

              <td className="p-4">
                ₹{expense.amount}
              </td>

              <td className="p-4">
                {expense.expense_date}
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleEdit(expense)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to delete this expense?"
                      )
                    ) {
                      deleteExpense(expense.id)
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