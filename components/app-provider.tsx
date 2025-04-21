/*
 * @Author: 刘洪壮 liuhongzhuang@nextmar.com
 * @Date: 2025-04-21 19:14:57
 * @LastEditors: 刘洪壮 liuhongzhuang@nextmar.com
 * @LastEditTime: 2025-04-21 19:28:43
 * @FilePath: /vue-react-converter/components/app-provider.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getModelKey } from "@/lib/api-utils"

type AppContextType = {
  apiKey: string
  setApiKey: (key: string) => void
  vueOptimizePrompt: string
  setVueOptimizePrompt: (prompt: string) => void
  reactConvertPrompt: string
  setReactConvertPrompt: (prompt: string) => void
}

const defaultVueOptimizePrompt = `你是一位 Vue.js 专家，请帮我优化以下 Vue 代码，使其更加高效、可读性更强，并遵循最佳实践。请保持功能不变，但可以改进代码结构、组件设计、性能和可维护性。`

const defaultReactConvertPrompt = `你是一位精通 Vue.js 和 React 的专家，请将以下 Vue 代码转换为等效的 React 代码。确保保持相同的功能和行为，但使用 React 的最佳实践和惯用方法。请使用函数组件和 React Hooks。`

const AppContext = createContext<AppContextType>({
  apiKey: "",
  setApiKey: () => {},
  vueOptimizePrompt: defaultVueOptimizePrompt,
  setVueOptimizePrompt: () => {},
  reactConvertPrompt: defaultReactConvertPrompt,
  setReactConvertPrompt: () => {},
})

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKey] = useState("")
  const [vueOptimizePrompt, setVueOptimizePrompt] = useState(defaultVueOptimizePrompt)
  const [reactConvertPrompt, setReactConvertPrompt] = useState(defaultReactConvertPrompt)

  // 在组件挂载时初始化API密钥
  useEffect(() => {
    const modelKey = getModelKey("OPENAI")
    if (modelKey) {
      setApiKey(modelKey)
    }
  }, []);


  return (
    <AppContext.Provider
      value={{
        apiKey,
        setApiKey,
        vueOptimizePrompt,
        setVueOptimizePrompt,
        reactConvertPrompt,
        setReactConvertPrompt,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
