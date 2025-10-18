"""
Quotation Data Structure and Database Integration
"""

import json
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from datetime import datetime

@dataclass
class ServiceItem:
    id: str
    name: str
    description: str
    professional_fee: float
    official_fee: float
    disbursement: float
    currency: str
    duration_days: int

@dataclass
class Country:
    id: str
    name: str
    currency: str

@dataclass
class Service:
    id: str
    name: str
    description: str
    countries: Dict[str, Dict[str, Any]]

class QuotationDataManager:
    def __init__(self):
        self.services_data = {
            "patent": {
                "name": "Patent Application",
                "description": "Comprehensive patent application services including drafting, filing, and prosecution",
                "countries": {
                    "malaysia": {
                        "name": "Malaysia",
                        "currency": "MYR",
                        "items": [
                            ServiceItem(
                                id="patent_malaysia_basic",
                                name="Basic Patent Application",
                                description="Standard patent application filing",
                                professional_fee=8000.00,
                                official_fee=5000.00,
                                disbursement=500.00,
                                currency="MYR",
                                duration_days=90
                            ),
                            ServiceItem(
                                id="patent_malaysia_complex",
                                name="Complex Patent Application",
                                description="Advanced patent application with multiple claims",
                                professional_fee=12000.00,
                                official_fee=5000.00,
                                disbursement=800.00,
                                currency="MYR",
                                duration_days=120
                            )
                        ]
                    },
                    "singapore": {
                        "name": "Singapore",
                        "currency": "SGD",
                        "items": [
                            ServiceItem(
                                id="patent_singapore_basic",
                                name="Basic Patent Application",
                                description="Standard patent application filing",
                                professional_fee=12000.00,
                                official_fee=8000.00,
                                disbursement=800.00,
                                currency="SGD",
                                duration_days=90
                            ),
                            ServiceItem(
                                id="patent_singapore_complex",
                                name="Complex Patent Application",
                                description="Advanced patent application with multiple claims",
                                professional_fee=18000.00,
                                official_fee=8000.00,
                                disbursement=1200.00,
                                currency="SGD",
                                duration_days=120
                            )
                        ]
                    },
                    "thailand": {
                        "name": "Thailand",
                        "currency": "THB",
                        "items": [
                            ServiceItem(
                                id="patent_thailand_basic",
                                name="Basic Patent Application",
                                description="Standard patent application filing",
                                professional_fee=15000.00,
                                official_fee=8000.00,
                                disbursement=1000.00,
                                currency="THB",
                                duration_days=90
                            )
                        ]
                    },
                    "indonesia": {
                        "name": "Indonesia",
                        "currency": "IDR",
                        "items": [
                            ServiceItem(
                                id="patent_indonesia_basic",
                                name="Basic Patent Application",
                                description="Standard patent application filing",
                                professional_fee=20000000.00,
                                official_fee=15000000.00,
                                disbursement=2000000.00,
                                currency="IDR",
                                duration_days=90
                            )
                        ]
                    }
                }
            },
            "trademark": {
                "name": "Trademark Registration",
                "description": "Trademark registration services including search, filing, and prosecution",
                "countries": {
                    "malaysia": {
                        "name": "Malaysia",
                        "currency": "MYR",
                        "items": [
                            ServiceItem(
                                id="trademark_malaysia_single",
                                name="Single Class Trademark",
                                description="Trademark registration for one class",
                                professional_fee=2500.00,
                                official_fee=1500.00,
                                disbursement=200.00,
                                currency="MYR",
                                duration_days=30
                            ),
                            ServiceItem(
                                id="trademark_malaysia_multi",
                                name="Multi-Class Trademark",
                                description="Trademark registration for multiple classes",
                                professional_fee=4000.00,
                                official_fee=2500.00,
                                disbursement=300.00,
                                currency="MYR",
                                duration_days=45
                            )
                        ]
                    },
                    "singapore": {
                        "name": "Singapore",
                        "currency": "SGD",
                        "items": [
                            ServiceItem(
                                id="trademark_singapore_single",
                                name="Single Class Trademark",
                                description="Trademark registration for one class",
                                professional_fee=3000.00,
                                official_fee=1800.00,
                                disbursement=250.00,
                                currency="SGD",
                                duration_days=30
                            )
                        ]
                    },
                    "thailand": {
                        "name": "Thailand",
                        "currency": "THB",
                        "items": [
                            ServiceItem(
                                id="trademark_thailand_single",
                                name="Single Class Trademark",
                                description="Trademark registration for one class",
                                professional_fee=2200.00,
                                official_fee=1200.00,
                                disbursement=180.00,
                                currency="THB",
                                duration_days=30
                            )
                        ]
                    },
                    "indonesia": {
                        "name": "Indonesia",
                        "currency": "IDR",
                        "items": [
                            ServiceItem(
                                id="trademark_indonesia_single",
                                name="Single Class Trademark",
                                description="Trademark registration for one class",
                                professional_fee=2800.00,
                                official_fee=1600.00,
                                disbursement=220.00,
                                currency="IDR",
                                duration_days=30
                            )
                        ]
                    }
                }
            },
            "copyright": {
                "name": "Copyright Registration",
                "description": "Copyright registration services for creative works",
                "countries": {
                    "malaysia": {
                        "name": "Malaysia",
                        "currency": "MYR",
                        "items": [
                            ServiceItem(
                                id="copyright_malaysia_basic",
                                name="Basic Copyright Registration",
                                description="Standard copyright registration",
                                professional_fee=800.00,
                                official_fee=300.00,
                                disbursement=100.00,
                                currency="MYR",
                                duration_days=14
                            )
                        ]
                    },
                    "singapore": {
                        "name": "Singapore",
                        "currency": "SGD",
                        "items": [
                            ServiceItem(
                                id="copyright_singapore_basic",
                                name="Basic Copyright Registration",
                                description="Standard copyright registration",
                                professional_fee=1200.00,
                                official_fee=500.00,
                                disbursement=150.00,
                                currency="SGD",
                                duration_days=14
                            )
                        ]
                    }
                }
            },
            "industrial_design": {
                "name": "Industrial Design Registration",
                "description": "Industrial design registration services",
                "countries": {
                    "malaysia": {
                        "name": "Malaysia",
                        "currency": "MYR",
                        "items": [
                            ServiceItem(
                                id="design_malaysia_basic",
                                name="Basic Design Registration",
                                description="Standard industrial design registration",
                                professional_fee=1500.00,
                                official_fee=800.00,
                                disbursement=200.00,
                                currency="MYR",
                                duration_days=60
                            )
                        ]
                    },
                    "singapore": {
                        "name": "Singapore",
                        "currency": "SGD",
                        "items": [
                            ServiceItem(
                                id="design_singapore_basic",
                                name="Basic Design Registration",
                                description="Standard industrial design registration",
                                professional_fee=2000.00,
                                official_fee=1200.00,
                                disbursement=300.00,
                                currency="SGD",
                                duration_days=60
                            )
                        ]
                    }
                }
            },
            "pct_national_phase": {
                "name": "PCT National Phase Entry",
                "description": "PCT national phase entry services for international patent applications",
                "countries": {
                    "malaysia": {
                        "name": "Malaysia",
                        "currency": "MYR",
                        "items": [
                            ServiceItem(
                                id="pct_malaysia_basic",
                                name="Basic PCT Entry",
                                description="Standard PCT national phase entry",
                                professional_fee=6000.00,
                                official_fee=4000.00,
                                disbursement=500.00,
                                currency="MYR",
                                duration_days=75
                            )
                        ]
                    },
                    "singapore": {
                        "name": "Singapore",
                        "currency": "SGD",
                        "items": [
                            ServiceItem(
                                id="pct_singapore_basic",
                                name="Basic PCT Entry",
                                description="Standard PCT national phase entry",
                                professional_fee=8000.00,
                                official_fee=6000.00,
                                disbursement=800.00,
                                currency="SGD",
                                duration_days=75
                            )
                        ]
                    }
                }
            }
        }

    def get_services(self) -> List[Dict[str, Any]]:
        """Get all available services"""
        services = []
        for service_id, service_data in self.services_data.items():
            services.append({
                "id": service_id,
                "name": service_data["name"],
                "description": service_data["description"]
            })
        return services

    def get_countries_for_service(self, service_id: str) -> List[Dict[str, Any]]:
        """Get available countries for a service"""
        countries = []
        service_data = self.services_data.get(service_id)
        if service_data:
            for country_id, country_data in service_data["countries"].items():
                countries.append({
                    "id": country_id,
                    "name": country_data["name"],
                    "currency": country_data["currency"]
                })
        return countries

    def get_items_for_service_country(self, service_id: str, country_id: str) -> List[Dict[str, Any]]:
        """Get available items for a service in a specific country"""
        items = []
        service_data = self.services_data.get(service_id)
        if service_data:
            country_data = service_data["countries"].get(country_id)
            if country_data:
                for item in country_data["items"]:
                    total_cost = item.professional_fee + item.official_fee + item.disbursement
                    items.append({
                        "id": item.id,
                        "name": item.name,
                        "description": item.description,
                        "professional_fee": item.professional_fee,
                        "official_fee": item.official_fee,
                        "disbursement": item.disbursement,
                        "total_cost": total_cost,
                        "currency": item.currency,
                        "duration_days": item.duration_days
                    })
        return items

    def get_item_by_id(self, item_id: str) -> Optional[Dict[str, Any]]:
        """Get service item by ID"""
        for service_id, service_data in self.services_data.items():
            for country_id, country_data in service_data["countries"].items():
                for item in country_data["items"]:
                    if item.id == item_id:
                        total_cost = item.professional_fee + item.official_fee + item.disbursement
                        return {
                            "id": item.id,
                            "name": item.name,
                            "description": item.description,
                            "professional_fee": item.professional_fee,
                            "official_fee": item.official_fee,
                            "disbursement": item.disbursement,
                            "total_cost": total_cost,
                            "currency": item.currency,
                            "duration_days": item.duration_days
                        }
        return None

    def generate_quotation_summary(self, service_id: str, country_id: str, item_id: str) -> Optional[Dict[str, Any]]:
        """Generate quotation summary"""
        service_data = self.services_data.get(service_id)
        if not service_data:
            return None
            
        country_data = service_data["countries"].get(country_id)
        if not country_data:
            return None
            
        item = self.get_item_by_id(item_id)
        if not item:
            return None
            
        return {
            "service": service_data["name"],
            "country": country_data["name"],
            "item": item,
            "quotation_id": f"QUO-{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "generated_at": datetime.now().isoformat(),
            "valid_until": datetime.now().replace(day=datetime.now().day + 30).isoformat()
        }

# Global instance
quotation_data_manager = QuotationDataManager()

# Example usage
if __name__ == "__main__":
    # Test the data manager
    services = quotation_data_manager.get_services()
    print("Available services:")
    for service in services:
        print(f"- {service['name']}: {service['description']}")
    
    print("\nCountries for Patent Application:")
    countries = quotation_data_manager.get_countries_for_service("patent")
    for country in countries:
        print(f"- {country['name']} ({country['currency']})")
    
    print("\nItems for Patent Application in Malaysia:")
    items = quotation_data_manager.get_items_for_service_country("patent", "malaysia")
    for item in items:
        print(f"- {item['name']}: {item['currency']} {item['total_cost']:,.2f} ({item['duration_days']} days)")
    
    print("\nQuotation Summary:")
    quotation = quotation_data_manager.generate_quotation_summary("patent", "malaysia", "patent_malaysia_basic")
    if quotation:
        print(f"Service: {quotation['service']}")
        print(f"Country: {quotation['country']}")
        print(f"Item: {quotation['item']['name']}")
        print(f"Total Cost: {quotation['item']['currency']} {quotation['item']['total_cost']:,.2f}")
        print(f"Quotation ID: {quotation['quotation_id']}")
