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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
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
      videoFile: 'BlackHoleExplainer.mp4',
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
      videoFile: 'WaterIonizationEquilibrium.mp4',
    },
    {
      title: 'Complex Systems',
      description:
        'Visualize emergent behaviors, chaos theory, and network dynamics through interactive system modeling.',
      link: '/subjects/complex-systems',
      videoFile: 'AntColonyOptimization.mp4',
    },
  ]

  React.useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.playbackRate = 2
      }
    })
  }, [])

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
          <div className="w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="text-5xl font-bold text-center text-white relative z-20">
              More Examples
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
          <WobbleCard containerClassName="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col cursor-pointer" onClick={() => setSelectedSubject({
                title: 'Water Ionization Equilibrium',
                description: 'Watch molecular transformations and electron transfers in real-time 3D simulations.',
                link: '/subjects/chemistry',
                videoFile: 'WaterIonizationEquilibrium.mp4'
              })}>
                <h3 className="text-white text-sm font-medium mb-2 text-center">Water Ionization Equilibrium</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[0] = el
                    }}
                    src="/videos/WaterIonizationEquilibrium.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
              <div className="flex flex-col cursor-pointer" onClick={() => setSelectedSubject({
                title: 'Electromagnetic Fields Theory',
                description: 'Understand electromagnetic interactions and field lines through dynamic visualizations.',
                link: '/subjects/em-fields',
                videoFile: 'ElectromagneticScene.mp4'
              })}>
                <h3 className="text-white text-sm font-medium mb-2 text-center">Electromagnetic Fields Theory</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[1] = el
                    }}
                    src="/videos/ElectromagneticScene.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
              <div className="flex flex-col cursor-pointer" onClick={() => setSelectedSubject({
                title: 'Quantum Phenomena',
                description: 'Visualize complex quantum phenomena like wave-particle duality and quantum entanglement.',
                link: '/subjects/quantum',
                videoFile: 'QuantumPhenomenaScene.mp4'
              })}>
                <h3 className="text-white text-sm font-medium mb-2 text-center">Quantum Phenomena</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[2] = el
                    }}
                    src="/videos/QuantumPhenomenaScene.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
              <div className="flex flex-col cursor-pointer" onClick={() => setSelectedSubject({
                title: 'Structure of DNA and RNA',
                description: 'Experience cellular processes and DNA replication through interactive molecular visualizations.',
                link: '/subjects/molecular',
                videoFile: 'MolecularBiologyScene.mp4'
              })}>
                <h3 className="text-white text-sm font-medium mb-2 text-center">Structure of DNA and RNA</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[3] = el
                    }}
                    src="/videos/MolecularBiologyScene.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
              <div className="flex flex-col cursor-pointer" onClick={() => setSelectedSubject({
                title: 'Black Hole Theory',
                description: 'Explore cosmic phenomena like black holes and gravitational waves with immersive space visualizations.',
                link: '/subjects/astro',
                videoFile: 'BlackHoleExplainer.mp4'
              })}>
                <h3 className="text-white text-sm font-medium mb-2 text-center">Black Hole Theory</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[4] = el
                    }}
                    src="/videos/BlackHoleExplainer.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
              <div className="flex flex-col cursor-pointer" onClick={() => setSelectedSubject({
                title: 'Ant Colony Optimization',
                description: 'Visualize emergent behaviors and network dynamics through interactive system modeling.',
                link: '/subjects/complex-systems',
                videoFile: 'AntColonyOptimization.mp4'
              })}>
                <h3 className="text-white text-sm font-medium mb-2 text-center">Ant Colony Optimization</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[5] = el
                    }}
                    src="/videos/AntColonyOptimization.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
              <div className="flex flex-col cursor-pointer" onClick={() => setSelectedSubject({
                title: 'Database B+ Tree',
                description: 'Visualize database indexing structures and operations in real-time.',
                link: '/subjects/database',
                videoFile: 'Database.mp4'
              })}>
                <h3 className="text-white text-sm font-medium mb-2 text-center">Database B+ Tree</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[6] = el
                    }}
                    src="/videos/Database.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
              <div className="flex flex-col cursor-pointer" onClick={() => setSelectedSubject({
                title: 'Function Visualization',
                description: 'Explore mathematical functions and their properties through dynamic visualizations.',
                link: '/subjects/math',
                videoFile: 'Math.mp4'
              })}>
                <h3 className="text-white text-sm font-medium mb-2 text-center">Function Visualization</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[7] = el
                    }}
                    src="/videos/Math.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
            </div>
          </WobbleCard>
        </div>

        {/* <div className="mt-32">
          <ExpandableCardDemo />
        </div> */}

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
