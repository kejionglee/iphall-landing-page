export function TrustedBy() {
  const regions = [
    "Malaysia",
    "Singapore",
    "Hong Kong",
    "Greater China",
    "Thailand",
    "Indonesia",
  ]

  return (
    <section className="border-b border-border/40 bg-secondary/20 py-12">
      <div className="container px-4">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Built by Pintas IP Group — serving innovators across Asia-Pacific
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {regions.map((region) => (
            <div
              key={region}
              className="rounded-full border border-border/60 bg-card px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {region}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
