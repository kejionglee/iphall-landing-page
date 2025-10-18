import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'

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

// Function to call Python database functions
async function callPythonDatabase(functionName: string, ...args: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', [
      '-c',
      `
import sys
import os
import asyncio
import json
sys.path.append('${process.cwd()}/lib')

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

from database import db_manager

async def main():
    try:
        # Initialize database if not already done
        if not db_manager.connection_pool:
            await db_manager.initialize()
            await db_manager.insert_sample_data()
        
        # Call the requested function
        if "${functionName}" == "get_services":
            result = await db_manager.get_services()
        elif "${functionName}" == "get_countries_for_service":
            service_name = "${args[0] || ''}"
            print(f"DEBUG: Getting countries for service: '{service_name}'")
            result = await db_manager.get_countries_for_service(service_name)
            print(f"DEBUG: Result: {result}")
        elif "${functionName}" == "get_items_for_service_country":
            result = await db_manager.get_items_for_service_country("${args[0] || ''}", "${args[1] || ''}")
        elif "${functionName}" == "get_item_by_id":
            result = await db_manager.get_item_by_id("${args[0] || ''}")
        elif "${functionName}" == "generate_quotation_summary":
            result = await db_manager.generate_quotation_summary("${args[0] || ''}", "${args[1] || ''}", "${args[2] || ''}")
        else:
            result = {"error": "Unknown function"}
        
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

asyncio.run(main())
      `
    ], {
      cwd: process.cwd(),
      env: { ...process.env }
    })

    let output = ''
    let error = ''

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString()
    })

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString()
    })

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python process exited with code ${code}: ${error}`))
        return
      }

      try {
        const lines = output.trim().split('\n')
        let jsonLine = ''
        
        for (const line of lines) {
          const trimmedLine = line.trim()
          if (trimmedLine.startsWith('{') || trimmedLine.startsWith('[')) {
            jsonLine = trimmedLine
            break
          }
        }
        
        if (!jsonLine) {
          throw new Error('No valid JSON found in output')
        }
        
        const result = JSON.parse(jsonLine)
        resolve(result)
      } catch (parseError) {
        reject(new Error(`Failed to parse Python output: ${parseError}`))
      }
    })

    pythonProcess.on('error', (err) => {
      reject(new Error(`Failed to spawn Python process: ${err.message}`))
    })
  })
}

// GET /api/quotation/services
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const path = url.pathname

  try {
    if (path === '/api/quotation/services') {
      const services = await callPythonDatabase('get_services')
      return NextResponse.json({ services })
    }
    
    if (path.startsWith('/api/quotation/services/') && path.includes('/countries/') && path.includes('/items')) {
      const pathParts = path.split('/')
      const serviceId = pathParts[4]  // Fixed: should be index 4, not 3
      const countryId = pathParts[6]  // Fixed: should be index 6, not 5
      const items = await callPythonDatabase('get_items_for_service_country', serviceId, countryId)
      return NextResponse.json({ items })
    }
    
    if (path.startsWith('/api/quotation/services/') && path.includes('/countries')) {
      const pathParts = path.split('/')
      const serviceId = pathParts[4]  // Fixed: should be index 4, not 3
      const countries = await callPythonDatabase('get_countries_for_service', serviceId)
      return NextResponse.json({ countries })
    }
    
    if (path.startsWith('/api/quotation/items/')) {
      const pathParts = path.split('/')
      const itemId = pathParts[3]
      const item = await callPythonDatabase('get_item_by_id', itemId)
      return NextResponse.json({ item })
    }
    
    if (path.startsWith('/api/quotation/generate/')) {
      const pathParts = path.split('/')
      const serviceId = pathParts[3]
      const countryId = pathParts[4]
      const itemId = pathParts[5]
      const quotation = await callPythonDatabase('generate_quotation_summary', serviceId, countryId, itemId)
      return NextResponse.json({ quotation })
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
