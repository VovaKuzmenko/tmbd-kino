type PictureProps = {
  src: string
  alt: string
}

export const Picture = ({ src, alt }: PictureProps) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: 320,
        objectFit: "cover",
        display: "block"
      }}
    />
  )
}