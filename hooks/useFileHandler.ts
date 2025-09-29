"use client"

import { useState } from "react"
import { UploadedFile, UploadedFolder, ALLOWED_EXTENSIONS } from "@/lib/definitions"
import { clearRAG, uploadFiles, listFiles } from "@/lib/api"

function isAllowedExtension(fileName: string) {
  return ALLOWED_EXTENSIONS.some(ext => fileName.toLowerCase().endsWith(ext))
}

export function useFileHandler() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [folders, setFolders] = useState<UploadedFolder[]>([])

  // Sync local state with backend
  const refreshFiles = async () => {
    try {
      const { files, folders } = await listFiles()
      setFiles(files)
      setFolders(folders)
    } catch (err) {
      console.error("Failed to fetch files metadata:", err)
    }
  }

  // Upload file(s) and then refresh from backend
  const handleFileUpload = async (fileList: FileList | null) => {
    if (!fileList) return
    const newFiles: UploadedFile[] = Array.from(fileList)
      .filter(file => isAllowedExtension(file.name))
      .map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        folderPath: "",
        file,
      }))

    if (newFiles.length === 0) return

    try {
      await uploadFiles(newFiles)
      await refreshFiles()
    } catch (err) {
      console.error("Upload failed:", err)
    }
  }

  // Upload folder(s) and then refresh from backend
  const handleFolderUpload = async (fileList: FileList | null) => {
    if (!fileList) return

    const folderFiles: UploadedFile[] = Array.from(fileList)
      .filter(file => isAllowedExtension(file.name) && file.webkitRelativePath)
      .map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        folderPath: file.webkitRelativePath!.split("/").slice(0, -1).join("/"),
        file,
      }))

    if (folderFiles.length === 0) return

    try {
      await uploadFiles(folderFiles)
      await refreshFiles()
    } catch (err) {
      console.error("Upload failed:", err)
    }
  }

  // Clear backend RAG and refresh state
  const handleClear = async () => {
    if (files.length !== 0 || folders.length !== 0) {
      if (!confirm("Are you sure you want to remove all uploads?")) return
    }
    try {
      await clearRAG()
      await refreshFiles()
    } catch (err) {
      console.error("Failed to clear RAG:", err)
    }
  }

  return {
    files,
    folders,
    handleFileUpload,
    handleFolderUpload,
    handleClear,
    refreshFiles
  }
}
