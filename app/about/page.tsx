'use client'
import { WobbleCard } from '@/components/ui/wobble-card'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import { useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import React, { useRef } from 'react'
import { WavyBackground } from '@/components/ui/wavy-background'
import { GlowingButton } from '@/components/ui/glowing-button'
import { TextRevealCard } from '@/components/ui/text-reveal-card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ExpandableCardDemo from '@/components/expandable-card-demo-grid'
import { Link } from 'lucide-react'
import { MacbookScroll } from '@/components/ui/macbook-scroll'
type Subject = {
  title: string
  description: string
  link: string
  videoFile: string
}

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

  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(
    null
  )

  const subjects: Subject[] = [
    {
      title: 'Quantum Mechanics',
      description:
        'Visualize complex quantum phenomena like wave-particle duality, quantum entanglement, and superposition through dynamic 3D animations.',
      link: '/subjects/quantum',
      videoFile: 'QuantumPhenomenaScene.mp4',
    },
    {
      title: 'Molecular Biology',
      description:
        'Experience cellular processes, DNA replication, and protein synthesis through interactive molecular visualizations.',
      link: '/subjects/molecular',
      videoFile: 'MolecularBiologyScene.mp4',
    },
    {
      title: 'Astrophysics',
      description:
        'Explore cosmic phenomena like black holes, gravitational waves, and stellar evolution with immersive space visualizations.',
      link: '/subjects/astro',
      videoFile: 'AstrophysicsScene.mp4',
    },
    {
      title: 'Electromagnetic Fields',
      description:
        'Understand electromagnetic interactions, field lines, and wave propagation through dynamic field visualizations.',
      link: '/subjects/em-fields',
      videoFile: 'ElectromagneticScene.mp4',
    },
    {
      title: 'Chemical Reactions',
      description:
        'Watch molecular transformations, electron transfers, and reaction mechanisms unfold in real-time 3D simulations.',
      link: '/subjects/chemistry',
      videoFile: 'ChemicalReactionsScene.mp4',
    },
    {
      title: 'Complex Systems',
      description:
        'Visualize emergent behaviors, chaos theory, and network dynamics through interactive system modeling.',
      link: '/subjects/complex-systems',
      videoFile: 'ComplexSystemsScene.mp4',
    },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 bg-black">
      <Dialog
        open={!!selectedSubject}
        onOpenChange={(open) => !open && setSelectedSubject(null)}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedSubject?.title} Visualization</DialogTitle>
          </DialogHeader>
          <div className="aspect-video relative">
            {selectedSubject && (
              <video
                key={selectedSubject.videoFile}
                src={`/videos/${selectedSubject.videoFile}`}
                className="w-full h-full rounded-lg"
                controls
                autoPlay
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

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
                revealText="Sometimes you just neet to see it"
                text="SciViz AI"
                className="w-full bg-transparent border-none shadow-none"></TextRevealCard>
            </div>
            <p className="text-lg md:text-xl text-neutral-200 mb-16">
              Transform complex scientific concepts into stunning visual
              experiences powered by AI
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
                  window.location.href = '/playground'
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
                Advanced AI Visualization Engine
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                Our state-of-the-art AI transforms complex scientific concepts
                into intuitive visual narratives, making abstract theories
                tangible and understandable.
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
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Real-time Interactive Learning
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Engage with scientific concepts through interactive visualizations
              that respond to your queries in real-time.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Experience the Future of Scientific Understanding
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                Join thousands of students and educators who are revolutionizing
                their understanding of science through our AI-powered
                visualizations.
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
              Explore Scientific Domains
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
          <HoverEffect
            items={subjects.map((subject) => ({
              ...subject,
              onClick: () => setSelectedSubject(subject),
            }))}
            className="mt-0"
          />
        </div>

        <div className="mt-32">
          <ExpandableCardDemo />
        </div>

        <MacbookScroll
          title={
            <span>
              This Macbook is built with Tailwindcss. <br /> No kidding.
            </span>
          }
          src={`/images/demo.png`}
          showGradient={false}
        />
      </div>
    </div>
  )
}
