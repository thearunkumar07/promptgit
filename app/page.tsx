import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, ThumbsUp, Users } from "lucide-react"
import FeaturedPrompts from "@/components/featured-prompts"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import CategoryBrowser from "@/components/category-browser"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-12 md:py-20">
          <div className="absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>

          <div className="container relative flex flex-col items-center text-center">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Discover, Share, Upvote
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block">The Ultimate</span>
              <span className="relative mt-1 inline-block bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                AI Prompt Marketplace
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              A community-driven platform for AI enthusiasts to find, share, and upvote high-quality prompts for various
              AI tools.
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Link href="/prompts">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary to-purple-600 transition-all hover:shadow-lg"
                >
                  Browse Prompts
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/submit">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary/20 transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  Submit Your Prompt
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid max-w-4xl grid-cols-1 gap-4 rounded-xl border bg-card/50 p-4 shadow-sm backdrop-blur-sm sm:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg p-4 transition-all hover:bg-muted/50">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Prompts Shared</div>
              </div>
              <div className="flex flex-col items-center rounded-lg p-4 transition-all hover:bg-muted/50">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Monthly Users</div>
              </div>
              <div className="flex flex-col items-center rounded-lg p-4 transition-all hover:bg-muted/50">
                <div className="text-3xl font-bold text-primary">75+</div>
                <div className="text-sm text-muted-foreground">Upvotes</div>
              </div>
            </div>
          </div>
        </section>

        {/* Browse by Category Section */}
        <section className="border-t py-12 md:py-16">
          <div className="container">
            <CategoryBrowser />
          </div>
        </section>

        {/* Featured Prompts 
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Prompts</h2>
              <Link href="/prompts">
                <Button variant="outline" className="gap-1">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <FeaturedPrompts />
          </div>
        </section>*/}

        {/* How It Works */}
        <section className="border-t bg-muted/50 py-12 md:py-16">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Discover</h3>
                <p className="text-muted-foreground">
                  Browse through a curated collection of high-quality prompts for various AI tools.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <ThumbsUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Upvote</h3>
                <p className="text-muted-foreground">
                  Support the community by upvoting the prompts you find most useful.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Contribute</h3>
                <p className="text-muted-foreground">
                  Share your own prompts and help others unlock the full potential of AI tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
      <SiteFooter />
    </div>
  )
}
