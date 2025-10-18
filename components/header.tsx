import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 items-center justify-center rounded-lg bg-primary px-2">
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
          <Button className="hidden md:inline-flex" asChild>
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
