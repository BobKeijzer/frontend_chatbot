
import type { UploadedFile, UploadedFolder, ChatMessage, ChatListItem } from "@/lib/definitions";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// -------------------------
// Chat API calls
// -------------------------
export async function sendMessage(userMessage: ChatMessage, chatId: string): Promise<ChatMessage[]> {
  const res = await fetch(`${API_URL}/chat/message/${chatId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userMessage),
  });
  if (!res.ok) {
    throw new Error(`Failed to send message: ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}

export async function newChat(): Promise<{ chat_id: string }> {
  const res = await fetch(`${API_URL}/chat/new`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to create new chat");
  return res.json();
}

export async function loadChat(chatId: string): Promise<{ chat_id: string; messages: ChatMessage[] }> {
  const res = await fetch(`${API_URL}/chat/load/${chatId}`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load chat");
  return res.json();
}

export async function listChats(): Promise<ChatListItem[]> {
  const res = await fetch(`${API_URL}/chat/list`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to list chats");
  return res.json();
}

export async function deleteChat(chatId: string): Promise<void> {
  const res = await fetch(`${API_URL}/chat/delete/${chatId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete chat");
}

export async function renameChat(chatId: string, newName: string): Promise<void> {
  const formData = new FormData();
  formData.append("new_name", newName);

  const res = await fetch(`${API_URL}/chat/rename/${chatId}`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to rename chat");
}

// -------------------------
// File API calls
// -------------------------
export async function uploadFiles(files: UploadedFile[]): Promise<void> {
  const formData = new FormData();
  files.forEach((uf) => {
    formData.append("files", uf.file);
    formData.append(
      "metadata",
      JSON.stringify({
        id: uf.id,
        name: uf.name,
        folderPath: uf.folderPath,
      })
    );
  });

  const res = await fetch(`${API_URL}/files/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`Upload failed: ${res.statusText}`);
  }
}

export async function clearRAG(): Promise<void> {
  const res = await fetch(`${API_URL}/files/clear_rag`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to clear RAG store");
}

export async function listFiles(): Promise<{ files: UploadedFile[]; folders: UploadedFolder[] }> {
  const res = await fetch(`${API_URL}/files/metadata`, {
    method: "GET",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to fetch files metadata")
  return res.json()
}

