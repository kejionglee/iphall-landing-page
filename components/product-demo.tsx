"use client"

import { useEffect, useRef, useState } from "react"
import {
  FileEdit,
  MessageSquare,
  FileSearch,
  Search,
  CheckCircle2,
  Shield,
  Languages,
  GitBranch,
  Check,
  X,
  Sparkles,
  ArrowRight,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type ToolKey =
  | "fto"
  | "search"
  | "drafting"
  | "validity"
  | "oa"
  | "translation"
  | "presearch"
  | "diagram"

const TOOLS: { key: ToolKey; label: string; icon: typeof Shield }[] = [
  { key: "drafting", label: "Drafting", icon: FileEdit },
  { key: "oa", label: "Office Action", icon: MessageSquare },
  { key: "presearch", label: "Pre-Search", icon: FileSearch },
  { key: "search", label: "Search", icon: Search },
  { key: "validity", label: "Validity", icon: CheckCircle2 },
  { key: "fto", label: "FTO", icon: Shield },
  { key: "translation", label: "Translation", icon: Languages },
  { key: "diagram", label: "Diagram", icon: GitBranch },
]

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
        ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      {label}
    </span>
  )
}

function FtoDemo() {
  const rows = [
    { part: "a", feature: "A harvesting apparatus for a fruit or vegetable product", found: true },
    { part: "b", feature: "a maturity determination device that determines a maturity level", found: true },
    { part: "c", feature: "a harvester controlled by an optical ripeness sensor", found: false },
  ]
  const questions = [
    { n: 1, q: "Substantially the same result?", a: "YES" },
    { n: 2, q: "Obvious to skilled person?", a: "YES" },
    { n: 3, q: "Strict compliance intended?", a: "NO" },
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-900">Claim 1 — Feature Mapping</h4>
        <StatusPill ok={false} label="No literal infringement" />
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-3 py-2 font-medium">Part</th>
              <th className="px-3 py-2 font-medium">Claim Feature</th>
              <th className="px-3 py-2 font-medium">In Product</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.part} className="bg-white">
                <td className="px-3 py-2 font-mono text-slate-400">{r.part}</td>
                <td className="px-3 py-2 text-slate-700">{r.feature}</td>
                <td className="px-3 py-2">
                  {r.found ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
          Non-Literal Infringement · Actavis (Doctrine of Equivalents)
        </p>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
            V1 · Plaintiff: YES / YES / NO
          </span>
          <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
            V2 · Defendant: NO / NO / YES
          </span>
          <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
            V3 · Neutral Court
          </span>
        </div>
        <div className="space-y-1.5">
          {questions.map((q) => (
            <div key={q.n} className="flex items-center gap-2 text-xs">
              <span className="text-blue-600">◆</span>
              <span className="text-slate-700">Q{q.n}: {q.q}</span>
              <span
                className={`ml-auto rounded border px-1.5 py-0.5 font-bold ${
                  q.a === "YES"
                    ? "border-blue-300 bg-blue-50 text-blue-700"
                    : "border-slate-300 bg-white text-slate-600"
                }`}
              >
                {q.a}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SearchDemo() {
  const results = [
    { id: "US10,123,456 B2", title: "Automated fruit ripeness detection system", score: 94 },
    { id: "EP3 210 987 A1", title: "Optical sensor array for crop maturity", score: 88 },
    { id: "WO2019/112233", title: "Harvesting robot with vision guidance", score: 81 },
    { id: "US9,876,543 B1", title: "Machine learning produce grading", score: 76 },
  ]
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-slate-900">Prior Art Search — 4 ranked references</h4>
      {results.map((r) => (
        <div
          key={r.id}
          className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3"
        >
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-slate-100">
            <FileText className="h-4 w-4 text-slate-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-900">{r.id}</p>
            <p className="truncate text-xs text-slate-500">{r.title}</p>
          </div>
          <div className="flex flex-none items-center gap-2">
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-primary" style={{ width: `${r.score}%` }} />
            </div>
            <span className="w-8 text-right text-xs font-bold text-primary">{r.score}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function DraftingDemo() {
  return (
    <div className="space-y-3 text-xs leading-relaxed text-slate-700">
      <h4 className="text-sm font-semibold text-slate-900">Generated Claim Set</h4>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="mb-2">
          <span className="font-semibold text-slate-900">1.</span> A harvesting apparatus comprising:
        </p>
        <p className="pl-4 text-slate-600">
          a maturity determination device configured to determine a maturity level of a fruit or vegetable
          product based on captured image data;
        </p>
        <p className="mt-1 pl-4 text-slate-600">
          a harvester operatively coupled to the maturity determination device and configured to selectively
          harvest the product when the maturity level satisfies a threshold.
        </p>
        <p className="mt-3">
          <span className="font-semibold text-slate-900">2.</span>{" "}
          <span className="text-slate-600">
            The apparatus of claim 1, wherein the maturity determination device comprises a multispectral
            imaging sensor.
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs text-green-700">
        <Sparkles className="h-3.5 w-3.5" />
        Drafted from invention disclosure in 12 seconds
      </div>
    </div>
  )
}

function ValidityDemo() {
  const rows = [
    { f: "Maturity determination device", anticipated: true },
    { f: "Optical ripeness sensor", anticipated: false },
    { f: "Selective harvesting mechanism", anticipated: true },
  ]
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-900">Validity vs. US10,123,456</h4>
        <StatusPill ok label="Likely valid (inventive step)" />
      </div>
      {rows.map((r) => (
        <div
          key={r.f}
          className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-xs"
        >
          <span className="text-slate-700">{r.f}</span>
          {r.anticipated ? (
            <span className="text-red-500">Disclosed</span>
          ) : (
            <span className="font-medium text-green-600">Novel</span>
          )}
        </div>
      ))}
    </div>
  )
}

function OaDemo() {
  return (
    <div className="space-y-3 text-xs">
      <h4 className="text-sm font-semibold text-slate-900">Office Action Response Draft</h4>
      <div className="rounded-lg border-l-2 border-red-300 bg-red-50 p-3">
        <p className="font-semibold text-red-700">§103 Rejection — Claims 1-3</p>
        <p className="mt-1 text-slate-600">Obvious over Smith (US9,876) in view of Tan (EP3 210).</p>
      </div>
      <div className="rounded-lg border-l-2 border-green-400 bg-green-50 p-3">
        <p className="font-semibold text-green-700">Suggested Response</p>
        <p className="mt-1 text-slate-600">
          Smith fails to teach the multispectral maturity sensor of amended claim 1. The combination lacks
          motivation, as Tan teaches away from optical sensing. Amend claim 1 to recite "multispectral imaging
          sensor" to overcome the rejection.
        </p>
      </div>
    </div>
  )
}

function TranslationDemo() {
  return (
    <div className="space-y-3 text-xs">
      <h4 className="text-sm font-semibold text-slate-900">EN → ZH Patent Translation</h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="mb-1 font-medium text-slate-400">Source (EN)</p>
          <p className="text-slate-700">
            A harvesting apparatus comprising a maturity determination device configured to determine a
            maturity level.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="mb-1 font-medium text-slate-400">Target (ZH)</p>
          <p className="text-slate-700">
            一种收割设备，包括成熟度确定装置，所述成熟度确定装置被配置为确定成熟度水平。
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-green-700">
        <Check className="h-3.5 w-3.5" /> Terminology-consistent · house-style tuned
      </div>
    </div>
  )
}

function PreSearchDemo() {
  return (
    <div className="space-y-3 text-xs">
      <h4 className="text-sm font-semibold text-slate-900">Pre-Filing Assessment</h4>
      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <p className="font-semibold text-slate-900">Inventive concept</p>
        <p className="mt-1 text-slate-600">
          Multispectral maturity sensing combined with selective robotic harvesting.
        </p>
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
        <span className="text-slate-700">Patentability outlook</span>
        <div className="ml-auto flex items-center gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-2 w-6 rounded-full bg-green-500" />
          ))}
          <div className="h-2 w-6 rounded-full bg-slate-200" />
        </div>
        <span className="font-semibold text-green-600">Strong</span>
      </div>
    </div>
  )
}

function DiagramDemo() {
  return (
    <div className="space-y-3 text-xs">
      <h4 className="text-sm font-semibold text-slate-900">Auto-Generated Block Diagram</h4>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 bg-white p-5">
        <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-2 font-medium text-primary">
          Image Sensor (10)
        </div>
        <ArrowRight className="h-4 w-4 rotate-90 text-slate-400" />
        <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-2 font-medium text-primary">
          Maturity Determination Device (20)
        </div>
        <ArrowRight className="h-4 w-4 rotate-90 text-slate-400" />
        <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-2 font-medium text-primary">
          Harvester (30)
        </div>
      </div>
    </div>
  )
}

const DEMOS: Record<ToolKey, () => React.JSX.Element> = {
  fto: FtoDemo,
  search: SearchDemo,
  drafting: DraftingDemo,
  validity: ValidityDemo,
  oa: OaDemo,
  translation: TranslationDemo,
  presearch: PreSearchDemo,
  diagram: DiagramDemo,
}

const TITLES: Record<ToolKey, string> = {
  fto: "Freedom-to-Operate Analysis",
  search: "Prior Art Search",
  drafting: "AI Patent Drafting",
  validity: "Validity Analysis",
  oa: "Office Action Response",
  translation: "Patent Translation",
  presearch: "Pre-Search & Disclosure",
  diagram: "Diagram Generation",
}

export function ProductDemo() {
  const [active, setActive] = useState<ToolKey>("fto")
  const [autoplay, setAutoplay] = useState(true)
  const [animKey, setAnimKey] = useState(0)
  const ActiveDemo = DEMOS[active]
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Auto-rotate through tools until the user interacts
  useEffect(() => {
    if (!autoplay) return
    timerRef.current = setInterval(() => {
      setActive((prev) => {
        const idx = TOOLS.findIndex((t) => t.key === prev)
        return TOOLS[(idx + 1) % TOOLS.length].key
      })
    }, 3500)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [autoplay])

  // Re-trigger the fade animation whenever the active tool changes
  useEffect(() => {
    setAnimKey((k) => k + 1)
  }, [active])

  const selectTool = (key: ToolKey) => {
    setAutoplay(false)
    setActive(key)
  }

  return (
    <section id="demo" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>
      <div className="container px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Live product preview
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">See IPHALL in action</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Click any tool to preview the real workspace — the same interface your team uses every day.
          </p>
        </div>

        {/* Browser window chrome */}
        <div className="group/window mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl shadow-primary/15 ring-1 ring-primary/5 transition-shadow hover:shadow-primary/25">
          <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/40 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="mx-auto flex items-center gap-2 rounded-md bg-background/80 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              app.iphall.com / {active}
            </div>
            <span
              className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                autoplay ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${autoplay ? "animate-pulse bg-primary" : "bg-muted-foreground"}`} />
              {autoplay ? "Auto-playing" : "Manual"}
            </span>
          </div>

          <div className="grid md:grid-cols-[200px_1fr]">
            {/* App sidebar */}
            <div className="hidden border-r border-border/60 bg-secondary/20 p-3 md:block">
              <div className="mb-4 flex items-center gap-2 px-2">
                <div className="flex h-7 items-center justify-center rounded-md bg-primary px-2">
                  <span className="text-xs font-bold text-primary-foreground">IPHALL</span>
                </div>
              </div>
              <nav className="space-y-1">
                {TOOLS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => selectTool(t.key)}
                    className={`relative flex w-full items-center gap-2 overflow-hidden rounded-md px-2.5 py-2 text-left text-sm transition-all ${
                      active === t.key
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {active === t.key && (
                      <span className="absolute left-0 top-0 h-full w-0.5 bg-primary" />
                    )}
                    <t.icon className="h-4 w-4 flex-none" />
                    {t.label}
                    {autoplay && active === t.key && (
                      <span
                        key={animKey}
                        className="absolute bottom-0 left-0 h-0.5 bg-primary/40"
                        style={{ animation: "shimmer-progress 3.5s linear forwards" }}
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Workspace */}
            <div className="min-h-[440px] bg-white p-5 md:p-6">
              {/* Mobile tool tabs */}
              <div className="mb-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
                {TOOLS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => selectTool(t.key)}
                    className={`flex-none rounded-full px-3 py-1 text-xs transition-colors ${
                      active === t.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">{TITLES[active]}</h3>
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  Completed
                </span>
              </div>

              <div key={animKey} className="animate-fade-in-up">
                <ActiveDemo />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2" asChild>
            <a href="#contact">
              Book a Full Demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
            <a href="#features">Browse all tools</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
