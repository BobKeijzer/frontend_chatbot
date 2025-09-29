"use client"

import { SidebarInset } from "@/components/ui/sidebar"
import ChatArea from "@/components/ChatArea"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { sendMessage } from "@/lib/api"
import { useChats } from "@/hooks/useChats"
import { ChatMessage } from "@/lib/definitions"

export default function Home() {
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const { currentChatId, currentMessages, setCurrentMessages } = useChats()

  const handleSend = async () => {
    if (!input.trim() || !currentChatId) return
    setIsSending(true)
    const userInput = input
    setInput("")

    const userMessage: ChatMessage = { role: "user", content: userInput }
    setCurrentMessages(prev => [...prev, userMessage])

    const placeholder: ChatMessage = { role: "assistant", content: "💭 Thinking..." }
    setCurrentMessages(prev => [...prev, placeholder])

    try {
      const newMessages = await sendMessage({ role: "user", content: userInput }, currentChatId)
      setCurrentMessages(prev => [
        ...prev.slice(0, -1), ...newMessages
      ])
    } catch (err) {
      console.error(err)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-1 flex-col h-screen">
      {/* Main Chat Area */}
      <SidebarInset>
        <div className="flex flex-col flex-1 h-full w-full max-w-3xl mx-auto">
          <div className="flex flex-1 flex-col overflow-auto">
            <ChatArea messages={currentMessages}/>
          </div>

          <div className="sticky bottom-0 z-10 flex gap-2 p-4 border-t border-border bg-background">
            <Textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 resize-none"
              placeholder={currentChatId ? "Type your message..." : "Select or create a chat first"}
              disabled={!currentChatId || isSending}
            />
            <Button onClick={handleSend} disabled={!currentChatId || isSending}>
              {isSending ? "..." : "Send"}
            </Button>
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}
