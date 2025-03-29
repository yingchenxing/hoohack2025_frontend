'use client'

interface GlowingButtonProps {
  children: string
  className?: string
  glowColor?: string
  bottomGlowColor?: string
  onClick?: () => void
}

export const GlowingButton = ({
  children,
  className,
  glowColor = 'rgba(56,189,248,0.6)', // 默认蓝色光晕
  bottomGlowColor = 'emerald-400', // 默认绿色底部光晕
  onClick,
}: GlowingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-slate-800 
        no-underline 
        group 
        cursor-pointer 
        relative 
        shadow-2xl 
        shadow-zinc-900 
        rounded-full 
        p-px 
        text-xs 
        font-semibold 
        leading-6 
        text-white 
        inline-block
        ${className}
      `}>
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(75% 100% at 50% 0%, ${glowColor} 0%, rgba(56,189,248,0) 75%)`,
          }}
        />
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
        <span>{children}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10.75 8.75L14.25 12L10.75 15.25"
          />
        </svg>
      </div>
      <span
        className={`
          absolute 
          -bottom-0 
          left-[1.125rem] 
          h-px 
          w-[calc(100%-2.25rem)] 
          bg-gradient-to-r 
          from-${bottomGlowColor}/0 
          via-${bottomGlowColor}/90 
          to-${bottomGlowColor}/0 
          transition-opacity 
          duration-500 
          group-hover:opacity-40
        `}
      />
    </button>
  )
}
