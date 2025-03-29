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
import { useState } from 'react'

export default function PlaygroundPage() {
  const [instruction, setInstruction] = useState('')
  const [script, setScript] = useState('')
  const [maxDuration, setMaxDuration] = useState(30)
  const [temperature, setTemperature] = useState(0.7)
  const [style, setStyle] = useState('realistic')

  const handleGenerate = () => {
    // TODO: Implement video generation logic
    console.log('Generating video with:', {
      instruction,
      maxDuration,
      temperature,
      style,
    })
  }

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
                      onChange={(e) => setInstruction(e.target.value)}
                    />
                    <Button
                      className="mt-1.5 w-full text-sm h-8"
                      onClick={handleGenerate}>
                      Generate
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
                        onValueChange={([value]) => setMaxDuration(value)}
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
                        onValueChange={([value]) => setTemperature(value)}
                        min={0}
                        max={1}
                        step={0.05}
                      />
                    </div>

                    <Separator className="my-2" />

                    {/* Style Selection */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Style</label>
                      <Select value={style} onValueChange={setStyle}>
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
                  <CardContent className=" h-full">
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
                <div className="h-full w-full rounded-md border bg-muted/50 p-2 text-sm text-muted-foreground">
                  {script || 'Generated script will appear here...'}
                </div>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
