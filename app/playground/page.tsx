'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useState, useCallback, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/code-block'
import ReactMarkdown from 'react-markdown'

interface ProgressStep {
  id: string
  title: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  description?: string
  code?: string
  estimatedTime?: string
  elapsedTime?: string
  streamingContent?: string
}

interface ScriptItem {
  id: string
  timing: string
  animation_description: string
  narration: string
}

const ProgressStep = ({ step }: { step: ProgressStep }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [elapsedTime, setElapsedTime] = useState<string>('')
  const [startTime, setStartTime] = useState<number | null>(null)

  useEffect(() => {
    if (step.status === 'processing' && !startTime) {
      setStartTime(Date.now())
    }
  }, [step.status, startTime])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (step.status === 'processing' && startTime) {
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const seconds = Math.floor(elapsed / 1000)
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        setElapsedTime(`${minutes}min ${remainingSeconds}s`)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [step.status, startTime])

  return (
    <div className="rounded-lg border bg-card">
      <div
        className={cn(
          'flex items-center gap-4 p-4 cursor-pointer',
          (step.status === 'completed' || step.streamingContent) &&
            'hover:bg-accent/50'
        )}
        onClick={() =>
          (step.status === 'completed' || step.streamingContent) &&
          setIsExpanded(!isExpanded)
        }>
        <div className="relative">
          <div
            className={cn(
              'w-6 h-6 rounded-full border-2 flex items-center justify-center',
              step.status === 'pending' && 'border-muted-foreground/30',
              step.status === 'processing' && 'border-yellow-500',
              step.status === 'completed' && 'border-green-500',
              step.status === 'error' && 'border-red-500'
            )}>
            {step.status === 'processing' && (
              <motion.div
                className="w-6 h-6 rounded-full border-2 border-yellow-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            )}
            {step.status === 'completed' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {step.status === 'error' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{step.title}</h3>
          {step.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {step.description}
            </p>
          )}
          {step.estimatedTime && (
            <p className="text-xs text-muted-foreground mt-1">
              Estimated time: {step.estimatedTime}
            </p>
          )}
          {elapsedTime && (
            <p className="text-xs text-muted-foreground mt-1">
              Elapsed time: {elapsedTime}
            </p>
          )}
        </div>
        {step.status === 'completed' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              'text-muted-foreground transition-transform',
              isExpanded && 'rotate-180'
            )}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </div>
      {isExpanded && (step.code || step.streamingContent) && (
        <div className="px-4 pb-4">
          {step.code ? (
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-full w-fit">
                <CodeBlock
                  language="python"
                  code={step.code}
                  filename="script.py"
                />
              </div>
            </div>
          ) : (
            <div className="text-sm bg-muted p-3 rounded-lg overflow-x-auto prose dark:prose-invert max-w-none [&>*+*]:mt-6 [&>p]:leading-7">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-xl font-bold mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-bold mb-3">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-bold mb-2">{children}</h3>
                  ),
                  p: ({ children }) => <p className="my-3">{children}</p>,
                  strong: ({ children }) => (
                    <strong className="font-bold text-primary">
                      {children}
                    </strong>
                  ),
                }}>
                {step.streamingContent || ''}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function PlaygroundPage() {
  const [instruction, setInstruction] = useState('')
  const [script, setScript] = useState<ScriptItem[]>([])
  const [maxDuration, setMaxDuration] = useState(60)
  const [temperature, setTemperature] = useState(0.7)
  const [subject, setSubject] = useState('other')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  const [steps, setSteps] = useState<ProgressStep[]>([
    {
      id: '1',
      title: 'Generate Script',
      status: 'pending',
      description: 'Creating video script based on your instructions',
      estimatedTime: '60s',
    },
    {
      id: '2',
      title: 'Generate Notes',
      status: 'pending',
      description: 'Generating detailed explanation notes',
      estimatedTime: '30s',
      streamingContent: '',
    },
    {
      id: '3',
      title: 'Generate Video',
      status: 'pending',
      description: 'Converting script into video content',
      estimatedTime: '5min',
    },
  ])

  const executeManimCode = useCallback(async (code: string) => {
    setIsVideoLoading(true)
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === '3' ? { ...step, status: 'processing' } : step
      )
    )

    try {
      const response = await fetch(
        `http://${window.location.hostname}:5001/api/execute-manim`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to generate video')
      }

      // 将响应转换为 Blob URL
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setVideoUrl(url)

      setSteps((prevSteps) =>
        prevSteps.map((step) =>
          step.id === '3' ? { ...step, status: 'completed' } : step
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate video')
      setSteps((prevSteps) =>
        prevSteps.map((step) =>
          step.id === '3' ? { ...step, status: 'error' } : step
        )
      )
    } finally {
      setIsVideoLoading(false)
    }
  }, [])

  const handleGenerate = useCallback(async () => {
    if (!instruction.trim()) {
      setError('Please enter instructions first')
      return
    }

    setIsLoading(true)
    setError(null)
    setVideoUrl(null)
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === '1' ? { ...step, status: 'processing' } : step
      )
    )

    try {
      const response = await fetch(
        `http://${window.location.hostname}:5001/script`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: instruction,
            temperature,
            maxDuration,
            style: subject,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to generate script')
      }

      const data = await response.json()

      if (data.success) {
        setSteps((prevSteps) =>
          prevSteps.map((step) =>
            step.id === '1'
              ? {
                  ...step,
                  status: 'completed',
                  code: data.code,
                }
              : step
          )
        )

        // Start both note generation and video generation in parallel
        setSteps((prevSteps) =>
          prevSteps.map((step) =>
            step.id === '2' || step.id === '3'
              ? { ...step, status: 'processing' }
              : step
          )
        )

        // Start note generation
        const noteResponse = fetch(
          `http://${window.location.hostname}:5001/api/note`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: data.code }),
          }
        )

        // Start video generation
        const videoPromise = executeManimCode(data.code)

        // Handle streaming note response
        const reader = (await noteResponse).body?.getReader()
        const decoder = new TextDecoder()

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            setSteps((prevSteps) =>
              prevSteps.map((step) =>
                step.id === '2'
                  ? {
                      ...step,
                      streamingContent: (step.streamingContent || '') + chunk,
                    }
                  : step
              )
            )
          }

          // Mark note generation as completed
          setSteps((prevSteps) =>
            prevSteps.map((step) =>
              step.id === '2' ? { ...step, status: 'completed' } : step
            )
          )
        }

        // Wait for video generation to complete
        await videoPromise
      } else {
        throw new Error('Failed to generate script')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setSteps((prevSteps) =>
        prevSteps.map((step) =>
          ['1', '2', '3'].includes(step.id)
            ? { ...step, status: 'error' }
            : step
        )
      )
    } finally {
      setIsLoading(false)
    }
  }, [instruction, temperature, maxDuration, subject, executeManimCode])

  const handleMaxDurationChange = useCallback(([value]: number[]) => {
    setMaxDuration(value)
  }, [])

  const handleTemperatureChange = useCallback(([value]: number[]) => {
    setTemperature(value)
  }, [])

  const handleSubjectChange = useCallback((value: string) => {
    setSubject(value)
  }, [])

  const handleInstructionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInstruction(e.target.value)
    },
    []
  )

  return (
    <div className="h-screen w-screen p-4">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={45}>
              <div className="grid h-full grid-cols-2 gap-4 p-2">
                {/* Instruction Input */}
                <Card className="col-span-1 flex flex-col gap-2 pt-6 pb-3">
                  <CardHeader>
                    <CardTitle className="text-base">Instructions</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <Textarea
                      placeholder="Describe what you want to visualize..."
                      className="flex-1 resize-none text-sm min-h-0"
                      value={instruction}
                      onChange={handleInstructionChange}
                    />
                    {error && (
                      <p className="text-sm text-destructive mt-1">{error}</p>
                    )}
                    <Button
                      className="mt-1.5 w-full text-sm h-8"
                      onClick={handleGenerate}
                      disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Generating...
                        </>
                      ) : (
                        'Generate'
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Settings Card */}
                <Card className="col-span-1 flex flex-col">
                  <CardHeader className="p-2 pb-0">
                    <CardTitle className="text-base">Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-3 pt-2">
                    {/* Max Duration */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium">
                        Max Duration: {maxDuration}s
                      </label>
                      <Slider
                        value={[maxDuration]}
                        onValueChange={handleMaxDurationChange}
                        min={5}
                        max={120}
                        step={5}
                      />
                    </div>

                    <Separator className="my-2" />

                    {/* Temperature */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium">
                        Temperature: {temperature}
                      </label>
                      <Slider
                        value={[temperature]}
                        onValueChange={handleTemperatureChange}
                        min={0}
                        max={1}
                        step={0.05}
                      />
                    </div>

                    <Separator className="my-2" />

                    {/* Subject Selection */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Subject</label>
                      <Select
                        value={subject}
                        onValueChange={handleSubjectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="computer">
                            Computer Science
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>
            <ResizableHandle className="bg-transparent hover:bg-border/90 transition-colors" />
            <ResizablePanel defaultSize={55}>
              {/* Video Preview */}
              <div className="h-full p-2">
                <Card className="h-full">
                  <CardContent className="h-full">
                    {isVideoLoading ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <svg
                            className="animate-spin h-8 w-8 text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <p className="text-sm text-muted-foreground">
                            Generating video...
                          </p>
                        </div>
                      </div>
                    ) : videoUrl ? (
                      <video
                        src={videoUrl}
                        className="w-full h-full rounded-lg"
                        controls
                        autoPlay
                        loop
                      />
                    ) : (
                      <div className="h-full bg-background/10 dark:bg-background/20 rounded-lg flex items-center justify-center text-muted-foreground">
                        Video preview will appear here
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle className="bg-transparent hover:bg-border/90 transition-colors" />
        <ResizablePanel defaultSize={25}>
          {/* Progress Steps */}
          <div className="h-full p-2">
            <Card className="h-full">
              <CardHeader className="p-3">
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="space-y-4">
                    {steps.map((step) => (
                      <ProgressStep key={step.id} step={step} />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
