import { type CSSProperties, type ReactNode, useMemo, useState } from 'react'

export const useCarousel = (items: ReactNode[], defaultIndex = 0) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)

  const onClickRight = () => {
    if (currentIndex === items.length - 1) {
      return
    }

    setCurrentIndex(prev => prev + 1)
  }

  const onClickLeft = () => {
    if (currentIndex === 0) {
      return
    }

    setCurrentIndex(prev => prev - 1)
  }

  const style: CSSProperties = useMemo(() => {
    return {
      display: 'flex',
      flexShrink: 0,
      transition: '0.5s ease-in-out',
      transform: `translateX(${(currentIndex * -100) / items.length}%)`,
    }
  }, [currentIndex, items.length])

  return {
    currentIndex,
    onClickLeft,
    onClickRight,
    style,
  }
}
