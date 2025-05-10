import type { Metadata } from "next"
import SubmitForm from "@/components/submit-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Submit a Prompt | Prompt Marketplace",
  description: "Share your AI prompts with the community",
}

export default function SubmitPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Submit Your Prompt</h1>
            <p className="mt-2 text-muted-foreground">
              Share your best AI prompts with the community. All submissions will be reviewed before being published.
            </p>
          </div>

          <SubmitForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
