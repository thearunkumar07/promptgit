import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, ThumbsUp, ExternalLink } from "lucide-react"
import Link from "next/link"

interface PromptPreviewProps {
  title: string
  description: string
  promptText: string
  aiTool: string
  customAiTool?: string
  tags: string[] | string
  contributorName: string
}

export default function PromptPreview({
  title = "Your Prompt Title",
  description = "Your prompt description will appear here",
  promptText = "Your prompt text will appear here",
  aiTool = "",
  customAiTool = "",
  tags = [],
  contributorName = "Your Name",
}: PromptPreviewProps) {
  // Format tags from comma-separated string if needed
  const formattedTags =
    typeof tags === "string"
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : Array.isArray(tags)
        ? tags
        : []

  // Get the display tool name
  const displayTool = aiTool === "Other" && customAiTool ? customAiTool : aiTool

  return (
    <div className="sticky top-4">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-medium">Preview</h3>
        <p className="text-sm text-muted-foreground">How your prompt will appear on the marketplace</p>
      </div>
      <Card className="flex h-full flex-col transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="line-clamp-1 text-lg">{title || "Your Prompt Title"}</CardTitle>
            {displayTool && (
              <Badge variant="outline" className="ml-2 shrink-0">
                {displayTool}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-2">
          <p className="mb-3 text-sm text-muted-foreground">
            {description || "Your prompt description will appear here"}
          </p>
          <div className="mb-3 rounded-md bg-muted p-3 text-sm">
            <p className="line-clamp-3">{promptText || "Your prompt text will appear here"}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {formattedTags.length > 0 ? (
              formattedTags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">Add tags to your prompt</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pt-0">
          <div className="flex w-full items-center justify-between text-sm">
            <Link href="#" className="flex items-center gap-1 text-muted-foreground hover:text-primary hover:underline">
              By {contributorName || "Your Name"}
              <ExternalLink className="h-3 w-3" />
            </Link>
            <Button variant="ghost" size="sm" className="gap-1 transition-transform duration-200">
              <ThumbsUp className="h-4 w-4 transition-colors duration-300" />
              <span className="transition-all duration-300">0</span>
            </Button>
          </div>
          <Button variant="outline" size="sm" className="w-full gap-1 transition-all duration-300">
            <Copy className="h-4 w-4" />
            <span>Copy Prompt</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
