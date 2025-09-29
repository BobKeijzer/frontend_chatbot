import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import DarkModeButton from "@/components/DarkModeButton";
import { cookies } from "next/headers";
import { ChatsProvider } from "@/hooks/useChats"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chat App",
  description: "AI powered chat application using Next.js and FastAPI",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ChatsProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar />

              <div className="flex flex-col flex-1 h-screen">
                {/* Header */}
                <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-background">
                  <h1 className="text-lg font-semibold text-primary">PAI</h1>
                  <DarkModeButton />
                </header>
                <SidebarTrigger className="ml-1"/>
                {/* Main content */}
                <main className="flex flex-1 overflow-y-auto">
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </ChatsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
