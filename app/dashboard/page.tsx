import Sidebar from "@/components/sidebar"

export default function DashboardPage() {
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
              ₹1,25,000
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">
              Total Income
            </h2>

            <p className="text-2xl font-bold text-green-600">
              ₹80,000
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">
              Total Expense
            </h2>

            <p className="text-2xl font-bold text-red-600">
              ₹35,000
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}