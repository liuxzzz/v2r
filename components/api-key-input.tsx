"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppContext } from "./app-provider"
import { Key } from "lucide-react"

export function ApiKeyInput() {
  const { apiKey, setApiKey } = useAppContext()
  const [inputValue, setInputValue] = useState(apiKey)
  const [isVisible, setIsVisible] = useState(false)

  const handleSave = () => {
    setApiKey(inputValue)
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Key className="h-4 w-4" />
        <span className="text-sm font-medium">OpenAI API 密钥</span>
      </div>
      <div className="flex space-x-2">
        <Input
          type={isVisible ? "text" : "password"}
          placeholder="输入您的 OpenAI API 密钥"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "隐藏" : "显示"}
        </Button>
        <Button onClick={handleSave}>保存</Button>
      </div>
      <p className="text-xs text-muted-foreground">您的 API 密钥仅存储在浏览器中，不会发送到我们的服务器</p>
    </div>
  )
}
