// Summary info for each chat
export type ChatListItem = {
  chat_id: string
  name: string
  timestamp: string
}

// Individual message in a chat
export type ChatMessage = {
  role: "user" | "assistant" | "system" | "tool" 
  content: string
  tool_call_id?: string
}

// Allowed file extensions
export const ALLOWED_EXTENSIONS = [".pdf",".txt",".docx",".xlsx",".xls",".csv",".sqlite",".db"]

// Type for individual uploaded file
export type UploadedFile = {
  id: string
  name: string
  folderPath: string
  file: File
}

// Type for uploaded folder
export type UploadedFolder = {
  id: string
  name: string
  files: UploadedFile[] 
}




