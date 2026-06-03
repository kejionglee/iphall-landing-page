import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="glass sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="group flex items-center gap-2">
            <div className="flex h-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-3 px-2 shadow-md shadow-primary/30 transition-transform group-hover:scale-105">
              <span className="whitespace-nowrap text-lg font-bold text-primary-foreground">IPHALL</span>
            </div>
            <span className="text-xl font-bold">IP Patent AI Agent</span>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#home" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#demo"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Demo
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button className="shimmer-sweep hidden shadow-md shadow-primary/20 transition-transform hover:scale-105 md:inline-flex" asChild>
            <a href="#contact">Book Demo</a>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
