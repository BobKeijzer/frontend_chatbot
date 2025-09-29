"use client"

import { useState } from "react"
import MarkdownRenderer from "@/components/MarkdownRenderer"

type ToolMessageProps = {
  content: string
}

export default function ToolMessage({ content }: ToolMessageProps) {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-sm text-blue-500 underline mb-1"
      >
        {collapsed ? "Show tool output" : "Hide tool output"}
      </button>
      {!collapsed && <MarkdownRenderer content={`\`\`\`\n${content}\n\`\`\``} />}
    </div>
  )
}
