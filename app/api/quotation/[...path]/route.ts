import { NextRequest, NextResponse } from 'next/server'
import { databaseService } from '@/lib/database-service'

// Initialize database service on first API call
let isInitialized = false
async function ensureDatabaseInitialized() {
  if (!isInitialized) {
    await databaseService.initialize()
    isInitialized = true
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const path = url.pathname

  try {
    // Ensure database is initialized
    await ensureDatabaseInitialized()

    if (path === '/api/quotation/services') {
      const services = await databaseService.getServices()
      return NextResponse.json({ services })
    }
    
    if (path.startsWith('/api/quotation/services/') && path.includes('/countries/') && path.includes('/items')) {
      const pathParts = path.split('/')
      const serviceId = pathParts[4]
      const countryId = pathParts[6]
      const items = await databaseService.getItemsForServiceCountry(serviceId, countryId)
      return NextResponse.json({ items })
    }
    
    if (path.startsWith('/api/quotation/services/') && path.includes('/countries')) {
      const pathParts = path.split('/')
      const serviceId = pathParts[4]
      const countries = await databaseService.getCountriesForService(serviceId)
      return NextResponse.json({ countries })
    }
    
    if (path.startsWith('/api/quotation/items/')) {
      const pathParts = path.split('/')
      const itemId = pathParts[3]
      const item = await databaseService.getItemById(itemId)
      if (!item) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 })
      }
      return NextResponse.json({ item })
    }
    
    if (path.startsWith('/api/quotation/generate/')) {
      const pathParts = path.split('/')
      const serviceId = pathParts[4]
      const countryId = pathParts[5]
      const itemId = pathParts[6]
      const quotation = await databaseService.generateQuotationSummary(serviceId, countryId, itemId)
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