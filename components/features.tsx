import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import {
  Search,
  FileEdit,
  MessageSquare,
  FileSearch,
  CheckCircle2,
  Shield,
  Languages,
  GitBranch,
  ArrowUpRight,
} from "lucide-react"

export function Features() {
  const features = [
    {
      icon: FileEdit,
      title: "AI Patent Drafting",
      description:
        "Generate complete patent specifications and claim sets from an invention disclosure. Expert-trained AI drafts background, summary, detailed description, and multi-dependency claims.",
      tag: "Drafting",
    },
    {
      icon: MessageSquare,
      title: "Office Action Response",
      description:
        "Analyze examiner objections and auto-draft persuasive responses. Map rejections to claim amendments and arguments grounded in the cited prior art.",
      tag: "Prosecution",
    },
    {
      icon: FileSearch,
      title: "Pre-Search & Disclosure Analysis",
      description:
        "Assess invention disclosures before filing. Identify the inventive concept, surface closest prior art, and get a pre-filing patentability read in minutes.",
      tag: "Pre-Search",
    },
    {
      icon: Search,
      title: "Novelty & Prior Art Search",
      description:
        "Semantic search across global patent databases. Rank the most relevant references and pinpoint the exact passages that read on each claim feature.",
      tag: "Search",
    },
    {
      icon: CheckCircle2,
      title: "Validity Analysis",
      description:
        "Stress-test patent validity against prior art with a feature-by-feature claim mapping table and clear novelty / inventive-step conclusions.",
      tag: "Validity",
    },
    {
      icon: Shield,
      title: "Freedom-to-Operate (FTO)",
      description:
        "Compare your product against live patents. Literal and non-literal infringement analysis, including the Actavis doctrine of equivalents from plaintiff, defendant, and neutral perspectives.",
      tag: "FTO",
    },
    {
      icon: Languages,
      title: "Patent Translation",
      description:
        "High-fidelity, terminology-aware translation tuned for patent language across jurisdictions, with custom training to match your house style.",
      tag: "Translation",
    },
    {
      icon: GitBranch,
      title: "Diagram Generation",
      description:
        "Turn dense specifications into clean block and flow diagrams automatically, making complex inventions easy to review and present.",
      tag: "Diagram",
    },
  ]

  return (
    <section id="features" className="bg-secondary/20 py-20 md:py-28">
      <div className="container px-4">
        <Reveal className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            One platform, eight AI tools
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Everything your IP team needs</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            From invention disclosure to enforcement, every stage of the patent lifecycle is powered by purpose-built AI agents.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={index} delay={index * 80}>
              <Card className="gradient-border shimmer-sweep group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
                <div className="absolute right-4 top-4 translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-chart-3/10 transition-all duration-300 group-hover:scale-110 group-hover:from-primary/25 group-hover:to-chart-3/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="mb-2 inline-flex w-fit rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {feature.tag}
                </span>
                <h3 className="mb-2 text-lg font-semibold leading-snug">{feature.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

