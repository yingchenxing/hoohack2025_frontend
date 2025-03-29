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
import { useState, useCallback } from 'react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'

interface ScriptItem {
  id: string
  timing: string
  animation_description: string
  narration: string
}

const reorder = (
  list: ScriptItem[],
  startIndex: number,
  endIndex: number
): ScriptItem[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export default function PlaygroundPage() {
  const [instruction, setInstruction] = useState('')
  const [script, setScript] = useState<ScriptItem[]>([])
  const [maxDuration, setMaxDuration] = useState(30)
  const [temperature, setTemperature] = useState(0.7)
  const [style, setStyle] = useState('realistic')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = useCallback(async () => {
    if (!instruction.trim()) {
      setError('Please enter instructions first')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:5001/script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: instruction,
          temperature,
          maxDuration,
          style,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate script')
      }

      const data = await response.json()

      // Transform the sections into our ScriptItem format
      const scriptItems: ScriptItem[] = data.sections.map(
        (section: any, index: number) => ({
          id: String(index + 1),
          timing: section.timing,
          animation_description: section.animation_description,
          narration: section.narration,
        })
      )

      setScript(scriptItems)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [instruction, temperature, maxDuration, style])

  const onDragEnd = useCallback(
    (result: DropResult) => {
      // dropped nowhere
      if (!result.destination) {
        return
      }

      const source = result.source
      const destination = result.destination

      // did not move anywhere - can bail early
      if (source.index === destination.index) {
        return
      }

      const items = reorder(script, source.index, destination.index)
      setScript(items)
    },
    [script]
  )

  const handleMaxDurationChange = useCallback(([value]: number[]) => {
    setMaxDuration(value)
  }, [])

  const handleTemperatureChange = useCallback(([value]: number[]) => {
    setTemperature(value)
  }, [])

  const handleStyleChange = useCallback((value: string) => {
    setStyle(value)
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

                    {/* Style Selection */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Style</label>
                      <Select value={style} onValueChange={handleStyleChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realistic">Realistic</SelectItem>
                          <SelectItem value="cartoon">Cartoon</SelectItem>
                          <SelectItem value="abstract">Abstract</SelectItem>
                          <SelectItem value="minimalist">Minimalist</SelectItem>
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
                    <div className="h-full bg-background/10 dark:bg-background/20 rounded-lg flex items-center justify-center text-muted-foreground">
                      Video preview will appear here
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle className="bg-transparent hover:bg-border/90 transition-colors" />
        <ResizablePanel defaultSize={25}>
          {/* Generated Script */}
          <div className="h-full p-2">
            <Card className="h-full">
              <CardHeader className="p-3">
                <CardTitle className="text-lg">Generated Script</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="script-list">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`space-y-2 transition-colors ${
                            snapshot.isDraggingOver
                              ? 'bg-accent/5 rounded-lg'
                              : ''
                          }`}>
                          {script.length === 0 ? (
                            <div className="text-sm text-muted-foreground">
                              Generated script will appear here...
                            </div>
                          ) : (
                            script.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                    }}
                                    className={`relative rounded-lg border bg-card ${
                                      snapshot.isDragging
                                        ? 'ring-2 ring-primary ring-offset-2'
                                        : ''
                                    }`}>
                                    <div
                                      {...provided.dragHandleProps}
                                      className="absolute right-2 top-2 cursor-grab active:cursor-grabbing">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4">
                                        <circle cx="9" cy="12" r="1" />
                                        <circle cx="9" cy="5" r="1" />
                                        <circle cx="9" cy="19" r="1" />
                                        <circle cx="15" cy="12" r="1" />
                                        <circle cx="15" cy="5" r="1" />
                                        <circle cx="15" cy="19" r="1" />
                                      </svg>
                                    </div>
                                    <div className="flex flex-col gap-2 p-3">
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant="outline"
                                          className="w-24 text-center">
                                          {item.timing}
                                        </Badge>
                                      </div>
                                      <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                          Animation:
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {item.animation_description}
                                        </p>
                                      </div>
                                      <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                          Narration:
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {item.narration}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
