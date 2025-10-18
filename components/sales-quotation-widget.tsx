"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, Minus, Maximize2, Trash2, Send, Calculator, FileText } from "lucide-react"
import { quotationDataManager } from "@/lib/quotation-data"

interface Message {
  sender: "user" | "agent"
  text: string
  timestamp?: string
}

// Global function to open sales quotation bot
let openSalesQuotationBot: (() => void) | null = null

export function openSalesQuotationBotWidget() {
  if (openSalesQuotationBot) {
    openSalesQuotationBot()
  }
}

export function SalesQuotationWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationId, setConversationId] = useState<string | undefined>()
  const [error, setError] = useState<string | null>(null)
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState<string>("service")
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const chatBodyRef = useRef<HTMLDivElement>(null)

  const quotationSuggestions = [
    "I need a quotation",
    "Start quotation process",
    "Get service quote",
    "Begin workflow"
  ]

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages])

  // Set global function to open sales quotation bot
  useEffect(() => {
    openSalesQuotationBot = () => setIsOpen(true)
    return () => {
      openSalesQuotationBot = null
    }
  }, [])

  // Set initial welcome message
  useEffect(() => {
    const setInitialMessage = async () => {
      const services = await quotationDataManager.getServices()
      let welcomeText = "Welcome! Please select an IP service:\n\n"
      services.forEach((service, index) => {
        welcomeText += `${index + 1}. ${service.name}\n`
        welcomeText += `   ${service.description}\n\n`
      })
      
      const welcomeMessage: Message = {
        sender: "agent",
        text: welcomeText,
        timestamp: new Date().toISOString()
      }
      
      setMessages([welcomeMessage])
      setCurrentSuggestions(services.map((_, index) => (index + 1).toString()))
    }
    
    setInitialMessage()
  }, [])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      sender: "user",
      text,
      timestamp: new Date().toISOString()
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    setError(null)

    try {
      // Simulate API call with mock response
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let responseText = ""
      let suggestions: string[] = []
      let step = currentStep
      const lowerText = text.toLowerCase()

      if (currentStep === "service") {
        // Check for service selection
        const services = await quotationDataManager.getServices()
        let selectedServiceName = ""
        
        for (let i = 0; i < services.length; i++) {
          const service = services[i]
          if (lowerText.includes(service.name.toLowerCase()) || 
              lowerText.includes(service.id) || 
              lowerText.includes((i + 1).toString())) {
            selectedServiceName = service.name
            break
          }
        }

        if (selectedServiceName) {
          setSelectedService(selectedServiceName)
          const countries = await quotationDataManager.getCountriesForService(selectedServiceName)
          const service = services.find(s => s.name === selectedServiceName)
          
          responseText = `Great! You've selected ${service?.name}.\n\nPlease select a country:\n`
          countries.forEach((country, index) => {
            responseText += `${index + 1}. ${country.name} (${country.currency})\n`
          })
          
          suggestions = countries.map((_, index) => (index + 1).toString())
          suggestions.push(...countries.map(c => c.name.toLowerCase()))
          step = "country"
        } else {
          // Show available services
          responseText = "Welcome! Please select an IP service:\n\n"
          services.forEach((service, index) => {
            responseText += `${index + 1}. ${service.name}\n   ${service.description}\n\n`
          })
          suggestions = services.map((_, index) => (index + 1).toString())
          suggestions.push(...services.map(s => s.name.toLowerCase()))
        }
      } else if (currentStep === "country") {
        // Check for country selection
        const countries = await quotationDataManager.getCountriesForService(selectedService)
        let selectedCountryName = ""
        
        for (let i = 0; i < countries.length; i++) {
          const country = countries[i]
          if (lowerText.includes(country.name.toLowerCase()) || 
              lowerText.includes(country.id) || 
              lowerText.includes((i + 1).toString())) {
            selectedCountryName = country.name
            break
          }
        }

        if (selectedCountryName) {
          setSelectedCountry(selectedCountryName)
          const items = await quotationDataManager.getItemsForServiceCountry(selectedService, selectedCountryName)
          const services = await quotationDataManager.getServices()
          const service = services.find(s => s.name === selectedService)
          const country = countries.find(c => c.name === selectedCountryName)
          
          responseText = `Perfect! ${service?.name} in ${country?.name}.\n\nPlease select an item:\n`
          items.forEach((item, index) => {
            responseText += `${index + 1}. ${item.name}\n`
            responseText += `   Professional Fee: ${item.currency} ${item.professional_fee.toLocaleString()}\n`
            responseText += `   Official Fee: ${item.currency} ${item.official_fee.toLocaleString()}\n`
            responseText += `   Disbursement: ${item.currency} ${item.disbursement.toLocaleString()}\n`
            responseText += `   **Total: ${item.currency} ${item.total_cost.toLocaleString()}**\n\n`
          })
          
          suggestions = items.map((_, index) => (index + 1).toString())
          suggestions.push(...items.map(item => item.name.toLowerCase().split(' ')[0]))
          step = "item"
        } else {
          // Show available countries again
          const services = await quotationDataManager.getServices()
          const service = services.find(s => s.name === selectedService)
          responseText = `Please select a country for ${service?.name}:\n\n`
          countries.forEach((country, index) => {
            responseText += `${index + 1}. ${country.name} (${country.currency})\n`
          })
          suggestions = countries.map((_, index) => (index + 1).toString())
          suggestions.push(...countries.map(c => c.name.toLowerCase()))
        }
      } else if (currentStep === "item") {
        // Check for item selection
        const items = await quotationDataManager.getItemsForServiceCountry(selectedService, selectedCountry)
        let selectedItemName = ""
        
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (lowerText.includes(item.name.toLowerCase()) || 
              lowerText.includes(item.id) || 
              lowerText.includes((i + 1).toString())) {
            selectedItemName = item.name
            break
          }
        }

        if (selectedItemName) {
          // Add to selected items if not already selected
          if (!selectedItems.includes(selectedItemName)) {
            setSelectedItems([...selectedItems, selectedItemName])
            
            // Show updated selection and ask for more items
            const services = await quotationDataManager.getServices()
            const countries = await quotationDataManager.getCountriesForService(selectedService)
            const service = services.find(s => s.name === selectedService)
            const country = countries.find(c => c.name === selectedCountry)
            
            responseText = `✅ Added: ${selectedItemName}\n\nSelected items:\n`
            const updatedSelectedItems = [...selectedItems, selectedItemName]
            
            for (let i = 0; i < updatedSelectedItems.length; i++) {
              const item = items.find(item => item.name === updatedSelectedItems[i])
              if (item) {
                responseText += `${i + 1}. ${item.name}\n`
                responseText += `   Professional Fee: ${item.currency} ${item.professional_fee.toLocaleString()}\n`
                responseText += `   Official Fee: ${item.currency} ${item.official_fee.toLocaleString()}\n`
                responseText += `   Disbursement: ${item.currency} ${item.disbursement.toLocaleString()}\n`
                responseText += `   **Total: ${item.currency} ${item.total_cost.toLocaleString()}**\n\n`
              }
            }
            
            responseText += `Select more items or type 'done' to proceed:\n\n`
            items.forEach((item, index) => {
              if (!updatedSelectedItems.includes(item.name)) {
                responseText += `${index + 1}. ${item.name}\n`
                responseText += `   Professional Fee: ${item.currency} ${item.professional_fee.toLocaleString()}\n`
                responseText += `   Official Fee: ${item.currency} ${item.official_fee.toLocaleString()}\n`
                responseText += `   Disbursement: ${item.currency} ${item.disbursement.toLocaleString()}\n`
                responseText += `   **Total: ${item.currency} ${item.total_cost.toLocaleString()}**\n\n`
              }
            })
            
            suggestions = items.map((_, index) => (index + 1).toString())
            suggestions.push("done", "finish", "complete", "generate quotation")
          } else {
            responseText = `❌ ${selectedItemName} is already selected.\n\nSelect another item or type 'done' to proceed.`
            suggestions = items.map((_, index) => (index + 1).toString())
            suggestions.push("done", "finish", "complete", "generate quotation")
          }
        } else if (lowerText.includes("done") || lowerText.includes("finish") || lowerText.includes("complete") || lowerText.includes("generate quotation")) {
          // Generate quotation for all selected items
          if (selectedItems.length === 0) {
            responseText = "Please select at least one item before proceeding."
            suggestions = items.map((_, index) => (index + 1).toString())
          } else {
            // Generate quotation summary for all selected items
            const quotationSummaries = []
            let totalProfessionalFee = 0
            let totalOfficialFee = 0
            let totalDisbursement = 0
            let currency = ""
            
            for (const itemName of selectedItems) {
              const quotation = await quotationDataManager.generateQuotationSummary(selectedService, selectedCountry, itemName)
              if (quotation) {
                quotationSummaries.push(quotation)
                totalProfessionalFee += quotation.item.professional_fee
                totalOfficialFee += quotation.item.official_fee
                totalDisbursement += quotation.item.disbursement
                currency = quotation.item.currency
              }
            }
            
            if (quotationSummaries.length > 0) {
              const totalCost = totalProfessionalFee + totalOfficialFee + totalDisbursement
              
              responseText = `**QUOTATION SUMMARY**\n\n`
              responseText += `Service: ${selectedService}\n`
              responseText += `Country: ${selectedCountry}\n\n`
              responseText += `**SELECTED ITEMS:**\n`
              
              quotationSummaries.forEach((quotation, index) => {
                responseText += `${index + 1}. ${quotation.item.name}\n`
                responseText += `   Professional Fee: ${quotation.item.currency} ${quotation.item.professional_fee.toLocaleString()}\n`
                responseText += `   Official Fee: ${quotation.item.currency} ${quotation.item.official_fee.toLocaleString()}\n`
                responseText += `   Disbursement: ${quotation.item.currency} ${quotation.item.disbursement.toLocaleString()}\n`
                responseText += `   **Subtotal: ${quotation.item.currency} ${quotation.item.total_cost.toLocaleString()}**\n\n`
              })
              
              responseText += `**TOTAL COST BREAKDOWN:**\n`
              responseText += `Total Professional Fee: ${currency} ${totalProfessionalFee.toLocaleString()}\n`
              responseText += `Total Official Fee: ${currency} ${totalOfficialFee.toLocaleString()}\n`
              responseText += `Total Disbursement: ${currency} ${totalDisbursement.toLocaleString()}\n`
              responseText += `**GRAND TOTAL: ${currency} ${totalCost.toLocaleString()}**\n\n`
              responseText += `Type 'generate pdf' to create a PDF quotation, or 'new' to start over.`
              
              suggestions = ["generate pdf", "new", "start over"]
              step = "quotation"
            }
          }
        } else {
          // Show available items again
          const services = await quotationDataManager.getServices()
          const service = services.find(s => s.name === selectedService)
          const countries = await quotationDataManager.getCountriesForService(selectedService)
          const country = countries.find(c => c.name === selectedCountry)
          
          responseText = `Please select an item for ${service?.name} in ${country?.name}:\n\n`
          items.forEach((item, index) => {
            responseText += `${index + 1}. ${item.name}\n`
            responseText += `   Professional Fee: ${item.currency} ${item.professional_fee.toLocaleString()}\n`
            responseText += `   Official Fee: ${item.currency} ${item.official_fee.toLocaleString()}\n`
            responseText += `   Disbursement: ${item.currency} ${item.disbursement.toLocaleString()}\n`
            responseText += `   **Total: ${item.currency} ${item.total_cost.toLocaleString()}**\n\n`
          })
          suggestions = items.map((_, index) => (index + 1).toString())
          suggestions.push("done", "finish", "complete", "generate quotation")
        }
      } else if (currentStep === "quotation") {
        if (lowerText.includes("generate") || lowerText.includes("pdf")) {
          // Generate PDF for all selected items
          const quotationSummaries = []
          let totalProfessionalFee = 0
          let totalOfficialFee = 0
          let totalDisbursement = 0
          let currency = ""
          
          for (const itemName of selectedItems) {
            const quotation = await quotationDataManager.generateQuotationSummary(selectedService, selectedCountry, itemName)
            if (quotation) {
              quotationSummaries.push(quotation)
              totalProfessionalFee += quotation.item.professional_fee
              totalOfficialFee += quotation.item.official_fee
              totalDisbursement += quotation.item.disbursement
              currency = quotation.item.currency
            }
          }
          
          if (quotationSummaries.length > 0) {
            const totalCost = totalProfessionalFee + totalOfficialFee + totalDisbursement
            const quotationId = `QUO-${Date.now()}`
            
            responseText = `PDF quotation generated successfully!\n\n`
            responseText += `Quotation ID: ${quotationId}\n`
            responseText += `Service: ${selectedService}\n`
            responseText += `Country: ${selectedCountry}\n`
            responseText += `Items: ${selectedItems.length} selected\n`
            responseText += `Total Cost: ${currency} ${totalCost.toLocaleString()}\n`
            responseText += `Download URL: /api/quotation/download/${quotationId}.pdf\n\n`
            responseText += `The PDF quotation has been prepared for download.`
            
            suggestions = ["new", "start over", "another quotation"]
            step = "service"
          }
        } else if (lowerText.includes("new") || lowerText.includes("start over")) {
          // Reset all selections
          setSelectedService("")
          setSelectedCountry("")
          setSelectedItems([])
          
          const services = await quotationDataManager.getServices()
          responseText = "Starting fresh! Please select an IP service:\n\n"
          services.forEach((service, index) => {
            responseText += `${index + 1}. ${service.name}\n`
            responseText += `   ${service.description}\n\n`
          })
          suggestions = services.map((_, index) => (index + 1).toString())
          suggestions.push(...services.map(s => s.name.toLowerCase()))
          step = "service"
        } else {
          responseText = "Type 'generate pdf' to create a PDF quotation, or 'new' to start over."
          suggestions = ["generate pdf", "new", "start over"]
        }
      }

      const agentMessage: Message = {
        sender: "agent",
        text: responseText,
        timestamp: new Date().toISOString()
      }

      setConversationId(`conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
      setMessages((prev) => [...prev, agentMessage])
      setCurrentStep(step)
      setCurrentSuggestions(suggestions)

    } catch (error) {
      console.error('Error sending message:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message')

      const errorMessage: Message = {
        sender: "agent",
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date().toISOString()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleClear = () => {
    setMessages([])
    setConversationId(undefined)
    setError(null)
    setCurrentSuggestions([])
    setCurrentStep("service")
    setSelectedService("")
    setSelectedCountry("")
    setSelectedItems([])
  }

  const getStepIcon = (step: string) => {
    switch (step) {
      case "service": return "1️⃣"
      case "country": return "2️⃣"
      case "item": return "3️⃣"
      case "quotation": return "4️⃣"
      default: return "📋"
    }
  }

  const getStepDescription = (step: string) => {
    switch (step) {
      case "service": return "Select Service"
      case "country": return "Choose Country"
      case "item": return "Pick Item"
      case "quotation": return "Generate PDF"
      default: return "Workflow"
    }
  }

  return (
    <>
      {/* Sales Quotation Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="fixed bottom-20 right-5 z-50 h-16 w-16 rounded-full shadow-2xl bg-green-600 hover:bg-green-700 text-white font-semibold"
      >
        <div className="flex flex-col items-center gap-1">
          <Calculator className="h-6 w-6" />
          <span className="text-xs">Quote</span>
        </div>
      </Button>

      {/* Sales Quotation Chat Widget */}
      {isOpen && (
        <Card
          className={`fixed bottom-32 right-5 z-50 flex w-96 flex-col overflow-hidden shadow-2xl transition-all sm:w-[500px] lg:w-[600px] ${
            isFullscreen ? "inset-0 h-full w-full rounded-none" : "max-h-[700px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-green-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="font-semibold">Sales Quotation</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={handleClear}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Workflow Progress */}
          {!isMinimized && (
            <div className="bg-green-50 px-4 py-2 border-b">
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-700 font-medium">Step {getStepIcon(currentStep)} {getStepDescription(currentStep)}</span>
                <div className="flex gap-1">
                  <div className={`w-2 h-2 rounded-full ${currentStep === "service" ? "bg-green-600" : "bg-green-200"}`}></div>
                  <div className={`w-2 h-2 rounded-full ${currentStep === "country" ? "bg-green-600" : "bg-green-200"}`}></div>
                  <div className={`w-2 h-2 rounded-full ${currentStep === "item" ? "bg-green-600" : "bg-green-200"}`}></div>
                  <div className={`w-2 h-2 rounded-full ${currentStep === "quotation" ? "bg-green-600" : "bg-green-200"}`}></div>
                </div>
              </div>
            </div>
          )}

          {/* Chat Body */}
          {!isMinimized && (
            <>
              <div ref={chatBodyRef} className="flex-1 space-y-4 overflow-y-auto p-6">
                {messages.length === 0 && (
                  <div className="text-center text-base text-muted-foreground">
                    <p className="mb-3 text-lg font-semibold">Get Service Quotations</p>
                    <p className="mb-4">I'll guide you through our quotation process step by step:</p>
                    <div className="mt-4 text-sm space-y-2">
                      <p>1️⃣ Choose your service type</p>
                      <p>2️⃣ Select your country</p>
                      <p>3️⃣ Pick specific items</p>
                      <p>4️⃣ Generate PDF quotation</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-lg px-5 py-3 text-base ${
                      message.sender === "user" 
                        ? "bg-green-600 text-white" 
                        : "bg-secondary text-secondary-foreground"
                    }`}>
                      <div className="whitespace-pre-wrap leading-relaxed">{message.text}</div>
                      {message.timestamp && (
                        <div className="mt-1 text-xs opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="rounded-lg bg-secondary px-4 py-2 text-sm text-muted-foreground flex items-center gap-2">
                      <div className="animate-spin h-3 w-3 border border-gray-400 border-t-transparent rounded-full"></div>
                      Processing...
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Replies */}
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 border-t bg-secondary/20 p-3">
                  {quotationSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSendMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}

              {/* Dynamic Suggestions from API */}
              {currentSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-3 border-t bg-green-50 p-4">
                  <p className="w-full text-sm text-green-700 font-semibold mb-3">Quick actions:</p>
                  {currentSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-sm border-green-300 text-green-700 hover:bg-green-100 px-4 py-2"
                      onClick={() => handleSendMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex items-center gap-3 border-t p-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
                  placeholder="Type your selection..."
                  className="flex-1 text-base py-3"
                />
                <Button size="icon" className="h-10 w-10" onClick={() => handleSendMessage(input)}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  )
}
