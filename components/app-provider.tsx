"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

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
