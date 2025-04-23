/*
 * @Author: 刘洪壮 liuhongzhuang@nextmar.com
 * @Date: 2025-04-21 19:14:57
 * @LastEditors: 刘洪壮 liuhongzhuang@nextmar.com
 * @LastEditTime: 2025-04-22 19:48:41
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

const defaultVueOptimizePrompt = `Improve the quality of provided Vue  code by adhering to best practices, enhancing security measures, and implementing effective error handling strategies. Focus on the following aspects:

1. **Delete redundant code**: Remove redundant code, including: unnecessary variables, functions, styles, etc.
2. **Code Structure**: Ensure the code is organized and follows the component-based architecture of Vue 3. Utilize Single File Components (SFC) effectively.
3. **Reactivity**: Leverage the Composition API for better state management and reactivity.
4. **Error Handling**: Implement robust error handling mechanisms to capture and manage runtime errors effectively.
5. **Performance Optimization**: Identify unnecessary re-renders and optimize component performance using techniques such as lazy loading and memoization.
6. **Style Transformation**:Convert the styles within the <style> tag to Tailwind CSS and embed them into the <template> tag; after conversion, remove the <style> tag.
7. **TODO Tag**: if importing other code or context that you can't handle, such as components, images, APIs, etc., please add the "//TODO:" tag in the code.

# Steps
- Review the provided code and identify areas for improvement.
- Refactor components to align with Vue  best practices.
- Convert the scss styles within the <style> tag to Tailwind CSS code.
- Implement security enhancements where applicable.
- Add error handling logic to manage exceptions and display user-friendly error messages.

# Output Format
- Provide the refactored code in a clear, commented format that highlights changes and improvements.
- Include annotations explaining the reasons behind specific changes and recommendations for further enhancements.
- Place the output code in <output> tags. For example: <output> your code </output>
`

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
