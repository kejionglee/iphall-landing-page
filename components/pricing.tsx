import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Star, ArrowRight, Zap, Calculator } from "lucide-react"
import { openSalesQuotationBotWidget } from "./sales-quotation-widget"

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$1,000",
      period: "per project",
      description: "Perfect for individual inventors and small projects",
      features: [
        "Patent novelty search",
        "Basic FTO analysis",
        "Single jurisdiction filing",
        "Email support",
        "Standard turnaround (5-7 days)"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$3,000",
      period: "per project",
      description: "Ideal for growing companies and law firms",
      features: [
        "AI-powered patent drafting",
        "Multi-jurisdictional FTO analysis",
        "Portfolio gap analysis",
        "Priority support",
        "Fast turnaround (3-5 days)",
        "Document automation",
        "Multi-jurisdictional filing coordination"
      ],
      cta: "Choose Professional",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "annual",
      description: "Comprehensive solution for large organizations",
      features: [
        "Complete IP lifecycle management",
        "Self-hosted LLM deployment",
        "Strategic enforcement intelligence",
        "Patent commercialization tools",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 priority support",
        "Unlimited projects"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]

  const addOns = [
    {
      service: "Additional Jurisdiction Filing",
      price: "$1,500 per jurisdiction",
      description: "Extend your patent protection to additional countries"
    },
    {
      service: "Portfolio Valuation Analysis",
      price: "$5,000 - $12,000",
      description: "Comprehensive valuation using multiple analytical methods"
    },
    {
      service: "Enforcement Strategy Development",
      price: "$10,000 - $25,000",
      description: "Market monitoring, litigation planning, and evidence collection"
    },
    {
      service: "Priority Rush Service",
      price: "+50% to base price",
      description: "Expedited processing with 24-48 hour turnaround"
    }
  ]

  return (
    <section id="pricing" className="bg-secondary/20 py-20 md:py-28">
      <div className="container px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Transparent Pricing</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Choose the plan that fits your IP management needs. All plans include our core AI-powered features.
          </p>
        </div>

        {/* Main Pricing Plans */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative flex flex-col p-8 transition-all hover:shadow-lg ${
              plan.popular ? "border-primary shadow-lg shadow-primary/10" : ""
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-semibold">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground"> {plan.period}</span>
                </div>
                <p className="mb-6 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm">
                    <Check className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full gap-2 ${
                  plan.popular ? "bg-primary hover:bg-primary/90" : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="rounded-lg border bg-background p-8">
          <div className="mb-6 text-center">
            <h3 className="mb-2 text-2xl font-semibold">Additional Services</h3>
            <p className="text-muted-foreground">Enhance your IP strategy with these optional add-ons</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {addOns.map((addon, index) => (
              <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{addon.service}</h4>
                  <p className="text-sm font-medium text-primary">{addon.price}</p>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instant Quote Section */}
        <div className="mt-12 rounded-lg border-2 border-green-200 bg-gradient-to-r from-green-50 to-green-100 p-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h3 className="mb-2 text-2xl font-semibold text-green-800">Get Instant Pricing</h3>
          <p className="mb-6 text-green-700">
            Not sure which plan fits your needs? Get an instant, detailed quote for your specific requirements in seconds.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white" onClick={openSalesQuotationBotWidget}>
              <Calculator className="h-4 w-4" />
              Get Instant Quote
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              Schedule Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
