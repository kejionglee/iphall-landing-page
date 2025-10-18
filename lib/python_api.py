"""
Simple Python API for basic functionality
"""

import os
import sys
import asyncio
import json
import logging
from typing import Dict, Any, Optional
from dotenv import load_dotenv

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)
load_dotenv()

async def process_chat_message(message: str, conversation_id: Optional[str] = None, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """Process chat message with basic response"""
    logger.info(f"Processing message: '{message}' with conversation_id: {conversation_id}")
    print(f"🤖 BASIC API: Processing message: '{message}' with conversation_id: {conversation_id}", flush=True)
    
    try:
        # Simple response for any message
        response_text = f"Thank you for your message: '{message}'. This is a basic response from the Python API."
        
        result = {
            "response": response_text,
            "success": True,
            "conversation_id": conversation_id,
            "timestamp": "2024-01-01T00:00:00Z"
        }
        
        logger.info("Message processing completed successfully")
        print("🤖 BASIC API: Message processing completed successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error processing message: {e}", exc_info=True)
        print(f"Error processing message: {e}")
        return {
            "response": f"An error occurred while processing your request: {str(e)}",
            "success": False,
            "conversation_id": conversation_id,
            "timestamp": "2024-01-01T00:00:00Z"
        }

async def check_agent_health() -> Dict[str, Any]:
    """Check basic API health"""
    try:
        return {
            "api_available": True,
            "status": "healthy",
            "overall_healthy": True
        }
    except Exception as e:
        return {
            "api_available": False,
            "error": str(e),
            "overall_healthy": False
        }

def clear_session(conversation_id: str) -> bool:
    """Clear session (placeholder)"""
    try:
        print(f"Clearing session: {conversation_id}")
        return True
    except Exception as e:
        print(f"Error clearing session: {e}")
        return False

def clear_all_sessions() -> bool:
    """Clear all sessions (placeholder)"""
    try:
        print("Clearing all sessions")
        return True
    except Exception as e:
        print(f"Error clearing all sessions: {e}")
        return False

if __name__ == "__main__":
    async def test():
        health = await check_agent_health()
        print("Health check:", json.dumps(health, indent=2))
        if health["overall_healthy"]:
            result = await process_chat_message("Hello, this is a test message")
            print("Test result:", json.dumps(result, indent=2))
    asyncio.run(test())