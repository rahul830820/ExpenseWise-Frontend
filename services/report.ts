import { DashboardPeriod } from "@/types/dashboard"

export async function getMonthlyReport(
  period: DashboardPeriod
) {
  const token =
    localStorage.getItem("access_token")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reports/monthly?period=${period}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      "Failed to fetch monthly report"
    )
  }

  return await response.json()
}

export async function getCategoryWiseReport(
  period: DashboardPeriod
) {
  const token =
    localStorage.getItem("access_token")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reports/category-wise?period=${period}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      "Failed to fetch category report"
    )
  }

  return await response.json()
}

export async function getTopCategories(
  period: DashboardPeriod
) {
  const token =
    localStorage.getItem("access_token")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reports/top-categories?period=${period}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      "Failed to fetch top categories"
    )
  }

  return await response.json()
}