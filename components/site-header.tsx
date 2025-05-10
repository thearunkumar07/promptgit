"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Promptgit</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 md:flex">
          <Link
            href="/prompts"
            className={`text-sm font-medium hover:text-primary ${
              pathname === "/prompts" ? "text-primary" : "text-foreground"
            }`}
          >
            Browse your prompt
          </Link>
          <Link href="/submit">
            <Button size="sm">Submit your Prompt</Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <div className="flex flex-col gap-6 pt-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Promptgit</span>
              </Link>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/prompts"
                  className={`text-sm font-medium hover:text-primary ${
                    pathname === "/prompts" ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Prompts
                </Link>
                <Link href="/submit" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Submit Your Prompt</Button>
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
