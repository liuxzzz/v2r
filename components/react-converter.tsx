"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromptEditor } from "@/components/prompt-editor"
import { useAppContext } from "./app-provider"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReactConverterProps {
  initialVueCode: string
}

export function ReactConverter({ initialVueCode }: ReactConverterProps) {
  const { apiKey, reactConvertPrompt } = useAppContext()
  const [inputCode, setInputCode] = useState("")
  const [outputCode, setOutputCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (initialVueCode) {
      setInputCode(initialVueCode)
    }
  }, [initialVueCode])

  const handleConvert = async () => {
    if (!apiKey) {
      toast({
        title: "API 密钥缺失",
        description: "请先设置您的 OpenAI API 密钥",
        variant: "destructive",
      })
      return
    }

    if (!inputCode.trim()) {
      toast({
        title: "代码缺失",
        description: "请输入需要转换的 Vue 代码",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: reactConvertPrompt,
            },
            {
              role: "user",
              content: inputCode,
            },
          ],
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`)
      }

      const data = await response.json()
      const convertedCode = data.choices[0].message.content
      setOutputCode(convertedCode)

      toast({
        title: "转换成功",
        description: "Vue 代码已成功转换为 React 代码",
      })
    } catch (error) {
      console.error("转换代码时出错:", error)
      toast({
        title: "转换失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setInputCode("")
    setOutputCode("")
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Vue 转 React</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="editor">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor">代码编辑器</TabsTrigger>
              <TabsTrigger value="prompt">Prompt 调试</TabsTrigger>
            </TabsList>
            <TabsContent value="editor">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">输入 Vue 代码</h3>
                  <Textarea
                    placeholder="在此处粘贴您的 Vue 代码..."
                    className="min-h-[400px] font-mono"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">转换后的 React 代码</h3>
                  <Textarea
                    placeholder="转换后的 React 代码将显示在这里..."
                    className="min-h-[400px] font-mono"
                    value={outputCode}
                    readOnly
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="prompt">
              <div className="mt-4">
                <PromptEditor type="react-convert" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClear}>
            清除
          </Button>
          <Button onClick={handleConvert} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                转换中...
              </>
            ) : (
              "转换为 React"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
