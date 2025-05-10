import Link from "next/link"
import { Sparkles } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-semibold">Promptgit</span>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Promptgit. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/submit" className="text-sm text-muted-foreground hover:text-foreground">
            Submit your Prompt
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Blog
          </Link>
          <Link href="https://www.freeprivacypolicy.com/live/aa4c0213-3060-4957-875f-8b63d412a67f" className="text-sm text-muted-foreground hover:text-foreground">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  )
}