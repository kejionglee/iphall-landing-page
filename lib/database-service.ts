// Database service for quotation data
export interface QuotationRecord {
  id: number
  service: string
  country: string
  item: string
  prof_fee: number
  official_fee: number
  disbursement: number
  currency: string
}

export interface Service {
  id: string
  name: string
  description: string
}

export interface Country {
  id: string
  name: string
  currency: string
}

export interface ServiceItem {
  id: string
  name: string
  description: string
  professional_fee: number
  official_fee: number
  disbursement: number
  currency: string
  total_cost: number
}

export interface QuotationSummary {
  service: string
  country: string
  item: ServiceItem
  quotation_id: string
  generated_at: string
  valid_until: string
}

// Sample data - in production this would come from a real database
const SAMPLE_QUOTATION_DATA: QuotationRecord[] = [
  {
    id: 1,
    service: 'COPYRIGHT',
    country: 'LAOS',
    item: 'OFFICIAL COPYRIGHT RECORDATION - FILING NOTIFICATION OF COPYRIGHT AND DESCRIPTION OF COPYRIGHTED WORK WITH LAOS COPYRIGHT OFFICE',
    prof_fee: 500,
    official_fee: 200,
    disbursement: 50,
    currency: 'USD'
  },
  {
    id: 2,
    service: 'COPYRIGHT',
    country: 'INDONESIA',
    item: 'OFFICIAL COPYRIGHT RECORDATION - FILING NOTIFICATION OF COPYRIGHT AND DESCRIPTION OF COPYRIGHTED WORK WITH INDONESIA COPYRIGHT OFFICE',
    prof_fee: 600,
    official_fee: 250,
    disbursement: 75,
    currency: 'USD'
  },
  {
    id: 3,
    service: 'PATENT',
    country: 'MALAYSIA',
    item: 'DRAFTING - DRAFTING OF PATENT / UTILITY INNOVATION SPECIFICATION ( PRICE RANGE FROM RM7000 TO RM9000 )',
    prof_fee: 2000,
    official_fee: 500,
    disbursement: 100,
    currency: 'MYR'
  },
  {
    id: 4,
    service: 'PATENT',
    country: 'SINGAPORE',
    item: 'PATENT FILING - UTILITY INNOVATION APPLICATION WITH SINGAPORE IP OFFICE',
    prof_fee: 1500,
    official_fee: 300,
    disbursement: 80,
    currency: 'SGD'
  },
  {
    id: 5,
    service: 'TRADEMARK',
    country: 'THAILAND',
    item: 'TRADEMARK REGISTRATION - APPLICATION FOR TRADEMARK PROTECTION IN THAILAND',
    prof_fee: 400,
    official_fee: 150,
    disbursement: 60,
    currency: 'THB'
  }
]

class DatabaseService {
  private data: QuotationRecord[] = SAMPLE_QUOTATION_DATA

  async getServices(): Promise<Service[]> {
    const services: Service[] = []
    const seenServices = new Set<string>()
    
    for (const record of this.data) {
      if (!seenServices.has(record.service)) {
        services.push({
          id: record.service.toLowerCase(),
          name: record.service,
          description: `${record.service} services for intellectual property protection`
        })
        seenServices.add(record.service)
      }
    }
    
    return services
  }

  async getCountriesForService(serviceName: string): Promise<Country[]> {
    const countries: Country[] = []
    const seenCountries = new Set<string>()
    
    for (const record of this.data) {
      if (record.service === serviceName && !seenCountries.has(record.country)) {
        countries.push({
          id: record.country.toLowerCase().replace(' ', '_'),
          name: record.country,
          currency: record.currency
        })
        seenCountries.add(record.country)
      }
    }
    
    return countries
  }

  async getItemsForServiceCountry(serviceName: string, countryName: string): Promise<ServiceItem[]> {
    const items: ServiceItem[] = []
    
    for (const record of this.data) {
      if (record.service === serviceName && record.country === countryName) {
        const totalCost = record.prof_fee + record.official_fee + record.disbursement
        items.push({
          id: record.item.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          name: record.item,
          description: `${record.service} service in ${record.country}`,
          professional_fee: record.prof_fee,
          official_fee: record.official_fee,
          disbursement: record.disbursement,
          currency: record.currency,
          total_cost: totalCost
        })
      }
    }
    
    return items
  }

  async getItemById(itemId: string): Promise<ServiceItem | null> {
    const record = this.data.find(r => 
      r.item.toLowerCase().replace(/[^a-z0-9]/g, '_') === itemId
    )
    
    if (!record) return null
    
    const totalCost = record.prof_fee + record.official_fee + record.disbursement
    return {
      id: record.item.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      name: record.item,
      description: `${record.service} service in ${record.country}`,
      professional_fee: record.prof_fee,
      official_fee: record.official_fee,
      disbursement: record.disbursement,
      currency: record.currency,
      total_cost: totalCost
    }
  }

  async generateQuotationSummary(serviceName: string, countryName: string, itemName: string): Promise<QuotationSummary> {
    const record = this.data.find(r => 
      r.service === serviceName && 
      r.country === countryName && 
      r.item === itemName
    )
    
    if (!record) {
      throw new Error(`Item not found: ${serviceName} - ${countryName} - ${itemName}`)
    }
    
    const totalCost = record.prof_fee + record.official_fee + record.disbursement
    const quotationId = `Q${Date.now()}`
    const generatedAt = new Date().toISOString()
    const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    
    return {
      service: serviceName,
      country: countryName,
      item: {
        id: record.item.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        name: record.item,
        description: `${serviceName} service in ${countryName}`,
        professional_fee: record.prof_fee,
        official_fee: record.official_fee,
        disbursement: record.disbursement,
        currency: record.currency,
        total_cost: totalCost
      },
      quotation_id: quotationId,
      generated_at: generatedAt,
      valid_until: validUntil
    }
  }

  async getAllRecordsForService(serviceName: string): Promise<QuotationRecord[]> {
    return this.data.filter(record => record.service === serviceName)
  }

  // Method to add new records (for future database integration)
  async addRecord(record: Omit<QuotationRecord, 'id'>): Promise<QuotationRecord> {
    const newRecord: QuotationRecord = {
      id: Math.max(...this.data.map(r => r.id)) + 1,
      ...record
    }
    this.data.push(newRecord)
    return newRecord
  }

  // Method to update records
  async updateRecord(id: number, updates: Partial<Omit<QuotationRecord, 'id'>>): Promise<QuotationRecord | null> {
    const index = this.data.findIndex(r => r.id === id)
    if (index === -1) return null
    
    this.data[index] = { ...this.data[index], ...updates }
    return this.data[index]
  }

  // Method to delete records
  async deleteRecord(id: number): Promise<boolean> {
    const index = this.data.findIndex(r => r.id === id)
    if (index === -1) return false
    
    this.data.splice(index, 1)
    return true
  }
}

// Export singleton instance
export const databaseService = new DatabaseService()
