import { DashboardPeriod } from "@/types/dashboard"
export async function getDashboardSummary(
  period: DashboardPeriod
) {
  const token =
    localStorage.getItem("access_token")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/summary?period=${period}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      "Failed to fetch dashboard summary"
    )
  }

  return await response.json()
}

export async function getRecentExpenses() {
  const token =
    localStorage.getItem("access_token")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/recent-expenses`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      "Failed to fetch recent expenses"
    )
  }

  return await response.json()
}

export async function getDashboardCharts(
  period: DashboardPeriod
) {
  const token =
    localStorage.getItem("access_token")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/charts?period=${period}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      "Failed to fetch dashboard charts"
    )
  }

  return await response.json()
}