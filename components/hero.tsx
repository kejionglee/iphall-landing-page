import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Your AI-Powered Partner for{" "}
            <span className="bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
              Intellectual Property
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Complete patent lifecycle management: from advanced search and AI-powered creation to enforcement intelligence and commercialization — all in one intelligent platform.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              <Play className="h-4 w-4" />
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
