import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { Upload, Sparkles, FileCheck } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Documents",
      description: "Drop in invention disclosures, claims, prior art, or product specs in any format. IPHALL extracts and structures the content automatically.",
    },
    {
      icon: Sparkles,
      title: "AI Does the Heavy Lifting",
      description: "Purpose-built agents draft, search, and analyze — mapping claims feature-by-feature, surfacing prior art, and reasoning through infringement and validity.",
    },
    {
      icon: FileCheck,
      title: "Review & Export",
      description: "Get structured, citable results you can edit, refine, and export to Word — ready for filing, client reports, or internal review.",
    },
  ]

  return (
    <section className="border-b border-border/40 py-20 md:py-28">
      <div className="container px-4">
        <Reveal className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Three simple steps to transform your IP workflow
          </p>
        </Reveal>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />
          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 120}>
              <Card className="gradient-border group relative h-full overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10">
                <div className="absolute right-4 top-4 text-6xl font-bold text-muted/10 transition-colors group-hover:text-primary/10">{index + 1}</div>
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-chart-3/10 transition-transform duration-300 group-hover:scale-110">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-pretty text-muted-foreground">{step.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
