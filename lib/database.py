"""
Database Manager for Quotation System using existing quotationlist table
"""

import asyncio
import asyncpg
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class DatabaseManager:
    def __init__(self):
        self.connection_pool = None
    
    async def initialize(self):
        """Initialize database connection pool"""
        try:
            database_url = os.getenv("DATABASE_URL")
            self.connection_pool = await asyncpg.create_pool(database_url, min_size=1, max_size=10)
            print("Database connection pool initialized")
        except Exception as e:
            print(f"Failed to initialize database: {e}")
            print("Continuing with fallback data...")
            self.connection_pool = None
    
    async def close(self):
        """Close database connection pool"""
        if self.connection_pool:
            await self.connection_pool.close()
    
    async def insert_sample_data(self):
        """Insert sample data into the existing quotationlist table"""
        if not self.connection_pool:
            return False
        
        try:
            async with self.connection_pool.acquire() as conn:
                # Check if data already exists
                count = await conn.fetchval("SELECT COUNT(*) FROM quotationlist")
                if count > 0:
                    print(f"Sample data already exists ({count} records)")
                    return True
                
                # Insert sample data into quotationlist table
                sample_data = [
                    # Patent Malaysia
                    ("Patent Application", "Malaysia", "Basic Patent Application", 8000, 5000, 500, "MYR"),
                    ("Patent Application", "Malaysia", "Complex Patent Application", 12000, 5000, 800, "MYR"),
                    # Patent Singapore
                    ("Patent Application", "Singapore", "Basic Patent Application", 12000, 8000, 800, "SGD"),
                    ("Patent Application", "Singapore", "Complex Patent Application", 18000, 8000, 1200, "SGD"),
                    # Patent Thailand
                    ("Patent Application", "Thailand", "Basic Patent Application", 15000, 8000, 1000, "THB"),
                    # Patent Indonesia
                    ("Patent Application", "Indonesia", "Basic Patent Application", 20000000, 15000000, 2000000, "IDR"),
                    
                    # Trademark Malaysia
                    ("Trademark Registration", "Malaysia", "Single Class Trademark", 2500, 1500, 200, "MYR"),
                    ("Trademark Registration", "Malaysia", "Multi-Class Trademark", 4000, 2500, 300, "MYR"),
                    # Trademark Singapore
                    ("Trademark Registration", "Singapore", "Single Class Trademark", 3000, 1800, 250, "SGD"),
                    # Trademark Thailand
                    ("Trademark Registration", "Thailand", "Single Class Trademark", 2200, 1200, 180, "THB"),
                    # Trademark Indonesia
                    ("Trademark Registration", "Indonesia", "Single Class Trademark", 2800, 1600, 220, "IDR"),
                    
                    # Copyright Malaysia
                    ("COPYRIGHT", "Malaysia", "Basic Copyright Registration", 800, 300, 100, "MYR"),
                    # Copyright Singapore
                    ("COPYRIGHT", "Singapore", "Basic Copyright Registration", 1200, 500, 150, "SGD"),
                    # Copyright Laos
                    ("COPYRIGHT", "LAOS", "OFFICIAL COPYRIGHT RECORDATION -  FILING NOTIFICATION OF COPYRIGHT AND DESCRIPTION OF COPYRIGHTED WORK WITH LAOS COPYRIGHT OFFICE", 200, 450, 0, "USD"),
                    
                    # Industrial Design Malaysia
                    ("Industrial Design Registration", "Malaysia", "Basic Design Registration", 1500, 800, 200, "MYR"),
                    # Industrial Design Singapore
                    ("Industrial Design Registration", "Singapore", "Basic Design Registration", 2000, 1200, 300, "SGD"),
                    
                    # PCT National Phase Malaysia
                    ("PCT National Phase Entry", "Malaysia", "Basic PCT Entry", 6000, 4000, 500, "MYR"),
                    # PCT National Phase Singapore
                    ("PCT National Phase Entry", "Singapore", "Basic PCT Entry", 8000, 6000, 800, "SGD"),
                ]
                
                await conn.executemany(
                    """INSERT INTO quotationlist (service, country, item, "prof fee", "official fee", disbursement, currency) 
                       VALUES ($1, $2, $3, $4, $5, $6, $7)""",
                    sample_data
                )
                
                print("Sample data inserted successfully")
                return True
        except Exception as e:
            print(f"Error inserting sample data: {e}")
            return False
    
    async def get_services(self) -> List[Dict[str, Any]]:
        """Get all available services from database"""
        if not self.connection_pool:
            raise Exception("Database not initialized. Please check your database connection.")
        
        try:
            async with self.connection_pool.acquire() as conn:
                rows = await conn.fetch("SELECT DISTINCT service FROM quotationlist ORDER BY service")
                services = []
                for row in rows:
                    service_name = row['service']
                    # Create a simple description based on service name
                    description = f"{service_name} services including drafting, filing, and prosecution"
                    services.append({
                        'id': service_name.lower().replace(' ', '_'),
                        'name': service_name,
                        'description': description
                    })
                return services
        except Exception as e:
            raise Exception(f"Error fetching services from database: {e}")
    
    async def get_countries_for_service(self, service_name: str) -> List[Dict[str, Any]]:
        """Get available countries for a service from database"""
        if not self.connection_pool:
            raise Exception("Database not initialized. Please check your database connection.")
        
        try:
            async with self.connection_pool.acquire() as conn:
                query = """
                    SELECT DISTINCT country, currency 
                    FROM quotationlist 
                    WHERE service = $1 
                    ORDER BY country
                """
                rows = await conn.fetch(query, service_name)
                countries = []
                for row in rows:
                    countries.append({
                        'id': row['country'].lower().replace(' ', '_'),
                        'name': row['country'],
                        'currency': row['currency']
                    })
                return countries
        except Exception as e:
            raise Exception(f"Error fetching countries for service {service_name} from database: {e}")
    
    async def get_items_for_service_country(self, service_name: str, country_name: str) -> List[Dict[str, Any]]:
        """Get available items for a service in a specific country from database"""
        if not self.connection_pool:
            raise Exception("Database not initialized. Please check your database connection.")
        
        try:
            async with self.connection_pool.acquire() as conn:
                query = """
                    SELECT id, item, "prof fee" as professional_fee, "official fee" as official_fee, 
                           disbursement, currency,
                           ("prof fee" + "official fee" + disbursement) as total_cost
                    FROM quotationlist
                    WHERE service = $1 AND country = $2
                    ORDER BY item
                """
                rows = await conn.fetch(query, service_name, country_name)
                items = []
                for row in rows:
                    items.append({
                        'id': f"{service_name.lower().replace(' ', '_')}_{country_name.lower().replace(' ', '_')}_{row['item'].lower().replace(' ', '_')}",
                        'name': row['item'],
                        'description': f"Standard {row['item'].lower()}",
                        'professional_fee': float(row['professional_fee']),
                        'official_fee': float(row['official_fee']),
                        'disbursement': float(row['disbursement']),
                        'currency': row['currency'],
                        'total_cost': float(row['total_cost'])
                    })
                return items
        except Exception as e:
            raise Exception(f"Error fetching items for service {service_name} in country {country_name} from database: {e}")
    
    async def get_item_by_id(self, item_id: str) -> Optional[Dict[str, Any]]:
        """Get service item by ID from database (not directly supported by current schema)"""
        if not self.connection_pool:
            raise Exception("Database not initialized. Please check your database connection.")
        
        try:
            # Since we don't have direct item IDs, we'll need to parse the item_id
            # or search by item name - this is a limitation of the current schema
            async with self.connection_pool.acquire() as conn:
                # For now, return None as this method is not well-supported by current schema
                return None
        except Exception as e:
            raise Exception(f"Error fetching item {item_id} from database: {e}")

    async def generate_quotation_summary(self, service_name: str, country_name: str, item_name: str) -> Optional[Dict[str, Any]]:
        """Generate quotation summary from database"""
        if not self.connection_pool:
            raise Exception("Database not initialized. Please check your database connection.")
        
        try:
            async with self.connection_pool.acquire() as conn:
                query = """
                    SELECT id, service, country, item, "prof fee" as professional_fee, 
                           "official fee" as official_fee, disbursement, currency,
                           ("prof fee" + "official fee" + disbursement) as total_cost
                    FROM quotationlist
                    WHERE service = $1 AND country = $2 AND item = $3
                    LIMIT 1
                """
                row = await conn.fetchrow(query, service_name, country_name, item_name)
                
                if row:
                    quotation_id = f"QUO-{datetime.now().strftime('%Y%m%d%H%M%S')}"
                    generated_at = datetime.now().isoformat()
                    valid_until = (datetime.now() + timedelta(days=30)).isoformat()
                    
                    return {
                        "service": row["service"],
                        "country": row["country"],
                        "item": {
                            'id': f"{service_name.lower().replace(' ', '_')}_{country_name.lower().replace(' ', '_')}_{item_name.lower().replace(' ', '_')}",
                            'name': row["item"],
                            'description': f"Standard {row['item'].lower()}",
                            'professional_fee': float(row['professional_fee']),
                            'official_fee': float(row['official_fee']),
                            'disbursement': float(row['disbursement']),
                            'currency': row['currency'],
                            'total_cost': float(row['total_cost'])
                        },
                        "quotation_id": quotation_id,
                        "generated_at": generated_at,
                        "valid_until": valid_until
                    }
                return None
        except Exception as e:
            raise Exception(f"Error generating quotation summary from database: {e}")

# Global database manager instance
db_manager = DatabaseManager()

# Initialize database on import
async def initialize_database():
    await db_manager.initialize()
    await db_manager.insert_sample_data()

# Example usage
if __name__ == "__main__":
    async def test_database():
        await initialize_database()
        
        # Test the database functions
        services = await db_manager.get_services()
        print("Available services:")
        for service in services:
            print(f"- {service['name']}: {service['description']}")
        
        print("\nCountries for Patent Application:")
        countries = await db_manager.get_countries_for_service("Patent Application")
        for country in countries:
            print(f"- {country['name']} ({country['currency']})")
        
        print("\nItems for Patent Application in Malaysia:")
        items = await db_manager.get_items_for_service_country("Patent Application", "Malaysia")
        for item in items:
            print(f"- {item['name']}: {item['currency']} {item['total_cost']:,.2f} ({item['duration_days']} days)")
        
        print("\nQuotation Summary:")
        quotation = await db_manager.generate_quotation_summary("Patent Application", "Malaysia", "Basic Patent Application")
        if quotation:
            print(f"Service: {quotation['service']}")
            print(f"Country: {quotation['country']}")
            print(f"Item: {quotation['item']['name']}")
            print(f"Total Cost: {quotation['item']['currency']} {quotation['item']['total_cost']:,.2f}")
            print(f"Quotation ID: {quotation['quotation_id']}")
        
        await db_manager.close()
    
    asyncio.run(test_database())
