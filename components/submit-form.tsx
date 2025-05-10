"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import PromptPreview from "@/components/prompt-preview"
import confetti from "canvas-confetti"

const formSchema = z
  .object({
    contributorName: z.string().min(2, {
      message: "Contributor name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    socialLink: z.string().url({
      message: "Please enter a valid URL for your LinkedIn or Twitter profile.",
    }),
    promptTitle: z.string().min(5, {
      message: "Prompt title must be at least 5 characters.",
    }),
    promptText: z.string().min(10, {
      message: "Prompt text must be at least 10 characters.",
    }),
    aiTool: z.string().min(1, {
      message: "Please select an AI tool.",
    }),
    customAiTool: z.string().optional(),
    tags: z.string().min(1, {
      message: "Please add at least one tag.",
    }),
  })
  .refine(
    (data) => {
      if (data.aiTool === "Other" && (!data.customAiTool || data.customAiTool.length < 2)) {
        return false
      }
      return true
    },
    {
      message: "Please specify the AI tool",
      path: ["customAiTool"],
    }
  )

export default function SubmitForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contributorName: "",
      email: "",
      socialLink: "",
      promptTitle: "",
      promptText: "",
      aiTool: "",
      customAiTool: "",
      tags: "",
    },
  })

  const selectedAiTool = form.watch("aiTool")
  const watchedValues = form.watch()

  const previewData = useMemo(() => ({
    contributorName: watchedValues.contributorName,
    promptTitle: watchedValues.promptTitle,
    promptText: watchedValues.promptText,
    aiTool: watchedValues.aiTool,
    customAiTool: watchedValues.customAiTool,
    tags: watchedValues.tags,
  }), [watchedValues])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      await fetch("https://script.google.com/macros/s/AKfycbz3o6PtX02FkuNQv5KoHaAhL_buo9HCaYFVrI3_m1Vd4ARYZl4KbSomxHxG5KeAc-k/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      setShowSuccess(true)
      setIsSubmitting(false)

      toast({
        title: "Prompt submitted successfully!",
        description: "Your prompt has been submitted for review.",
      })

      setTimeout(() => {
        router.push("/prompts")
      }, 6000)
    } catch (error) {
      console.error("Submission error:", error)
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "Failed to submit the prompt. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center shadow-sm">
        <div className="mb-6 rounded-full bg-primary/10 p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-bold">Submission Successful!</h2>
        <p className="mb-6 text-muted-foreground">Your prompt will be live in 24 hours. Thanks for contributing!</p>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
         <Button
            variant="outline"
            onClick={() => {
              window.location.href = "/submit"; // adjust path if different
            }}
          >
              Submit another prompt
            </Button>

          <Button onClick={() => router.push("/prompts")}>Browse Prompts</Button>
        </div>
        <p className="text-sm text-muted-foreground">You will be Redirected to the prompts page in a few seconds...</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Contributor Information */}
        <div className="rounded-lg border p-6 sm:p-6">
          <h2 className="mb-6 text-xl font-semibold">Contributor Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contributorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormDescription>Your name will be displayed as the prompt contributor.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" type="email" {...field} />
                  </FormControl>
                  <FormDescription>We'll notify you when your prompt is approved.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn, Twitter URL or Github id</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/john" {...field} />
                  </FormControl>
                  <FormDescription>Your profile link will be displayed with your prompt.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Prompt Details */}
        <div className="rounded-lg border p-6 sm:p-6">
          <h2 className="mb-6 text-xl font-semibold">Prompt Details</h2>
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="promptTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Creative Story Generator" {...field} />
                  </FormControl>
                  <FormDescription>A concise, descriptive title for your prompt.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="promptText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your prompt text here..." className="min-h-32" {...field} />
                  </FormControl>
                  <FormDescription>The actual prompt text that users will copy and use with AI tools.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* AI Tool */}
            <div className={selectedAiTool === "Other" ? "grid gap-4 md:grid-cols-2" : ""}>
              <FormField
                control={form.control}
                name="aiTool"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Tool</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the AI tool this prompt is for" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ChatGPT">ChatGPT</SelectItem>
                        <SelectItem value="GPT-4">GPT-4</SelectItem>
                        <SelectItem value="Claude">Claude</SelectItem>
                        <SelectItem value="DeepSeek">DeepSeek</SelectItem>
                        <SelectItem value="Grok">Grok</SelectItem>
                        <SelectItem value="Perplexity">Perplexity</SelectItem>
                        <SelectItem value="Midjourney">Midjourney</SelectItem>
                        <SelectItem value="Runway">Runway</SelectItem>
                        <SelectItem value="v0">v0</SelectItem>
                        <SelectItem value="Cursor">Cursor</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the AI tool this prompt works best with.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedAiTool === "Other" && (
                <FormField
                  control={form.control}
                  name="customAiTool"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specify AI Tool</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Gemini, Stable Diffusion, etc." {...field} />
                      </FormControl>
                      <FormDescription>Please specify which AI tool this prompt is for.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., writing, creative, business (comma separated)" {...field} />
                  </FormControl>
                  <FormDescription>Add relevant tags to help others discover your prompt (comma separated).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Prompt"}
          </Button>
        </div>
      </form>
    </Form>
    </div>

    <div className="hidden lg:col-span-2 lg:block">
      <PromptPreview description={""} title={""} {...previewData} />
    </div>

    <div className="block lg:hidden">
      <details className="rounded-lg border">
        <summary className="cursor-pointer p-4 font-medium">Preview Your Prompt</summary>
        <div className="p-4 pt-0">
          <PromptPreview title={""} description={watchedValues.promptTitle} {...previewData} />
        </div>
      </details>
    </div>
  </div>
  )
}