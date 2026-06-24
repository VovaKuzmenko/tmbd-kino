type LikeProps = {
  active?: boolean
}

export const Like = ({ active = false }: LikeProps) => {
  return (
    <button
      type="button"
      aria-label="Add to favorites"
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        background: active ? "#ef4444" : "rgba(0,0,0,0.6)",
        color: "#ffffff",
        fontSize: 16,
        lineHeight: 1
      }}
    >
      ♥
    </button>
  )
}