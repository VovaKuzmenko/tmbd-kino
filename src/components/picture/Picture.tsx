
import { useState, useEffect } from 'react'



type PictureProps = {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_FALLBACK_SRC = '/no-poster.svg'

export const Picture = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_SRC, // +
  className, // +
  style, // +
}: PictureProps) => {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc) // +

  useEffect(() => { // +
    setCurrentSrc(src || fallbackSrc) // +
  }, [src, fallbackSrc]) // +

  return (
    <img
      src={currentSrc} // +
      alt={alt}
      className={className} // +
      onError={() => { // +
        if (currentSrc !== fallbackSrc) { // +
          setCurrentSrc(fallbackSrc) // +
        } // +
      }} // +
      style={{ // +
        width: "100%",
        height: 320,
        objectFit: "cover",
        display: "block",
        ...style, // +
      }} // +
    />
  )
}