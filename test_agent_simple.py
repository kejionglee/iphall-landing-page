#!/usr/bin/env python3
"""
Simple test script for the basic Python API
"""

import asyncio
import sys
import os
import logging

# Configure logging to show all logs
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)

# Add the lib directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'lib'))

async def test_basic_api():
    """Test the basic API functionality"""
    try:
        from python_api import process_chat_message, check_agent_health
        
        print("=== Testing Basic API ===")
        
        # Test health check
        print("\n--- Health Check ---")
        health = await check_agent_health()
        print(f"Health result: {health}")
        
        # Test message processing
        print("\n--- Message Processing ---")
        test_messages = [
            "Hello, this is a test",
            "Can you help me?",
            "What can you do?"
        ]
        
        conversation_id = "test_session_456"
        
        for i, message in enumerate(test_messages, 1):
            print(f"\nTest {i}: '{message}'")
            result = await process_chat_message(message, conversation_id)
            print(f"Response: {result.get('response', 'No response')}")
            print(f"Success: {result.get('success', False)}")
            
    except Exception as e:
        print(f"Error testing API: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_basic_api())