'use client'
import React, { useEffect, useRef, useState, memo } from 'react'
import { motion } from 'motion/react'
import { twMerge } from 'tailwind-merge'
import { cn } from '@/lib/utils'

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string
  revealText: string
  children?: React.ReactNode
  className?: string
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0)
  const cardRef = useRef<HTMLDivElement | any>(null)
  const [left, setLeft] = useState(0)
  const [localWidth, setLocalWidth] = useState(0)
  const [isMouseOver, setIsMouseOver] = useState(false)

  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } =
        cardRef.current.getBoundingClientRect()
      setLeft(left)
      setLocalWidth(localWidth)
    }
  }, [])

  function mouseMoveHandler(event: any) {
    event.preventDefault()

    const { clientX } = event
    if (cardRef.current) {
      const relativeX = clientX - left
      setWidthPercentage((relativeX / localWidth) * 100)
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false)
    setWidthPercentage(0)
  }
  function mouseEnterHandler() {
    setIsMouseOver(true)
  }
  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault()
    const clientX = event.touches[0]!.clientX
    if (cardRef.current) {
      const relativeX = clientX - left
      setWidthPercentage((relativeX / localWidth) * 100)
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1
  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        'bg-transparent border-none w-[40rem] relative overflow-hidden',
        className
      )}>
      {children}

      <div className="h-40 relative flex items-center overflow-hidden justify-center">
        <motion.div
          style={{
            width: '100%',
          }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute bg-transparent z-20 will-change-transform text-center w-full">
          <p
            style={{
              textShadow: '4px 4px 15px rgba(0,0,0,0.5)',
            }}
            className="text-base sm:text-[3rem] py-10 font-bold text-white">
            {revealText}
          </p>
        </motion.div>
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-40 w-[8px] bg-gradient-to-b from-transparent via-white/20 to-transparent absolute z-50 will-change-transform"></motion.div>

        <div className="overflow-hidden text-center w-full">
          <motion.p
            animate={{
              opacity: 1,
              clipPath: `inset(0 0 0 ${widthPercentage}%)`,
            }}
            transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
            className="text-base sm:text-[3rem] py-10 font-bold text-white/40">
            {text}
          </motion.p>
        </div>
      </div>
    </div>
  )
}

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h2 className={twMerge('text-white text-lg mb-2', className)}>
      {children}
    </h2>
  )
}

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <p className={twMerge('text-[#a9a9a9] text-sm', className)}>{children}</p>
  )
}
