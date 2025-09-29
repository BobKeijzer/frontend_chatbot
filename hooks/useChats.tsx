"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { ChatMessage, ChatListItem } from "@/lib/definitions"
import { listChats, newChat, loadChat, deleteChat, renameChat } from "@/lib/api"

type ChatsContextType = {
  currentChatId: string | null
  currentMessages: ChatMessage[]
  chats: ChatListItem[]
  renamingChatId: string | null
  newName: string
  setCurrentMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
  handleNewChat: () => Promise<void>
  handleSelectChat: (chatId: string) => Promise<void>
  handleDeleteChat: (chatId: string) => Promise<void>
  handleRenameChat: (chatId: string) => Promise<void>
  refreshChats: () => Promise<void>
  setRenamingChatId: (id: string | null) => void
  setNewName: (name: string) => void
}

const ChatsContext = createContext<ChatsContextType | null>(null)

export function ChatsProvider({ children }: { children: ReactNode }) {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([])
  const [chats, setChats] = useState<ChatListItem[]>([])
  const [renamingChatId, setRenamingChatId] = useState<string | null>(null)
  const [newName, setNewName] = useState("")

  // Create a new chat, refresh chatlist and reinitialize messages
  const handleNewChat = async () => {
    const res = await newChat() 
    await refreshChats() 
    setCurrentChatId(res.chat_id) 
    setCurrentMessages([])
  }
  
  // Select a chat by id and get corresponding messages
  const handleSelectChat = async (chatId: string) => {
    const res = await loadChat(chatId)
    setCurrentChatId(res.chat_id)
    setCurrentMessages(res.messages)
  }

  // Delete a chat by id and refresh chatlist reinitialize messages
  const handleDeleteChat = async (chatId: string) => {
    if (!confirm("Are you sure you want to delete this chat?")) return
    await deleteChat(chatId)
    await refreshChats()
    if (currentChatId === chatId) {
      setCurrentChatId(null)
      setCurrentMessages([])
    }
  }
  
  // Rename a chat by id and refresh chatlist
  const handleRenameChat = async (chatId: string) => {
    if (!newName.trim()) return
    await renameChat(chatId, newName)
    setRenamingChatId(null)
    setNewName("")
    await refreshChats()
  }

  // Refresh chatlist
  const refreshChats = async () => {
    const list = await listChats()
    setChats(list)
  }

  return (
    <ChatsContext.Provider value={{
      currentChatId,
      currentMessages,
      chats,
      renamingChatId,
      newName,
      setCurrentMessages,
      handleNewChat,
      handleSelectChat,
      handleDeleteChat,
      handleRenameChat,
      refreshChats,
      setRenamingChatId,
      setNewName
    }}>
      {children}
    </ChatsContext.Provider>
  )
}

export function useChats() {
  const ctx = useContext(ChatsContext)
  if (!ctx) throw new Error("useChats must be used inside a ChatsProvider")
  return ctx
}
