import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Star } from "lucide-react"

export function Hero() {
  const stats = [
    { value: "8", label: "AI tools in one platform" },
    { value: "Global", label: "Multi-jurisdiction coverage" },
    { value: "Minutes", label: "From disclosure to draft" },
    { value: "End-to-end", label: "Full patent lifecycle" },
  ]

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background to-secondary/20"
    >
      {/* Animated grid */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      {/* Decorative floating glow orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-pulse-glow absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="animate-float absolute right-10 top-40 h-[280px] w-[280px] rounded-full bg-chart-3/15 blur-[100px]" />
        <div className="animate-float delay-500 absolute left-10 top-60 h-[220px] w-[220px] rounded-full bg-chart-2/10 blur-[90px]" />
      </div>

      <div className="container px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Sparkles className="h-4 w-4" />
            AI agents for every stage of patent work
          </div>
          <h1 className="animate-fade-in-up delay-100 mb-6 text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Your AI-Powered Partner for{" "}
            <span className="text-gradient-animated">Intellectual Property</span>
          </h1>
          <p className="animate-fade-in-up delay-200 mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Draft, search, analyze, and protect patents faster. From novelty search and AI drafting to
            FTO and validity analysis — IPHALL brings the entire patent lifecycle into one intelligent platform.
          </p>
          <div className="animate-fade-in-up delay-300 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="shimmer-sweep gap-2 shadow-lg shadow-primary/20 transition-transform hover:scale-105" asChild>
              <a href="#contact">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-background/60 backdrop-blur transition-transform hover:scale-105" asChild>
              <a href="#demo">
                <Play className="h-4 w-4" />
                Try the Live Demo
              </a>
            </Button>
          </div>

          {/* Social proof line */}
          <div className="animate-fade-in-up delay-500 mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </span>
            Built by Pintas IP Group — 30+ years of IP expertise
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up delay-700 mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 shadow-xl shadow-primary/5 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="group bg-background p-5 text-center transition-colors hover:bg-primary/5">
                <div className="text-2xl font-bold text-foreground transition-colors group-hover:text-primary md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
