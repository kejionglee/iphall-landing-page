import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Contact } from "@/components/contact"
import { TrustedBy } from "@/components/trusted-by"
import { SalesQuotationWidget } from "@/components/sales-quotation-widget"

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header />
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <Features />
      <Pricing />
      <Contact />
      <SalesQuotationWidget />
    </main>
  )
}
