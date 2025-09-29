"use client"

import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button" 
import { Copy, CopyCheck } from "lucide-react"

type Props = {
  content: string
}

export default function MarkdownRenderer({ content }: Props) {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "")
            const codeString = String(children).replace(/\n$/, "")
            if (!inline && match) {
              return (
                <div className="relative group">
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ background: "transparent" }}
                    codeTagProps={{ style: { background: "transparent" } }}
                    {...props} 
                  >
                    {codeString}
                  </SyntaxHighlighter>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition text-gray-500"
                    onClick={() => handleCopy(codeString)}
                  >
                    {copied === codeString ? <CopyCheck/> : <Copy/>}
                  </Button>
                </div>
              )
            }
            return (
              <code className="rounded px-1 py-0.5 text-sm" {...props}>
                {children}
              </code>
            )
          },
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
