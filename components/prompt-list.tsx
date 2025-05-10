"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, Copy, Check, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Define our categories - ensure this matches with CategoryBrowser
const CATEGORIES = [
  { id: "all", name: "All Categories" },
  { id: "creative", name: "Creative Writing" },
  { id: "ai-image", name: "AI Image" },
  { id: "chatgpt", name: "ChatGPT" },
  { id: "business", name: "Business" },
  { id: "programming", name: "Programming" },
  { id: "web design", name: "Web Design" },
  { id: "excel sheet", name: "Excel Sheet" },
  { id: "ui/ux", name: "UI/UX" },
  { id: "seo", name: "SEO" },
  { id: "mentor", name: "Mentor" },
  { id: "github", name: "GitHub" },
]

const PROMPTS = [
  {
    id: "1",
    title: "Act as Web Design Consultant",
    text: `I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. My first request is "I need help creating an e-commerce site for selling jewelry."`,
    tool: "ChatGPT",
    upvotes: 0,
    contributor: {
      name: "Arunkumar j",
      profile: "https://www.linkedin.com/in/arun-kumar07/",
    },
    tags: ["Web design", "website"],
    categories: ["web design", "chatgpt"],
  },
  {
    id: "2",
    title: "Excel Sheet",
    text: "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. First, reply me the empty sheet. Reply in English using technical tone for everyone. a persuasive product description for [product] that highlights its [key features]. Target audience is [demographic]. Include benefits, specifications, and a call to action.",
    tool: "Claude",
    upvotes: 0,
    contributor: {
      name: "Arunkumar j",
      profile: "https://www.linkedin.com/in/arun-kumar07/",
    },
    tags: ["Excel Sheet"],
    categories: ["excel sheet"],
  },
  {
    id: "3",
    title: "UI/UX Developer",
    text: `I want you to act as a UX/UI developer. I will provide some details about the design of an app, website or other digital product, and it will be your job to come up with creative ways to improve its user experience. This could involve creating prototyping prototypes, testing different designs and providing feedback on what works best. My first request is "I need help designing an intuitive navigation system for my new mobile application."`,
    tool: "ChatGPT",
    upvotes: 0,
    contributor: {
      name: "Arunkumar j",
      profile: "https://www.linkedin.com/in/arun-kumar07/",
    },
    tags: ["UI/UX", "development"],
    categories: ["ui/ux", "chatgpt"],
  },
  {
    id: "4",
    title: "Software Developer",
    text: "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. I want the system to use JWT for security'",
    tool: "ChatGPT",
    upvotes: 0,
    contributor: {
      name: "Yasar",
      profile: "https://www.linkedin.com/in/mohammed-yasar01",
    },
    tags: ["business", "Software development"],
    categories: ["programming", "chatgpt"],
  },
  {
    id: "5",
    title: "Forntend Developer",
    text: `I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. My first request is "Create Pokemon App that lists pokemons with images that come from PokeAPI sprites endpoint" Reply in English using technical tone for developers.`,
    tool: "Claude",
    upvotes: 0,
    contributor: {
      name: "Yasar",
      profile: "https://www.linkedin.com/in/mohammed-yasar01",
    },
    tags: ["Forntend Developer", "Development"],
    categories: ["programming"],
  },
  {
    id: "6",
    title: "Code Reviewer",
    text: "I want you to act as a Code reviewer who is experienced developer in the given code language. I will provide you with the code block or methods or code file along with the code language name, and I would like you to review the code and share the feedback, suggestions and alternative recommended approaches. Please write explanations behind the feedback or suggestions or alternative approaches. Reply in English using technical tone for developers.",
    tool: "ChatGPT",
    upvotes: 0,
    contributor: {
      name: "Yasar",
      profile: "https://www.linkedin.com/in/mohammed-yasar01",
    },
    tags: ["Code Reviewer", "Development"],
    categories: ["programming", "chatgpt"],
  },
  {
    id: "7",
    title: "SEO Expert",
    text: `Using WebPilot, create an outline for an article that will be 2,000 words on the keyword "Best SEO Prompts" based on the top 10 results from Google. Include every relevant heading possible. Keep the keyword density of the headings high. For each section of the outline, include the word count. Include FAQs section in the outline too, based on people also ask section from Google for the keyword. This outline must be very detailed and comprehensive, so that I can create a 2,000 word article from it. Generate a long list of LSI and NLP keywords related to my keyword. Also include any other words related to the keyword. Give me a list of 3 relevant external links to include and the recommended anchor text. Make sure they're not competing articles. Split the outline into part 1 and part 2.`,
    tool: "Claude",
    upvotes: 0,
    contributor: {
      name: "Arunkumar j",
      profile: "https://www.linkedin.com/in/arun-kumar07/",
    },
    tags: ["SEO", "SEO Expert"],
    categories: ["creative", "seo"],
  },
  {
    id: "8",
    title: "Software Developer Mentor",
    text: "I want you to act as a knowledgeable software development mentor, specifically teaching a junior developer. Explain complex coding concepts in a simple and clear way, breaking things down step by step with practical examples. Use analogies and practical advice to ensure understanding. Anticipate common mistakes and provide tips to avoid them. Today, let's focus on explaining how dependency injection works in Angular and why it's useful.",
    tool: "Claude",
    upvotes: 0,
    contributor: {
      name: "Yasar",
      profile: "https://www.linkedin.com/in/mohammed-yasar01",
    },
    tags: ["Software Developer", "Mentor"],
    categories: ["programming", "mentor"],
  },
  {
    id: "9",
    title: "Github Expert",
    text: `I want you to act as a git and GitHub expert. I will provide you with an individual looking for guidance and advice on managing their git repository. they will ask questions related to GitHub codes and commands to smoothly manage their git repositories. My first request is "I want to fork the awesome-chatgpt-prompts repository and push it back" Reply in English using technical tone for developers.`,
    tool: "Copilot",
    upvotes: 0,
    contributor: {
      name: "Yasar",
      profile: "https://www.linkedin.com/in/mohammed-yasar01",
    },
    tags: ["Github", "GitHub Expert"],
    categories: ["programming", "github"],
  },
  {
    id: "10",
    title: "ToDo list App",
    text: `Create a responsive todo app with HTML5, CSS3 and vanilla JavaScript. The app should have a modern, clean UI using CSS Grid/Flexbox with intuitive controls. Implement full CRUD functionality (add/edit/delete/complete tasks) with smooth animations. Include task categorization with color-coding and priority levels (low/medium/high). Add due dates with a date-picker component and reminder notifications. Use localStorage for data persistence between sessions. Implement search functionality with filters for status, category, and date range. Add drag and drop reordering of tasks using the HTML5 Drag and Drop API. Ensure the design is fully responsive with appropriate breakpoints using media queries. Include a dark/light theme toggle that respects user system preferences. Add subtle micro-interactions and transitions for better UX.`,
    tool: "v0",
    upvotes: 0,
    contributor: {
      name: "Arunkumar j",
      profile: "https://www.linkedin.com/in/arun-kumar07/",
    },
    tags: ["Programming", "Development"],
    categories: ["programming", "vibe code", "V0"],
  },
];

export default function PromptList({
  searchQuery = "",
  sortBy = "newest",
  toolFilter = "all",
  categoryFilter = "all", // Default changed to "all" instead of empty string
  limitDisplay = 0,
}) {
  const { toast } = useToast()
  const [allPrompts] = useState(PROMPTS)
  const [filteredPrompts, setFilteredPrompts] = useState(PROMPTS)
  const [votedPrompts, setVotedPrompts] = useState(new Set())
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedPrompts, setExpandedPrompts] = useState(new Set())

  useEffect(() => {
    let result = [...allPrompts]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(query) ||
          prompt.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply tool filter
    if (toolFilter !== "all") {
      const filter = toolFilter.toLowerCase()
      result = result.filter((prompt) => prompt.tool.toLowerCase() === filter)
    }

    // Apply category filter - fixed to properly handle "all" and match categories case-insensitively
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter((prompt) => 
        prompt.categories.some(cat => cat.toLowerCase() === categoryFilter.toLowerCase())
      )
    }

    // Apply sorting
    if (sortBy === "newest") {
      result = result.sort((a, b) => parseInt(b.id) - parseInt(a.id)) // Assuming higher ID means newer
    } else if (sortBy === "oldest") {
      result = result.sort((a, b) => parseInt(a.id) - parseInt(b.id))
    } else if (sortBy === "upvotes") {
      result = result.sort((a, b) => b.upvotes - a.upvotes)
    }

    // Apply limit if specified
    if (limitDisplay > 0) {
      result = result.slice(0, limitDisplay)
    }

    setFilteredPrompts(result)
  }, [allPrompts, searchQuery, sortBy, toolFilter, categoryFilter, limitDisplay])

  const handleUpvote = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
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

    setFilteredPrompts(
      filteredPrompts.map((prompt) => (prompt.id === id ? { ...prompt, upvotes: prompt.upvotes + 1 } : prompt)),
    )
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

  // Get category name from category id
  const getCategoryName = (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId.toLowerCase())
    return category ? category.name : categoryId
  }

  return (
    <>
      {filteredPrompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg font-medium">No prompts found</p>
          <p className="text-muted-foreground">✨You can also contribute by submitting your own prompt!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrompts.map((prompt) => (
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
                <div className="mb-3 rounded-md bg-muted p-3 text-sm">
                  <p className={expandedPrompts.has(prompt.id) ? "whitespace-pre-wrap" : "line-clamp-3"}>
                    {prompt.text}
                  </p>
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
                    {prompt.categories.map((category) => (
                      <Badge key={category} variant="outline" className="bg-primary/5 text-xs">
                        {getCategoryName(category)}
                      </Badge>
                    ))}
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
      )}
    </>
  )
}