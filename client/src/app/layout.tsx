import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/QueryProvider";
import { SocketProvider } from "@/providers/SocketContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Hydrations from "@/providers/Hydration";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatify",
  description: "Have fun and interesting chats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-[#191328] text-white  min-h-screen w-full overflow-hidden"
        )}
      >
        <QueryProvider>
          <SocketProvider>
            {children}
            <Toaster />
          </SocketProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
