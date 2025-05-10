"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import PromptList from "@/components/prompt-list"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [toolFilter, setToolFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Browse Prompts</h1>
            <Link href="/submit">
              <Button>Submit Your Prompt</Button>
            </Link>
          </div>

          <div className="mb-8 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Desktop filters */}
            <div className="hidden gap-4 md:flex">
              <Select defaultValue="newest" value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              <Select value={toolFilter} onValueChange={setToolFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by tool" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tools</SelectItem>
                  <SelectItem value="chatgpt">ChatGPT</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                  <SelectItem value="gpt4">GPT-4</SelectItem>
                  <SelectItem value="midjourney">Midjourney</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile filters */}
            <div className="md:hidden">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Filter Prompts</SheetTitle>
                    <SheetDescription>Adjust the filters to find the perfect prompt for your needs.</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Sort by</h3>
                      <Select
                        value={sortBy}
                        onValueChange={(value) => {
                          setSortBy(value)
                          setIsFilterOpen(false)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Filter by tool</h3>
                      <Select
                        value={toolFilter}
                        onValueChange={(value) => {
                          setToolFilter(value)
                          setIsFilterOpen(false)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by tool" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Tools</SelectItem>
                          <SelectItem value="chatgpt">ChatGPT</SelectItem>
                          <SelectItem value="claude">Claude</SelectItem>
                          <SelectItem value="gpt4">GPT-4</SelectItem>
                          <SelectItem value="midjourney">Midjourney</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <PromptList
            searchQuery={searchQuery}
            sortBy={sortBy}
            toolFilter={toolFilter}
            categoryFilter={categoryFilter}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
