/*
 * @Author: 刘洪壮 liuhongzhuang@nextmar.com
 * @Date: 2025-04-21 19:20:01
 * @LastEditors: 刘洪壮 liuhongzhuang@nextmar.com
 * @LastEditTime: 2025-04-21 19:27:29
 * @FilePath: /vue-react-converter/lib/api-utils.ts
 * @Description: API工具函数
 */

/**
 * 从多个来源获取OpenAI API密钥
 * 优先级：环境变量 
 */


const keyMap = new Map([
  ["OPENAI", process.env.NEXT_PUBLIC_OPENAI_API_KEY]
])


const getModelKey = (model: string) => {
  return  keyMap.get(model) || null
}

export { getModelKey }
