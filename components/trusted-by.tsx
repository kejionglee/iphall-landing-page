export function TrustedBy() {
  const companies = [
    { name: "Client One", logo: "C1" },
    { name: "Client Two", logo: "C2" },
    { name: "Client Three", logo: "C3" },
    { name: "Client Four", logo: "C4" },
    { name: "Client Five", logo: "C5" },
  ]

  return (
    <section className="border-b border-border/40 bg-secondary/20 py-12">
      <div className="container px-4">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by leading IP professionals (sample data)
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {companies.map((company) => (
            <div key={company.name} className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
                <span className="text-sm font-bold">{company.logo}</span>
              </div>
              <span className="text-lg font-semibold">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
