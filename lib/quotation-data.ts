/**
 * Quotation Data Manager with Database API Integration
 */

export interface ServiceItem {
  id: string
  name: string
  description: string
  professional_fee: number
  official_fee: number
  disbursement: number
  currency: string
}

export interface Country {
  id: string
  name: string
  currency: string
}

export interface Service {
  id: string
  name: string
  description: string
}

export interface QuotationSummary {
  service: string
  country: string
  item: ServiceItem & { total_cost: number }
  quotation_id: string
  generated_at: string
  valid_until: string
}

class QuotationDataManager {
  private baseUrl: string

  constructor() {
    this.baseUrl = '/api/quotation'
  }

  async getServices(): Promise<Array<{ id: string; name: string; description: string }>> {
    try {
      const response = await fetch(`${this.baseUrl}/services`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data.services || []
    } catch (error) {
      console.error('Error fetching services:', error)
      throw new Error(`Failed to fetch services: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getCountriesForService(serviceId: string): Promise<Array<{ id: string; name: string; currency: string }>> {
    try {
      const response = await fetch(`${this.baseUrl}/services/${serviceId}/countries`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data.countries || []
    } catch (error) {
      console.error('Error fetching countries:', error)
      throw new Error(`Failed to fetch countries: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getItemsForServiceCountry(serviceId: string, countryId: string): Promise<Array<ServiceItem & { total_cost: number }>> {
    try {
      const response = await fetch(`${this.baseUrl}/services/${serviceId}/countries/${countryId}/items`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data.items || []
    } catch (error) {
      console.error('Error fetching items:', error)
      throw new Error(`Failed to fetch items: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getItemById(itemId: string): Promise<(ServiceItem & { total_cost: number }) | null> {
    try {
      const response = await fetch(`${this.baseUrl}/items/${itemId}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data.item || null
    } catch (error) {
      console.error('Error fetching item:', error)
      throw new Error(`Failed to fetch item: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async generateQuotationSummary(serviceId: string, countryId: string, itemId: string): Promise<QuotationSummary | null> {
    try {
      const response = await fetch(`${this.baseUrl}/generate/${serviceId}/${countryId}/${itemId}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data.quotation || null
    } catch (error) {
      console.error('Error generating quotation:', error)
      throw new Error(`Failed to generate quotation: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

}

// Export singleton instance
export const quotationDataManager = new QuotationDataManager()
