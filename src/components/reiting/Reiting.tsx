type ReitingProps = {
  value: number
}

const getBadgeColor = (rating: number) => {
  if (rating >= 7.5) return "#22c55e"
  if (rating >= 6) return "#f59e0b"
  return "#ef4444"
}

export const Reiting = ({ value }: ReitingProps) => {
  const formattedRating = Number(value.toFixed(1))

  return (
    <div
      style={{
        minWidth: 42,
        textAlign: "center",
        padding: "4px 8px",
        borderRadius: 999,
        background: getBadgeColor(formattedRating),
        color: "#101010",
        fontWeight: 700,
        fontSize: 12
      }}
    >
      {formattedRating}
    </div>
  )
}