#!/usr/bin/env python3
"""
Test script to verify database integration
"""

import asyncio
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), 'lib'))

async def test_database():
    """Test the database functions"""
    try:
        from database import db_manager
        
        print("=== Testing Database Integration ===")
        
        # Initialize database
        await db_manager.initialize()
        await db_manager.insert_sample_data()
        
        # Test the database functions
        print("\n1. Testing get_services()...")
        services = await db_manager.get_services()
        print(f"Found {len(services)} services:")
        for service in services:
            print(f"  - {service['name']}: {service['description']}")
        
        print("\n2. Testing get_countries_for_service('Patent Application')...")
        countries = await db_manager.get_countries_for_service("Patent Application")
        print(f"Found {len(countries)} countries for Patent Application:")
        for country in countries:
            print(f"  - {country['name']} ({country['currency']})")
        
        print("\n3. Testing get_items_for_service_country('Patent Application', 'Malaysia')...")
        items = await db_manager.get_items_for_service_country("Patent Application", "Malaysia")
        print(f"Found {len(items)} items for Patent Application in Malaysia:")
        for item in items:
            print(f"  - {item['name']}: {item['currency']} {item['total_cost']:,.2f}")
        
        print("\n4. Testing generate_quotation_summary...")
        quotation = await db_manager.generate_quotation_summary("Patent Application", "Malaysia", "Basic Patent Application")
        if quotation:
            print("Quotation Summary:")
            print(f"  Service: {quotation['service']}")
            print(f"  Country: {quotation['country']}")
            print(f"  Item: {quotation['item']['name']}")
            print(f"  Total Cost: {quotation['item']['currency']} {quotation['item']['total_cost']:,.2f}")
            print(f"  Quotation ID: {quotation['quotation_id']}")
        else:
            print("Failed to generate quotation summary")
        
        await db_manager.close()
        print("\n=== Database test completed successfully! ===")
        
    except Exception as e:
        print(f"Error testing database: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_database())
