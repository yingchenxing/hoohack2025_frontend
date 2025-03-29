'use client'
import { WobbleCard } from '@/components/ui/wobble-card'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import { GoogleGeminiEffect } from '@/components/ui/google-gemini-effect'
import { useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import React, { useRef } from 'react'
import { WavyBackground } from '@/components/ui/wavy-background'
import { GlowingButton } from '@/components/ui/glowing-button'
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from '@/components/ui/text-reveal-card'
export default function AboutPage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const pathLengthFirst = useTransform(scrollYProgress, [0.1, 0.4], [0.2, 1.2])
  const pathLengthSecond = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    [0.15, 1.2]
  )
  const pathLengthThird = useTransform(scrollYProgress, [0.1, 0.4], [0.1, 1.2])
  const pathLengthFourth = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    [0.05, 1.2]
  )
  const pathLengthFifth = useTransform(scrollYProgress, [0.1, 0.4], [0, 1.2])

  const subjects = [
    {
      title: 'Mathematics',
      description:
        "Includes core courses like Advanced Mathematics, Linear Algebra, and Probability & Statistics, developing students' logical thinking and problem-solving abilities.",
      link: '/subjects/math',
    },
    {
      title: 'Physics',
      description:
        'Covers mechanics, electromagnetism, thermodynamics, and optics through experimental and theoretical learning to understand natural laws.',
      link: '/subjects/physics',
    },
    {
      title: 'Chemistry',
      description:
        'Study of organic chemistry, inorganic chemistry, and physical chemistry to understand material structures and transformation principles.',
      link: '/subjects/chemistry',
    },
    {
      title: 'Biology',
      description:
        'Explores life science fundamentals, including molecular biology, cell biology, and genetics.',
      link: '/subjects/biology',
    },
    {
      title: 'Computer Science',
      description:
        'Learn programming, algorithms, data structures, artificial intelligence, and modern computing technologies.',
      link: '/subjects/cs',
    },
    {
      title: 'Engineering',
      description:
        'Fundamental and applied knowledge in mechanical, electrical, civil, and other engineering disciplines.',
      link: '/subjects/engineering',
    },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 bg-black">
      <div className="max-w-5xl mx-auto w-full">
        <WavyBackground
          className="max-w-4xl"
          containerClassName="h-[90vh] mb-16"
          colors={[
            '#0ea5e9', // lighter blue
            '#2563eb', // medium blue
            '#4f46e5', // indigo
            '#3b82f6', // bright blue
            '#06b6d4', // cyan
          ]}
          blur={10}
          speed="fast"
          waveWidth={50}
          backgroundFill="black"
          waveOpacity={0.5}>
          <div className="text-center">
            <div className="mb-8">
              <TextRevealCard
                text="Sometimes you just need to see it"
                revealText="Name"
                className="w-full bg-transparent border-none shadow-none"></TextRevealCard>
            </div>
            <p className="text-lg md:text-xl text-neutral-200 mb-16">
              Empowering the next generation with cutting-edge AI and technology
              education
            </p>
            <div className="flex items-center justify-center space-x-4">
              <GlowingButton
                className="cursor-pointer"
                onClick={() => {
                  // 平滑滚动到下一部分
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth',
                  })
                }}>
                Learn More
              </GlowingButton>
              <GlowingButton
                className="cursor-pointer"
                glowColor="rgba(168, 85, 247, 0.6)" // 紫色光晕
                onClick={() => {
                  window.location.href = '/app'
                }}>
                Try it Now
              </GlowingButton>
            </div>
          </div>
        </WavyBackground>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mt-8">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
            className="">
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Gippity AI powers the entire universe
              </h2>
              <p className="mt-4 text-left  text-base/6 text-neutral-200">
                With over 100,000 mothly active bot users, Gippity AI is the
                most popular AI platform for developers.
              </p>
            </div>
            <Image
              src="/linear.webp"
              width={500}
              height={500}
              alt="linear demo image"
              className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px]">
            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              No shirt, no shoes, no weapons.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              If someone yells "stop!", goes limp, or taps out, the fight is
              over.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Signup for blazing-fast cutting-edge state of the art Gippity AI
                wrapper today!
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                With over 100,000 mothly active bot users, Gippity AI is the
                most popular AI platform for developers.
              </p>
            </div>
            <Image
              src="/linear.webp"
              width={500}
              height={500}
              alt="linear demo image"
              className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </div>

        <div className="mt-32">
          <div className="w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="text-5xl font-bold text-center text-white relative z-20">
              Explore various subjects
            </h1>
            <div className="w-[60rem] h-20 relative">
              {/* Gradients */}
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </div>
          <HoverEffect items={subjects} className="mt-0" />
        </div>
      </div>
    </div>
  )
}
