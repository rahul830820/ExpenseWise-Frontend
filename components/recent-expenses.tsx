import { RecentExpense } from "@/types/dashboard"

interface RecentExpensesProps {
  expenses: RecentExpense[]
}
export default function RecentExpenses({
  expenses,
}: RecentExpensesProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        Recent Expenses
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">
              Description
            </th>

            <th className="text-left p-2">
              Amount
            </th>

            <th className="text-left p-2">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b"
            >
              <td className="p-2">
                {expense.description}
              </td>

              <td className="p-2">
                ₹{expense.amount.toLocaleString()}
              </td>

              <td className="p-2">
                {expense.expense_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}