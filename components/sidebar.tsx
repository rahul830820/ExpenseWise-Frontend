export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-6">
      <h1 className="text-2xl font-bold mb-8">
        ExpenseWise
      </h1>

      <nav className="space-y-4">
        <a
          href="/dashboard"
          className="block hover:text-blue-600"
        >
          Dashboard
        </a>

        <a
          href="/expenses"
          className="block hover:text-blue-600"
        >
          Expenses
        </a>

        <a
          href="/incomes"
          className="block hover:text-blue-600"
        >
          Income
        </a>

        <a
          href="/categories"
          className="block hover:text-blue-600"
        >
          Categories
        </a>

        <a
          href="/reports"
          className="block hover:text-blue-600"
        >
          Reports
        </a>
      </nav>
    </aside>
  )
}