"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAppContext } from "./app-provider"
import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface PromptEditorProps {
  type: "vue-optimize" | "react-convert"
}

export function PromptEditor({ type }: PromptEditorProps) {
  const { vueOptimizePrompt, setVueOptimizePrompt, reactConvertPrompt, setReactConvertPrompt } = useAppContext()

  const [promptValue, setPromptValue] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    if (type === "vue-optimize") {
      setPromptValue(vueOptimizePrompt)
    } else {
      setPromptValue(reactConvertPrompt)
    }
  }, [type, vueOptimizePrompt, reactConvertPrompt])

  const handleSave = () => {
    if (type === "vue-optimize") {
      setVueOptimizePrompt(promptValue)
    } else {
      setReactConvertPrompt(promptValue)
    }

    toast({
      title: "Prompt 已保存",
      description: "您的 Prompt 设置已成功保存",
    })
  }

  const handleReset = () => {
    if (type === "vue-optimize") {
      const defaultPrompt = `你是一位 Vue.js 专家，请帮我优化以下 Vue 代码，使其更加高效、可读性更强，并遵循最佳实践。请保持功能不变，但可以改进代码结构、组件设计、性能和可维护性。`
      setPromptValue(defaultPrompt)
      setVueOptimizePrompt(defaultPrompt)
    } else {
      const defaultPrompt = `你是一位精通 Vue.js 和 React 的专家，请将以下 Vue 代码转换为等效的 React 代码。确保保持相同的功能和行为，但使用 React 的最佳实践和惯用方法。请使用函数组件和 React Hooks。`
      setPromptValue(defaultPrompt)
      setReactConvertPrompt(defaultPrompt)
    }

    toast({
      title: "Prompt 已重置",
      description: "您的 Prompt 设置已重置为默认值",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "vue-optimize" ? "Vue 优化 Prompt" : "React 转换 Prompt"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="编辑您的 Prompt..."
          className="min-h-[300px]"
          value={promptValue}
          onChange={(e) => setPromptValue(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset}>
          重置为默认
        </Button>
        <Button onClick={handleSave}>保存 Prompt</Button>
      </CardFooter>
    </Card>
  )
}
