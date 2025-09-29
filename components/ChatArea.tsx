"use client"

import { useEffect, useRef } from "react"
import MarkdownRenderer from "@/components/MarkdownRenderer"
import { ChatMessage } from "@/lib/definitions"
import ToolMessage from "@/components/ToolMessage"

type Props = {
  messages: ChatMessage[]
}

export default function ChatArea({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  const lastUserIndex = [...messages]
    .map((m, i) => (m.role === "user" ? i : -1))
    .filter(i => i !== -1)
    .pop()

  useEffect(() => {
    if (lastUserIndex !== undefined) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, lastUserIndex])

  return (
    <div className="flex-1 flex flex-col gap-2 p-4">
      {messages.map((msg, i) => {
        const isUser = msg.role === "user"
        const isTool = msg.role === "tool"

        return (
          <div
            key={i}
            ref={i === lastUserIndex ? bottomRef : null}
            className={`p-2 rounded-md ${
              isUser
                ? "ml-auto max-w-[70%] bg-secondary"
                : "mr-auto w-full"
            }`}
          >
            {isUser ? (
              <span>{msg.content}</span>
            ) : isTool ? (
              <ToolMessage content={msg.content} />
            ) : (
              <MarkdownRenderer content={msg.content} />
            )}
          </div>
        )
      })}
    </div>
  )
}
