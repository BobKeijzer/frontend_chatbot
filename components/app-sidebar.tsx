"use client"

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator
} from "@/components/ui/sidebar"
import {
  MessageSquare, Settings, Folder, Database, Cpu, Trash2, Upload, File, Plus, Edit2, Check, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useFileHandler } from "@/hooks/useFileHandler"
import { useChats } from "@/hooks/useChats"
import { useEffect } from "react"

export default function Appsidebar() {
  const { files, folders, handleFileUpload, handleFolderUpload, handleClear, refreshFiles } = useFileHandler()
  const { 
    currentChatId,
    renamingChatId,
    newName,
    chats, 
    showAnswersOnly,
    handleSelectChat,
    handleNewChat,
    handleDeleteChat,
    handleRenameChat,
    setRenamingChatId,
    setNewName, 
    refreshChats,
    toggleShowAnswersOnly,
  } = useChats()

  useEffect(() => { (async () => { 
    await refreshChats() 
    await refreshFiles() })() }, [])

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        {/* Chats */}
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <MessageSquare /> Chats
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-1">
                    {chats.map(chat => (
                      <div
                        key={chat.chat_id}
                        className={`flex items-center justify-between p-1 rounded hover:bg-sidebar-accent cursor-pointer ${currentChatId === chat.chat_id ? "bg-sidebar-secondary" : ""}`}
                      >
                        <div onClick={() => handleSelectChat(chat.chat_id)}>
                          {renamingChatId === chat.chat_id ? (
                            <input
                              value={newName}
                              onChange={e => setNewName(e.target.value)}
                              onKeyDown={e => e.key === "Enter" && handleRenameChat(chat.chat_id)}
                              className="border px-1 text-sm"
                              autoFocus
                            />
                          ) : (
                            chat.name
                          )}
                        </div>
                        <div className="flex gap-1">
                          {renamingChatId === chat.chat_id ? (
                            <Button variant="secondary" size="sm" onClick={() => handleRenameChat(chat.chat_id)}><Check /></Button>
                          ) : (
                            <Button variant="secondary" size="sm" onClick={() => { setRenamingChatId(chat.chat_id); setNewName(chat.name) }}><Edit2 /></Button>
                          )}
                          <Button variant="secondary" size="sm" onClick={() => handleDeleteChat(chat.chat_id)}><X /></Button>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-1 mt-2">
                      <Button variant="secondary" size="sm" onClick={() => handleNewChat()}><Plus /></Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Files */}
        <SidebarGroup>
          <SidebarGroupLabel>Files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Folder /> Local Files
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-1 space-y-2">
                  <div className="flex gap-1">
                    <Button
                      onClick={() => {
                        const input = document.createElement("input")
                        input.type = "file"
                        input.webkitdirectory = true
                        input.onchange = e => handleFolderUpload((e.target as HTMLInputElement).files)
                        input.click()
                      }}
                      variant="secondary"
                      size="sm"
                    >
                      <Upload /> Folder
                    </Button>
                    <Button
                      onClick={() => {
                        const input = document.createElement("input")
                        input.type = "file"
                        input.multiple = true
                        input.accept=".pdf,.txt,.docx,.xlsx,.xls,.csv,.sqlite,.db"
                        input.onchange = e => handleFileUpload((e.target as HTMLInputElement).files)
                        input.click()
                      }}
                      variant="secondary"
                      size="sm"
                    >
                      <Upload /> Files
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleClear}><Trash2 /></Button>
                  </div>

                  <div className="ml-2 space-y-1">
                    {folders.map(folder => (
                      <div
                        key={folder.id}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <Folder size={14} className="flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{folder.name}</span>
                      </div>
                    ))}

                    {files.map(file => (
                      <div
                        key={file.id}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <File size={14} className="flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{file.name}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Settings /> Messages
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-1">
                    <div className="mt-auto p-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleShowAnswersOnly}
                        className="w-full"
                      >
                        {showAnswersOnly ? "Show All" : "Show Answers Only"}
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}
