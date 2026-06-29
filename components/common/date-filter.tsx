"use client"

import { DashboardPeriod } from "@/types/dashboard"

interface DateFilterProps {
  value: DashboardPeriod
  onChange: (value: DashboardPeriod) => void
}

const periodOptions = [
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "last_month",
    label: "Last Month",
  },
  {
    value: "last_3_months",
    label: "Last 3 Months",
  },
  {
    value: "last_6_months",
    label: "Last 6 Months",
  },
  {
    value: "year",
    label: "This Year",
  },
  {
    value: "all",
    label: "All Time",
  },
]

export default function DateFilter({
  value,
  onChange,
}: DateFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value as DashboardPeriod
        )
      }
      className="border rounded-lg px-3 py-2 bg-white shadow-sm"
    >
      {periodOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}