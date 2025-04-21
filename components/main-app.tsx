"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VueOptimizer } from "@/components/vue-optimizer"
import { ReactConverter } from "@/components/react-converter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Link from "next/link"

export function MainApp() {
  const [optimizedVueCode, setOptimizedVueCode] = useState("")

  return (
    <div className="container mx-auto max-w-7xl">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Vue 代码优化与 React 转换工具</CardTitle>
            <CardDescription>使用 AI 优化您的 Vue 代码并将其转换为 React 代码</CardDescription>
          </div>
          <Link href="/settings">
            <Button variant="outline" size="icon" className="ml-auto">
              <Settings className="h-4 w-4" />
              <span className="sr-only">设置</span>
            </Button>
          </Link>
        </CardHeader>
      </Card>

      <Tabs defaultValue="optimize" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="optimize">步骤 1: Vue 代码优化</TabsTrigger>
          <TabsTrigger value="convert">步骤 2: React 代码转换</TabsTrigger>
        </TabsList>
        <TabsContent value="optimize">
          <VueOptimizer onCodeOptimized={setOptimizedVueCode} />
        </TabsContent>
        <TabsContent value="convert">
          <ReactConverter initialVueCode={optimizedVueCode} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
