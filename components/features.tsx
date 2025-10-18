import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, FileEdit, Calendar, Shield, TrendingUp, Globe, Target, BarChart3, Users, Zap } from "lucide-react"

export function Features() {
  const features = [
    // Module 1: Patent Search & Analysis
    {
      icon: Search,
      title: "Advanced Patent Search & Analysis",
      description: "Comprehensive patent novelty search, FTO analysis, infringement analysis, technology landscape mapping, and portfolio gap analysis across global jurisdictions.",
    },
    
    // Module 2: AI-Powered Patent Creation & Prosecution
    {
      icon: FileEdit,
      title: "AI-Powered Patent Creation & Prosecution",
      description: "Advanced semantic analysis with LLM reasoning, expert-driven AI training, multi-jurisdictional claim optimization, and intelligent prosecution workflows.",
    },
    
    // Module 3: Intelligent Filing & Case Management
    {
      icon: Calendar,
      title: "Intelligent Filing & Case Management",
      description: "AI-powered deadline intelligence, automated workflow advice, document generation, e-filing, and smart multi-jurisdictional docketing for complete case management.",
    },
    
    // Module 4: Strategic Enforcement Intelligence
    {
      icon: Shield,
      title: "Strategic Enforcement Intelligence",
      description: "Proactive market monitoring, competitor tracking, litigation viability scoring, cost-benefit analysis, and automated evidence dossier collection with chain-of-custody workflows.",
    },
    
    // Module 5: Patent Commercialization & Valuation
    {
      icon: TrendingUp,
      title: "Patent Commercialization & Valuation",
      description: "Multi-method valuation engine, intelligent company matching, automated outreach campaigns, and personalized communications for strategic IP monetization.",
    },
    
    // Cross-Module: Multi-Jurisdictional Management
    {
      icon: Globe,
      title: "Multi-Jurisdictional Management",
      description: "Comprehensive IP management across global jurisdictions with unified workflow, compliance monitoring, and strategic portfolio oversight.",
    },
  ]

  return (
    <section id="features" className="bg-secondary/20 py-20 md:py-28">
      <div className="container px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Comprehensive IP Platform</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Six integrated modules covering the complete patent lifecycle from search to commercialization
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="group p-6 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-pretty text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

