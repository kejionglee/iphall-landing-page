// Test script for TypeScript database service
import { databaseService } from './lib/database-service'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function testDatabaseService() {
  try {
    console.log('Testing TypeScript Database Service...')
    
    // Initialize database
    await databaseService.initialize()
    console.log('✅ Database initialized successfully')
    
    // Test getServices
    console.log('\n📋 Testing getServices...')
    const services = await databaseService.getServices()
    console.log('Services found:', services.length)
    services.forEach(service => {
      console.log(`  - ${service.name}: ${service.description}`)
    })
    
    // Test getCountriesForService
    console.log('\n🌍 Testing getCountriesForService...')
    const copyrightCountries = await databaseService.getCountriesForService('COPYRIGHT')
    console.log('Countries for COPYRIGHT:', copyrightCountries.length)
    copyrightCountries.forEach(country => {
      console.log(`  - ${country.name} (${country.currency})`)
    })
    
    // Test getItemsForServiceCountry
    console.log('\n📦 Testing getItemsForServiceCountry...')
    const laosItems = await databaseService.getItemsForServiceCountry('COPYRIGHT', 'LAOS')
    console.log('Items for COPYRIGHT in LAOS:', laosItems.length)
    laosItems.forEach(item => {
      console.log(`  - ${item.name}`)
      console.log(`    Professional Fee: ${item.professional_fee} ${item.currency}`)
      console.log(`    Official Fee: ${item.official_fee} ${item.currency}`)
      console.log(`    Disbursement: ${item.disbursement} ${item.currency}`)
      console.log(`    Total Cost: ${item.total_cost} ${item.currency}`)
    })
    
    // Test generateQuotationSummary
    console.log('\n📄 Testing generateQuotationSummary...')
    const quotation = await databaseService.generateQuotationSummary(
      'COPYRIGHT', 
      'LAOS', 
      'OFFICIAL COPYRIGHT RECORDATION - FILING NOTIFICATION OF COPYRIGHT AND DESCRIPTION OF COPYRIGHTED WORK WITH LAOS COPYRIGHT OFFICE'
    )
    console.log('Generated quotation:')
    console.log(`  Service: ${quotation.service}`)
    console.log(`  Country: ${quotation.country}`)
    console.log(`  Item: ${quotation.item.name}`)
    console.log(`  Quotation ID: ${quotation.quotation_id}`)
    console.log(`  Generated At: ${quotation.generated_at}`)
    console.log(`  Valid Until: ${quotation.valid_until}`)
    
    // Test getAllRecordsForService
    console.log('\n📊 Testing getAllRecordsForService...')
    const allCopyrightRecords = await databaseService.getAllRecordsForService('COPYRIGHT')
    console.log('All COPYRIGHT records:', allCopyrightRecords.length)
    allCopyrightRecords.forEach(record => {
      console.log(`  - ${record.service} | ${record.country} | ${record.item}`)
      console.log(`    Fees: ${record.prof_fee} + ${record.official_fee} + ${record.disbursement} = ${record.prof_fee + record.official_fee + record.disbursement} ${record.currency}`)
    })
    
    console.log('\n✅ All database tests completed successfully!')
    
  } catch (error) {
    console.error('❌ Database test failed:', error)
    process.exit(1)
  } finally {
    // Close database connection
    await databaseService.close()
    console.log('🔌 Database connection closed')
  }
}

// Run the test
testDatabaseService()
