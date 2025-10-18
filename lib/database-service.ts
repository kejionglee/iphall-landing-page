// Database service for quotation data using PostgreSQL
import { Pool, PoolClient } from 'pg'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Disable TLS certificate verification for self-signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

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

class DatabaseService {
  private pool: Pool | null = null
  private static instance: DatabaseService

  constructor() {
    if (DatabaseService.instance) {
      return DatabaseService.instance
    }
    DatabaseService.instance = this
  }

  async initialize(): Promise<void> {
    if (this.pool) {
      return // Already initialized
    }

    const DATABASE_URL = process.env.DATABASE_URL
    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set')
    }

    try {
      this.pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
          checkServerIdentity: () => undefined
        },
      })

      // Test the connection
      const client = await this.pool.connect()
      await client.query('SELECT NOW()')
      client.release()

      console.log('Database connection pool created successfully')
    } catch (error) {
      console.error('Failed to connect to database:', error)
      this.pool = null
      throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }


  async getServices(): Promise<Service[]> {
    if (!this.pool) {
      throw new Error('Database not initialized. Please check your database connection.')
    }

    try {
      const client = await this.pool.connect()
      try {
        const result = await client.query('SELECT DISTINCT service FROM quotationlist ORDER BY service')
        return result.rows.map(row => ({
          id: row.service.toLowerCase(),
          name: row.service,
          description: `${row.service} services for intellectual property protection`
        }))
      } finally {
        client.release()
      }
    } catch (error) {
      throw new Error(`Error fetching services from database: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getCountriesForService(serviceName: string): Promise<Country[]> {
    if (!this.pool) {
      throw new Error('Database not initialized. Please check your database connection.')
    }

    try {
      const client = await this.pool.connect()
      try {
        const result = await client.query(
          'SELECT DISTINCT country, currency FROM quotationlist WHERE service = $1 ORDER BY country',
          [serviceName]
        )
        return result.rows.map(row => ({
          id: row.country.toLowerCase().replace(' ', '_'),
          name: row.country,
          currency: row.currency
        }))
      } finally {
        client.release()
      }
    } catch (error) {
      throw new Error(`Error fetching countries for service ${serviceName} from database: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getItemsForServiceCountry(serviceName: string, countryName: string): Promise<ServiceItem[]> {
    if (!this.pool) {
      throw new Error('Database not initialized. Please check your database connection.')
    }

    try {
      const client = await this.pool.connect()
      try {
        const result = await client.query(`
          SELECT item, "prof fee", "official fee", disbursement, currency
          FROM quotationlist
          WHERE service = $1 AND country = $2
          ORDER BY item
        `, [serviceName, countryName])

        return result.rows.map(row => {
          const totalCost = row['prof fee'] + row['official fee'] + row.disbursement
          return {
            id: row.item.toLowerCase().replace(/[^a-z0-9]/g, '_'),
            name: row.item,
            description: `${serviceName} service in ${countryName}`,
            professional_fee: row['prof fee'],
            official_fee: row['official fee'],
            disbursement: row.disbursement,
            currency: row.currency,
            total_cost: totalCost
          }
        })
      } finally {
        client.release()
      }
    } catch (error) {
      throw new Error(`Error fetching items for service ${serviceName} and country ${countryName} from database: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getItemById(itemId: string): Promise<ServiceItem | null> {
    if (!this.pool) {
      throw new Error('Database not initialized. Please check your database connection.')
    }

    try {
      const client = await this.pool.connect()
      try {
        const result = await client.query(`
          SELECT item, "prof fee", "official fee", disbursement, currency, service, country
          FROM quotationlist
          WHERE item = $1
        `, [itemId])

        if (result.rows.length === 0) {
          return null
        }

        const row = result.rows[0]
        const totalCost = row['prof fee'] + row['official fee'] + row.disbursement
        return {
          id: row.item.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          name: row.item,
          description: `${row.service} service in ${row.country}`,
          professional_fee: row['prof fee'],
          official_fee: row['official fee'],
          disbursement: row.disbursement,
          currency: row.currency,
          total_cost: totalCost
        }
      } finally {
        client.release()
      }
    } catch (error) {
      throw new Error(`Error fetching item ${itemId} from database: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async generateQuotationSummary(serviceName: string, countryName: string, itemName: string): Promise<QuotationSummary> {
    if (!this.pool) {
      throw new Error('Database not initialized. Please check your database connection.')
    }

    try {
      const client = await this.pool.connect()
      try {
        const result = await client.query(`
          SELECT item, "prof fee", "official fee", disbursement, currency
          FROM quotationlist
          WHERE service = $1 AND country = $2 AND item ILIKE $3
        `, [serviceName, countryName, `%${itemName}%`])

        if (result.rows.length === 0) {
          throw new Error(`Item not found: ${serviceName} - ${countryName} - ${itemName}`)
        }

        const row = result.rows[0]
        const totalCost = row['prof fee'] + row['official fee'] + row.disbursement
        const quotationId = `Q${Date.now()}`
        const generatedAt = new Date().toISOString()
        const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

        return {
          service: serviceName,
          country: countryName,
          item: {
            id: row.item.toLowerCase().replace(/[^a-z0-9]/g, '_'),
            name: row.item,
            description: `${serviceName} service in ${countryName}`,
            professional_fee: row['prof fee'],
            official_fee: row['official fee'],
            disbursement: row.disbursement,
            currency: row.currency,
            total_cost: totalCost
          },
          quotation_id: quotationId,
          generated_at: generatedAt,
          valid_until: validUntil
        }
      } finally {
        client.release()
      }
    } catch (error) {
      throw new Error(`Error generating quotation summary: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getAllRecordsForService(serviceName: string): Promise<QuotationRecord[]> {
    if (!this.pool) {
      throw new Error('Database not initialized. Please check your database connection.')
    }

    try {
      const client = await this.pool.connect()
      try {
        const result = await client.query(
          'SELECT * FROM quotationlist WHERE service = $1 ORDER BY country, item',
          [serviceName]
        )
        return result.rows.map(row => ({
          id: row.id,
          service: row.service,
          country: row.country,
          item: row.item,
          prof_fee: row['prof fee'],
          official_fee: row['official fee'],
          disbursement: row.disbursement,
          currency: row.currency
        }))
      } finally {
        client.release()
      }
    } catch (error) {
      throw new Error(`Error fetching all records for service ${serviceName}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end()
      this.pool = null
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService()
