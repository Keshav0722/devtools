"use client"

import Link from "next/link"
import { Layers } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { CommandPalette } from "@/components/command-palette"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 relative group">
            <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <Layers className="w-5 h-5" />
            </div>
            <span className="font-bold sm:inline-block tracking-tight">SDRK Dev Tools</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              All Tools
            </Link>
            <Link
              href="/blog"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <CommandPalette />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
