"use client"

import { useState } from "react"
import MarkdownRenderer from "@/components/MarkdownRenderer"
import { Button } from "@/components/ui/button"

type ToolMessageProps = {
  content: string
}

export default function ToolMessage({ content }: ToolMessageProps) {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "Show tool output" : "Hide tool output"}
      </Button>
      {!collapsed && <MarkdownRenderer content={`\`\`\`\n${content}\n\`\`\``} />}
    </div>
  )
}
