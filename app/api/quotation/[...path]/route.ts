import { NextRequest, NextResponse } from 'next/server'

interface Service {
  id: string
  name: string
  description: string
}

interface Country {
  id: string
  name: string
  currency: string
}

interface ServiceItem {
  id: string
  name: string
  description: string
  professional_fee: number
  official_fee: number
  disbursement: number
  currency: string
  total_cost: number
}

interface QuotationSummary {
  service: string
  country: string
  item: ServiceItem
  quotation_id: string
  generated_at: string
  valid_until: string
}

// Sample data - in production this would come from a database
const SAMPLE_DATA = [
  {
    service: 'COPYRIGHT',
    country: 'LAOS',
    item: 'OFFICIAL COPYRIGHT RECORDATION - FILING NOTIFICATION OF COPYRIGHT AND DESCRIPTION OF COPYRIGHTED WORK WITH LAOS COPYRIGHT OFFICE',
    prof_fee: 500,
    official_fee: 200,
    disbursement: 50,
    currency: 'USD'
  },
  {
    service: 'COPYRIGHT',
    country: 'INDONESIA',
    item: 'OFFICIAL COPYRIGHT RECORDATION - FILING NOTIFICATION OF COPYRIGHT AND DESCRIPTION OF COPYRIGHTED WORK WITH INDONESIA COPYRIGHT OFFICE',
    prof_fee: 600,
    official_fee: 250,
    disbursement: 75,
    currency: 'USD'
  },
  {
    service: 'PATENT',
    country: 'MALAYSIA',
    item: 'DRAFTING - DRAFTING OF PATENT / UTILITY INNOVATION SPECIFICATION ( PRICE RANGE FROM RM7000 TO RM9000 )',
    prof_fee: 2000,
    official_fee: 500,
    disbursement: 100,
    currency: 'MYR'
  }
]

function getServices(): Service[] {
  const services: Service[] = []
  const seenServices = new Set<string>()
  
  for (const item of SAMPLE_DATA) {
    if (!seenServices.has(item.service)) {
      services.push({
        id: item.service.toLowerCase(),
        name: item.service,
        description: `${item.service} services for intellectual property protection`
      })
      seenServices.add(item.service)
    }
  }
  
  return services
}

function getCountriesForService(serviceName: string): Country[] {
  const countries: Country[] = []
  const seenCountries = new Set<string>()
  
  for (const item of SAMPLE_DATA) {
    if (item.service === serviceName && !seenCountries.has(item.country)) {
      countries.push({
        id: item.country.toLowerCase().replace(' ', '_'),
        name: item.country,
        currency: item.currency
      })
      seenCountries.add(item.country)
    }
  }
  
  return countries
}

function getItemsForServiceCountry(serviceName: string, countryName: string): ServiceItem[] {
  const items: ServiceItem[] = []
  
  for (const item of SAMPLE_DATA) {
    if (item.service === serviceName && item.country === countryName) {
      const totalCost = item.prof_fee + item.official_fee + item.disbursement
      items.push({
        id: item.item.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        name: item.item,
        description: `${item.service} service in ${item.country}`,
        professional_fee: item.prof_fee,
        official_fee: item.official_fee,
        disbursement: item.disbursement,
        currency: item.currency,
        total_cost: totalCost
      })
    }
  }
  
  return items
}

function generateQuotationSummary(serviceName: string, countryName: string, itemName: string): QuotationSummary {
  const item = SAMPLE_DATA.find(
    data => data.service === serviceName && 
           data.country === countryName && 
           data.item === itemName
  )
  
  if (!item) {
    throw new Error(`Item not found: ${serviceName} - ${countryName} - ${itemName}`)
  }
  
  const totalCost = item.prof_fee + item.official_fee + item.disbursement
  const quotationId = `Q${Date.now()}`
  const generatedAt = new Date().toISOString()
  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  
  return {
    service: serviceName,
    country: countryName,
    item: {
      id: item.item.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      name: item.item,
      description: `${serviceName} service in ${countryName}`,
      professional_fee: item.prof_fee,
      official_fee: item.official_fee,
      disbursement: item.disbursement,
      currency: item.currency,
      total_cost: totalCost
    },
    quotation_id: quotationId,
    generated_at: generatedAt,
    valid_until: validUntil
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const path = url.pathname

  try {
    if (path === '/api/quotation/services') {
      const services = getServices()
      return NextResponse.json({ services })
    }
    
    if (path.startsWith('/api/quotation/services/') && path.includes('/countries/') && path.includes('/items')) {
      const pathParts = path.split('/')
      const serviceId = pathParts[4]
      const countryId = pathParts[6]
      const items = getItemsForServiceCountry(serviceId, countryId)
      return NextResponse.json({ items })
    }
    
    if (path.startsWith('/api/quotation/services/') && path.includes('/countries')) {
      const pathParts = path.split('/')
      const serviceId = pathParts[4]
      const countries = getCountriesForService(serviceId)
      return NextResponse.json({ countries })
    }
    
    if (path.startsWith('/api/quotation/generate/')) {
      const pathParts = path.split('/')
      const serviceId = pathParts[4]
      const countryId = pathParts[5]
      const itemId = pathParts[6]
      const quotation = generateQuotationSummary(serviceId, countryId, itemId)
      return NextResponse.json(quotation)
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}