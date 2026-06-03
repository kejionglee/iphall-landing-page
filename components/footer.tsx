import { Mail, Phone, ArrowUpRight } from "lucide-react"

export function Footer() {
  const links = {
    Product: [
      { label: "Drafting", href: "#features" },
      { label: "Prior Art Search", href: "#features" },
      { label: "Freedom-to-Operate", href: "#features" },
      { label: "Live Demo", href: "#demo" },
    ],
    Company: [
      { label: "About Pintas IP", href: "#contact" },
      { label: "Contact", href: "#contact" },
      { label: "Pricing", href: "#pricing" },
    ],
  }

  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-secondary/20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[200px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>
      <div className="container px-4 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-3 px-2 shadow-md shadow-primary/30">
                <span className="text-lg font-bold text-primary-foreground">IPHALL</span>
              </div>
              <span className="text-lg font-bold">IP Patent AI Agent</span>
            </div>
            <p className="max-w-xs text-pretty text-sm text-muted-foreground">
              The AI platform for the full patent lifecycle — drafting, search, validity, FTO, and more.
              Built by Pintas IP Group.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Get in touch</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="mailto:marketing@pintas-ip.com" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  marketing@pintas-ip.com
                </a>
              </li>
              <li>
                <a href="tel:+60378765050" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  +603-7876 5050
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Pintas IP Group. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  )
}
