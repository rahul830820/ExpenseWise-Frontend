export interface DashboardSummary {
  total_income: number
  total_expenses: number
  savings: number
  savings_rate: number
  expense_count: number
  category_count: number
}

export interface RecentExpense {
  id: number
  description: string
  amount: number
  expense_date: string
}