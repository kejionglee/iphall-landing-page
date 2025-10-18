import { Card } from "@/components/ui/card"
import { FileText, Sparkles, Zap } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Input Your Data",
      description: "Upload invention disclosures, patent documents, or IP portfolios in any format for comprehensive analysis.",
    },
    {
      icon: Sparkles,
      title: "AI Analysis",
      description: "Our advanced AI processes your data, conducts multi-jurisdictional searches, and provides strategic insights across the complete patent lifecycle.",
    },
    {
      icon: Zap,
      title: "Take Action",
      description: "Execute comprehensive IP strategies: from patent creation and prosecution to enforcement intelligence and commercialization.",
    },
  ]

  return (
    <section className="border-b border-border/40 py-20 md:py-28">
      <div className="container px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Three simple steps to transform your IP workflow
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden p-8 transition-all hover:shadow-lg">
              <div className="absolute right-4 top-4 text-6xl font-bold text-muted/10">{index + 1}</div>
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-pretty text-muted-foreground">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
