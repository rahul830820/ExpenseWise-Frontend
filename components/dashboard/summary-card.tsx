interface SummaryCardProps {
  title: string
  value: string
  valueColor?: string
}

export default function SummaryCard({
  title,
  value,
  valueColor = "text-black",
}: SummaryCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-sm text-gray-500">
        {title}
      </h2>

      <p className={`text-2xl font-bold ${valueColor}`}>
        {value}
      </p>
    </div>
  )
}