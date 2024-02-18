import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Visualisation intéractives FIFA 15-24",
  description: "Visualistion intéractive autours des données de EA Sports fifa 15 à 24.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "bg-background min-h-screen text-white")}
      >
        <Navbar />
        {children}
      </body>
    </html>
  )
}
