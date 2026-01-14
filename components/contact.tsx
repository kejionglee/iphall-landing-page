import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, Calculator } from "lucide-react"
import { openSalesQuotationBotWidget } from "./sales-quotation-widget"

export function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses within 24 hours",
      contact: "marketing@pintas-ip.com",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Phone Consultation",
      description: "Speak directly with our IP experts",
      contact: "+603-7876 5050",
      action: "Schedule Call"
    }
  ]

  const offices = [
    {
      city: "Malaysia Office",
      company: "Pintas Consulting Group Sdn Bhd (461057-W)",
      address: "No. 19, Jalan SS1/36",
      location: "47300 Petaling Jaya, Selangor, Malaysia",
      phone: "+603-7876 5050",
      fax: "+603-7876 2678",
      mobile: "+6012-797 5077",
      email: "marketing@pintas-ip.com",
      hours: "Mon-Fri: 9 AM - 6 PM MYT"
    },
    {
      city: "Pintas Greater China",
      company: "Pintas Guang Zhou Representative Office",
      address: "Room 15, 201, No. 90-96 (Even Numbers), Kexue Avenue",
      location: "Huangpu District, Guangzhou, China",
      phone: "+136 0286 2489",
      email: "pintas.cn@pintas-ip.com",
      hours: "Mon-Fri: 9 AM - 6 PM CST"
    },
    {
      city: "Hong Kong Office",
      company: "Pintas Limited",
      address: "Unit 1603, 16th Floor, The L Plaza",
      location: "367-375 Queen's Road Central, Sheung Wan, Hong Kong",
      mobile: "+852 5734 7369",
      email: "global@pintas-ip.com",
      hours: "Mon-Fri: 9 AM - 6 PM HKT"
    }
  ]

  return (
    <section id="contact" className="bg-secondary/20 py-20 md:py-28">
      <div className="container px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Get in Touch</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Ready to transform your IP management? Our team of experts is here to help you get started.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold">Send us a Message</h3>
            <Card className="p-6">
              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium">Email</label>
                  <Input type="email" placeholder="john@company.com" />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium">Company</label>
                  <Input placeholder="Your Company Name" />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium">Service Interest</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option>Select a service...</option>
                    <option>Patent Search & Analysis</option>
                    <option>AI-Powered Patent Creation</option>
                    <option>Intelligent Filing & Case Management</option>
                    <option>Strategic Enforcement Intelligence</option>
                    <option>Patent Commercialization</option>
                    <option>Enterprise Solution</option>
                  </select>
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Tell us about your IP management needs..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold">Contact Information</h3>
            
            {/* Contact Methods */}
            <div className="mb-8 space-y-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1 font-semibold">{method.title}</h4>
                      <p className="mb-2 text-sm text-muted-foreground">{method.description}</p>
                      <p className="mb-3 font-medium text-primary">{method.contact}</p>
                      <Button variant="outline" size="sm">
                        {method.action}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Office Locations */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">Our Offices</h4>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <h5 className="font-semibold text-lg">{office.city}</h5>
                        <p className="text-sm font-medium text-primary mb-2">{office.company}</p>
                        <p className="text-sm text-muted-foreground">{office.address}</p>
                        <p className="text-sm text-muted-foreground">{office.location}</p>
                        
                        <div className="mt-3 space-y-1">
                          {office.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3 text-primary" />
                              <span className="text-muted-foreground">Tel: {office.phone}</span>
                            </div>
                          )}
                          {office.fax && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3 text-primary" />
                              <span className="text-muted-foreground">Fax: {office.fax}</span>
                            </div>
                          )}
                          {office.mobile && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3 text-primary" />
                              <span className="text-muted-foreground">Mobile: {office.mobile}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-primary" />
                            <span className="text-muted-foreground">{office.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {office.hours}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-lg border bg-gradient-to-r from-primary to-primary/90 p-8 text-center text-primary-foreground">
          <h3 className="mb-2 text-2xl font-semibold">Ready to Get Started?</h3>
          <p className="mb-6 opacity-90">
            Book a personalized demo to see how our AI-powered IP platform can transform your patent management workflow.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Phone className="h-4 w-4" />
              Schedule Call
            </Button>
            <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white" onClick={openSalesQuotationBotWidget}>
              <Calculator className="h-4 w-4" />
              Get Instant Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
