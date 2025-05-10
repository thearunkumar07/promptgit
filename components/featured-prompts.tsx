"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, Copy, Check, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Define our categories
const CATEGORIES = [
  { id: "all", name: "All Categories" },
  { id: "creative", name: "Creative Writing" },
  { id: "ai-image", name: "AI Image" },
  { id: "chatgpt", name: "ChatGPT" },
  { id: "education", name: "Education" },
  { id: "business", name: "Business" },
  { id: "personal-growth", name: "Personal Growth" },
  { id: "content-creation", name: "Content Creation" },
  { id: "programming", name: "Programming" },
]

// Mock data for featured prompts
const FEATURED_PROMPTS = [
  {
    id: "1",
    title: "Creative Story Generator",
    description: "Generate engaging short stories with detailed characters and plot twists.",
    text: "Create a short story about [theme] with a protagonist who [character trait]. Include a surprising plot twist and end with a meaningful resolution.",
    tool: "ChatGPT",
    upvotes: 245,
    contributor: {
      name: "Emma Wilson",
      profile: "https://linkedin.com/in/emmawilson",
    },
    tags: ["creative", "writing", "storytelling"],
    categories: ["creative", "content-creation"],
  },
  {
    id: "2",
    title: "Product Description Writer",
    description: "Create compelling product descriptions for e-commerce listings.",
    text: "Write a persuasive product description for [product] that highlights its [key features]. Target audience is [demographic]. Include benefits, specifications, and a call to action.",
    tool: "Claude",
    upvotes: 189,
    contributor: {
      name: "Michael Chen",
      profile: "https://twitter.com/michaelchen",
    },
    tags: ["marketing", "e-commerce", "copywriting"],
    categories: ["business", "content-creation"],
  },
  {
    id: "3",
    title: "Code Refactoring Assistant",
    description: "Improve and optimize existing code with best practices.",
    text: "Refactor the following [language] code to improve readability, efficiency, and adherence to best practices. Explain your changes: [code block]",
    tool: "GPT-4",
    upvotes: 312,
    contributor: {
      name: "Sophia Rodriguez",
      profile: "https://github.com/sophiarodriguez",
    },
    tags: ["programming", "development", "optimization"],
    categories: ["programming"],
  },
]

export default function FeaturedPrompts() {
  const { toast } = useToast()
  const [prompts, setPrompts] = useState(FEATURED_PROMPTS)
  const [votedPrompts, setVotedPrompts] = useState<Set<string>>(new Set())
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedPrompts, setExpandedPrompts] = useState<Set<string>>(new Set())

  const handleUpvote = (id: string, event: React.MouseEvent) => {
    const button = event.currentTarget

    if (votedPrompts.has(id)) {
      toast({
        title: "Already upvoted",
        description: "You can only upvote a prompt once from this IP address.",
        variant: "destructive",
      })
      // Add a small shake animation even when already voted
      button.classList.add("animate-shake")
      setTimeout(() => {
        button.classList.remove("animate-shake")
      }, 500)
      return
    }

    // Add animation classes
    button.classList.add("scale-125")
    setTimeout(() => {
      button.classList.remove("scale-125")
    }, 200)

    setPrompts(prompts.map((prompt) => (prompt.id === id ? { ...prompt, upvotes: prompt.upvotes + 1 } : prompt)))
    setVotedPrompts(new Set([...votedPrompts, id]))

    // Find the count element and animate it
    const countElement = button.querySelector("span")
    if (countElement) {
      countElement.classList.add("text-primary", "font-bold", "animate-pulse")
      setTimeout(() => {
        countElement.classList.remove("animate-pulse")
      }, 1000)
    }

    toast({
      title: "Upvoted!",
      description: "Thank you for your vote.",
    })
  }

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)

    // Set the copied ID to show the check icon
    setCopiedId(id)

    // Reset after 2 seconds
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)

    // Show toast notification with enhanced styling
    toast({
      title: "Copied to clipboard!",
      description: (
        <div className="flex flex-col gap-1">
          <p>Prompt copied and ready to use</p>
          <div className="mt-1 rounded-md bg-muted p-2 text-xs">
            <p className="line-clamp-1 font-medium">{text}</p>
          </div>
        </div>
      ),
      duration: 3000,
    })
  }

  const togglePromptExpand = (id: string) => {
    const newExpandedPrompts = new Set(expandedPrompts)
    if (expandedPrompts.has(id)) {
      newExpandedPrompts.delete(id)
    } else {
      newExpandedPrompts.add(id)
    }
    setExpandedPrompts(newExpandedPrompts)
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {prompts.map((prompt) => (
        <Card key={prompt.id} className="flex h-full flex-col transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="line-clamp-1 text-lg">{prompt.title}</CardTitle>
              <Badge variant="outline" className="ml-2 shrink-0">
                {prompt.tool}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 pb-2">
            <p className="mb-3 text-sm text-muted-foreground">{prompt.description}</p>
            <div className="mb-3 rounded-md bg-muted p-3 text-sm">
              <p className={expandedPrompts.has(prompt.id) ? "whitespace-pre-wrap" : "line-clamp-3"}>{prompt.text}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-6 w-full justify-center p-0 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => togglePromptExpand(prompt.id)}
              >
                {expandedPrompts.has(prompt.id) ? (
                  <>
                    <ChevronUp className="mr-1 h-3 w-3" /> Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-3 w-3" /> Show More
                  </>
                )}
              </Button>
            </div>
            {prompt.categories && prompt.categories.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1">
                {prompt.categories.map((category) => {
                  // Find the category name from our categories list
                  const categoryName = CATEGORIES.find((c) => c.id === category)?.name || category
                  return (
                    <Badge key={category} variant="outline" className="bg-primary/5 text-xs">
                      {categoryName}
                    </Badge>
                  )
                })}
              </div>
            )}
            <div className="flex flex-wrap gap-1">
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-0">
            <div className="flex w-full items-center justify-between text-sm">
              <Link
                href={prompt.contributor.profile || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground hover:text-primary hover:underline"
              >
                By {prompt.contributor.name}
                <ExternalLink className="h-3 w-3" />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 transition-transform duration-200"
                onClick={(e) => handleUpvote(prompt.id, e)}
              >
                <ThumbsUp className="h-4 w-4 transition-colors duration-300" />
                <span className="transition-all duration-300">{prompt.upvotes}</span>
              </Button>
            </div>
            <Button
              variant={copiedId === prompt.id ? "default" : "outline"}
              size="sm"
              className={`w-full gap-1 transition-all duration-300 ${
                copiedId === prompt.id ? "bg-green-600 hover:bg-green-700" : ""
              }`}
              onClick={() => handleCopy(prompt.id, prompt.text)}
            >
              {copiedId === prompt.id ? (
                <>
                  <Check className="h-4 w-4 animate-fadeIn" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Prompt</span>
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
