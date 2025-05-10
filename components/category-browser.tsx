"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PromptList from "@/components/prompt-list"

// Define our categories - make sure these IDs match the ones in PromptList component
const CATEGORIES = [
  { id: "all", name: "All Categories" },
  { id: "creative", name: "Creative Writing" },
  { id: "ai-image", name: "AI Image" },
  { id: "chatgpt", name: "ChatGPT" },
  { id: "vibe code", name: "Vibe Code" },
  { id: "business", name: "Business" },
  { id: "programming", name: "Programming" },
  { id: "web design", name: "Web Design" },
  { id: "excel sheet", name: "Excel Sheet" },
  { id: "ui/ux", name: "UI/UX" },
  { id: "seo", name: "SEO" },
  { id: "mentor", name: "Mentor" },
  { id: "github", name: "GitHub" },
]

export default function CategoryBrowser() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < (container.scrollWidth - container.clientWidth - 10)) // Added buffer
    }
  }

  // Only run once on mount and on window resize
  useEffect(() => {
    checkScrollability()

    const handleResize = () => {
      checkScrollability()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = container.clientWidth * 0.5
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  // Separate effect for scroll event to avoid infinite loops
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      const handleScrollEvent = () => {
        checkScrollability()
      }

      container.addEventListener("scroll", handleScrollEvent)
      return () => container.removeEventListener("scroll", handleScrollEvent)
    }
  }, [])

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">Browse by Category</h2>
        <p className="text-muted-foreground">Find the perfect prompt for your creative needs.</p>
      </div>

      <div className="relative">
        {/* Left scroll button */}
        {canScrollLeft && (
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-background shadow-md md:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Scrollable categories */}
        <div ref={scrollContainerRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`shrink-0 rounded-full ${
                selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-background"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Right scroll button */}
        {canScrollRight && (
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-background shadow-md md:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="mt-8">
        <PromptList
          categoryFilter={selectedCategory}
          limitDisplay={3}
        />
      </div>

      {/* View More Button */}
      <div className="mt-4 flex justify-center">
        <Button
          variant="default"
          onClick={() => {
            const query = selectedCategory !== "all" ? `?category=${selectedCategory}` : ""
            window.location.href = `/prompts${query}`
          }}
        >
          View More Prompts
        </Button>
      </div>

      {selectedCategory !== "all" && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setSelectedCategory("all")}>
            View All Categories
          </Button>
        </div>
      )}
    </div>
  )  
}